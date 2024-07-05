import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      accessToken: string;
      refreshToken: string;
      name: string;
      email: string;
    }
  }

  interface User {
    data: {
      access_token: string;
      refresh_token: string;
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    user: {
        first_name: string;
        last_name: string;
        email: string;
    }
  }
}