import { PlayerConnectedPayload } from '../schemas/PlayerConnectedPayload';
import { Client } from 'ts-nats';
/**
 * Module which wraps functionality for the `game/server/{serverId}/events/player/{playerId}/connect` channel
 * @module gameServerServerIdEventsPlayerPlayerIdConnect
 */
/**
 * Internal functionality to publish message to channel
 * game/server/{serverId}/events/player/{playerId}/connect
 *
 * @param message to publish
 * @param client to publish with
 * @param serverId parameter to use in topic
 * @param playerId parameter to use in topic
 */
export declare function publish(message: PlayerConnectedPayload, client: Client, serverId: string, playerId: string): Promise<void>;
