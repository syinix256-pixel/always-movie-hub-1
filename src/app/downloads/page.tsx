"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

interface DownloadedMovie {
  id: string;
  title: string;
  thumbnail: string;
  downloadedAt: string;
  size: string;
}

export default function DownloadsPage() {
  const router = useRouter();
  const { user, isAuthenticated, movies } = useAuth();
  
  // Simulated downloaded movies (in a real app, this would be stored locally)
  const [downloadedMovies, setDownloadedMovies] = useState<DownloadedMovie[]>(() => [
    {
      id: "1",
      title: "The Silent Ocean",
      thumbnail: "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=400&h=600&fit=crop",
      downloadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      size: "245 MB",
    },
  ]);

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const handleDeleteDownload = (id: string) => {
    setDownloadedMovies(downloadedMovies.filter((m) => m.id !== id));
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen py-8 pb-24 md:pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
            Downloads
          </h1>
          <p className="text-[var(--text-muted)]">
            {downloadedMovies.length} movie{downloadedMovies.length !== 1 ? "s" : ""} downloaded
          </p>
        </div>

        {/* Storage Info */}
        <div className="bg-[var(--card-bg)] rounded-lg p-4 mb-6 border border-[var(--border)]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-[var(--text-muted)]">Storage Used</span>
            <span className="text-sm font-medium text-[var(--foreground)]">245 MB / 1 GB</span>
          </div>
          <div className="h-2 bg-[var(--background)] rounded-full overflow-hidden">
            <div className="h-full w-[24.5%] bg-[var(--primary)] rounded-full" />
          </div>
        </div>

        {/* Downloaded Movies List */}
        {downloadedMovies.length > 0 ? (
          <div className="space-y-3">
            {downloadedMovies.map((movie) => (
              <div
                key={movie.id}
                className="flex items-center gap-4 bg-[var(--card-bg)] rounded-lg p-3 border border-[var(--border)]"
              >
                {/* Thumbnail */}
                <div className="w-20 h-14 rounded overflow-hidden flex-shrink-0">
                  <img
                    src={movie.thumbnail}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-[var(--foreground)] truncate">
                    {movie.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    {movie.size} • Downloaded {new Date(movie.downloadedAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <a
                    href={`/movie/${movie.id}`}
                    className="p-2 text-[var(--primary)] hover:bg-[var(--primary)]/10 rounded-lg"
                    title="Play"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </a>
                  <button
                    onClick={() => handleDeleteDownload(movie.id)}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
                    title="Delete"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--card-bg)] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-[var(--foreground)] mb-2">
              No downloads yet
            </h3>
            <p className="text-[var(--text-muted)] mb-4">
              Download movies to watch offline
            </p>
            <a href="/browse" className="btn-primary inline-block">
              Browse Movies
            </a>
          </div>
        )}

        {/* Download Info */}
        <div className="mt-8 p-4 bg-[var(--card-bg)] rounded-lg border border-[var(--border)]">
          <h3 className="font-medium text-[var(--foreground)] mb-2">
            About Downloads
          </h3>
          <ul className="text-sm text-[var(--text-muted)] space-y-1">
            <li>• Downloaded movies are stored locally on your device</li>
            <li>• Movies can be watched offline without internet</li>
            <li>• Storage is limited to 1GB on this device</li>
            <li>• Delete downloads to free up storage space</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
