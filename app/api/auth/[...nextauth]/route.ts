import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"; //npm i @next-auth/prisma-adapter@1.0.7
import prisma from "@/prisma/client";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // Next auth changes the session strategy from jwt to databse when using adapter
  // But database strategy doesnt work with OAuth providers like google.
  // So we need to reamian the strategy to jwt(JSON Web Token)
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
