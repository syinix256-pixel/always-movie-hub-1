"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import MovieCard from "@/components/MovieCard";

export default function HomePage() {
  const { movies, user, isAuthenticated } = useAuth();

  const featuredMovies = movies.slice(0, 4);
  const freeMovies = movies.filter((m) => m.isFree);
  const premiumMovies = movies.filter((m) => !m.isFree);

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10" />
        <img
          src={featuredMovies[0]?.thumbnail || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=1080&fit=crop"}
          alt="Hero"
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Always Movie Hub
              </h1>
              <p className="text-lg text-gray-300 mb-6">
                Stream copyright-free movies anytime, anywhere. Subscribe or pay per view.
              </p>
              <div className="flex gap-4">
                <Link href="/browse" className="btn-primary flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  Start Watching
                </Link>
                {!isAuthenticated && (
                  <Link href="/login" className="btn-secondary">
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Banner */}
      {!user?.subscription?.active && (
        <section className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] py-8">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              Get Unlimited Access
            </h2>
            <p className="text-white/80 mb-4">
              Weekly: UGX 10,000 • Monthly: UGX 30,000
            </p>
            <Link
              href="/subscription"
              className="inline-block bg-white text-[var(--primary)] px-6 py-2 rounded-full font-semibold hover:bg-white/90 transition-colors"
            >
              Subscribe Now
            </Link>
          </div>
        </section>
      )}

      {/* Free Movies Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[var(--foreground)]">
              Free Movies
            </h2>
            <Link href="/browse?filter=free" className="text-[var(--primary)] hover:underline">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {freeMovies.slice(0, 4).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>

      {/* Premium Movies Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[var(--foreground)]">
              Premium Movies
              <span className="text-sm font-normal text-[var(--text-muted)] ml-2">
                (Pay UGX 500 per movie)
              </span>
            </h2>
            <Link href="/browse?filter=premium" className="text-[var(--primary)] hover:underline">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {premiumMovies.slice(0, 4).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>

      {/* All Movies Section */}
      <section className="py-8 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[var(--foreground)]">
              All Movies
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--card-bg)] py-8 border-t border-[var(--border)] pb-24 md:pb-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 bg-[var(--primary)] rounded flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="white">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
            <span className="font-bold text-[var(--foreground)]">Always Movie Hub</span>
          </div>
          <p className="text-sm text-[var(--text-muted)]">
            © 2024 Always Movie Hub. All rights reserved.
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-2">
            All movies are copyright-free content.
          </p>
        </div>
      </footer>
    </div>
  );
}
