import { IApiResponse } from '@/lib/types/api';
import { IloginResponse } from '@/lib/types/auth';
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
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: credentials?.username,
                        password: credentials?.password
                    })
                });
                const data: IApiResponse<IloginResponse> = await response.json();
                if (!data.status) {
                    throw new Error(data.message)
                }
                const loginData = data.payload!;
                return {
                    id: loginData.user.id,
                    token: loginData.token,
                    user: loginData.user,
                }
            }
        })
    ],
    callbacks: {
        jwt: ({ token, user , trigger , session}) => {
            if (user) {
                token.token = user.token;
                token.user = user.user;
            }
            if(trigger === 'update' && session){
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