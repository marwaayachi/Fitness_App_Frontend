import axios from 'axios';
import { LoginPayload, User } from './types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api',
  withCredentials: true, // include cookies if backend uses them
});

export async function signIn(payload: LoginPayload) {
  const { data } = await api.post('/auth/login', payload);
  return data; // expected { user, token } or similar
}

export async function fetchCurrentUser(): Promise<User | null> {
  try {
    const { data } = await api.get('/auth/me');
    return data.user;
  } catch {
    return null;
  }
}

export default api;
