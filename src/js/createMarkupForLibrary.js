export function createMarkupForLibrary(films, genresList) {
  let { id, poster_path, original_title, release_date, vote_average } = films;
  vote_average = vote_average.toFixed(1);
  let releaseDate = new Date(release_date).getFullYear();
  if (releaseDate) {
    releaseDate = `| ${releaseDate}`;
  } else {
    releaseDate = releaseDate || '';
  }

  const imageSrc = poster_path
    ? `https://image.tmdb.org/t/p/original/${poster_path}`
    : 'https://www.reelviews.net/resources/img/default_poster.jpg';
  return `<li class="films__item" data-filmId="${id}">
      <a href="" class="films__link" role="button">
        <div class="films__img-container">
          <img
            src="${imageSrc}"
            alt="${original_title} poster"
            class="films__img"
            loading="lazy"
          />
        </div>
        <h2 class="films__title">${original_title}</h2>
        <p class="films__description">
          ${genresList} | ${releaseDate}<span class="films__rating">${vote_average}</span>
        </p>
      </a>
    </li>`;
}
