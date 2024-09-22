import axios from 'axios';
import { router } from '@/router';
import { ElNotification } from 'element-plus';
// Создаем экземпляр Axios с общими настройками
const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Базовый URL для запросов
  withCredentials: true, // Позволяет отправлять куки
  headers: {
    'Content-Type': 'application/json',
  },
});

// Обработка токена
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Добавляем токен в заголовки
  }
  return config;
});

// Добавляем interceptor для обработки ошибок в ответах
apiClient.interceptors.response.use(
  (response) => {
    // Если ответ успешный, просто возвращаем его
    return response;
  },
  async (error) => {
    // Проверяем, есть ли ошибка в ответе
    if (error.response) {
      const status = error.response.status;
      // ElNotification({
      //   title: 'Ошибка сервера!',
      //   message: `${error.response.data.message}`,
      //   type: 'error',
      // });
      // Если статус ошибки 401 (Unauthorized)
      if (status === 401) {
        // Удаляем токен из localStorage
        localStorage.removeItem('token');
        // Перенаправляем на страницу логина
        router.push('/login');
      } else if (status === 403) {
        // Дополнительная логика для 403 Forbidden, если нужно
        router.push('/login');
      }
    }

    // Пробрасываем ошибку дальше, если не удалось обработать
    return Promise.reject(error);
  },
);

// Функции для API-запросов
export const registerUser = async (user) => {
  try {
    const response = await apiClient.post('/register', {
      ...user,
    });
    ElNotification({
      title: 'Успешно!',
      message: 'Пользователь зарегистрирован',
      type: 'success',
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (login, password) => {
  try {
    const response = await apiClient.post('/login', { login, password });

    // Сохраняем основной токен в localStorage
    localStorage.setItem('token', response.data.token);

    // Перенаправляем на защищенную страницу после успешного входа
    router.push('/admin');

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      ElNotification({
        title: 'Ошибка!',
        message: 'Неверный логин или пароль',
        type: 'error',
      });
    }
  }
};
// Функция для получения всех пользователей
export const getUsers = async () => {
  try {
    const response = await apiClient.get('/users');
    return response.data;
  } catch (error) {}
};

// Функция для выхода из системы
export const logoutUser = async () => {
  try {
    await apiClient.post('/logout');
    localStorage.removeItem('token'); // Удаляем токен из localStorage
    router.push('/login'); // Перенаправляем на страницу входа
  } catch (error) {}
};

// Функция для удаления пользователя
export const deleteUser = async (userId, userLogin) => {
  try {
    const response = await apiClient.delete('/users', {
      data: { _id: userId, login: userLogin },
    });

    ElNotification({
      title: 'Успешно!',
      message: 'Пользователь удален',
      type: 'success',
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      ElNotification({
        title: 'Ошибка!',
        message:
          error.response.data.message || 'Не удалось удалить пользователя',
        type: 'error',
      });
    }
    throw error;
  }
};
