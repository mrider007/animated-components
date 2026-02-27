export interface BaseProps {
  className?: string;
}

export interface WithChildren {
  children?: React.ReactNode;
}

export type Color = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export type Radius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export type Variant = 'solid' | 'outline' | 'ghost' | 'glass' | 'gradient' | 'flat' | 'elevated';

export interface ColorProps {
  color?: Color;
}

export interface SizeProps {
  size?: Size;
}

export interface RadiusProps {
  radius?: Radius;
}

export interface VariantProps {
  variant?: Variant;
}
