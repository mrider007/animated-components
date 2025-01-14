'use client'

import { useState, useEffect } from 'react'
import { BaseAnimationProps } from '../types/animation-types'

interface RippleButtonProps extends BaseAnimationProps {
  children: React.ReactNode
  onClick?: () => void
}

export function RippleButton({
  children,
  className = '',
  size = 'md',
  color = 'currentColor',
  duration = 600,
  onClick
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([])
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }

  useEffect(() => {
    ripples.forEach(ripple => {
      const timer = setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== ripple.id))
      }, duration)
      return () => clearTimeout(timer)
    })
  }, [ripples, duration])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setRipples(prev => [...prev, { x, y, id: Date.now() }])
    onClick?.()
  }

  return (
    <button
      onClick={handleClick}
      className={`relative overflow-hidden rounded-lg bg-gray-800 text-white ${sizeClasses[size]} ${className}`}
    >
      <style jsx>{`
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/30"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 20,
            height: 20,
            marginLeft: -10,
            marginTop: -10,
            animation: `ripple ${duration}ms linear`,
          }}
        />
      ))}
      {children}
    </button>
  )
}

