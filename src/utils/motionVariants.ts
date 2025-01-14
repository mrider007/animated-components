import { Variants } from 'framer-motion';

export const motionVariants: Record<string, Variants> = {
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
};
