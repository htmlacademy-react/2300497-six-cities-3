import axios from 'axios';

const api = axios.create({
  baseURL: 'https://15.design.htmlacademy.pro/six-cities',
  timeout: 5000,
});

export default api;

