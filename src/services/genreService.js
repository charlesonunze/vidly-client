import httpService from "./httpService";
import { apiEndpoint } from "../config";

export async function getGenres() {
  const { data: genres } = await httpService.get(`${apiEndpoint}/genres`);
  return genres;
}
