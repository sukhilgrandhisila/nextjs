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
    // { label: "My List", path: "/my-list" },
  ];

  const renderLinks = (isMobile = false) =>
    navLinks.map((link) => (
      <span
        key={link.path}
        onClick={() => {
          router.push(link.path);
          if (isMobile) setIsOpen(false);
        }}
        className={`cursor-pointer ${
          pathname === link.path
            ? "text-red-500 font-semibold"
            : "text-white hover:text-red-500"
        }`}
      >
        {link.label}
      </span>
    ));

  return (
    <nav className="fixed w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <h1
            onClick={() => router.push("/home")}
            className="text-red-500 text-2xl font-bold cursor-pointer"
          >
            NETFLIX
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 text-sm text-white">
            {renderLinks()}
            {isLoggedIn && (
              <button onClick={handleLogout} className="text-white">
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none text-2xl"
            >
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-black bg-opacity-80 text-white px-6 py-4 space-y-4">
          <div className="flex flex-col gap-4">{renderLinks(true)}</div>
          {isLoggedIn && (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="w-full text-left text-white mt-2"
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
