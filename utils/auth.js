
import Cookies from 'js-cookie';

export const getToken = () => {
  return Cookies.get('token');
};

export const removeToken = () => {
  Cookies.remove('token');
};

export const isAuthenticated = () => {
  const token = getToken();
  return token ? true : false;
};

export const logout = () => {
    Cookies.remove('token');
    window.location.href = '/'; // Redirige al usuario a la página de login
  };