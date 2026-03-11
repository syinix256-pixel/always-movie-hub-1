"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const success = login(username, password);
    
    if (success) {
      router.push("/");
    } else {
      setError("Invalid username or password");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2">
            <div className="w-12 h-12 bg-[var(--primary)] rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-[var(--foreground)]">
              Always Movie Hub
            </span>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-[var(--card-bg)] rounded-2xl p-6 md:p-8 border border-[var(--border)]">
          <h1 className="text-2xl font-bold text-[var(--foreground)] text-center mb-6">
            Welcome Back
          </h1>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-[var(--text-muted)]">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-[var(--text-muted)]">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 text-lg disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-[var(--background)] rounded-lg">
            <h3 className="text-sm font-medium text-[var(--foreground)] mb-2">
              Demo Credentials:
            </h3>
            <div className="space-y-2 text-xs text-[var(--text-muted)]">
              <div className="flex justify-between">
                <span>Admin:</span>
                <span className="text-[var(--foreground)]">basemera / Basemeraadmin</span>
              </div>
              <div className="flex justify-between">
                <span>User:</span>
                <span className="text-[var(--foreground)]">gilbert / Gilbertadmin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link href="/" className="text-[var(--text-muted)] hover:text-[var(--foreground)]">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
