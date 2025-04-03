// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
//   apiKey: ,
//   authDomain: ,
//   projectId: ,
//   storageBucket: ,
//   messagingSenderId: ,
//   appId: ,
apiKey:"AIzaSyDYMV-0dmEUoXrv-m3G2jfBkxGSnX8JIGQ",
authDomain: "oxbuy-26b90.firebaseapp.com",
projectId:"oxbuy-26b90",
storageBucket: "oxbuy-26b90.firebasestorage.app",
messagingSenderId: "793499600277",
appId: "1:793499600277:web:12e7c08f5782ed19e5229c",
  measurementId: "G-9EYE7RMBT9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase services
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, provider, db,signInWithPopup, storage };
