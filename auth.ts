import { loginUser } from '@/features/auth/apis/auth-api';
import { loginSchema } from '@/shared/schemas/auth-schema';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {},
                password: {}
            },
            authorize: async (credentials, req) => {
                const result = loginSchema.safeParse({ username: credentials?.username, password: credentials?.password })
                if (!result.success) throw new Error("Invalid Username or Password.");
                const data = await loginUser(result.data)
                if (!data.status) throw new Error(data.message)
                return {
                    id: data.payload.user.id,
                    user: data.payload.user,
                    token: data.payload.token
                }
            }
        })
    ],
    callbacks: {
        jwt: ({ token, user, trigger, session }) => {
            if (user) {
                token.token = user.token;
                token.user = user.user;
            }
            if (trigger === 'update' && session) {
                token.user = session.user;
                token.token = session.token;
            }
            return token;
        },
        session: ({ session, token }) => {
            session.user = token.user;
            return session;
        }
    },
    pages: {
        signIn: '/login',
    }
};