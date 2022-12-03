import { Notify } from 'notiflix';
import { searchFilms } from './api';
import { createFilmItemMarkup } from './main-initial-films';
import { pagination } from './pagination';

const formSearchFilmsRef = document.querySelector('#search-form');
const filmsList = document.querySelector('.films__list');
const spinner = document.querySelector('.js-spinner');
const paginationRef = document.querySelector('#pagination')

formSearchFilmsRef.addEventListener('submit', onSubmitFetchMovies);

function onSubmitFetchMovies(e) {
  e.preventDefault();
  filmsList.innerHTML = '';
  const keyword = e.currentTarget.searchQuery.value.trim();
  if (!keyword) {
    Notify.failure('Please enter something');
    return;
  }

  fetchFilmsByQuery(keyword);
}

async function fetchFilmsByQuery(keyword, currentPage) {
  try {
    spinner.hidden = false;
    const {
      data: { results: filmsArray, total_results },
    } = await searchFilms(keyword, currentPage);
    if (!filmsArray.length) {
      paginationRef.innerHTML = ""
      Notify.failure('Films not found');
      return;
    }

    if(total_results > 20) {
      pagination(total_results, filmsArray, searchFilms, keyword);
    } else {
      paginationRef.innerHTML = ""
    }

    const items = createFilmItemMarkup(filmsArray);
    filmsList.innerHTML = items;
    spinner.hidden = true;
  } catch (error) {
    Notify.failure(error.message);
  } finally {
    spinner.hidden = true;
  }
}
