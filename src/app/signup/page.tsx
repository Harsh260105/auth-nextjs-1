"use client";

import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { toast } from "react-hot-toast";
import { set } from "mongoose";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    
    try {
    
        setLoading(true);
        const response = await axios.post("/api/users/signup", user);

        console.log("Response:", response.data);

        toast.success("Signup successful! Redirecting to login...");
        
        setTimeout(() => {
          router.push("/login");
        }, 3000);

    } catch (error: any) {
        setLoading(false);
        toast.error("Signup failed! Please try again.");
        console.error("Error signing up:", error.message);
    } finally {
        setLoading(false);
    }

  }

  useEffect(() => {
    if(user.username.length > 0 && user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false); 
    }
    else {
      setButtonDisabled(true);
    }
  }
  , [user]);

  return (
    <div className="flex flex-col bg-slate-900 items-center justify-center min-h-screen py-2">

      <h1 className="mb-8 font-extrabold text-4xl">
        {loading ? "Signing you up!" : "Signup"}
      </h1>
      
      <hr />

      <label htmlFor="username" className="mb-1">
        username
      </label>
      <input
        id="username"
        type="text"
        value={user.username}
        required
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="border-2 border-gray-300 rounded-md p-2 mb-3 hover:border-blue-500 outline-none transition duration-200 ease-in-out"
        placeholder="Enter your username"
      />

      <label htmlFor="email" className="mb-1">
        email
      </label>
      <input
        id="email"
        type="email"
        value={user.email}
        required
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="border-2 border-gray-300 rounded-md p-2 mb-3 hover:border-blue-500 outline-none transition duration-200 ease-in-out"
        placeholder="Enter your email"
      />

      <label htmlFor="password" className="mb-1">
        password
      </label>
      <input
        id="password"
        type="password"
        required
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="border-2 border-gray-300 rounded-md p-2 mb-3 hover:border-blue-500 outline-none transition duration-200 ease-in-out"
        placeholder="Enter your password"
      />

      <button
        onClick={onSignup}
        className="bg-blue-500 text-white rounded-md p-2 mb-3 hover:bg-blue-600 transition cursor-pointer duration-200 ease-in-out mt-3"
        disabled={buttonDisabled}
      >
      
        {buttonDisabled ? "Fill the details" : "Signup"}
      
      </button>

      <Link href="/login" className="text-white ">
        Already have an account?{" "}
        <span className="text-blue-500 underline">Signin</span>
      </Link>

    </div>
  );
}
