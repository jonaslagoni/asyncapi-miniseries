import {
  describe,
  it,
  before
} from 'mocha';
import {
  expect
} from 'chai';
import * as Client from '../../src'
import * as TestClient from '../../src/testclient'
import {
  NatsTypescriptTemplateError
} from '../../src/NatsTypescriptTemplateError';
describe('game/server/{serverId}/events/player/{playerId}/item/{itemId}/pickup can talk to itself', () => {
  var client: Client.NatsAsyncApiClient;
  var testClient: TestClient.NatsAsyncApiTestClient;
  before(async () => {
    client = new Client.NatsAsyncApiClient();
    testClient = new TestClient.NatsAsyncApiTestClient();
    const natsHost = process.env.NATS_HOST || "0.0.0.0"
    const natsPort = process.env.NATS_PORT || "4222"
    const natsUrl = `${natsHost}:${natsPort}`
    await client.connectToHost(natsUrl);
    await testClient.connectToHost(natsUrl);
  });
  it('can send message', async () => {
    var receivedError: NatsTypescriptTemplateError | undefined = undefined;
    var receivedMsg: TestClient.PlayerItemPickupPayload | undefined = undefined;
    var receivedServerId: string | undefined = undefinedvar receivedPlayerId: string | undefined = undefinedvar receivedItemId: string | undefined = undefined
    var publishMessage: Client.PlayerItemPickupPayload = {
      "pickupTimestamp": "2019-08-24T14:15:22Z"
    };
    var ServerIdToSend: string = "string"
    var PlayerIdToSend: string = "string"
    var ItemIdToSend: string = "string"
    const subscription = await testClient.subscribeToGameServerServerIdEventsPlayerPlayerIdItemItemIdPickup((err, msg, serverId, playerId, itemId) => {
        receivedError = err;
        receivedMsg = msg;
        receivedServerId = serverIdreceivedPlayerId = playerIdreceivedItemId = itemId
      }, ServerIdToSend, PlayerIdToSend, ItemIdToSend,
      true
    );
    const tryAndWaitForResponse = new Promise((resolve, reject) => {
      let isReturned = false;
      setTimeout(() => {
        if (!isReturned) {
          reject(new Error("Timeout"));
        }
      }, 3000)
      setInterval(async () => {
        if (subscription.getReceived() === 1) {
          resolve();
          isReturned = true
        }
      }, 100);
    });
    await client.publishToGameServerServerIdEventsPlayerPlayerIdItemItemIdPickup(publishMessage, ServerIdToSend, PlayerIdToSend, ItemIdToSend);
    await tryAndWaitForResponse;
    expect(receivedError).to.be.undefined;
    expect(receivedMsg).to.be.deep.equal(publishMessage);
    expect(receivedServerId).to.be.equal(ServerIdToSend);
    expect(receivedPlayerId).to.be.equal(PlayerIdToSend);
    expect(receivedItemId).to.be.equal(ItemIdToSend);
  });
  after(async () => {
    await client.disconnect();
    await testClient.disconnect();
  });
});