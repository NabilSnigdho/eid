import trees from "@/assets/trees.webp";
import { Clouds } from "./Clouds";
import { EidGah } from "./EidGah";
import { BKash } from "./BKash";
import { Toaster } from "@/components/ui/sonner";
import { useQueryState } from "nuqs";
import { Greet } from "./Greet";
import { NavigationPane } from "./NavigationPane";

function App() {
  const [mode] = useQueryState("mode", { defaultValue: "greet" });

  return (
    <div className="fixed inset-0 bg-red-500 overflow-hidden">
      <div className="h-4/7 bg-linear-to-t from-sky-50 to-sky-300 relative overflow-hidden">
        <div className="cloud absolute inset-0 -left-full right-2/1 opacity-30">
          <Clouds className="" />
          <Clouds className="left-full" />
          <Clouds className="left-2/1" />
        </div>
      </div>
      <div className="h-3/7 bg-linear-to-t from-orange-300 to-orange-100"></div>
      <div
        style={{ backgroundImage: `url(${trees})` }}
        className="absolute bottom-3/7 h-24 w-full bg-repeat-x bg-contain horizon bg-center"
      />
      <EidGah />

      {mode === "greet" && <Greet />}
      {mode === "bkash" && <BKash />}

      <NavigationPane />
      <Toaster />
    </div>
  );
}

export default App;
