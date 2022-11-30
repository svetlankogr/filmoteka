import axios from 'axios';

const API_KEY = 'e20dc8db2a19ccc0feaf13905c82de4b';

const filmsApi = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: API_KEY,
  },
});

export function fetchTopFilms() {
  return filmsApi.get('trending/movie/day')
}

export function fetchGenresList() {
  return filmsApi.get('genre/movie/list?language=en-US')
}

export function searchFilms(keyword) {
  return filmsApi.get(`search/movie/?&page=1`, {params: {query: keyword}})
}

export function getFilmById(id) {
  return filmsApi.get(`movie/${id}`);
}