import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { fetchTopFilms } from './api';
import { createFilmItemMarkup } from './main-initial-films';

const filmsList = document.querySelector('.films__list');


const options = {
  totalItems: 1000,
  itemsPerPage: 1,
  visiblePages: 5,
  page: 1,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
};

function smoothScrool() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const pagination = new Pagination('pagination', options);

pagination.on('afterMove', async (event) => {
  const currentPage = event.page;
  const {
    data: { results: filmArray }
  } = await fetchTopFilms(currentPage);
  const items = createFilmItemMarkup(filmArray);
  filmsList.innerHTML = items
  smoothScrool();
});