"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { Zap, Users, Clock, Palette, Globe, Shield } from 'lucide-react'

export function FeaturesSection() {
  const features = [
    {
      title: "60-second setup",
      description: "Upload your resume, get a website. No technical skills needed.",
      icon: <Zap className="h-6 w-6" />,
    },
    {
      title: "Mobile-friendly design",
      description: "Looks perfect on phones, tablets, and computers. Always.",
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: "Custom domain",
      description: "Get yourname.com instead of a messy link. Looks professional.",
      icon: <Globe className="h-6 w-6" />,
    },
    {
      title: "9 beautiful themes",
      description: "Choose from professional designs that match your industry.",
      icon: <Palette className="h-6 w-6" />,
    },
    {
      title: "Real-time editing",
      description: "Update your website instantly. No waiting, no delays.",
      icon: <Clock className="h-6 w-6" />,
    },
    {
      title: "Privacy focused",
      description: "Your data stays secure. No tracking, no ads, no nonsense.",
      icon: <Shield className="h-6 w-6" />,
    },
  ]

  return (
    <section id="features" className="px-4 py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-design-black mb-4 font-mono">
            Everything you need to get hired
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-tight mb-4 font-mono">
            Simple tools that make you look professional
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
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-design-black font-mono">
          {title}
        </span>
      </div>
      <p className="text-md text-gray-600 max-w-xs relative z-10 px-10 font-mono">{description}</p>
    </div>
  )
}