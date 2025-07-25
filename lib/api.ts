// lib/api.ts
import axios from 'axios';

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const m = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
  );
  return m ? decodeURIComponent(m[1]) : null;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/customer/auth',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  let token = getCookie('token');
  
  if (!token && typeof window !== 'undefined') {
    token = localStorage.getItem('hhub_token');
  }

  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

export default api;
