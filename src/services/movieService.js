import httpService from "./httpService";
import { apiEndpoint as apiURL } from "../config";

const apiEndpoint = apiURL + '/movies';

export async function getMovies() {
  const { data: movies } = await httpService.get(apiEndpoint);
  return movies;
}

export async function getMovie(id) {
  const { data: movie } = await httpService.get(`${apiEndpoint}/${id}`);
  return movie;
}

export async function deleteMovie(id) {
  await httpService.delete(`${apiEndpoint}/${id}`);
}

export async function saveMovie(movie) {
  await httpService.post(apiEndpoint, movie);
}

export async function updateMovie(movie) {
  const { _id: id } = movie;
  delete movie._id
  await httpService.put(`${apiEndpoint}/${id}`, movie);
}
