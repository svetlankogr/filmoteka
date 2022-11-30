export function renderModalMarkup(films, genresList, key) {
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

  let imgOrVideo = `<img src="https://image.tmdb.org/t/p/original/${poster_path}" alt="${original_title}" class="modal-film__img" />`

  if (key) {
    imgOrVideo = `<iframe class="modal-film__video" src="https://www.youtube.com/embed/${key}" title=${original_title} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
  }

  return `<div class="modal-film__container data-id=${id}">
    <div class="modal-film__wrapper-img">
      ${imgOrVideo}
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
          <p class="modal-film__item-value--uppercase">${original_title}</p>
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
          add to Watched
        </button>
        <button type="button" class="modal-film__queue">add to queue</button>
      </div>
      </div>`;
}
