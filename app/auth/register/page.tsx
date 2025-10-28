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
   <div className="min-h-screen flex">
     {/* Left side - Registration Form */}
     <div className="flex-1 flex items-center justify-center bg-orange-500 p-10">
       <form
         onSubmit={handleSubmit(onSubmit)}
         className="w-full max-w-3xl grid grid-cols-2 gap-6"
       >
         <h2 className="text-2xl font-bold text-white col-span-2 text-center mb-6">
           Create an Account
         </h2>

         {/* Username */}
         <div className="flex flex-col">
           <label className="text-white mb-2">Username</label>
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
         <div className="flex flex-col">
           <label className="text-white mb-2">Email</label>
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
         <div className="flex flex-col">
           <label className="text-white mb-2">Password</label>
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
         <div className="flex flex-col">
           <label className="text-white mb-2">Age</label>
           <input
             type="number"
             {...register("age", { required: "Age is required" })}
             className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
             placeholder="Enter your age"
           />
           {errors.age && (
             <p className="text-red-500 text-sm">{errors.age.message}</p>
           )}
         </div>

         {/* Height */}
         <div className="flex flex-col">
           <label className="text-white mb-2">Height (cm)</label>
           <input
             type="number"
             {...register("heightCm", { required: "Height is required" })}
             className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
             placeholder="Enter your height"
           />
           {errors.heightCm && (
             <p className="text-red-500 text-sm">{errors.heightCm.message}</p>
           )}
         </div>

         {/* Weight */}
         <div className="flex flex-col">
           <label className="text-white mb-2">Weight (kg)</label>
           <input
             type="number"
             {...register("weightKg", { required: "Weight is required" })}
             className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
             placeholder="Enter your weight"
           />
           {errors.weightKg && (
             <p className="text-red-500 text-sm">{errors.weightKg.message}</p>
           )}
         </div>

         {/* Submit Button - full width */}
         <button
           type="submit"
           className="col-span-2 w-full bg-gray-200 text-xl  text-orange-500 p-2 rounded-md hover:bg-gray-300 transition"
         >
           Register
         </button>

         <p className="col-span-2 text-sm text-center mt-4 text-white">
           Already have an account?{" "}
           <Link href="/auth/login" className="text-amber-300  hover:underline">
             Login
           </Link>
         </p>

         {message && (
           <p className="col-span-2 text-center mt-2 text-white font-medium">
             {message}
           </p>
         )}
       </form>
     </div>

     {/* Right side - Image */}
     <div className="flex-1 hidden lg:flex items-center justify-center bg-gray-100">
       <img
         src="/Login.png"
         alt="Register Illustration"
         className="w-3/4 h-auto object-contain"
       />
     </div>
   </div>
 );
}