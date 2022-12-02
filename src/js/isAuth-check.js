import { TOKEN_KEY } from './auth';
import { loadFilmsForLibrary } from './library-films';
import { onFilmClick, WATCHED_KEY } from './modal-film';
import { opensigninModal } from './modal-singin';

const container = document.querySelector('.films .container');
const watchedBtn = document.querySelector('.header__buttons-library--watched');
const queueBtn = document.querySelector('.header__buttons-library--queue');

export function isAuthCheck() {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    if (location.pathname === '/library.html') {
      watchedBtn.hidden = true;
      queueBtn.hidden = true;
      container.innerHTML = 'You have to log in!';
      opensigninModal();
    }
    return;
  }

  const signin = document.querySelector('.modal-signin__backdrop');
  signin.classList.add('is-hidden');
  const authBtn = document.querySelector('.account__link');
  authBtn.textContent = 'Log out';
  if (location.pathname === '/library.html') {
    const filmsList = '<ul class="films__list"></ul>';
    container.innerHTML = filmsList;
    const filmsListRef = document.querySelector('.films__list');
    filmsListRef.addEventListener('click', onFilmClick);
    loadFilmsForLibrary(WATCHED_KEY);
  }
}
