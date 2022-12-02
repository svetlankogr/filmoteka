import { TOKEN_KEY } from './auth';
import { loadFilmsForLibrary } from './library-films';
import { WATCHED_KEY } from './modal-film';
import { closesigninModal } from './modal-singin';

const container = document.querySelector('.films .container');
const authBtn = document.querySelector('.account__link');
const watchedBtn = document.querySelector('.header__buttons-library--watched');
const queueBtn = document.querySelector('.header__buttons-library--queue');

export function isAuthCheck() {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    if (location.pathname === '/library.html') {
      watchedBtn.hidden = true;
      queueBtn.hidden = true;
      container.innerHTML = 'You have to log in!';
    }
    return;
  }

  closesigninModal();
  authBtn.textContent = 'Log out';
  if (location.pathname === '/library.html') {
    watchedBtn.hidden = false;
    queueBtn.hidden = false;
    const filmsList = '<ul class="films__list"></ul>';
    container.innerHTML = filmsList;
    loadFilmsForLibrary(WATCHED_KEY);
  }
}
