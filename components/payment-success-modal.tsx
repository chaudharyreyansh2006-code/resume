"use client"

import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface PaymentSuccessModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PaymentSuccessModal({ isOpen, onClose }: PaymentSuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader className="text-center">
          <div className="flex flex-col items-center gap-4">
            {/* Success Icon */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <DialogTitle className="text-2xl font-bold text-gray-900">Welcome to Pro!</DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="text-center">
          <div className="space-y-4">
            <p className="text-lg text-gray-700">
              Your Pro subscription has been activated successfully!
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-medium">
                You now have <span className="font-bold text-green-900">1 year of access</span> for a professional portfolio website!
              </p>
            </div>
            <p className="text-sm text-gray-600">
              Start creating unlimited websites with your Pro account.
            </p>
          </div>
        </div>
        
        <DialogFooter className="justify-center">
          <Button 
            onClick={onClose}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-2"
          >
            Start Creating Websites
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}