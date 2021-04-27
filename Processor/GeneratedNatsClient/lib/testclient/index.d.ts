/// <reference types="node" />
import { NatsTypescriptTemplateError } from '..//NatsTypescriptTemplateError';
import { Client, NatsConnectionOptions, ServersChangedEvent, SubEvent, ServerInfo } from 'ts-nats';
import * as gameServerServerIdEventsPlayerPlayerIdItemItemIdPickupChannel from "./testchannels/GameServerServerIdEventsPlayerPlayerIdItemItemIdPickup";
import * as gameServerServerIdEventsPlayerPlayerIdConnectChannel from "./testchannels/GameServerServerIdEventsPlayerPlayerIdConnect";
import * as gameServerServerIdEventsPlayerPlayerIdDisconnectChannel from "./testchannels/GameServerServerIdEventsPlayerPlayerIdDisconnect";
import * as gameServerServerIdEventsPlayerPlayerIdChatChannel from "./testchannels/GameServerServerIdEventsPlayerPlayerIdChat";
import * as gameServerServerIdEventsPlayerPlayerIdHitChannel from "./testchannels/GameServerServerIdEventsPlayerPlayerIdHit";
import { PlayerItemPickupPayload } from "..//schemas/PlayerItemPickupPayload";
import { PlayerConnectedPayload } from "..//schemas/PlayerConnectedPayload";
import { PlayerDisconnectedPayload } from "..//schemas/PlayerDisconnectedPayload";
import { PlayerUsedChatPayload } from "..//schemas/PlayerUsedChatPayload";
import { AnonymousSchema_9 } from "..//schemas/AnonymousSchema_9";
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
export declare interface NatsAsyncApiTestClient {
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
 * @class NatsAsyncApiTestClient
 *
 * The test/mirror client which is the reverse to the normal NatsAsyncApiClient.
 */
export declare class NatsAsyncApiTestClient extends events.EventEmitter {
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
     * Publish to the `game/server/{serverId}/events/player/{playerId}/item/{itemId}/pickup` channel
     *
     * Channel used when a player picks up an item in-game
     *
     * @param message to publish
     * @param serverId parameter to use in topic
     * @param playerId parameter to use in topic
     * @param itemId parameter to use in topic
     */
    publishToGameServerServerIdEventsPlayerPlayerIdItemItemIdPickup(message: PlayerItemPickupPayload, serverId: string, playerId: string, itemId: string): Promise<void>;
    /**
     * Publish to the `game/server/{serverId}/events/player/{playerId}/connect` channel
     *
     * Channel used when a player joins (connect to) the game server
     *
     * @param message to publish
     * @param serverId parameter to use in topic
     * @param playerId parameter to use in topic
     */
    publishToGameServerServerIdEventsPlayerPlayerIdConnect(message: PlayerConnectedPayload, serverId: string, playerId: string): Promise<void>;
    /**
     * Publish to the `game/server/{serverId}/events/player/{playerId}/disconnect` channel
     *
     * Channel used when a player leaves (disconnects from) the game server
     *
     * @param message to publish
     * @param serverId parameter to use in topic
     * @param playerId parameter to use in topic
     */
    publishToGameServerServerIdEventsPlayerPlayerIdDisconnect(message: PlayerDisconnectedPayload, serverId: string, playerId: string): Promise<void>;
    /**
     * Publish to the `game/server/{serverId}/events/player/{playerId}/chat` channel
     *
     * Channel used when a player writes something in chat
     *
     * @param message to publish
     * @param serverId parameter to use in topic
     * @param playerId parameter to use in topic
     */
    publishToGameServerServerIdEventsPlayerPlayerIdChat(message: PlayerUsedChatPayload, serverId: string, playerId: string): Promise<void>;
    /**
     * Publish to the `game/server/{serverId}/events/player/{playerId}/hit` channel
     *
     * Channel used when a player hit another player in-game
     *
     * @param message to publish
     * @param serverId parameter to use in topic
     * @param playerId parameter to use in topic
     */
    publishToGameServerServerIdEventsPlayerPlayerIdHit(message: AnonymousSchema_9, serverId: string, playerId: string): Promise<void>;
}
