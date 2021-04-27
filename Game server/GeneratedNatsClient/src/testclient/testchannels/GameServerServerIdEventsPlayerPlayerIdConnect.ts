import {
  PlayerConnectedPayload
} from '../../schemas/PlayerConnectedPayload';
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
} from '../../NatsTypescriptTemplateError';
import {
  Hooks
} from '../../hooks';
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
export function subscribe(
  onDataCallback: (
    err ? : NatsTypescriptTemplateError,
    msg ? : PlayerConnectedPayload, serverId ? : string, playerId ? : string) => void,
  client: Client, serverId: string, playerId: string,
  options ? : SubscriptionOptions
): Promise < Subscription > {
  return new Promise(async (resolve, reject) => {
    let subscribeOptions: SubscriptionOptions = {
      ...options
    };
    try {
      let subscription = await client.subscribe(`game.server.${serverId}.events.player.${playerId}.connect`, (err, msg) => {
        if (err) {
          onDataCallback(NatsTypescriptTemplateError.errorForCode(ErrorCode.INTERNAL_NATS_TS_ERROR, err));
        } else {
          const unmodifiedChannel = `game.server.{serverId}.events.player.{playerId}.connect`;
          let channel = msg.subject;
          const serverIdSplit = unmodifiedChannel.split("{serverId}");
          const playerIdSplit = serverIdSplit[1].split("{playerId}");
          const splits = [
            serverIdSplit[0],
            playerIdSplit[0],
            playerIdSplit[1]
          ];
          channel = channel.substring(splits[0].length);
          const serverIdEnd = channel.indexOf(splits[1]);
          const serverIdParam = "" + channel.substring(0, serverIdEnd);
          channel = channel.substring(serverIdEnd + splits[1].length);
          const playerIdEnd = channel.indexOf(splits[2]);
          const playerIdParam = "" + channel.substring(0, playerIdEnd);
          let receivedData: any = msg.data;
          try {
            try {
              let receivedDataHooks = Hooks.getInstance().getReceivedDataHook();
              for (let hook of receivedDataHooks) {
                receivedData = hook(receivedData);
              }
              if (receivedDataHooks.length == 0) {
                receivedData = receivedData;
              }
            } catch (e) {
              const error = NatsTypescriptTemplateError.errorForCode(ErrorCode.HOOK_ERROR, e);
              throw error;
            }
          } catch (e) {
            onDataCallback(e)
            return;
          }
          onDataCallback(undefined, receivedData, serverIdParam, playerIdParam);
        }
      }, subscribeOptions);
      resolve(subscription);
    } catch (e) {
      reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.INTERNAL_NATS_TS_ERROR, e));
    }
  })
}