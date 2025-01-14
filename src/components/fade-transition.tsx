'use client'

import { BaseAnimationProps } from '../types/animation-types'
import { useState, useEffect } from 'react'

interface FadeTransitionProps extends BaseAnimationProps {
  children: React.ReactNode
  show: boolean
}

export function FadeTransition({
  children,
  className = '',
  duration = 300,
  show
}: FadeTransitionProps) {
  const [render, setRender] = useState(show)

  useEffect(() => {
    if (show) setRender(true)
    else {
      const timer = setTimeout(() => setRender(false), duration)
      return () => clearTimeout(timer)
    }
  }, [show, duration])

  if (!render) return null

  return (
    <div
      className={className}
      style={{
        opacity: show ? 1 : 0,
        transition: `opacity ${duration}ms ease-in-out`
      }}
    >
      {children}
    </div>
  )
}

