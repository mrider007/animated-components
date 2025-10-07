"use client"

import React from "react"

type IconProps = { className?: string }

export const IconClose = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const IconCheck = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const IconRotate = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M7 7a7 7 0 109.9 9.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 7V3m0 4h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const IconFlipH = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M4 12h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10 6l-4 6 4 6V6zM14 6v12l4-6-4-6z" fill="currentColor" />
  </svg>
)

export const IconFlipV = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 20V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6 10l6-4 6 4H6zM6 14h12l-6 4-6-4z" fill="currentColor" />
  </svg>
)

export const IconZoomIn = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11 8v6M8 11h6M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const IconZoomOut = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 11h6M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const IconMove = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M12 3l3 3-3 3-3-3 3-3zm0 12l3 3-3 3-3-3 3-3zM3 12l3-3 3 3-3 3-3-3zm12 0l3-3 3 3-3 3-3-3z"
      fill="currentColor"
    />
  </svg>
)

export const IconReset = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M4 7v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M20 17A8 8 0 106 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const IconDownload = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M12 3v10m0 0l-4-4m4 4l4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M5 19h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const IconAdjust = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 4a8 8 0 000 16V4z" fill="currentColor" />
  </svg>
)

export const IconFilter = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M4 6h16l-6 7v5l-4 2v-7L4 6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
)

export const IconRotateCw = IconRotate
