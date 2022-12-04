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
  document.addEventListener('keydown', onEscKeyDown);
  signin.addEventListener('click', onBackdropCloseClick)
}

function onBackdropCloseClick(e) {
  if (e.target === e.currentTarget) {
    closesigninModal();
  }
}

const onEscKeyDown = event => {
  if (event.code === 'Escape') {
    closesigninModal();
  }
};

export function closesigninModal() {
  document.removeEventListener('keydown', onEscKeyDown);
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

    Notify.success(`Hi ${user}, you are welcome! ❤`);
    isAuthCheck();
  } catch (error) {
    Notify.failure(error.message);
  }
}

async function handleSignOut() {
  try {
    await signOut(auth);
    localStorage.removeItem(TOKEN_KEY);

    Notify.success(`You logged out successfully`);
    isAuthCheck();
  } catch (error) {
    Notify.failure(error.message);
  }
}
