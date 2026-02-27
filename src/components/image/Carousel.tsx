import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, PanInfo, Variants, Transition } from 'framer-motion';
import { BaseProps } from '../../../types/common';
import { motionVariants } from '../../utils/motionVariants';

type NavigationStyle = 'arrows' | 'dots' | 'thumbnails' | 'both' | 'arrows-dots' | 'none';
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full' | string;
type Direction = 'horizontal' | 'vertical';
type MotionVariantKey = keyof typeof motionVariants;

export interface CarouselImage {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  thumbnail?: string;
}

interface CustomIcons {
  prevIcon?: React.ReactNode;
  nextIcon?: React.ReactNode;
  playIcon?: React.ReactNode;
  pauseIcon?: React.ReactNode;
}

export interface CarouselProps extends BaseProps {
  images: CarouselImage[];
  motionVariant?: MotionVariantKey;
  navigationStyle?: NavigationStyle;
  size?: Size;
  autoPlay?: number;
  autoPlayDirection?: 'forward' | 'backward';
  showPlayPause?: boolean;
  loop?: boolean;
  enableSwipe?: boolean;
  swipeThreshold?: number;
  direction?: Direction;
  customVariants?: Variants;
  transitionDuration?: number;
  customTransition?: Transition;
  customClasses?: {
    container?: string;
    imageWrapper?: string;
    image?: string;
    navigation?: string;
    arrows?: string;
    dots?: string;
    thumbnails?: string;
    overlay?: string;
    playPause?: string;
  };
  customSizeClasses?: Record<Size, string>;
  aspectRatio?: string;
  showOverlay?: boolean;
  overlayPosition?: 'bottom' | 'top' | 'center';
  onSlideChange?: (index: number) => void;
  initialSlide?: number;
  baseClassName?: string;
  unstyled?: boolean;
  customIcons?: CustomIcons;
  thumbnailSize?: 'sm' | 'md' | 'lg';
  arrowPosition?: 'inside' | 'outside';
  dotStyle?: 'line' | 'circle' | 'square';
  pauseOnHover?: boolean;
  keyboard?: boolean;
  slidesPerView?: number;
  spaceBetween?: number;
  centeredSlides?: boolean;
}

