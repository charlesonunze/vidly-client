import jwtDecode from 'jwt-decode';
import httpService from "./httpService";
import { apiEndpoint as apiURL } from "../config";

const apiEndpoint = apiURL + '/auth';
const tokenKey = 'token';

httpService.setToken(getJWT());

export async function loginUser(userObject) {
  const { data: token } = await httpService.post(apiEndpoint, userObject);
  localStorage.setItem(tokenKey, token);
}

export async function logoutUser() {
  localStorage.removeItem(tokenKey);
}

export async function getCurrentUser() {
  try {
    const token = localStorage.getItem(tokenKey);
    return jwtDecode(token);
  } catch (error) {
    return null
  }
}

export function getJWT() {
  return localStorage.getItem(tokenKey);
}
