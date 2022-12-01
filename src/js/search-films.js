import { Notify } from 'notiflix';
import { searchFilms } from './api';
import { createFilmItemMarkup } from './main-initial-films';

const formSearchFilmsRef = document.querySelector('#search-form');
const list = document.querySelector('.films__list');
const spinner = document.querySelector('.circ');


formSearchFilmsRef.addEventListener('submit', onSubmitFetchMovies);

async function onSubmitFetchMovies(e) {
  e.preventDefault();
  const keyword = e.currentTarget.searchQuery.value.trim();
  if (!keyword) {
    Notify.failure('Please enter something');
    return;
  }
  try {spinner.hidden = false;
    const {
      data: { results: filmsArray },
    } = await searchFilms(keyword);
    if (!filmsArray.length) {
      Notify.failure("Films not found");
      list.innerHTML = "";
      return
    }
    const items = createFilmItemMarkup(filmsArray);
    list.innerHTML = items;
    spinner.hidden = true;
  } catch (error) {
    Notify.failure(error.message);
  }
  finally{
    spinner.hidden = true
  }
}
