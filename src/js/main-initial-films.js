import { Notify } from 'notiflix';
import { fetchGenresList, fetchTopFilms } from './api';

const list = document.querySelector('.films__list');

(async () => {
  try {
    const { data } = await fetchTopFilms();
    const filmArray = data.results;
    const {
      data: { genres: genresList },
    } = await fetchGenresList();
    const items = createFilmItemMarkup(filmArray, genresList);
    list.innerHTML = items;
  } catch (error) {
    Notify.failure(error);
  }
})();

function createFilmItemMarkup(filmArray, genresList) {
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
