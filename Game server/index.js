const { v4: uuidv4 } = require('uuid');
const { AvailableEvents, NatsAsyncApiClient } = require('NatsClient');
var client = new NatsAsyncApiClient();
let playerCounter = 1;
client.on(AvailableEvents.permissionError, (e) => {
	console.log('NatsAsyncApiClient permissionError');
	console.log(e);
});
client.on(AvailableEvents.close, (e) => {
	console.log('NatsAsyncApiClient close');
	console.log(e);
});
client.on(AvailableEvents.connect, async (connection, serverURL, info) => {
	console.log('NatsAsyncApiTestClient connect');
	console.log({ connection, serverURL, info });
});
client.on(AvailableEvents.connecting, (serverURL) => {
	console.log('NatsAsyncApiClient connecting');
	console.log(serverURL);
});
client.on(AvailableEvents.disconnect, (serverURL) => {
	console.log('NatsAsyncApiClient disconnect');
	console.log(serverURL);
});
client.on(AvailableEvents.error, (e) => {
	console.log('NatsAsyncApiClient error');
	console.log(e);
});
client.on(AvailableEvents.reconnect, (connection, serverURL, info) => {
	console.log('NatsAsyncApiClient reconnect');
	console.log({ connection, serverURL, info });
});
client.on(AvailableEvents.reconnecting, (serverURL) => {
	console.log('NatsAsyncApiClient reconnecting');
	console.log(serverURL);
});
client.on(AvailableEvents.serversChanged, (e) => {
	console.log('NatsAsyncApiClient serversChanged');
	console.log(e);
});
client.on(AvailableEvents.subscribe, (e) => {
	console.log('NatsAsyncApiClient subscribe');
	console.log(e);
});
const generateRandomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min) + min);
};
const getIsoTimestamp = () => {
	return new Date().toISOString();
};
const getNewPlayerId = () => {
	return 'Player' + playerCounter++;
};
const intervalNewPlayersJoin = generateRandomNumber(100, 5000);
console.log(`New players are joining each ${intervalNewPlayersJoin} ms`);
const serverId = uuidv4();
const itemId = '1337';
async function start() {
	await client.connectToHost('0.0.0.0:4222');
	//Simulate players join the game server each x ms
	setInterval(simulateNewPlayer, intervalNewPlayersJoin);
}

async function simulateNewPlayer() {
	const playerId = getNewPlayerId();
	let isDisconnected = false;
	const disconnectCheck = () => {
		return isDisconnected;
	};
	try {
		await client.publishToGameServerServerIdEventsPlayerPlayerIdConnect(
			{
				connectTimestamp: getIsoTimestamp(),
			},
			serverId,
			playerId
		);
	} catch (e) {
		console.error(e);
		console.error(`Failed to simulate player ${playerId}`);
		return;
	}

  	// Simulate different in game events until player is disconnected
	simulatePlayerChat(disconnectCheck, playerId);
	simulatePlayerItemPickup(disconnectCheck, playerId);
	simulatePlayerHit(disconnectCheck, playerId);

	//Disconnect a player after 30s-30m
	const timeToDisconnect = generateRandomNumber(30000, 30 * 60 * 1000);
	setTimeout(async () => {
		isDisconnected = true;
		await client.publishToGameServerServerIdEventsPlayerPlayerIdDisconnect(
			{
				disconnectTimestamp: getIsoTimestamp(),
			},
			serverId,
			playerId
		);
	}, timeToDisconnect);
}

/**
 * Simulate a player hits another player every 5s-30s until player disconnects
 *
 * @param {*} playerDisconnected callback to clear interval once player is disconnected
 * @param {*} playerId that attacked the target
 */
function simulatePlayerHit(playerDisconnected, playerId) {
	const playerHitIntervalTimeout = generateRandomNumber(5000, 30000);
	let playerHitInterval = setInterval(async () => {
		if (!playerDisconnected()) {
			try {
				await client.publishToGameServerServerIdEventsPlayerPlayerIdHit(
					{
						hitTimestamp: getIsoTimestamp(),
						damage: generateRandomNumber(1, 100),
						target: generateRandomNumber(1, playerCounter),
					},
					serverId,
					playerId
				);
			} catch (e) {
				console.error(e);
			}
		} else {
			clearInterval(playerHitInterval);
		}
	}, playerHitIntervalTimeout);
}

/**
 * Simulate a player picks up an item every 5s-30s until player disconnects
 *
 * @param {*} playerDisconnected callback to clear interval once player is disconnected
 * @param {*} playerId that is picking up items
 */
function simulatePlayerItemPickup(playerDisconnected, playerId) {
	const itemPickupIntervalTimeout = generateRandomNumber(5000, 30000);
	let itemPickupInterval = setInterval(async () => {
		if (!playerDisconnected()) {
			try {
				await client.publishToGameServerServerIdEventsPlayerPlayerIdItemItemIdPickup(
					{
						pickupTimestamp: getIsoTimestamp(),
					},
					serverId,
					playerId,
					itemId
				);
			} catch (e) {
				console.error(e);
			}
		} else {
			clearInterval(itemPickupInterval);
		}
	}, itemPickupIntervalTimeout);
}

/**
 * Simulate a player chats every 1s-5s until player disconnects
 *
 * @param {*} playerDisconnected callback to clear interval once player is disconnected
 * @param {*} playerId that is writing messages
 */
function simulatePlayerChat(playerDisconnected, playerId) {
	const chatIntervalTimeout = generateRandomNumber(1000, 5000);
	var chatMessageCounter = 0;
	let chatInterval = setInterval(async () => {
		if (!playerDisconnected()) {
			try {
				await client.publishToGameServerServerIdEventsPlayerPlayerIdChat(
					{
						chatTimestamp: getIsoTimestamp(),
						message: 'test message' + chatMessageCounter++,
					},
					serverId,
					playerId
				);
			} catch (e) {
				console.error(e);
			}
		} else {
			clearInterval(chatInterval);
		}
	}, chatIntervalTimeout);
}

start().catch((e) => {
	console.error(e);
});
