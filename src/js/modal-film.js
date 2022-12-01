import { Notify } from 'notiflix';
import { getFilmById } from './api';
import { renderModalMarkup } from './createMarkupForModal';
import { onImageClickOpenVideo } from './modal-video-trailer';

const containerForModal = document.querySelector('.js-container');
const filmsList = document.querySelector('.films__list');
const modal = document.querySelector('[data-modal]');
const modalVideo = document.querySelector('[data-modal-video]');
const closeModalBtn = document.querySelector('[data-modal-close]');
const imageLinkRef = document.getElementsByClassName('modal-film__img-link');

export const WATCHED_KEY = 'watched';
export const QUEUE_KEY = 'queue';

let textWatchedBtn;
let textQueueBtn;
let id;
let filmCardId;
const arrOfWatchedId = [];
const arrOfQueueId = [];

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
  const item = e.target.closest('li');
  id = item.dataset.filmid;

  try {
    const { data } = await getFilmById(id);
    const allGenres = getAllGenres(data.genres);
    textWatchedBtn = arrOfWatchedId.includes(id)
      ? 'remove from watched'
      : 'add to watched';
    textQueueBtn = arrOfQueueId.includes(id)
      ? 'remove from queue'
      : 'add to queue';
    const markUp = renderModalMarkup(
      data,
      allGenres,
      textWatchedBtn,
      textQueueBtn
    );

    document.addEventListener('keydown', onEscKeydown);
    containerForModal.innerHTML = markUp;
    imageLinkRef[0].addEventListener('click', () => onImageClickOpenVideo(id));

    const addToWatchedBtn = document.querySelector('.modal-film__watched');
    const addToQueueBtn = document.querySelector('.modal-film__queue');
    addToWatchedBtn.addEventListener('click', onAddToWatchedBtnClick);
    addToQueueBtn.addEventListener('click', onAddToQueueBtnClick);
  } catch (error) {
    Notify.failure(error.message);
    onCloseModalClick();
  }
}

// CLOSE MODAL

export function onCloseModalClick() {
  if (!modalVideo.classList.contains('is-hidden')) {
    modalVideo.innerHTML = '';
    modalVideo.classList.add('is-hidden');
    return;
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

export function getAllGenres(array) {
  const allGenres = [];
  array.map(el => {
    return allGenres.push(el.name);
  });
  return allGenres.join(', ');
}

//ADD-REMOVE TO LOCAL STORAGE

function onAddToWatchedBtnClick(e) {
  if (arrOfWatchedId.includes(id)) {
    if (arrOfWatchedId.length === 0) {
      return;
    }
    const index = arrOfWatchedId.indexOf(id);
    if (index !== -1) {
      arrOfWatchedId.splice(index, 1);
      textWatchedBtn = 'add to watched';
      e.target.textContent = textWatchedBtn;
      if (window.location.pathname === '/library.html') {
        filmCardId = filmsList.querySelector(`[data-filmId="${id}"]`);
        filmCardId.remove();
        onCloseModalClick();
      }
    }
  } else {
    arrOfWatchedId.push(id);
    textWatchedBtn = 'remove from watched';
    e.target.textContent = textWatchedBtn;
  }
  localStorage.setItem(WATCHED_KEY, JSON.stringify(arrOfWatchedId));
}

function onAddToQueueBtnClick(e) {
  if (arrOfQueueId.includes(id)) {
    if (arrOfQueueId.length === 0) {
      return;
    }
    const index = arrOfQueueId.indexOf(id);
    if (index !== -1) {
      arrOfQueueId.splice(index, 1);
      textQueueBtn = 'add to queue';
      e.target.textContent = textQueueBtn;
    }
  } else {
    arrOfQueueId.push(id);
    textQueueBtn = 'remove from queue';
    e.target.textContent = textQueueBtn;
  }
  localStorage.setItem(QUEUE_KEY, JSON.stringify(arrOfQueueId));
}

// SAVE LOCAL STORAGE
savedDataFromLocalStorage(WATCHED_KEY, arrOfWatchedId);
savedDataFromLocalStorage(QUEUE_KEY, arrOfQueueId);
function savedDataFromLocalStorage(key, arrOfId) {
  const savedData = localStorage.getItem(key);
  if (savedData) {
    const parsedSavedData = JSON.parse(savedData);
    parsedSavedData.forEach(el => {
      return arrOfId.push(el);
    });
  }
}

console.log(window.location.pathname);
