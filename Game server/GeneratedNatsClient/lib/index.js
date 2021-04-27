"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_1 = require("./hooks");
exports.AvailableHooks = hooks_1.AvailableHooks;
exports.Hooks = hooks_1.Hooks;
const TestClient = __importStar(require("./testclient/"));
exports.TestClient = TestClient;
const ts_nkeys_1 = require("ts-nkeys");
const NatsTypescriptTemplateError_1 = require("./NatsTypescriptTemplateError");
exports.ErrorCode = NatsTypescriptTemplateError_1.ErrorCode;
exports.NatsTypescriptTemplateError = NatsTypescriptTemplateError_1.NatsTypescriptTemplateError;
const ts_nats_1 = require("ts-nats");
exports.Client = ts_nats_1.Client;
const gameServerServerIdEventsPlayerPlayerIdItemItemIdPickupChannel = __importStar(require("./channels/GameServerServerIdEventsPlayerPlayerIdItemItemIdPickup"));
exports.gameServerServerIdEventsPlayerPlayerIdItemItemIdPickupChannel = gameServerServerIdEventsPlayerPlayerIdItemItemIdPickupChannel;
const gameServerServerIdEventsPlayerPlayerIdConnectChannel = __importStar(require("./channels/GameServerServerIdEventsPlayerPlayerIdConnect"));
exports.gameServerServerIdEventsPlayerPlayerIdConnectChannel = gameServerServerIdEventsPlayerPlayerIdConnectChannel;
const gameServerServerIdEventsPlayerPlayerIdDisconnectChannel = __importStar(require("./channels/GameServerServerIdEventsPlayerPlayerIdDisconnect"));
exports.gameServerServerIdEventsPlayerPlayerIdDisconnectChannel = gameServerServerIdEventsPlayerPlayerIdDisconnectChannel;
const gameServerServerIdEventsPlayerPlayerIdChatChannel = __importStar(require("./channels/GameServerServerIdEventsPlayerPlayerIdChat"));
exports.gameServerServerIdEventsPlayerPlayerIdChatChannel = gameServerServerIdEventsPlayerPlayerIdChatChannel;
const gameServerServerIdEventsPlayerPlayerIdHitChannel = __importStar(require("./channels/GameServerServerIdEventsPlayerPlayerIdHit"));
exports.gameServerServerIdEventsPlayerPlayerIdHitChannel = gameServerServerIdEventsPlayerPlayerIdHitChannel;
const events = __importStar(require("events"));
var AvailableEvents;
(function (AvailableEvents) {
    AvailableEvents["permissionError"] = "permissionError";
    AvailableEvents["close"] = "close";
    AvailableEvents["connect"] = "connect";
    AvailableEvents["connecting"] = "connecting";
    AvailableEvents["disconnect"] = "disconnect";
    AvailableEvents["error"] = "error";
    AvailableEvents["pingcount"] = "pingcount";
    AvailableEvents["pingtimer"] = "pingtimer";
    AvailableEvents["reconnect"] = "reconnect";
    AvailableEvents["reconnecting"] = "reconnecting";
    AvailableEvents["serversChanged"] = "serversChanged";
    AvailableEvents["subscribe"] = "subscribe";
    AvailableEvents["unsubscribe"] = "unsubscribe";
    AvailableEvents["yield"] = "yield";
})(AvailableEvents = exports.AvailableEvents || (exports.AvailableEvents = {}));
/**
 * @class NatsAsyncApiClient
 *
 * The generated client based on your AsyncAPI document.
 */
