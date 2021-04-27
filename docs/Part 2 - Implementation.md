---
title: 'Mini series - Speed up your development process (part 2)'
date: 2021-03-10T06:00:00+01:00
type: Engineering
tags:
  - tools
  - code generation
cover: /img/posts/jonaslagoni-miniseries/cover.webp
authors:
  - name: Jonas Lagoni
    photo: /img/avatars/jonaslagoni.webp
    link: https://github.com/jonaslagoni
    byline: AsyncAPI Maintainer
featured: true
---

How can you utilize code generation to speed up the development process and only focus on what is important, the business logic? In this mini-series we will explore the ways AsyncAPI and code generation can work hand in hand beyond generating documentation.

- Part 1: Designing the API's with AsyncAPI
- **Part 2: Implementing the applications using code generation**
- Part 3: Black-box testing the applications using code generation
- Part 4: Introducing new changes when using code generation
- Part 5: The path to 1 billion players - Scaling the applications and finding bottlenecks with code generation

The source code for the entire project can be found [here](https://github.com/jonaslagoni/asyncapi-miniseries) incase you want more specific details then what is available in the blog posts.

**Don't see this blog post series as anything other then an example workflow, this is purely how I do it with my applications and how I use the specification and tooling to my advantage. Use this as an inspiration to finding an approach that works for you.**

In the stack I will be using [NodeJS](https://nodejs.org/en/), [Docker](https://www.docker.com/) + [swarm](https://docs.docker.com/engine/swarm/), [MongoDB](https://www.mongodb.com/) and I will be using [NATS](https://nats.io/) as the message broker. You do not have to know specifically how the technologies works since I will be explaining it along the way.

The tools I will be using are [JMeter](https://jmeter.apache.org/) for performance testing and [the AsyncAPI generator](https://github.com/asyncapi/generator) to generate code from the AsyncAPI documents. To generate code, the AsyncAPI generator needs to be used together with templates, and the two templates I am gonna use are [TypeScript/Node.js NATS](https://github.com/asyncapi/ts-nats-template) for the broker communication and [JMeter template](https://github.com/jonaslagoni/JMeter-template) for generating test plans for performance testing in part 5.
# Implementing the applications using code generation

Now that the AsyncAPI documents have been defined we wish to use those documents to generate some code for us which should simplify our development process (otherwise this blog post is kinda waste of time :smile:).

For both applications I will be using the [TypeScript/Node.js NATS template](https://github.com/asyncapi/ts-nats-template) to generate a wrapper for communicating with the NATS broker. Anything I show you beyond this point is specific for this template alone, don't expect other templates to offer the same features or setup, each template is unique in its own ways. Side note: Would it be an idea to unify official broker templates to follow unified patterns :thinking:?

Quick note, this template does not currently follow the specification directly since it can only generate code for the application it self, not for what the specification is designed for \[[1](#follow-specification)\].

What does a "client wrapper" really mean in this context? It means that the template generates all the functions and data models necessary for me to quickly implement the use-case "publish this event with this payload and parameters", so all I need to focus on is the business logic of the applications.

Notice: This implementation does not take into account 

So what is the output of the generated code? With this template it gives me the following files:

- A NATS client wrapper so I will be able to call functions which has all the necessary arguments based on the AsyncAPI definitions.
- Data models for the payload
-

## The game server

First we create a directory for the **game server** and add the initial npm setup by creating the `package.json` file.

```json
{
	"name": "game-server",
	"version": "0.0.1",
	"description": "",
	"scripts": {
		"start": "node index.js"
	},
	"license": "Apache 2.0"
}
```

Next we generate the corresponding NATS client for the game server based on our AsyncAPI definition. To do so we run the command

```bash
ag "../AsyncAPI/GameServer.yaml" @asyncapi/ts-nats-template --output "./GeneratedNatsClient"
```

Where we use the AsyncAPI generator (`ag`) and tells it to use our AsyncAPI definition for the **game server** (`"../AsyncAPI/GameServer.yaml"`), and use the ts-nats-template (`@asyncapi/ts-nats-template`) and output the generated files to the folder `GeneratedNatsClient` (`--output "./GeneratedNatsClient"`).

Once the client have been generated, we need to install all it's dependencies and build it. We do so by changing directory into the output directory and running the command `npm i && npm run build`. 

Next we add the generated client to the dependency list of the **game server**

```json
...
  "dependencies": {
    "NatsClient": "file:/./GeneratedNatsClient"
  }
...
```

The business logic for the **game server** is simply simulating players joining, chatting, picking up items, hitting each other, and disconnecting. For this blog post the business logic really isn't that import so I will focus on the interaction with the generated client. If you are interested in the actual simulation implementation take a look [here]().

The generated NATS client creates wrapper functions for each of our defined channels, using the syntax `<Operation type>To<Camel case channel name>(<Message payload object>, <Parameters>)`. For our channel `game/server/{serverId}/events/player/{playerId}/connect` we get the function `publishToGameServerServerIdEventsPlayerPlayerIdConnect(<Message payload>, <serverId parameter>, <playerId parameter>)`

For the implementation I will be keeping everything in one file for simplicity `index.js`. Which will at a random interval simulate new players join the server and perform the different actions.

```js
const { NatsAsyncApiClient } = require('NatsClient');
var client = new NatsAsyncApiClient();
let playerCounter = 1;
const generateRandomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min) + min);
};
const getIsoTimestamp = () => {
	return new Date().toISOString();
};
const getNewPlayerId = () => {
	return 'Player' + playerCount++;
};
const intervalNewPlayersJoin = generateRandomNumber(100, 5000);
const serverId = uuidv4();
const itemId = '1337';
async function start() {
	await client.connectToHost('0.0.0.0:4222');
	//Simulate players join the game server each x ms
	setInterval(simulateNewPlayer, intervalNewPlayersJoin);
}
const intervalNewPlayersJoin = generateRandomNumber(100, 5000);

async function simulateNewPlayer() {
	const playerId = getNewPlayerId();
	const joinMessage = {
		connectTimestamp: getIsoTimestamp(),
	};
	try {
		await client.publishToGameServerServerIdEventsPlayerPlayerIdConnect(
			joinMessage,
			serverId,
			playerId
		);
	} catch (e) { }
  // Simulate the rest of the in-game events 
}
start();
```
First thing is to import the generated client (`NatsAsyncApiClient`) as a dependency and create a new client instance. We then define some basic functions `generateRandomNumber`, `getIsoTimestamp` and `getNewPlayerId` which is self explanatory. 

The `start` function is then defined which connects the generated client to the NATS broker (`client.connectToHost`) and start the simulation, by simulating a new player (`simulateNewPlayer`) in a predefined interval (`intervalNewPlayersJoin`). 

The generated client provides convenient wrapper functions to the channels such as `publishToGameServerServerIdEventsPlayerPlayerIdConnect` if we recall the AsyncAPI definition of the channel `game/server/{serverId}/events/player/{playerId}/connect`. Where we call the function with the message payload for the channel `joinMessage`, with the two parameters `serverId` and `playerId`. 

## Backend processor

The backend processor's job is to save all incoming events to the database (MongoDB).

We go through all the same steps as for the **game server** for generating code, but instead of generating for the **game server** we provide the generator with the backend processor's AsyncAPI document `Processor.yaml`.

I will still focus on how the channel `game/server/{serverId}/events/player/{playerId}/item/{itemId}/pickup` is implemented.

```js
const subscribeToServerId = '*';
const subscribeToPlayerId = '*';
const subscribeToItemId = '*';
/**
 * Subscribe to to all player item pickup events regardless of which server and player it is from
 */
await natsClient.subscribeToGameServerServerIdEventsPlayerPlayerIdItemItemIdPickup(
	async (err, msg, serverId, playerId, itemId) => {
		if (err) {
			console.log(err);
			return;
		}
		const saveMessage = { ...msg, serverId, playerId, itemId };
		try {
			const db = await MongoClient.connect(mongodbUrl);
			var dbo = db.db(Config.mongodbDatabase);
			await dbo
				.collection(Config.mongodbDisconnectsCollection)
				.insertOne(saveMessage);
			db.close();
		} catch (e) {
			console.error(`Could not insert item pickup: ${e}`);
		}
	},
	subscribeToServerId,
	subscribeToPlayerId,
	subscribeToItemId
);
```

First argument to the function `subscribeToGame...Pickup` is the desired callback to call when the application receives new messages on that specific channel.

That callback got 5 arguments, `err` which is sat in case an error occurred while receiving the message. `msg` which is the message object, this of course have the correct model associated, so you know which properties are available. The 3 final arguments are the parameters for the channel. Since applications publishes to something like the following topic `game.server.server1.events.player.player1.item.item1.pickup` the received parameters will be `server1`, `player1` and `item1` respectfully. All that the callback is doing then is to insert it to the correct MongoDB collection.

The final arguments to the `subscribe...` function is to define which `serverId`, `playerId` and `itemId` we want to subscribe to. In our case we want to subscribe to all (`*`) of them.

With this approach we can forget everything about having to define our own payload models, ensuring we send over the correct channels with the correct data.

## Next
Now that we have the two applications implemented we can move on to [Part 3: Black-box testing the applications using code generation]().

# Related issues

In case you are interested in jumping into our discussions and be part of the community that drives the specification and tools, I have referenced some of the outstanding issues and discussions related to the different aspects I have referenced in the post.

1. <a name="follow-specification"></a>[Template does not follow the specification](https://github.com/asyncapi/ts-nats-template/issues/87)
