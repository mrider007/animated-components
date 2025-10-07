"use client"

import React from "react"

type Props = {
  icon?: React.ReactNode
  label: string
  value: number
  onChange: (v: number) => void
  onChangeEnd?: () => void
  min: number
  max: number
  step?: number
  unit?: string
}

export const SliderControl = ({ icon, label, value, onChange, onChangeEnd, min, max, step = 1, unit }: Props) => {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <label style={{ fontSize: 12, fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
          {icon}
          {label}
        </label>
        <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>
          {Math.round(value * 10) / 10}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        onMouseUp={onChangeEnd}
        onTouchEnd={onChangeEnd}
      />
    </div>
  )
}
