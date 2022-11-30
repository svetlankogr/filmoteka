import { Notify } from 'notiflix';
import { getFilmById, getTrailerById } from './api';
import { renderModalMarkup } from './createMarkupForModal';

const containerForModal = document.querySelector('.js-container');
const filmsList = document.querySelector('.films__list');
const modal = document.querySelector('[data-modal]');
const closeModalBtn = document.querySelector('[data-modal-close]');

filmsList.addEventListener('click', onFilmClick);
closeModalBtn.addEventListener('click', onCloseModalClick);
modal.addEventListener('click', onBackdropCloseClick);
document.addEventListener('keydown', onEscKeydown);

async function onFilmClick(e) {
  e.preventDefault();
  containerForModal.innerHTML = '';

  if (e.target.nodeName === 'UL') {
    return;
  }

  modal.classList.remove('is-hidden');
  const item = e.target.closest('a');
  const id = item.dataset.filmid;

  try {
    const { data } = await getFilmById(id);
    const { data: {results: trailersArray} } = await getTrailerById(id);
    let key = null;
    if (trailersArray.length) {
      key = trailersArray[0].key;
    }
    const allGenres = getAllGenres(data.genres);
    const markUp = renderModalMarkup(data, allGenres, key);
    containerForModal.innerHTML = markUp;
  } catch (error) {
    Notify.failure(error.message);
    onCloseModalClick();
  }
}

// CLOSE MODAL

function onCloseModalClick() {
  modal.classList.add('is-hidden');
  document.removeEventListener('keydown', onEscKeydown);
  document.removeEventListener('click', onBackdropCloseClick);
}

function onBackdropCloseClick(e) {
  if (e.target === modal) {
    onCloseModalClick();
  }
}

function onEscKeydown(e) {
  if (e.code === 'Escape' && !modal.classList.contains('is-hidden')) {
    onCloseModalClick();
  }
}

// FUNCTION TO GET ALL GENRES

function getAllGenres(array) {
  const allGenres = [];
  array.map(el => {
    return allGenres.push(el.name);
  });
  return allGenres.join(', ');
}
