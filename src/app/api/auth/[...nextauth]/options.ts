/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextAuthOptions } from "next-auth";
import { DefaultSession } from "next-auth";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";

import connect from "@/app/dbConfig/dbConfig";
import User from "@/Models/user";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      username?: string;
      provider?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    username?: string;
    provider?: string;
    picture?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),

    CredentialsProvider({
      id: "credentials",
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },

        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and Password are required");
        }

        await connect();

        const user: any = await User.findOne({
          email: credentials.email,
        });

        if (!user) {
          throw new Error("User not found");
        }

        const matched = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!matched) {
          throw new Error("Invalid Password");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.username,
          image: user.avatar,
          username: user.username,
          provider: user.providers,
        };
      },
    }),
  ],

  pages: {
    signIn: "/signin",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, account }) {
      await connect();

      if (!user.email) return false;

      let existingUser = await User.findOne({
        email: user.email,
      });

      if (!existingUser) {
        existingUser = await User.create({
          username:
            user.name?.replace(/\s+/g, "").toLowerCase() ||
            user.email.split("@")[0],

          email: user.email,

          avatar:
            user.image ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.name || "User"
            )}`,

          providers: account?.provider,
        });
      }

      return true;
    },

    async jwt({ token, user }) {
      await connect();

      const email = user?.email || token.email;

      if (!email) return token;

      const existingUser: any = await User.findOne({
        email,
      });

      if (existingUser) {
        token.id = existingUser._id.toString();
        token.username = existingUser.username;
        token.provider = existingUser.providers;
        token.picture = existingUser.avatar;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.provider = token.provider as string;
        session.user.image = token.picture as string;
      }

      return session;
    },
  },
};