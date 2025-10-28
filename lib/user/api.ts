import axios from 'axios';
import { LoginPayload, User } from '../types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api',
  withCredentials: true, 
});

export const getCurrentUser = async (): Promise<User> => {
  const res = await api.get<{ user: User }>("/auth/me");
  console.log("User data :", res);
  return res.data.user;
};

export const logout = async () => {
  await api.post("/auth/logout");
};