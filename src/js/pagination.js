import { createFilmItemMarkup } from './main-initial-films';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { smoothScroll } from './scroll-to-top';
import { Notify } from 'notiflix';

const spinner = document.querySelector('.js-spinner');
const filmsList = document.querySelector('.films__list');

export function pagination(total_results, filmsArray, api, keyword) {
  const pagination = new Pagination('pagination', {
    totalItems: total_results,
    itemsPerPage: filmsArray.length,
    visiblePages: 5,
  });
  pagination.on('afterMove', async event => {
    const currentPage = event.page;
    try {
      spinner.hidden = false;
      const {
        data: { results: filmsArray },
      } = keyword ? await api(keyword, currentPage) : await api(currentPage);
      const items = createFilmItemMarkup(filmsArray);
      filmsList.innerHTML = items;
      smoothScroll();
    } catch (error) {
      Notify.failure(error.message);
    } finally {
      spinner.hidden = true;
    }
  });
}
