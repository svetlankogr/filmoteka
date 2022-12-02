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
const spinner = document.querySelector('.circ');

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
  spinner.hidden = false;
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
    const imageLinkRef = document.querySelector('.modal-film__img-link');
    imageLinkRef.addEventListener('click', () => onImageClickOpenVideo(id));

    const addToWatchedBtn = document.querySelector('.modal-film__watched');
    const addToQueueBtn = document.querySelector('.modal-film__queue');
    checkActiveClass(arrOfWatchedId, addToWatchedBtn);
    checkActiveClass(arrOfQueueId, addToQueueBtn);
    addToWatchedBtn.addEventListener('click', e =>
      onBtnClickAddToWatchedOrQueue(
        e,
        arrOfWatchedId,
        WATCHED_KEY,
        textWatchedBtn
      )
    );
    addToQueueBtn.addEventListener('click', e =>
      onBtnClickAddToWatchedOrQueue(e, arrOfQueueId, QUEUE_KEY, textQueueBtn)
    );
  } catch (error) {
    Notify.failure(error.message);
    onCloseModalClick();
  } finally {
    spinner.hidden = true;
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

//ADD-REMOVE TO-FROM LOCAL STORAGE
function onBtnClickAddToWatchedOrQueue(e, arr, key, str) {
  if (arr.includes(id)) {
    const index = arr.indexOf(id);
    arr.splice(index, 1);
    e.target.textContent = `add to ${key}`;
    console.log(str);
    e.target.classList.add('modal-film__watched');
    e.target.classList.remove('js-active');
    if (!arr.length && window.location.pathname === '/library.html') {
      rendermarkupEmptyLibrary();
    }
    Notify.success(`Film successfully removed from ${str}`);
    if (window.location.pathname === '/library.html') {
      filmCardId = filmsList.querySelector(`[data-filmId="${id}"]`);
      filmCardId.remove();
      onCloseModalClick();
    }
  } else {
    arr.push(id);
    e.target.textContent = `remove to ${key}`;
    console.log(str);
    e.target.classList.remove('modal-film__watched');
    e.target.classList.add('js-active');
    Notify.success(`Film successfully added to ${str}`);
  }
  localStorage.setItem(key, JSON.stringify(arr));
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

// FUNCTION TO CHECK ACTIVE BTN ON MODAL
function checkActiveClass(arr, btn) {
  arr.includes(id)
    ? btn.classList.add('js-active')
    : btn.classList.add('modal-film__watched');
}

// FUNCTION FOR RENDER MARKUP FOR EMPTY LIBRARY
export function rendermarkupEmptyLibrary() {
  const divRef = container.getElementsByClassName('wrap-div');
  if (divRef.length) {
    return;
  }
  const div = document.createElement('div');
  div.classList.add('wrap-div');
  const markupEmptyLibrary = `
  <img class="film__img--nothing" src="${nothing}" alt="nothingHere">
  `;
  div.append(markupEmptyLibrary);
  filmsList.insertAdjacentHTML('afterbegin', markupEmptyLibrary);
}
