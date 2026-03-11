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
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent z-10" />
        <img
          src={featuredMovies[0]?.thumbnail || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=1080&fit=crop"}
          alt="Hero"
          className="w-full h-full object-cover transform scale-105"
        />
        
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-[var(--primary)]/90 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-white text-sm font-medium">Now Streaming</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight">
                Always <span className="text-[var(--primary)]">Movie</span> Hub
              </h1>
              <p className="text-xl text-gray-200 mb-8 max-w-lg">
                Stream thousands of movies, TV shows, and exclusive content. 
                Start your entertainment journey today.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/browse" className="group relative inline-flex items-center gap-3 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[var(--primary)]/30">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="group-hover:translate-x-1 transition-transform">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  Start Watching
                  <span className="absolute -inset-0.5 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] rounded-full blur opacity-30 group-hover:opacity-75 transition-opacity" />
                </Link>
                {!isAuthenticated && (
                  <Link href="/login" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 border border-white/20 hover:border-white/40">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                      <polyline points="10 17 15 12 10 7" />
                      <line x1="15" y1="12" x2="3" y2="12" />
                    </svg>
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-[var(--card-bg)] border-y border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-black text-[var(--primary)] mb-2">10K+</div>
              <div className="text-[var(--text-muted)]">Movies & Shows</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-[var(--primary)] mb-2">4K</div>
              <div className="text-[var(--text-muted)]">Ultra HD</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-[var(--primary)] mb-2">50+</div>
              <div className="text-[var(--text-muted)]">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-[var(--primary)] mb-2">24/7</div>
              <div className="text-[var(--text-muted)]">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Banner */}
      {!user?.subscription?.active && (
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] via-[var(--primary-dark)] to-[var(--primary)]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUvMC4xIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Unlock Unlimited Entertainment
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Get access to all movies, ad-free streaming, and exclusive content with our premium plans.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl font-bold text-white mb-1">Weekly</div>
                  <div className="text-4xl font-black text-white mb-2">UGX 10,000</div>
                  <div className="text-white/70 text-sm">Perfect for trying out</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/40 transform scale-105">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <div className="text-3xl font-bold text-white">Monthly</div>
                    <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-full">BEST VALUE</span>
                  </div>
                  <div className="text-4xl font-black text-white mb-2">UGX 30,000</div>
                  <div className="text-white/70 text-sm">Save 40% weekly</div>
                </div>
              </div>
              <Link
                href="/subscription"
                className="inline-flex items-center gap-2 bg-white text-[var(--primary)] px-8 py-3 rounded-full font-bold text-lg hover:bg-white/90 transition-all duration-300 hover:scale-105"
              >
                Subscribe Now
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Free Movies Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-[var(--primary)] rounded-full" />
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">
                Free to Watch
              </h2>
            </div>
            <Link href="/browse?filter=free" className="text-[var(--primary)] hover:underline font-medium flex items-center gap-1">
              View All
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {freeMovies.slice(0, 4).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>

      {/* Premium Movies Section */}
      <section className="py-12 bg-[var(--card-bg)]/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-[var(--primary)] to-[var(--primary-dark)] rounded-full" />
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">
                Premium Selection
              </h2>
              <span className="bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium px-3 py-1 rounded-full">
                UGX 500/movie
              </span>
            </div>
            <Link href="/browse?filter=premium" className="text-[var(--primary)] hover:underline font-medium flex items-center gap-1">
              View All
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {premiumMovies.slice(0, 4).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>

      {/* All Movies Section */}
      <section className="py-12 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-[var(--foreground)] rounded-full" />
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">
                All Movies
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-[var(--card-bg)] to-[var(--background)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
              Why Choose Always Movie Hub?
            </h2>
            <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto">
              Experience the best in streaming entertainment with features designed for movie lovers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[var(--card-bg)] p-8 rounded-2xl border border-[var(--border)] hover:border-[var(--primary)]/30 transition-colors">
              <div className="w-14 h-14 bg-[var(--primary)]/10 rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">4K Ultra HD</h3>
              <p className="text-[var(--text-muted)]">Crystal clear picture quality with support for 4K, HDR, and Dolby Atmos sound.</p>
            </div>
            
            <div className="bg-[var(--card-bg)] p-8 rounded-2xl border border-[var(--border)] hover:border-[var(--primary)]/30 transition-colors">
              <div className="w-14 h-14 bg-[var(--primary)]/10 rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">Watch Anywhere</h3>
              <p className="text-[var(--text-muted)]">Stream on your TV, laptop, tablet, or phone. Download movies for offline viewing.</p>
            </div>
            
            <div className="bg-[var(--card-bg)] p-8 rounded-2xl border border-[var(--border)] hover:border-[var(--primary)]/30 transition-colors">
              <div className="w-14 h-14 bg-[var(--primary)]/10 rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">Family Safe</h3>
              <p className="text-[var(--text-muted)]">Parental controls and family profiles to ensure safe viewing for everyone.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--card-bg)] py-12 border-t border-[var(--border)] pb-24 md:pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--primary)] rounded-xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              <span className="font-bold text-xl text-[var(--foreground)]">Always Movie Hub</span>
            </div>
            <div className="flex items-center gap-6 text-[var(--text-muted)]">
              <Link href="/browse" className="hover:text-[var(--primary)] transition-colors">Browse</Link>
              <Link href="/subscription" className="hover:text-[var(--primary)] transition-colors">Pricing</Link>
              <Link href="/login" className="hover:text-[var(--primary)] transition-colors">Sign In</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[var(--border)] text-center">
            <p className="text-sm text-[var(--text-muted)]">
              © 2024 Always Movie Hub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
