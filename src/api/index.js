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
// Функция для редактирования пользователя
export const editUser = async (user) => {
  const { _id, login, password, role, name } = user;
  try {
    const response = await apiClient.put('/users', {
      _id,
      login,
      password,
      role,
      name,
    });

    ElNotification({
      title: 'Успешно!',
      message: 'Пользователь обновлен',
      type: 'success',
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      ElNotification({
        title: 'Ошибка!',
        message:
          error.response.data.message || 'Не удалось обновить пользователя',
        type: 'error',
      });
    }
    throw error;
  }
};

// Функция для получения всех схем
export const getSchemas = async () => {
  try {
    const response = await apiClient.get('/schemas');
    return response.data;
  } catch (error) {
    ElNotification({
      title: 'Ошибка!',
      message: error.response?.data.message || 'Не удалось получить схемы',
      type: 'error',
    });
    throw error;
  }
};

// Функция для создания новой схемы
export const createSchema = async (name, json) => {
  try {
    const response = await apiClient.post('/schemas', { name, json });
    ElNotification({
      title: 'Успешно!',
      message: 'Схема создана',
      type: 'success',
    });
    return response.data;
  } catch (error) {
    ElNotification({
      title: 'Ошибка!',
      message: error.response?.data.message || 'Не удалось создать схему',
      type: 'error',
    });
    throw error;
  }
};

// Функция для редактирования схемы
export const editSchema = async (_id, name, newJson) => {
  try {
    const response = await apiClient.put('/schemas', { _id, name, newJson });
    ElNotification({
      title: 'Успешно!',
      message: 'Схема обновлена',
      type: 'success',
    });
    return response.data;
  } catch (error) {
    ElNotification({
      title: 'Ошибка!',
      message: error.response?.data.message || 'Не удалось обновить схему',
      type: 'error',
    });
    throw error;
  }
};

// Функция для удаления схемы
export const deleteSchema = async (_id) => {
  try {
    const response = await apiClient.delete('/schemas', {
      data: { _id },
    });
    ElNotification({
      title: 'Успешно!',
      message: 'Схема удалена',
      type: 'success',
    });
    return response.data;
  } catch (error) {
    ElNotification({
      title: 'Ошибка!',
      message: error.response?.data.message || 'Не удалось удалить схему',
      type: 'error',
    });
    throw error;
  }
};
// Функция для бота
export const getBotApi = async () => {
  try {
    const response = await apiClient.get('/bot');
    return response.data;
  } catch (error) {
    ElNotification({
      title: 'Ошибка!',
      message: error.response?.data.message || 'Не удалось получить API',
      type: 'error',
    });
    throw error;
  }
};
export const editApiBot = async (_id, api, idAdmin, active) => {
  try {
    const response = await apiClient.put('/bot', { _id, api, idAdmin, active });
    ElNotification({
      title: 'Успешно!',
      message: 'API обновлена',
      type: 'success',
    });
    return response.data;
  } catch (error) {
    ElNotification({
      title: 'Ошибка!',
      message: error.response?.data.message || 'Не удалось обновить API',
      type: 'error',
    });
    throw error;
  }
};
