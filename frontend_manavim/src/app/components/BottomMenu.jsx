"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { PrimeIcons } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useAuth } from "../context/AuthContext";

const BottomMenu = () => {
  const { user, isAuthenticated } = useAuth();
  const pathname = usePathname();

  const menuItems = [
    {
      icon: PrimeIcons.HOME,
      label: "Anasayfa",
      path: "/",
    },
    {
      icon: PrimeIcons.TH_LARGE,
      label: "Kategoriler",
      path: "/categories",
    },
    !isAuthenticated && {
      icon: PrimeIcons.USER,
      label: "Giriş Yap",
      path: "/auth",
    },
    isAuthenticated &&
      user?.role === "admin" && {
        icon: PrimeIcons.USER,
        label: "Admin",
        path: "/admin",
      },
    isAuthenticated &&
      user?.role !== "admin" && {
        icon: PrimeIcons.SHOPPING_CART,
        label: "Sepetim",
        path: "/cart",
      },
  ].filter(Boolean); // Boş elemanları filtrelemek için

  return (
    <div className="relative">
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 sm:hidden">
        <div className="flex justify-evenly items-center h-16 ">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex flex-col items-center justify-center w-full h-full ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                <i className={`${item.icon} text-xl mb-1`}></i>
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomMenu;
