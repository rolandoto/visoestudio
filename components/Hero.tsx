'use client'

import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'
import { useRef } from 'react'

export default function Hero() {
  const { scrollY } = useScroll()
  const heroRef = useRef(null)

  const y1 = useTransform(scrollY, [0, 1000], [0, 500])
  const y2 = useTransform(scrollY, [0, 1000], [0, 300])
  const opacity = useTransform(scrollY, [0, 500], [1, 0])
  const scale = useTransform(scrollY, [0, 500], [1, 0.85])
  const blur = useTransform(scrollY, [0, 500], [0, 10])
  const blurFilter = useMotionTemplate`blur(${blur}px)`

  const titleText = "Viso estudio animacion"
  const titleWords = titleText.split(' ')

  return (
    <section className="hero" ref={heroRef}>
      <motion.div className="hero-content" style={{ opacity, scale, filter: blurFilter }}>
        <div className="hero-title-wrapper">
          <h1 className="hero-title">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                className="hero-title-word"
                initial={{ opacity: 0, y: 100, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: [0.215, 0.61, 0.355, 1] }}
              >
                {word.split('').map((letter, j) => (
                  <motion.span
                    key={j}
                    className="hero-title-letter"
                    whileHover={{ y: -10, rotateZ: Math.random() * 10 - 5, transition: { type: 'spring', stiffness: 300 } }}
                  >
                    {letter}
                  </motion.span>
                ))}
                {i < titleWords.length - 1 && ' '}
              </motion.span>
            ))}
          </h1>
        </div>

       
      </motion.div>

      <motion.div className="scroll-indicator" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: 1 }}>
        <motion.div className="scroll-line" animate={{ scaleY: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }} />
        <span>Scroll to explore</span>
      </motion.div>

      <div className="hero-gradient-orb hero-gradient-orb-1" />
      <div className="hero-gradient-orb hero-gradient-orb-2" />
    </section>
  )
}
