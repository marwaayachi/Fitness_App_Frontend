"use client";
import { useForm } from "react-hook-form";
import { signIn } from "../../../lib/api";

type FormData = { email: string; password: string };

export default function LoginPage() {
  const { register, handleSubmit } = useForm<FormData>();

  async function onSubmit(data: FormData) {
    try {
      const res = await signIn(data);
      // For now, log response. Later use context to store user.
      console.log("login succeeded", res);
      // redirect or update UI as needed
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Sign in</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("email")}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
        />
        <button className="w-full py-2 bg-blue-600 text-white rounded">
          Sign in
        </button>
      </form>
    </div>
  );
}
