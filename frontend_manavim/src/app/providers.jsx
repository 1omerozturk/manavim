"use client";

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

export function Providers({ children }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AuthProvider>
    </SessionProvider>
  );
} 