import { api } from '../api';

const AUTH_TOKEN_KEY_NAME = 'qwerty';

export type Token = string;

export const getToken = (): Token => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  return token ?? '';
};

export const saveToken = (token: Token): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

export const clearToken = (): void => {
  localStorage.removeItem('token');
  delete api.defaults.headers.common['X-Token'];
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};

