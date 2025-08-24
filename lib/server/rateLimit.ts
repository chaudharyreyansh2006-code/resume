import { Ratelimit } from '@upstash/ratelimit';
import { upstashRedis } from './redis';

// For authenticated APIs (profile upload, resume updates)
export const authRateLimit = new Ratelimit({
  redis: upstashRedis,
  limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 requests per minute
  analytics: true,
});

export const authHourlyRateLimit = new Ratelimit({
  redis: upstashRedis,
  limiter: Ratelimit.slidingWindow(100, '1 h'), // 100 requests per hour
  analytics: true,
});

// For public APIs (username check, analytics)
export const publicRateLimit = new Ratelimit({
  redis: upstashRedis,
  limiter: Ratelimit.slidingWindow(60, '1 m'), // 60 requests per minute
  analytics: true,
});

export const publicHourlyRateLimit = new Ratelimit({
  redis: upstashRedis,
  limiter: Ratelimit.slidingWindow(1000, '1 h'), // 1000 requests per hour
  analytics: true,
});

// Helper function to get client IP
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}

// Rate limit check function
export async function checkRateLimit(
  identifier: string,
  rateLimiter: Ratelimit,
  hourlyRateLimiter?: Ratelimit
) {
  const { success: minuteSuccess, limit: minuteLimit, reset: minuteReset, remaining: minuteRemaining } = 
    await rateLimiter.limit(identifier);
  
  if (!minuteSuccess) {
    return {
      success: false,
      limit: minuteLimit,
      reset: minuteReset,
      remaining: minuteRemaining,
      type: 'minute' as const
    };
  }
  
  if (hourlyRateLimiter) {
    const { success: hourlySuccess, limit: hourlyLimit, reset: hourlyReset, remaining: hourlyRemaining } = 
      await hourlyRateLimiter.limit(identifier);
    
    if (!hourlySuccess) {
      return {
        success: false,
        limit: hourlyLimit,
        reset: hourlyReset,
        remaining: hourlyRemaining,
        type: 'hour' as const
      };
    }
  }
  
  // Return consistent structure for success case
  return { 
    success: true,
    limit: undefined,
    reset: undefined,
    remaining: undefined
  };
}