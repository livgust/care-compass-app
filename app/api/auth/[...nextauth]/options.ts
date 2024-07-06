import type { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import directus from "@/lib/directus";
import { readMe, withToken, login } from "@directus/sdk";
import { JWT } from "next-auth/jwt";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const user = await directus.request(login(credentials!.email, credentials!.password, {mode: 'json'})) as any as User;
        if (!user) {
          throw new Error("Email address or password is invalid");
        } else {
          return user;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({
      token,
      user,
      account,
    }) {
      if (account && user) {
        const userData = await directus.request(
          withToken(
            user.access_token as string,
            readMe({
              fields: ["id", "first_name", "last_name", "email"],
            })
          )
        );
        return {
          ...token,
          accessToken: user.access_token,
          refreshToken: user.refresh_token,
          user: userData,
        } as JWT;
      }
      return token as JWT;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        name: token.user.first_name + " " + token.user.last_name,
        email: token.user.email,
      };
      return session;
    },
  },
};

export default authOptions;