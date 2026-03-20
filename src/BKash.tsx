import bkashIcon from "@/assets/bkash-icon-circle.svg";
import bkashSalami from "@/assets/bkash-salami.svg";
import { Card, CardContent } from "@/components/ui/card";
import { useQueryState } from "nuqs";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";
import { Button } from "./components/ui/button";
import { cn } from "./lib/utils";
import QRScanner from "./QRScanner";

function BKashQR() {
  const [bkashQR] = useQueryState("qr");
  const [bkashPhoneNumber] = useQueryState("phone");
  const [bkashName] = useQueryState("name");

  return (
    <>
      <div className="text-sm">{bkashName}</div>
      <QRCodeSVG
        value={`https://qr.bka.sh/${bkashQR}`}
        imageSettings={{
          src: bkashIcon,
          height: 32,
          width: 32,
          excavate: false,
        }}
        fgColor="#E2136E"
        className="mx-auto max-h-[15vh]"
      />
      <Button
        variant="ghost"
        onClick={async () => {
          await navigator.clipboard.writeText(bkashPhoneNumber || "");
          toast.success("Copied to clipboard");
        }}
      >
        {bkashPhoneNumber}
      </Button>
    </>
  );
}

export function BKash() {
  const [bkashQR] = useQueryState("qr");

  return (
    <>
      {bkashQR && (
        <img
          src={bkashSalami}
          className="absolute top-2/7 left-1/2 -translate-1/2 h-1/3 w-auto"
        />
      )}

      <Card
        className={cn(
          "absolute left-1/2 -translate-1/2 text-center overflow-y-scroll max-h-full",
          bkashQR ? "top-[calc(11/14*100%-3rem)]" : "top-1/2",
        )}
      >
        <CardContent className="flex flex-col gap-4 px-4">
          {bkashQR ? <BKashQR /> : <QRScanner />}
        </CardContent>
      </Card>
    </>
  );
}
