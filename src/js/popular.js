const apiKey = 'e20dc8db2a19ccc0feaf13905c82de4b';

const list = document.querySelector('.films__list');
console.log(list);

fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`)
  .then(res => res.json())
  .then(show => {
    const filmArray = show.results;
    const items = filmArray.map(el => {
        console.log(el.id);
      const releaseDate = new Date(el.release_date);
      return `<li class="films__item" id ="${el.id}">
<a href="" class="films__link">
  <div class="films__img-container">
    <img
      src="https://image.tmdb.org/t/p/original/${el.poster_path}"
      alt=""
      class="${el.original_title} poster"
    />
  </div>
  <h2 class="films__title">${el.original_title}</h2>
  <p class="films__description">Drama, Action | ${releaseDate.getFullYear()}</p>
</a>
</li>`;
    });
    list.innerHTML = items.join('');
  })
  .catch(err => console.log(err));
