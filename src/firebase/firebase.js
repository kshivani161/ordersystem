import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBRCrYJIqMFwjauLti150GqexG4pCICw5E",
  authDomain: "orderfood-9f078.firebaseapp.com",
  projectId: "orderfood-9f078",
  storageBucket: "orderfood-9f078.appspot.com",
  messagingSenderId: "849965100450",
  appId: "1:849965100450:web:20d9631a3cdd6e268ed6fb",
  measurementId: "G-WTL8JBWP8R"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); 

export { app ,auth};