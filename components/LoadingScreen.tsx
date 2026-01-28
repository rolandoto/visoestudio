'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 300)
          return 100
        }
        return prev + 2
      })
    }, 20)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="loading-content">
        <motion.div
          className="loading-logo"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Viso estudio
        </motion.div>
        <div className="loading-bar">
          <motion.div
            className="loading-progress"
            style={{ width: `${progress}%` }}
          />
        </div>
        <motion.div
          className="loading-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {progress}%
        </motion.div>
      </div>
    </motion.div>
  )
}
