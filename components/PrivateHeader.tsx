"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronDown, LogOut, User, Upload, Eye } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import type { User as SupabaseUser } from '@supabase/supabase-js'

interface PrivateHeaderProps {
  user?: SupabaseUser | null
}

export default function PrivateHeader({ user: propUser }: PrivateHeaderProps) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(propUser || null)
  const [loading, setLoading] = useState(!propUser)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    if (!propUser) {
      const getUser = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
        setLoading(false)
      }
      getUser()
    }
  }, [supabase, propUser])

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.profile-dropdown-container')) {
        setShowProfileDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return (
      <motion.div className="fixed inset-x-0 top-0 z-40 w-full pt-2">
        <motion.div className="relative z-[60] mx-auto w-[70%] max-w-6xl flex items-center justify-between rounded-lg bg-white/95 border border-gray-200 px-6 py-3 hidden backdrop-blur-lg lg:flex">
          <div className="h-8 w-32 animate-pulse rounded bg-gray-200"></div>
          <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200"></div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <>
      {/* Desktop Header */}
      <motion.div className="fixed inset-x-0 top-0 z-40 w-full pt-2">
        <motion.div className="relative z-[60] mx-auto w-[70%] max-w-6xl flex items-center justify-between rounded-lg bg-white/95 border border-gray-200 px-6 py-3 hidden backdrop-blur-lg lg:flex">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-2 cursor-pointer">
              <Image 
                src="/logo.svg" 
                alt="Self.so Logo" 
                width={120} 
                height={32} 
                className="w-32 h-8"
                style={{ width: 'auto' }}
              />
            </a>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link href="/upload" className="text-sm text-gray-600 hover:text-black transition-colors font-medium cursor-pointer">
              Upload
            </Link>
            <Link href="/preview" className="text-sm text-gray-600 hover:text-black transition-colors font-medium cursor-pointer">
              Preview
            </Link>
          </div>

          {/* Profile Dropdown */}
          <div className="relative profile-dropdown-container">
            <button 
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-white">
                  {user?.email?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-700 max-w-[120px] truncate">
                {user?.user_metadata?.full_name || user?.email?.split('@')[0] || "User"}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            
            {showProfileDropdown && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg border border-gray-200 shadow-lg z-50"
              >
                <div className="p-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <p className="text-sm font-medium text-gray-900 truncate">{user?.email}</p>
                  </div>
                </div>
                <Link href="/upload">
                  <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 cursor-pointer">
                    <Upload className="w-4 h-4" />
                    Upload Resume
                  </button>
                </Link>
                <Link href="/preview">
                  <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 cursor-pointer">
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Mobile Header */}
        <motion.div className="relative z-50 mx-auto flex w-[95%] max-w-[calc(100vw-1rem)] items-center justify-between bg-white/95 border border-gray-200 rounded-lg backdrop-blur-lg py-3 px-4 lg:hidden">
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-2">
              <Image 
                src="/logo.svg" 
                alt="Self.so Logo" 
                width={100} 
                height={28} 
                className="w-24 h-7"
                style={{ width: 'auto' }}
              />
            </a>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Mobile Profile Button */}
            <div className="relative profile-dropdown-container">
              <button 
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors cursor-pointer"
              >
                <span className="text-sm font-medium text-gray-700">
                  {user?.email?.charAt(0).toUpperCase() || "U"}
                </span>
              </button>
              
              {showProfileDropdown && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg border border-gray-200 shadow-lg z-50"
                >
                  <div className="p-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <p className="text-sm font-medium text-gray-900 truncate">{user?.email}</p>
                    </div>
                  </div>
                  <Link href="/upload">
                    <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Upload
                    </button>
                  </Link>
                  <Link href="/preview">
                    <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  )
}