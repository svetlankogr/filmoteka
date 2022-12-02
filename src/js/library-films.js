import { getFilmById } from './api';
import { createMarkupForLibrary } from './createMarkupForLibrary';
import { getAllGenres } from './modal-film';
import { WATCHED_KEY, QUEUE_KEY } from './modal-film';
import { rendermarkupEmptyLibrary } from './modal-film';

const watchedBtn = document.querySelector('.header__buttons-library--watched');
const queueBtn = document.querySelector('.header__buttons-library--queue');
const filmsList = document.querySelector('.films__list');
const spinner = document.querySelector('.circ');
const container = document.querySelector('.films').querySelector('.container');

watchedBtn.addEventListener('click', onWatchedBtnClick);
queueBtn.addEventListener('click', onQueueBtnClick);

(async () => {
  loadFilmsForLibrary(WATCHED_KEY);
})();

function onWatchedBtnClick() {
  watchedBtn.classList.remove('btn-main');
  watchedBtn.classList.add('btn-accent');
  queueBtn.classList.remove('btn-accent');
  queueBtn.classList.add('btn-main');
  filmsList.innerHTML = '';
  loadFilmsForLibrary(WATCHED_KEY);
}

function onQueueBtnClick() {
  queueBtn.classList.remove('btn-main');
  queueBtn.classList.add('btn-accent');
  watchedBtn.classList.remove('btn-accent');
  watchedBtn.classList.add('btn-main');
  filmsList.innerHTML = '';
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
    rendermarkupEmptyLibrary();
  }
  if (parsedFilms) {
    parsedFilms.forEach(async el => {
      try {
        spinner.hidden = false;
        const { data } = await getFilmById(el);
        const allGenres = getAllGenres(data.genres);
        const markUp = createMarkupForLibrary(data, allGenres);
        filmsList.insertAdjacentHTML('beforeend', markUp);
      } catch (error) {
        console.log(error);
      } finally {
        spinner.hidden = true;
      }
    });
  }
}
