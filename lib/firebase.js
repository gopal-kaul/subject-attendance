import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.autoDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};
const app = initializeApp(firebaseConfig);
export {app}