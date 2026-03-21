import { useRef } from 'react'
import { useInView, type UseInViewOptions } from 'framer-motion'

export function useScrollAnimation(options?: UseInViewOptions) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: '-80px',
    ...options,
  })

  return { ref, isInView }
}

export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
}
