import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { jwtDecode } from "jwt-decode";
export const authOptions : NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith", value: "administrator" },
        password: { label: "Password", type: "password", value: "admin" },
        ip: {label: "IP", type: "text"}
      },
      // @ts-ignore
      async authorize(credentials, req) {
        // Check if credentials are undefined
        if (!credentials) {
          console.error("Credentials are missing");
          return null;
        }
        // Include hidden values here
        const data = {
          email: credentials.email,
          password: credentials.password,
          ip: credentials.ip
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 
            "Content-Type": "application/json",
          }
        }); 
        const resData = await res.json();
        if (res.ok && resData.token) {
          return { token: resData.token };
        } else {
          throw new Error(resData.message || "Authentication failed");
        }
        
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({token, user}){
      if (token?.token) {
        const decoded = jwtDecode(token?.token as string);
        // @ts-ignore
        token.username = decoded?.username || null;
        token.userId = token?.jti || null;
      }
      return {...token, ...user}
    },
    async session ({ session, token, user }) {
      session.user = {
        ...session.user,
        // @ts-ignore
        email: token.username,
        userId: token.userId,
      };
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
  
};
