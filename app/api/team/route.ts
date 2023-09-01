import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';
export async function POST (request: Request){
    try{
        const body = await request.json();
        const { time, stadium, homeTeam, awayTeam, round } = body;
        const league = await prisma.league.findFirst({
            where: {
                name: "Premier League"
            }
        })

        const homeTeamId = await prisma.team.findFirst({
            where: {
                name: homeTeam
            }
        })

        const awayTeamId = await prisma.team.findFirst({
            where: {
                name: awayTeam
            }
        })

        const rounds = await prisma.round.findFirst({
            where: {
                round
            }
        })

        const team = await prisma.match.create({
            data: {
                time,
                stadium,
                round: {
                    connect: {
                        id: rounds?.id
                    }
                },
                homeTeam: {
                    connect: {
                        id: homeTeamId?.id
                    }
                },
                awayTeam: {
                    connect: {
                        id: awayTeamId?.id
                    }
                },
                league: {
                    connect: {
                        id: league?.id
                    }
                }
            }
        })

        return NextResponse.json(team);
    }
    catch(err: any){
        console.log(err);
        return new NextResponse("Internal server",{status: 500});
    }
}