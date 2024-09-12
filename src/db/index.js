import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Замените на URL вашего сервера, если нужно

// Функция для создания нового пользователя
export function createUser(mail, password) {
  return axios
    .post(`${API_URL}/users`, {
      mail,
      password,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error creating user:', error);
      throw error;
    });
}

// Функция для получения всех пользователей
export function getUsers() {
  return axios
    .get(`${API_URL}/users`)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error getting users:', error);
      throw error;
    });
}
