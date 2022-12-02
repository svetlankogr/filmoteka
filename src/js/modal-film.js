import { Notify } from 'notiflix';
import { getFilmById } from './api';
import { renderModalMarkup } from './createMarkupForModal';
import { onImageClickOpenVideo } from './modal-video-trailer';
import nothing from '../images/theres-nothing-to-see-here.gif';

const container = document.querySelector('.films').querySelector('.container');
const containerForModal = document.querySelector('.js-container');
const filmsList = document.querySelector('.films__list');
const modal = document.querySelector('[data-modal]');
const modalVideo = document.querySelector('[data-modal-video]');
const closeModalBtn = document.querySelector('[data-modal-close]');

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

// OPEN MODAL
async function onFilmClick(e) {
  e.preventDefault();
  if (e.target === e.currentTarget) {
    return;
  }

  const item = e.target.closest('li');
  id = item.dataset.filmid;

  try {
    const { data } = await getFilmById(id);
    const allGenres = getAllGenres(data.genres);
    textWatchedBtn = setBtnText(arrOfWatchedId, id);
    textQueueBtn = setBtnText(arrOfQueueId, id);
    const markUp = renderModalMarkup(
      data,
      allGenres,
      textWatchedBtn,
      textQueueBtn
    );

    document.addEventListener('keydown', onEscKeydown);
    containerForModal.innerHTML = markUp;
    modal.classList.remove('is-hidden');
    const imageLinkRef = document.querySelector('.modal-film__img-link');
    imageLinkRef.addEventListener('click', () => onImageClickOpenVideo(id));

    const addToWatchedBtn = document.querySelector('.modal-film__watched');
    const addToQueueBtn = document.querySelector('.modal-film__queue');
    checkActiveClass(arrOfWatchedId, addToWatchedBtn);
    checkActiveClass(arrOfQueueId, addToQueueBtn);
    addToWatchedBtn.addEventListener('click', e =>
      onBtnClickAddToWatchedOrQueue(e, arrOfWatchedId, WATCHED_KEY)
    );
    addToQueueBtn.addEventListener('click', e =>
      onBtnClickAddToWatchedOrQueue(e, arrOfQueueId, QUEUE_KEY)
    );
  } catch (error) {
    Notify.failure(error.message);
    onCloseModalClick();
  }
}

// Set Button text
function setBtnText(arr, id) {
  return arr.includes(id) ? 'remove from queue' : 'add to queue';
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

//ADD-REMOVE TO-FROM LOCAL STORAGE
function onBtnClickAddToWatchedOrQueue(e, arr, key) {
  if (arr.includes(id)) {
    const index = arr.indexOf(id);
    arr.splice(index, 1);
    e.target.textContent = `add to ${key}`;
    e.target.classList.add(`modal-film__${key}`);
    e.target.classList.remove('js-active');
    if (!arr.length && window.location.pathname === '/library.html') {
      renderMarkupEmptyLibrary();
    }
    Notify.success(`Film successfully removed from ${key}`);
    if (window.location.pathname === '/library.html') {
      filmCardId = filmsList.querySelector(`[data-filmId="${id}"]`);
      filmCardId.remove();
      onCloseModalClick();
    }
  } else {
    arr.push(id);
    e.target.textContent = `remove to ${key}`;
    e.target.classList.remove(`modal-film__${key}`);
    e.target.classList.add('js-active');
    Notify.success(`Film successfully added to ${key}`);
  }
  localStorage.setItem(key, JSON.stringify(arr));
}

// SAVE LOCAL STORAGE
function savedDataFromLocalStorage(key, arrOfId) {
  const savedData = localStorage.getItem(key);
  if (savedData) {
    const parsedSavedData = JSON.parse(savedData);
    parsedSavedData.forEach(el => {
      return arrOfId.push(el);
    });
  }
}
savedDataFromLocalStorage(WATCHED_KEY, arrOfWatchedId);
savedDataFromLocalStorage(QUEUE_KEY, arrOfQueueId);

// FUNCTION TO CHECK ACTIVE BTN ON MODAL
function checkActiveClass(arr, btn) {
  arr.includes(id)
    ? btn.classList.add('js-active')
    : btn.classList.add('modal-film__watched');
}

// FUNCTION FOR RENDER MARKUP FOR EMPTY LIBRARY
export function renderMarkupEmptyLibrary() {
  const imgRef = container.querySelector('.film__img--nothing');
  if (imgRef) {
    return;
  }
  const markupEmptyLibrary = `
    <img class="film__img--nothing" src="${nothing}" alt="nothingHere">
  `;
  container.insertAdjacentHTML('afterbegin', markupEmptyLibrary);
}
