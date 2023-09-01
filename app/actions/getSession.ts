import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; 

export default async function getSession (){  // getSession in Server
    return await getServerSession(authOptions);
}
