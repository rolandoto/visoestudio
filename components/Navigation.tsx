
import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  const [counter, setCounter] = useState('000')

  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (latest) => {
      const percent = Math.round(latest * 100)
      setCounter(String(percent).padStart(3, '0'))
      setScrolled(latest > 0.01)
    })

    return () => unsubscribe()
  }, [smoothProgress])

 
  return (
    <>
      <motion.nav
        className="nav"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      >
        <div className="nav-content">
          <motion.div
            className="logo"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <span className="logo-main">
                <Image
                src="/logo.png"
                alt=''
                width={50}
                height={50}

                />
            </span>
          </motion.div>
          <motion.div
            className="scroll-progress-bar"
            style={{
              scaleX: smoothProgress,
              transformOrigin: '0%'
            }}
          />

          <motion.div
            className="counter"
            animate={{ 
              opacity: scrolled ? 1 : 0.2,
              scale: scrolled ? 1 : 0.95
            }}
            transition={{ duration: 0.3 }}
          >
            <span className="counter-number">{counter}</span>
            <span className="counter-label">%</span>
          </motion.div>

          <motion.button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="menu-text">Menu</span>
            <div className="menu-icon">
              <motion.span 
                className="menu-line"
                animate={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                className="menu-line"
                animate={{ width: '70%' }}
                transition={{ duration: 0.3, delay: 0.1 }}
              />
            </div>
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="nav-menu"
              initial="closed"
              animate="open"
              exit="closed"
            >
              <motion.button
                className="close-menu"
                onClick={() => setMenuOpen(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <div className="close-icon">
                  <span />
                  <span />
                </div>
              </motion.button>

              <div className="menu-content">
                <div className="menu-links">
                  {[
                    { name: 'About', href: '#about' },
                    { name: 'Projects', href: '#projects' },
                    { name: 'Contact', href: '#contact' }
                  ].map((item, i) => (
                    <motion.div
                      key={item.name}
                      className="menu-link-wrapper"

                      custom={i}>
                      <a
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="menu-link" >
                        <span className="menu-link-number">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <motion.span
                          className="menu-link-text"
                          whileHover={{ x: 20 }}
                          transition={{ type: 'spring', stiffness: 300 }}>
                          {item.name}
                        </motion.span>
                        <motion.span
                          className="menu-link-arrow"
                          whileHover={{ x: 10 }} >
                          →
                        </motion.span>
                      </a>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="menu-footer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <div className="menu-footer-links">
                    {['Instagram', 'LinkedIn', 'Mail'].map((social) => (
                      <motion.a
                        key={social}
                        href="#"
                        whileHover={{ x: 5 }}
                        className="menu-footer-link"
                      >
                        {social}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
