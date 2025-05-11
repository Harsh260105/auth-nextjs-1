'use client';

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";
import { set } from "mongoose";

export default function LoginPage() {
    
    const router = useRouter();

    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    const onLogin = async () => {

        try {
            
            setLoading(true);
            const res = await axios.post('/api/users/login', user);

            console.log(res.data);

            if(res.status === 201) {
                toast.success("Login Successful!");
                setTimeout(() => {
                    router.push("/profile");
                }, 3000);
            } else {
                toast.error("Login failed! Please try again.");
            }

        } catch (error : any) {
            toast.error("Login failed! Please try again.");
            console.error("Error logging in:", error.message);
            console.log("status code:", error.response.status);
            setLoading(false);
        } finally {
            setLoading(false);
        }

    }

    return (

        <div className="flex flex-col bg-slate-900 items-center justify-center min-h-screen py-2">
            <h1 className="mb-8 font-extrabold text-4xl">{loading ? "Logging you in..." : "Login"}</h1>
            <hr />
            <label htmlFor="email" className="mb-1">email</label>
            <input
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="border-2 border-gray-300 rounded-md p-2 mb-3 hover:border-blue-500 outline-none transition duration-200 ease-in-out"
                placeholder="Enter your email"
            />
            <label htmlFor="password" className="mb-1">password</label>
            <input
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="border-2 border-gray-300 rounded-md p-2 mb-3 hover:border-blue-500 outline-none transition duration-200 ease-in-out"
                placeholder="Enter your password"
            />
            <button
                onClick={onLogin}
                className="bg-blue-500 text-white rounded-md p-2 mb-3 hover:bg-blue-600 transition duration-200 ease-in-out mt-3"
                disabled={buttonDisabled}
            >
                {buttonDisabled ? "Fill all the details" : "Login"}
            </button>
            <Link href="/signup" className="text-white ">Don't have an account? <span className="text-blue-500 underline">SignUp</span></Link>
        </div>

    )

}