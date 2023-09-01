import { NextResponse } from "next/server";
import prisma from '@/lib/prismadb';

export async function GET (
    request: Request
){
    try {
        const roundMatch = await prisma.round.findFirst({
            where: {
                isAction: true
            }
        })

        const match = await prisma.match.findMany({
            where:{
                roundId: roundMatch?.id,
                start: true
            },
            include: {
                homeTeam: true,
                awayTeam: true,
                league: true,
                round: true
            }
        })

        return NextResponse.json(match);
    }
    catch(err: any){
        return new NextResponse('Internal Server',{status: 500});
    }
}