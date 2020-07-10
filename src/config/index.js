const prodEndpoint = "";
const localEndpoint = "http://localhost:3900/api";

export const apiEndpoint = process.env.NODE_ENV === 'production' ? prodEndpoint : localEndpoint;