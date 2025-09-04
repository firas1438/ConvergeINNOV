import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";
import type { NextAuthOptions } from "next-auth";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// extend NextAuth types to include name, id, email, and role in session and user
declare module "next-auth" {
  interface Session {
    user: { id: string; name?: string; email: string; role: string;};
  }

  interface User { 
    id: string;  name?: string; email: string; role: string; 
  }
}

declare module "next-auth/jwt" {
  interface JWT { 
    id: string; name?: string; email: string; role: string;
  }
}

export const authOptions: NextAuthOptions = {

  providers: [
    credentials({
      name: "Credentials",
      id: "credentials",
      credentials: { email: { label: "Email", type: "text" }, password: { label: "Password", type: "password" }, },

      async authorize(credentials) {
        await connectDB();
        // check if user exists
        const user = await User.findOne({ email: credentials?.email }).select("+password");
        if (!user) throw new Error("User with this email does not exist.");
        // check if password matches
        const passwordMatch = await bcrypt.compare(credentials!.password,user.password);
        if (!passwordMatch) throw new Error("Wrong password. Please try again.");
        // return user object with id, name, email, and role
        return { id: user._id.toString(), name: user.name, email: user.email, role: user.role};
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },

  callbacks: {
    // add name, id, email, and role to JWT
    async jwt({ token, user }) {
      if (user) { token.id = user.id; token.name = user.name; token.email = user.email; token.role = user.role; }
      return token;
    },
    // add name, id, email, and role to session
    async session({ session, token }) {
      if (token) { session.user.id = token.id; session.user.name = token.name;  session.user.email = token.email; session.user.role = token.role;}
      return session;
    },
  },
};