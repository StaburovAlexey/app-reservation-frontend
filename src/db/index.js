// api.js
import axios from 'axios';

// Создаем экземпляр Axios с базовым URL вашего сервера
const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Функция для создания пользователя
export const createUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    throw new Error(
      `Error creating user: ${error.response ? error.response.data.error : error.message}`,
    );
  }
};

// Функция для получения всех пользователей
export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    throw new Error(
      `Error fetching users: ${error.response ? error.response.data.error : error.message}`,
    );
  }
};

// Функция для поиска пользователя по mail и password
export const findUser = async (credentials) => {
  try {
    const response = await api.post('/users/search', credentials);
    return response.data;
  } catch (error) {
    throw new Error(
      `Error finding user: ${error.response ? error.response.data.message : error.message}`,
    );
  }
};

// Функция для создания резервации
export const createReservation = async (reservationData) => {
  try {
    const response = await api.post('/reserve', reservationData);
    return response.data;
  } catch (error) {
    throw new Error(
      `Error creating reservation: ${error.response ? error.response.data.error : error.message}`,
    );
  }
};

// Функция для получения всех резерваций
export const getReservations = async () => {
  try {
    const response = await api.get('/reserves');
    return response.data;
  } catch (error) {
    throw new Error(
      `Error fetching reservations: ${error.response ? error.response.data.error : error.message}`,
    );
  }
};
