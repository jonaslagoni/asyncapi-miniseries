const MongoClient = require('mongodb').MongoClient;
const Config = require('./config');
const url = `mongodb://${Config.mongodbHost}/${Config.mongodbDatabase}`;

MongoClient.connect(url, async function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  var dbo = db.db(Config.mongodbDatabase);
  await dbo.createCollection(Config.mongodbConnectionCollection);
  await dbo.createCollection(Config.mongodbDisconnectsCollection);
  await dbo.createCollection(Config.mongodbItemPickupCollection);
  await dbo.createCollection(Config.mongodbPlayerHitCollection);
  await dbo.createCollection(Config.mongodbChatCollection);
  db.close();
});