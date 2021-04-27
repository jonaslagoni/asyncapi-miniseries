## Modules

<dl>
<dt><a href="#module_gameServerServerIdEventsPlayerPlayerIdChat">gameServerServerIdEventsPlayerPlayerIdChat</a></dt>
<dd><p>Module which wraps functionality for the <code>game/server/{serverId}/events/player/{playerId}/chat</code> channel</p>
</dd>
<dt><a href="#module_gameServerServerIdEventsPlayerPlayerIdConnect">gameServerServerIdEventsPlayerPlayerIdConnect</a></dt>
<dd><p>Module which wraps functionality for the <code>game/server/{serverId}/events/player/{playerId}/connect</code> channel</p>
</dd>
<dt><a href="#module_gameServerServerIdEventsPlayerPlayerIdDisconnect">gameServerServerIdEventsPlayerPlayerIdDisconnect</a></dt>
<dd><p>Module which wraps functionality for the <code>game/server/{serverId}/events/player/{playerId}/disconnect</code> channel</p>
</dd>
<dt><a href="#module_gameServerServerIdEventsPlayerPlayerIdHit">gameServerServerIdEventsPlayerPlayerIdHit</a></dt>
<dd><p>Module which wraps functionality for the <code>game/server/{serverId}/events/player/{playerId}/hit</code> channel</p>
</dd>
<dt><a href="#module_gameServerServerIdEventsPlayerPlayerIdItemItemIdPickup">gameServerServerIdEventsPlayerPlayerIdItemItemIdPickup</a></dt>
<dd><p>Module which wraps functionality for the <code>game/server/{serverId}/events/player/{playerId}/item/{itemId}/pickup</code> channel</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#NatsAsyncApiClient">NatsAsyncApiClient</a></dt>
<dd><p>NatsAsyncApiClient</p>
<p>The generated client based on your AsyncAPI document.</p>
</dd>
<dt><a href="#NatsAsyncApiTestClient">NatsAsyncApiTestClient</a></dt>
<dd><p>NatsAsyncApiTestClient</p>
<p>The test/mirror client which is the reverse to the normal NatsAsyncApiClient.</p>
</dd>
</dl>

<a name="module_gameServerServerIdEventsPlayerPlayerIdChat"></a>

## gameServerServerIdEventsPlayerPlayerIdChat
Module which wraps functionality for the `game/server/{serverId}/events/player/{playerId}/chat` channel

<a name="module_gameServerServerIdEventsPlayerPlayerIdChat..subscribe"></a>

### gameServerServerIdEventsPlayerPlayerIdChat~subscribe(onDataCallback, client, serverId, playerId, options)
Internal functionality to setup subscription on the `game/server/{serverId}/events/player/{playerId}/chat` channel

