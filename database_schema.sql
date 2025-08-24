-- Database Schema for DodoPayments Pro Subscription System
-- Run these SQL commands in Supabase to set up the required tables

-- 1. Payment Plans Table
-- Stores available subscription plans (in this case, just the Pro plan)
CREATE TABLE IF NOT EXISTS payment_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price_cents INTEGER NOT NULL, -- Price in cents (e.g., 2000 for $20.00)
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    dodo_product_id VARCHAR(255) UNIQUE NOT NULL, -- DodoPayments product ID
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Subscriptions Table
-- Tracks user subscriptions (one-time pro plan purchases)
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    payment_plan_id UUID NOT NULL REFERENCES payment_plans(id),
    status VARCHAR(50) NOT NULL DEFAULT 'pending', -- pending, active, cancelled, expired
    activated_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE, -- NULL for lifetime subscriptions
    cancel_at_period_end BOOLEAN DEFAULT false,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure one active subscription per user
    CONSTRAINT unique_active_subscription UNIQUE (user_id, status) 
        DEFERRABLE INITIALLY DEFERRED
);

-- 3. Payments Table
-- Tracks individual payment transactions
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    subscription_id UUID REFERENCES subscriptions(id) ON DELETE SET NULL,
    payment_plan_id UUID NOT NULL REFERENCES payment_plans(id),
    dodo_payment_id VARCHAR(255) UNIQUE NOT NULL, -- DodoPayments payment ID
    amount_cents INTEGER NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    status VARCHAR(50) NOT NULL DEFAULT 'pending', -- pending, succeeded, failed, cancelled, completed
    payment_method VARCHAR(100),
    payment_link TEXT, -- DodoPayments checkout link
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Webhook Events Table
-- Tracks webhook events for debugging and audit purposes
CREATE TABLE IF NOT EXISTS webhook_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id VARCHAR(255) UNIQUE NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    payment_id VARCHAR(255) NOT NULL,
    processed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_status ON subscriptions(user_id, status);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_dodo_payment_id ON payments(dodo_payment_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_webhook_events_event_id ON webhook_events(event_id);
CREATE INDEX IF NOT EXISTS idx_webhook_events_payment_id ON webhook_events(payment_id);
CREATE INDEX IF NOT EXISTS idx_webhook_events_processed ON webhook_events(processed);

-- 6. Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 7. Create triggers for updated_at columns
CREATE TRIGGER update_payment_plans_updated_at BEFORE UPDATE ON payment_plans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- No updated_at trigger needed for webhook_events as it's append-only

-- 8. Insert the Pro Plan (adjust the dodo_product_id to match your DodoPayments product)
INSERT INTO payment_plans (name, description, price_cents, currency, dodo_product_id, is_active)
VALUES (
    'Pro Plan',
    'One-time payment for lifetime access to website generation',
    900, -- $9.00
    'USD',
    'pro-plan', -- DodoPayments product ID
    true
) ON CONFLICT (dodo_product_id) DO NOTHING;

-- 9. Row Level Security (RLS) Policies
-- Enable RLS on all tables
ALTER TABLE payment_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_events ENABLE ROW LEVEL SECURITY;

-- Payment plans are readable by everyone (public)
CREATE POLICY "Payment plans are viewable by everyone" ON payment_plans
    FOR SELECT USING (is_active = true);

-- Users can only see their own subscriptions
CREATE POLICY "Users can view own subscriptions" ON subscriptions
    FOR SELECT USING (auth.uid() = user_id);

-- Users can only see their own payments
CREATE POLICY "Users can view own payments" ON payments
    FOR SELECT USING (auth.uid() = user_id);

-- Service role can manage all records (for webhooks and admin operations)
CREATE POLICY "Service role can manage payment_plans" ON payment_plans
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage subscriptions" ON subscriptions
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage payments" ON payments
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage webhook_events" ON webhook_events
    FOR ALL USING (auth.role() = 'service_role');

-- 10. Helper function to check if user has active subscription
CREATE OR REPLACE FUNCTION has_active_subscription(user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM subscriptions 
        WHERE user_id = user_uuid 
        AND status = 'active'
        AND (expires_at IS NULL OR expires_at > NOW())
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION has_active_subscription(UUID) TO authenticated;

-- 11. Function to get user subscription details
CREATE OR REPLACE FUNCTION get_user_subscription(user_uuid UUID)
RETURNS TABLE (
    subscription_id UUID,
    plan_name VARCHAR(255),
    status VARCHAR(50),
    activated_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        s.id,
        pp.name,
        s.status,
        s.activated_at,
        s.expires_at
    FROM subscriptions s
    JOIN payment_plans pp ON s.payment_plan_id = pp.id
    WHERE s.user_id = user_uuid
    AND s.status = 'active'
    ORDER BY s.created_at DESC
    LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_user_subscription(UUID) TO authenticated;

-- 12. Comments for documentation
COMMENT ON TABLE payment_plans IS 'Available subscription plans';
COMMENT ON TABLE subscriptions IS 'User subscriptions tracking';
COMMENT ON TABLE payments IS 'Payment transaction records';
COMMENT ON TABLE webhook_events IS 'Webhook events for audit and debugging';
COMMENT ON FUNCTION has_active_subscription(UUID) IS 'Check if user has an active subscription';
COMMENT ON FUNCTION get_user_subscription(UUID) IS 'Get user subscription details';

-- Allow users to create their own subscriptions
CREATE POLICY "Users can create own subscriptions" ON subscriptions 
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- Allow users to create their own payments  
CREATE POLICY "Users can create own payments" ON payments 
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);
-- End of schema