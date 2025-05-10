const admin = require("firebase-admin");

// const serviceAccount = require("../admin.json");

const { firebaseConfigs } = require("../configs/config");

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfigs),
});

const db = admin.firestore();

module.exports = db;
