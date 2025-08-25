"use client"

import Link from "next/link"
import { FramerButton } from "@/components/ui/framer-button"
import { ChevronRight, Sparkles } from "lucide-react"

export default function PricingSection() {
  return (
    <section id="pricing" className="px-4 py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-gray-500 italic text-lg mb-4">Simple Pricing</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            One Plan, Unlimited Possibilities
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-tight">
            Transform your resume into a professional website with unlimited edits and uploads. No monthly fees, just one simple payment.
          </p>
        </div>

        {/* Split Layout - Left Content, Right Pricing Card */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Benefits List */}
          <div className="space-y-12">
            <div className="border-l-2 border-gray-200 pl-8">
              <h3 className="text-2xl font-bold text-black mb-3">Unlimited Everything</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Upload as many resumes as you want and edit them unlimited times. Perfect for job seekers who need to tailor their websites for different opportunities.
              </p>
              <div className="text-sm text-gray-500">∞ Unlimited edits and PDF uploads</div>
            </div>

            <div className="border-l-2 border-gray-200 pl-8">
              <h3 className="text-2xl font-bold text-black mb-3">High Traffic Ready</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Your website can handle up to 50,000 visits per year, More than enough for portfolio sites. Share it with recruiters, on LinkedIn, or anywhere else without worrying about limits.
              </p>
              <div className="text-sm text-gray-500">📈 Up to 50k visits included</div>
            </div>

            <div className="border-l-2 border-gray-200 pl-8">
              <h3 className="text-2xl font-bold text-black mb-3">One-Time Payment</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Pay once and get full access for an entire year. No hidden fees, no monthly subscriptions, no surprises. Just straightforward pricing.
              </p>
              <div className="text-sm text-gray-500">💰 No monthly fees ever</div>
            </div>
          </div>

          {/* Right - Pricing Card */}
          <div className="flex justify-center">
            <div className="bg-gray-50 rounded-3xl p-12 border border-gray-200 text-center max-w-sm w-full relative mt-8">
              {/* Launch Special Banner */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1 sm:gap-2 shadow-lg whitespace-nowrap">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="hidden sm:inline">🚀 PEERLIST LAUNCH SPECIAL</span>
                  <span className="sm:hidden">🚀 LAUNCH SPECIAL</span>
                </div>
              </div>
              
              <div className="mb-8 mt-6">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="text-3xl font-bold text-gray-400 line-through">$12</span>
                  <div className="text-6xl font-bold text-black">$4.99</div>
                </div>
                <div className="text-gray-600 text-lg">One-time payment</div>
                <div className="text-sm text-orange-600 font-semibold mt-1">
                  Regular price $12/year starts Monday!
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Unlimited Edits</span>
                  <span className="font-semibold text-black">✓</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Unlimited PDF Uploads</span>
                  <span className="font-semibold text-black">✓</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Up to 50k Visits</span>
                  <span className="font-semibold text-black">✓</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">One Year Access</span>
                  <span className="font-semibold text-black">✓</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Monthly fees</span>
                  <span className="font-semibold text-black">$0</span>
                </div>
              </div>

              <Link href="/login">
                <FramerButton 
                  variant="primary" 
                  icon={<ChevronRight className="w-4 h-4" />} 
                  className="text-md py-6 group relative overflow-hidden w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                >
                  Get Pro Access for $4.99
                </FramerButton>
              </Link>
              <p className="text-xs text-gray-500 mt-2">
                30-day money-back guarantee • Launch price ends soon!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}