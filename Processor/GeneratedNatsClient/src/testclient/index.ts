import {
  fromSeed
} from 'ts-nkeys';
import {
  ErrorCode,
  NatsTypescriptTemplateError
} from '..//NatsTypescriptTemplateError';
import {
  Client,
  NatsConnectionOptions,
  connect,
  Payload,
  NatsError,
  Subscription,
  ServersChangedEvent,
  SubEvent,
  ServerInfo,
  SubscriptionOptions
} from 'ts-nats';
import * as gameServerServerIdEventsPlayerPlayerIdItemItemIdPickupChannel from "./testchannels/GameServerServerIdEventsPlayerPlayerIdItemItemIdPickup";
import * as gameServerServerIdEventsPlayerPlayerIdConnectChannel from "./testchannels/GameServerServerIdEventsPlayerPlayerIdConnect";
import * as gameServerServerIdEventsPlayerPlayerIdDisconnectChannel from "./testchannels/GameServerServerIdEventsPlayerPlayerIdDisconnect";
import * as gameServerServerIdEventsPlayerPlayerIdChatChannel from "./testchannels/GameServerServerIdEventsPlayerPlayerIdChat";
import * as gameServerServerIdEventsPlayerPlayerIdHitChannel from "./testchannels/GameServerServerIdEventsPlayerPlayerIdHit";
import {
  PlayerItemPickupPayload
} from "..//schemas/PlayerItemPickupPayload";
import {
  PlayerConnectedPayload
} from "..//schemas/PlayerConnectedPayload";
import {
  PlayerDisconnectedPayload
} from "..//schemas/PlayerDisconnectedPayload";
import {
  PlayerUsedChatPayload
} from "..//schemas/PlayerUsedChatPayload";
import {
  AnonymousSchema_9
} from "..//schemas/AnonymousSchema_9";
import * as events from 'events';
export enum AvailableEvents {
  permissionError = 'permissionError',
    close = 'close',
    connect = 'connect',
    connecting = 'connecting',
    disconnect = 'disconnect',
    error = 'error',
    pingcount = 'pingcount',
    pingtimer = 'pingtimer',
    reconnect = 'reconnect',
    reconnecting = 'reconnecting',
    serversChanged = 'serversChanged',
    subscribe = 'subscribe',
    unsubscribe = 'unsubscribe',
    yield = 'yield'
}
export {
  gameServerServerIdEventsPlayerPlayerIdItemItemIdPickupChannel
};
export {
  gameServerServerIdEventsPlayerPlayerIdConnectChannel
};
export {
  gameServerServerIdEventsPlayerPlayerIdDisconnectChannel
};
export {
  gameServerServerIdEventsPlayerPlayerIdChatChannel
};
export {
  gameServerServerIdEventsPlayerPlayerIdHitChannel
};
export {
  PlayerItemPickupPayload
};
export {
  PlayerConnectedPayload
};
export {
  PlayerDisconnectedPayload
};
export {
  PlayerUsedChatPayload
};
export {
  AnonymousSchema_9
};
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
export class NatsAsyncApiTestClient extends events.EventEmitter {
  private jsonClient ? : Client;
  private stringClient ? : Client;
  private binaryClient ? : Client;
  private options ? : NatsConnectionOptions;
  constructor() {
    super();
  }
  /**
   * Try to connect to the NATS server with the different payloads.
   * @param options to use, payload is omitted if sat in the AsyncAPI document.
   */
  connect(options: NatsConnectionOptions): Promise < void > {
    return new Promise(async (resolve: () => void, reject: (error: any) => void) => {
      this.options = options;
      try {
        if (!this.jsonClient || this.jsonClient!.isClosed()) {
          this.options.payload = Payload.JSON;
          this.jsonClient = await connect(this.options);
          this.chainEvents(this.jsonClient);
        }
        resolve();
      } catch (e) {
        reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.INTERNAL_NATS_TS_ERROR, e));
      }
    })
  }
  /**
   * Disconnect all clients from the server
   */
  async disconnect() {
    if (!this.isClosed()) {
      await this.jsonClient!.drain();
    }
  }
  /**
   * Returns whether or not any of the clients are closed
   */
  isClosed() {
    if (!this.jsonClient || this.jsonClient!.isClosed()) {
      return true;
    }
    return false;
  }
  private chainEvents(ns: Client) {
    ns.on('permissionError', (e: NatsError) => {
      this.emit(AvailableEvents.permissionError, NatsTypescriptTemplateError.errorForCode(ErrorCode.INTERNAL_NATS_TS_ERROR, e))
    });
    ns.on('close', (e: NatsError) => {
      this.emit(AvailableEvents.close, NatsTypescriptTemplateError.errorForCode(ErrorCode.INTERNAL_NATS_TS_ERROR, e))
    });
    ns.on('connect', (connection: Client, serverURL: string, info: ServerInfo) => {
      this.emit(AvailableEvents.connect, connection, serverURL, info)
    });
    ns.on('connecting', (serverURL: string) => {
      this.emit(AvailableEvents.connecting, serverURL)
    });
    ns.on('disconnect', (serverURL: string) => {
      this.emit(AvailableEvents.disconnect, serverURL)
    });
    ns.on('error', (e: NatsError) => {
      this.emit(AvailableEvents.error, NatsTypescriptTemplateError.errorForCode(ErrorCode.INTERNAL_NATS_TS_ERROR, e))
    });
    ns.on('pingcount', () => {
      this.emit(AvailableEvents.pingcount)
    });
    ns.on('pingtimer', () => {
      this.emit(AvailableEvents.pingtimer)
    });
    ns.on('reconnect', (connection: Client, serverURL: string, info: ServerInfo) => {
      this.emit(AvailableEvents.reconnect, connection, serverURL, info)
    });
    ns.on('reconnecting', (serverURL: string) => {
      this.emit(AvailableEvents.reconnecting, serverURL)
    });
    ns.on('serversChanged', (e: ServersChangedEvent) => {
      this.emit(AvailableEvents.serversChanged, e)
    });
    ns.on('subscribe', (e: SubEvent) => {
      this.emit(AvailableEvents.subscribe, e)
    });
    ns.on('unsubscribe', (e: SubEvent) => {
      this.emit(AvailableEvents.unsubscribe, e)
    });
    ns.on('yield', () => {
      this.emit(AvailableEvents.yield)
    });
  }
  /**
   * Try to connect to the NATS server with user credentials
   *
   * @param userCreds to use
   * @param options to connect with
   */
  async connectWithUserCreds(userCreds: string, options ? : NatsConnectionOptions) {
    await this.connect({
      userCreds: userCreds,
      ...options
    });
  }
  /**
   * Try to connect to the NATS server with user and password
   * 
   * @param user username to use
   * @param pass password to use
   * @param options to connect with
   */
  async connectWithUserPass(user: string, pass: string, options ? : NatsConnectionOptions) {
    await this.connect({
      user: user,
      pass: pass,
      ...options
    });
  }
  /**
   * Try to connect to the NATS server which has no authentication
   
   * @param host to connect to
   * @param options to connect with
   */
  async connectToHost(host: string, options ? : NatsConnectionOptions) {
    await this.connect({
      servers: [host],
      ...options
    });
  }
  /**
   * Try to connect to the NATS server with NKey authentication
   * 
   * @param publicNkey User
   * @param seed private key
   * @param options to connect with
   */
  async connectWithNkey(publicNkey: string, seed: string, options ? : NatsConnectionOptions) {
    await this.connect({
      nkey: publicNkey,
      nonceSigner: (nonce: string): Buffer => {
        const sk = fromSeed(Buffer.from(seed));
        return sk.sign(Buffer.from(nonce));
      },
      ...options
    });
  }
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
  public publishToGameServerServerIdEventsPlayerPlayerIdItemItemIdPickup(
    message: PlayerItemPickupPayload, serverId: string, playerId: string, itemId: string
  ): Promise < void > {
    const nc: Client = this.jsonClient!;
    if (nc) {
      return gameServerServerIdEventsPlayerPlayerIdItemItemIdPickupChannel.publish(
        message,
        nc, serverId, playerId, itemId
      );
    } else {
      return Promise.reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
    }
  }
  /**
   * Publish to the `game/server/{serverId}/events/player/{playerId}/connect` channel 
   * 
   * Channel used when a player joins (connect to) the game server
   * 
   * @param message to publish
   * @param serverId parameter to use in topic
   * @param playerId parameter to use in topic
   */
  public publishToGameServerServerIdEventsPlayerPlayerIdConnect(
    message: PlayerConnectedPayload, serverId: string, playerId: string
  ): Promise < void > {
    const nc: Client = this.jsonClient!;
    if (nc) {
      return gameServerServerIdEventsPlayerPlayerIdConnectChannel.publish(
        message,
        nc, serverId, playerId
      );
    } else {
      return Promise.reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
    }
  }
  /**
   * Publish to the `game/server/{serverId}/events/player/{playerId}/disconnect` channel 
   * 
   * Channel used when a player leaves (disconnects from) the game server
   * 
   * @param message to publish
   * @param serverId parameter to use in topic
   * @param playerId parameter to use in topic
   */
  public publishToGameServerServerIdEventsPlayerPlayerIdDisconnect(
    message: PlayerDisconnectedPayload, serverId: string, playerId: string
  ): Promise < void > {
    const nc: Client = this.jsonClient!;
    if (nc) {
      return gameServerServerIdEventsPlayerPlayerIdDisconnectChannel.publish(
        message,
        nc, serverId, playerId
      );
    } else {
      return Promise.reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
    }
  }
  /**
   * Publish to the `game/server/{serverId}/events/player/{playerId}/chat` channel 
   * 
   * Channel used when a player writes something in chat
   * 
   * @param message to publish
   * @param serverId parameter to use in topic
   * @param playerId parameter to use in topic
   */
  public publishToGameServerServerIdEventsPlayerPlayerIdChat(
    message: PlayerUsedChatPayload, serverId: string, playerId: string
  ): Promise < void > {
    const nc: Client = this.jsonClient!;
    if (nc) {
      return gameServerServerIdEventsPlayerPlayerIdChatChannel.publish(
        message,
        nc, serverId, playerId
      );
    } else {
      return Promise.reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
    }
  }
  /**
   * Publish to the `game/server/{serverId}/events/player/{playerId}/hit` channel 
   * 
   * Channel used when a player hit another player in-game
   * 
   * @param message to publish
   * @param serverId parameter to use in topic
   * @param playerId parameter to use in topic
   */
  public publishToGameServerServerIdEventsPlayerPlayerIdHit(
    message: AnonymousSchema_9, serverId: string, playerId: string
  ): Promise < void > {
    const nc: Client = this.jsonClient!;
    if (nc) {
      return gameServerServerIdEventsPlayerPlayerIdHitChannel.publish(
        message,
        nc, serverId, playerId
      );
    } else {
      return Promise.reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
    }
  }
}