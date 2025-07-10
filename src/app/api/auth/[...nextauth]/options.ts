import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connect from "@/app/dbConfig/dbConfig";
import User from "../../../../Models/user";
import type { NextAuthOptions } from "next-auth";

// Extend the Session type to include custom fields
// This allows adding custom properties (e.g., _id, username) to the session object
declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      username?: string;
      id?: string;
    };
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
        email: { label: "Email", type: "text" }, 
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Authorize function called with credentials:", credentials);

        if (!credentials?.email || !credentials?.password) {
          console.log("Validation failed: Missing email or password");
          throw new Error("Email and password are required");
        }

        await connect();
        try {
          // 'email' is used to search for the user by username or email
          console.log("Searching for user with email or username:", credentials.email);
          const user = await User.findOne(
            { email: credentials.email },
          );

          if (!user) {
            console.log("No user found with provided credentials");
            throw new Error("No user found with this email");
          }

          // Compares the provided password with the hashed password in the database
          console.log("Comparing password for user:", user.email);
          const isPassCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isPassCorrect) {
            console.log("Password correct, returning user:", user.email);
            return {
              id: user._id.toString(),
              email: user.email,
              username: user.username,
            };
          } else {
            console.log("Password incorrect for user:", user.email);
            throw new Error("Incorrect password");
          }
        } catch (error: any) {
          console.error("Authorization error:", error.message);
          throw new Error(error.message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  
  session: {
    strategy: "jwt", // Uses JSON Web Tokens for session management
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({user}:{user:any}){
      await connect()
      if(user){
        const existinguser = await User.findOne({
          email:user.email
        })

        if(!existinguser){
           await User.create({
            email:user.email,
    
          })
          
        }
        return true
      }
      return false
    },
    async jwt({ token, user }) {
      // 'jwt' callback modifies the token with user data
      // This is called when a user logs in or the token is refreshed
      await connect()
      if (user) {
        const existing:any = await User.findOne({
          email:user.email
        })
        token.id = existing._id;
        token.username = (user as any).username;
        console.log(existing.id)
      }
      return token;
    },
    async session({ session, token }) {
      // 'session' callback updates the session object with token data
      // This ensures the client-side session reflects the logged-in user
      if (token && session.user) {
        session.user.id = token.id as string | undefined;
        session.user.username = typeof token.username === "string" ? token.username : undefined;
        console.log("session:", JSON.stringify(session, null, 2));

      }
      return session;
    },
  },
};