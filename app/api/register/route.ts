import bcrypt from 'bcrypt';
import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';
export async function POST (request: Request){
    try {
        const body = await request.json();
        const { email, name, password } = body;
        if(!email || !name || !password){
            return new NextResponse("Missing Info", {status: 400});
        }

        const hashedPassword = await bcrypt.hash(password, 9);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword,
                role: 'user'
            }
        })

        return NextResponse.json(user);
    }
    catch(error: any){
        return new NextResponse("Internal Server",{status: 500});
    }
}
