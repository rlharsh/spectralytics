import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyDDxeughBHmGgkpkOB-LOYrzxypYbvNhgA",
	authDomain: "scare-8f888.firebaseapp.com",
	projectId: "scare-8f888",
	storageBucket: "scare-8f888.appspot.com",
	messagingSenderId: "833070523794",
	appId: "1:833070523794:web:7e81f0df1e839ab06d4d4b",
	measurementId: "G-CRWZ46F18T",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
