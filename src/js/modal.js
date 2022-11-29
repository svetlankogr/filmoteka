import axios from 'axios';
const containerForModal = document.querySelector('.js-container');
const filmsList = document.querySelector('.films__list');
const modal = document.querySelector('[data-modal]');
const closeModalBtn = document.querySelector('[data-modal-close]');

axios.defaults.baseURL = 'https://api.themoviedb.org/';
const API_KEY = 'e20dc8db2a19ccc0feaf13905c82de4b';

filmsList.addEventListener('click', onFilmClick);

async function getFilmById(id) {
  const { data } = await axios.get(`3/movie/${id}?api_key=${API_KEY}`);
  return data;
}

function getGenres()

async function onFilmClick(e) {
  e.preventDefault();
  containerForModal.innerHTML = '';
  if (e.target.nodeName === 'UL') {
    return;
  }
  modal.classList.remove('is-hidden');
  const item = e.target.closest('a');
  console.log(item);
  const id = item.dataset.filmid;
  try {
    const film = await getFilmById(id);
    const markUp = renderModalMarkup(film);
    containerForModal.innerHTML = markUp;
  } catch (error) {
    console.log(error);
  }
}

function renderModalMarkup({
  id,
  vote_average,
  vote_count,
  poster_path,
  original_title,
  popularity,
  genre,
  overview,
}) {
  return `<div class="modal-film__container data-id=${id}">
    <div class="modal-film__wrapper-img">
      <img src="https://image.tmdb.org/t/p/original/${poster_path}" alt="${original_title}" class="modal-film__img" />
    </div>
    <div class="modal-film__wrapper-info">
      <h1 class="modal-film__title">${original_title}</h1>
      <ul class="modal-film__list">
        <li class="modal-film__item">
          <p class="modal-film__item-name">Vote / Votes</p>
          <p class="modal-film__item-value"><span>${vote_average}</span> / ${vote_count}</p>
        </li>
        <li class="modal-film__item">
          <p class="modal-film__item-name">Popularity</p>
          <p class="modal-film__item-value">${popularity}</p>
        </li>
        <li class="modal-film__item">
          <p class="modal-film__item-name">Original Title</p>
          <p class="modal-film__item-value">${original_title}</p>
        </li>
        <li class="modal-film__item">
          <p class="modal-film__item-name">Genre</p>
          <p class="modal-film__item-value">${genre}</p>
        </li>
      </ul>
      <div class="modal-film__descr">
        <p class="modal-film__subtitle">ABOUT</p>
        <p class="modal-film__text">${overview}
        </p>
      </div>
      </div>`;
}
// CLOSE MODAL
closeModalBtn.addEventListener('click', onCloseModalClick);
modal.addEventListener('click', onBackdropCloseClick);
document.addEventListener('keydown', onEscKeydown);

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
