"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const NatsTypescriptTemplateError_1 = require("../../NatsTypescriptTemplateError");
const hooks_1 = require("../../hooks");
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
function subscribe(onDataCallback, client, serverId, playerId, itemId, options) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        let subscribeOptions = Object.assign({}, options);
        try {
            let subscription = yield client.subscribe(`game.server.${serverId}.events.player.${playerId}.item.${itemId}.pickup`, (err, msg) => {
                if (err) {
                    onDataCallback(NatsTypescriptTemplateError_1.NatsTypescriptTemplateError.errorForCode(NatsTypescriptTemplateError_1.ErrorCode.INTERNAL_NATS_TS_ERROR, err));
                }
                else {
                    const unmodifiedChannel = `game.server.{serverId}.events.player.{playerId}.item.{itemId}.pickup`;
                    let channel = msg.subject;
                    const serverIdSplit = unmodifiedChannel.split("{serverId}");
                    const playerIdSplit = serverIdSplit[1].split("{playerId}");
                    const itemIdSplit = playerIdSplit[1].split("{itemId}");
                    const splits = [
                        serverIdSplit[0], playerIdSplit[0],
                        itemIdSplit[0],
                        itemIdSplit[1]
                    ];
                    channel = channel.substring(splits[0].length);
                    const serverIdEnd = channel.indexOf(splits[1]);
                    const serverIdParam = "" + channel.substring(0, serverIdEnd);
                    channel = channel.substring(serverIdEnd + splits[1].length);
                    const playerIdEnd = channel.indexOf(splits[2]);
                    const playerIdParam = "" + channel.substring(0, playerIdEnd);
                    channel = channel.substring(playerIdEnd + splits[2].length);
                    const itemIdEnd = channel.indexOf(splits[3]);
                    const itemIdParam = "" + channel.substring(0, itemIdEnd);
                    let receivedData = msg.data;
                    try {
                        try {
                            let receivedDataHooks = hooks_1.Hooks.getInstance().getReceivedDataHook();
                            for (let hook of receivedDataHooks) {
                                receivedData = hook(receivedData);
                            }
                            if (receivedDataHooks.length == 0) {
                                receivedData = receivedData;
                            }
                        }
                        catch (e) {
                            const error = NatsTypescriptTemplateError_1.NatsTypescriptTemplateError.errorForCode(NatsTypescriptTemplateError_1.ErrorCode.HOOK_ERROR, e);
                            throw error;
                        }
                    }
                    catch (e) {
                        onDataCallback(e);
                        return;
                    }
                    onDataCallback(undefined, receivedData, serverIdParam, playerIdParam, itemIdParam);
                }
            }, subscribeOptions);
            resolve(subscription);
        }
        catch (e) {
            reject(NatsTypescriptTemplateError_1.NatsTypescriptTemplateError.errorForCode(NatsTypescriptTemplateError_1.ErrorCode.INTERNAL_NATS_TS_ERROR, e));
        }
    }));
}
exports.subscribe = subscribe;
//# sourceMappingURL=GameServerServerIdEventsPlayerPlayerIdItemItemIdPickup.js.map