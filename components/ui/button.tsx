"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-foreground bg-transparent text-foreground hover:bg-primary hover:text-primary-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90 font-semibold",
        "liquid-hover": "border-2 border-accent bg-transparent text-accent font-semibold",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
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
    const Comp = asChild ? Slot : "button";
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = React.useState(false);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    // Merge refs
    React.useImperativeHandle(ref, () => buttonRef.current as HTMLButtonElement);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current || variant !== "liquid-hover") return;
      const rect = buttonRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleMouseEnter = () => {
      if (variant === "liquid-hover") {
        setIsHovered(true);
      }
    };

    const handleMouseLeave = () => {
      if (variant === "liquid-hover") {
        setIsHovered(false);
      }
    };

    if (variant === "liquid-hover") {
      return (
        <motion.div
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.1 }}
          className="relative inline-block"
        >
          {asChild ? (
            <Slot
              ref={buttonRef}
              className={cn(buttonVariants({ variant, size, className }))}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              {...props}
            >
              {/* Liquid fill effect */}
              <motion.span
                className="absolute inset-0 bg-accent rounded-md pointer-events-none"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: isHovered ? 1.5 : 0,
                  opacity: isHovered ? 1 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                style={{
                  left: mousePosition.x,
                  top: mousePosition.y,
                  transform: "translate(-50%, -50%)",
                  borderRadius: "50%",
                  width: "200px",
                  height: "200px",
                }}
              />
              {/* Text with color transition */}
              <span className="relative z-10 transition-colors duration-300" style={{ color: isHovered ? "hsl(var(--accent-foreground))" : "hsl(var(--accent))" }}>
                {props.children}
              </span>
            </Slot>
          ) : (
            <button
              ref={buttonRef}
              className={cn(buttonVariants({ variant, size, className }))}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              {...props}
            >
              {/* Liquid fill effect */}
              <motion.span
                className="absolute inset-0 bg-accent rounded-md pointer-events-none"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: isHovered ? 1.5 : 0,
                  opacity: isHovered ? 1 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                style={{
                  left: mousePosition.x,
                  top: mousePosition.y,
                  transform: "translate(-50%, -50%)",
                  borderRadius: "50%",
                  width: "200px",
                  height: "200px",
                }}
              />
              {/* Text with color transition */}
              <span className="relative z-10 transition-colors duration-300" style={{ color: isHovered ? "hsl(var(--accent-foreground))" : "hsl(var(--accent))" }}>
                {props.children}
              </span>
            </button>
          )}
        </motion.div>
      );
    }

    return (
      <motion.div
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.1 }}
        className="inline-block"
      >
        {asChild ? (
          <Slot
            ref={buttonRef}
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
          />
        ) : (
          <button
            ref={buttonRef}
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
          />
        )}
      </motion.div>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