export const Carousel: React.FC<CarouselProps> = ({
  images,
  navigationStyle = 'both',
  size = 'lg',
  autoPlay = 0,
  autoPlayDirection = 'forward',
  showPlayPause = true,
  loop = true,
  enableSwipe = true,
  swipeThreshold = 50,
  direction = 'horizontal',
  motionVariant = 'fadeIn',
  customVariants,
  transitionDuration = 0.5,
  customTransition,
  customClasses = {},
  customSizeClasses,
  aspectRatio = '16/9',
  showOverlay = true,
  overlayPosition = 'bottom',
  onSlideChange,
  initialSlide = 0,
  baseClassName,
  unstyled = false,
  className = '',
  customIcons,
  thumbnailSize = 'md',
  arrowPosition = 'inside',
  dotStyle = 'line',
  pauseOnHover = true,
  keyboard = true,
  slidesPerView = 1,
  spaceBetween = 0,
  centeredSlides = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialSlide);
  const [isPlaying, setIsPlaying] = useState(autoPlay > 0);
  const [dir, setDir] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const defaultSizeClasses: Record<Size, string> = {
    xs: 'max-w-sm h-48',
    sm: 'max-w-md h-64',
    md: 'max-w-2xl h-96',
    lg: 'max-w-4xl h-[32rem]',
    xl: 'max-w-6xl h-[40rem]',
    full: 'w-full h-screen',
  };

  const sizeClass = unstyled ? '' : (customSizeClasses?.[size] || defaultSizeClasses[size] || size);
  const baseClasses = unstyled ? '' : (baseClassName || 'relative mx-auto overflow-hidden rounded-xl bg-gray-900');

  // Enhanced carousel-specific animation variants
  const carouselVariants: Variants = customVariants || {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
    }),
  };

  const paginate = useCallback((newDirection: number) => {
    const nextIndex = currentIndex + newDirection;

    if (loop) {
      const wrappedIndex = ((nextIndex % images.length) + images.length) % images.length;
      setCurrentIndex(wrappedIndex);
    } else {
      if (nextIndex >= 0 && nextIndex < images.length) {
        setCurrentIndex(nextIndex);
      }
    }

    setDir(newDirection);
  }, [currentIndex, images.length, loop]);

  const goToSlide = useCallback((index: number) => {
    const newDirection = index > currentIndex ? 1 : -1;
    setDir(newDirection);
    setCurrentIndex(index);
  }, [currentIndex]);

  useEffect(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    if (autoPlay > 0 && isPlaying) {
      autoPlayRef.current = setInterval(() => {
        paginate(autoPlayDirection === 'forward' ? 1 : -1);
      }, autoPlay);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, isPlaying, paginate, autoPlayDirection]);

  useEffect(() => {
    onSlideChange?.(currentIndex);
  }, [currentIndex, onSlideChange]);

  useEffect(() => {
    if (!keyboard) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        paginate(-1);
      } else if (e.key === 'ArrowRight') {
        paginate(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keyboard, paginate]);

  const handleDragEnd = (e: any, { offset, velocity }: PanInfo) => {
    const swipe = Math.abs(offset.x) * velocity.x;

    if (swipe < -swipeThreshold) {
      paginate(1);
    } else if (swipe > swipeThreshold) {
      paginate(-1);
    }
  };

  const handleMouseEnter = () => {
    if (pauseOnHover && autoPlay > 0) {
      setIsPlaying(false);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover && autoPlay > 0) {
      setIsPlaying(true);
    }
  };

  const showArrows = navigationStyle === 'arrows' || navigationStyle === 'both' || navigationStyle === 'arrows-dots';
  const showDots = navigationStyle === 'dots' || navigationStyle === 'both' || navigationStyle === 'arrows-dots';
  const showThumbnails = navigationStyle === 'thumbnails';

  const DefaultPrevIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );

  const DefaultNextIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );

  const DefaultPlayIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );

  const DefaultPauseIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
    </svg>
  );

  const thumbnailSizeClasses = {
    sm: 'w-16 h-12',
    md: 'w-20 h-16',
    lg: 'w-24 h-20',
  };

  const dotStyleClasses = {
    line: 'w-8 h-1',
    circle: 'w-2 h-2 rounded-full',
    square: 'w-2 h-2',
  };

  const overlayPositionClasses = {
    bottom: 'bottom-0',
    top: 'top-0',
    center: 'top-1/2 -translate-y-1/2',
  };

  const transition = customTransition || {
    x: { type: "spring", stiffness: 300, damping: 30 },
    opacity: { duration: transitionDuration },
    scale: { duration: transitionDuration },
    rotateY: { duration: transitionDuration },
    z: { duration: transitionDuration },
  };

  return (
    <div
      ref={containerRef}
      className={`${baseClasses} ${sizeClass} ${className} ${customClasses.container || ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`relative w-full h-full ${customClasses.imageWrapper || ''}`}
        style={{ aspectRatio }}
      >
        <AnimatePresence initial={false} custom={dir} mode="wait">
          <motion.div
            key={currentIndex}
            custom={dir}
            variants={carouselVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            drag={enableSwipe ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className={`absolute inset-0 ${customClasses.image || ''}`}
          >
            <img
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className="w-full h-full object-cover select-none"
              draggable={false}
            />

            {showOverlay && (images[currentIndex].title || images[currentIndex].description) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className={`absolute ${overlayPositionClasses[overlayPosition]} left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 ${customClasses.overlay || ''}`}
              >
                {images[currentIndex].title && (
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="text-white text-2xl font-bold mb-2"
                  >
                    {images[currentIndex].title}
                  </motion.h3>
                )}
                {images[currentIndex].description && (
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    className="text-white/90 text-sm"
                  >
                    {images[currentIndex].description}
                  </motion.p>
                )}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {showArrows && (
        <div className={customClasses.navigation || ''}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => paginate(-1)}
            disabled={!loop && currentIndex === 0}
            className={`absolute ${arrowPosition === 'outside' ? '-left-12' : 'left-4'} top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-3 text-gray-900 hover:bg-white transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg ${customClasses.arrows || ''}`}
            aria-label="Previous slide"
          >
            {customIcons?.prevIcon || <DefaultPrevIcon />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => paginate(1)}
            disabled={!loop && currentIndex === images.length - 1}
            className={`absolute ${arrowPosition === 'outside' ? '-right-12' : 'right-4'} top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-3 text-gray-900 hover:bg-white transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg ${customClasses.arrows || ''}`}
            aria-label="Next slide"
          >
            {customIcons?.nextIcon || <DefaultNextIcon />}
          </motion.button>
        </div>
      )}

      {autoPlay > 0 && showPlayPause && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsPlaying(!isPlaying)}
          className={`absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 text-gray-900 hover:bg-white transition-all shadow-lg ${customClasses.playPause || ''}`}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying
            ? (customIcons?.pauseIcon || <DefaultPauseIcon />)
            : (customIcons?.playIcon || <DefaultPlayIcon />)
          }
        </motion.button>
      )}

      {showDots && (
        <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 ${customClasses.dots || ''}`}>
          {images.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => goToSlide(index)}
              className={`${dotStyleClasses[dotStyle]} transition-all ${index === currentIndex
                ? 'bg-white scale-110'
                : 'bg-white/50 hover:bg-white/75'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {showThumbnails && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`absolute bottom-0 left-0 right-0 z-10 bg-black/80 backdrop-blur-sm p-2 ${customClasses.thumbnails || ''}`}
        >
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {images.map((image, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 ${thumbnailSizeClasses[thumbnailSize]} rounded overflow-hidden transition-all ${index === currentIndex
                  ? 'ring-2 ring-white scale-110'
                  : 'opacity-60 hover:opacity-100'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                <img
                  src={image.thumbnail || image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-4 right-4 z-10 text-white/80 text-sm bg-black/50 px-2 py-1 rounded backdrop-blur-sm"
      >
        {currentIndex + 1} / {images.length}
      </motion.div>
    </div>
  );
};