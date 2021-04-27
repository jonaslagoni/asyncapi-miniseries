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
const NatsTypescriptTemplateError_1 = require("../NatsTypescriptTemplateError");
const hooks_1 = require("../hooks");
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
function publish(message, client, serverId, playerId) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            let dataToSend = message;
            try {
                let beforeSendingHooks = hooks_1.Hooks.getInstance().getBeforeSendingDataHook();
                for (let hook of beforeSendingHooks) {
                    dataToSend = hook(dataToSend);
                }
            }
            catch (e) {
                const error = NatsTypescriptTemplateError_1.NatsTypescriptTemplateError.errorForCode(NatsTypescriptTemplateError_1.ErrorCode.HOOK_ERROR, e);
                throw error;
            }
            yield client.publish(`game.server.${serverId}.events.player.${playerId}.hit`, dataToSend);
            resolve();
        }
        catch (e) {
            reject(NatsTypescriptTemplateError_1.NatsTypescriptTemplateError.errorForCode(NatsTypescriptTemplateError_1.ErrorCode.INTERNAL_NATS_TS_ERROR, e));
        }
    }));
}
exports.publish = publish;
;
//# sourceMappingURL=GameServerServerIdEventsPlayerPlayerIdHit.js.map