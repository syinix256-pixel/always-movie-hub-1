"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function SettingsPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout, deleteAccount } = useAuth();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState("");

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const handleDeleteAccount = () => {
    if (deleteConfirmationText !== "DELETE") {
      alert("Please type DELETE to confirm");
      return;
    }

    deleteAccount();
    alert("Your account has been deleted. We're sorry to see you go!");
    router.push("/");
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
            Settings
          </h1>
          <p className="text-[var(--text-muted)]">
            Manage your account preferences
          </p>
        </div>

        {/* Account Info */}
        <div className="bg-[var(--card-bg)] rounded-lg p-6 border border-[var(--border)] mb-6">
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
            Account Information
          </h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-[var(--border)]">
              <span className="text-[var(--text-muted)]">Username</span>
              <span className="text-[var(--foreground)] font-medium">{user?.username}</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-[var(--border)]">
              <span className="text-[var(--text-muted)]">Email</span>
              <span className="text-[var(--foreground)] font-medium">{user?.email}</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-[var(--border)]">
              <span className="text-[var(--text-muted)]">Account Type</span>
              <span className="text-[var(--foreground)] font-medium capitalize">{user?.role}</span>
            </div>
            
            <div className="flex justify-between items-center py-3">
              <span className="text-[var(--text-muted)]">Subscription</span>
              <span className={user?.subscription?.active ? "text-[var(--success)]" : "text-[var(--text-muted)]"}>
                {user?.subscription?.active 
                  ? `${user.subscription.plan} plan active` 
                  : "No active subscription"}
              </span>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-[var(--card-bg)] rounded-lg p-6 border border-[var(--border)] mb-6">
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
            Preferences
          </h2>
          
          <div className="space-y-4">
            {/* Theme */}
            <div className="flex justify-between items-center py-3 border-b border-[var(--border)]">
              <div>
                <span className="text-[var(--foreground)] font-medium">Theme</span>
                <p className="text-sm text-[var(--text-muted)]">Following system settings</p>
              </div>
              <div className="w-10 h-6 bg-[var(--primary)] rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            
            {/* Notifications */}
            <div className="flex justify-between items-center py-3 border-b border-[var(--border)]">
              <div>
                <span className="text-[var(--foreground)] font-medium">Notifications</span>
                <p className="text-sm text-[var(--text-muted)]">Receive updates about new movies</p>
              </div>
              <div className="w-10 h-6 bg-[var(--border)] rounded-full relative">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            
            {/* Autoplay */}
            <div className="flex justify-between items-center py-3">
              <div>
                <span className="text-[var(--foreground)] font-medium">Autoplay</span>
                <p className="text-sm text-[var(--text-muted)]">Automatically play next episode</p>
              </div>
              <div className="w-10 h-6 bg-[var(--primary)] rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* App Info */}
        <div className="bg-[var(--card-bg)] rounded-lg p-6 border border-[var(--border)] mb-6">
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
            About
          </h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-[var(--border)]">
              <span className="text-[var(--text-muted)]">App Version</span>
              <span className="text-[var(--foreground)]">1.0.0</span>
            </div>
            
            <div className="flex justify-between items-center py-3">
              <span className="text-[var(--text-muted)]">Content</span>
              <span className="text-[var(--foreground)]">Copyright-free</span>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="mb-6">
          <button
            onClick={logout}
            className="w-full btn-secondary"
          >
            Log Out
          </button>
        </div>

        {/* Delete Account */}
        <div className="bg-red-500/5 rounded-lg p-6 border border-red-500/20">
          <h2 className="text-lg font-semibold text-red-500 mb-2">
            Delete Account
          </h2>
          <p className="text-sm text-[var(--text-muted)] mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Delete My Account
            </button>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-red-500 font-medium">
                This action cannot be undone. Please type DELETE to confirm.
              </p>
              <input
                type="text"
                value={deleteConfirmationText}
                onChange={(e) => setDeleteConfirmationText(e.target.value)}
                placeholder="Type DELETE"
                className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] focus:outline-none focus:border-red-500"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeleteConfirmationText("");
                  }}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="flex-1 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
