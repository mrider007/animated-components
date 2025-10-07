"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { SliderControl } from "./SliderControl" 

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number }
const I = ({ children, size = 16, ...props }: IconProps & { children?: React.ReactNode }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    {children}
  </svg>
)

// Icons (minimal geometry)
const Crop = (p: IconProps) => (
  <I {...p}>
    <path d="M7 3v10a4 4 0 0 0 4 4h10" />
    <path d="M3 7h10a4 4 0 0 1 4 4v10" />
  </I>
)
const Palette = (p: IconProps) => (
  <I {...p}>
    <path d="M12 3a9 9 0 1 0 0 18c1.5 0 3-.9 3-2.5a2.5 2.5 0 0 0-2.5-2.5H11a3 3 0 0 1 0-6h1" />
    <circle cx="8.5" cy="8.5" r="1" />
    <circle cx="15.5" cy="7.5" r="1" />
    <circle cx="7.5" cy="13.5" r="1" />
  </I>
)
const Sparkles = (p: IconProps) => (
  <I {...p}>
    <path d="M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5L12 3z" />
    <path d="M18 14l.8 1.8L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-1.2L18 14z" />
  </I>
)
const RotateCw = (p: IconProps) => (
  <I {...p}>
    <path d="M20 5v6h-6" />
    <path d="M20 11a8 8 0 1 1-2.34-5.66" />
  </I>
)
const FlipHorizontal = (p: IconProps) => (
  <I {...p}>
    <path d="M3 12h18" />
    <path d="M12 3l-6 9 6 9V3z" />
  </I>
)
const FlipVertical = (p: IconProps) => (
  <I {...p}>
    <path d="M12 3v18" />
    <path d="M3 12l9-6 9 6H3z" />
  </I>
)
const ZoomIn = (p: IconProps) => (
  <I {...p}>
    <circle cx="11" cy="11" r="6" />
    <path d="M21 21l-4.3-4.3" />
    <path d="M11 8v6M8 11h6" />
  </I>
)
const Sun = (p: IconProps) => (
  <I {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l-1.4-1.4M20.4 20.4 19 19M19 5l1.4-1.4M4.6 20.4 6 19" />
  </I>
)
const Contrast = (p: IconProps) => (
  <I {...p}>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 4a8 8 0 0 1 0 16V4z" />
  </I>
)
const Droplet = (p: IconProps) => (
  <I {...p}>
    <path d="M12 3s-5 6-5 9a5 5 0 0 0 10 0c0-3-5-9-5-9z" />
  </I>
)
const Aperture = (p: IconProps) => (
  <I {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3.6 15h8.8M6 6l4.4 7.6M18 6l-4.4 7.6M8 19l7.6-4.4M16 19l-4.4-7.6" />
  </I>
)
const X = (p: IconProps) => (
  <I {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </I>
)
const Check = (p: IconProps) => (
  <I {...p}>
    <path d="M20 6 9 17l-5-5" />
  </I>
)
const Undo2 = (p: IconProps) => (
  <I {...p}>
    <path d="M9 14H4l5-5" />
    <path d="M4 14a8 8 0 1 0 8-8" />
  </I>
)
const Redo2 = (p: IconProps) => (
  <I {...p}>
    <path d="M15 9h5l-5 5" />
    <path d="M20 9a8 8 0 1 0-8 8" />
  </I>
)
const ChevronLeft = (p: IconProps) => (
  <I {...p}>
    <path d="M15 18 9 12l6-6" />
  </I>
)
const ChevronRight = (p: IconProps) => (
  <I {...p}>
    <path d="M9 6 15 12 9 18" />
  </I>
)

// TypeScript types for props and state
type CropArea = { x: number; y: number; width: number; height: number }
type HistoryState = {
  rotation: number
  flipH: boolean
  flipV: boolean
  zoom: number
  brightness: number
  contrast: number
  saturation: number
  blur: number
  hue: number
  grayscale: number
  sepia: number
  invert: number
  vignette: number
  cropArea: CropArea
  dataUrl: string | null
  panX: number
  panY: number
}
type ImageEditorProps = {
  imageFile: File
  onSave: (file: File) => void
  onCancel: () => void
  className?: string
}

const ImageEditor = ({ imageFile, onSave, onCancel, className = "" }: ImageEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [activeTab, setActiveTab] = useState<"crop" | "adjust" | "filters" | "transform">("crop")
  const [workingImage, setWorkingImage] = useState<HTMLImageElement | null>(null)
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(true)

  const [cropArea, setCropArea] = useState<CropArea>({ x: 0, y: 0, width: 100, height: 100 })
  const [aspectRatio, setAspectRatio] = useState<string>("free")
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  const [rotation, setRotation] = useState(0)
  const [flipH, setFlipH] = useState(false)
  const [flipV, setFlipV] = useState(false)
  const [zoom, setZoom] = useState(1)

  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [saturation, setSaturation] = useState(100)
  const [blur, setBlur] = useState(0)
  const [hue, setHue] = useState(0)
  const [grayscale, setGrayscale] = useState(0)
  const [sepia, setSepia] = useState(0)
  const [invert, setInvert] = useState(0)
  const [vignette, setVignette] = useState(0)
  const [history, setHistory] = useState<HistoryState[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const [panX, setPanX] = useState(0)
  const [panY, setPanY] = useState(0)
  const [isPanning, setIsPanning] = useState(false)
  const panStartRef = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null)

  const aspectRatios = [
    { id: "free", label: "Free", ratio: null },
    { id: "1:1", label: "1:1", ratio: 1 },
    { id: "16:9", label: "16:9 H", ratio: 16 / 9 },
    { id: "9:16", label: "9:16 V", ratio: 9 / 16 },
    { id: "4:3", label: "4:3 H", ratio: 4 / 3 },
    { id: "3:4", label: "3:4 V", ratio: 3 / 4 },
    { id: "4:5", label: "4:5 V", ratio: 4 / 5 },
    { id: "5:4", label: "5:4 H", ratio: 5 / 4 },
  ]

  const filters = [
    {
      id: "none",
      name: "Original",
      values: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        blur: 0,
        hue: 0,
        grayscale: 0,
        sepia: 0,
        invert: 0,
        vignette: 0,
      },
    },
    {
      id: "vivid",
      name: "Vivid",
      values: {
        brightness: 110,
        contrast: 125,
        saturation: 145,
        blur: 0,
        hue: 0,
        grayscale: 0,
        sepia: 0,
        invert: 0,
        vignette: 8,
      },
    },
    {
      id: "warm",
      name: "Warm",
      values: {
        brightness: 105,
        contrast: 108,
        saturation: 112,
        blur: 0,
        hue: 12,
        grayscale: 0,
        sepia: 10,
        invert: 0,
        vignette: 10,
      },
    },
    {
      id: "cool",
      name: "Cool",
      values: {
        brightness: 98,
        contrast: 110,
        saturation: 92,
        blur: 0,
        hue: -12,
        grayscale: 0,
        sepia: 0,
        invert: 0,
        vignette: 6,
      },
    },
    {
      id: "bw",
      name: "B&W",
      values: {
        brightness: 100,
        contrast: 125,
        saturation: 0,
        blur: 0,
        hue: 0,
        grayscale: 100,
        sepia: 0,
        invert: 0,
        vignette: 14,
      },
    },
    {
      id: "vintage",
      name: "Vintage",
      values: {
        brightness: 96,
        contrast: 92,
        saturation: 82,
        blur: 0.4,
        hue: 15,
        grayscale: 12,
        sepia: 18,
        invert: 0,
        vignette: 18,
      },
    },
    {
      id: "matte",
      name: "Matte",
      values: {
        brightness: 104,
        contrast: 88,
        saturation: 90,
        blur: 0,
        hue: 0,
        grayscale: 0,
        sepia: 6,
        invert: 0,
        vignette: 12,
      },
    },
    {
      id: "noir",
      name: "Noir",
      values: {
        brightness: 92,
        contrast: 135,
        saturation: 0,
        blur: 0,
        hue: 0,
        grayscale: 100,
        sepia: 0,
        invert: 0,
        vignette: 24,
      },
    },
    {
      id: "pastel",
      name: "Pastel",
      values: {
        brightness: 108,
        contrast: 92,
        saturation: 85,
        blur: 0,
        hue: 8,
        grayscale: 0,
        sepia: 4,
        invert: 0,
        vignette: 6,
      },
    },
    {
      id: "cinematic",
      name: "Cinematic",
      values: {
        brightness: 102,
        contrast: 118,
        saturation: 95,
        blur: 0,
        hue: -6,
        grayscale: 0,
        sepia: 8,
        invert: 0,
        vignette: 22,
      },
    },
    {
      id: "tealorange",
      name: "Teal & Orange",
      values: {
        brightness: 104,
        contrast: 112,
        saturation: 125,
        blur: 0,
        hue: 10,
        grayscale: 0,
        sepia: 6,
        invert: 0,
        vignette: 14,
      },
    },
    {
      id: "film",
      name: "Film",
      values: {
        brightness: 98,
        contrast: 92,
        saturation: 90,
        blur: 0.2,
        hue: 5,
        grayscale: 10,
        sepia: 16,
        invert: 0,
        vignette: 20,
      },
    },
    {
      id: "dream",
      name: "Dream",
      values: {
        brightness: 110,
        contrast: 90,
        saturation: 105,
        blur: 0.5,
        hue: 12,
        grayscale: 0,
        sepia: 4,
        invert: 0,
        vignette: 12,
      },
    },
  ]
  const getCurrentState = useCallback(async () => {
    const canvas = canvasRef.current
    let dataUrl = null
    if (canvas) {
      try {
        dataUrl = canvas.toDataURL("image/png")
      } catch {
        dataUrl = null
      }
    }
    return {
      rotation,
      flipH,
      flipV,
      zoom,
      brightness,
      contrast,
      saturation,
      blur,
      hue,
      grayscale,
      sepia,
      invert,
      vignette,
      cropArea,
      dataUrl,
      panX,
      panY,
    }
  }, [
    rotation,
    flipH,
    flipV,
    zoom,
    brightness,
    contrast,
    saturation,
    blur,
    hue,
    grayscale,
    sepia,
    invert,
    vignette,
    cropArea,
    panX,
    panY,
  ])

  // push history (makes a snapshot of current canvas)
  const saveToHistory = useCallback(() => {
    getCurrentState().then((state) => {
      const newHistory = history.slice(0, historyIndex + 1)
      newHistory.push(state)
      setHistory(newHistory)
      setHistoryIndex(newHistory.length - 1)
    })
  }, [getCurrentState, history, historyIndex])

  const applyState = useCallback(
    async (state: Partial<HistoryState>) => {
      if (!state) return
      setRotation(state.rotation ?? 0)
      setFlipH(state.flipH ?? false)
      setFlipV(state.flipV ?? false)
      setZoom(state.zoom ?? 1)
      setBrightness(state.brightness ?? 100)
      setContrast(state.contrast ?? 100)
      setSaturation(state.saturation ?? 100)
      setBlur(state.blur ?? 0)
      setHue(state.hue ?? 0)
      setGrayscale(state.grayscale ?? 0)
      setSepia(state.sepia ?? 0)
      setInvert(state.invert ?? 0)
      setVignette(state.vignette ?? 0)
      setCropArea(state.cropArea ?? { x: 0, y: 0, width: 100, height: 100 })
      setPanX(state.panX ?? 0)
      setPanY(state.panY ?? 0)
      if (state.dataUrl) {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.src = state.dataUrl
        await new Promise((res) => (img.onload = res))
        setWorkingImage(img)
        requestAnimationFrame(() => drawCanvas(img, state))
      } else if (workingImage) {
        drawCanvas(workingImage, state)
      }
    },
    [workingImage],
  )

  const undo = useCallback(async () => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1]
      await applyState(prev)
      setHistoryIndex(historyIndex - 1)
    }
  }, [historyIndex, history, applyState])

  const redo = useCallback(async () => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1]
      await applyState(next)
      setHistoryIndex(historyIndex + 1)
    }
  }, [historyIndex, history, applyState])

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile)
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.src = url
      img.onload = () => {
        URL.revokeObjectURL(url)
        setOriginalImage(img)
        setWorkingImage(img)
        drawCanvas(img)
        saveToHistory()
      }
    }
  }, [imageFile])

  useEffect(() => {
    if (workingImage) drawCanvas(workingImage)
  }, [
    rotation,
    flipH,
    flipV,
    zoom,
    brightness,
    contrast,
    saturation,
    blur,
    hue,
    grayscale,
    sepia,
    invert,
    vignette,
    workingImage,
    panX,
    panY,
  ])

  const drawCanvas = (img: HTMLImageElement, stateOverride: Partial<HistoryState> | null = null) => {
    const canvas = canvasRef.current
    if (!canvas || !img) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const maxWidth = Math.min(window.innerWidth - 48, 1600)
    const maxHeight = Math.min(window.innerHeight - 220, 1200)

    let width = img.width
    let height = img.height

    if (width > maxWidth || height > maxHeight) {
      const ratio = Math.min(maxWidth / width, maxHeight / height)
      width = Math.round(width * ratio)
      height = Math.round(height * ratio)
    }

    canvas.width = width
    canvas.height = height

    ctx.save()
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const s = stateOverride || {
      rotation,
      flipH,
      flipV,
      zoom,
      brightness,
      contrast,
      saturation,
      blur,
      hue,
      grayscale,
      sepia,
      invert,
      vignette,
      panX,
      panY,
    }

    ctx.filter = `grayscale(${(s as any).grayscale || 0}%) sepia(${(s as any).sepia || 0}%) invert(${(s as any).invert || 0}%) brightness(${(s as any).brightness}%) contrast(${(s as any).contrast}%) saturate(${(s as any).saturation}%) blur(${(s as any).blur}px) hue-rotate(${(s as any).hue}deg)`

    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate((((s as any).rotation || 0) * Math.PI) / 180)
    ctx.scale((s as any).flipH ? -1 : 1, (s as any).flipV ? -1 : 1)
    ctx.scale((s as any).zoom, (s as any).zoom)
    ctx.translate((s as any).panX || 0, (s as any).panY || 0)

    ctx.drawImage(img, -width / 2, -height / 2, width, height)
    ctx.restore()

    // vignette overlay
    const v = (s as any).vignette || 0
    if (v > 0) {
      const intensity = Math.min(0.6, (v / 100) * 0.6)
      const g = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        Math.min(canvas.width, canvas.height) * 0.2,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) * 0.65,
      )
      g.addColorStop(0, "rgba(0,0,0,0)")
      g.addColorStop(1, `rgba(0,0,0,${intensity})`)
      ctx.fillStyle = g
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  }

  interface PointerPosition {
    x: number
    y: number
  }

  type PointerEventLike = React.MouseEvent | React.TouchEvent | { touches?: { [key: number]: { clientX: number; clientY: number } }; clientX?: number; clientY?: number }

  const getPointer = (e: PointerEventLike): PointerPosition => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    const clientX =
      "touches" in e && e.touches
        ? e.touches[0].clientX
        : (e as React.MouseEvent).clientX
    const clientY =
      "touches" in e && e.touches
        ? e.touches[0].clientY
        : (e as React.MouseEvent).clientY
    return {
      x: ((clientX - rect.left) / rect.width) * 100,
      y: ((clientY - rect.top) / rect.height) * 100,
    }
  }

  const handleCropStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (activeTab !== "crop") return;
    const p = getPointer(e);
    setIsDragging(true);
    dragStart.current = { x: p.x, y: p.y };
    setCropArea({ x: p.x, y: p.y, width: 0, height: 0 });
  };

  interface DragStartRef {
    x: number
    y: number
  }

  const handleCropMove = (
    e: React.MouseEvent | React.TouchEvent
  ): void => {
    if (!isDragging || activeTab !== "crop") return
    const p = getPointer(e)
    const width = p.x - dragStart.current.x
    let height = p.y - dragStart.current.y

    if (aspectRatio !== "free") {
      const ratio = aspectRatios.find((r) => r.id === aspectRatio)?.ratio
      if (ratio) {
        const absWidth = Math.abs(width)
        height = (width < 0 ? -1 : 1) * (absWidth / ratio)
      }
    }

    setCropArea({
      x: width < 0 ? p.x : dragStart.current.x,
      y: height < 0 ? p.y : dragStart.current.y,
      width: Math.abs(width),
      height: Math.abs(height),
    })
  }
  const handleCropEnd = async () => {
    if (!isDragging) return
    setIsDragging(false)
    // applyCrop() // removed auto-apply crop
  }

  const applyCrop = async () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const cropX = (cropArea.x / 100) * canvas.width
    const cropY = (cropArea.y / 100) * canvas.height
    const cropWidth = (cropArea.width / 100) * canvas.width
    const cropHeight = (cropArea.height / 100) * canvas.height

    if (cropWidth <= 0 || cropHeight <= 0) return

    const temp = document.createElement("canvas")
    temp.width = Math.round(cropWidth)
    temp.height = Math.round(cropHeight)
    const tctx = temp.getContext("2d")
    const imgData = ctx.getImageData(cropX, cropY, cropWidth, cropHeight)
    tctx?.putImageData(imgData, 0, 0)

    const dataUrl = temp.toDataURL("image/png")
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = dataUrl
    await new Promise((res) => (img.onload = res))
    setWorkingImage(img)
    setCropArea({ x: 0, y: 0, width: 100, height: 100 })
    drawCanvas(img)
    saveToHistory()
  }

  const applyFilter = (filter: { values: any }) => {
    const v = filter.values
    setBrightness(v.brightness)
    setContrast(v.contrast)
    setSaturation(v.saturation)
    setBlur(v.blur)
    setHue(v.hue)
    setGrayscale(v.grayscale ?? 0)
    setSepia(v.sepia ?? 0)
    setInvert(v.invert ?? 0)
    setVignette(v.vignette ?? 0)
    requestAnimationFrame(() => saveToHistory())
  }

  const handleReset = () => {
    setRotation(0)
    setFlipH(false)
    setFlipV(false)
    setZoom(1)
    setBrightness(100)
    setContrast(100)
    setSaturation(100)
    setBlur(0)
    setHue(0)
    setGrayscale(0)
    setSepia(0)
    setInvert(0)
    setVignette(0)
    setCropArea({ x: 0, y: 0, width: 100, height: 100 })
    setPanX(0)
    setPanY(0)
    if (originalImage) setWorkingImage(originalImage)
    requestAnimationFrame(() => workingImage && drawCanvas(workingImage))
    saveToHistory()
  }

  const handleSave = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], imageFile.name, { type: "image/png" })
        onSave(file)
      }
    })
  }

  const tabs = [
    { id: "crop", label: "Crop", icon: Crop },
    { id: "adjust", label: "Adjust", icon: Palette },
    { id: "filters", label: "Filters", icon: Sparkles },
    { id: "transform", label: "Transform", icon: RotateCw },
  ]

  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 640 : false)
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n))
  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault()
    const factor = e.deltaY > 0 ? 0.95 : 1.05
    setZoom((z) => clamp(z * factor, 0.5, 4))
  }
  const pinchStart = useRef<number | null>(null)
  const startZoom = useRef<number>(1)
  const getTouchDistance = (touches: TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX
    const dy = touches[0].clientY - touches[1].clientY
    return Math.hypot(dx, dy)
  }

  // add pan handlers for Transform tab
  const handlePanStart = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX
    const clientY = "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY
    panStartRef.current = { x: clientX - rect.left, y: clientY - rect.top, panX, panY }
    setIsPanning(true)
  }
  const handlePanMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isPanning || !panStartRef.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX
    const clientY = "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY
    const dx = clientX - rect.left - panStartRef.current.x
    const dy = clientY - rect.top - panStartRef.current.y
    setPanX(panStartRef.current.panX + dx / Math.max(zoom, 0.01))
    setPanY(panStartRef.current.panY + dy / Math.max(zoom, 0.01))
  }
  const handlePanEnd = () => {
    if (isPanning) {
      setIsPanning(false)
      saveToHistory()
    }
  }

  const handleTouchStartEnhanced = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      pinchStart.current = getTouchDistance(e.touches as unknown as TouchList)
      startZoom.current = zoom
    } else {
      if (activeTab === "transform") handlePanStart(e)
      else handleCropStart(e as React.TouchEvent<HTMLDivElement>)
    }
  }
  const handleTouchMoveEnhanced = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchStart.current) {
      const dist = getTouchDistance(e.touches as unknown as TouchList)
      const scale = dist / pinchStart.current
      setZoom(clamp(startZoom.current * scale, 0.5, 4))
    } else {
      if (activeTab === "transform") handlePanMove(e)
      else handleCropMove(e)
    }
  }
  const handleTouchEndEnhanced = (e: React.TouchEvent) => {
    if (e.touches.length < 2) pinchStart.current = null
    if (activeTab === "transform") handlePanEnd()
    else handleCropEnd()
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        e.preventDefault()
        if (e.shiftKey) redo()
        else undo()
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault()
        handleSave()
      }
      if (e.key.toLowerCase() === "r") {
        e.preventDefault()
        handleReset()
      }
      if (e.key.toLowerCase() === "p") {
        e.preventDefault()
        setIsPanelOpen((v) => !v)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [undo, redo])

  return createPortal(
    <div className={`image-editor-root ${className}`} style={{ position: "fixed", inset: 0, zIndex: 50 }}>
      <style>{`
        .image-editor-root{
          display:flex;height:100vh;width:100vw;
          background: var(--background); color: var(--foreground);
          --ie-surface: var(--card);
          --ie-border: var(--border);
          --ie-primary: var(--primary);
          --ie-primary-foreground: var(--primary-foreground);
          --ie-muted: var(--muted);
          --ie-muted-foreground: var(--muted-foreground);
        }
        .ie-header{
          display:flex;align-items:center;justify-content:space-between;
          padding:12px;border-bottom:1px solid var(--ie-border);
          background: var(--ie-surface);
        }
        .ie-canvas-wrap{flex:1;display:flex;align-items:center;justify-content:center;padding:16px;overflow:auto}
        .ie-canvas{
          max-width:100%;max-height:calc(100vh - 12rem);
          border:1px solid var(--ie-border);border-radius:12px;
          box-shadow:0 20px 40px -16px color-mix(in oklab, var(--foreground) 10%, transparent);
          background: var(--muted);
        }
        .ie-bottom-tabs{border-top:1px solid var(--ie-border);background:var(--ie-surface);padding:12px}
        .ie-panel{border-left:1px solid var(--ie-border);background:var(--ie-surface);overflow:hidden}
        .ie-divider{width:1px;height:20px;background:var(--ie-border);margin:0 4px}
        .ie-icon-accent{color: var(--primary)}
        .ie-btn{display:inline-flex;align-items:center;gap:6px;border:none;cursor:pointer}
        .ie-btn--ghost{background:transparent;color:var(--foreground);padding:8px;border-radius:10px}
        .ie-btn--ghost[disabled]{opacity:.35;cursor:not-allowed}
        .ie-btn--ghost:hover{background:color-mix(in oklab, var(--foreground) 12%, transparent)}
        .ie-btn--primary{background:var(--ie-primary);color:var(--ie-primary-foreground);padding:8px 12px;border-radius:10px;font-weight:600}
        .ie-btn--primary:hover{filter:brightness(.98)}
        .ie-btn--icon{padding:8px;border-radius:10px;background:transparent}
        .ie-tab{display:flex;align-items:center;gap:6px;padding:6px 12px;border-radius:10px;border:none;cursor:pointer;font-size:14px;font-weight:500}
        .ie-tab--active{background:var(--ie-primary);color:var(--ie-primary-foreground)}
        .ie-tab--idle{background:transparent;color:var(--foreground)}
        .ie-chip{padding:6px 8px;border-radius:8px;font-size:12px;font-weight:500;border:none;cursor:pointer;background:var(--muted);color:var(--muted-foreground)}
        .ie-chip--active{background:var(--ie-primary);color:var(--ie-primary-foreground)}
        .ie-apply{width:100%;background:var(--ie-primary);color:var(--ie-primary-foreground);padding:8px 12px;border-radius:10px;font-size:14px;font-weight:600;border:none;cursor:pointer}
        .ie-filter{width:100%;text-align:left;padding:8px 12px;border-radius:10px;background:var(--muted);color:var(--muted-foreground);border:none;cursor:pointer;font-size:14px;font-weight:500}
        .ie-toggle{flex:1;padding:8px 12px;border-radius:10px;font-size:14px;font-weight:500;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;background:var(--muted);color:var(--muted-foreground)}
        .ie-toggle--on{background:var(--ie-primary);color:var(--ie-primary-foreground)}
        input[type="range"]{width:100%;height:6px;background:var(--muted);border-radius:9999px;outline:none;cursor:pointer}
        input[type="range"]::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:14px;height:14px;border-radius:50%;background:var(--ie-primary);cursor:pointer}
        input[type="range"]::-moz-range-thumb{width:14px;height:14px;border-radius:50%;background:var(--ie-primary);cursor:pointer;border:none}
        @media (max-width:640px){
          .image-editor-root{flex-direction:column}
          .ie-panel{position:fixed;left:0;right:0;bottom:calc(56px + env(safe-area-inset-bottom));height:48vh;width:100%;border-left:none;border-top:1px solid var(--ie-border)}
          .ie-toggle-panel{right:8px;top:auto;bottom:calc(48vh + 56px + env(safe-area-inset-bottom));}
          .ie-header{padding:10px}
          .ie-canvas-wrap{padding:8px}
          .ie-canvas{max-height:calc(100vh - 56px - env(safe-area-inset-bottom) - 48vh - 40px)}
          .ie-bottom-bar{
            position:fixed;left:0;right:0;bottom:0;
            height:calc(56px + env(safe-area-inset-bottom));
            background:var(--ie-surface);border-top:1px solid var(--ie-border);
            display:flex;align-items:center;gap:8px;padding:8px;
            padding-bottom:calc(8px + env(safe-area-inset-bottom));
          }
        }
        /* cursor feedback while panning */
        .ie-canvas-wrap.panning { cursor: grabbing; }
      `}</style>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div className="ie-header" style={{ alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Aperture className="ie-icon-accent" size={20} />
            <h2 style={{ fontSize: 14, fontWeight: 600 }}>Image Editor</h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              aria-label="Undo"
              onClick={undo}
              disabled={historyIndex <= 0}
              title="Undo"
              className="ie-btn ie-btn--ghost"
            >
              <Undo2 size={16} />
            </button>
            <button
              aria-label="Redo"
              onClick={redo}
              disabled={historyIndex >= history.length - 1}
              title="Redo"
              className="ie-btn ie-btn--ghost"
            >
              <Redo2 size={16} />
            </button>
            <div className="ie-divider" />
            <button aria-label="Reset" onClick={handleReset} title="Reset" className="ie-btn ie-btn--ghost">
              Reset
            </button>
            <button aria-label="Save" onClick={handleSave} title="Save" className="ie-btn ie-btn--primary">
              <Check size={14} />
              <span style={{ marginLeft: 6 }}>Save</span>
            </button>
            <button aria-label="Cancel" onClick={onCancel} title="Cancel" className="ie-btn ie-btn--ghost ie-btn--icon">
              <X size={16} />
            </button>
          </div>
        </div>

        <div
          className={`ie-canvas-wrap ${isPanning ? "panning" : ""}`}
          onMouseDown={(e) => (activeTab === "crop" ? handleCropStart(e) : handlePanStart(e))}
          onMouseMove={(e) => (activeTab === "crop" ? handleCropMove(e) : handlePanMove(e))}
          onMouseUp={() => (activeTab === "crop" ? handleCropEnd() : handlePanEnd())}
          onMouseLeave={() => (activeTab === "crop" ? handleCropEnd() : handlePanEnd())}
          onWheel={onWheel}
          onTouchStart={handleTouchStartEnhanced}
          onTouchMove={handleTouchMoveEnhanced}
          onTouchEnd={handleTouchEndEnhanced}
        >
          <div style={{ position: "relative" }}>
            <canvas ref={canvasRef} className="ie-canvas" />

            {activeTab === "crop" && cropArea.width > 0 && cropArea.height > 0 && (
              <div
                style={{
                  position: "absolute",
                  left: `${cropArea.x}%`,
                  top: `${cropArea.y}%`,
                  width: `${cropArea.width}%`,
                  height: `${cropArea.height}%`,
                  border: "2px solid var(--ie-primary)",
                  boxShadow: "0 0 0 9999px color-mix(in oklab, var(--foreground) 75%, transparent)",
                  pointerEvents: "none",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "grid",
                    gridTemplateColumns: "repeat(3,1fr)",
                    gridTemplateRows: "repeat(3,1fr)",
                  }}
                >
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      style={{ border: "1px solid color-mix(in oklab, var(--ie-primary) 30%, transparent)" }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="ie-bottom-tabs">
          <div style={{ display: "flex", alignItems: "center", gap: 8, overflowX: "auto" }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`ie-tab ${activeTab === tab.id ? "ie-tab--active" : "ie-tab--idle"}`}
                aria-pressed={activeTab === tab.id}
              >
                <tab.icon size={14} />
                {!isMobile && <span style={{ marginLeft: 6 }}>{tab.label}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isPanelOpen && (
          <motion.div
            initial={isMobile ? { y: 300, opacity: 1 } : { width: 0, opacity: 0 }}
            animate={isMobile ? { y: 0, opacity: 1 } : { width: "min(360px, 32vw)", opacity: 1 }}
            exit={isMobile ? { y: 300, opacity: 1 } : { width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            className="ie-panel"
          >
            <div
              style={{ width: isMobile ? "100%" : "min(360px, 32vw)", height: "100%", overflowY: "auto", padding: 16 }}
            >
              {isMobile ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div
                    style={{
                      width: 40,
                      height: 4,
                      borderRadius: 9999,
                      background: "var(--ie-border)",
                      marginBottom: 12,
                    }}
                  />
                </div>
              ) : null}
              <AnimatePresence mode="wait">
                {activeTab === "crop" && (
                  <motion.div
                    key="crop"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    style={{ display: "flex", flexDirection: "column", gap: "12px" }}
                  >
                    <div>
                      <label
                        style={{
                          fontSize: "12px",
                          fontWeight: 500,
                          marginBottom: "8px",
                          display: "block",
                          color: "var(--foreground)",
                        }}
                      >
                        Aspect Ratio
                      </label>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px" }}>
                        {aspectRatios.map((ratio) => (
                          <button
                            key={ratio.id}
                            onClick={() => setAspectRatio(ratio.id)}
                            className={`ie-chip ${aspectRatio === ratio.id ? "ie-chip--active" : ""}`}
                          >
                            {ratio.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    {cropArea.width > 0 && (
                      <button onClick={applyCrop} className="ie-apply">
                        Apply Crop
                      </button>
                    )}
                  </motion.div>
                )}

                {activeTab === "adjust" && (
                  <motion.div
                    key="adjust"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-3"
                  >
                    <SliderControl
                      icon={<Sun size={14} className="ie-icon-accent" />}
                      label="Brightness"
                      value={brightness}
                      onChange={setBrightness}
                      onChangeEnd={saveToHistory}
                      min={0}
                      max={200}
                      unit="%"
                    />
                    <SliderControl
                      icon={<Contrast size={14} className="ie-icon-accent" />}
                      label="Contrast"
                      value={contrast}
                      onChange={setContrast}
                      onChangeEnd={saveToHistory}
                      min={0}
                      max={200}
                      unit="%"
                    />
                    <SliderControl
                      icon={<Droplet size={14} className="ie-icon-accent" />}
                      label="Saturation"
                      value={saturation}
                      onChange={setSaturation}
                      onChangeEnd={saveToHistory}
                      min={0}
                      max={200}
                      unit="%"
                    />
                    <SliderControl
                      icon={<Aperture size={14} />}
                      label="Blur"
                      value={blur}
                      onChange={setBlur}
                      onChangeEnd={saveToHistory}
                      min={0}
                      max={10}
                      step={0.1}
                      unit="px"
                    />
                    <SliderControl
                      icon={<Palette size={14} className="ie-icon-accent" />}
                      label="Hue"
                      value={hue}
                      onChange={setHue}
                      onChangeEnd={saveToHistory}
                      min={-180}
                      max={180}
                      unit="°"
                    />
                    <SliderControl
                      icon={
                        <I size={14}>
                          <path d="M4 12h16" />
                        </I>
                      }
                      label="Grayscale"
                      value={grayscale}
                      onChange={setGrayscale}
                      onChangeEnd={saveToHistory}
                      min={0}
                      max={100}
                      unit="%"
                    />
                    <SliderControl
                      icon={
                        <I size={14}>
                          <path d="M4 20c8-8 8-8 16 0" />
                        </I>
                      }
                      label="Sepia"
                      value={sepia}
                      onChange={setSepia}
                      onChangeEnd={saveToHistory}
                      min={0}
                      max={100}
                      unit="%"
                    />
                    <SliderControl
                      icon={
                        <I size={14}>
                          <circle cx="12" cy="12" r="6" />
                          <path d="M18 6l-12 12" />
                        </I>
                      }
                      label="Invert"
                      value={invert}
                      onChange={setInvert}
                      onChangeEnd={saveToHistory}
                      min={0}
                      max={100}
                      unit="%"
                    />
                    <SliderControl
                      icon={
                        <I size={14}>
                          <circle cx="12" cy="12" r="9" />
                        </I>
                      }
                      label="Vignette"
                      value={vignette}
                      onChange={setVignette}
                      onChangeEnd={saveToHistory}
                      min={0}
                      max={100}
                      unit="%"
                    />
                  </motion.div>
                )}

                {activeTab === "filters" && (
                  <motion.div
                    key="filters"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    style={{ display: "flex", flexDirection: "column", gap: "6px" }}
                  >
                    {filters.map((filter) => (
                      <button key={filter.id} onClick={() => applyFilter(filter)} className="ie-filter">
                        {filter.name}
                      </button>
                    ))}
                  </motion.div>
                )}

                {activeTab === "transform" && (
                  <motion.div
                    key="transform"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    style={{ display: "flex", flexDirection: "column", gap: "12px" }}
                  >
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        onClick={() => {
                          setRotation((r) => (r - 90 + 360) % 360)
                          saveToHistory()
                        }}
                        className="ie-toggle"
                      >
                        -90°
                      </button>
                      <button
                        onClick={() => {
                          setRotation((r) => (r + 90) % 360)
                          saveToHistory()
                        }}
                        className="ie-toggle"
                      >
                        +90°
                      </button>
                    </div>
                    <SliderControl
                      icon={<RotateCw size={14} />}
                      label="Rotation"
                      value={rotation}
                      onChange={setRotation}
                      onChangeEnd={saveToHistory}
                      min={0}
                      max={360}
                      unit="°"
                    />
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => {
                          setFlipH(!flipH)
                          saveToHistory()
                        }}
                        className={`ie-toggle ${flipH ? "ie-toggle--on" : ""}`}
                      >
                        Flip H
                      </button>
                      <button
                        onClick={() => {
                          setFlipV(!flipV)
                          saveToHistory()
                        }}
                        className={`ie-toggle ${flipV ? "ie-toggle--on" : ""}`}
                      >
                        Flip V
                      </button>
                    </div>
                    <SliderControl
                      icon={<ZoomIn size={14} />}
                      label="Zoom"
                      value={zoom}
                      onChange={setZoom}
                      onChangeEnd={saveToHistory}
                      min={0.5}
                      max={3}
                      step={0.1}
                      unit="x"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsPanelOpen(!isPanelOpen)}
        className="ie-toggle-panel ie-btn ie-btn--ghost ie-btn--icon"
        style={{
          position: "absolute",
          right: isPanelOpen ? (isMobile ? 8 : "min(360px, 32vw)") : 0,
          top: "50%",
          transform: "translateY(-50%)",
        }}
        aria-label={isPanelOpen ? "Collapse panel" : "Expand panel"}
      >
        {isPanelOpen ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
      {isMobile && (
        <div className="ie-bottom-bar">
          <button onClick={handleSave} className="ie-btn ie-btn--primary">
            Save
          </button>
          <button onClick={handleReset} className="ie-btn ie-btn--ghost">
            Reset
          </button>
          <div style={{ flex: 1 }} />
          <button
            onClick={undo}
            disabled={historyIndex <= 0}
            className="ie-btn ie-btn--ghost ie-btn--icon"
            title="Undo"
            aria-label="Undo"
          >
            <Undo2 />
          </button>
          <button
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            className="ie-btn ie-btn--ghost ie-btn--icon"
            title="Redo"
            aria-label="Redo"
          >
            <Redo2 />
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 8, overflowX: "auto" }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`ie-tab ${activeTab === tab.id ? "ie-tab--active" : "ie-tab--idle"}`}
                aria-pressed={activeTab === tab.id}
              >
                <tab.icon size={14} />
                {!isMobile && <span style={{ marginLeft: 6 }}>{tab.label}</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>,
    document.body,
  )
}

export default ImageEditor
