import { NextResponse } from "next/server";
import prisma from '@/lib/prismadb';

interface IParams {
    id: string
}

export async function GET (
    request: Request,
    { params } : { params: IParams }
){
    try {
        const round = await prisma.round.findFirst({
            where: {
                round: Number(params.id)
            }
        })
        
        if(!round){
            return NextResponse.json([]);
        }

        const Matches = await prisma.match.findMany({
            where: {
                roundId: round?.id
            },
            include: {
                homeTeam: true,
                awayTeam: true,
                league: true,
                round: true
            }
        })


        return NextResponse.json(Matches);
    }
    catch(err: any){
        return new NextResponse('Internal Server',{status: 500});
    }
}