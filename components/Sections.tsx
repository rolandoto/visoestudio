// About.tsx
'use client'

import { useRef ,useState} from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50])

  const text = "Perfect over done. Curiosity over routine. Visions over strategy. Simplicity over special effects. Fans over target groups. Less over more. Value over price. Long-lasting over short-hyped. Time-efficiency over bla bla. Partner over supplier. Make over talk. This is Favorit Studio."
  const words = text.split(' ')
  const highlights = ['Perfect', 'Curiosity', 'Visions', 'Simplicity', 'Fans', 'Less', 'Value', 'Long-lasting', 'Time-efficiency', 'Partner', 'Make']

  return (
    <section className="about" id="about" ref={ref}>
      <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.8 }}>
        <h2>About</h2>
        <div className="section-line" />
      </motion.div>

      <motion.div className="about-content" style={{ y }}>
        {words.map((word, i) => {
          const isHighlight = highlights.includes(word)
          return (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: i * 0.015, ease: [0.215, 0.61, 0.355, 1] }}
              className={isHighlight ? 'highlight' : ''}
              whileHover={isHighlight ? { scale: 1.15, y: -5, transition: { type: 'spring', stiffness: 500 } } : {}}
            >
              {word}{' '}
            </motion.span>
          )
        })}
      </motion.div>

      <motion.div className="about-decoration" initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : { scaleX: 0 }} transition={{ duration: 1.5, delay: 0.5 }} />
    </section>
  )
}


interface ProjectProps {
  project: { name: string; url: string; images: number }
  index: number
}

function Project({ project, index }: ProjectProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const [currentSlide, setCurrentSlide] = useState(0)

  return (
    <motion.div
      ref={ref}
      className="project"
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
    >
      <div className="project-header">
        <motion.h3 whileHover={{ x: 15 }} transition={{ type: 'spring', stiffness: 300 }}>
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            <span className="project-number">{String(index + 1).padStart(2, '0')}</span>
            <span className="project-name">{project.name}</span>
            <motion.span className="project-arrow" whileHover={{ x: 5, y: -5 }}>↗</motion.span>
          </a>
        </motion.h3>
      </div>

      <div className="project-gallery">
        {[...Array(Math.min(4, project.images))].map((_, i) => (
          <motion.div
            key={i}
            className="project-image"
            initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
            animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : { opacity: 0, scale: 0.8, rotateY: -20 }}
            transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
            whileHover={{ scale: 0.97, rotate: i % 2 === 0 ? 2 : -2, transition: { type: 'spring', stiffness: 300 } }}
          >
            <div className="image-placeholder">
              <motion.div className="image-shimmer" animate={{ x: ['-100%', '100%'] }} transition={{ repeat: Infinity, duration: 2.5, ease: 'linear', repeatDelay: 2, delay: i * 0.3 }} />
              <div className="image-overlay" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="project-nav">
        <motion.button whileHover={{ scale: 1.05, x: -5 }} whileTap={{ scale: 0.95 }} onClick={() => setCurrentSlide((prev) => (prev - 1 + project.images) % project.images)} className="project-nav-btn">
          <span>←</span>
          <span>Prev</span>
        </motion.button>
        <div className="project-pagination">
          {[...Array(project.images)].map((_, i) => (
            <motion.div key={i} className="pagination-dot" animate={{ scale: i === currentSlide ? 1.5 : 1, opacity: i === currentSlide ? 1 : 0.3 }} transition={{ type: 'spring', stiffness: 400 }} />
          ))}
        </div>
        <motion.button whileHover={{ scale: 1.05, x: 5 }} whileTap={{ scale: 0.95 }} onClick={() => setCurrentSlide((prev) => (prev + 1) % project.images)} className="project-nav-btn">
          <span>Next</span>
          <span>→</span>
        </motion.button>
      </div>
    </motion.div>
  )
}

export function Projects() {
  const projects = [
    { name: 'Favorit & Co', url: 'https://www.favoritco.com', images: 6 },
    { name: 'nftartday.com', url: 'https://www.nftartday.com', images: 7 },
    { name: 'Golden Slam', url: 'https://www.goldenslam.tennis', images: 4 },
    { name: 'Sanbera', url: 'https://www.sanbera.com', images: 5 },
    { name: 'Frigg.eco', url: 'https://www.frigg.eco', images: 3 }
  ]

  return (
    <section className="projects" id="projects">
      <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-15%' }} transition={{ duration: 0.8 }}>
        <h2>Projects</h2>
        <div className="section-line" />
      </motion.div>

      <div className="project-list">
        {projects.map((project, i) => (
          <Project key={project.name} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}

export function Value() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const y = useTransform(scrollYProgress, [0, 1], [200, -200])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 0.7])
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5])

  return (
    <section className="value" ref={ref}>
      <motion.h2 style={{ y, opacity, scale, rotate }} className="value-title">
        We create value.
      </motion.h2>
      <div className="value-gradient-orb value-gradient-orb-1" />
      <div className="value-gradient-orb value-gradient-orb-2" />
    </section>
  )
}


export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-15%' })

  const contactLinks = [
    { label: 'Mail', href: 'mailto:sj@favorit.studio', icon: '✉' },
    { label: 'Instagram', href: 'https://www.instagram.com/favorit.studio', icon: '📷' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/stefanjandl/', icon: '💼' }
  ]

  return (
    <section className="contact" id="contact" ref={ref}>
      <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.8 }}>
        <h2>Contact</h2>
        <div className="section-line" />
      </motion.div>

      <motion.div className="contact-content" initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} transition={{ duration: 1, delay: 0.2 }}>
        <div className="contact-info">
          <motion.div className="contact-card" whileHover={{ scale: 1.02, y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
            <h3>Favorit Studio</h3>
            <p className="contact-subtitle">GmbH</p>
            <motion.a href="https://maps.app.goo.gl/iRZvr6YoVzPFzBxH6" target="_blank" rel="noopener noreferrer" whileHover={{ x: 10 }} className="contact-address">
              <span>Hotelstrasse 1</span>
              <span>Zurich Airport</span>
            </motion.a>

            <div className="contact-partner">
              <a href="https://www.agenturkoch.ch" target="_blank" rel="noopener noreferrer">
                Partner of<br />
                <strong>Agentur Koch</strong>
              </a>
            </div>
          </motion.div>

          <div className="social-links">
            {contactLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.label !== 'Mail' ? '_blank' : undefined}
                rel={link.label !== 'Mail' ? 'noopener noreferrer' : undefined}
                className="social-link"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.05, x: 10, transition: { type: 'spring', stiffness: 400 } }}
              >
                <span className="social-icon">{link.icon}</span>
                <span className="social-label">{link.label}</span>
                <span className="social-arrow">→</span>
              </motion.a>
            ))}
          </div>
        </div>

        <motion.div className="contact-image" whileHover={{ scale: 1.03, rotate: 1 }} transition={{ type: 'spring', stiffness: 300 }}>
          <div className="image-placeholder">
            <motion.div className="image-shimmer" animate={{ x: ['-100%', '100%'] }} transition={{ repeat: Infinity, duration: 2, ease: 'linear', repeatDelay: 1.5 }} />
          </div>
        </motion.div>
      </motion.div>

      <motion.div className="back-to-top" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.8 }}>
        <motion.a href="#top" whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
          <span>Back to top</span>
          <motion.span animate={{ y: [-3, 0, -3] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}>↑</motion.span>
        </motion.a>
      </motion.div>

      <div className="contact-decoration" />
    </section>
  )
}
