import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      email: string;
      name?: string | null;
    };
  }

  interface User {
    id: string;
    email: string;
    accessToken?: string;
  }

  interface JWT {
    id?: string;
    email?: string;
    accessToken?: string;
  }

}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}
