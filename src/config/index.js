const prodEndpoint = process.env.REACT_APP_PROD_API_ENDPOINT;
const localEndpoint = process.env.REACT_APP_DEV_API_ENDPOINT;

export const apiEndpoint = process.env.NODE_ENV === 'production' ? prodEndpoint : localEndpoint;