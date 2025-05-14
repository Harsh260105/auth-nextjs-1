'use client';

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function profilePage() {

    const router = useRouter()
    const handleLogout = async () => {
        
        try {
            const res = await axios.get('/api/users/logout');
            toast.success("Logged Out Successfully")

            setTimeout(() => {
                router.push('/login');
                toast.success("Redirecting to login page") 
            }
            , 2000);
            
        } catch (error:any) {
            console.log(error.msg);
            toast.error(error.message);
        }

    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1>Profile Page</h1>
            <p>This is the profile page.</p>
            <hr/>
            <button className="bg-blue-500 text-white px-4 py-2 rounded
            mt-5 cursor-pointer hover:bg-red-600 hover:duration-400 ease-in-out"
            onClick={handleLogout}
            >Logout</button>
        </div>
    )
}