import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { headers } from "next/headers"
import crypto from "crypto"

const WEBHOOK_SECRET = process.env.DODO_WEBHOOK_SECRET!
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = await headers()

    // Get webhook headers as per Standard Webhooks spec
    const webhookId = headersList.get("webhook-id")
    const webhookSignature = headersList.get("webhook-signature")
    const webhookTimestamp = headersList.get("webhook-timestamp")

    if (!webhookId || !webhookSignature || !webhookTimestamp) {
      return NextResponse.json({ error: "Missing webhook headers" }, { status: 400 })
    }

    // Verify webhook signature using Standard Webhooks approach
    const isValid = verifyWebhookSignature(webhookId, webhookTimestamp, body, webhookSignature, WEBHOOK_SECRET)

    if (!isValid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    // Parse the webhook payload
    const webhookData = JSON.parse(body)

    // Process webhook event

    // Process the webhook based on event type
    if (webhookData.type === "payment.succeeded") {
      await handlePaymentSucceeded(webhookData)
    } else if (webhookData.type === "payment.failed") {
      await handlePaymentFailed(webhookData)
    } else if (webhookData.type === "payment.cancelled") {
      await handlePaymentCancelled(webhookData)
    } else {
      // Unhandled webhook type - no action needed
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}

function verifyWebhookSignature(
  webhookId: string,
  webhookTimestamp: string,
  payload: string,
  webhookSignature: string,
  secret: string,
): boolean {
  try {
    // Remove whsec_ prefix if present
    const cleanSecret = secret.startsWith("whsec_") ? secret.substring(6) : secret

    // Decode the base64 secret
    const key = Buffer.from(cleanSecret, "base64")

    // Create the signed payload: msgId.timestamp.payload
    const signedPayload = `${webhookId}.${webhookTimestamp}.${payload}`

    // Create HMAC SHA256 signature and encode as base64
    const expectedSignature = crypto.createHmac("sha256", key).update(signedPayload, "utf8").digest("base64")

    // Parse received signatures (can be multiple: "v1,sig1 v1,sig2")
    const receivedSignatures = webhookSignature.split(" ")

    // Check each signature
    for (const versionedSignature of receivedSignatures) {
      const [version, signature] = versionedSignature.split(",")

      if (version !== "v1") {
        continue
      }

      // Use timing-safe comparison
      if (signature && timingSafeEqual(signature, expectedSignature)) {
        return true
      }
    }

    return false
  } catch (error) {
    return false
  }
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false
  }

  const bufferA = Buffer.from(a, "utf8")
  const bufferB = Buffer.from(b, "utf8")

  return crypto.timingSafeEqual(bufferA, bufferB)
}

async function handlePaymentSucceeded(webhookData: any) {
  try {
    const paymentData = webhookData.data
    const paymentId = paymentData.id || paymentData.payment_id

    // Find the payment in our database using the DodoPayments payment ID
    const { data: existingPayment, error: paymentError } = await supabase
      .from("payments")
      .select("*, subscription_id")
      .eq("dodo_payment_id", paymentId)
      .single()

    if (paymentError || !existingPayment) {
      // Payment not found in our database - this shouldn't happen with the new flow
      console.error("Payment not found in database:", paymentId)
      return
    }

    // Update payment status to completed
    await supabase
      .from("payments")
      .update({ status: "completed" })
      .eq("id", existingPayment.id)

    // If this payment has a subscription_id, activate the subscription
    if (existingPayment.subscription_id) {
      const { error: subscriptionError } = await supabase
        .from("subscriptions")
        .update({
          status: "active",
          activated_at: new Date().toISOString(),
        })
        .eq("id", existingPayment.subscription_id)

      if (subscriptionError) {
        console.error("Failed to activate subscription:", subscriptionError)
        return
      }
    }

    // Log the webhook event for tracking
    await logWebhookEvent(webhookData.type, existingPayment.id, webhookData.business_id)

  } catch (error) {
    console.error("Payment processing failed:", error)
  }
}

async function handlePaymentFailed(webhookData: any) {
  try {
    const paymentData = webhookData.data
    const paymentId = paymentData.id || paymentData.payment_id

    // Find the payment in our database
    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .select("id, subscription_id")
      .eq("dodo_payment_id", paymentId)
      .single()

    if (paymentError || !payment) {
      return
    }

    // Update payment status to failed
    const { error: updateError } = await supabase
      .from("payments")
      .update({
        status: "failed",
      })
      .eq("dodo_payment_id", paymentId)

    if (updateError) {
      return
    }

    // If this payment has a subscription_id, mark the subscription as failed
    if (payment.subscription_id) {
      await supabase
        .from("subscriptions")
        .update({
          status: "failed",
        })
        .eq("id", payment.subscription_id)
    }

    // Log the webhook event for tracking
    await logWebhookEvent(webhookData.type, payment.id, webhookData.business_id)

  } catch (error) {
    console.error("Payment failed handling error:", error)
  }
}

async function handlePaymentCancelled(webhookData: any) {
  try {
    const paymentData = webhookData.data
    const paymentId = paymentData.id || paymentData.payment_id

    // Find the payment in our database
    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .select("id, subscription_id")
      .eq("dodo_payment_id", paymentId)
      .single()

    if (paymentError || !payment) {
      return
    }

    // Update payment status to cancelled
    const { error: updateError } = await supabase
      .from("payments")
      .update({
        status: "cancelled",
      })
      .eq("dodo_payment_id", paymentId)

    if (updateError) {
      return
    }

    // If this payment has a subscription_id, mark the subscription as cancelled
    if (payment.subscription_id) {
      await supabase
        .from("subscriptions")
        .update({
          status: "cancelled",
        })
        .eq("id", payment.subscription_id)
    }

    // Log the webhook event for tracking
    await logWebhookEvent(webhookData.type, payment.id, webhookData.business_id)

  } catch (error) {
    console.error("Payment cancelled handling error:", error)
  }
}

// Helper function to log webhook events consistently
async function logWebhookEvent(eventType: string, paymentId: string, businessId?: string) {
  try {
    const eventId = `${businessId || 'unknown'}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const { error: logError } = await supabase.from("webhook_events").insert({
      event_id: eventId,
      event_type: eventType,
      payment_id: paymentId,
      processed: true,
    })

    if (logError) {
      return false
    }

    return true
  } catch (error) {
    return false
  }
}
