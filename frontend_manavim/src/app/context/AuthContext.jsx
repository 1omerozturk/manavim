"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import AuthService from "../services/authService";

// Helper to safely check if we're in a browser environment
const isBrowser = () => typeof window !== 'undefined';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync next-auth session with AuthService
  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
      return;
    }

    if (session && session.user) {
      // Save token to localStorage when user signs in with next-auth
      if (isBrowser()) {
        localStorage.setItem(AuthService.TOKEN_KEY, session.user.token);
        localStorage.setItem(
          AuthService.USER_KEY,
          JSON.stringify({
            id: session.user.id,
            name: session.user.name,
            email: session.user.email,
            role: session.user.role,
            ...session.user
          })
        );
      }
      setUser(session.user);
    } else {
      // Check if user is logged in via authService (for backward compatibility)
      const serviceUser = AuthService.getUser();
      if (serviceUser && AuthService.getToken()) {
        setUser(serviceUser);
      } else {
        setUser(null);
      }
    }
    
    setLoading(false);
  }, [session, status]);

  // Login function that uses both next-auth and authService
  const login = async (credentials, role) => {
    try {
      console.log(`AuthContext: Attempting to login as ${role} with next-auth...`);
      
      // First try to sign in with next-auth
      const result = await signIn(`${role}-credentials`, {
        redirect: false,
        email: credentials.email,
        password: credentials.password,
        callbackUrl: '/'
      });
      
      console.log("AuthContext: Next-auth signIn result:", result);
      
      if (result?.error) {
        console.log(`AuthContext: Next-auth login failed with error: ${result.error}`);
        console.log("AuthContext: Falling back to direct API login...");
        
        // If next-auth fails, try the legacy authService
        const serviceResult = await AuthService.login(credentials, role);
        console.log("AuthContext: Direct API login result:", serviceResult);
        
        if (serviceResult.success) {
          // Manually set user since next-auth failed
          setUser(serviceResult.user);
          
          // Also store in localStorage for next-auth to pick up on next page load
          if (isBrowser() && serviceResult.token) {
            localStorage.setItem(AuthService.TOKEN_KEY, serviceResult.token);
            localStorage.setItem(
              AuthService.USER_KEY,
              JSON.stringify(serviceResult.user)
            );
          }
          
          return { success: true, user: serviceResult.user };
        }
        
        return { 
          success: false, 
          error: serviceResult.message || result.error || "Login failed" 
        };
      }
      
      // Next-auth login succeeded
      console.log("AuthContext: Next-auth login successful");
      return { success: true };
    } catch (error) {
      console.error("AuthContext: Login error:", error);
      return { success: false, error: error.message || "Login failed" };
    }
  };

  // Register function using authService
  const register = async (userData, role) => {
    try {
      const response = await AuthService.register(userData, role);
      
      if (response && (response.status === 201 || response.data?.success)) {
        return { success: true, data: response.data || response };
      }
      
      return { 
        success: false, 
        error: response?.data?.message || "Registration failed" 
      };
    } catch (error) {
      console.error("Register error:", error);
      return { 
        success: false, 
        error: error.response?.data?.message || error.message || "Registration failed" 
      };
    }
  };

  // Admin register function
  const adminRegister = async (userData) => {
    try {
      const result = await AuthService.adminRegister(userData);
      if (result && result.success) {
        return { success: true, data: result };
      }
      return { 
        success: false, 
        error: result?.message || "Registration failed" 
      };
    } catch (error) {
      console.error("Admin register error:", error);
      return { 
        success: false, 
        error: error.response?.data?.message || error.message || "Registration failed" 
      };
    }
  };

  // Admin login function
  const adminLogin = async (credentials) => {
    try {
      console.log("AuthContext: Attempting admin login with next-auth...");
      
      // First try to sign in with next-auth
      const result = await signIn("admin-credentials", {
        redirect: false,
        email: credentials.email,
        password: credentials.password,
        callbackUrl: '/'
      });
      
      console.log("AuthContext: Admin next-auth signIn result:", result);
      
      if (result?.error) {
        console.log(`AuthContext: Next-auth admin login failed with error: ${result.error}`);
        console.log("AuthContext: Falling back to direct API admin login...");
        
        // If next-auth fails, try the legacy authService
        const serviceResult = await AuthService.adminLogin(credentials);
        console.log("AuthContext: Direct API admin login result:", serviceResult);
        
        if (serviceResult.success) {
          setUser(serviceResult.user);
          
          // Also store in localStorage for next-auth to pick up on next page load
          if (isBrowser() && serviceResult.token) {
            localStorage.setItem(AuthService.TOKEN_KEY, serviceResult.token);
            localStorage.setItem(
              AuthService.USER_KEY,
              JSON.stringify(serviceResult.user)
            );
          }
          
          return { success: true, user: serviceResult.user };
        }
        
        return { 
          success: false, 
          error: serviceResult.message || result.error || "Login failed" 
        };
      }
      
      // Next-auth login succeeded
      console.log("AuthContext: Next-auth admin login successful");
      return { success: true };
    } catch (error) {
      console.error("AuthContext: Admin login error:", error);
      return { 
        success: false, 
        error: error.response?.data?.message || error.message || "Login failed" 
      };
    }
  };

  // Logout function that handles both next-auth and authService
  const logout = async () => {
    try {
      // Clear user state first
      setUser(null);
      
      // Call AuthService logout to clear localStorage
      await AuthService.logout();
      
      // Then sign out from next-auth
      await signOut({ redirect: false });
      
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      return { success: false, error: error.message || "Logout failed" };
    }
  };

  const isAuthenticated = () => {
    return !!user || AuthService.isAuthenticated();
  };

  const getUserRole = () => {
    return user?.role || AuthService.getUserRole();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        adminLogin,
        adminRegister,
        logout,
        isAuthenticated,
        getUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext; 