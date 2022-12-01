export function renderModalMarkup(
  films,
  genresList,
  textWatchedBtn,
  textQueueBtn
) {
  let {
    id,
    vote_average,
    vote_count,
    poster_path,
    original_title,
    popularity,
    overview,
  } = films;
  vote_average = vote_average.toFixed(1);

  return `<div class="modal-film__container data-id=${id}">
    <a class="modal-film__img-link" data-image-link>
      <img src="https://image.tmdb.org/t/p/original/${poster_path}" alt="${original_title}" class="modal-film__img" />
    </a>
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
          <p class="modal-film__item-value modal-film__item-value--uppercase">${original_title}</p>
        </li>
        <li class="modal-film__item">
          <p class="modal-film__item-name">Genre</p>
          <p class="modal-film__item-value">${genresList}</p>
        </li>
      </ul>
      <div class="modal-film__descr">
        <p class="modal-film__subtitle">ABOUT</p>
        <p class="modal-film__text">${overview}
        </p>
      </div>
      <div class="modal-film__wrapper-btn">
        <button type="button" class="modal-film__watched">
          ${textWatchedBtn}
        </button>
        <button type="button" class="modal-film__queue">${textQueueBtn}</button>
      </div>
      </div>`;
}
