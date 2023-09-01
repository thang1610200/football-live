import { withAuth } from 'next-auth/middleware';

export default withAuth({
    secret: process.env.NEXT_AUTH_SECRET as string,
    pages: {
        signIn: '/auth/login'
    },
    callbacks: {
        authorized: ({ token }) => {
            return !!token;
        }
    }
});

export const config = {
    matcher: [
        "/live/:path*"
    ]
}