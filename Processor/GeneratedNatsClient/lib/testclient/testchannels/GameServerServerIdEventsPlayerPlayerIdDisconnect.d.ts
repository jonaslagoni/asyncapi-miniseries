import { PlayerDisconnectedPayload } from '../../schemas/PlayerDisconnectedPayload';
import { Client } from 'ts-nats';
/**
 * Module which wraps functionality for the `game/server/{serverId}/events/player/{playerId}/disconnect` channel
 * @module gameServerServerIdEventsPlayerPlayerIdDisconnect
 */
/**
 * Internal functionality to publish message to channel
 * game/server/{serverId}/events/player/{playerId}/disconnect
 *
 * @param message to publish
 * @param client to publish with
 * @param serverId parameter to use in topic
 * @param playerId parameter to use in topic
 */
export declare function publish(message: PlayerDisconnectedPayload, client: Client, serverId: string, playerId: string): Promise<void>;
