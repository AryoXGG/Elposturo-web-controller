import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDl5degKhQkT-TPoDHjxSN960uqGE9oB0A",
    authDomain: "elposturo-b4950.firebaseapp.com",
    databaseURL: "https://elposturo-b4950-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "elposturo-b4950",
    storageBucket: "elposturo-b4950.firebasestorage.app",
    messagingSenderId: "417734727583",
    appId: "1:417734727583:web:5e4beb2a7e8c5b47cc8faa"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

console.log('✅ Firebase config loaded');

export { database };
