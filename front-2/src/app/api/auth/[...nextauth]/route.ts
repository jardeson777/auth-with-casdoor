import NextAuth, { NextAuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: "imobill",
      clientSecret: "VbZ3eQLWdHvHtEj2kuFwxgnUmqaQv5yg",
      issuer: "http://localhost:8080/realms/documentall",
    })
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken as string;

      return session;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };