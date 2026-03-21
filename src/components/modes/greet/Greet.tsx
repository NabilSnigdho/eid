import eidMubarak from "@/assets/eid-mubarak.svg"

import { cn } from "@/lib/utils"

import styles from "./Greet.module.css"

export function Greet() {
  return (
    <>
      <a href="https://www.vecteezy.com/vector-art/22083902-eid-mubarak-hand-lettering-with-lantern-decoration-greeting-card-concept">
        <img
          src={eidMubarak}
          className={cn(
            "absolute top-2/7 left-1/2 h-2/5 w-auto -translate-1/2",
            styles.floatingElement
          )}
        />
      </a>
      <div className="absolute top-[calc(11/14*100%-3rem)] left-1/2 w-full -translate-1/2 space-y-8 text-center">
        <div lang="ara" className={cn(styles.alkalamiRegular, styles.bigText)}>
          {"تَقَبَّلَ اللهُ مِنَّا وَمِنكُم"}
        </div>
        <div
          className={cn(
            "text-muted-foreground",
            styles.playfairDisplay,
            styles.bigSubtext
          )}
        >
          “May Allah accept [good deeds] from you and us”
        </div>
      </div>
    </>
  )
}
