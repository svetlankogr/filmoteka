import { Notify } from 'notiflix';
import { searchFilms } from './api';
import { createFilmItemMarkup } from './main-initial-films';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { smoothScroll } from './scroll-to-top';

const formSearchFilmsRef = document.querySelector('#search-form');
const filmsList = document.querySelector('.films__list');
const spinner = document.querySelector('.js-spinner');

formSearchFilmsRef.addEventListener('submit', onSubmitFetchMovies);

function onSubmitFetchMovies(e) {
  e.preventDefault();
  filmsList.innerHTML = "";
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

    const paginationSearchFilms = new Pagination('pagination', {
      totalItems: total_results,
      itemsPerPage: filmsArray.length,
      visiblePages: 5
    });
    paginationSearchFilms.on('afterMove', async (event) => {
      const currentPage = event.page;
      try {
        spinner.hidden = false;
        const {
          data: { results: filmsArray },
        } = await searchFilms(keyword, currentPage);
        const items = createFilmItemMarkup(filmsArray);
        filmsList.innerHTML = items;
        smoothScroll();
      } catch (error) {
        Notify.failure(error.message);
      } finally {
        spinner.hidden = true;
      }
    });

    if (!filmsArray.length) {
      Notify.failure('Films not found');
      return;
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