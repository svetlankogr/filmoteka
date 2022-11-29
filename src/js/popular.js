const apiKey = 'e20dc8db2a19ccc0feaf13905c82de4b';
const list = document.querySelector('.films__list');

(async () => {
  
const genresListFetch = async () => {
  return await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`).then(res=> res.json()).then(genres =>
    {return genres.genres}).catch(err=>console.log(err))
}
const genresList = await genresListFetch();


fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`)
  .then(res => res.json())
  .then(show => {
    const filmArray = show.results;
    const items = filmArray.map(el => {
      const elGenres = []
      for (let i = 0; i < el.genre_ids.length; i++) {
        for (let index = 0; index < genresList.length; index++){
          if(genresList[index].id === el.genre_ids[i]){
          elGenres.push(genresList[index].name)
          }
        }       
      }
      const releaseDate = new Date(el.release_date);
      return `<li class="films__item">
<a href="" class="films__link"  role="button" data-filmId="${el.id}">
  <div class="films__img-container">
    <img
      src="https://image.tmdb.org/t/p/original/${el.poster_path}"
      alt="${el.original_title} poster"
      class="films__img"
    />
  </div>
  <h2 class="films__title">${el.original_title}</h2>
  <p class="films__description"> ${elGenres.join(', ')} | ${releaseDate.getFullYear()}</p>
</a>
</li>`;
    });
    list.innerHTML = items.join('');
  })
  .catch(err => console.log(err));

})();

export default apiKey