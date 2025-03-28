"use client";

import React, { useState, useEffect } from "react";
import DarkModeToggler from "./DarkModeToggler";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiCloseLine, RiMenu3Line, RiShoppingCartLine, RiLogoutBoxLine, RiUserLine } from "react-icons/ri";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => setToggle(!toggle);
  
  const handleLogout = async () => {
    await logout();
    setToggle(false);
  };

  const navLinks = [
    { href: "/products", label: "Ürünler" },
    { href: "/categories", label: "Kategoriler" },
  ];
  
  // Add conditional links based on auth status
  if (isAuthenticated()) {
    navLinks.push({ href: "/orders", label: "Siparişlerim" });
    
    // Add admin-specific links
    if (user?.role === "admin") {
      navLinks.push({ href: "/admin", label: "Panel" });
    }
    
    // Add producer-specific links
    if (user?.role === "producer") {
      navLinks.push({ href: "/producer/products", label: "Ürünlerim" });
    }
  }

  const authLinks = isAuthenticated()
    ? [
        { 
          href: "/profile", 
          label: "Profilim", 
          icon: <RiUserLine className="h-5 w-5" /> 
        },
        { 
          href: "/cart", 
          label: "Sepetim", 
          icon: <RiShoppingCartLine className="h-5 w-5" /> 
        },
        { 
          href: "#", 
          label: "Çıkış Yap", 
          icon: <RiLogoutBoxLine className="h-5 w-5" />,
          onClick: handleLogout
        },
      ]
    : [
        { 
          href: "/auth", 
          label: "Giriş Yap", 
          icon: <RiUserLine className="h-5 w-5" /> 
        },
      ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-lg"
          : "bg-white dark:bg-slate-900"
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/ManavIM.ico" // Logo yolunu kendi projenize göre güncelleyin
            alt="Manav Logo"
            width={40}
            height={40}
            className=" rounded-full"
          />
              <div className="text-2xl font-bold text-slate-800 dark:text-slate-100 hover:scale-105 transition-transform duration-300">
                Manav
                <span className="text-emerald-600 dark:text-emerald-400">
                  IM
                </span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <SearchBar />
            </div>

          {/* Search and Auth Links */}
          <div className="flex items-center space-x-4">
          {/* Desktop Navigation */}
          <div className="hidden md:flex sm: items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300 ${
                  pathname === link.href
                    ? "text-emerald-600 dark:text-emerald-400"
                    : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
            <DarkModeToggler />
          </div>
            
            {/* Desktop Auth Links */}
            <div className="hidden md:flex items-center space-x-4">
              {authLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={link.onClick}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300
                    ${
                      pathname === link.href
                        ? "bg-emerald-600 dark:bg-emerald-500 text-white"
                        : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={handleClick}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-300"
                aria-label="Toggle Navigation"
              >
                {toggle ? (
                  <RiCloseLine className="h-6 w-6 text-slate-700 dark:text-slate-200" />
                ) : (
                  <RiMenu3Line className="h-6 w-6 text-slate-700 dark:text-slate-200" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {toggle && (
          <div className="md:hidden animate-fadeIn">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
              {/* Main Navigation Links */}
              <div className="space-y-1">
                <div className="flex items-center justify-center">
                <SearchBar/>
                </div>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                      pathname === link.href
                        ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20"
                        : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                    onClick={() => setToggle(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-slate-200 dark:border-slate-700 my-2"></div>

              {/* Auth Links */}
              <div className="space-y-1">
                {authLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                      pathname === link.href
                        ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20"
                        : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                    onClick={(e) => {
                      if (link.onClick) {
                        e.preventDefault();
                        link.onClick();
                      } else {
                        setToggle(false);
                      }
                    }}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>

              {/* Theme Toggler */}
              <div className="px-3 py-2">
                <DarkModeToggler />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
