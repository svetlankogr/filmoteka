import axios from 'axios';

const API_KEY = 'e20dc8db2a19ccc0feaf13905c82de4b';

const filmsApi = axios.create({
  baseURL: 'https://api.themoviedb.org/',
  params: {
    api_key: API_KEY,
  },
});

export function fetchTopFilms() {
  return filmsApi.get('3/trending/movie/day');
}

export function fetchGenresList() {
  return filmsApi.get('3/genre/movie/list', { params: { language: 'en-US' } });
}

export function getFilmById(id) {
  return filmsApi.get(`3/movie/${id}`);
}
