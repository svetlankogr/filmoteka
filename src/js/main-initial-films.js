import { Notify } from 'notiflix';
import { fetchGenresList, fetchTopFilms } from './api';

const list = document.querySelector('.films__list');
let genresList = null;
const spinner = document.querySelector('.circ');



(async () => {
  try {
    spinner.hidden = false;
    const {
      data: { results: filmArray },
    } = await fetchTopFilms();
    const {
      data: { genres },
    } = await fetchGenresList();
    genresList = genres;
    const items = createFilmItemMarkup(filmArray);
    list.innerHTML = items;
    spinner.hidden = true;
  } catch (error) {
    Notify.failure(error);
  }
})();

export function createFilmItemMarkup(filmArray) {
  return filmArray
    .map(el => {
      const elGenres = [];
      for (let i = 0; i < el.genre_ids.length; i++) {
        for (let index = 0; index < genresList.length; index++) {
          if (genresList[index].id === el.genre_ids[i]) {
            elGenres.push(genresList[index].name);
          }
        }
      }
      const releaseDate = new Date(el.release_date);

      return `
    <li class="films__item">
      <a href="" class="films__link" role="button" data-filmId="${el.id}">
        <div class="films__img-container">
          <img
            src="https://image.tmdb.org/t/p/original/${el.poster_path}"
            alt="${el.original_title} poster"
            class="films__img"
          />
        </div>
        <h2 class="films__title">${el.original_title}</h2>
        <p class="films__description">
          ${elGenres.join(', ')} | ${releaseDate.getFullYear()}
        </p>
      </a>
    </li>`;
    })
    .join('');
}
