import { Notify } from 'notiflix';
import { searchFilms } from './api';
import { createFilmItemMarkup } from './main-initial-films';

const formSearchFilmsRef = document.querySelector('#search-form');
const filmsList = document.querySelector('.films__list');
const spinner = document.querySelector('.js-spinner');

formSearchFilmsRef.addEventListener('submit', onSubmitFetchMovies);

async function onSubmitFetchMovies(e) {
  e.preventDefault();
  filmsList.innerHTML = '';
  const keyword = e.currentTarget.searchQuery.value.trim();
  if (!keyword) {
    Notify.failure('Please enter something', {
      timeout: 1500,
      position: 'center-top',
    });
    return;
  }
  try {
    spinner.hidden = false;
    const {
      data: { results: filmsArray },
    } = await searchFilms(keyword);
    if (!filmsArray.length) {
      Notify.failure('Films not found', {
        timeout: 1500,
        position: 'center-top',
      });
      return;
    }
    const items = createFilmItemMarkup(filmsArray);
    filmsList.innerHTML = items;
    spinner.hidden = true;
  } catch (error) {
    Notify.failure(error.message, {
      timeout: 1500,
      position: 'center-top',
    });
  } finally {
    spinner.hidden = true;
  }
}
