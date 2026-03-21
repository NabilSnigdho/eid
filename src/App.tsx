import { useQueryState } from "nuqs"

import { Toaster } from "@/components/ui/sonner"

import { EidGah } from "./components/EidGah"
import { BKash } from "./components/modes/bkash/BKash"
import { Greet } from "./components/modes/greet/Greet"
import { NavigationPane } from "./components/NavigationPane"
import { Sky } from "./components/Sky"

function App() {
  const [mode] = useQueryState("mode", { defaultValue: "greet" })

  return (
    <div className="fixed inset-0 overflow-hidden">
      <Sky className="h-4/7" />
      <EidGah className="h-3/7" />

      {mode === "greet" && <Greet />}
      {mode === "bkash" && <BKash />}

      <NavigationPane />
      <Toaster position="top-center" />
    </div>
  )
}

export default App
