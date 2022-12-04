import { Notify } from 'notiflix';
import { getFilmById } from './api';
import { renderModalMarkup } from './createMarkupForModal';
import { onImageClickOpenVideo } from './modal-video-trailer';
import nothing from '../images/theres-nothing-to-see-here.gif';
import { refs } from './refs';

const {
  container,
  containerForModal,
  filmsList,
  modal,
  modalVideo,
  closeModalBtn,
  modalFilmBtnsContainerRef,
} = refs;

Notify.init({
  timeout: 1500,
  position: 'center-top',
});

export const WATCHED_KEY = 'watched';
export const QUEUE_KEY = 'queue';

let textWatchedBtn;
let textQueueBtn;
let id;
let filmCardId;
const arrOfWatchedId = [];
const arrOfQueueId = [];

filmsList[0].addEventListener('click', onFilmClick);
closeModalBtn.addEventListener('click', onCloseModalClick);
modal.addEventListener('click', onBackdropCloseClick);
const TOKEN_KEY = 'token';

// OPEN MODAL
export async function onFilmClick(e) {
  e.preventDefault();
  if (e.target === e.currentTarget) {
    return;
  }
  const item = e.target.closest('li');
  id = item.dataset.filmid;

  try {
    const { data } = await getFilmById(id);
    const allGenres = getAllGenres(data.genres);
    textWatchedBtn = setBtnText(arrOfWatchedId, id, WATCHED_KEY);
    textQueueBtn = setBtnText(arrOfQueueId, id, QUEUE_KEY);
    const markUp = renderModalMarkup(
      data,
      allGenres,
      textWatchedBtn,
      textQueueBtn
    );

    document.addEventListener('keydown', onEscKeydown);
    containerForModal.innerHTML = markUp;
    [...modalFilmBtnsContainerRef[0].children].forEach(el => {
      el.classList.toggle('dark-modal-btns');
    });
    const addToWatchedBtn = document.querySelector('.modal-film__watched');
    const addToQueueBtn = document.querySelector('.modal-film__queue');
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      addToWatchedBtn.hidden = true;
      addToQueueBtn.hidden = true;
    }
    modal.classList.remove('is-hidden');
    const imageLinkRef = document.querySelector('.modal-film__img-link');
    imageLinkRef.addEventListener('click', () => onImageClickOpenVideo(id));

    checkActiveClass(arrOfWatchedId, addToWatchedBtn);
    checkActiveClass(arrOfQueueId, addToQueueBtn);
    let currentArr = arrOfWatchedId;
    if (filmsList[0].dataset.page === QUEUE_KEY) {
      currentArr = arrOfQueueId;
    }
    addToWatchedBtn.addEventListener('click', e =>
      onBtnClickAddToWatchedOrQueue(e, arrOfWatchedId, WATCHED_KEY, currentArr)
    );
    addToQueueBtn.addEventListener('click', e =>
      onBtnClickAddToWatchedOrQueue(e, arrOfQueueId, QUEUE_KEY, currentArr)
    );
  } catch (error) {
    Notify.failure(error.message);
    onCloseModalClick();
  }
}

// Set Button text
function setBtnText(arr, id, key) {
  return arr.includes(id) ? `remove from ${key}` : `add to ${key}`;
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
function onBtnClickAddToWatchedOrQueue(e, arr, key, currArr) {
  if (arr.includes(id)) {
    const index = arr.indexOf(id);
    arr.splice(index, 1);
    e.target.textContent = `add to ${key}`;
    e.target.classList.add(`modal-film__${key}`);
    e.target.classList.remove('js-active');
    if (!currArr.length && location.pathname.includes('library')) {
      renderMarkupEmptyLibrary();
    }
    Notify.success(`Film successfully removed from ${key}`);
    if (location.pathname.includes('library')) {
      if (arr === currArr) {
        filmCardId = filmsList[0].querySelector(`[data-filmId="${id}"]`);
        filmCardId.remove();
        onCloseModalClick();
      }
    }
  } else {
    arr.push(id);
    e.target.textContent = `remove from ${key}`;
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
  localStorage.setItem(key, JSON.stringify(arrOfId));
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
