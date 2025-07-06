import axios from 'axios';

const api = axios.create({
  baseURL: '',
  timeout: 5000,
});

export default async function getOffersListApi() {
  try {
    const response = await api.get('/rentals');
    if (response.status === 200) {
      console.log('Список успешно загружен:', response.data);
    } else {
      throw new Error(`Ошибка сервера: ${response.status}`);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('Ошибка от сервера:', error.response.status, error.message);
      } else if (error.request) {
        console.error('Нет ответа от сервера:', error.request);
      } else {
        console.error('Ошибка запроса:', error.message);
      }
    } else if (error instanceof Error) {
      console.error('Обычная ошибка:', error.message);
    } else {
      console.error('Неизвестная ошибка:', error);
    }
  }
}
