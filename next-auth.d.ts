// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    username?: string;
    provider?: string;
    role?: string;
  }
  interface Session {
    user: {
      id?: string;
      email?: string;
      username?: string;
      provider?: string;
      role?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string;
    username?: string;
    provider?: string;
    role?: string;
  }
}
