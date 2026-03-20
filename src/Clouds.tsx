import cloud from "@/assets/floating-realistic-clouds.png";
import { cn } from "@/lib/utils.ts";

export function Clouds({ className }: { className?: string }) {
  return (
    <div className={cn("absolute h-full w-full", className)}>
      <img src={cloud} className="h-1/4 w-auto absolute" />
      <img src={cloud} className="h-1/4 w-auto absolute left-1/3 top-1/4" />
      <img src={cloud} className="h-1/4 w-auto absolute right-1/4 top-1/8" />
    </div>
  );
}
