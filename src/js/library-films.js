import { getFilmById } from './api';
import { createMarkupForLibrary } from './createMarkupForLibrary';
import { getAllGenres } from './modal-film';
import { WATCHED_KEY, QUEUE_KEY } from './modal-film';
import nothing from '../images/theres-nothing-to-see-here.gif';

const watchedBtn = document.querySelector('.header__buttons-library--watched');
const queueBtn = document.querySelector('.header__buttons-library--queue');
const filmsList = document.querySelector('.films__list');

watchedBtn.addEventListener('click', onWatchedBtnClick);
queueBtn.addEventListener('click', onQueueBtnClick);

(async () => {
  loadFilmsForLibrary(WATCHED_KEY);
})();

function onWatchedBtnClick() {
  filmsList.innerHTML = '';
  loadFilmsForLibrary(WATCHED_KEY);
}
function onQueueBtnClick() {
  filmsList.innerHTML = '';
  loadFilmsForLibrary(QUEUE_KEY);
}

export function loadFilmsForLibrary(key) {
  const films = localStorage.getItem(key);
  const parsedFilms = JSON.parse(films);
  if (parsedFilms.length === 0) {
    rendermarkupEmptyLibrary();
  }
  if (films) {
    parsedFilms.forEach(async el => {
      try {
        const { data } = await getFilmById(el);
        const allGenres = getAllGenres(data.genres);
        const markUp = createMarkupForLibrary(data, allGenres);
        filmsList.insertAdjacentHTML('beforeend', markUp);
      } catch (error) {
        console.log(error);
      }
    });
  }
}

function rendermarkupEmptyLibrary() {
  const markupEmptyLibrary = `
  <img class="img" src="${nothing}" alt="nothingHere">
  `;
  filmsList.insertAdjacentHTML('beforeend', markupEmptyLibrary);
}
