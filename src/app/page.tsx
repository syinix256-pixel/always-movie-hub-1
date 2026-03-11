"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import MovieCard from "@/components/MovieCard";

export default function HomePage() {
  const { movies, user, isAuthenticated } = useAuth();

  // Get movies by genre for better organization
  const actionMovies = movies.filter((m) => m.genre === "Action");
  const documentaryMovies = movies.filter((m) => m.genre === "Documentary");
  const adventureMovies = movies.filter((m) => m.genre === "Adventure");
  const dramaMovies = movies.filter((m) => m.genre === "Drama");
  
  // Get top rated movies
  const topRatedMovies = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 4);
  // Get newest movies
  const newestMovies = [...movies].sort((a, b) => b.year - a.year).slice(0, 4);

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section with Enhanced Design */}
      <section className="relative h-[85vh] overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black z-10" />
          <img
            src={movies[0]?.thumbnail || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=1080&fit=crop"}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Floating Particles Effect */}
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
          <div className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{ top: '20%', left: '10%', animationDelay: '0s' }} />
          <div className="absolute w-3 h-3 bg-[var(--primary)]/30 rounded-full animate-pulse" style={{ top: '40%', left: '80%', animationDelay: '1s' }} />
          <div className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{ top: '60%', left: '20%', animationDelay: '2s' }} />
          <div className="absolute w-1 h-1 bg-[var(--primary)]/40 rounded-full animate-pulse" style={{ top: '30%', left: '60%', animationDelay: '0.5s' }} />
        </div>
        
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              {/* Animated Badge */}
              <div className="inline-flex items-center gap-2 bg-[var(--primary)]/90 backdrop-blur-sm px-5 py-2 rounded-full mb-6 shadow-lg shadow-[var(--primary)]/20">
                <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
                <span className="text-white font-semibold">Now Streaming</span>
                <span className="text-white/60">•</span>
                <span className="text-white/80 text-sm">Premium Content</span>
              </div>
              
              {/* Main Title */}
              <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight tracking-tight">
                Always <span className="text-[var(--primary)] drop-shadow-lg">Movie</span> Hub
              </h1>
              
              {/* Subtitle */}
              <p className="text-2xl text-gray-200 mb-8 max-w-xl leading-relaxed">
                Experience unlimited entertainment with thousands of premium movies, 
                exclusive originals, and blockbuster hits.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-5">
                <Link 
                  href="/browse" 
                  className="group relative inline-flex items-center gap-3 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-10 py-4 rounded-full font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[var(--primary)]/40"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="group-hover:translate-x-1 transition-transform">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  Start Watching
                </Link>
                {!isAuthenticated && (
                  <Link 
                    href="/login" 
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-10 py-4 rounded-full font-bold text-xl transition-all duration-300 border border-white/20 hover:border-white/50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-10 h-16 border-2 border-white/30 rounded-full flex justify-center pt-3">
            <div className="w-2 h-4 bg-white/60 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section with Cards */}
      <section className="py-16 bg-[var(--card-bg)] border-y border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-[var(--primary)]/10 to-transparent border border-[var(--primary)]/20">
              <div className="text-5xl font-black text-[var(--primary)] mb-2">10K+</div>
              <div className="text-[var(--text-muted)] font-medium">Movies & Shows</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20">
              <div className="text-5xl font-black text-purple-500 mb-2">4K</div>
              <div className="text-[var(--text-muted)] font-medium">Ultra HD</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20">
              <div className="text-5xl font-black text-yellow-500 mb-2">50+</div>
              <div className="text-[var(--text-muted)] font-medium">Countries</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20">
              <div className="text-5xl font-black text-green-500 mb-2">24/7</div>
              <div className="text-[var(--text-muted)] font-medium">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Banner - Enhanced */}
      {!user?.subscription?.active && (
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] via-[var(--primary-dark)] to-[var(--primary)]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUvMC4xIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
          {/* Floating shapes */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse" />
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Unlock Unlimited Entertainment
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Get unlimited access to all movies, ad-free streaming, and exclusive content with our premium plans.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 mb-10">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all">
                  <div className="text-2xl font-bold text-white mb-2">Weekly</div>
                  <div className="text-5xl font-black text-white mb-3">UGX 10,000</div>
                  <div className="text-white/70">Perfect for trying out</div>
                </div>
                <div className="bg-white/25 backdrop-blur-sm rounded-3xl p-8 border-2 border-white/50 transform scale-105 shadow-2xl relative">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-sm font-bold px-4 py-1 rounded-full">
                    BEST VALUE
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">Monthly</div>
                  <div className="text-5xl font-black text-white mb-3">UGX 30,000</div>
                  <div className="text-white/70">Save 40% weekly</div>
                </div>
              </div>
              
              <Link
                href="/subscription"
                className="inline-flex items-center gap-3 bg-white text-[var(--primary)] px-10 py-4 rounded-full font-bold text-xl hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                Subscribe Now
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Top Rated Movies Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-1 h-10 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full" />
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">
                  Top Rated
                </h2>
                <p className="text-[var(--text-muted)]">Highest rated movies by our viewers</p>
              </div>
            </div>
            <Link href="/browse" className="text-[var(--primary)] hover:underline font-medium flex items-center gap-2 text-lg">
              View All
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {topRatedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>

      {/* New Releases Section */}
      <section className="py-16 bg-[var(--card-bg)]/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-1 h-10 bg-gradient-to-b from-[var(--primary)] to-[var(--primary-dark)] rounded-full" />
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">
                  New Releases
                </h2>
                <p className="text-[var(--text-muted)]">Fresh from the studio to your screen</p>
              </div>
            </div>
            <Link href="/browse" className="text-[var(--primary)] hover:underline font-medium flex items-center gap-2 text-lg">
              View All
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newestMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>

      {/* Genre Sections */}
      {documentaryMovies.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-1 h-10 bg-gradient-to-b from-green-400 to-teal-500 rounded-full" />
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">
                    Documentaries
                  </h2>
                  <p className="text-[var(--text-muted)]">Explore real stories and fascinating insights</p>
                </div>
              </div>
              <Link href="/browse" className="text-[var(--primary)] hover:underline font-medium flex items-center gap-2 text-lg">
                View All
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {documentaryMovies.slice(0, 4).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        </section>
      )}

      {actionMovies.length > 0 && (
        <section className="py-16 bg-[var(--card-bg)]/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-1 h-10 bg-gradient-to-b from-red-400 to-pink-500 rounded-full" />
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">
                    Action & Adventure
                  </h2>
                  <p className="text-[var(--text-muted)]">Heart-pounding excitement awaits</p>
                </div>
              </div>
              <Link href="/browse" className="text-[var(--primary)] hover:underline font-medium flex items-center gap-2 text-lg">
                View All
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {actionMovies.concat(adventureMovies).slice(0, 4).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Movies Section */}
      <section className="py-16 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-1 h-10 bg-[var(--foreground)] rounded-full" />
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">
                  All Movies
                </h2>
                <p className="text-[var(--text-muted)]">Browse our complete collection</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Enhanced Design */}
      <section className="py-20 bg-gradient-to-b from-[var(--card-bg)] to-[var(--background)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-6">
              Why Choose Movie Bus?
            </h2>
            <p className="text-[var(--text-muted)] text-xl max-w-2xl mx-auto">
              Experience the best in streaming entertainment with features designed for movie lovers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-[var(--card-bg)] p-10 rounded-3xl border border-[var(--border)] hover:border-[var(--primary)]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[var(--primary)]/10 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">4K Ultra HD</h3>
              <p className="text-[var(--text-muted)] text-lg">Crystal clear picture quality with support for 4K, HDR, and Dolby Atmos sound for the ultimate viewing experience.</p>
            </div>
            
            <div className="group bg-[var(--card-bg)] p-10 rounded-3xl border border-[var(--border)] hover:border-[var(--primary)]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[var(--primary)]/10 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">Watch Anywhere</h3>
              <p className="text-[var(--text-muted)] text-lg">Stream on your TV, laptop, tablet, or phone. Download movies for offline viewing anywhere you go.</p>
            </div>
            
            <div className="group bg-[var(--card-bg)] p-10 rounded-3xl border border-[var(--border)] hover:border-[var(--primary)]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[var(--primary)]/10 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">Family Safe</h3>
              <p className="text-[var(--text-muted)] text-lg">Parental controls and family profiles to ensure safe and appropriate viewing for everyone in your family.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--card-bg)] py-12 border-t border-[var(--border)] pb-24 md:pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[var(--primary)] rounded-xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              <span className="font-bold text-2xl text-[var(--foreground)]">Movie Bus</span>
            </div>
            <div className="flex items-center gap-8 text-[var(--text-muted)]">
              <Link href="/browse" className="hover:text-[var(--primary)] transition-colors text-lg">Browse</Link>
              <Link href="/subscription" className="hover:text-[var(--primary)] transition-colors text-lg">Pricing</Link>
              <Link href="/login" className="hover:text-[var(--primary)] transition-colors text-lg">Sign In</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[var(--border)] text-center">
            <p className="text-sm text-[var(--text-muted)]">
              © 2024 Movie Bus. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
