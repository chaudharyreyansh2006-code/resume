"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from '@tanstack/react-query';

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

const fetchSubscriptionStatus = async (): Promise<SubscriptionStatus> => {
  const response = await fetch("/api/subscription-status");
  
  if (!response.ok) {
    if (response.status === 401) {
      return {
        hasActiveSubscription: false,
        isPro: false,
        subscription: null,
      };
    }
    throw new Error("Failed to fetch subscription status");
  }

  return await response.json();
};

export function useSubscription() {
  const {
    data: status = {
      hasActiveSubscription: false,
      isPro: false,
      subscription: null,
    },
    isLoading: loading,
    error,
    refetch
  } = useQuery({
    queryKey: ['subscription-status'],
    queryFn: fetchSubscriptionStatus,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    refetchOnWindowFocus: false, // Prevent refetch on tab switch
    refetchOnMount: false, // Only fetch if data is stale
    retry: 1,
  });

  // Listen for auth changes
  useEffect(() => {
    const supabase = createClient();
    
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        refetch();
      }
    });

    return () => subscription.unsubscribe();
  }, [refetch]);

  return {
    ...status,
    loading,
    error: error?.message || null,
    refetch,
  };
}