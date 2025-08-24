import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const { data: plans, error } = await supabase
      .from("payment_plans")
      .select("id, name, description, dodo_product_id, price_cents, currency")
      .eq("is_active", true)
      .order("price_cents", { ascending: true })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: "Failed to fetch payment plans" }, { status: 500 })
    }

    const response = NextResponse.json({ plans: plans || [] })
    
    // Add caching headers
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
    response.headers.set('CDN-Cache-Control', 'public, max-age=300')
    response.headers.set('Vercel-CDN-Cache-Control', 'public, max-age=300')
    
    return response
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
