"use client";

import React, { useState, use } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function MovieDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { user, isAuthenticated, movies, purchaseMovie, hasPurchased, addToWatchlist, removeFromWatchlist, isInWatchlist } = useAuth();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const movie = movies.find((m) => m.id === resolvedParams.id);

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
            Movie not found
          </h1>
          <a href="/browse" className="text-[var(--primary)] hover:underline">
            Browse movies
          </a>
        </div>
      </div>
    );
  }

  const isSubscribed = user?.subscription?.active;
  const purchased = hasPurchased(movie.id);
  const inWatchlist = isInWatchlist(movie.id);
  const canWatch = movie.isFree || purchased || isSubscribed;

  const handlePlay = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!canWatch && !movie.isFree) {
      setShowPaymentModal(true);
      return;
    }

    setIsPlaying(true);
  };

  const handlePurchase = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    // Simulate payment processing
    const confirmPurchase = window.confirm(
      `Pay UGX ${movie.price} to unlock "${movie.title}"?\n\nThis will be deducted from your mobile money account.`
    );

    if (confirmPurchase) {
      // Simulate successful payment
      purchaseMovie(movie.id);
      setShowPaymentModal(false);
      setIsPlaying(true);
    }
  };

  const handleDownload = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!canWatch) {
      setShowPaymentModal(true);
      return;
    }

    // Simulate download
    alert(`Downloading "${movie.title}"...\n\nNote: In a production app, this would download the video file.`);
  };

  const handleWatchlistToggle = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie.id);
    }
  };

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      {/* Video Player / Thumbnail */}
      <div className="relative aspect-video bg-black">
        {isPlaying && canWatch ? (
          <video
            src={movie.videoUrl}
            controls
            autoPlay
            className="w-full h-full"
            onEnded={() => setIsPlaying(false)}
          />
        ) : (
          <>
            <img
              src={movie.thumbnail}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <button
                onClick={handlePlay}
                className="w-20 h-20 rounded-full bg-[var(--primary)] flex items-center justify-center hover:scale-110 transition-transform"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="white">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Movie Info */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
            {movie.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-muted)]">
            <span>{movie.year}</span>
            <span>•</span>
            <span>{movie.genre}</span>
            <span>•</span>
            <span>{movie.duration}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="var(--warning)" stroke="var(--warning)" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span>{movie.rating}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button onClick={handlePlay} className="btn-primary flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            {canWatch ? "Play" : "Unlock for UGX 500"}
          </button>

          <button onClick={handleDownload} className="btn-secondary flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            Download
          </button>

          <button onClick={handleWatchlistToggle} className="btn-secondary flex items-center gap-2">
            {inWatchlist ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
                In Watchlist
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
                Add to Watchlist
              </>
            )}
          </button>
        </div>

        {/* Access Status */}
        {!canWatch && (
          <div className="bg-[var(--card-bg)] rounded-lg p-4 mb-6 border border-[var(--border)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--warning)]/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-[var(--foreground)]">
                  Premium Content
                </h3>
                <p className="text-sm text-[var(--text-muted)]">
                  Pay UGX 500 to unlock or subscribe for unlimited access
                </p>
              </div>
            </div>
            <button
              onClick={handlePurchase}
              className="w-full mt-4 btn-primary"
            >
              Pay UGX 500 Now
            </button>
          </div>
        )}

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[var(--foreground)] mb-3">
            Synopsis
          </h2>
          <p className="text-[var(--text-muted)] leading-relaxed">
            {movie.description}
          </p>
        </div>

        {/* Subscription CTA */}
        {!isSubscribed && (
          <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] rounded-lg p-6 text-white">
            <h2 className="text-xl font-bold mb-2">
              Get Unlimited Access
            </h2>
            <p className="text-white/80 mb-4">
              Subscribe to access all movies including this one. Weekly: UGX 10,000 • Monthly: UGX 30,000
            </p>
            <a href="/subscription" className="inline-block bg-white text-[var(--primary)] px-6 py-2 rounded-full font-semibold hover:bg-white/90 transition-colors">
              Subscribe Now
            </a>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-[var(--card-bg)] rounded-2xl p-6 w-full max-w-md animate-slide-up">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
              Unlock Movie
            </h2>
            
            <div className="bg-[var(--background)] rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[var(--text-muted)]">Movie</span>
                <span className="text-[var(--foreground)] font-medium">{movie.title}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[var(--text-muted)]">Price</span>
                <span className="text-[var(--foreground)] font-bold text-xl">UGX {movie.price}</span>
              </div>
            </div>

            <div className="mb-4 p-3 bg-[var(--background)] rounded-lg">
              <p className="text-sm text-[var(--text-muted)] mb-2">
                Pay with Mobile Money:
              </p>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--foreground)]">0775648886</span>
                <span className="text-[var(--text-muted)]">Airtel</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--foreground)]">0707538010</span>
                <span className="text-[var(--text-muted)]">MTN</span>
              </div>
            </div>

            <p className="text-xs text-[var(--text-muted)] mb-4">
              After payment, you will receive an SMS confirmation. The movie will be unlocked automatically.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handlePurchase}
                className="flex-1 btn-primary"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
