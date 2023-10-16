import axios from 'axios';

const BASE_API_URL = 'http://3.223.25.80:8080';

export const client = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
