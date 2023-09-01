import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
    id: string
}

export async function GET(
    request: Request,
    {params}: {params: IParams}
){
    try {
        const currentUser = await getCurrentUser();
        const { id } = params;

        if(!currentUser?.id || !currentUser?.email){
            //throw new Error('Not signed in');
            return new NextResponse('Not signed in',{status: 403});
        }

        if(!id){
            //throw new Error('Missing Id');
            return new NextResponse('Missing Id',{status: 404});
        }

        const match = await prisma.match.findUnique({
            where:{
                id
            },
            include: {
                homeTeam: true,
                awayTeam: true,
                league: true
            }
        })

        if(!match){
            //throw new Error('Missing Id');
            return new NextResponse('Missing Id',{status: 404});
        }

        return NextResponse.json(match);
        
    }
    catch(err: any){
        return new NextResponse('Internal Server',{status: 500});
    }
}

// export async function PATCH(request: Request, {params}: {params: IParams}){
//     try {
//         const currentUser = await getCurrentUser();

//         if(!params.id){
//             //throw new Error('Missing Id');
//             return new NextResponse('Missing Id',{status: 404});
//         }

//         if(currentUser?.role !== 'admin'){
//             return new NextResponse("Unauthorization",{status: 403});
//         }

//         const match = await prisma.match.findUnique({
//             where:{
//                 id: params.id
//             }
//         })

//         if(!match){
//             //throw new Error('Missing Id');
//             return new NextResponse('Missing Id',{status: 404});
//         }

//         const user = await prisma.user.findMany();

//         const matchlive = await prisma.match.update({
//             where: {
//                 id: params.id
//             },
//             data: {
//                 start: !match?.start
//             },
//             include: {
//                 homeTeam: true,
//                 awayTeam: true,
//                 league: true
//             }
//         })

//         user.forEach((data) => {
//             if(data.email){
//                 pusherServer.trigger(data.email,'matchlive:update',matchlive);
//             }
//         })

//         return NextResponse.json(matchlive);
//     }
//     catch(err: any){
//         return new NextResponse("InternalServer", {status: 500});
//     }
// }