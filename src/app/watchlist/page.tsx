"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import MovieCard from "@/components/MovieCard";

export default function WatchlistPage() {
  const router = useRouter();
  const { user, isAuthenticated, movies } = useAuth();

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const watchlistMovies = movies.filter((m) => 
    user?.watchlist.includes(m.id)
  );

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen py-8 pb-24 md:pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
            My Watchlist
          </h1>
          <p className="text-[var(--text-muted)]">
            {watchlistMovies.length} movie{watchlistMovies.length !== 1 ? "s" : ""} saved
          </p>
        </div>

        {/* Movie Grid */}
        {watchlistMovies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {watchlistMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--card-bg)] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-[var(--foreground)] mb-2">
              Your watchlist is empty
            </h3>
            <p className="text-[var(--text-muted)] mb-4">
              Browse movies and add them to your watchlist
            </p>
            <a href="/browse" className="btn-primary inline-block">
              Browse Movies
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
