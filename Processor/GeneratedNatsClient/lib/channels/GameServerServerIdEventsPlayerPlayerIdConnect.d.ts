import { PlayerConnectedPayload } from '../schemas/PlayerConnectedPayload';
import { Client, Subscription, SubscriptionOptions } from 'ts-nats';
import { NatsTypescriptTemplateError } from '../NatsTypescriptTemplateError';
/**
 * Module which wraps functionality for the `game/server/{serverId}/events/player/{playerId}/connect` channel
 * @module gameServerServerIdEventsPlayerPlayerIdConnect
 */
/**
 * Internal functionality to setup subscription on the `game/server/{serverId}/events/player/{playerId}/connect` channel
 *
 * @param onDataCallback to call when messages are received
 * @param client to subscribe with
 * @param serverId parameter to use in topic
 * @param playerId parameter to use in topic
 * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
 */
export declare function subscribe(onDataCallback: (err?: NatsTypescriptTemplateError, msg?: PlayerConnectedPayload, serverId?: string, playerId?: string) => void, client: Client, serverId: string, playerId: string, options?: SubscriptionOptions): Promise<Subscription>;
