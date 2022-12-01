import { getFilmById } from './api';
import { createMarkupForLibrary } from './createMarkupForLibrary';
import { getAllGenres } from './modal-film';
import { WATCHED_KEY, QUEUE_KEY } from './modal-film';

const watchedBtn = document.querySelector('.header__buttons-library--watched');
const queueBtn = document.querySelector('.header__buttons-library--queue');
const list = document.querySelector('.films__list');
const spinner = document.querySelector('.circ');

watchedBtn.addEventListener('click', onWatchedBtnClick);
queueBtn.addEventListener('click', onQueueBtnClick);

(async () => {
  loadFilmsForLibrary(WATCHED_KEY);
})();

function onWatchedBtnClick() {
  list.innerHTML = '';
  loadFilmsForLibrary(WATCHED_KEY);
}
function onQueueBtnClick() {
  list.innerHTML = '';
  loadFilmsForLibrary(QUEUE_KEY);
}

function loadFilmsForLibrary(key) {
  const films = localStorage.getItem(key);
  const parsedFilms = JSON.parse(films);
  if (films) {
    parsedFilms.forEach(async el => {
      try {
        spinner.hidden = false;
        const { data } = await getFilmById(el);
        const allGenres = getAllGenres(data.genres);
        const markUp = createMarkupForLibrary(data, allGenres);
        list.insertAdjacentHTML('beforeend', markUp);
      } catch (error) {
        console.log(error);
      } finally {
        spinner.hidden = true;
      }
    });
  }
}
