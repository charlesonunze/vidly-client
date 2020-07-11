import httpService from "./httpService";

const apiEndpoint = '/users';

export async function registerUser(userObject) {
  const response = await httpService.post(apiEndpoint, userObject);
  localStorage.setItem('token', response.headers['x-auth-token']);
}
