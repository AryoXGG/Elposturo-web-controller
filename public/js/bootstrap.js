// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyC0rj2h5XsC_hItH8LGHjG-sxwYTMVkSxQ",
    authDomain: "elposturo-b4950.firebaseapp.com",
    databaseURL: "https://elposturo-b4950-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "elposturo-b4950",
    storageBucket: "elposturo-b4950.firebasestorage.app",
    messagingSenderId: "755026485652",
    appId: "1:755026485652:web:e36b4d49a7eee2b1a5c40f"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();
const auth = firebase.auth();

console.log('✅ Firebase initialized (CDN v8)');

// Auto Anonymous Login
auth.signInAnonymously()
    .then(() => {
        console.log('✅ Anonymous login success!');
        return auth.currentUser.getIdToken();
    })
    .then((token) => {
        console.log('✅ Auth token ready');
    })
    .catch((error) => {
        console.error('❌ Auth error:', error);
    });

// Auth state listener
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log('✅ Authenticated:', user.uid);
    }
});

window.database = database;
window.auth = auth;
