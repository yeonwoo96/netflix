const API_KEY = "cea1b91a35cdd8686089b9b4fdfd0e19";
const BASE_PATH = "https://api.themoviedb.org/3/";

export interface IgetMovies {
  dates: { maximum: string; minimum: string };
  page: number;
  results: {
    adult: boolean;
    backdrop_path: string;
    // genre_ids: (3) [28, 12, 878]
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }[];
}
export function getMovies() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

export function popularMovies() {
  return fetch(
    `${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}
export function topratedMovies() {
  return fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}
export function upcomingMovies() {
  return fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}
