import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";


interface IParam {
    id: string
}
export async function GET (request: Request, {params} : {params: IParam}){
    try {
        if(!params.id){
            return new NextResponse("Miss Id", {status: 404});
        }

        const existingMatch = await prisma.match.findUnique({
            where: {
                id: params.id
            }
        })

        if(!existingMatch){
            return new NextResponse("Miss Id", {status: 404});
        }

        const message = await prisma.message.findMany({
            where: {
                matchId: params.id
            },
            include: {
                sender: true
            },
            orderBy: {
                createAt: 'asc'
            }
        })

        return NextResponse.json(message);
    }
    catch(err){
        return new NextResponse("Internal Server", {status: 500})
    }
}