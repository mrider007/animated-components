import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageEditorProps {
  imageFile: File;
  onSave: (file: File) => void;
  onCancel: () => void;
  className?: string;
}

interface EditorState {
  rotation: number;
  flipH: boolean;
  flipV: boolean;
  zoom: number;
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  hue: number;
  cropArea: { x: number; y: number; width: number; height: number };
}

// Custom SVG Icons
const CropIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M6 2V6H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 2V6H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 22V18H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 22V18H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="8" y="8" width="8" height="8" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const PaletteIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M20 12C21.1 12 22 12.9 22 14C22 15.1 21.1 16 20 16C18.9 16 18 15.1 18 14C18 12.9 18.9 12 20 12Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M4 12C5.1 12 6 12.9 6 14C6 15.1 5.1 16 4 16C2.9 16 2 15.1 2 14C2 12.9 2.9 12 4 12Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 20C13.1 20 14 20.9 14 22C14 23.1 13.1 24 12 24C10.9 24 10 23.1 10 22C10 20.9 10.9 20 12 20Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M7 7C8.1 7 9 7.9 9 9C9 10.1 8.1 11 7 11C5.9 11 5 10.1 5 9C5 7.9 5.9 7 7 7Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M17 7C18.1 7 19 7.9 19 9C19 10.1 18.1 11 17 11C15.9 11 15 10.1 15 9C15 7.9 15.9 7 17 7Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M7 17C8.1 17 9 17.9 9 19C9 20.1 8.1 21 7 21C5.9 21 5 20.1 5 19C5 17.9 5.9 17 7 17Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M17 17C18.1 17 19 17.9 19 19C19 20.1 18.1 21 17 21C15.9 21 15 20.1 15 19C15 17.9 15.9 17 17 17Z" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const SparklesIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M9.5 1L11 4.5L14.5 6L11 7.5L9.5 11L8 7.5L4.5 6L8 4.5L9.5 1Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M17.5 8L18.5 10.5L21 11.5L18.5 12.5L17.5 15L16.5 12.5L14 11.5L16.5 10.5L17.5 8Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M5.5 13L6.5 15.5L9 16.5L6.5 17.5L5.5 20L4.5 17.5L2 16.5L4.5 15.5L5.5 13Z" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const RotateIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M23 4V10H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1 20V14H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3.51 9C4.01717 7.56678 4.87913 6.2854 6.01547 5.27542C7.1518 4.26543 8.52547 3.55976 10.0083 3.22426C11.4911 2.88875 13.0348 2.93434 14.4952 3.35677C15.9556 3.77921 17.2853 4.56471 18.36 5.64L23 10M1 14L5.64 18.36C6.71475 19.4353 8.04437 20.2208 9.50481 20.6432C10.9652 21.0657 12.5089 21.1113 13.9917 20.7757C15.4745 20.4402 16.8482 19.7346 17.9845 18.7246C19.1209 17.7146 19.9828 16.4332 20.49 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FlipHorizontalIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 3V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M7 7L3 12L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 7L21 12L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FlipVerticalIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 3V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M7 7L12 3L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 17L12 21L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ZoomInIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
    <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M11 8V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 11H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ZoomOutIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
    <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 11H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const SunIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 1V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 21V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M4.22 4.22L5.64 5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M18.36 18.36L19.78 19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M1 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M21 12H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M4.22 19.78L5.64 18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ContrastIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const DropletIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 22C16.4183 22 20 18.4183 20 14C20 8 12 2 12 2C12 2 4 8 4 14C4 18.4183 7.58172 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const ApertureIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <path d="M14.31 8L20.05 17.94" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M9.69 8L3.95 17.94" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M18.62 15L5.38 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 2V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const DownloadIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const XIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const UndoIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 10C3 10 3 9 4 8C5 7 7 5 12 5C17 5 19 7 20 8C21 9 21 10 21 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 10V14C3 14 3 15 4 16C5 17 7 19 12 19C17 19 19 17 20 16C21 15 21 14 21 14V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 10L3 10L5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RedoIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M21 10C21 10 21 9 20 8C19 7 17 5 12 5C7 5 5 7 4 8C3 9 3 10 3 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 10V14C21 14 21 15 20 16C19 17 17 19 12 19C7 19 5 17 4 16C3 15 3 14 3 14V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 10L21 10L19 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronLeftIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronRightIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Imageeditor: React.FC<ImageEditorProps> = ({ 
  imageFile, 
  onSave, 
  onCancel,
  className = ""
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeTab, setActiveTab] = useState('crop');
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 100, height: 100 });
  const [aspectRatio, setAspectRatio] = useState('free');
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [zoom, setZoom] = useState(1);
  
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [blur, setBlur] = useState(0);
  const [hue, setHue] = useState(0);
  
  const [history, setHistory] = useState<EditorState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const aspectRatios = [
    { id: 'free', label: 'Free', ratio: null },
    { id: '1:1', label: '1:1', ratio: 1 },
    { id: '16:9', label: '16:9 H', ratio: 16/9 },
    { id: '9:16', label: '9:16 V', ratio: 9/16 },
    { id: '4:3', label: '4:3 H', ratio: 4/3 },
    { id: '3:4', label: '3:4 V', ratio: 3/4 },
    { id: '4:5', label: '4:5 V', ratio: 4/5 },
    { id: '5:4', label: '5:4 H', ratio: 5/4 },
  ];

  const filters = [
    { id: 'none', name: 'Original', values: { brightness: 100, contrast: 100, saturation: 100, blur: 0, hue: 0 } },
    { id: 'vivid', name: 'Vivid', values: { brightness: 110, contrast: 120, saturation: 140, blur: 0, hue: 0 } },
    { id: 'warm', name: 'Warm', values: { brightness: 105, contrast: 105, saturation: 110, blur: 0, hue: 10 } },
    { id: 'cool', name: 'Cool', values: { brightness: 100, contrast: 110, saturation: 90, blur: 0, hue: -10 } },
    { id: 'bw', name: 'B&W', values: { brightness: 100, contrast: 120, saturation: 0, blur: 0, hue: 0 } },
    { id: 'vintage', name: 'Vintage', values: { brightness: 95, contrast: 90, saturation: 80, blur: 0.5, hue: 15 } },
  ];

  const getCurrentState = useCallback((): EditorState => ({
    rotation,
    flipH,
    flipV,
    zoom,
    brightness,
    contrast,
    saturation,
    blur,
    hue,
    cropArea
  }), [rotation, flipH, flipV, zoom, brightness, contrast, saturation, blur, hue, cropArea]);

  const saveToHistory = useCallback((state?: EditorState) => {
    const currentState = state || getCurrentState();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(currentState);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex, getCurrentState]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      applyState(prevState);
      setHistoryIndex(historyIndex - 1);
    }
  }, [historyIndex, history]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      applyState(nextState);
      setHistoryIndex(historyIndex + 1);
    }
  }, [historyIndex, history]);

  const applyState = useCallback((state: EditorState) => {
    setRotation(state.rotation);
    setFlipH(state.flipH);
    setFlipV(state.flipV);
    setZoom(state.zoom);
    setBrightness(state.brightness);
    setContrast(state.contrast);
    setSaturation(state.saturation);
    setBlur(state.blur);
    setHue(state.hue);
    setCropArea(state.cropArea);
  }, []);

  // Initialize with first state
  useEffect(() => {
    if (imageFile && !originalImage) {
      const img = new Image();
      img.src = URL.createObjectURL(imageFile);
      img.onload = () => {
        setOriginalImage(img);
        const initialState: EditorState = {
          rotation: 0,
          flipH: false,
          flipV: false,
          zoom: 1,
          brightness: 100,
          contrast: 100,
          saturation: 100,
          blur: 0,
          hue: 0,
          cropArea: { x: 0, y: 0, width: 100, height: 100 }
        };
        setHistory([initialState]);
        setHistoryIndex(0);
        drawCanvas(img, initialState);
      };
    }
  }, [imageFile, originalImage]);

  // Draw canvas when state changes
  useEffect(() => {
    if (originalImage) {
      drawCanvas(originalImage, getCurrentState());
    }
  }, [rotation, flipH, flipV, zoom, brightness, contrast, saturation, blur, hue, originalImage, getCurrentState]);

  const drawCanvas = (img: HTMLImageElement, state: EditorState) => {
    const canvas = canvasRef.current
    if (!canvas || !img) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const maxWidth = 1200
    const maxHeight = 800

    let width = img.width
    let height = img.height

    if (width > maxWidth || height > maxHeight) {
      const ratio = Math.min(maxWidth / width, maxHeight / height)
      width *= ratio
      height *= ratio
    }

    canvas.width = width
    canvas.height = height

    ctx.save()
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) blur(${blur}px) hue-rotate(${hue}deg)`

    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate((rotation * Math.PI) / 180)
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1)
    ctx.scale(zoom, zoom)

    ctx.drawImage(img, -width / 2, -height / 2, width, height)
    ctx.restore()
  };

  const handleCropMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (activeTab !== 'crop') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setIsDragging(true);
    setDragStart({ x, y });
    setCropArea({ x, y, width: 0, height: 0 });
  };

  const handleCropMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || activeTab !== 'crop') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    let width = x - dragStart.x;
    let height = y - dragStart.y;
    
    if (aspectRatio !== 'free') {
      const ratio = aspectRatios.find(r => r.id === aspectRatio)?.ratio;
      if (ratio) {
        const absWidth = Math.abs(width);
        height = (width < 0 ? -1 : 1) * (absWidth / ratio);
      }
    }
    
    setCropArea({
      x: width < 0 ? x : dragStart.x,
      y: height < 0 ? y : dragStart.y,
      width: Math.abs(width),
      height: Math.abs(height)
    });
  };

  const handleCropMouseUp = () => {
    setIsDragging(false);
  };

  const applyCrop = () => {
     const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const cropX = (cropArea.x / 100) * canvas.width
    const cropY = (cropArea.y / 100) * canvas.height
    const cropWidth = (cropArea.width / 100) * canvas.width
    const cropHeight = (cropArea.height / 100) * canvas.height

    const imageData = ctx.getImageData(cropX, cropY, cropWidth, cropHeight)
    canvas.width = cropWidth
    canvas.height = cropHeight
    ctx.putImageData(imageData, 0, 0)

    setCropArea({ x: 0, y: 0, width: 100, height: 100 })
    saveToHistory()
  };

  const applyFilter = (filter: typeof filters[0]) => {
    const newState = {
      ...getCurrentState(),
      brightness: filter.values.brightness,
      contrast: filter.values.contrast,
      saturation: filter.values.saturation,
      blur: filter.values.blur,
      hue: filter.values.hue
    };
    applyState(newState);
    saveToHistory(newState);
  };

  const handleReset = () => {
    const resetState: EditorState = {
      rotation: 0,
      flipH: false,
      flipV: false,
      zoom: 1,
      brightness: 100,
      contrast: 100,
      saturation: 100,
      blur: 0,
      hue: 0,
      cropArea: { x: 0, y: 0, width: 100, height: 100 }
    };
    applyState(resetState);
    saveToHistory(resetState);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], imageFile.name, { type: 'image/png' });
        onSave(file);
      }
    });
  };

  const handleSliderChange = (setter: React.Dispatch<React.SetStateAction<number>>, value: number) => {
    setter(value);
  };

  const handleSliderChangeEnd = () => {
    saveToHistory();
  };

  const tabs = [
    { id: 'crop', label: 'Crop', icon: CropIcon },
    { id: 'adjust', label: 'Adjust', icon: PaletteIcon },
    { id: 'filters', label: 'Filters', icon: SparklesIcon },
    { id: 'transform', label: 'Transform', icon: RotateIcon }
  ];

  return createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#0f0f0f' }} className="dark">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', borderBottom: '1px solid #2a2a2a', backgroundColor: '#1a1a1a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ApertureIcon className="text-blue-500" />
            <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff' }}>Image Editor</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {/* <button
              onClick={undo}
              disabled={historyIndex <= 0}
              style={{ 
                padding: '8px', 
                borderRadius: '8px', 
                backgroundColor: 'transparent',
                border: 'none',
                cursor: historyIndex <= 0 ? 'not-allowed' : 'pointer',
                opacity: historyIndex <= 0 ? 0.3 : 1,
                color: '#e5e5e5'
              }}
              onMouseEnter={(e) => { if (historyIndex > 0) e.currentTarget.style.backgroundColor = '#2a2a2a'; }}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              title="Undo"
            >
              <UndoIcon />
            </button>
            <button
              onClick={redo}
              disabled={historyIndex >= history.length - 1}
              style={{ 
                padding: '8px', 
                borderRadius: '8px', 
                backgroundColor: 'transparent',
                border: 'none',
                cursor: historyIndex >= history.length - 1 ? 'not-allowed' : 'pointer',
                opacity: historyIndex >= history.length - 1 ? 0.3 : 1,
                color: '#e5e5e5'
              }}
              onMouseEnter={(e) => { if (historyIndex < history.length - 1) e.currentTarget.style.backgroundColor = '#2a2a2a'; }}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              title="Redo"
            >
              <RedoIcon />
            </button> */}
            <div style={{ width: '1px', height: '20px', backgroundColor: '#2a2a2a', margin: '0 4px' }} />
            <button
              onClick={handleSave}
              style={{ 
                padding: '6px 12px', 
                borderRadius: '8px', 
                backgroundColor: '#3b82f6', 
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              <CheckIcon />
              Save
            </button>
            <button
              onClick={onCancel}
              style={{ 
                padding: '8px', 
                borderRadius: '8px', 
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#e5e5e5'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'; e.currentTarget.style.color = '#ef4444'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#e5e5e5'; }}
              title="Cancel"
            >
              <XIcon />
            </button>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', overflow: 'auto' }}>
          <div style={{ position: 'relative' }}>
            <canvas
              ref={canvasRef}
              style={{ 
                maxWidth: '100%', 
                maxHeight: 'calc(100vh - 12rem)', 
                border: '1px solid #2a2a2a', 
                borderRadius: '8px', 
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                cursor: activeTab === 'crop' ? 'crosshair' : 'default'
              }}
              onMouseDown={handleCropMouseDown}
              onMouseMove={handleCropMouseMove}
              onMouseUp={handleCropMouseUp}
              onMouseLeave={handleCropMouseUp}
            />
            
            {activeTab === 'crop' && cropArea.width > 0 && cropArea.height > 0 && (
              <div
                style={{
                  position: 'absolute',
                  left: `${cropArea.x}%`,
                  top: `${cropArea.y}%`,
                  width: `${cropArea.width}%`,
                  height: `${cropArea.height}%`,
                  border: '2px solid #3b82f6',
                  boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)',
                  pointerEvents: 'none'
                }}
              >
                <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(3, 1fr)' }}>
                  {[...Array(9)].map((_, i) => (
                    <div key={i} style={{ border: '1px solid rgba(59, 130, 246, 0.3)' }} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={{ borderTop: '1px solid #2a2a2a', backgroundColor: '#1a1a1a', padding: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto' }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  backgroundColor: activeTab === tab.id ? '#3b82f6' : 'transparent',
                  color: activeTab === tab.id ? '#ffffff' : '#e5e5e5',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 500,
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => { if (activeTab !== tab.id) e.currentTarget.style.backgroundColor = '#2a2a2a'; }}
                onMouseLeave={(e) => { if (activeTab !== tab.id) e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                <tab.icon />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isPanelOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ borderLeft: '1px solid #2a2a2a', backgroundColor: '#1a1a1a', overflow: 'hidden' }}
          >
            <div style={{ width: 280, height: '100%', overflowY: 'auto', padding: '16px' }}>
              <AnimatePresence mode="wait">
                {activeTab === 'crop' && (
                  <motion.div
                    key="crop"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
                  >
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 500, marginBottom: '8px', display: 'block', color: '#e5e5e5' }}>Aspect Ratio</label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                        {aspectRatios.map(ratio => (
                          <button
                            key={ratio.id}
                            onClick={() => setAspectRatio(ratio.id)}
                            style={{ 
                              padding: '6px 8px',
                              borderRadius: '6px',
                              fontSize: '12px',
                              fontWeight: 500,
                              backgroundColor: aspectRatio === ratio.id ? '#3b82f6' : '#2a2a2a',
                              color: aspectRatio === ratio.id ? '#ffffff' : '#e5e5e5',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => { if (aspectRatio !== ratio.id) e.currentTarget.style.backgroundColor = '#3a3a3a'; }}
                            onMouseLeave={(e) => { if (aspectRatio !== ratio.id) e.currentTarget.style.backgroundColor = '#2a2a2a'; }}
                          >
                            {ratio.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    {cropArea.width > 0 && (
                      <button
                        onClick={applyCrop}
                        style={{ 
                          width: '100%',
                          backgroundColor: '#3b82f6',
                          color: '#ffffff',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: 500,
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                      >
                        <CropIcon />
                        Apply Crop
                      </button>
                    )}
                  </motion.div>
                )}

                {activeTab === 'adjust' && (
                  <motion.div
                    key="adjust"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
                  >
                    <SliderControl
                      icon={<SunIcon className="text-yellow-500" />}
                      label="Brightness"
                      value={brightness}
                      onChange={(value) => handleSliderChange(setBrightness, value)}
                      onChangeEnd={handleSliderChangeEnd}
                      min={0}
                      max={200}
                      unit="%"
                    />
                    <SliderControl
                      icon={<ContrastIcon className="text-purple-500" />}
                      label="Contrast"
                      value={contrast}
                      onChange={(value) => handleSliderChange(setContrast, value)}
                      onChangeEnd={handleSliderChangeEnd}
                      min={0}
                      max={200}
                      unit="%"
                    />
                    <SliderControl
                      icon={<DropletIcon className="text-blue-500" />}
                      label="Saturation"
                      value={saturation}
                      onChange={(value) => handleSliderChange(setSaturation, value)}
                      onChangeEnd={handleSliderChangeEnd}
                      min={0}
                      max={200}
                      unit="%"
                    />
                    <SliderControl
                      icon={<ApertureIcon className="text-gray-500" />}
                      label="Blur"
                      value={blur}
                      onChange={(value) => handleSliderChange(setBlur, value)}
                      onChangeEnd={handleSliderChangeEnd}
                      min={0}
                      max={10}
                      step={0.1}
                      unit="px"
                    />
                    <SliderControl
                      icon={<PaletteIcon className="text-pink-500" />}
                      label="Hue"
                      value={hue}
                      onChange={(value) => handleSliderChange(setHue, value)}
                      onChangeEnd={handleSliderChangeEnd}
                      min={-180}
                      max={180}
                      unit="°"
                    />
                  </motion.div>
                )}

                {activeTab === 'filters' && (
                  <motion.div
                    key="filters"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}
                  >
                    {filters.map(filter => (
                      <button
                        key={filter.id}
                        onClick={() => applyFilter(filter)}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          backgroundColor: '#2a2a2a',
                          color: '#e5e5e5',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: 500
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3a3a3a'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2a2a2a'}
                      >
                        {filter.name}
                      </button>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'transform' && (
                  <motion.div
                    key="transform"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
                  >
                    <SliderControl
                      icon={<RotateIcon />}
                      label="Rotation"
                      value={rotation}
                      onChange={(value) => handleSliderChange(setRotation, value)}
                      onChangeEnd={handleSliderChangeEnd}
                      min={0}
                      max={360}
                      unit="°"
                    />
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => { 
                          setFlipH(!flipH); 
                          handleSliderChangeEnd();
                        }}
                        style={{
                          flex: 1,
                          padding: '8px 12px',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: 500,
                          backgroundColor: flipH ? '#3b82f6' : '#2a2a2a',
                          color: flipH ? '#ffffff' : '#e5e5e5',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                        onMouseEnter={(e) => { if (!flipH) e.currentTarget.style.backgroundColor = '#3a3a3a'; }}
                        onMouseLeave={(e) => { if (!flipH) e.currentTarget.style.backgroundColor = '#2a2a2a'; }}
                      >
                        <FlipHorizontalIcon />
                        Flip H
                      </button>
                      <button
                        onClick={() => { 
                          setFlipV(!flipV); 
                          handleSliderChangeEnd();
                        }}
                        style={{
                          flex: 1,
                          padding: '8px 12px',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: 500,
                          backgroundColor: flipV ? '#3b82f6' : '#2a2a2a',
                          color: flipV ? '#ffffff' : '#e5e5e5',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                        onMouseEnter={(e) => { if (!flipV) e.currentTarget.style.backgroundColor = '#3a3a3a'; }}
                        onMouseLeave={(e) => { if (!flipV) e.currentTarget.style.backgroundColor = '#2a2a2a'; }}
                      >
                        <FlipVerticalIcon />
                        Flip V
                      </button>
                    </div>
                    <SliderControl
                      icon={<ZoomInIcon />}
                      label="Zoom"
                      value={zoom}
                      onChange={(value) => handleSliderChange(setZoom, value)}
                      onChangeEnd={handleSliderChangeEnd}
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
        style={{
          position: 'absolute',
          right: isPanelOpen ? '280px' : '0',
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: '#1a1a1a',
          border: '1px solid #2a2a2a',
          borderTopLeftRadius: '8px',
          borderBottomLeftRadius: '8px',
          padding: '4px',
          cursor: 'pointer',
          color: '#e5e5e5'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2a2a2a'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1a1a1a'}
      >
        {isPanelOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </button>
    </div>,
    document.body
  );
};

interface SliderControlProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  onChange: (value: number) => void;
  onChangeEnd: () => void;
  min: number;
  max: number;
  step?: number;
  unit: string;
}

const SliderControl: React.FC<SliderControlProps> = ({
  icon,
  label,
  value,
  onChange,
  onChangeEnd,
  min,
  max,
  step = 1,
  unit
}) => {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
        <label style={{ fontSize: '12px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px', color: '#e5e5e5' }}>
          {icon}
          {label}
        </label>
        <span style={{ fontSize: '12px', color: '#a3a3a3' }}>{Math.round(value * 10) / 10}{unit}</span>
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
        style={{
          width: '100%',
          height: '6px',
          backgroundColor: '#2a2a2a',
          borderRadius: '8px',
          outline: 'none',
          cursor: 'pointer',
          WebkitAppearance: 'none',
          MozAppearance: 'none',
          appearance: 'none'
        }}
      />
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default Imageeditor;