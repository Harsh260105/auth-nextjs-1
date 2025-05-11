import { connectDB } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

try {
    connectDB();
} catch (error) {
    console.log('Error connecting to database: ', error);
}

export async function POST(request: NextRequest) {

    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log('Received data:', reqBody);

    const user = await User.findOne({email})

    if (user) {
        return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        username,
        email,
        password: hashedPassword
    })

    const savedUser = await newUser.save()

    console.log('Saved user:', savedUser);
    
    if (savedUser) {
        return NextResponse.json({ 
        message: 'User created successfully', 
        success: true,
        savedUser
        }, { status: 201 });
    } else {
        return NextResponse.json({ message: 'Error creating user' }, { status: 500 });
    }
    
}