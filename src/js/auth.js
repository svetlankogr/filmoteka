import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { Notify } from 'notiflix';
import { auth } from './firebase';
import { isAuthCheck } from './isAuth-check';

const account = document.querySelector('.account__link');
const signin = document.querySelector('.modal-signin__backdrop');
const signinClose = document.querySelector('.modal-signin__close-btn');
const btnRef = document.querySelector('.modal-signin__button');
export const TOKEN_KEY = 'token';

account.addEventListener('click', opensigninModal);
signinClose.addEventListener('click', closesigninModal);
btnRef.addEventListener('click', handleGoogleSignIn);

export function changeEventHandler() {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    account.removeEventListener('click', opensigninModal);
    account.addEventListener('click', handleSignOut);
    return;
  }
  account.removeEventListener('click', handleSignOut);
  account.addEventListener('click', opensigninModal);
}

export function opensigninModal() {
  signin.classList.remove('is-hidden');
}

export function closesigninModal() {
  signin.classList.add('is-hidden');
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

    Notify.success(`Hi ${user}, you are welcome! ❤`, {
      timeout: 1500,
      position: 'center-top',
    });
    isAuthCheck();
  } catch (error) {
    Notify.failure(error.message, {
      timeout: 1500,
      position: 'center-top',
    });
  }
}

async function handleSignOut() {
  try {
    await signOut(auth);
    localStorage.removeItem(TOKEN_KEY);

    Notify.success(`You logged out successfully`, {
      timeout: 1500,
      position: 'center-top',
    });
    isAuthCheck();
  } catch (error) {
    Notify.failure(error.message, {
      timeout: 1500,
      position: 'center-top',
    });
  }
}
