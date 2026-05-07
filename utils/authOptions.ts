import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { jwtDecode } from "jwt-decode";

const DEMO_EMAIL = "demo@demo.com";
const DEMO_PASSWORD = "Demo1234!";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        ip: { label: "IP", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        if (
          credentials.email === DEMO_EMAIL &&
          credentials.password === DEMO_PASSWORD
        ) {
          return { id: "demo", username: DEMO_EMAIL, userId: "demo", isDemo: true } as any;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
              ip: credentials.ip,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const resData = await res.json();

        if (res.ok && resData.token) {
          return { token: resData.token } as any;
        }

        throw new Error(resData.message || "Authentication failed");
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user && (user as any).isDemo) {
        token.username = DEMO_EMAIL;
        token.userId = "demo";
        token.isDemo = true;
        return { ...token, ...user };
      }
      if (token?.token) {
        const decoded = jwtDecode<{ username?: string; id?: string }>(
          token.token as string
        );
        token.username = decoded?.username ?? undefined;
        token.userId = decoded?.id ?? undefined;
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        jwt: token.isDemo ? "demo" : (token.token as string),
        email: (token.username as string) ?? "",
        userId: token.userId,
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
