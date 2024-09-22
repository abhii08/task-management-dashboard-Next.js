import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from '@/lib/db';
import UserModel from '@/models/User';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await connectToDatabase();
        
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await UserModel.findOne({ email: credentials?.email });
        if (user && credentials?.password) {
          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (isValid) {
            return { id: user._id.toString(), name: user.name, email: user.email };
          }
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      } 
      return session;
    }
  },
  pages: {
    signIn: '/auth/login',
  },
};
