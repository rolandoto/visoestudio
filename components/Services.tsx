'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-15%' })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const services = [
    { name: 'Creative', subtitle: 'Direction,' },
    { name: 'Product', subtitle: 'Design,' },
    { name: 'Brand', subtitle: 'Building,' }
  ]

  return (
    <section className="services" ref={ref}>
      <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.8 }}>
        <h2>Services</h2>
        <div className="section-line" />
      </motion.div>

      <div className="services-list">
        {services.map((service, i) => (
          <motion.div
            key={service.name}
            className="service-item"
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
            transition={{ duration: 1, delay: i * 0.2, ease: [0.215, 0.61, 0.355, 1] }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            whileHover={{ x: 30 }}
          >
            <motion.div className="service-number">{String(i + 1).padStart(2, '0')}</motion.div>
            <motion.span className="service-name" animate={{ scale: hoveredIndex === i ? 1.05 : 1 }} transition={{ type: 'spring', stiffness: 300 }}>
              {service.name}
            </motion.span>
            <small className="service-subtitle">{service.subtitle}</small>
            <motion.div className="service-line" initial={{ scaleX: 0 }} animate={{ scaleX: hoveredIndex === i ? 1 : 0 }} transition={{ duration: 0.4 }} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
