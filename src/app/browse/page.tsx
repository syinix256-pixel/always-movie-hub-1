"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import MovieCard from "@/components/MovieCard";
import MobileSelect from "@/components/MobileSelect";

export default function BrowsePage() {
  const searchParams = useSearchParams();
  const { movies } = useAuth();
  
  const initialFilter = searchParams.get("filter") || "all";
  const [filter, setFilter] = useState(initialFilter);
  const [genre, setGenre] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const genres = useMemo(() => {
    const uniqueGenres = [...new Set(movies.map((m) => m.genre))];
    return [
      { value: "all", label: "All Genres" },
      ...uniqueGenres.map((g) => ({ value: g, label: g })),
    ];
  }, [movies]);

  const filterOptions = [
    { value: "all", label: "All Movies" },
    { value: "free", label: "Free Movies" },
    { value: "premium", label: "Premium (UGX 500)" },
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "rating", label: "Highest Rated" },
    { value: "title", label: "Title A-Z" },
  ];

  const filteredMovies = useMemo(() => {
    let result = [...movies];

    // Apply filter
    if (filter === "free") {
      result = result.filter((m) => m.isFree);
    } else if (filter === "premium") {
      result = result.filter((m) => !m.isFree);
    }

    // Apply genre filter
    if (genre !== "all") {
      result = result.filter((m) => m.genre === genre);
    }

    // Apply sorting
    switch (sortBy) {
      case "newest":
        result.sort((a, b) => b.year - a.year);
        break;
      case "oldest":
        result.sort((a, b) => a.year - b.year);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "title":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return result;
  }, [movies, filter, genre, sortBy]);

  return (
    <div className="min-h-screen py-8 pb-24 md:pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
            Browse Movies
          </h1>
          <p className="text-[var(--text-muted)]">
            Discover {movies.length} copyright-free movies
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="w-full md:w-48">
            <MobileSelect
              label="Filter"
              options={filterOptions}
              value={filter}
              onChange={setFilter}
            />
          </div>
          
          <div className="w-full md:w-48">
            <MobileSelect
              label="Genre"
              options={genres}
              value={genre}
              onChange={setGenre}
            />
          </div>
          
          <div className="w-full md:w-48">
            <MobileSelect
              label="Sort By"
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
            />
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-[var(--text-muted)] mb-4">
          Showing {filteredMovies.length} movie{filteredMovies.length !== 1 ? "s" : ""}
        </p>

        {/* Movie Grid */}
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--card-bg)] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-[var(--foreground)] mb-2">
              No movies found
            </h3>
            <p className="text-[var(--text-muted)]">
              Try adjusting your filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
