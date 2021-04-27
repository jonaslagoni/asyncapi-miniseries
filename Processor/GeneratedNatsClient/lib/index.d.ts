/// <reference types="node" />
import { AvailableHooks, ReceivedDataHook, BeforeSendingDataHook, Hooks } from './hooks';
import * as TestClient from './testclient/';
import { ErrorCode, NatsTypescriptTemplateError } from './NatsTypescriptTemplateError';
import { Client, NatsConnectionOptions, Subscription, ServersChangedEvent, SubEvent, ServerInfo, SubscriptionOptions } from 'ts-nats';
import * as gameServerServerIdEventsPlayerPlayerIdItemItemIdPickupChannel from "./channels/GameServerServerIdEventsPlayerPlayerIdItemItemIdPickup";
import * as gameServerServerIdEventsPlayerPlayerIdConnectChannel from "./channels/GameServerServerIdEventsPlayerPlayerIdConnect";
import * as gameServerServerIdEventsPlayerPlayerIdDisconnectChannel from "./channels/GameServerServerIdEventsPlayerPlayerIdDisconnect";
import * as gameServerServerIdEventsPlayerPlayerIdChatChannel from "./channels/GameServerServerIdEventsPlayerPlayerIdChat";
import * as gameServerServerIdEventsPlayerPlayerIdHitChannel from "./channels/GameServerServerIdEventsPlayerPlayerIdHit";
import { PlayerItemPickupPayload } from "./schemas/PlayerItemPickupPayload";
import { PlayerConnectedPayload } from "./schemas/PlayerConnectedPayload";
import { PlayerDisconnectedPayload } from "./schemas/PlayerDisconnectedPayload";
import { PlayerUsedChatPayload } from "./schemas/PlayerUsedChatPayload";
import { AnonymousSchema_9 } from "./schemas/AnonymousSchema_9";
import * as events from 'events';
export declare enum AvailableEvents {
    permissionError = "permissionError",
    close = "close",
    connect = "connect",
    connecting = "connecting",
    disconnect = "disconnect",
    error = "error",
    pingcount = "pingcount",
    pingtimer = "pingtimer",
    reconnect = "reconnect",
    reconnecting = "reconnecting",
    serversChanged = "serversChanged",
    subscribe = "subscribe",
    unsubscribe = "unsubscribe",
    yield = "yield"
}
export { gameServerServerIdEventsPlayerPlayerIdItemItemIdPickupChannel };
export { gameServerServerIdEventsPlayerPlayerIdConnectChannel };
export { gameServerServerIdEventsPlayerPlayerIdDisconnectChannel };
export { gameServerServerIdEventsPlayerPlayerIdChatChannel };
export { gameServerServerIdEventsPlayerPlayerIdHitChannel };
export { PlayerItemPickupPayload };
export { PlayerConnectedPayload };
export { PlayerDisconnectedPayload };
export { PlayerUsedChatPayload };
export { AnonymousSchema_9 };
export { ErrorCode, NatsTypescriptTemplateError };
export { TestClient };
export { AvailableHooks, ReceivedDataHook, BeforeSendingDataHook, Hooks };
export { Client, ServerInfo, ServersChangedEvent, SubEvent };
export declare interface NatsAsyncApiClient {
    on(event: AvailableEvents.permissionError, listener: (error: NatsTypescriptTemplateError) => void): this;
    on(event: AvailableEvents.close, listener: (error: NatsTypescriptTemplateError) => void): this;
    on(event: AvailableEvents.connect, listener: (connection: Client, serverURL: string, info: ServerInfo) => void): this;
    on(event: AvailableEvents.connecting, listener: (error: NatsTypescriptTemplateError) => void): this;
    on(event: AvailableEvents.disconnect, listener: (serverURL: string) => void): this;
    on(event: AvailableEvents.error, listener: (error: NatsTypescriptTemplateError) => void): this;
    on(event: AvailableEvents.pingcount, listener: () => void): this;
    on(event: AvailableEvents.pingtimer, listener: () => void): this;
    on(event: AvailableEvents.reconnect, listener: (connection: Client, serverURL: string, info: ServerInfo) => void): this;
    on(event: AvailableEvents.reconnecting, listener: (serverURL: string) => void): this;
    on(event: AvailableEvents.serversChanged, listener: (e: ServersChangedEvent) => void): this;
    on(event: AvailableEvents.subscribe, listener: (e: SubEvent) => void): this;
    on(event: AvailableEvents.unsubscribe, listener: (e: SubEvent) => void): this;
    on(event: AvailableEvents.yield, listener: () => void): this;
}
/**
 * @class NatsAsyncApiClient
 *
 * The generated client based on your AsyncAPI document.
 */
