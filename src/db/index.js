// api.js
import axios from 'axios';

// Создаем экземпляр Axios с базовым URL вашего сервера
const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Храним токен в локальном хранилище (или в памяти)
let token = localStorage.getItem('token') || '';

// Функция для установки токена
export const setToken = (newToken) => {
  token = newToken;
  localStorage.setItem('token', newToken); // Сохраняем токен в локальное хранилище
};

// Функция для удаления токена
export const clearToken = () => {
  token = '';
  localStorage.removeItem('token');
};

// Добавляем токен к каждому запросу, если он установлен
api.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
// Функция для проверки валидности токена
export const isAuthenticated = async () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const response = await api.post(
      '/validate-token',
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    console.log('response', response);
    return response.status === 200; // Возвращаем true, если токен валиден
  } catch (error) {
    return false; // Если произошла ошибка, токен считается невалидным
  }
};
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
    console.log('res111', response.data);
    return await response.data;
  } catch (error) {
    throw new Error(
      `Error fetching users: ${error.response ? error.response.data.error : error.message}`,
    );
  }
};

// Функция для поиска пользователя по mail и password
export const findUser = async (credentials) => {
  try {
    const response = await api.post('/users/login', credentials);
    if (response.data.token) {
      setToken(response.data.token); // Сохраняем токен при успешной авторизации
    }
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
