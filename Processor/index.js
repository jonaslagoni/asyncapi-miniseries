
import {NatsAsyncApiClient} from 'GeneratedClient/lib/';
const client = new NatsAsyncApiClient();
client.connectToHost('localhost:8444');
client.subscribeToGameServerServerIdEventsPlayerPlayerIdChat((err, msg, serverId, playerId) => {
    if(err){
        console.log(err);
        return;
    }
    console.log(`PlayerChat: got message ${JSON.stringify(msg)}, with parameters serverId: ${serverId}, playerId: ${playerId}`);
}, "*", "*"); 
client.subscribeToGameServerServerIdEventsPlayerPlayerIdConnect((err, msg, serverId, playerId) => {
    if(err){
        console.log(err);
        return;
    }
    console.log(`PlayerConnected: got message ${JSON.stringify(msg)}, with parameters serverId: ${serverId}, playerId: ${playerId}`);
}, "*", "*");
client.subscribeToGameServerServerIdEventsPlayerPlayerIdDisconnect((err, msg, serverId, playerId) => {
    if(err){
        console.log(err);
        return;
    }
    console.log(`PlayerDisconnected: got message ${JSON.stringify(msg)}, with parameters serverId: ${serverId}, playerId: ${playerId}`);
}, "*", "*");
client.subscribeToGameServerServerIdEventsPlayerPlayerIdHit((err, msg, serverId, playerId) => {
    if(err){
        console.log(err);
        return;
    }
    console.log(`PlayerHit: got message ${JSON.stringify(msg)}, with parameters serverId: ${serverId}, playerId: ${playerId}`);
}, "*", "*");
client.subscribeToGameServerServerIdEventsPlayerPlayerIdItemItemIdPickup((err, msg, serverId, playerId, itemId) => {
    if(err){
        console.log(err);
        return;
    }
    console.log(`PlayerItemPickup: got message ${JSON.stringify(msg)}, with parameters serverId: ${serverId}, playerId: ${playerId}, itemId: ${itemId}`);
}, "*", "*");
