import prisma from '@/lib/prismadb';

const getMessage = async (id: string) => {
    try {
        if(!id){
            return [];
        }

        const existingMatch = await prisma.match.findUnique({
            where: {
                id: id
            }
        })

        if(!existingMatch){
            return [];
        }

        const message = await prisma.message.findMany({
            where: {
                matchId: id
            },
            include: {
                sender: true
            },
            orderBy: {
                createAt: 'asc'
            }
        })

        return message;
    }
    catch(err){
        return [];
    }
}

export default getMessage;