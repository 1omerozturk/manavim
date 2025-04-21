import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"; // Correct import
import { admin, authAPI } from "../../api";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "customer-credentials",
      name: "Customer",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          console.log("NextAuth: Attempting customer login with:", credentials.email);

          const response = await authAPI.login(
            credentials.email,
            credentials.password,
            "customer"
          );

          if (response.data?.token) {
            return {
              id: response.data.user.id || response.data.user._id,
              email: response.data.user.email || credentials.email,
              name: response.data.user.fullName || response.data.user.username || credentials.email,
              role: "customer",
              token: response.data.token,
              ...response.data.user,
            };
          }

          console.error("NextAuth: Customer login failed with response:", response.data);
          return null;
        } catch (error) {
          console.error("NextAuth: Customer auth error:", error);
          return null;
        }
      },
    }),
    CredentialsProvider({
      id: "producer-credentials",
      name: "Producer",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          console.log("NextAuth: Attempting producer login with:", credentials.email);

          const response = await authAPI.login(
            credentials.email,
            credentials.password,
            "producer"
          );

          if (response.data?.token) {
            return {
              id: response.data.user.id || response.data.user._id,
              email: response.data.user.email || credentials.email,
              name: response.data.user.fullName || response.data.user.username || credentials.email,
              role: "producer",
              token: response.data.token,
              ...response.data.user,
            };
          }

          console.error("NextAuth: Producer login failed with response:", response.data);
          return null;
        } catch (error) {
          console.error("NextAuth: Producer auth error:", error);
          return null;
        }
      },
    }),
    CredentialsProvider({
      id: "admin-credentials",
      name: "Admin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          console.log("NextAuth: Attempting admin login with:", credentials.email);

          const response = await admin.login({
            email: credentials.email,
            password: credentials.password,
          });

          if (response.data?.token) {
            return {
              id: response.data.user.id || response.data.user._id,
              email: response.data.user.email || credentials.email,
              name: response.data.user.fullName || response.data.user.username || credentials.email,
              role: "admin",
              token: response.data.token,
              ...response.data.user,
            };
          }

          console.error("NextAuth: Admin login failed with response:", response.data);
          return null;
        } catch (error) {
          console.error("NextAuth: Admin auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.token = user.token;
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          role: token.role as string,
          token: token.token as string,
          ...(typeof token.user === "object" && token.user ? token.user : {}),
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === "development",
};
