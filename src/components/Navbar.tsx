"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const tokenExists = document.cookie.includes("jwt_token=");
    setIsLoggedIn(tokenExists);
  }, []);

  const handleLogout = () => {
    document.cookie =
      "jwt_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    router.push("/login");
  };

  const navLinks = [
    { label: "Home", path: "/home" },
    { label: "Trending", path: "/trending-movies" },
    { label: "Top Rated", path: "/top-rated" },
    { label: "Originals", path: "/originals" },
    { label: "Popular", path: "/popular" },
    { label: "My List", path: "/my-list" },
  ];

  const renderLinks = (isMobile = false) =>
    navLinks.map((link) => (
      <span
        key={link.path}
        onClick={() => {
          router.push(link.path);
          if (isMobile) setIsOpen(false);
        }}
        className={`cursor-pointer transition-colors ${
          pathname === link.path
            ? "text-red-500 font-semibold"
            : "text-white hover:text-red-500"
        }`}
      >
        {link.label}
      </span>
    ));

  return (
    <nav className="bg-black fixed w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navbar container */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <h1
            onClick={() => router.push("/home")}
            className="text-3xl font-extrabold text-red-600 cursor-pointer tracking-wide"
          >
            NETFLIX
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            {renderLinks()}
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-1 rounded hover:bg-red-700 transition text-white font-semibold"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none text-xl"
            >
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black px-4 pb-4 space-y-3 text-sm border-t border-gray-800">
          {renderLinks(true)}
          {isLoggedIn && (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="bg-red-600 w-full py-2 rounded hover:bg-red-700 transition text-white font-semibold"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
