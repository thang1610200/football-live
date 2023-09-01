import { NextResponse } from "next/server";
import prisma from '@/lib/prismadb';
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST (request: Request){
    try {
        const { matchId } =  await request.json();
        const currentUser = await getCurrentUser();

        if(!currentUser?.id || !currentUser?.email){
            return new NextResponse("unauthorize",{status: 403});
        }

        const exisitingMatch = await prisma.match.findMany({
            where: {
                id: matchId,
                userIds: {
                    equals: [currentUser.id]
                }
            }
        })


        if(exisitingMatch[0]){
            return NextResponse.json(exisitingMatch[0]);
        }

        const newMatch = await prisma.match.update({
            where: {
                id: matchId
            },
            data: {
                users: {
                    connect: {
                        id: currentUser.id
                    }
                }
            }
        })

        return NextResponse.json(newMatch);
    }
    catch(err){
        return new NextResponse("Internal Server",{status: 500});
    }
}