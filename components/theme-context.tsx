"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'ghibli'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem('folio-theme') as Theme
    if (savedTheme && ['light', 'dark', 'ghibli'].includes(savedTheme)) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    // Apply theme to document and save to localStorage
    const root = document.documentElement
    root.classList.remove('light', 'dark', 'ghibli')
    root.classList.add(theme)
    localStorage.setItem('folio-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    const themes: Theme[] = ['light', 'ghibli', 'dark']
    const currentIndex = themes.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}