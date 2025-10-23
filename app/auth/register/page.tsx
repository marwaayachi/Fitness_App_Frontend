"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { registerUser } from "@/lib/api";

type RegisterFormInputs = {
  name: string;
  email: string;
  password: string;
  age: number;
  heightCm: number;
  weightKg: number;
};

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const [message, setMessage] = useState("");
  const router = useRouter();


  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        profile: {
          age: data.age,
          heightCm: data.heightCm,
          weightKg: data.weightKg,
        },
      });
      setMessage("✅ Registration successful!");
      router.push("/user");
    } catch (error: any) {
      setMessage(
        `❌ ${error.response?.data?.message || "Registration failed"}`
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create an Account
        </h2>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Username</label>
          <input
            {...register("name", { required: "Username is required" })}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your username"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Age */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Age</label>
          <input
            type="number"
            {...register("age", { required: "Age is required" })}
            className="w-full border border-gray-300 p-2 rounded-md"
            placeholder="Enter your age"
          />
          {errors.age && (
            <p className="text-red-500 text-sm">{errors.age.message}</p>
          )}
        </div>

        {/* Height */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Height (cm)</label>
          <input
            type="number"
            {...register("heightCm", { required: "Height is required" })}
            className="w-full border border-gray-300 p-2 rounded-md"
            placeholder="Enter your height in cm"
          />
          {errors.heightCm && (
            <p className="text-red-500 text-sm">{errors.heightCm.message}</p>
          )}
        </div>

        {/* Weight */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Weight (kg)</label>
          <input
            type="number"
            {...register("weightKg", { required: "Weight is required" })}
            className="w-full border border-gray-300 p-2 rounded-md"
            placeholder="Enter your weight in kg"
          />
          {errors.weightKg && (
            <p className="text-red-500 text-sm">{errors.weightKg.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
        >
          Register
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>

        {message && (
          <p className="text-center mt-4 text-gray-700 font-medium">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
