import { getSubdomain } from './hosts';
import Env from '../constants/env';

export const getToken = () => {
  return localStorage.getItem('accessToken');
};

export const setToken = (token) => {
  localStorage.setItem('accessToken', token);
};

export const setRefreshToken = (refreshToken) => {
  localStorage.setItem('refreshToken', refreshToken);
};

export const removeTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp > currentTime;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return null;

  try {
    const subdomain = getSubdomain(window.location.hostname);
    const response = await fetch(
      `http://${subdomain}.${Env.VITE_SERVER_HOST}:8000/api/token/refresh/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      setToken(data.access);
      return data.access;
    }
  } catch (error) {
    console.error('Error refreshing token:', error);
  }

  removeTokens();
  return null;
};
