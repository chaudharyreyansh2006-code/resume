"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { Zap, Smartphone, Brain, Palette, Globe, Shield } from 'lucide-react'

export function FeaturesSection() {
  const features = [
    {
      title: "60-Second Setup",
      description: "Upload your PDF resume and get a live website instantly. No waiting, no complexity.",
      icon: <Zap className="h-6 w-6" />,
    },
    {
      title: "AI-Powered Processing",
      description: "Our AI extracts and structures your resume data automatically. Perfect formatting every time.",
      icon: <Brain className="h-6 w-6" />,
    },
    {
      title: "Mobile-Perfect Design",
      description: "Looks stunning on all devices. Your website works perfectly on phones, tablets, and desktops.",
      icon: <Smartphone className="h-6 w-6" />,
    },
    {
      title: "9 Professional Themes",
      description: "Choose from beautiful, industry-appropriate designs. Find the perfect look for your profession.",
      icon: <Palette className="h-6 w-6" />,
    },
    {
      title: "Custom Domain",
      description: "Get cvfolio.me/yourname instead of messy URLs. Professional domain for your personal brand.",
      icon: <Globe className="h-6 w-6" />,
    },
    {
      title: "Privacy-Focused",
      description: "Your data stays secure. No tracking, no ads, complete privacy protection.",
      icon: <Shield className="h-6 w-6" />,
    },
  ]

  return (
    <section id="features" className="px-4 py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-design-black mb-4 ">
            Everything you need to know about CVFolio
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-tight mb-4 ">
            Everything you need to transform your boring PDF into a stunning professional website
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string
  description: string
  icon: React.ReactNode
  index: number
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature border-gray-200",
        (index === 0 || index === 3) && "lg:border-l border-gray-200",
        index < 3 && "lg:border-b border-gray-200",
      )}
    >
      {index < 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-gray-100 to-transparent pointer-events-none" />
      )}
      {index >= 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-gray-100 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-gray-600">{icon}</div>
      <div className="text-xl font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-gray-300 group-hover/feature:bg-design-black transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-design-black ">
          {title}
        </span>
      </div>
      <p className="text-md text-gray-600 max-w-xs relative z-10 px-10 ">{description}</p>
    </div>
  )
}