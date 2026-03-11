"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function SubscriptionPage() {
  const router = useRouter();
  const { user, isAuthenticated, subscribe, cancelSubscription } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const handleSubscribe = async (plan: "weekly" | "monthly") => {
    setIsProcessing(true);

    const price = plan === "weekly" ? 10000 : 30000;
    const confirmSubscribe = window.confirm(
      `Subscribe to ${plan} plan for UGX ${price.toLocaleString()}?\n\nThis will be deducted from your mobile money account.`
    );

    if (confirmSubscribe) {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1000));
      subscribe(plan);
      alert("Subscription successful! You now have unlimited access to all movies.");
    }

    setIsProcessing(false);
  };

  const handleCancelSubscription = () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel your subscription? You will lose access to premium content."
    );

    if (confirmCancel) {
      cancelSubscription();
      alert("Subscription cancelled successfully.");
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  const isSubscribed = user?.subscription?.active;
  const plan = user?.subscription?.plan;

  return (
    <div className="min-h-screen py-8 pb-24 md:pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
            Subscription Plans
          </h1>
          <p className="text-[var(--text-muted)]">
            Choose a plan to unlock unlimited access to all movies
          </p>
        </div>

        {/* Current Subscription Status */}
        {isSubscribed && (
          <div className="bg-[var(--success)]/10 border border-[var(--success)]/20 rounded-lg p-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--success)]/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-[var(--foreground)]">
                  Active Subscription
                </h3>
                <p className="text-sm text-[var(--text-muted)]">
                  {plan === "weekly" ? "Weekly" : "Monthly"} plan • Renews automatically
                </p>
              </div>
            </div>
            <button
              onClick={handleCancelSubscription}
              className="mt-4 text-sm text-red-500 hover:underline"
            >
              Cancel Subscription
            </button>
          </div>
        )}

        {/* Plans */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Weekly Plan */}
          <div className={`bg-[var(--card-bg)] rounded-2xl p-6 border ${isSubscribed && plan === "weekly" ? "border-[var(--success)]" : "border-[var(--border)]"}`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-[var(--foreground)]">
                  Weekly Plan
                </h2>
                <p className="text-sm text-[var(--text-muted)]">
                  7 days of unlimited access
                </p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold text-[var(--foreground)]">UGX</span>
                <span className="text-3xl font-bold text-[var(--primary)] ml-1">10K</span>
                <p className="text-xs text-[var(--text-muted)]">/week</p>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="var(--success)" stroke="var(--success)" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Unlimited movie streaming
              </li>
              <li className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="var(--success)" stroke="var(--success)" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Download for offline viewing
              </li>
              <li className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="var(--success)" stroke="var(--success)" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                HD quality
              </li>
            </ul>

            <button
              onClick={() => handleSubscribe("weekly")}
              disabled={isProcessing || (isSubscribed && plan === "weekly")}
              className="w-full btn-primary disabled:opacity-50"
            >
              {isSubscribed && plan === "weekly" ? "Current Plan" : "Subscribe - UGX 10,000"}
            </button>
          </div>

          {/* Monthly Plan */}
          <div className={`bg-[var(--card-bg)] rounded-2xl p-6 border ${isSubscribed && plan === "monthly" ? "border-[var(--success)]" : "border-[var(--border)]"} relative overflow-hidden`}>
            {/* Best Value Badge */}
            <div className="absolute top-0 right-0 bg-[var(--primary)] text-white text-xs px-3 py-1 rounded-bl-lg font-medium">
              Best Value
            </div>

            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-[var(--foreground)]">
                  Monthly Plan
                </h2>
                <p className="text-sm text-[var(--text-muted)]">
                  30 days of unlimited access
                </p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold text-[var(--foreground)]">UGX</span>
                <span className="text-3xl font-bold text-[var(--primary)] ml-1">30K</span>
                <p className="text-xs text-[var(--text-muted)]">/month</p>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="var(--success)" stroke="var(--success)" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Unlimited movie streaming
              </li>
              <li className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="var(--success)" stroke="var(--success)" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Download for offline viewing
              </li>
              <li className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="var(--success)" stroke="var(--success)" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                HD quality
              </li>
              <li className="flex items-center gap-2 text-sm text-[var(--success)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="var(--success)" stroke="var(--success)" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Save UGX 20,000 vs weekly
              </li>
            </ul>

            <button
              onClick={() => handleSubscribe("monthly")}
              disabled={isProcessing || (isSubscribed && plan === "monthly")}
              className="w-full btn-primary disabled:opacity-50"
            >
              {isSubscribed && plan === "monthly" ? "Current Plan" : "Subscribe - UGX 30,000"}
            </button>
          </div>
        </div>

        {/* Payment Info */}
        <div className="bg-[var(--card-bg)] rounded-lg p-6 border border-[var(--border)]">
          <h3 className="font-semibold text-[var(--foreground)] mb-4">
            Payment Information
          </h3>
          <p className="text-sm text-[var(--text-muted)] mb-4">
            Payments are processed via Mobile Money. After clicking subscribe, you will receive a prompt on your phone.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-[var(--background)] rounded-lg p-4">
              <p className="text-sm font-medium text-[var(--foreground)] mb-1">Airtel Money</p>
              <p className="text-lg font-bold text-[var(--primary)]">0775648886</p>
            </div>
            <div className="bg-[var(--background)] rounded-lg p-4">
              <p className="text-sm font-medium text-[var(--foreground)] mb-1">MTN Mobile Money</p>
              <p className="text-lg font-bold text-[var(--primary)]">0707538010</p>
            </div>
          </div>
        </div>

        {/* Pay Per View Option */}
        <div className="mt-8 p-4 bg-[var(--card-bg)] rounded-lg border border-[var(--border)]">
          <h3 className="font-semibold text-[var(--foreground)] mb-2">
            Alternative: Pay Per View
          </h3>
          <p className="text-sm text-[var(--text-muted)] mb-2">
            Don&apos;t want to subscribe? You can also unlock individual movies for just UGX 500 each.
          </p>
          <a href="/browse" className="text-[var(--primary)] hover:underline text-sm">
            Browse Movies →
          </a>
        </div>
      </div>
    </div>
  );
}
