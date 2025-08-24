"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

interface Subscription {
  id: string;
  status: string;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  payment_plans: {
    id: string;
    name: string;
    price_interval: string;
    price_cents: number;
  };
}

interface SubscriptionStatus {
  hasActiveSubscription: boolean;
  isPro: boolean;
  subscription: Subscription | null;
}

export function useSubscription() {
  const [status, setStatus] = useState<SubscriptionStatus>({
    hasActiveSubscription: false,
    isPro: false,
    subscription: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscriptionStatus = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/subscription-status");
      
      if (!response.ok) {
        if (response.status === 401) {
          // User not authenticated
          setStatus({
            hasActiveSubscription: false,
            isPro: false,
            subscription: null,
          });
          return;
        }
        throw new Error("Failed to fetch subscription status");
      }

      const data = await response.json();
      setStatus(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionStatus();
  }, []);

  // Listen for auth changes
  useEffect(() => {
    const supabase = createClient();
    
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        fetchSubscriptionStatus();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    ...status,
    loading,
    error,
    refetch: fetchSubscriptionStatus,
  };
}