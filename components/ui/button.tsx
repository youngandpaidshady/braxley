"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    
    // Magnetic effect for primary buttons
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 500, damping: 30 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 30 });

    const handleMagneticMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * 0.15);
      y.set((e.clientY - centerY) * 0.15);
    };

    const handleMagneticMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    const isPrimary = variant === "default" || variant === "primary";

    // For asChild, we need to handle the Slot component differently
    if (asChild) {
      return (
        <motion.div
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.1 }}
          className="inline-block"
        >
          <Slot
            ref={ref}
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
          />
        </motion.div>
      );
    }

    // Primary buttons get magnetic effect
    if (isPrimary) {
      const { 
        onDrag, onDragStart, onDragEnd, onDragEnter, onDragExit, onDragLeave, onDragOver, onDrop,
        onAnimationStart, onAnimationEnd, onAnimationIteration, onTransitionEnd,
        ...safeProps 
      } = props as Record<string, unknown>;
      return (
        <motion.button
          ref={buttonRef}
          onMouseMove={handleMagneticMouseMove}
          onMouseLeave={handleMagneticMouseLeave}
          style={{ x: mouseX, y: mouseY }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.1 }}
          className={cn(buttonVariants({ variant, size, className }), "group relative overflow-hidden touch-manipulation")}
          {...safeProps}
        >
          <span className="relative z-10">{props.children}</span>
          <motion.div
            className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
          />
        </motion.button>
      );
    }

    return (
      <motion.div
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.1 }}
        className="inline-block"
      >
        <button
          ref={buttonRef}
          className={cn(buttonVariants({ variant, size, className }), "touch-manipulation")}
          {...props}
        />
      </motion.div>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
