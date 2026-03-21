import bkashIcon from "@/assets/bkash-icon.svg"
import { HomeIcon } from "lucide-react"

import { Button } from "./ui/button"

export function NavigationPane() {
  return (
    <div className="absolute right-0 bottom-0 left-0 flex items-center justify-center gap-4 bg-white/30 p-8">
      <Button
        variant="secondary"
        onClick={() => {
          window.location.href = "?mode=greet"
        }}
        size="icon"
      >
        <HomeIcon />
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          window.location.href = "?mode=bkash"
        }}
        size="icon"
      >
        <img src={bkashIcon} className="h-4 w-auto" />
      </Button>
    </div>
  )
}
