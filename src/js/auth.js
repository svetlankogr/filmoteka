import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { Notify } from 'notiflix';
import { auth } from './firebase';
import { isAuthCheck } from './isAuth-check';

const btnRef = document.querySelector('.modal-signin__button');
export const TOKEN_KEY = 'token'
const token = localStorage.getItem(TOKEN_KEY);

if(token) {
  btnRef.removeEventListener('click', handleGoogleSignIn);
  btnRef.addEventListener('click', handleSignOut);
} else {
  btnRef.removeEventListener('click', handleSignOut);
  btnRef.addEventListener('click', handleGoogleSignIn);
}

const googleSignIn = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

async function handleGoogleSignIn() {
  try {
    const res = await googleSignIn();
    const credential = GoogleAuthProvider.credentialFromResult(res);
    const token = credential.accessToken;
    const user = res.user.displayName;

    token && localStorage.setItem(TOKEN_KEY, token);

    Notify.success(`Hi ${user}, you are welcome! ❤`);
    isAuthCheck();
  } catch (error) {
    Notify.failure(error.message);
  }
}

async function handleSignOut() {
  try {
    const res = await signOut(auth)
    console.log(res)
    localStorage.removeItem(TOKEN_KEY);

    Notify.success(`Hi ${user}, you are welcome! ❤`);
    isAuthCheck();
  } catch (error) {
    Notify.failure(error.message);
  }
}
