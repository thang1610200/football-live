import { NextResponse } from "next/server";
import prisma from '@/lib/prismadb';
import getCurrentUser from "@/app/actions/getCurrentUser";
import { pusherServer } from "@/lib/pusher";

export async function POST (request: Request){
    try {
        const { message, MatchId } = await request.json();
        const currentUser = await getCurrentUser();

        if(!currentUser?.id){
            return new NextResponse("Unauthorize",{status: 403});
        }

        const newMessage = await prisma.message.create({
            data: {
                body: message,
                match: {
                    connect: {
                        id: MatchId
                    }
                },
                sender: {
                    connect: {
                        id: currentUser.id
                    }
                }
            },
            include: {
                sender: true
            }
        })

        await pusherServer.trigger(MatchId, 'messages:new', newMessage);

        return NextResponse.json(newMessage);
    }
    catch(err){
        return new NextResponse("Internal Server", {status: 500});
    }
}