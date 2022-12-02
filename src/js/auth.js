import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';
import { Notify } from 'notiflix';
import { auth } from './firebase';
import { isAuthCheck } from './isAuth-check';

export const TOKEN_KEY = 'token'
const btnRef = document.querySelector('.modal-signin__button');

btnRef.addEventListener('click', handleGoogleSignIn);

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

function handleSignOut() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch(error => {
      // An error happened.
    });
}
