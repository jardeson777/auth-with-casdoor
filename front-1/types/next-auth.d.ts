/* eslint-disable no-unused-vars */
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      accessToken: string;
      name: string;
      role: string;
    };
  }

  interface User {
    id: string;
    accessToken: string;
    name: string;
    role: string;
  }
}
