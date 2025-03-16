
import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, variant = 'default', size = 'default', className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          'relative overflow-hidden group transition-all duration-300',
          'before:absolute before:inset-0 before:bg-white/10 before:scale-x-0 before:opacity-0',
          'before:transition-transform before:duration-300 before:ease-out before:origin-right',
          'hover:before:scale-x-100 hover:before:opacity-100 hover:before:origin-left',
          'active:scale-[0.98] active:transition-all',
          'hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]',
          className
        )}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </Button>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';
