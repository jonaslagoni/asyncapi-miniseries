
const {NatsAsyncApiClient, AvailableEvents} = require('NatsClient');
const { v4: uuidv4 } = require('uuid');
const MongoClient = require('mongodb').MongoClient;
const Config = require('./config');
var mongodbUrl = `mongodb://${Config.mongodbUsername}:${Config.mongodbPassword}@${Config.mongodbHost}`;
const natsClient = new NatsAsyncApiClient();

natsClient.on(AvailableEvents.permissionError, (e) => {
	console.log('NatsAsyncApiClient permissionError');
	console.log(e);
});
natsClient.on(AvailableEvents.close, (e) => {
	console.log('NatsAsyncApiClient close');
	console.log(e);
});
natsClient.on(AvailableEvents.connect, async (connection, serverURL, info) => {
	console.log('NatsAsyncApiTestClient connect');
	console.log({ connection, serverURL, info });
});
natsClient.on(AvailableEvents.connect, (connection, serverURL, info) => {
	console.log('NatsAsyncApiClient connect');
	console.log({ connection, serverURL, info });
});
natsClient.on(AvailableEvents.connecting, (serverURL) => {
	console.log('NatsAsyncApiClient connecting');
	console.log(serverURL);
});
natsClient.on(AvailableEvents.disconnect, (serverURL) => {
	console.log('NatsAsyncApiClient disconnect');
	console.log(serverURL);
});
natsClient.on(AvailableEvents.error, (e) => {
	console.log('NatsAsyncApiClient error');
	console.log(e);
});
natsClient.on(AvailableEvents.pingcount, () => {
	console.log('NatsAsyncApiClient pingcount');
});
natsClient.on(AvailableEvents.pingtimer, () => {
	console.log('NatsAsyncApiClient pingtimer');
});
natsClient.on(AvailableEvents.reconnect, (connection, serverURL, info) => {
	console.log('NatsAsyncApiClient reconnect');
	console.log({ connection, serverURL, info });
});
natsClient.on(AvailableEvents.reconnecting, (serverURL) => {
	console.log('NatsAsyncApiClient reconnecting');
	console.log(serverURL);
});
natsClient.on(AvailableEvents.serversChanged, (e) => {
	console.log('NatsAsyncApiClient serversChanged');
	console.log(e);
});
natsClient.on(AvailableEvents.subscribe, (e) => {
	console.log('NatsAsyncApiClient subscribe');
	console.log(e);
});
natsClient.on(AvailableEvents.unsubscribe, (e) => {
	console.log('NatsAsyncApiClient unsubscribe');
	console.log(e);
});
natsClient.on(AvailableEvents.yield, () => {
	console.log('NatsAsyncApiClient yield');
});
async function start(){
    await natsClient.connectToHost(Config.natsHost, {reconnect: true, waitOnFirstConnect: true});
    /**
     * Subscribe to to all chat events regardless of which server and player it is from
     */
    await natsClient.subscribeToGameServerServerIdEventsPlayerPlayerIdChat(async (err, msg, serverId, playerId) => {
        if(err){
            console.log(err);
            return;
        }
        const persistentLogId = `PlayerChat-${uuidv4()}`;
        console.log(`${persistentLogId}: got message ${JSON.stringify(msg)}, with parameters serverId: ${serverId}, playerId: ${playerId}`);
        const saveMessage = {...msg, serverId, playerId};
        try{
            const db = await MongoClient.connect(mongodbUrl);
            var dbo = db.db(Config.mongodbDatabase);
            await dbo.collection(Config.mongodbChatCollection).insertOne(saveMessage);
            db.close();
            console.log(`${persistentLogId}: Saved to the database`);
        }catch(e){
            console.error(`${persistentLogId}: Could not insert chat message: ${e}`);
        }
    }, "*", "*"); 
    
    /**
     * Subscribe to to all player connection events regardless of which server and player it is from
     */
    await natsClient.subscribeToGameServerServerIdEventsPlayerPlayerIdConnect(async (err, msg, serverId, playerId) => {
        if(err){
            console.log(err);
            return;
        }
        const persistentLogId = `PlayerConnected-${uuidv4()}`;
        console.log(`${persistentLogId}: got message ${JSON.stringify(msg)}, with parameters serverId: ${serverId}, playerId: ${playerId}`);
        const saveMessage = {...msg, serverId, playerId};
        try{
            const db = await MongoClient.connect(mongodbUrl);
            var dbo = db.db(Config.mongodbDatabase);
            await dbo.collection(Config.mongodbConnectionCollection).insertOne(saveMessage);
            db.close();
            console.log(`${persistentLogId}: Saved to the database`);
        }catch(e){
            console.error(`${persistentLogId}: Could not insert chat message: ${e}`);
        }
    }, "*", "*");
    
    /**
     * Subscribe to to all player disconnection events regardless of which server and player it is from
     */
    await natsClient.subscribeToGameServerServerIdEventsPlayerPlayerIdDisconnect(async (err, msg, serverId, playerId) => {
        if(err){
            console.log(err);
            return;
        }
        const persistentLogId = `PlayerDisconnected-${uuidv4()}`;
        console.log(`${persistentLogId}: got message ${JSON.stringify(msg)}, with parameters serverId: ${serverId}, playerId: ${playerId}`);
        const saveMessage = {...msg, serverId, playerId};
        try{
            const db = await MongoClient.connect(mongodbUrl);
            var dbo = db.db(Config.mongodbDatabase);
            await dbo.collection(Config.mongodbDisconnectsCollection).insertOne(saveMessage);
            db.close();
            console.log(`${persistentLogId}: Saved to the database`);
        }catch(e){
            console.error(`${persistentLogId}: Could not insert chat message: ${e}`);
        }
    }, "*", "*");
    
    /**
     * Subscribe to to all player on player hit events regardless of which server and player it is from
     */
    await natsClient.subscribeToGameServerServerIdEventsPlayerPlayerIdHit(async (err, msg, serverId, playerId) => {
        if(err){
            console.log(err);
            return;
        }
        const persistentLogId = `PlayerHit-${uuidv4()}`;
        console.log(`${persistentLogId}: got message ${JSON.stringify(msg)}, with parameters serverId: ${serverId}, playerId: ${playerId}`);
        const saveMessage = {...msg, serverId, playerId};
        try{
            const db = await MongoClient.connect(mongodbUrl);
            var dbo = db.db(Config.mongodbDatabase);
            await dbo.collection(Config.mongodbPlayerHitCollection).insertOne(saveMessage);
            db.close();
            console.log(`${persistentLogId}: Saved to the database`);
        }catch(e){
            console.error(`${persistentLogId}: Could not insert chat message: ${e}`);
        }
    }, "*", "*");
    
    /**
     * Subscribe to to all player item pickup events regardless of which server and player it is from
     */
    await natsClient.subscribeToGameServerServerIdEventsPlayerPlayerIdItemItemIdPickup(async (err, msg, serverId, playerId, itemId) => {
        if(err){
            console.log(err);
            return;
        }
        const persistentLogId = `PlayerItemPickup-${uuidv4()}`;
        console.log(`${persistentLogId}: got message ${JSON.stringify(msg)}, with parameters serverId: ${serverId}, playerId: ${playerId}, itemId: ${itemId}`);
        const saveMessage = {...msg, serverId, playerId, itemId};
        try{
            const db = await MongoClient.connect(mongodbUrl);
            var dbo = db.db(Config.mongodbDatabase);
            await dbo.collection(Config.mongodbItemPickupCollection).insertOne(saveMessage);
            db.close();
            console.log(`${persistentLogId}: Saved to the database`);
        }catch(e){
            console.error(`${persistentLogId}: Could not insert chat message: ${e}`);
        }
    }, "*", "*", "*");
    
}
start().catch(e => {console.error(e)});