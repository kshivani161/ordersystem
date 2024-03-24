// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyBRCrYJIqMFwjauLti150GqexG4pCICw5E",
//   authDomain: "orderfood-9f078.firebaseapp.com",
//   projectId: "orderfood-9f078",
//   storageBucket: "orderfood-9f078.appspot.com",
//   messagingSenderId: "849965100450",
//   appId: "1:849965100450:web:20d9631a3cdd6e268ed6fb",
//   measurementId: "G-WTL8JBWP8R"
// };
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth(app); 

// export { app ,auth};
// firebase.js


// import { initializeApp } from "firebase/app";
// import {getAuth} from "firebase/auth";
// import { getFirestore } from 'firebase/firestore';
// import 'firebase/firestore';


// const firebaseConfig = {
//   apiKey: "AIzaSyBRCrYJIqMFwjauLti150GqexG4pCICw5E",
//   authDomain: "orderfood-9f078.firebaseapp.com",
//   projectId: "orderfood-9f078",
//   storageBucket: "orderfood-9f078.appspot.com",
//   messagingSenderId: "849965100450",
//   appId: "1:849965100450:web:20d9631a3cdd6e268ed6fb",
//   measurementId: "G-WTL8JBWP8R"
// };
// // Initialize Firebase
// // firebase.initializeApp(firebaseConfig);
//  const app = initializeApp(firebaseConfig);

// // Export Firebase modules
//  const auth = getAuth(app);
//  const firestore = getFirestore();

// export {app ,auth,firestore};
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBRCrYJIqMFwjauLti150GqexG4pCICw5E",
    authDomain: "orderfood-9f078.firebaseapp.com",
    projectId: "orderfood-9f078",
    storageBucket: "orderfood-9f078.appspot.com",
    messagingSenderId: "849965100450",
    appId: "1:849965100450:web:20d9631a3cdd6e268ed6fb",
    measurementId: "G-WTL8JBWP8R"
  };

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export Firebase modules
export const auth = getAuth(app);
export const firestore = getFirestore(app);

export { app };

// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// const nodemailer = require('nodemailer');


// // Specify the path to your service account key file
// const serviceAccount = require('.C:/ShivaniAngular/serviceaccount.json');

// // Initialize Firebase Admin SDK with the service account credentials
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });
// admin.initializeApp();
// const firestore1 = admin.firestore();


// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: 'shivani@gmail.com',
//     pass: '123456789',
//   },
// });

// exports.sendDeliveryNotification = functions.firestore
//   .document('deliveries/{deliveryId}')
//   .onUpdate(async (change, context) => {
//     const newData = change.after.data();
//     const previousData = change.before.data();

//     // Check if delivery status changed to 'Completed'
//     if (newData.status === 'Completed' && previousData.status !== 'Completed') {
//       const recipientEmail = newData.recipientEmail;
//       const message = 'Your delivery has been completed.';

//       const mailOptions = {
//         from: 'YOUR_GMAIL_EMAIL',
//         to: recipientEmail,
//         subject: 'Delivery Notification',
//         text: message,
//       };

//       try {
//         // Send email notification
//         await transporter.sendMail(mailOptions);
//         console.log('Email notification sent successfully.');
//       } catch (error) {
//         console.error('Error sending email notification:', error);
//       }
//     }
//   });

