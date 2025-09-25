// lib/auth.ts
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import User from "@/models/User";
import { connectToMongoDb } from "@/lib/db";
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToMongoDb();
        const user = await User.findOne({ email: credentials?.email });
        if (!user) return null;

        // Compare the provided password with the hashed password in the DB
        const isValid = await bcrypt.compare(credentials?.password || '', user.password);
        if (!isValid) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account }) {
      await connectToMongoDb();
      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        // console.log("here--")
        await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
          role: "user", // or set default role
          emailVerified: true, // since Google verified it
        });
      }

      return true; // Allow sign in
    },
    // async redirect({ url, baseUrl }) {
    //   return url.startsWith(baseUrl) ? url : `${baseUrl}/user`;
    // },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: String(token.id || ""),
        email: token.email!,
        name: session.user?.name || null,
      };
      return session;
    },
  },
};
