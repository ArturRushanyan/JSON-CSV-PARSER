const firebaseDB = require("../../configs/firebaseInstance");

const registerNewUser = async (params) => {
  const docId = params.apiKey;
  const newData = {
    email: params.email,
    apiKey: params.apiKey,
    userSecrets: params.userSecrets,
    createdAt: new Date().toISOString(),
  };
  await firebaseDB.collection("users").doc(docId).set(newData);
};

const getAccountByEmail = async (email) => {
  const snapshot = await firebaseDB
    .collection("users")
    .where("email", "==", email)
    .get();

  if (snapshot.empty) {
    return false;
  }

  return true;
};

const getUserByApiKey = async (apiKey) => {
  const snapshot = await firebaseDB.collection("users").doc(apiKey).get();

  if (!snapshot.exists) {
    return undefined;
  }

  return snapshot.data();
};

const getUserByEmail = async (email) => {
  const snapshot = await firebaseDB
    .collection("accounts")
    .where("email", "==", email)
    .get();

  if (snapshot.empty) {
    return false;
  }

  const doc = snapshot.docs[0];
  const data = doc.data();

  return data;
};

module.exports = {
  registerNewUser,
  getAccountByEmail,
  getUserByApiKey,
  getUserByEmail,
};
