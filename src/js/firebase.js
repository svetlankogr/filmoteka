import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB5ZvttA57I6zGlx22nW0KvqoMSGP6i8vE",
  authDomain: "filmoteka-production-4e396.firebaseapp.com",
  projectId: "filmoteka-production-4e396",
  storageBucket: "filmoteka-production-4e396.appspot.com",
  messagingSenderId: "755542518902",
  appId: "1:755542518902:web:fc153fcac0069844924357"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
