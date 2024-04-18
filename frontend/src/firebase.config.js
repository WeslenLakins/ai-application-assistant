// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAOXgEi__J2nrYkGn_EDDER-2ri6NIQIG0",
	authDomain: "headshot-generator.firebaseapp.com",
	projectId: "headshot-generator",
	storageBucket: "headshot-generator.appspot.com",
	messagingSenderId: "1026632202234",
	appId: "1:1026632202234:web:d5ecf261cf7e2528495643",
	measurementId: "G-HSTS6QG8F2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
