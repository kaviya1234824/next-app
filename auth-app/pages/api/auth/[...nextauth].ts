import NextAuth, { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import type { OAuthConfig, OAuthUserConfig } from "next-auth/providers/oauth";
import type { Profile as NextAuthProfile } from "next-auth";


declare module "next-auth" {
  interface Session {
    accessToken?: string;
    idToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    idToken?: string;
  }
}

interface AuthActionProfile extends NextAuthProfile {
  sub: string;
  name: string;
  email: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "authaction",
      name: "AuthAction",
      type: "oauth",
      wellKnown: `https://${process.env.AUTHACTION_TENANT_DOMAIN!}/.well-known/openid-configuration`,
      clientId: process.env.AUTHACTION_CLIENT_ID!,
      clientSecret: process.env.AUTHACTION_CLIENT_SECRET!,
      authorization: { params: { scope: "openid profile email" } },
      token: { params: { grant_type: "authorization_code" } },
      idToken: true,
      checks: ["pkce", "state"],
      profile(profile: AuthActionProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
        };
      },
    } as OAuthConfig<AuthActionProfile>,
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.idToken = token.idToken as string;
      return session;
    },
  },
  debug: true,
};

export default NextAuth(authOptions);
