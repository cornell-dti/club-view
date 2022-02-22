import admin from 'firebase-admin';
import { config } from 'dotenv';

config();

/* eslint @typescript-eslint/no-var-requires: "off" */
const serviceAccount = require('../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();

export { db, storage, auth };
