"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// User types
export type UserRole = "admin" | "user" | null;

export interface User {
  username: string;
  role: "admin" | "user";
  email?: string;
  subscription?: {
    plan: "weekly" | "monthly";
    expiresAt?: string;
    active: boolean;
  } | null;
  watchlist: string[];
  purchases: string[];
}

// Auth credentials
const ADMIN_CREDENTIALS = {
  username: "basemera",
  password: "Basemeraadmin",
};

const USER_CREDENTIALS = {
  username: "gilbert",
  password: "Gilbertadmin",
};

// Sample movies (placeholder data)
export interface Movie {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  genre: string;
  year: number;
  rating: number;
  isFree: boolean;
  price: number; // Pay per view price in UGX
}

const SAMPLE_MOVIES: Movie[] = [
  {
    id: "1",
    title: "The Silent Ocean",
    description: "A mesmerizing journey through the depths of the ocean, featuring stunning marine life and compelling storytelling.",
    thumbnail: "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=400&h=600&fit=crop",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    duration: "1h 45m",
    genre: "Documentary",
    year: 2024,
    rating: 4.5,
    isFree: true,
    price: 500,
  },
  {
    id: "2",
    title: "Mountain Echoes",
    description: "An inspiring adventure about climbing the tallest peaks and discovering inner strength.",
    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=600&fit=crop",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    duration: "2h 10m",
    genre: "Adventure",
    year: 2024,
    rating: 4.8,
    isFree: false,
    price: 500,
  },
  {
    id: "3",
    title: "City Lights",
    description: "A beautiful exploration of urban nightlife and the dreams that shine brightest after dark.",
    thumbnail: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400&h=600&fit=crop",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    duration: "1h 30m",
    genre: "Drama",
    year: 2023,
    rating: 4.2,
    isFree: true,
    price: 500,
  },
  {
    id: "4",
    title: "Forest Whispers",
    description: "Discover the hidden secrets of ancient forests and the creatures that call them home.",
    thumbnail: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=600&fit=crop",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    duration: "1h 55m",
    genre: "Documentary",
    year: 2024,
    rating: 4.6,
    isFree: false,
    price: 500,
  },
  {
    id: "5",
    title: "Desert Storm",
    description: "An action-packed journey through the most treacherous deserts on Earth.",
    thumbnail: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=600&fit=crop",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    duration: "2h 05m",
    genre: "Action",
    year: 2023,
    rating: 4.3,
    isFree: true,
    price: 500,
  },
  {
    id: "6",
    title: "Northern Lights",
    description: "Witness the breathtaking aurora borealis in this stunning natural spectacle.",
    thumbnail: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&h=600&fit=crop",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    duration: "1h 40m",
    genre: "Documentary",
    year: 2024,
    rating: 4.9,
    isFree: false,
    price: 500,
  },
];

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  movies: Movie[];
  login: (username: string, password: string) => boolean;
  logout: () => void;
  addToWatchlist: (movieId: string) => void;
  removeFromWatchlist: (movieId: string) => void;
  purchaseMovie: (movieId: string) => void;
  isInWatchlist: (movieId: string) => boolean;
  hasPurchased: (movieId: string) => boolean;
  subscribe: (plan: "weekly" | "monthly") => void;
  cancelSubscription: () => void;
  deleteAccount: () => void;
  addMovie: (movie: Omit<Movie, "id">) => void;
  deleteMovie: (movieId: string) => void;
  isDarkMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialize dark mode with lazy initializer
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true;
  });

  // Initialize user from localStorage with lazy initializer
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("alwaysMovieHub_user");
      if (savedUser) {
        try {
          return JSON.parse(savedUser);
        } catch {
          localStorage.removeItem("alwaysMovieHub_user");
        }
      }
    }
    return null;
  });

  // Initialize movies from localStorage with lazy initializer
  const [movies, setMovies] = useState<Movie[]>(() => {
    if (typeof window !== "undefined") {
      const savedMovies = localStorage.getItem("alwaysMovieHub_movies");
      if (savedMovies) {
        try {
          return JSON.parse(savedMovies);
        } catch {
          localStorage.removeItem("alwaysMovieHub_movies");
        }
      }
    }
    return SAMPLE_MOVIES;
  });

  // Listen for system color scheme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Save user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("alwaysMovieHub_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("alwaysMovieHub_user");
    }
  }, [user]);

  // Save movies to localStorage
  useEffect(() => {
    localStorage.setItem("alwaysMovieHub_movies", JSON.stringify(movies));
  }, [movies]);

  const login = (username: string, password: string): boolean => {
    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      const adminUser: User = {
        username: "basemera",
        role: "admin",
        email: "admin@alwaysmoviehub.com",
        subscription: null,
        watchlist: [],
        purchases: [],
      };
      setUser(adminUser);
      return true;
    }

    if (
      username === USER_CREDENTIALS.username &&
      password === USER_CREDENTIALS.password
    ) {
      const regularUser: User = {
        username: "gilbert",
        role: "user",
        email: "gilbert@alwaysmoviehub.com",
        subscription: null,
        watchlist: [],
        purchases: [],
      };
      setUser(regularUser);
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const addToWatchlist = (movieId: string) => {
    if (user && !user.watchlist.includes(movieId)) {
      setUser({
        ...user,
        watchlist: [...user.watchlist, movieId],
      });
    }
  };

  const removeFromWatchlist = (movieId: string) => {
    if (user) {
      setUser({
        ...user,
        watchlist: user.watchlist.filter((id) => id !== movieId),
      });
    }
  };

  const isInWatchlist = (movieId: string): boolean => {
    return user?.watchlist.includes(movieId) || false;
  };

  const purchaseMovie = (movieId: string) => {
    if (user && !user.purchases.includes(movieId)) {
      setUser({
        ...user,
        purchases: [...user.purchases, movieId],
      });
    }
  };

  const hasPurchased = (movieId: string): boolean => {
    return user?.purchases.includes(movieId) || false;
  };

  const subscribe = (plan: "weekly" | "monthly") => {
    if (user) {
      const now = new Date();
      const expires = new Date(now);
      
      if (plan === "weekly") {
        expires.setDate(expires.getDate() + 7);
      } else {
        expires.setMonth(expires.getMonth() + 1);
      }

      setUser({
        ...user,
        subscription: {
          plan,
          expiresAt: expires.toISOString(),
          active: true,
        },
      });
    }
  };

  const cancelSubscription = () => {
    if (user) {
      setUser({
        ...user,
        subscription: undefined,
      });
    }
  };

  const deleteAccount = () => {
    setUser(null);
    localStorage.removeItem("alwaysMovieHub_user");
  };

  const addMovie = (movie: Omit<Movie, "id">) => {
    const newMovie: Movie = {
      ...movie,
      id: Date.now().toString(),
    };
    setMovies([...movies, newMovie]);
  };

  const deleteMovie = (movieId: string) => {
    setMovies(movies.filter((m) => m.id !== movieId));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        movies,
        login,
        logout,
        addToWatchlist,
        removeFromWatchlist,
        purchaseMovie,
        isInWatchlist,
        hasPurchased,
        subscribe,
        cancelSubscription,
        deleteAccount,
        addMovie,
        deleteMovie,
        isDarkMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
