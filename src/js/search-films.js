import { Notify } from 'notiflix';
import { searchFilms } from './api';
import { createFilmItemMarkup } from './main-initial-films';
import { pagination } from './pagination';
import {refs} from './refs'

const {formSearchFilmsRef, filmsList, spinner, paginationRef} = refs;

formSearchFilmsRef.addEventListener('submit', onSubmitFetchMovies);

function onSubmitFetchMovies(e) {
  e.preventDefault();
  paginationRef.innerHTML = '';
  filmsList[0].innerHTML = '';
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
    filmsList[0].innerHTML = items;
    spinner.hidden = true;
  } catch (error) {
    Notify.failure(error.message);
  } finally {
    spinner.hidden = true;
  }
}
