"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface PaymentPlanProps {
  onSuccess: () => void
  onError: (error: string) => void
  isProcessing: boolean
  setIsProcessing: (processing: boolean) => void
}

export default function PaymentPlan({ onSuccess, onError, isProcessing, setIsProcessing }: PaymentPlanProps) {
  const { toast, dismiss } = useToast()

  const handlePurchase = async () => {
    setIsProcessing(true)
    const loadingToastId = toast({
      title: "Creating payment...",
      description: "Please wait while we process your request."
    })

    try {
      const response = await fetch("/api/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: "pro-plan" // This should match your DodoPayments product ID
        })
      })

      if (!response.ok) {
        throw new Error("Failed to create payment")
      }

      const { payment_link } = await response.json()
      
      // Dismiss loading toast before redirect
      dismiss(loadingToastId.id)
      
      // Redirect to payment page
      window.location.href = payment_link
    } catch (error) {
      dismiss(loadingToastId.id)
      const errorMessage = error instanceof Error ? error.message : "Failed to create payment. Please try again."
      onError(errorMessage)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="text-center">
        {/* Plan Header */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro Plan</h3>
          <p className="text-gray-600">Unlimited website generation</p>
        </div>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline justify-center">
            <span className="text-4xl font-bold text-gray-900">$9</span>
            <span className="text-gray-500 ml-1">one-time</span>
          </div>
        </div>

        {/* Features */}
        <div className="mb-8">
          <ul className="space-y-3 text-left">
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Unlimited website generation</span>
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Professional resume websites</span>
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Custom domain support</span>
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Lifetime access</span>
            </li>
          </ul>
        </div>

        {/* CTA Button */}
        <Button
          onClick={handlePurchase}
          disabled={isProcessing}
          className="w-full bg-black hover:bg-gray-800 text-white py-3 px-6 text-lg font-medium rounded-lg transition-colors duration-200"
        >
          {isProcessing ? "Processing..." : "Upgrade to Pro - $9"}
        </Button>
        
        <p className="text-xs text-gray-500 mt-2">
          One-time payment, lifetime access
        </p>

        {/* Additional Info */}
        <p className="text-xs text-gray-500 mt-4">
          Secure payment powered by DodoPayments
        </p>
      </div>
    </div>
  )
}
