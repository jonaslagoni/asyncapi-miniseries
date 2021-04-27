import {
  PlayerUsedChatPayload
} from '../schemas/PlayerUsedChatPayload';
import {
  Client,
  NatsError,
  Subscription,
  SubscriptionOptions,
  Payload
} from 'ts-nats';
import {
  ErrorCode,
  NatsTypescriptTemplateError
} from '../NatsTypescriptTemplateError';
import {
  Hooks
} from '../hooks';
/**
 * Module which wraps functionality for the `game/server/{serverId}/events/player/{playerId}/chat` channel
 * @module gameServerServerIdEventsPlayerPlayerIdChat
 */
/**
 * Internal functionality to publish message to channel 
 * game/server/{serverId}/events/player/{playerId}/chat
 * 
 * @param message to publish
 * @param client to publish with
 * @param serverId parameter to use in topic
 * @param playerId parameter to use in topic
 */
export function publish(
  message: PlayerUsedChatPayload,
  client: Client, serverId: string, playerId: string
): Promise < void > {
  return new Promise < void > (async (resolve, reject) => {
    try {
      let dataToSend: any = message;
      try {
        let beforeSendingHooks = Hooks.getInstance().getBeforeSendingDataHook();
        for (let hook of beforeSendingHooks) {
          dataToSend = hook(dataToSend);
        }
      } catch (e) {
        const error = NatsTypescriptTemplateError.errorForCode(ErrorCode.HOOK_ERROR, e);
        throw error;
      }
      await client.publish(`game.server.${serverId}.events.player.${playerId}.chat`, dataToSend);
      resolve();
    } catch (e) {
      reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.INTERNAL_NATS_TS_ERROR, e));
    }
  });
};