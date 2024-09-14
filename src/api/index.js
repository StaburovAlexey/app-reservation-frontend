import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Убедитесь, что URL соответствует вашему серверу
  headers: {
    'Content-Type': 'application/json',
  },
});

// Функция для обновления токенов
const updateTokens = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    const response = await apiClient.post('/refresh-token', { refreshToken });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    return response.data.token;
  } catch (error) {
    throw new Error('Unable to refresh token');
  }
};

// Функция для выполнения запроса с обработкой истечения токена
const performRequest = async (requestConfig) => {
  const token = localStorage.getItem('token');
  requestConfig.headers = {
    ...requestConfig.headers,
    Authorization: `Bearer ${token}`,
  };

  try {
    return await apiClient(requestConfig);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Обновляем токен и повторяем запрос
      const newToken = await updateTokens();
      requestConfig.headers.Authorization = `Bearer ${newToken}`;
      return await apiClient(requestConfig);
    }
    throw error;
  }
};

// Функции для API-запросов

// Функция для регистрации пользователя
export const registerUser = async (login, password) => {
  try {
    return await performRequest({
      method: 'POST',
      url: '/register',
      data: { login, password },
    });
  } catch (error) {
    throw error.response.data;
  }
};

// Функция для логина пользователя
export const loginUser = async (login, password) => {
  try {
    const response = await performRequest({
      method: 'POST',
      url: '/login',
      data: { login, password },
    });
    localStorage.setItem('token', response.data.tokens.token);
    localStorage.setItem('refreshToken', response.data.tokens.refreshToken);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Функция для получения всех пользователей
export const getUsers = async () => {
  try {
    const response = await performRequest({
      method: 'GET',
      url: '/users',
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
