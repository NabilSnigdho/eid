import type { ComponentProps } from "react"
import centerDome from "@/assets/center-dome.svg"
import trees from "@/assets/trees.webp"
import wall from "@/assets/wall.svg"

import { cn } from "@/lib/utils"

import styles from "./EidGah.module.css"

export function EidGah({ className }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative bg-linear-to-t from-orange-300 to-orange-100",
        className
      )}
    >
      <div
        className={cn(
          "absolute bottom-full flex h-24 w-full items-end",
          styles.horizon
        )}
      >
        <div
          style={{ backgroundImage: `url(${trees})` }}
          className="absolute inset-0 -z-10 bg-contain bg-center bg-repeat-x"
        />
        <div
          style={{ backgroundImage: `url("${wall}")` }}
          className="h-8 flex-[1_0_0] bg-contain bg-right bg-repeat-x"
        />
        <img src={centerDome} className="h-24 w-auto" />
        <div
          style={{ backgroundImage: `url("${wall}")` }}
          className="h-8 flex-[1_0_0] bg-contain bg-left bg-repeat-x"
        />
      </div>
    </div>
  )
}
