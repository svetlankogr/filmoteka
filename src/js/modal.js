import axios from 'axios';
const containerForModal = document.querySelector('.modal-film__container');
const filmsList = document.querySelector('.films__list');
const modal = document.querySelector('[data-modal]');
const closeModalBtn = document.querySelector('[data-modal-close]');

filmsList.addEventListener('click', onFilmClick);
closeModalBtn.addEventListener('click', onCloseModalClick);

axios.defaults.baseURL = 'https://api.themoviedb.org/';
const API_KEY = 'e20dc8db2a19ccc0feaf13905c82de4b';

async function getFilmById(id) {
  const { data } = await axios.get(`3/movie/${id}?api_key=${API_KEY}`);
  return data;
}

function onCloseModalClick() {
  modal.classList.add('is-hidden');
}

function onFilmClick(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  modal.classList.remove('is-hidden');
  console.log(e.target.nodeName);

  const item = e.target.closest('.modal-film__container');
  const id = item.dataset.id;
  getFilmById(id).then(film => {
    const markUp = renderModalMarkup(film);
    containerForModal.innerHTML = markUp;
  });
}

function renderModalMarkup({ id, vote_average, vote_count, poster_path }) {
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
