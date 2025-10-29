import axios from 'axios';
import { LoginPayload, User } from './types';


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || 'NEXT_PUBLIC_BACKEND_URL:4000/api',
  withCredentials: true, 
});

// LOGIN
export async function signIn(payload: LoginPayload) {
    console.log("🧾 Sending payload:", payload);

  const { data } = await api.post('/auth/login', payload, {
    withCredentials: true,
  });
  console.log("Login:", data)
  return data; 
}

// REGISTER
export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  profile: {
    age: number;
    heightCm: number;
    weightKg: number;
  };
}) => {
  const res = await api.post("/auth/register", data);
  console.log("Register:", data);
  return res.data;
};


export async function checkAuth() {
  try {
    const res = await axios.get("/auth/me", {
      withCredentials: true, 
    });
    return res.data.user; // your backend should return the current user
  } catch (err) {
    return null; // not authenticated
  }
}
