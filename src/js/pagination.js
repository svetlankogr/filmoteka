import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';


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
