'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from '@/components/LoadingScreen'
import CustomCursor from '@/components/CustomCursor'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import { About, Projects, Value, Contact } from '@/components/Sections'

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.body.style.overflowX = 'hidden'
    return () => {
      document.body.style.overflowX = 'auto'
    }
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      {!loading && (
        <div className="app">
          <CustomCursor />
          <Navigation />
          <main>
            <Hero />
            <Services />
            <About />
            <Projects />
            <Value />
            <Contact />
          </main>
        </div>
      )}
    </>
  )
}
