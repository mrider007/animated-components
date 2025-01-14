export interface BaseProps {
  className?: string;
}

export interface WithChildren {
  children: React.ReactNode;
}

export type Color = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ColorProps {
  color?: Color;
}

export interface SizeProps {
  size?: Size;
}

