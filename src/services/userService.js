import httpService from "./httpService";
import { apiEndpoint as apiURL } from "../config";

const apiEndpoint = apiURL + '/users';

export async function registerUser(userObject) {
  const response = await httpService.post(apiEndpoint, userObject);
  localStorage.setItem('token', response.headers['x-auth-token']);
}