class NatsAsyncApiClient extends events.EventEmitter {
    constructor() {
        super();
    }
    /**
     * Try to connect to the NATS server with the different payloads.
     * @param options to use, payload is omitted if sat in the AsyncAPI document.
     */
    connect(options) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            this.options = options;
            try {
                if (!this.jsonClient || this.jsonClient.isClosed()) {
                    this.options.payload = ts_nats_1.Payload.JSON;
                    this.jsonClient = yield ts_nats_1.connect(this.options);
                    this.chainEvents(this.jsonClient);
                }
                resolve();
            }
            catch (e) {
                reject(NatsTypescriptTemplateError_1.NatsTypescriptTemplateError.errorForCode(NatsTypescriptTemplateError_1.ErrorCode.INTERNAL_NATS_TS_ERROR, e));
            }
        }));
    }
    /**
     * Disconnect all clients from the server
     */
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isClosed()) {
                yield this.jsonClient.drain();
            }
        });
    }
    /**
     * Returns whether or not any of the clients are closed
     */
    isClosed() {
        if (!this.jsonClient || this.jsonClient.isClosed()) {
            return true;
        }
        return false;
    }
    chainEvents(ns) {
        ns.on('permissionError', (e) => {
            this.emit(AvailableEvents.permissionError, NatsTypescriptTemplateError_1.NatsTypescriptTemplateError.errorForCode(NatsTypescriptTemplateError_1.ErrorCode.INTERNAL_NATS_TS_ERROR, e));
        });
        ns.on('close', (e) => {
            this.emit(AvailableEvents.close, NatsTypescriptTemplateError_1.NatsTypescriptTemplateError.errorForCode(NatsTypescriptTemplateError_1.ErrorCode.INTERNAL_NATS_TS_ERROR, e));
        });
        ns.on('connect', (connection, serverURL, info) => {
            this.emit(AvailableEvents.connect, connection, serverURL, info);
        });
        ns.on('connecting', (serverURL) => {
            this.emit(AvailableEvents.connecting, serverURL);
        });
        ns.on('disconnect', (serverURL) => {
            this.emit(AvailableEvents.disconnect, serverURL);
        });
        ns.on('error', (e) => {
            this.emit(AvailableEvents.error, NatsTypescriptTemplateError_1.NatsTypescriptTemplateError.errorForCode(NatsTypescriptTemplateError_1.ErrorCode.INTERNAL_NATS_TS_ERROR, e));
        });
        ns.on('pingcount', () => {
            this.emit(AvailableEvents.pingcount);
        });
        ns.on('pingtimer', () => {
            this.emit(AvailableEvents.pingtimer);
        });
        ns.on('reconnect', (connection, serverURL, info) => {
            this.emit(AvailableEvents.reconnect, connection, serverURL, info);
        });
        ns.on('reconnecting', (serverURL) => {
            this.emit(AvailableEvents.reconnecting, serverURL);
        });
        ns.on('serversChanged', (e) => {
            this.emit(AvailableEvents.serversChanged, e);
        });
        ns.on('subscribe', (e) => {
            this.emit(AvailableEvents.subscribe, e);
        });
        ns.on('unsubscribe', (e) => {
            this.emit(AvailableEvents.unsubscribe, e);
        });
        ns.on('yield', () => {
            this.emit(AvailableEvents.yield);
        });
    }
    /**
     * Try to connect to the NATS server with user credentials
     *
     * @param userCreds to use
     * @param options to connect with
     */
    connectWithUserCreds(userCreds, options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect(Object.assign({ userCreds: userCreds }, options));
        });
    }
    /**
     * Try to connect to the NATS server with user and password
     *
     * @param user username to use
     * @param pass password to use
     * @param options to connect with
     */
    connectWithUserPass(user, pass, options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect(Object.assign({ user: user, pass: pass }, options));
        });
    }
    /**
     * Try to connect to the NATS server which has no authentication
     
     * @param host to connect to
     * @param options to connect with
     */
    connectToHost(host, options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect(Object.assign({ servers: [host] }, options));
        });
    }
    /**
     * Try to connect to the NATS server with NKey authentication
     *
     * @param publicNkey User
     * @param seed private key
     * @param options to connect with
     */
    connectWithNkey(publicNkey, seed, options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect(Object.assign({ nkey: publicNkey, nonceSigner: (nonce) => {
                    const sk = ts_nkeys_1.fromSeed(Buffer.from(seed));
                    return sk.sign(Buffer.from(nonce));
                } }, options));
        });
    }
    /**
     * Publish to the `game/server/{serverId}/events/player/{playerId}/item/{itemId}/pickup` channel
     *
     * Channel used when a player picks up an item in-game
     *
     * @param message to publish
     * @param serverId parameter to use in topic
     * @param playerId parameter to use in topic
     * @param itemId parameter to use in topic
     */
    publishToGameServerServerIdEventsPlayerPlayerIdItemItemIdPickup(message, serverId, playerId, itemId) {
        const nc = this.jsonClient;
        if (nc) {
            return gameServerServerIdEventsPlayerPlayerIdItemItemIdPickupChannel.publish(message, nc, serverId, playerId, itemId);
        }
        else {
            return Promise.reject(NatsTypescriptTemplateError_1.NatsTypescriptTemplateError.errorForCode(NatsTypescriptTemplateError_1.ErrorCode.NOT_CONNECTED));
        }
    }
    /**
     * Publish to the `game/server/{serverId}/events/player/{playerId}/connect` channel
     *
     * Channel used when a player joins (connect to) the game server
     *
     * @param message to publish
     * @param serverId parameter to use in topic
     * @param playerId parameter to use in topic
     */
    publishToGameServerServerIdEventsPlayerPlayerIdConnect(message, serverId, playerId) {
        const nc = this.jsonClient;
        if (nc) {
            return gameServerServerIdEventsPlayerPlayerIdConnectChannel.publish(message, nc, serverId, playerId);
        }
        else {
            return Promise.reject(NatsTypescriptTemplateError_1.NatsTypescriptTemplateError.errorForCode(NatsTypescriptTemplateError_1.ErrorCode.NOT_CONNECTED));
        }
    }
    /**
     * Publish to the `game/server/{serverId}/events/player/{playerId}/disconnect` channel
     *
     * Channel used when a player leaves (disconnects from) the game server
     *
     * @param message to publish
     * @param serverId parameter to use in topic
     * @param playerId parameter to use in topic
     */
    publishToGameServerServerIdEventsPlayerPlayerIdDisconnect(message, serverId, playerId) {
        const nc = this.jsonClient;
        if (nc) {
            return gameServerServerIdEventsPlayerPlayerIdDisconnectChannel.publish(message, nc, serverId, playerId);
        }
        else {
            return Promise.reject(NatsTypescriptTemplateError_1.NatsTypescriptTemplateError.errorForCode(NatsTypescriptTemplateError_1.ErrorCode.NOT_CONNECTED));
        }
    }
    /**
     * Publish to the `game/server/{serverId}/events/player/{playerId}/chat` channel
     *
     * Channel used when a player writes something in chat
     *
     * @param message to publish
     * @param serverId parameter to use in topic
     * @param playerId parameter to use in topic
     */
    publishToGameServerServerIdEventsPlayerPlayerIdChat(message, serverId, playerId) {
        const nc = this.jsonClient;
        if (nc) {
            return gameServerServerIdEventsPlayerPlayerIdChatChannel.publish(message, nc, serverId, playerId);
        }
        else {
            return Promise.reject(NatsTypescriptTemplateError_1.NatsTypescriptTemplateError.errorForCode(NatsTypescriptTemplateError_1.ErrorCode.NOT_CONNECTED));
        }
    }
    /**
     * Publish to the `game/server/{serverId}/events/player/{playerId}/hit` channel
     *
     * Channel used when a player hit another player in-game
     *
     * @param message to publish
     * @param serverId parameter to use in topic
     * @param playerId parameter to use in topic
     */
    publishToGameServerServerIdEventsPlayerPlayerIdHit(message, serverId, playerId) {
        const nc = this.jsonClient;
        if (nc) {
            return gameServerServerIdEventsPlayerPlayerIdHitChannel.publish(message, nc, serverId, playerId);
        }
        else {
            return Promise.reject(NatsTypescriptTemplateError_1.NatsTypescriptTemplateError.errorForCode(NatsTypescriptTemplateError_1.ErrorCode.NOT_CONNECTED));
        }
    }
}
exports.NatsAsyncApiClient = NatsAsyncApiClient;
//# sourceMappingURL=index.js.map