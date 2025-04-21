import NextAuth from "next-auth";
import { authOptions } from "./authOptions";

// Extend the User type to include custom properties
declare module "next-auth" {
  interface User {
    id: string;
    role: string;
    token: string;
    [key: string]: any; // Allow additional dynamic properties
  }

  interface Session {
    user: {
      id: string;
      role: string;
      token: string;
      [key: string]: any;
    };
  }
}



const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };