"use client";

import React from "react";
import Link from "next/link";
import { Movie, useAuth } from "@/lib/auth-context";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist, hasPurchased, user, isAuthenticated } = useAuth();
  
  const inWatchlist = isInWatchlist(movie.id);
  const purchased = hasPurchased(movie.id);
  const isSubscribed = user?.subscription?.active;

  const canWatch = movie.isFree || purchased || isSubscribed;

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie.id);
    }
  };

  return (
    <Link href={`/movie/${movie.id}`} className="block">
      <div className="card group cursor-pointer">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={movie.thumbnail}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
              <span className="text-xs bg-black/60 px-2 py-1 rounded text-white">
                {movie.duration}
              </span>
              {!movie.isFree && (
                <span className="text-xs bg-[var(--warning)] px-2 py-1 rounded text-black font-semibold">
                  {purchased || isSubscribed ? "UNLOCKED" : `UGX ${movie.price}`}
                </span>
              )}
            </div>
          </div>
          
          {/* Play icon on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-14 h-14 rounded-full bg-[var(--primary)] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-3">
          <h3 className="font-semibold text-[var(--foreground)] truncate">{movie.title}</h3>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-[var(--text-muted)]">
              {movie.year} • {movie.genre}
            </span>
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="var(--warning)" stroke="var(--warning)" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span className="text-xs text-[var(--text-muted)]">{movie.rating}</span>
            </div>
          </div>
          
          {/* Watchlist button */}
          {isAuthenticated && (
            <button
              onClick={handleWatchlistToggle}
              className={`mt-2 w-full py-1.5 rounded text-sm font-medium transition-colors ${
                inWatchlist
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--card-hover)] text-[var(--text-muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {inWatchlist ? "✓ In Watchlist" : "+ Add to Watchlist"}
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
