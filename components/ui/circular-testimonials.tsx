"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export interface CircularTestimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

interface Colors {
  name?: string;
  designation?: string;
  testimony?: string;
  arrowBackground?: string;
  arrowForeground?: string;
  arrowHoverBackground?: string;
}

interface FontSizes {
  name?: string;
  designation?: string;
  quote?: string;
}

interface CircularTestimonialsProps {
  testimonials: CircularTestimonial[];
  autoplay?: boolean;
  colors?: Colors;
  fontSizes?: FontSizes;
}

function calculateGap(width: number) {
  // Mobile-first: keep the stack tight so side cards don't overflow on small screens
  if (width <= 420) return 22;
  if (width <= 640) return 28;
  if (width <= 768) return 40;

  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth)
    return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export const CircularTestimonials = ({
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {},
}: CircularTestimonialsProps) => {
  const colorName = colors.name ?? "hsl(var(--foreground))";
  const colorDesignation = colors.designation ?? "hsl(var(--muted-foreground))";
  const colorTestimony = colors.testimony ?? "hsl(var(--foreground))";
  const colorArrowBg = colors.arrowBackground ?? "hsl(var(--primary))";
  const colorArrowFg = colors.arrowForeground ?? "hsl(var(--primary-foreground))";
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "hsl(var(--accent))";

  const fontSizeName = fontSizes.name ?? "1.5rem";
  const fontSizeDesignation = fontSizes.designation ?? "0.925rem";
  const fontSizeQuote = fontSizes.quote ?? "1.125rem";

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const testimonialsLength = useMemo(() => testimonials.length, [testimonials]);
  const activeTestimonial = useMemo(
    () => testimonials[activeIndex],
    [activeIndex, testimonials]
  );

  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!autoplay || testimonialsLength <= 1) return;

    autoplayIntervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    }, 5000);

    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, testimonialsLength]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handlePrev, handleNext]);

  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;

    const isActive = index === activeIndex;
    const leftIndex = (activeIndex - 1 + testimonialsLength) % testimonialsLength;
    const rightIndex = (activeIndex + 1) % testimonialsLength;
    const isLeft = leftIndex === index;
    const isRight = rightIndex === index;

    // Mobile: show only the active card to avoid awkward overflow/cropping
    if (containerWidth <= 640) {
      return isActive
        ? {
            zIndex: 3,
            opacity: 1,
            pointerEvents: "auto",
            transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
            transition: "all 0.6s cubic-bezier(.4,2,.3,1)",
          }
        : {
            zIndex: 1,
            opacity: 0,
            pointerEvents: "none",
            transition: "all 0.6s cubic-bezier(.4,2,.3,1)",
          };
    }

    // Special case: with 2 items, left and right resolve to the same index.
    // Prefer a single "right" placement for the non-active card.
    const isTwo = testimonialsLength === 2;
    const twoOtherIndex = isTwo ? (activeIndex + 1) % testimonialsLength : -1;

    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (!isTwo && isLeft) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isRight || (isTwo && index === twoOtherIndex)) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
  }

  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  if (!testimonialsLength) return null;

  return (
    <div className="w-full max-w-6xl px-4 sm:px-6 md:px-8 mx-auto">
      {/* Mobile: stacked layout (image on top, content below). Desktop: side-by-side */}
      <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-12 lg:gap-16 items-center md:items-start">
        {/* Image - centered on mobile, full width */}
        <div className="w-full flex justify-center md:w-auto md:justify-start">
          <div
            ref={imageContainerRef}
            className="relative w-full aspect-square max-w-[280px] xs:max-w-[300px] sm:max-w-[360px] mx-auto md:max-w-full md:w-full md:aspect-auto md:h-[400px] lg:h-[480px] [perspective:1000px] overflow-hidden"
          >
            {testimonials.map((t, index) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={t.src}
                src={t.src}
                alt={t.name}
                className="absolute inset-0 h-full w-full rounded-2xl object-cover shadow-2xl ring-1 ring-border"
                style={getImageStyle(index)}
              />
            ))}
          </div>
        </div>

        {/* Content - centered text on mobile, properly sized */}
        <div className="flex flex-col justify-center w-full text-center md:text-left md:min-h-[400px] lg:min-h-[480px] py-4 sm:py-6 md:py-0 px-2 sm:px-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={quoteVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full"
            >
              <h3
                className="font-serif font-bold tracking-tight text-lg xs:text-xl sm:text-2xl md:text-2xl lg:text-3xl leading-tight"
                style={{ color: colorName }}
              >
                {activeTestimonial.name}
              </h3>
              <p
                className="mt-2 font-mono uppercase tracking-[0.2em] font-bold text-[10px] xs:text-xs sm:text-sm md:text-base"
                style={{ color: colorDesignation }}
              >
                {activeTestimonial.designation}
              </p>

              <motion.p
                className="mt-4 sm:mt-6 md:mt-10 leading-relaxed text-sm xs:text-sm sm:text-base md:text-lg lg:text-xl"
                style={{ color: colorTestimony }}
              >
                {activeTestimonial.quote.split(" ").map((word, i) => (
                  <motion.span
                    key={`${word}-${i}`}
                    initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.22,
                      ease: "easeInOut",
                      delay: 0.025 * i,
                    }}
                    style={{ display: "inline-block" }}
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons - centered on mobile, properly sized for touch */}
          <div className="mt-6 sm:mt-8 md:mt-10 flex gap-3 sm:gap-4 justify-center md:justify-start w-full">
            <button
              className="min-h-[44px] min-w-[44px] h-11 w-11 sm:h-12 sm:w-12 rounded-full border border-border flex items-center justify-center transition-colors touch-manipulation active:scale-95"
              onClick={handlePrev}
              style={{ backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg }}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              onTouchStart={() => setHoverPrev(true)}
              onTouchEnd={() => setHoverPrev(false)}
              aria-label="Previous team member"
              type="button"
            >
              <FaArrowLeft size={18} color={colorArrowFg} aria-hidden="true" />
            </button>
            <button
              className="min-h-[44px] min-w-[44px] h-11 w-11 sm:h-12 sm:w-12 rounded-full border border-border flex items-center justify-center transition-colors touch-manipulation active:scale-95"
              onClick={handleNext}
              style={{ backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg }}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              onTouchStart={() => setHoverNext(true)}
              onTouchEnd={() => setHoverNext(false)}
              aria-label="Next team member"
              type="button"
            >
              <FaArrowRight size={18} color={colorArrowFg} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
