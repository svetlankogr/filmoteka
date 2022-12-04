import { getFilmById } from './api';
import { createMarkupForLibrary } from './createMarkupForLibrary';
import { getAllGenres } from './modal-film';
import { renderMarkupEmptyLibrary } from './modal-film';
import { isAuthCheck } from './isAuth-check';
import { WATCHED_KEY, QUEUE_KEY } from './modal-film';
import { Notify } from 'notiflix';
import {refs} from './refs'

const {spinner, container, filmsList, watchedBtn, queueBtn} = refs;

watchedBtn?.addEventListener('click', onWatchedBtnClick);
queueBtn?.addEventListener('click', onQueueBtnClick);

(() => {
  isAuthCheck();
})();

function onQueueOrWatchedBtnClick(currentBtn, secondBtn, key) {
  currentBtn.classList.remove('btn-main');
  currentBtn.classList.add('btn-accent');
  secondBtn.classList.remove('btn-accent');
  secondBtn.classList.add('btn-main');
  filmsList[0].innerHTML = '';
  filmsList[0].dataset.page = key;
  loadFilmsForLibrary(key);
}

function onWatchedBtnClick() {
  onQueueOrWatchedBtnClick(watchedBtn, queueBtn, WATCHED_KEY);
}

function onQueueBtnClick() {
  onQueueOrWatchedBtnClick(queueBtn, watchedBtn, QUEUE_KEY);
}

export function loadFilmsForLibrary(key) {
  const films = localStorage.getItem(key);
  const parsedFilms = JSON.parse(films);
  const imgRef = container.getElementsByClassName('film__img--nothing');
  if (imgRef[0]) {
    imgRef[0].remove();
  }
  if (!parsedFilms.length) {
    renderMarkupEmptyLibrary();
    return;
  }
  parsedFilms.forEach(async el => {
    try {
      spinner.hidden = false;
      const { data } = await getFilmById(el);
      const allGenres = getAllGenres(data.genres);
      const markUp = createMarkupForLibrary(data, allGenres);
      filmsList[0].insertAdjacentHTML('beforeend', markUp);
      watchedBtn.addEventListener('click', onWatchedBtnClick);
      queueBtn.addEventListener('click', onQueueBtnClick);
    } catch (error) {
      console.log(error);
      Notify.failure(error.message)
    } finally {
      spinner.hidden = true;
    }
  });
}
