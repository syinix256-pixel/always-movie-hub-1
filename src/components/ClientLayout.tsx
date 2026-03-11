"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import BottomNavigationBar from "./BottomNavigationBar";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change - use callback pattern
  useEffect(() => {
    // Just track pathname changes, menu state handled by separate triggers
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const isAuthPage = pathname === "/login" || pathname === "/admin";
  const isMoviePage = pathname.startsWith("/movie/");

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Desktop Header - Hidden on mobile */}
      {!isAuthPage && (
        <header
          className={`fixed top-0 left-0 right-0 z-40 transition-all desktop-only ${
            isScrolled
              ? "bg-[var(--background)]/95 backdrop-blur-sm border-b border-[var(--border)]"
              : "bg-transparent"
          }`}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[var(--primary)] rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-[var(--foreground)]">
                  Movie Bus
                </span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="flex items-center gap-6">
                <Link href="/" className="nav-link text-[var(--text-muted)] hover:text-[var(--foreground)]">
                  Home
                </Link>
                <Link href="/browse" className="nav-link text-[var(--text-muted)] hover:text-[var(--foreground)]">
                  Browse
                </Link>
                <Link href="/watchlist" className="nav-link text-[var(--text-muted)] hover:text-[var(--foreground)]">
                  Watchlist
                </Link>
                <Link href="/downloads" className="nav-link text-[var(--text-muted)] hover:text-[var(--foreground)]">
                  Downloads
                </Link>
              </nav>

              {/* User Menu */}
              <div className="flex items-center gap-3">
                {isAuthenticated ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-[var(--card-bg)] rounded-full border border-[var(--border)]"
                    >
                      <div className="w-7 h-7 bg-[var(--primary)] rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {user?.username.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm text-[var(--foreground)]">{user?.username}</span>
                      {user?.role === "admin" && (
                        <span className="text-xs bg-[var(--primary)] px-1.5 py-0.5 rounded text-white">Admin</span>
                      )}
                    </button>
                    
                    {/* Dropdown */}
                    {isMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-[var(--card-bg)] rounded-lg border border-[var(--border)] shadow-lg py-1">
                        {user?.role === "admin" && (
                          <Link
                            href="/admin"
                            className="block px-4 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--card-hover)]"
                          >
                            Admin Dashboard
                          </Link>
                        )}
                        <Link
                          href="/settings"
                          className="block px-4 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--card-hover)]"
                        >
                          Settings
                        </Link>
                        <Link
                          href="/subscription"
                          className="block px-4 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--card-hover)]"
                        >
                          Subscription
                        </Link>
                        <button
                          onClick={logout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-[var(--card-hover)]"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href="/login" className="btn-primary text-sm">
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className={!isAuthPage ? "pt-16" : ""}>
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      {!isAuthPage && <BottomNavigationBar />}
    </div>
  );
}