**Kind**: inner method of [<code>gameServerServerIdEventsPlayerPlayerIdChat</code>](#module_gameServerServerIdEventsPlayerPlayerIdChat)  

| Param | Description |
| --- | --- |
| onDataCallback | to call when messages are received |
| client | to subscribe with |
| serverId | parameter to use in topic |
| playerId | parameter to use in topic |
| options | to subscribe with, bindings from the AsyncAPI document overwrite these if specified |

<a name="module_gameServerServerIdEventsPlayerPlayerIdConnect"></a>

## gameServerServerIdEventsPlayerPlayerIdConnect
Module which wraps functionality for the `game/server/{serverId}/events/player/{playerId}/connect` channel

<a name="module_gameServerServerIdEventsPlayerPlayerIdConnect..subscribe"></a>

### gameServerServerIdEventsPlayerPlayerIdConnect~subscribe(onDataCallback, client, serverId, playerId, options)
Internal functionality to setup subscription on the `game/server/{serverId}/events/player/{playerId}/connect` channel

**Kind**: inner method of [<code>gameServerServerIdEventsPlayerPlayerIdConnect</code>](#module_gameServerServerIdEventsPlayerPlayerIdConnect)  

| Param | Description |
| --- | --- |
| onDataCallback | to call when messages are received |
| client | to subscribe with |
| serverId | parameter to use in topic |
| playerId | parameter to use in topic |
| options | to subscribe with, bindings from the AsyncAPI document overwrite these if specified |

<a name="module_gameServerServerIdEventsPlayerPlayerIdDisconnect"></a>

## gameServerServerIdEventsPlayerPlayerIdDisconnect
Module which wraps functionality for the `game/server/{serverId}/events/player/{playerId}/disconnect` channel

<a name="module_gameServerServerIdEventsPlayerPlayerIdDisconnect..subscribe"></a>

### gameServerServerIdEventsPlayerPlayerIdDisconnect~subscribe(onDataCallback, client, serverId, playerId, options)
Internal functionality to setup subscription on the `game/server/{serverId}/events/player/{playerId}/disconnect` channel

**Kind**: inner method of [<code>gameServerServerIdEventsPlayerPlayerIdDisconnect</code>](#module_gameServerServerIdEventsPlayerPlayerIdDisconnect)  

| Param | Description |
| --- | --- |
| onDataCallback | to call when messages are received |
| client | to subscribe with |
| serverId | parameter to use in topic |
| playerId | parameter to use in topic |
| options | to subscribe with, bindings from the AsyncAPI document overwrite these if specified |

<a name="module_gameServerServerIdEventsPlayerPlayerIdHit"></a>

## gameServerServerIdEventsPlayerPlayerIdHit
Module which wraps functionality for the `game/server/{serverId}/events/player/{playerId}/hit` channel

<a name="module_gameServerServerIdEventsPlayerPlayerIdHit..subscribe"></a>

### gameServerServerIdEventsPlayerPlayerIdHit~subscribe(onDataCallback, client, serverId, playerId, options)
Internal functionality to setup subscription on the `game/server/{serverId}/events/player/{playerId}/hit` channel

**Kind**: inner method of [<code>gameServerServerIdEventsPlayerPlayerIdHit</code>](#module_gameServerServerIdEventsPlayerPlayerIdHit)  

| Param | Description |
| --- | --- |
| onDataCallback | to call when messages are received |
| client | to subscribe with |
| serverId | parameter to use in topic |
| playerId | parameter to use in topic |
| options | to subscribe with, bindings from the AsyncAPI document overwrite these if specified |

<a name="module_gameServerServerIdEventsPlayerPlayerIdItemItemIdPickup"></a>

## gameServerServerIdEventsPlayerPlayerIdItemItemIdPickup
Module which wraps functionality for the `game/server/{serverId}/events/player/{playerId}/item/{itemId}/pickup` channel

<a name="module_gameServerServerIdEventsPlayerPlayerIdItemItemIdPickup..subscribe"></a>

### gameServerServerIdEventsPlayerPlayerIdItemItemIdPickup~subscribe(onDataCallback, client, serverId, playerId, itemId, options)
Internal functionality to setup subscription on the `game/server/{serverId}/events/player/{playerId}/item/{itemId}/pickup` channel

**Kind**: inner method of [<code>gameServerServerIdEventsPlayerPlayerIdItemItemIdPickup</code>](#module_gameServerServerIdEventsPlayerPlayerIdItemItemIdPickup)  

| Param | Description |
| --- | --- |
| onDataCallback | to call when messages are received |
| client | to subscribe with |
| serverId | parameter to use in topic |
| playerId | parameter to use in topic |
| itemId | parameter to use in topic |
| options | to subscribe with, bindings from the AsyncAPI document overwrite these if specified |

<a name="NatsAsyncApiClient"></a>

## NatsAsyncApiClient
NatsAsyncApiClient

The generated client based on your AsyncAPI document.

**Kind**: global class  

* [NatsAsyncApiClient](#NatsAsyncApiClient)
    * [.connect(options)](#NatsAsyncApiClient+connect)
    * [.disconnect()](#NatsAsyncApiClient+disconnect)
    * [.isClosed()](#NatsAsyncApiClient+isClosed)
    * [.connectWithUserCreds(userCreds, options)](#NatsAsyncApiClient+connectWithUserCreds)
    * [.connectWithUserPass(user, pass, options)](#NatsAsyncApiClient+connectWithUserPass)
    * [.connectToHost(host, options)](#NatsAsyncApiClient+connectToHost)
    * [.connectWithNkey(publicNkey, seed, options)](#NatsAsyncApiClient+connectWithNkey)
    * [.subscribeToGameServerServerIdEventsPlayerPlayerIdItemItemIdPickup(onDataCallback, serverId, playerId, itemId, flush, options)](#NatsAsyncApiClient+subscribeToGameServerServerIdEventsPlayerPlayerIdItemItemIdPickup)
    * [.subscribeToGameServerServerIdEventsPlayerPlayerIdConnect(onDataCallback, serverId, playerId, flush, options)](#NatsAsyncApiClient+subscribeToGameServerServerIdEventsPlayerPlayerIdConnect)
    * [.subscribeToGameServerServerIdEventsPlayerPlayerIdDisconnect(onDataCallback, serverId, playerId, flush, options)](#NatsAsyncApiClient+subscribeToGameServerServerIdEventsPlayerPlayerIdDisconnect)
    * [.subscribeToGameServerServerIdEventsPlayerPlayerIdChat(onDataCallback, serverId, playerId, flush, options)](#NatsAsyncApiClient+subscribeToGameServerServerIdEventsPlayerPlayerIdChat)
    * [.subscribeToGameServerServerIdEventsPlayerPlayerIdHit(onDataCallback, serverId, playerId, flush, options)](#NatsAsyncApiClient+subscribeToGameServerServerIdEventsPlayerPlayerIdHit)

<a name="NatsAsyncApiClient+connect"></a>

### natsAsyncApiClient.connect(options)
Try to connect to the NATS server with the different payloads.

**Kind**: instance method of [<code>NatsAsyncApiClient</code>](#NatsAsyncApiClient)  

| Param | Description |
| --- | --- |
| options | to use, payload is omitted if sat in the AsyncAPI document. |

<a name="NatsAsyncApiClient+disconnect"></a>

### natsAsyncApiClient.disconnect()
Disconnect all clients from the server

**Kind**: instance method of [<code>NatsAsyncApiClient</code>](#NatsAsyncApiClient)  
<a name="NatsAsyncApiClient+isClosed"></a>

### natsAsyncApiClient.isClosed()
Returns whether or not any of the clients are closed

**Kind**: instance method of [<code>NatsAsyncApiClient</code>](#NatsAsyncApiClient)  
<a name="NatsAsyncApiClient+connectWithUserCreds"></a>

### natsAsyncApiClient.connectWithUserCreds(userCreds, options)
Try to connect to the NATS server with user credentials

**Kind**: instance method of [<code>NatsAsyncApiClient</code>](#NatsAsyncApiClient)  

| Param | Description |
| --- | --- |
| userCreds | to use |
| options | to connect with |

<a name="NatsAsyncApiClient+connectWithUserPass"></a>

### natsAsyncApiClient.connectWithUserPass(user, pass, options)
Try to connect to the NATS server with user and password

**Kind**: instance method of [<code>NatsAsyncApiClient</code>](#NatsAsyncApiClient)  

| Param | Description |
| --- | --- |
| user | username to use |
| pass | password to use |
| options | to connect with |

<a name="NatsAsyncApiClient+connectToHost"></a>

### natsAsyncApiClient.connectToHost(host, options)
Try to connect to the NATS server which has no authentication

**Kind**: instance method of [<code>NatsAsyncApiClient</code>](#NatsAsyncApiClient)  

| Param | Description |
| --- | --- |
| host | to connect to |
| options | to connect with |

<a name="NatsAsyncApiClient+connectWithNkey"></a>

### natsAsyncApiClient.connectWithNkey(publicNkey, seed, options)
Try to connect to the NATS server with NKey authentication

**Kind**: instance method of [<code>NatsAsyncApiClient</code>](#NatsAsyncApiClient)  

| Param | Description |
| --- | --- |
| publicNkey | User |
| seed | private key |
| options | to connect with |

<a name="NatsAsyncApiClient+subscribeToGameServerServerIdEventsPlayerPlayerIdItemItemIdPickup"></a>

### natsAsyncApiClient.subscribeToGameServerServerIdEventsPlayerPlayerIdItemItemIdPickup(onDataCallback, serverId, playerId, itemId, flush, options)
Subscribe to the `game/server/{serverId}/events/player/{playerId}/item/{itemId}/pickup`

Channel used when a player picks up an item in-game

**Kind**: instance method of [<code>NatsAsyncApiClient</code>](#NatsAsyncApiClient)  

| Param | Description |
| --- | --- |
| onDataCallback | to call when messages are received |
| serverId | parameter to use in topic |
| playerId | parameter to use in topic |
| itemId | parameter to use in topic |
| flush | ensure client is force flushed after subscribing |
| options | to subscribe with, bindings from the AsyncAPI document overwrite these if specified |

<a name="NatsAsyncApiClient+subscribeToGameServerServerIdEventsPlayerPlayerIdConnect"></a>

### natsAsyncApiClient.subscribeToGameServerServerIdEventsPlayerPlayerIdConnect(onDataCallback, serverId, playerId, flush, options)
Subscribe to the `game/server/{serverId}/events/player/{playerId}/connect`

Channel used when a player joins (connect to) the game server

**Kind**: instance method of [<code>NatsAsyncApiClient</code>](#NatsAsyncApiClient)  

| Param | Description |
| --- | --- |
| onDataCallback | to call when messages are received |
| serverId | parameter to use in topic |
| playerId | parameter to use in topic |
| flush | ensure client is force flushed after subscribing |
| options | to subscribe with, bindings from the AsyncAPI document overwrite these if specified |

<a name="NatsAsyncApiClient+subscribeToGameServerServerIdEventsPlayerPlayerIdDisconnect"></a>

### natsAsyncApiClient.subscribeToGameServerServerIdEventsPlayerPlayerIdDisconnect(onDataCallback, serverId, playerId, flush, options)
Subscribe to the `game/server/{serverId}/events/player/{playerId}/disconnect`

Channel used when a player leaves (disconnects from) the game server

**Kind**: instance method of [<code>NatsAsyncApiClient</code>](#NatsAsyncApiClient)  

| Param | Description |
| --- | --- |
| onDataCallback | to call when messages are received |
| serverId | parameter to use in topic |
| playerId | parameter to use in topic |
| flush | ensure client is force flushed after subscribing |
| options | to subscribe with, bindings from the AsyncAPI document overwrite these if specified |

<a name="NatsAsyncApiClient+subscribeToGameServerServerIdEventsPlayerPlayerIdChat"></a>

### natsAsyncApiClient.subscribeToGameServerServerIdEventsPlayerPlayerIdChat(onDataCallback, serverId, playerId, flush, options)
Subscribe to the `game/server/{serverId}/events/player/{playerId}/chat`

Channel used when a player writes something in chat

**Kind**: instance method of [<code>NatsAsyncApiClient</code>](#NatsAsyncApiClient)  

| Param | Description |
| --- | --- |
| onDataCallback | to call when messages are received |
| serverId | parameter to use in topic |
| playerId | parameter to use in topic |
| flush | ensure client is force flushed after subscribing |
| options | to subscribe with, bindings from the AsyncAPI document overwrite these if specified |

<a name="NatsAsyncApiClient+subscribeToGameServerServerIdEventsPlayerPlayerIdHit"></a>

### natsAsyncApiClient.subscribeToGameServerServerIdEventsPlayerPlayerIdHit(onDataCallback, serverId, playerId, flush, options)
Subscribe to the `game/server/{serverId}/events/player/{playerId}/hit`

Channel used when a player hit another player in-game

**Kind**: instance method of [<code>NatsAsyncApiClient</code>](#NatsAsyncApiClient)  

| Param | Description |
| --- | --- |
| onDataCallback | to call when messages are received |
| serverId | parameter to use in topic |
| playerId | parameter to use in topic |
| flush | ensure client is force flushed after subscribing |
| options | to subscribe with, bindings from the AsyncAPI document overwrite these if specified |

<a name="NatsAsyncApiTestClient"></a>

## NatsAsyncApiTestClient
NatsAsyncApiTestClient

The test/mirror client which is the reverse to the normal NatsAsyncApiClient.

**Kind**: global class  

* [NatsAsyncApiTestClient](#NatsAsyncApiTestClient)
    * [.connect(options)](#NatsAsyncApiTestClient+connect)
    * [.disconnect()](#NatsAsyncApiTestClient+disconnect)
    * [.isClosed()](#NatsAsyncApiTestClient+isClosed)
    * [.connectWithUserCreds(userCreds, options)](#NatsAsyncApiTestClient+connectWithUserCreds)
    * [.connectWithUserPass(user, pass, options)](#NatsAsyncApiTestClient+connectWithUserPass)
    * [.connectToHost(host, options)](#NatsAsyncApiTestClient+connectToHost)
    * [.connectWithNkey(publicNkey, seed, options)](#NatsAsyncApiTestClient+connectWithNkey)
    * [.publishToGameServerServerIdEventsPlayerPlayerIdItemItemIdPickup(message, serverId, playerId, itemId)](#NatsAsyncApiTestClient+publishToGameServerServerIdEventsPlayerPlayerIdItemItemIdPickup)
    * [.publishToGameServerServerIdEventsPlayerPlayerIdConnect(message, serverId, playerId)](#NatsAsyncApiTestClient+publishToGameServerServerIdEventsPlayerPlayerIdConnect)
    * [.publishToGameServerServerIdEventsPlayerPlayerIdDisconnect(message, serverId, playerId)](#NatsAsyncApiTestClient+publishToGameServerServerIdEventsPlayerPlayerIdDisconnect)
    * [.publishToGameServerServerIdEventsPlayerPlayerIdChat(message, serverId, playerId)](#NatsAsyncApiTestClient+publishToGameServerServerIdEventsPlayerPlayerIdChat)
    * [.publishToGameServerServerIdEventsPlayerPlayerIdHit(message, serverId, playerId)](#NatsAsyncApiTestClient+publishToGameServerServerIdEventsPlayerPlayerIdHit)

<a name="NatsAsyncApiTestClient+connect"></a>

### natsAsyncApiTestClient.connect(options)
Try to connect to the NATS server with the different payloads.

**Kind**: instance method of [<code>NatsAsyncApiTestClient</code>](#NatsAsyncApiTestClient)  

| Param | Description |
| --- | --- |
| options | to use, payload is omitted if sat in the AsyncAPI document. |

<a name="NatsAsyncApiTestClient+disconnect"></a>

### natsAsyncApiTestClient.disconnect()
Disconnect all clients from the server

**Kind**: instance method of [<code>NatsAsyncApiTestClient</code>](#NatsAsyncApiTestClient)  
<a name="NatsAsyncApiTestClient+isClosed"></a>

### natsAsyncApiTestClient.isClosed()
Returns whether or not any of the clients are closed

**Kind**: instance method of [<code>NatsAsyncApiTestClient</code>](#NatsAsyncApiTestClient)  
<a name="NatsAsyncApiTestClient+connectWithUserCreds"></a>

### natsAsyncApiTestClient.connectWithUserCreds(userCreds, options)
Try to connect to the NATS server with user credentials

**Kind**: instance method of [<code>NatsAsyncApiTestClient</code>](#NatsAsyncApiTestClient)  

| Param | Description |
| --- | --- |
| userCreds | to use |
| options | to connect with |

<a name="NatsAsyncApiTestClient+connectWithUserPass"></a>

### natsAsyncApiTestClient.connectWithUserPass(user, pass, options)
Try to connect to the NATS server with user and password

**Kind**: instance method of [<code>NatsAsyncApiTestClient</code>](#NatsAsyncApiTestClient)  

| Param | Description |
| --- | --- |
| user | username to use |
| pass | password to use |
| options | to connect with |

<a name="NatsAsyncApiTestClient+connectToHost"></a>

### natsAsyncApiTestClient.connectToHost(host, options)
Try to connect to the NATS server which has no authentication

**Kind**: instance method of [<code>NatsAsyncApiTestClient</code>](#NatsAsyncApiTestClient)  

| Param | Description |
| --- | --- |
| host | to connect to |
| options | to connect with |

<a name="NatsAsyncApiTestClient+connectWithNkey"></a>

### natsAsyncApiTestClient.connectWithNkey(publicNkey, seed, options)
Try to connect to the NATS server with NKey authentication

**Kind**: instance method of [<code>NatsAsyncApiTestClient</code>](#NatsAsyncApiTestClient)  

| Param | Description |
| --- | --- |
| publicNkey | User |
| seed | private key |
| options | to connect with |

<a name="NatsAsyncApiTestClient+publishToGameServerServerIdEventsPlayerPlayerIdItemItemIdPickup"></a>

### natsAsyncApiTestClient.publishToGameServerServerIdEventsPlayerPlayerIdItemItemIdPickup(message, serverId, playerId, itemId)
Publish to the `game/server/{serverId}/events/player/{playerId}/item/{itemId}/pickup` channel

Channel used when a player picks up an item in-game

**Kind**: instance method of [<code>NatsAsyncApiTestClient</code>](#NatsAsyncApiTestClient)  

| Param | Description |
| --- | --- |
| message | to publish |
| serverId | parameter to use in topic |
| playerId | parameter to use in topic |
| itemId | parameter to use in topic |

<a name="NatsAsyncApiTestClient+publishToGameServerServerIdEventsPlayerPlayerIdConnect"></a>

### natsAsyncApiTestClient.publishToGameServerServerIdEventsPlayerPlayerIdConnect(message, serverId, playerId)
Publish to the `game/server/{serverId}/events/player/{playerId}/connect` channel

Channel used when a player joins (connect to) the game server

**Kind**: instance method of [<code>NatsAsyncApiTestClient</code>](#NatsAsyncApiTestClient)  

| Param | Description |
| --- | --- |
| message | to publish |
| serverId | parameter to use in topic |
| playerId | parameter to use in topic |

<a name="NatsAsyncApiTestClient+publishToGameServerServerIdEventsPlayerPlayerIdDisconnect"></a>

### natsAsyncApiTestClient.publishToGameServerServerIdEventsPlayerPlayerIdDisconnect(message, serverId, playerId)
Publish to the `game/server/{serverId}/events/player/{playerId}/disconnect` channel

Channel used when a player leaves (disconnects from) the game server

**Kind**: instance method of [<code>NatsAsyncApiTestClient</code>](#NatsAsyncApiTestClient)  

| Param | Description |
| --- | --- |
| message | to publish |
| serverId | parameter to use in topic |
| playerId | parameter to use in topic |

<a name="NatsAsyncApiTestClient+publishToGameServerServerIdEventsPlayerPlayerIdChat"></a>

### natsAsyncApiTestClient.publishToGameServerServerIdEventsPlayerPlayerIdChat(message, serverId, playerId)
Publish to the `game/server/{serverId}/events/player/{playerId}/chat` channel

Channel used when a player writes something in chat

**Kind**: instance method of [<code>NatsAsyncApiTestClient</code>](#NatsAsyncApiTestClient)  

| Param | Description |
| --- | --- |
| message | to publish |
| serverId | parameter to use in topic |
| playerId | parameter to use in topic |

<a name="NatsAsyncApiTestClient+publishToGameServerServerIdEventsPlayerPlayerIdHit"></a>

### natsAsyncApiTestClient.publishToGameServerServerIdEventsPlayerPlayerIdHit(message, serverId, playerId)
Publish to the `game/server/{serverId}/events/player/{playerId}/hit` channel

Channel used when a player hit another player in-game

**Kind**: instance method of [<code>NatsAsyncApiTestClient</code>](#NatsAsyncApiTestClient)  

| Param | Description |
| --- | --- |
| message | to publish |
| serverId | parameter to use in topic |
| playerId | parameter to use in topic |

