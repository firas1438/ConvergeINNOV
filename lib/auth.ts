import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";
import type { NextAuthOptions } from "next-auth";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions  = {
  providers: [
    credentials({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
            // connect to database
            await connectDB();

            // verify if user with corresponding email exists
            const user = await User.findOne({ email: credentials?.email,}).select("+password");
            if (!user) throw new Error("User with this email does not exist.");

            // match the hashed password with the one in the database
            const passwordMatch = await bcrypt.compare(credentials!.password,user.password);
            if (!passwordMatch) throw new Error("Wrong password. Please try again.");

            return user;
        },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },

};

