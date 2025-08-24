import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Parse request body
    const body = await request.json()
    const { product_id, quantity = 1 } = body

    if (!product_id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
    }

    // Get the plan from the database using dodo_product_id
    const { data: plan, error: planError } = await supabase
      .from("payment_plans")
      .select("*")
      .eq("dodo_product_id", product_id)
      .eq("is_active", true)
      .single()

    if (planError || !plan) {
      return NextResponse.json({ error: "Payment plan not found" }, { status: 404 })
    }

    // Check if user already has an active subscription
    const { data: hasActiveSubscription, error: subscriptionCheckError } = await supabase
      .rpc('has_active_subscription', { user_uuid: user.id })

    if (subscriptionCheckError) {
      console.error('Error checking subscription:', subscriptionCheckError)
      return NextResponse.json({ error: "Failed to check subscription status" }, { status: 500 })
    }

    if (hasActiveSubscription) {
      return NextResponse.json({ error: "User already has an active subscription" }, { status: 400 })
    }

    // Create DodoPayments payment
    const dodoPaymentData = {
      billing: {
        country: "US",
        state: "CA",
        city: "San Francisco",
        street: "123 Main St",
        zipcode: "94105",
      },
      customer: {
        name: user.user_metadata?.name || user.email?.split("@")[0] || "User",
        email: user.email || "",
      },
      product_cart: [
        {
          product_id: plan.dodo_product_id,
          quantity: 1,
        },
      ],
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/upload?payment=success`,
      payment_link: true,
      metadata: {
        user_id: user.id,
        plan_id: plan.id,
        amount_cents: plan.price_cents.toString(),
      },
    }

    const dodoResponse = await fetch("https://test.dodopayments.com/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DODO_PAYMENTS_API_KEY}`,
      },
      body: JSON.stringify(dodoPaymentData),
    })

    if (!dodoResponse.ok) {
      return NextResponse.json({ error: "Failed to create payment" }, { status: 500 })
    }

    const dodoPayment = await dodoResponse.json()

    // Create pending subscription
    const { data: subscription, error: subscriptionError } = await supabase
      .from("subscriptions")
      .insert({
        user_id: user.id,
        payment_plan_id: plan.id,
        status: "pending",
      })
      .select()
      .single()

    if (subscriptionError) {
      console.error('Error creating subscription:', subscriptionError)
      return NextResponse.json({ error: "Failed to create subscription" }, { status: 500 })
    }

    // Store payment in our database
    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .insert({
        user_id: user.id,
        subscription_id: subscription.id,
        payment_plan_id: plan.id,
        dodo_payment_id: dodoPayment.payment_id,
        amount_cents: plan.price_cents,
        currency: plan.currency,
        status: "pending",
        payment_link: dodoPayment.payment_link,
      })
      .select()
      .single()

    if (paymentError) {
      console.error('Error storing payment:', paymentError)
      // Payment was created in DodoPayments but failed to store locally
      // This is OK, webhook will handle it
    }

    return NextResponse.json({
      payment_id: dodoPayment.payment_id,
      payment_link: dodoPayment.payment_link,
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
