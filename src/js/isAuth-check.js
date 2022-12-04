import { changeEventHandler, opensigninModal, TOKEN_KEY } from './auth';
import { loadFilmsForLibrary } from './library-films';
import { onFilmClick, WATCHED_KEY } from './modal-film';
import {refs} from './refs'

const {container, watchedBtn, queueBtn} = refs;

export function isAuthCheck() {
  const token = localStorage.getItem(TOKEN_KEY);
  const authBtn = document.querySelector('.account__link');
  changeEventHandler();
  if (!token) {
    authBtn.textContent = 'Sign In';
    if (location.pathname.includes('library')) {
      watchedBtn.hidden = true;
      queueBtn.hidden = true;
      const haveToLoginText = `<p class='have-to-login'>You have to log in to see this page</p>`
      container.innerHTML = haveToLoginText;
      opensigninModal();
    }
    return;
  }

  const signin = document.querySelector('.modal-signin__backdrop');
  signin.classList.add('is-hidden');

  authBtn.textContent = 'Log out';

  if (location.pathname.includes('library')) {
    watchedBtn.hidden = false;
    queueBtn.hidden = false;
    const filmsList = '<ul class="films__list" data-page="watched"></ul><div id="pagination" class="tui-pagination"></div>';
    container.innerHTML = filmsList;
    const filmsListRef = document.querySelector('.films__list');
    filmsListRef.addEventListener('click', onFilmClick);
    loadFilmsForLibrary(WATCHED_KEY);
  }
}
