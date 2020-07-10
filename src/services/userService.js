import httpService from "./httpService";
import { apiEndpoint as apiURL } from "../config";

const apiEndpoint = apiURL;

export async function registerUser(userObject) {
  const { data: user } = await httpService.post(apiEndpoint + '/users', userObject);
  return user;
}

export async function loginUser(userObject) {
  const { data: token } = await httpService.post(apiEndpoint + '/auth', userObject);
  return token;
}