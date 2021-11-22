import express from 'express';
import admin from 'firebase-admin';
import cors from 'cors';
import "firebase/auth";
import * as dotenv from "dotenv";

import clubRoutes from "./router/club";
import studentRoutes from "./router/student"

dotenv.config();

admin.initializeApp({
  //TO BE REPLACED LATER
  // apiKey: "API_KEY",
  // authDomain: "PROJECT_ID.firebaseapp.com",
  // databaseURL: "https://PROJECT_ID.firebaseio.com",
  // projectId: "PROJECT_ID",
  // storageBucket: "PROJECT_ID.appspot.com",
  // messagingSenderId: "SENDER_ID",
  // appId: "APP_ID",
  // measurementId: "G-MEASUREMENT_ID",
})
const db = admin.firestore();
const app = express();

app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/club", clubRoutes);
app.use("/student", studentRoutes);

app.listen(3000, function(){
    console.log("Server listening on Port 3000");
})
