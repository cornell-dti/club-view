import admin from 'firebase-admin';
import { config } from 'dotenv';

config();

const serviceAccount = require('../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

export default db;
