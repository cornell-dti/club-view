// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// TODO: move clubview backend routes here, referencing constants/routes
// Keep typing in mind: https://nextjs.org/docs/basic-features/typescript#api-routes
import admin from "firebase-admin";
const serviceAccount = require("./service-account.json");

try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
    console.log("Firebase admin nitialized.");
} catch (error: any) {
    /*
     * We skip the "already exists" message which is
     * not an actual error when we're hot-reloading.
     */
    if (!/already exists/u.test(error.message)) {
        console.error("Firebase admin initialized already: ", error.stack);
    }
}

const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();

export { db, storage, auth };
