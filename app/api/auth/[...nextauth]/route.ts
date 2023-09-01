import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from '@/lib/prismadb';
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider, { GithubProfile } from "next-auth/providers/github";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import bcrypt from 'bcrypt';

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientSecret: process.env.CLIENT_SECRET_GITHUB as string,
            clientId: process.env.CLIENT_ID_GITHUB as string,
            profile(profile: GithubProfile) {
                return {
                    role: profile.role ?? "user",
                    id: profile.id.toString(),
                    name: profile.login,
                    image: profile.avatar_url,
                    email: profile.email
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.CLIENT_ID_GOOGLE as string,
            clientSecret: process.env.CLIENT_SECRET_GOOGLE as string,
            profile(profile: GoogleProfile) {
                return {
                    role: profile.role ?? "user",
                    id: profile.sub,
                    name: profile.name,
                    image: profile.picture,
                    email: profile.email
                }
            }
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {label: 'email', type: 'text'},
                password: {label: 'password', type: 'password'}
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    throw new Error("Invalid Credentials");
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if(!user || !user.hashedPassword){
                    throw new Error("Invalid Credentials");
                }

                const isCorrectPass = bcrypt.compareSync(credentials.password, user.hashedPassword);

                if(!isCorrectPass){
                    throw new Error("Invalid credentials");
                }

                return user;
            }
        })
    ],
    callbacks: {
        jwt({token,user}){
            if(user) token.role = user.role
            return token;
        },
        session({session, token}){
            if(session?.user) session.user.role = token.role;
            return session;
        }
    },
    secret: process.env.NEXT_AUTH_SECRET as string,
    pages: {
        signIn: '/auth/login'
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }