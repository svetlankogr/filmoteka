import { createFilmItemMarkup } from './main-initial-films';
import Pagination from 'tui-pagination';
/* import 'tui-pagination/dist/tui-pagination.css'; */

import { smoothScroll } from './scroll-to-top';
import { Notify } from 'notiflix';

const spinner = document.querySelector('.js-spinner');
const filmsList = document.querySelector('.films__list');
const arrowPrevRef = document.getElementsByClassName('pagination-prev')
const arrowNextRef = document.getElementsByClassName('pagination-next')


export function pagination(total_results, filmsArray, api, keyword) {
  const pagination = new Pagination('pagination', {
    totalItems: total_results,
    itemsPerPage: filmsArray.length,
    visiblePages: 5,
    centerAlign: true,
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage: '<a class="tui-page-btn tui-is-selected">{{page}}</a>',
      moveButton:
          '<a href="#" class="tui-page-btn tui-{{type}} pagination-{{type}}">' +
          '</a>',
      disabledMoveButton:
          '<span class="tui-page-btn tui-is-disabled tui-{{type}} pagination-{{type}}">' +
          '</span>',
      moreButton:
          '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
              '<span class="tui-ico-ellip">...</span>' +
          '</a>'
  }
  });

  const savedTheme = localStorage.getItem('theme');
  if(savedTheme === 'dark') {
    arrowNextRef[0].classList.add('dark-invert')
  }

  pagination.on('afterMove', async event => {
    const currentPage = event.page;
    const savedTheme = localStorage.getItem('theme');
    try {
      spinner.hidden = false;
      const {
        data: { results: filmsArray },
      } = keyword ? await api(keyword, currentPage) : await api(currentPage);
      const items = createFilmItemMarkup(filmsArray);
      filmsList.innerHTML = items;
      if(savedTheme === 'dark') {
        arrowPrevRef[0] && arrowPrevRef[0].classList.add('dark-invert')
      } else {
        arrowPrevRef[0] && arrowPrevRef[0].classList.remove('dark-invert')
      }
      smoothScroll();
    } catch (error) {
      Notify.failure(error.message);
    } finally {
      spinner.hidden = true;
    }
  });
}

