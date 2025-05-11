import User from "@/models/userModel";
import { NextRequest , NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

try {
    connectDB();
} catch (error) {
    console.log('Error connecting to database: ', error);
}

export async function POST(request: NextRequest) {
    
    try {
    
        const reqBody = await request.json();
        const {email, password} = reqBody;
    
        console.log('Received data on login:', reqBody);
    
        const user = await User.findOne({
            $or: [
                { email: email },
                { username: email }
            ]
        })
    
        if(!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
    
        const isMatch = bcrypt.compare(user.password, password);
    
        if(!isMatch) {
            return NextResponse.json({error: "Invalid Password"}, {status: 400});
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login Successful!",
            success: true,
        }, {status: 201})

        response.cookies.set("token",token,{
            httpOnly: true,
        })

        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }

}