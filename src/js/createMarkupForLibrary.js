export function createMarkupForLibrary(films, genresList) {
  let { id, poster_path, original_title, release_date, vote_average } = films;
  vote_average = vote_average.toFixed(1);
  const releaseDate = new Date(release_date);
  release_date = releaseDate.getFullYear();
  return `<li class="films__item">
      <a href="" class="films__link" role="button" data-filmId="${id}">
        <div class="films__img-container">
          <img
            src="https://image.tmdb.org/t/p/original/${poster_path}"
            alt="${original_title} poster"
            class="films__img"
          />
        </div>
        <h2 class="films__title">${original_title}</h2>
        <p class="films__description">
          ${genresList} | ${release_date}<span class="films__rating">${vote_average}</span>
        </p>
      </a>
    </li>`;
}
