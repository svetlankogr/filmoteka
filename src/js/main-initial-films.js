import { Notify } from 'notiflix';
import { fetchGenresList, fetchTopFilms } from './api';

const list = document.querySelector('.films__list');
let genresList = null;
const spinner = document.querySelector('.js-spinner');

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
  } catch (error) {
    Notify.failure(error);
  } finally {
    spinner.hidden = true;
  }
})();

export function createFilmItemMarkup(filmArray) {
  return filmArray
    .map(el => {
      let elGenres = [];
      for (let i = 0; i < el.genre_ids.length; i++) {
        for (let index = 0; index < genresList.length; index++) {
          if (genresList[index].id === el.genre_ids[i]) {
            elGenres.push(genresList[index].name);
          }
        }
      }

      elGenres = elGenres.length ? elGenres.join(', ') : '';
      let releaseDate = new Date(el.release_date).getFullYear();
      if (elGenres && releaseDate) {
        releaseDate = `| ${releaseDate}`;
      } else {
        releaseDate = releaseDate || '';
      }

      const imageSrc = el.poster_path
        ? `https://image.tmdb.org/t/p/original/${el.poster_path}`
        : 'https://www.reelviews.net/resources/img/default_poster.jpg';

      return `
    <li class="films__item" data-filmId="${el.id}">
      <a href="" class="films__link" role="button">
        <div class="films__img-container">
          <img
            src="${imageSrc}"
            alt="${el.original_title} poster"
            class="films__img"
          />
        </div>
        <h2 class="films__title">${el.original_title}</h2>
        <p class="films__description">
          ${elGenres} ${releaseDate}
        </p>
      </a>
    </li>`;
    })
    .join('');
}
