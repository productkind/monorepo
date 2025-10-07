import './Typography.css';

export type TypographyProps = {
  className?: string;
  children: React.ReactNode;
  component?: React.ElementType;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body'
}

export const Typography = ({
  className = '',
  children,
  component: Component = 'p',
  variant = 'body'
}: TypographyProps) => {
  return (
    <Component className={`typography typography-${variant} ${className}`}>
      {children}
    </Component>
  );
}
