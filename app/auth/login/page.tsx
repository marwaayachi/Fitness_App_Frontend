"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "../../../lib/api";
import Link from "next/link";

type FormData = { email: string; password: string };

export default function LoginPage() {
  const { register, handleSubmit } = useForm<FormData>();
    const [message, setMessage] = useState("");
    const router = useRouter();


  async function onSubmit(data: FormData) {
    try {
      const res = await signIn(data);
      setMessage("✅ Login successful!");
      console.log("login succeeded", res);
      router.push("/user");
    } catch (error: any) {
      setMessage(`❌ ${error.response?.data?.message || "Login failed"}`);
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

      {/* Link to Register */}
      <p className="mt-4 text-sm">
        Don’t have an account?{" "}
        <Link href="/auth/register" className="text-blue-400 hover:underline">
          Register
        </Link>
      </p>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
