import prisma from '@/lib/prismadb';

const getMatchbyRound =  async () => {
    try {
        const roundMatch = await prisma.round.findFirst({
            where: {
                isAction: true
            }
        })

        const match = await prisma.match.findMany({
            where:{
                roundId: roundMatch?.id
            },
            include: {
                homeTeam: true,
                awayTeam: true,
                league: true,
                round: true
            }
        })

        return match;
    }
    catch(err: any){
        return [];
    }
}

export default getMatchbyRound;