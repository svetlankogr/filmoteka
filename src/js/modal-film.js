import { Notify } from 'notiflix';
import { getFilmById } from './api';
import { renderModalMarkup } from './createMarkupForModal';
import { onImageClickOpenVideo } from './modal-video-trailer';

const containerForModal = document.querySelector('.js-container');
const filmsList = document.querySelector('.films__list');
const modal = document.querySelector('[data-modal]');
const modalVideo = document.querySelector('[data-modal-video]');
const closeModalBtn = document.querySelector('[data-modal-close]');
const imageLinkRef = document.getElementsByClassName('modal-film__img-link')

filmsList.addEventListener('click', onFilmClick);
closeModalBtn.addEventListener('click', onCloseModalClick);
modal.addEventListener('click', onBackdropCloseClick);

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
    const allGenres = getAllGenres(data.genres);
    const markUp = renderModalMarkup(data, allGenres);
    document.addEventListener('keydown', onEscKeydown);
    containerForModal.innerHTML = markUp;
    imageLinkRef[0].addEventListener('click', () => onImageClickOpenVideo(id))
  } catch (error) {
    Notify.failure(error.message);
    onCloseModalClick();
  }
}

// CLOSE MODAL

export function onCloseModalClick() {
  if(!modalVideo.classList.contains('is-hidden')) {
    modalVideo.innerHTML = "";
    modalVideo.classList.add('is-hidden');
    return
  }
  modal.classList.add('is-hidden');
  document.removeEventListener('keydown', onEscKeydown);
  document.removeEventListener('click', onBackdropCloseClick);
}

function onBackdropCloseClick(e) {
  if (e.target === e.currentTarget) {
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
