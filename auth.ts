import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const { handlers, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await db.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });
        if (user) {
          const passwordValidation = await bcrypt.compare(
            credentials!.password as string,
            user.password as string
          );
          if (passwordValidation) {
            return {
              ...user,
              username: user.username ?? undefined,
              password: user.password ?? undefined,
            };
          }
        }
        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account?.provider === "google") {
        // console.log("Profile", profile);
        const googleuser = await db.user.findUnique({
          where: {
            email: profile?.email as string,
          },
          select: {
            id: true,
            role: true,
          },
        });
        token.provider = "google";
        token.sub = googleuser?.id.toString();
        token.email = profile?.email;
        token.username = profile?.name;
        token.role = googleuser?.role;
        return token;
      } else if (user) {
        token.id = user.id as string;
        token.role = user.role as string;
        token.username = user.username as string;
        token.email = user.email as string;
        token.provider = user.provider as string;
        return token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.provider === "google" && token.picture) {
        session.user = {
          id: token.sub as string,
          email: token.email as string,
          username: token.username as string,
          provider: token.provider,
          emailVerified: null,
          role: token.role as string,
        };
        return session;
      } else {
        session.user = {
          id: token.sub as string,
          username: token.username as string,
          email: token.email as string,
          provider: token.provider as string,
          emailVerified: null,
          role: token.role as string,
        };
        return session;
      }
    },
    async signIn({ user, profile }) {
      const existingUser = await db.user.findUnique({
        where: {
          email: user.email as string,
        },
      });
      if (existingUser) {
        return true;
      }
      try {
        await db.user.create({
          data: {
            username: profile?.name as string,
            email: profile?.email as string,
            provider: "google",
            role: "USER",
            password: "google-oauth",
          },
        });
        redirect("/");
      } catch (err) {
        console.error("Error Creating the user! Please try again");
      }
      return true;
    },
  },
});
