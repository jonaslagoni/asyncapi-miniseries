
import {NatsAsyncApiClient} from 'GeneratedClient/lib/';
const MongoClient = require('mongodb').MongoClient;
const Config = require('./config');
var url = `mongodb://${Config.mongodbHost}`;

const client = new NatsAsyncApiClient();
client.connectToHost('localhost:8444');
client.subscribeToGameServerServerIdEventsPlayerPlayerIdChat(async (err, msg, serverId, playerId) => {
    if(err){
        console.log(err);
        return;
    }
    const persistentLogId = `PlayerChat-${uuidv4}`;
    console.log(`${persistentLogId}: got message ${JSON.stringify(msg)}, with parameters serverId: ${serverId}, playerId: ${playerId}`);
    const saveMessage = {...msg, serverId, playerId};
    try{
        const db = await MongoClient.connect(url);
        var dbo = db.db(Config.mongodbDatabase);
        await dbo.collection(Config.mongodbChatCollection).insertOne(saveMessage);
        db.close();
        console.log(`${persistentLogId}: Saved to the database`);
    }catch(e){
        console.error(`${persistentLogId}: Could not insert chat message`);
    }
}, "*", "*"); 
client.subscribeToGameServerServerIdEventsPlayerPlayerIdConnect((err, msg, serverId, playerId) => {
    if(err){
        console.log(err);
        return;
    }
    const persistentLogId = `PlayerConnected-${uuidv4}`;
    console.log(`${persistentLogId}: got message ${JSON.stringify(msg)}, with parameters serverId: ${serverId}, playerId: ${playerId}`);
    const saveMessage = {...msg, serverId, playerId};
    try{
        const db = await MongoClient.connect(url);
        var dbo = db.db(Config.mongodbDatabase);
        await dbo.collection(Config.mongodbConnectionCollection).insertOne(saveMessage);
        db.close();
        console.log(`${persistentLogId}: Saved to the database`);
    }catch(e){
        console.error(`${persistentLogId}: Could not insert chat message`);
    }
}, "*", "*");
client.subscribeToGameServerServerIdEventsPlayerPlayerIdDisconnect((err, msg, serverId, playerId) => {
    if(err){
        console.log(err);
        return;
    }
    const persistentLogId = `PlayerDisconnected-${uuidv4}`;
    console.log(`${persistentLogId}: got message ${JSON.stringify(msg)}, with parameters serverId: ${serverId}, playerId: ${playerId}`);
    const saveMessage = {...msg, serverId, playerId};
    try{
        const db = await MongoClient.connect(url);
        var dbo = db.db(Config.mongodbDatabase);
        await dbo.collection(Config.mongodbDisconnectsCollection).insertOne(saveMessage);
        db.close();
        console.log(`${persistentLogId}: Saved to the database`);
    }catch(e){
        console.error(`${persistentLogId}: Could not insert chat message`);
    }
}, "*", "*");
client.subscribeToGameServerServerIdEventsPlayerPlayerIdHit((err, msg, serverId, playerId) => {
    if(err){
        console.log(err);
        return;
    }
    const persistentLogId = `PlayerHit-${uuidv4}`;
    console.log(`${persistentLogId}: got message ${JSON.stringify(msg)}, with parameters serverId: ${serverId}, playerId: ${playerId}`);
    const saveMessage = {...msg, serverId, playerId};
    try{
        const db = await MongoClient.connect(url);
        var dbo = db.db(Config.mongodbDatabase);
        await dbo.collection(Config.mongodbPlayerHitCollection).insertOne(saveMessage);
        db.close();
        console.log(`${persistentLogId}: Saved to the database`);
    }catch(e){
        console.error(`${persistentLogId}: Could not insert chat message`);
    }
}, "*", "*");
client.subscribeToGameServerServerIdEventsPlayerPlayerIdItemItemIdPickup((err, msg, serverId, playerId, itemId) => {
    if(err){
        console.log(err);
        return;
    }
    const persistentLogId = `PlayerItemPickup-${uuidv4}`;
    console.log(`${persistentLogId}: got message ${JSON.stringify(msg)}, with parameters serverId: ${serverId}, playerId: ${playerId}, itemId: ${itemId}`);
    const saveMessage = {...msg, serverId, playerId, itemId};
    try{
        const db = await MongoClient.connect(url);
        var dbo = db.db(Config.mongodbDatabase);
        await dbo.collection(Config.mongodbDisconnectsCollection).insertOne(saveMessage);
        db.close();
        console.log(`${persistentLogId}: Saved to the database`);
    }catch(e){
        console.error(`${persistentLogId}: Could not insert chat message`);
    }
}, "*", "*");
