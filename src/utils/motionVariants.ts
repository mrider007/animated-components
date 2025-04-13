import { Variants ,TargetAndTransition} from 'framer-motion';

type MotionVariantKey = keyof typeof motionVariants;

export function getVariantVisible<T extends MotionVariantKey>(
  variantKey: T
): TargetAndTransition | undefined {
  const variant = motionVariants[variantKey]?.visible;
  return typeof variant === 'function' ? undefined : variant;
}

export const motionVariants: Record<string, Variants> = {
  null: {},

  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  },
  zoomIn: {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
  },
  slideUp: {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  },
  slideDown: {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  },
  slideLeft: {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  },
  slideRight: {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  },
  bounce: {
    hidden: { scale: 0.8 },
    visible: { scale: 1, transition: { type: 'spring', stiffness: 100 } },
  },
  rotateIn: {
    hidden: { rotate: -90, opacity: 0 },
    visible: { rotate: 0, opacity: 1, transition: { duration: 0.5 } },
  },
  stagger: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  },
  flip: {
    hidden: { rotateY: 90, opacity: 0 },
    visible: { rotateY: 0, opacity: 1, transition: { duration: 0.5 } },
  },
  fadeOut: {
    hidden: { opacity: 1 },
    visible: { opacity: 0, transition: { duration: 0.5 } },
  },
  zoomOut: {
    hidden: { scale: 1, opacity: 1 },
    visible: { scale: 0.8, opacity: 0, transition: { duration: 0.5 } },
  },
  scaleUp: {
    hidden: { scale: 0.5, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
  },
  scaleDown: {
    hidden: { scale: 1.2, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  },
  rotateBounce: {
    hidden: { rotate: -45, opacity: 0 },
    visible: { rotate: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  },
  scaleBounce: {
    hidden: { scale: 0.5 },
    visible: { scale: 1.2, transition: { type: 'spring', stiffness: 100 } },
  },
  fadeInScale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  },
  bounceOut: {
    hidden: { scale: 1.2 },
    visible: { scale: 0.8, transition: { type: 'spring', stiffness: 100 } },
  },
  shake: {
    hidden: { x: 0 },
    visible: { x: [0, -10, 10, -10, 10, 0], transition: { duration: 0.6, repeat: Infinity } },
  },
  pulse: {
    hidden: { scale: 1 },
    visible: { scale: [1, 1.1, 1], transition: { duration: 1.5, repeat: Infinity } },
  },
  fadeInFast: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
  },
  slideUpFast: {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
  },
  fadeUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  },
  zoomInFast: {
    hidden: { scale: 0.6, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
  },
  zoomOutFast: {
    hidden: { scale: 1, opacity: 1 },
    visible: { scale: 0.6, opacity: 0, transition: { duration: 0.3 } },
  },
  slideDownFast: {
    hidden: { y: -30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
  },
  rotateOut: {
    hidden: { rotate: 180, opacity: 0 },
    visible: { rotate: 0, opacity: 1, transition: { duration: 0.5 } },
  },
  flipFast: {
    hidden: { rotateY: 90, opacity: 0 },
    visible: { rotateY: 0, opacity: 1, transition: { duration: 0.3 } },
  },
  staggerUp: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  },
  flipIn: {
    hidden: { rotateY: 180, opacity: 0 },
    visible: { rotateY: 0, opacity: 1, transition: { duration: 0.5 } },
  },

  fadeInSlow: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5 } },
  },
  slideUpSlow: {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1.5 } },
  },
  slideDownSlow: {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1.5 } },
  },
  slideLeftSlow: {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 1.5 } },
  },
  slideRightSlow: {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 1.5 } },
  },
  bounceSlow: {
    hidden: { scale: 0.8 },
    visible: { scale: 1, transition: { type: 'spring', stiffness: 50 } },
  },
  rotateInSlow: {
    hidden: { rotate: -90, opacity: 0 },
    visible: { rotate: 0, opacity: 1, transition: { duration: 1.5 } },
  },
  staggerSlow: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.5 },
    },
  },
  flipSlow: {
    hidden: { rotateY: 90, opacity: 0 },
    visible: { rotateY: 0, opacity: 1, transition: { duration: 1.5 } },
  },
  scaleBounceSlow: {
    hidden: { scale: 0.6 },
    visible: { scale: 1, transition: { type: 'spring', stiffness: 50 } },
  },
  rotateOutFast: {
    hidden: { rotate: 180, opacity: 0 },
    visible: { rotate: 0, opacity: 1, transition: { duration: 0.3 } },
  },
  scaleUpFast: {
    hidden: { scale: 0.5, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
  },
  scaleDownFast: {
    hidden: { scale: 1.2, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
  },
  bounceFast: {
    hidden: { scale: 0.8 },
    visible: { scale: 1, transition: { type: 'spring', stiffness: 100 } },
  },
  flipInFast: {
    hidden: { rotateY: 180, opacity: 0 },
    visible: { rotateY: 0, opacity: 1, transition: { duration: 0.3 } },
  },
  fadeInLeftFast: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  },
  fadeInRightFast: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  },
  fadeInUpFast: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  },
  fadeInDownFast: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  },
  scaleUpSlow: {
    hidden: { scale: 0.5, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 1.5 } },
  },
  scaleDownSlow: {
    hidden: { scale: 1.2, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 1.5 } },
  },
  rotateInFast: {
    hidden: { rotate: -90, opacity: 0 },
    visible: { rotate: 0, opacity: 1, transition: { duration: 0.3 } },
  },
  staggerChildren: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25 },
    },
  },
  fadeUpSlow: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5 } },
  },
  slideInFromLeft: {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  },
  slideInFromRight: {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  },
  slideInFromTop: {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  },
  slideInFromBottom: {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  },
  fadeInSlowFromTop: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5 } },
  },
  fadeInSlowFromBottom: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5 } },
  },
  fadeInSlowFromLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.5 } },
  },
  fadeInSlowFromRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.5 } },
  },
  bounceIn: {
    hidden: { scale: 0.8 },
    visible: { scale: 1, transition: { type: 'spring', stiffness: 150 } },
  },
  zoomOutSlow: {
    hidden: { scale: 1, opacity: 1 },
    visible: { scale: 0.6, opacity: 0, transition: { duration: 1.5 } },
  },
  fadeInFastFromTop: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  },
  fadeInFastFromBottom: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  },
  slideInLeftFast: {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
  },
  slideInRightFast: {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
  },
  fadeInRotate: {
    hidden: { opacity: 0, rotate: -45 },
    visible: { opacity: 1, rotate: 0, transition: { duration: 0.5 } },
  },
  scaleInFast: {
    hidden: { scale: 0.8 },
    visible: { scale: 1, transition: { duration: 0.3 } },
  },
  zoomInBig: {
    hidden: { scale: 0.3 },
    visible: { scale: 1, transition: { duration: 1.5 } },
  },

  slideInDiagonal: {
    hidden: { x: -100, y: -100, opacity: 0 },
    visible: { x: 0, y: 0, opacity: 1, transition: { duration: 0.5 } },
  },
  rotate360: {
    hidden: { rotate: 0, opacity: 0 },
    visible: { rotate: 360, opacity: 1, transition: { duration: 1 } },
  },
  flipInX: {
    hidden: { rotateX: 90, opacity: 0 },
    visible: { rotateX: 0, opacity: 1, transition: { duration: 0.5 } },
  },
  staggerChildrenFast: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, duration: 0.3 },
    },
  },
  pulseFast: {
    hidden: { scale: 1 },
    visible: { scale: [1, 1.1, 1], transition: { duration: 0.8, repeat: Infinity } },
  },
  slideInDiagonalFast: {
    hidden: { x: -80, y: -80, opacity: 0 },
    visible: { x: 0, y: 0, opacity: 1, transition: { duration: 0.3 } },
  },
  fadeInRightSlow: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.5 } },
  },
  zoomOutSlowFromCenter: {
    hidden: { scale: 1.2, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 1.5 } },
  },
  flipBounce: {
    hidden: { rotateY: 90, opacity: 0 },
    visible: { rotateY: 0, opacity: 1, transition: { type: 'spring', stiffness: 150 } },
  },
  slideInFromTopFast: {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
  },
  fadeInDiagonal: {
    hidden: { opacity: 0, x: -50, y: -50 },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.5 } },
  },
  zoomInBounce: {
    hidden: { scale: 0.5, opacity: 0 },
    visible: { scale: 1.1, opacity: 1, transition: { type: 'spring', stiffness: 150 } },
  },
  rotateInOut: {
    hidden: { rotate: -180, opacity: 0 },
    visible: { rotate: 0, opacity: 1, transition: { duration: 1 } },
  },
  staggerUpFast: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, duration: 0.3 },
    },
  },
  fadeInRotateIn: {
    hidden: { opacity: 0, rotate: -45 },
    visible: { opacity: 1, rotate: 0, transition: { duration: 0.5 } },
  },
  scaleInQuick: {
    hidden: { scale: 0.7, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
  },
  slideInFromBottomSlow: {
    hidden: { y: 80, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1.5 } },
  },
  flipRotateOut: {
    hidden: { rotateY: 180, opacity: 0 },
    visible: { rotateY: 0, opacity: 1, transition: { duration: 0.5 } },
  },
  slideLeftFast: {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
  },
  zoomInBigFast: {
    hidden: { scale: 0.4, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
  },
  fadeInUpFastSlow: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  },
  rotateOutSlow: {
    hidden: { rotate: 90, opacity: 0 },
    visible: { rotate: 0, opacity: 1, transition: { duration: 1.5 } },
  },
  staggerLeft: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, duration: 0.6 },
    },
  },
  rotateOutFastReverse: {
    hidden: { rotate: 180, opacity: 0 },
    visible: { rotate: 0, opacity: 1, transition: { duration: 0.3 } },
  },
  scaleDownBounce: {
    hidden: { scale: 1.2 },
    visible: { scale: 0.9, transition: { type: 'spring', stiffness: 100 } },
  },
  fadeInFastFromLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
  },
  fadeInFastFromRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
  },
  bounceSlowFast: {
    hidden: { scale: 0.6 },
    visible: { scale: 1, transition: { type: 'spring', stiffness: 75 } },
  },
  slideInFromTopFastReverse: {
    hidden: { y: -80, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
  },
  fadeOutFast: {
    hidden: { opacity: 1 },
    visible: { opacity: 0, transition: { duration: 0.3 } },
  },
  flipScaleUp: {
    hidden: { rotateY: 90, opacity: 0, scale: 0.7 },
    visible: { rotateY: 0, opacity: 1, scale: 1, transition: { duration: 0.5 } },
  },
  slideOutRight: {
    hidden: { x: 0, opacity: 1 },
    visible: { x: 100, opacity: 0, transition: { duration: 0.5 } },
  },
  zoomOutBounce: {
    hidden: { scale: 1, opacity: 1 },
    visible: { scale: 0.5, opacity: 0, transition: { type: 'spring', stiffness: 150 } },
  },
  fadeUpReverse: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  },
  staggerUpReverse: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, duration: 0.4 },
    },
  },
  scaleInFromLeft: {
    hidden: { scale: 0.7, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
  },
  flipOut: {
    hidden: { rotateY: 0, opacity: 1 },
    visible: { rotateY: 90, opacity: 0, transition: { duration: 0.3 } },
  },

};
