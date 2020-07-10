import httpService from "./httpService";
import { apiEndpoint } from "../config";

export async function getMovies() {
  const { data: movies } = await httpService.get(`${apiEndpoint}/movies`);
  return movies;
}

export async function getMovie(id) {
  const { data: movie } = await httpService.get(`${apiEndpoint}/movies/${id}`);
  return movie;
}

export async function deleteMovie(id) {
  await httpService.delete(`${apiEndpoint}/movies/${id}`);
}

export async function saveMovie(movie) {
  await httpService.post(`${apiEndpoint}/movies`, movie);
}

export async function updateMovie(movie) {
  const { _id: id } = movie;
  delete movie._id
  await httpService.put(`${apiEndpoint}/movies/${id}`, movie);
}
