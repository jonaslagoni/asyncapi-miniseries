import { AnonymousSchema_9 } from '../schemas/AnonymousSchema_9';
import { Client } from 'ts-nats';
/**
 * Module which wraps functionality for the `game/server/{serverId}/events/player/{playerId}/hit` channel
 * @module gameServerServerIdEventsPlayerPlayerIdHit
 */
/**
 * Internal functionality to publish message to channel
 * game/server/{serverId}/events/player/{playerId}/hit
 *
 * @param message to publish
 * @param client to publish with
 * @param serverId parameter to use in topic
 * @param playerId parameter to use in topic
 */
export declare function publish(message: AnonymousSchema_9, client: Client, serverId: string, playerId: string): Promise<void>;
