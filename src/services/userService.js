import httpService from "./httpService";
import { apiEndpoint as apiURL } from "../config";

const apiEndpoint = apiURL + '/users';

export async function registerUser(userObject) {
  const { data: user } = await httpService.post(apiEndpoint, userObject);
  return user;
}