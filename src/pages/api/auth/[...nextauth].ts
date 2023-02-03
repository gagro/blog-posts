import NextAuth, { type NextAuthOptions } from "next-auth";
import { compare } from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';

import { prisma } from "../../../server/db";
import { User } from "@prisma/client";
import { env } from "process";

export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, token }) {
      if(token) {
        session.id = token.id
        session.user = token.user as User;
      }
      return session;
    },
    async jwt({token, user}) {
      if (user) {
        token.id = user.id;
        token.user = user;
      }

      return Promise.resolve(token)
    },
  },
  pages: {
    signIn: "/login"
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 30
  },
  jwt: {
    maxAge: 60 *30
  },
  secret: env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {},
      async authorize(credentials: any, req) {
        const user = await prisma.user.findFirst({
          where: { username: credentials.username }
        })

        if (!user)
          throw new Error('Invalid credentials');
        
        const verifyPassword = await compare(
          credentials.password,
          user.password
        );

        if (!verifyPassword)
          throw new Error('Invalid credentials');

        return Promise.resolve({
          id: user.id,
          username: credentials.username
        });
    },
  }),
  ],
};

export default NextAuth(authOptions);
