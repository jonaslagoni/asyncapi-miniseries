const { v4: uuidv4 } = require('uuid');
const { NatsAsyncApiClient } = require('NatsClient');
var client = new NatsAsyncApiClient();
client.connectToHost("localhost:4222");
const generateRandomNumber = (min, max) =>  {
	return Math.floor(Math.random() * (max - min) + min);
};
const getIsoTimestamp = () =>  {
	return new Date().toISOString();
};
const getPlayerId = (playerCount) =>  {
	return "Player" + (playerCount++);
};
const intervalNewPlayersJoin = generateRandomNumber(100, 5000);
let playerCounter = 1;
const serverId = uuidv4();

async function simulateNewPlayer(){
	const playerId = getPlayerId(playerCounter++);
	let isDisconnected = false;
	const disconnectCheck = () => {
		return isDisconnected;
	}
	try {
		await client.publishToGameServerServerIdEventsPlayerPlayerIdConnect({
			connectTimestamp: getIsoTimestamp()
		}, serverId, playerId);
	} catch(e) {
		console.error(e);
		console.error(`Failed to simulate player ${playerId}`);
		return;
	}

	simulatePlayerChat(disconnectCheck, playerId);
	simulatePlayerItemPickup(disconnectCheck, playerId);
	simulatePlayerHit(disconnectCheck, playerId);


	//Disconnect a player after 30s-30m
	const timeToDisconnect = generateRandomNumber(30000, 30*60*1000);
	setTimeout(() => {
		isDisconnected = true;
		await client.publishToGameServerServerIdEventsPlayerPlayerIdDisconnect({
			disconnectTimestamp: getIsoTimestamp()
		}, serverId, playerId);
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
	let playerHitInterval = setInterval( async () => {
		if(!playerDisconnected()){
			try{
				await client.publishToGameServerServerIdEventsPlayerPlayerIdHit({
					hitTimestamp: getIsoTimestamp(),
					damage: generateRandomNumber(1, 100),
					target:  getPlayerId(generateRandomNumber(1, playerCounter))
				}, serverId, playerId, itemId);
			}catch(e){
				console.error(e);
			}
		}else{
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
	var itemId = 1337;
	let itemPickupInterval = setInterval( async () => {
		if(!playerDisconnected()){
			try{
				await client.publishToGameServerServerIdEventsPlayerPlayerIdItemItemIdPickup({
					pickupTimestamp: getIsoTimestamp()
				}, serverId, playerId, itemId);
			}catch(e){
				console.error(e);
			}
		}else{
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
	let chatInterval = setInterval( async () => {
		if(!playerDisconnected()){
			try{
				await client.publishToGameServerServerIdEventsPlayerPlayerIdChat({
					chatTimestamp: getIsoTimestamp(),
					message: "test message" + (chatMessageCounter++)
				}, serverId, playerId);
			}catch(e){
				console.error(e);
			}
		}else{
			clearInterval(chatInterval);
		}
	}, chatIntervalTimeout);
}

//Simulate players join the game server
setInterval(simulateNewPlayer, intervalNewPlayersJoin); 