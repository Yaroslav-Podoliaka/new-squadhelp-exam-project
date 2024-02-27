import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import CONTANTS from '../constants';

const instance = axios.create({
  baseURL: CONTANTS.BASE_URL,
});
// Добавляем перехватчик запросов для модификации конфигурации перед отправкой.
instance.interceptors.request.use(
  config => {
    // Получаем токен доступа из локального хранилища.
    const token = window.localStorage.getItem(CONTANTS.ACCESS_TOKEN);
    // console.log('Intrceptor Token: ', token);
    // Если токен существует, добавляем заголовок 'Authorization' к запросу.
    if (token) {
      config.headers = { ...config.headers, Authorization: token };
    }
    // Возвращаем модифицированную конфигурацию запроса.
    return config;
  },
  // Обрабатываем ошибки на этапе настройки запроса.
  err => Promise.reject(err)
);
// Добавляем перехватчик ответов для обработки ответов.
instance.interceptors.response.use(
  response => {
    // Если ответ содержит токен, обновляем локальное хранилище новым токеном.
    if (response.data.token) {
      window.localStorage.setItem(CONTANTS.ACCESS_TOKEN, response.data.token);
    }
    // Возвращаем ответ.
    return response;
  },
  // Обрабатываем ошибки на этапе обработки ответа.
  err => {
    // const navigate = useNavigate();
    const navigate = err?.response?.status === 408 ? err.navigate : null;
    // Если статус ответа 408 (Request Timeout) и текущий путь не является одним из указанных путей.
    if (
      err.response.status === 408 &&
      navigate &&
      navigate() !== '/login' &&
      navigate() !== '/registration' &&
      navigate() !== '/'
    ) {
      // Перенаправляем на путь '/login'.
      navigate('/login');
    }
    // Возвращаем промис с ошибкой.
    return Promise.reject(err);
  }
);

export default instance;

// import axios from 'axios';
// import CONTANTS from '../constants';
// import history from '../browserHistory';

// const instance = axios.create({
//   baseURL: CONTANTS.BASE_URL,
// });

// instance.interceptors.request.use(
//   config => {
//     const token = window.localStorage.getItem(CONTANTS.ACCESS_TOKEN);
//     if (token) {
//       config.headers = { ...config.headers, Authorization: token };
//     }
//     return config;
//   },
//   err => Promise.reject(err)
// );

// instance.interceptors.response.use(
//   response => {
//     if (response.data.token) {
//       window.localStorage.setItem(CONTANTS.ACCESS_TOKEN, response.data.token);
//     }
//     return response;
//   },
//   err => {
//     if (
//       err.response.status === 408 &&
//       history.location.pathname !== '/login' &&
//       history.location.pathname !== '/registration' &&
//       history.location.pathname !== '/'
//     ) {
//       history.replace('/login');
//     }
//     return Promise.reject(err);
//   }
// );

// export default instance;
