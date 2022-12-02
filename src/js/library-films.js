import { getFilmById } from './api';
import { createMarkupForLibrary } from './createMarkupForLibrary';
import { getAllGenres } from './modal-film';
import { renderMarkupEmptyLibrary } from './modal-film';
import { isAuthCheck } from './isAuth-check';
import { WATCHED_KEY, QUEUE_KEY } from './modal-film';
import { TOKEN_KEY } from './auth';

const spinner = document.querySelector('.js-spinner');
const container = document.querySelector('.films').querySelector('.container');
const filmsList = document.getElementsByClassName('films__list');
const watchedBtn = document.querySelector('.header__buttons-library--watched');
const queueBtn = document.querySelector('.header__buttons-library--queue');

watchedBtn && watchedBtn.addEventListener('click', onWatchedBtnClick);
queueBtn && queueBtn.addEventListener('click', onQueueBtnClick);

(async () => {
  isAuthCheck();
})();

function onWatchedBtnClick() {
  watchedBtn.classList.remove('btn-main');
  watchedBtn.classList.add('btn-accent');
  queueBtn.classList.remove('btn-accent');
  queueBtn.classList.add('btn-main');
  filmsList[0].innerHTML = '';
  filmsList[0].setAttribute('data-page', WATCHED_KEY)
  loadFilmsForLibrary(WATCHED_KEY);
}

function onQueueBtnClick() {
  queueBtn.classList.remove('btn-main');
  queueBtn.classList.add('btn-accent');
  watchedBtn.classList.remove('btn-accent');
  watchedBtn.classList.add('btn-main');
  filmsList[0].innerHTML = '';
  filmsList[0].setAttribute('data-page', QUEUE_KEY)
  loadFilmsForLibrary(QUEUE_KEY);
}

export function loadFilmsForLibrary(key) {
  const films = localStorage.getItem(key);
  const parsedFilms = JSON.parse(films);
  const imgRef = container.getElementsByClassName('film__img--nothing');
  if (imgRef[0]) {
    imgRef[0].remove();
  }
  if (!parsedFilms || !parsedFilms.length) {
    renderMarkupEmptyLibrary();
  }
  if (parsedFilms) {
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
      } finally {
        spinner.hidden = true;
      }
    });
  }
}
