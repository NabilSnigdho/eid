import { HomeIcon } from "lucide-react";
import { Button } from "./components/ui/button";
import bkashIcon from "@/assets/bkash-icon.svg";

export function NavigationPane() {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-center items-center gap-4 bg-white/30">
      <Button
        variant="secondary"
        onClick={() => {
          window.location.href = "?mode=greet";
        }}
        size="icon"
      >
        <HomeIcon />
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          window.location.href = "?mode=bkash";
        }}
        size="icon"
      >
        <img src={bkashIcon} className="h-4 w-auto" />
      </Button>
    </div>
  );
}
