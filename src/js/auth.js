import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
import { auth } from "./firebase";

const btnRef = document.querySelector('#fire')

btnRef.addEventListener('click', handleGoogleSignIn)

const googleSignIn = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
}
console.log(btnRef)
function handleGoogleSignIn() {
  console.log('+')
  try {
    googleSignIn()
  } catch (error) {
    console.log(error)
  }
}

signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});