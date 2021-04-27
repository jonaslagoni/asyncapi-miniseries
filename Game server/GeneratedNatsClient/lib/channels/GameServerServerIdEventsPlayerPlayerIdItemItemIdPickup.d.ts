import { PlayerItemPickupPayload } from '../schemas/PlayerItemPickupPayload';
import { Client } from 'ts-nats';
/**
 * Module which wraps functionality for the `game/server/{serverId}/events/player/{playerId}/item/{itemId}/pickup` channel
 * @module gameServerServerIdEventsPlayerPlayerIdItemItemIdPickup
 */
/**
 * Internal functionality to publish message to channel
 * game/server/{serverId}/events/player/{playerId}/item/{itemId}/pickup
 *
 * @param message to publish
 * @param client to publish with
 * @param serverId parameter to use in topic
 * @param playerId parameter to use in topic
 * @param itemId parameter to use in topic
 */
export declare function publish(message: PlayerItemPickupPayload, client: Client, serverId: string, playerId: string, itemId: string): Promise<void>;
