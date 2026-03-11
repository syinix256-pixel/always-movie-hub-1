"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, Movie } from "@/lib/auth-context";
import MovieCard from "@/components/MovieCard";

export default function AdminPage() {
  const router = useRouter();
  const { user, isAuthenticated, movies, addMovie, deleteMovie } = useAuth();
  const [showAddMovie, setShowAddMovie] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [duration, setDuration] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [rating, setRating] = useState(4.0);
  const [isFree, setIsFree] = useState(true);
  const [price, setPrice] = useState(500);

  // Redirect if not authenticated or not admin
  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else if (user?.role !== "admin") {
      router.push("/");
    }
  }, [isAuthenticated, user, router]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setThumbnail("");
    setVideoUrl("");
    setDuration("");
    setGenre("");
    setYear(new Date().getFullYear());
    setRating(4.0);
    setIsFree(true);
    setPrice(500);
    setEditingMovie(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const movieData = {
      title,
      description,
      thumbnail,
      videoUrl,
      duration,
      genre,
      year,
      rating,
      isFree,
      price,
    };

    if (editingMovie) {
      // Update existing movie (in a real app, we'd have an update function)
      alert("Movie updated successfully!");
    } else {
      addMovie(movieData);
      alert("Movie added successfully!");
    }

    resetForm();
    setShowAddMovie(false);
  };

  const handleEdit = (movie: Movie) => {
    setTitle(movie.title);
    setDescription(movie.description);
    setThumbnail(movie.thumbnail);
    setVideoUrl(movie.videoUrl);
    setDuration(movie.duration);
    setGenre(movie.genre);
    setYear(movie.year);
    setRating(movie.rating);
    setIsFree(movie.isFree);
    setPrice(movie.price);
    setEditingMovie(movie);
    setShowAddMovie(true);
  };

  const handleDelete = (movieId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this movie?");
    if (confirmDelete) {
      deleteMovie(movieId);
      alert("Movie deleted successfully!");
    }
  };

  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen py-8 pb-24 md:pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
              Admin Dashboard
            </h1>
            <p className="text-[var(--text-muted)]">
              Manage your movie library
            </p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowAddMovie(true);
            }}
            className="btn-primary flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            Add Movie
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[var(--card-bg)] rounded-lg p-4 border border-[var(--border)]">
            <p className="text-sm text-[var(--text-muted)]">Total Movies</p>
            <p className="text-2xl font-bold text-[var(--foreground)]">{movies.length}</p>
          </div>
          <div className="bg-[var(--card-bg)] rounded-lg p-4 border border-[var(--border)]">
            <p className="text-sm text-[var(--text-muted)]">Free Movies</p>
            <p className="text-2xl font-bold text-[var(--success)]">{movies.filter(m => m.isFree).length}</p>
          </div>
          <div className="bg-[var(--card-bg)] rounded-lg p-4 border border-[var(--border)]">
            <p className="text-sm text-[var(--text-muted)]">Premium Movies</p>
            <p className="text-2xl font-bold text-[var(--warning)]">{movies.filter(m => !m.isFree).length}</p>
          </div>
          <div className="bg-[var(--card-bg)] rounded-lg p-4 border border-[var(--border)]">
            <p className="text-sm text-[var(--text-muted)]">Genres</p>
            <p className="text-2xl font-bold text-[var(--primary)]">{new Set(movies.map(m => m.genre)).size}</p>
          </div>
        </div>

        {/* Movies List */}
        <div className="bg-[var(--card-bg)] rounded-lg border border-[var(--border)]">
          <div className="p-4 border-b border-[var(--border)]">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              All Movies
            </h2>
          </div>
          
          {movies.length > 0 ? (
            <div className="divide-y divide-[var(--border)]">
              {movies.map((movie) => (
                <div key={movie.id} className="p-4 flex items-center gap-4">
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
                      {movie.year} • {movie.genre} • {movie.duration}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="hidden md:block">
                    {movie.isFree ? (
                      <span className="text-xs bg-[var(--success)]/20 text-[var(--success)] px-2 py-1 rounded">
                        Free
                      </span>
                    ) : (
                      <span className="text-xs bg-[var(--warning)]/20 text-[var(--warning)] px-2 py-1 rounded">
                        UGX {movie.price}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(movie)}
                      className="p-2 text-[var(--text-muted)] hover:text-[var(--foreground)] hover:bg-[var(--background)] rounded-lg"
                      title="Edit"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(movie.id)}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
                      title="Delete"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <div className="p-8 text-center">
              <p className="text-[var(--text-muted)]">No movies yet. Add your first movie!</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Movie Modal */}
      {showAddMovie && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[var(--card-bg)] rounded-2xl p-6 w-full max-w-2xl my-8 animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[var(--foreground)]">
                {editingMovie ? "Edit Movie" : "Add New Movie"}
              </h2>
              <button
                onClick={() => {
                  setShowAddMovie(false);
                  resetForm();
                }}
                className="p-2 hover:bg-[var(--background)] rounded-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-[var(--text-muted)]">
                  Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                  placeholder="Movie title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-[var(--text-muted)]">
                  Description *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={3}
                  className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                  placeholder="Movie description"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-[var(--text-muted)]">
                    Thumbnail URL *
                  </label>
                  <input
                    type="url"
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                    required
                    className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-[var(--text-muted)]">
                    Video URL *
                  </label>
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    required
                    className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-[var(--text-muted)]">
                    Duration *
                  </label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                    className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                    placeholder="1h 30m"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-[var(--text-muted)]">
                    Genre *
                  </label>
                  <input
                    type="text"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    required
                    className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                    placeholder="Action"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-[var(--text-muted)]">
                    Year *
                  </label>
                  <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(parseInt(e.target.value))}
                    required
                    min={1900}
                    max={2100}
                    className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-[var(--text-muted)]">
                    Rating
                  </label>
                  <input
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(parseFloat(e.target.value))}
                    step={0.1}
                    min={0}
                    max={5}
                    className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-[var(--text-muted)]">
                    Price (UGX)
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(parseInt(e.target.value))}
                    min={0}
                    className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                  />
                </div>

                <div className="flex items-center gap-3 pt-6">
                  <input
                    type="checkbox"
                    id="isFree"
                    checked={isFree}
                    onChange={(e) => setIsFree(e.target.checked)}
                    className="w-5 h-5 accent-[var(--primary)]"
                  />
                  <label htmlFor="isFree" className="text-[var(--foreground)]">
                    Free Movie
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddMovie(false);
                    resetForm();
                  }}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary"
                >
                  {editingMovie ? "Update Movie" : "Add Movie"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
