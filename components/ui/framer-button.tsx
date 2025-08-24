"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FramerButtonProps {
  children: React.ReactNode
  className?: string
  iconClassName?: string
  icon?: React.ReactNode
  variant?: "primary" | "secondary" | "outline"
  onClick?: () => void
}

export const FramerButton = ({
  children,
  className,
  iconClassName,
  icon,
  variant = "secondary",
  onClick,
}: FramerButtonProps) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background cursor-pointer"
  
  const variantClasses = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    outline: "border border-gray-200 bg-white hover:bg-gray-50"
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        baseClasses,
        variantClasses[variant],
        className
      )}
    >
      {icon && (
        <span className={cn("mr-2", iconClassName)}>
          {icon}
        </span>
      )}
      {children}
    </motion.button>
  )
}