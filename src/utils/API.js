import axios from 'axios';

const baseURL = import.meta.env.VITE_API_ENDPOINT;

const instance = axios.create({
  baseURL: `${baseURL}/api/v1`,
});

export default instance;