export declare class NatsAsyncApiClient extends events.EventEmitter {
    private jsonClient?;
    private stringClient?;
    private binaryClient?;
    private options?;
    constructor();
    /**
     * Try to connect to the NATS server with the different payloads.
     * @param options to use, payload is omitted if sat in the AsyncAPI document.
     */
    connect(options: NatsConnectionOptions): Promise<void>;
    /**
     * Disconnect all clients from the server
     */
    disconnect(): Promise<void>;
    /**
     * Returns whether or not any of the clients are closed
     */
    isClosed(): boolean;
    private chainEvents;
    /**
     * Try to connect to the NATS server with user credentials
     *
     * @param userCreds to use
     * @param options to connect with
     */
    connectWithUserCreds(userCreds: string, options?: NatsConnectionOptions): Promise<void>;
    /**
     * Try to connect to the NATS server with user and password
     *
     * @param user username to use
     * @param pass password to use
     * @param options to connect with
     */
    connectWithUserPass(user: string, pass: string, options?: NatsConnectionOptions): Promise<void>;
    /**
     * Try to connect to the NATS server which has no authentication
     
     * @param host to connect to
     * @param options to connect with
     */
    connectToHost(host: string, options?: NatsConnectionOptions): Promise<void>;
    /**
     * Try to connect to the NATS server with NKey authentication
     *
     * @param publicNkey User
     * @param seed private key
     * @param options to connect with
     */
    connectWithNkey(publicNkey: string, seed: string, options?: NatsConnectionOptions): Promise<void>;
    /**
     * Subscribe to the `game/server/{serverId}/events/player/{playerId}/item/{itemId}/pickup`
     *
     * Channel used when a player picks up an item in-game
     *
     * @param onDataCallback to call when messages are received
     * @param serverId parameter to use in topic
     * @param playerId parameter to use in topic
     * @param itemId parameter to use in topic
     * @param flush ensure client is force flushed after subscribing
     * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
     */
    subscribeToGameServerServerIdEventsPlayerPlayerIdItemItemIdPickup(onDataCallback: (err?: NatsTypescriptTemplateError, msg?: PlayerItemPickupPayload, serverId?: string, playerId?: string, itemId?: string) => void, serverId: string, playerId: string, itemId: string, flush?: boolean, options?: SubscriptionOptions): Promise<Subscription>;
    /**
     * Subscribe to the `game/server/{serverId}/events/player/{playerId}/connect`
     *
     * Channel used when a player joins (connect to) the game server
     *
     * @param onDataCallback to call when messages are received
     * @param serverId parameter to use in topic
     * @param playerId parameter to use in topic
     * @param flush ensure client is force flushed after subscribing
     * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
     */
    subscribeToGameServerServerIdEventsPlayerPlayerIdConnect(onDataCallback: (err?: NatsTypescriptTemplateError, msg?: PlayerConnectedPayload, serverId?: string, playerId?: string) => void, serverId: string, playerId: string, flush?: boolean, options?: SubscriptionOptions): Promise<Subscription>;
    /**
     * Subscribe to the `game/server/{serverId}/events/player/{playerId}/disconnect`
     *
     * Channel used when a player leaves (disconnects from) the game server
     *
     * @param onDataCallback to call when messages are received
     * @param serverId parameter to use in topic
     * @param playerId parameter to use in topic
     * @param flush ensure client is force flushed after subscribing
     * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
     */
    subscribeToGameServerServerIdEventsPlayerPlayerIdDisconnect(onDataCallback: (err?: NatsTypescriptTemplateError, msg?: PlayerDisconnectedPayload, serverId?: string, playerId?: string) => void, serverId: string, playerId: string, flush?: boolean, options?: SubscriptionOptions): Promise<Subscription>;
    /**
     * Subscribe to the `game/server/{serverId}/events/player/{playerId}/chat`
     *
     * Channel used when a player writes something in chat
     *
     * @param onDataCallback to call when messages are received
     * @param serverId parameter to use in topic
     * @param playerId parameter to use in topic
     * @param flush ensure client is force flushed after subscribing
     * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
     */
    subscribeToGameServerServerIdEventsPlayerPlayerIdChat(onDataCallback: (err?: NatsTypescriptTemplateError, msg?: PlayerUsedChatPayload, serverId?: string, playerId?: string) => void, serverId: string, playerId: string, flush?: boolean, options?: SubscriptionOptions): Promise<Subscription>;
    /**
     * Subscribe to the `game/server/{serverId}/events/player/{playerId}/hit`
     *
     * Channel used when a player hit another player in-game
     *
     * @param onDataCallback to call when messages are received
     * @param serverId parameter to use in topic
     * @param playerId parameter to use in topic
     * @param flush ensure client is force flushed after subscribing
     * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
     */
    subscribeToGameServerServerIdEventsPlayerPlayerIdHit(onDataCallback: (err?: NatsTypescriptTemplateError, msg?: AnonymousSchema_9, serverId?: string, playerId?: string) => void, serverId: string, playerId: string, flush?: boolean, options?: SubscriptionOptions): Promise<Subscription>;
}
