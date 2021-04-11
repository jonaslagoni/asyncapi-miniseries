---
title: "Mini series - Speed up your development process (part 1)"
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

The source code for the entire project can be found [here](https://github.com/jonaslagoni/asyncapi-miniseries) incase you want more specific details then what is available in the blog posts.

**Don't see this blog post series as anything other then an example workflow, this is purely how I do it with my applications and how I use the specification and tooling to my advantage. Use this as an inspiration to finding an approach that works for you.**

# What we are building

A passion of mine, beside AsyncAPI, is online games, more specifically creating and maintaining game servers while providing a network of services around them. This passion was what eventually made me start to contribute to AsyncAPI back in 2019.
 
Explaining something is always better with actual examples, therefore I will be creating a little system to show you how code generation can help the development process. And why we need **your** help to build the best code generation collection in the world, together, as a community.

Therefore I will be creating a system of two applications, a **game server** and a **backend processor** using a micro-service architecture.

The main point of the **game server** is to produce different kind of events such as when, players pick up items, uses the chat, hit one another, and such.

The **backend processor** will be subscribing to these events to process them. In our example it will simply save the received data directly to a database.

In the stack I will be using [NodeJS](), [Docker]() + [swarm](), [MongoDB]() and I will be using [NATS]() as broker. I have provided links in-case it is the first time you hear about the terms, since a basic understanding of them is a good idea to better understand the implementation.

The tools I will be using are [JMeter]() and [the AsyncAPI generator]() together with two templates, [TypeScript/Node.js NATS](https://github.com/asyncapi/ts-nats-template) and [JMeter template](https://github.com/jonaslagoni/JMeter-template).

The mini-series will be split up into the following parts:

* Part 1: Designing the API's with AsyncAPI
* Part 2: Implementing the applications using code generation
* Part 3: Black-box testing the applications using code generation
* Part 4: Introducing new changes when using code generation
* Part 5: The path to 1 billion players - Scaling the applications and finding bottlenecks with code generation

I do this because each part is part of a user story explaining and can be read separately.

# Designing the API's with AsyncAPI
I always use [design first principle]() which means describing the AsyncAPI documents for the two applications, **game server** and **backend processor** and how we can interact with them.

Using AsyncAPI to define the behavior of an internal system is not easy, since AsyncAPI is build to define behavior for the user of the API but I will get more into that as I explain the setup of the AsyncAPI documents for both applications. 

## The game server
First we define all the different channels for which the **game server** should publish to.

```yaml
asyncapi: 2.0.0
info: 
  title: "Game server"
  version: "0.0.1"
channels: 
  game/server/{serverId}/events/player/{playerId}/item/{itemId}/pickup:
    description: Channel used when a player picks up an item in-game
  game/server/{serverId}/events/player/{playerId}/connect:
    description: Channel used when a player joins (connect to) the game server
  game/server/{serverId}/events/player/{playerId}/disconnect:
    description: Channel used when a player leaves (disconnects from) the game server
  game/server/{serverId}/events/player/{playerId}/chat: 
    description: Channel used when a player writes something in chat
  game/server/{serverId}/events/player/{playerId}/hit: 
    description: Channel used when a player hit another player in-game
```

The way I like to structure my channel topics, is to utilize `parameters` to separate the action from information about the event, so it describes, on what server the event was performed `{serverId}`, by what player `{playerId}` and in case of `pickups` what item `{itemId}` gets picked up. For the last part of the channel topic we describe what the event was for, example `connect`.

With NATS, and I assume for other protocols as well, when structuring it like this, it offers you different features down the line such as wildcard subscriptions, but this will be explained in [part 2](). Of course you don't have to use parameters, this data could easily be added to the payload instead, this is just my preferred way of structuring it.

Next we define the actual definition of the channels, and here I will focus on explaining, in full, the channel `game/server/{server_id}/events/player/{player_id}/item/{item_id}/pickup`. The rest of the channels can be seen [here]().

```yaml
...
  game/server/{serverId}/events/player/{playerId}/item/{itemId}/pickup:
    description: Channel used when a player picks up an item in-game
    parameters:
      serverId: 
        description: The id of the server the action was performed on
        schema: 
          type: string
      playerId: 
        description: The id of the player who performed the action
        schema: 
          type: string
      itemId: 
        description: The id of item picked up
        schema: 
          type: string
    subscribe: 
      message:
        payload:
          type: object
          $id: PlayerItemPickupPayload
          additionalProperties: false
          properties:
            pickupTimestamp:     
              type: string
              format: date-time
              description: The timestamp the item was picked up
...
```
This is the full AsyncAPI channel definition for describing the event for when a player picks up an item in-game.

First we have the definition of `parameters` used in the channel topic. `serverId` tells us where the action originates from, the `playerId` tells us who performed the action, and the `itemId` tells us which item was picked up. 

Next we have the `subscribe` operation, which to some, might not make much sense. We do want the **game server** to publish this event right? Correct, but this is how you currently define operations, what operation can others interact with. This means that the **game server** publishes on this channel and others can `subscribe` to this channel. \[[1](#view-property)\]\[[3](#clarify-view)\]

In the end we define the actual payload that is being transmitted over the channel, in this case the `payload` (which is a super-set of JSON Schema draft 7) validate against an `object` which contains the property `pickupTimestamp` and when `additionalProperties` is `false`, no extra properties may be added. The `$id` keyword are the identifier for the that specific schema in this case we name they schema `PlayerItemPickupPayload` since it represent the payload schema.

## The backend processor
Next we design the **backend processor** API which contains all the same channels as the **game server** but with a different operation keyword. This is again because we want to define how others may interact with our **backend processor**. This means that instead of using the `subscribe` operation we use `publish` to tell others that they can publish to this channel since the backend process are subscribing to it. The full AsyncAPI document for the **backend processor** can be found [here](). 

```yaml
...
  game/server/{serverId}/events/player/{playerId}/item/{itemId}/pickup:
    ...
    publish: 
      ...
...
```

## Reusability
Since both applications uses the same definitions, it would be a petty to have duplicate information in each AsyncAPI document, so lets introduce some reusability.

At the moment each of the AsyncAPI documents contains their own definition of the channels. But what if we where to add a new validation rule such as a new property to the `playerItemPickupPayload` schema? In our case we would have to change this for both applications which is way too much work :smile:

We can therefore introduce `$ref` to separate the parameters and messages into smaller sections for reusability. I will be placing all separate components into a `components` directory.

Just a quick note, at the moment it is not possible to reuse channels and operations directly, therefore we must do it to the parameters and message individually \[[2](#channel-reusability)\]. 

First we separate the different parameters, for simplicity we add all of them into the same file `./components/Parameters.yaml`.
```yaml
serverId:
  description: The id of the server
  schema: 
    type: string
playerId:
  description: The id of the player who performed the action
  schema: 
    type: string
itemId:
  description: The id of item
  schema: 
    type: string
```

And then change all the channel parameters to reference the external parameter definition.
```yaml
...
  game/server/{serverId}/events/player/{playerId}/item/{itemId}/pickup:
    description: Channel used when a player picks up an item in-game
    parameters:
      serverId: 
        $ref: "./components/Parameters.yaml#/serverId"
      playerId: 
        $ref: "./components/Parameters.yaml#/playerId"
      itemId: 
        $ref: "./components/Parameters.yaml#/itemId"
    ...
...
```

For the messages we add a new file per message instead of keeping everything in the same file, I use this approach since I find it easier to maintain and extend.

We add the message file `./components/messages/PlayerItemPickup.yaml`
```yaml
payload:
  type: object
  $id: PlayerItemPickupPayload
  additionalProperties: false
  properties:
    pickupTimestamp:     
      type: string
      format: date-time
      description: The timestamp the item was picked up
```

and alter the channel definition for the **game server** to
```yaml
...
  game/server/{serverId}/events/player/{playerId}/item/{itemId}/pickup:
    description: Channel used when a player picks up an item in-game
    parameters:
      serverId: 
        $ref: "./components/Parameters.yaml#/serverId"
      playerId: 
        $ref: "./components/Parameters.yaml#7playerId"
      itemId: 
        $ref: "./components/Parameters.yaml#/itemId"
    subscribe: 
      message:
        $ref: './components/messages/PlayerItemPickup.yaml'
...
```

These changes are done to the **backend processor** as well to end up with the following documents:
* [AsyncAPI document for the game server]()
* [AsyncAPI document for the processor]()

## What's next
Now that our API's are designed for our two applications we can move on to [Part 2: Implementing the applications using code generation.]()

# Related issues
In case you are interested in jumping into our discussions and be part of the community that drives the specification and tools, I have referenced some of the outstanding issues and discussions we have regarding the different aspects I have referenced in the post.
1. <a name="view-property"></a>[Add a View property to the info section to change the perspective of subscribe and publish operations](https://github.com/asyncapi/spec/issues/390)
2. <a name="channel-reusability"></a>[Reusing channel definitions across files is hard](https://github.com/asyncapi/spec/issues/415)
3. <a name="clarify-view"></a>[Confusions with the Publish and Subscribe meaning/perspective](https://github.com/asyncapi/spec/issues/520) 