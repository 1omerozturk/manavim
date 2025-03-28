import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authAPI, admin } from "../../../api/api";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "customer-credentials",
      name: "Customer",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("NextAuth: Attempting customer login with:", credentials.email);
          
          const response = await authAPI.login(
            credentials.email,
            credentials.password,
            "customer"
          );
          
          console.log("NextAuth: Customer API response:", JSON.stringify(response.data, null, 2));
          
          if (response.data?.token) {
            const userData = {
              id: response.data.user.id || response.data.user._id,
              email: response.data.user.email || credentials.email,
              name: response.data.user.fullName || response.data.user.username || credentials.email,
              role: "customer",
              token: response.data.token,
              ...response.data.user
            };
            
            console.log("NextAuth: Customer login successful, returning user data");
            return userData;
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
        try {
          console.log("NextAuth: Attempting producer login with:", credentials.email);
          
          const response = await authAPI.login(
            credentials.email,
            credentials.password,
            "producer"
          );
          
          console.log("NextAuth: Producer API response:", JSON.stringify(response.data, null, 2));
          
          if (response.data?.token) {
            const userData = {
              id: response.data.user.id || response.data.user._id,
              email: response.data.user.email || credentials.email,
              name: response.data.user.fullName || response.data.user.username || credentials.email,
              role: "producer",
              token: response.data.token,
              ...response.data.user
            };
            
            console.log("NextAuth: Producer login successful, returning user data");
            return userData;
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
        try {
          console.log("NextAuth: Attempting admin login with:", credentials.email);
          
          const response = await admin.login({
            email: credentials.email,
            password: credentials.password,
          });
          
          console.log("NextAuth: Admin API response:", JSON.stringify(response.data, null, 2));
          
          if (response.data?.token) {
            const userData = {
              id: response.data.user.id || response.data.user._id,
              email: response.data.user.email || credentials.email,
              name: response.data.user.fullName || response.data.user.username || credentials.email,
              role: "admin",
              token: response.data.token,
              ...response.data.user
            };
            
            console.log("NextAuth: Admin login successful, returning user data");
            return userData;
          }
          
          console.error("NextAuth: Admin login failed with response:", response.data);
          return null;
        } catch (error) {
          console.error("NextAuth: Admin auth error:", error.message, error.stack);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (user) {
        console.log("NextAuth JWT callback: Setting user data in token");
        token.id = user.id;
        token.role = user.role;
        token.token = user.token;
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        console.log("NextAuth Session callback: Syncing token data to session");
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.token = token.token;
        
        // Copy any additional user properties
        if (token.user) {
          session.user = { ...session.user, ...token.user };
        }
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 