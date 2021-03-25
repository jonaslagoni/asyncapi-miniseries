
const {NatsAsyncApiClient} = require('NatsClient');
const { v4: uuidv4 } = require('uuid');
const MongoClient = require('mongodb').MongoClient;
const Config = require('./config');
var mongodbUrl = `mongodb://${Config.mongodbHost}`;
const natsClient = new NatsAsyncApiClient();
async function start(){
    await natsClient.connectToHost(Config.natsHost);

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
            console.error(`${persistentLogId}: Could not insert chat message`);
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
            console.error(`${persistentLogId}: Could not insert chat message`);
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
            console.error(`${persistentLogId}: Could not insert chat message`);
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
            console.error(`${persistentLogId}: Could not insert chat message`);
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
            await dbo.collection(Config.mongodbDisconnectsCollection).insertOne(saveMessage);
            db.close();
            console.log(`${persistentLogId}: Saved to the database`);
        }catch(e){
            console.error(`${persistentLogId}: Could not insert chat message`);
        }
    }, "*", "*", "*");
    
}
start().catch(e => {console.error(e)});