import type { ComponentProps } from "react"
import cloud from "@/assets/floating-realistic-clouds.png"

import { cn } from "@/lib/utils.ts"

import styles from "./Sky.module.css"

export function Sky({ className }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-linear-to-t from-sky-50 to-sky-300",
        className
      )}
    >
      <div className={cn("absolute inset-0", styles.loopingClouds)}>
        <Clouds className="-left-full" />
        <Clouds />
      </div>
    </div>
  )
}

function Clouds({ className }: ComponentProps<"div">) {
  return (
    <div className={cn("absolute h-full w-full", className)}>
      <img src={cloud} className="absolute h-1/4 w-auto" />
      <img src={cloud} className="absolute top-1/4 left-1/3 h-1/4 w-auto" />
      <img src={cloud} className="absolute top-1/8 right-1/4 h-1/4 w-auto" />
    </div>
  )
}
