import httpService from "./httpService";

const apiEndpoint = '/genres';

export async function getGenres() {
  const { data: genres } = await httpService.get(apiEndpoint);
  return genres;
}
