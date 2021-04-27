import { PlayerItemPickupPayload } from '../schemas/PlayerItemPickupPayload';
import { Client, Subscription, SubscriptionOptions } from 'ts-nats';
import { NatsTypescriptTemplateError } from '../NatsTypescriptTemplateError';
/**
 * Module which wraps functionality for the `game/server/{serverId}/events/player/{playerId}/item/{itemId}/pickup` channel
 * @module gameServerServerIdEventsPlayerPlayerIdItemItemIdPickup
 */
/**
 * Internal functionality to setup subscription on the `game/server/{serverId}/events/player/{playerId}/item/{itemId}/pickup` channel
 *
 * @param onDataCallback to call when messages are received
 * @param client to subscribe with
 * @param serverId parameter to use in topic
 * @param playerId parameter to use in topic
 * @param itemId parameter to use in topic
 * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
 */
export declare function subscribe(onDataCallback: (err?: NatsTypescriptTemplateError, msg?: PlayerItemPickupPayload, serverId?: string, playerId?: string, itemId?: string) => void, client: Client, serverId: string, playerId: string, itemId: string, options?: SubscriptionOptions): Promise<Subscription>;
