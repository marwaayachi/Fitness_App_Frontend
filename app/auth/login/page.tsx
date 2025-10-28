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
    <div className="min-h-screen flex">
      {/* Left side - Login form */}
      <div className="flex-1 flex items-center justify-center bg-orange-500 p-10">
        <div className="max-w-md w-full">
          <h2 className="text-5xl text-white text-center font-semibold mb-12">Sign in</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              {...register("email")}
              placeholder="Email"
              className="w-full p-2 border border-amber-50 rounded"
            />
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full p-2 border border-amber-50  rounded"
            />
            <button className="w-full py-2 bg-gray-200 text-lg  text-orange-500 rounded hover:bg-gray-300  transition">
              Sign in
            </button>
          </form>

          {/* Link to Register */}
          <p className="mt-4 text-sm text-white text-center">
            Don’t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-amber-300 hover:underline"
            >
              Register
            </Link>
          </p>

          {message && (
            <p className="mt-4 text-center text-red-500">{message}</p>
          )}
        </div>
      </div>

      {/* Right side - Image */}
      <div className="flex-1 hidden lg:flex items-center justify-center bg-gray-100">
        <img
          src="/Login.png"
          alt="Login Illustration"
          className="w-3/4 h-auto object-contain"
        />
      </div>
    </div>
  );
}