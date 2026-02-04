import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion, MoveLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center relative overflow-hidden">
      {/* 1. Architectural Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />

      {/* 2. Decorative Background Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-bold text-foreground/5 font-mono select-none pointer-events-none z-0">
        404
      </div>
      
      {/* 3. Main Content */}
      <div className="relative z-10 text-center space-y-8 px-4 max-w-lg mx-auto">
        <div className="mx-auto w-20 h-20 bg-muted rounded-sm flex items-center justify-center border border-border mb-6">
            <FileQuestion className="w-10 h-10 text-primary" strokeWidth={1.5} />
        </div>

        <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-primary">
                Error: Reference Code Missing
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-foreground">
                Schematic Not Found
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
                The architectural plan you are looking for has either been moved to the archive or never existed.
            </p>
        </div>

        <div className="pt-4">
            <Button asChild size="lg" className="rounded-sm gap-2">
                <Link href="/">
                    <MoveLeft className="w-4 h-4 text-primary" strokeWidth={1.5} />
                    Return to Site Base
                </Link>
            </Button>
        </div>
      </div>

      {/* 4. Footer Technical Details */}
      <div className="absolute bottom-8 text-[10px] font-mono text-muted-foreground/40 uppercase tracking-widest">
        System ID: BRAXLEY-NEVIM-2022 // LOC: UNKNOWN
      </div>
    </div>
  );
}
