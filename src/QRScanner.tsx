import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Camera, CheckCircleIcon, Upload } from "lucide-react";
import { useQueryState } from "nuqs";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "./components/ui/button";
import { cn } from "./lib/utils";

export default function QRScanner() {
  const readerRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [QRResult, setQRResult] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [scanning, setScanning] = useState(false);
  const scannerRef = useRef<any>(null);

  useEffect(() => {
    if (!scanning) return;

    let isMounted = true;

    async function init() {
      const { Html5Qrcode } = await import("html5-qrcode");

      if (!readerRef.current || !isMounted) return;

      const scanner = new Html5Qrcode(readerRef.current.id);
      scannerRef.current = scanner;

      try {
        await scanner.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText: string) => {
            setQRResult(decodedText);
            stop();
          },
          () => {},
        );
      } catch (err) {
        console.error("Camera start failed", err);
      }
    }

    init();

    return () => {
      isMounted = false;
      stop();
    };

    async function stop() {
      if (scannerRef.current) {
        try {
          await scannerRef.current.stop();
          await scannerRef.current.clear();
        } catch {}
        scannerRef.current = null;
      }
      setScanning(false);
    }
  }, [scanning]);

  const toggleCamera = async () => {
    if (scanning) {
      if (scannerRef.current) {
        try {
          await scannerRef.current.stop();
          await scannerRef.current.clear();
        } catch {}
        scannerRef.current = null;
      }
      setScanning(false);
    } else {
      setScanning(true);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const { Html5Qrcode } = await import("html5-qrcode");
    const scanner = new Html5Qrcode("qr-reader");

    try {
      const decodedText = await scanner.scanFile(file, true);
      setQRResult(decodedText);
    } catch (err) {
      console.error("File scan failed", err);
    }
  };

  const [, setBkashQR] = useQueryState("qr");
  const [, setBkashPhoneNumber] = useQueryState("phone");
  const [, setBkashName] = useQueryState("name");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!QRResult) return;
        const match = QRResult.match(/^https:\/\/qr.bka.sh\/(\w+)/);
        if (match) {
          setBkashQR(match[1]);
          setBkashPhoneNumber(phone);
          setBkashName(name);
        } else {
          toast.error("Invalid bKash QR Code");
        }
      }}
      className="space-y-4"
    >
      <Field>
        <FieldLabel htmlFor="qr">bKash QR</FieldLabel>
        <div>
          {QRResult && (
            <div className="w-32 max-w-full aspect-square mx-auto rounded-xl border overflow-hidden flex items-center justify-center">
              <CheckCircleIcon />
            </div>
          )}
          <div
            id="qr-reader"
            ref={readerRef}
            className={cn(
              "w-32 max-w-full aspect-square mx-auto rounded-xl border overflow-hidden",
              scanning || "hidden",
            )}
          />
        </div>

        <div className="flex gap-2 justify-center">
          <Button type="button" onClick={toggleCamera} size="icon">
            <Camera className="w-5 h-5" />
          </Button>

          <Button
            type="button"
            onClick={handleUploadClick}
            size="icon"
            variant="secondary"
          >
            <Upload className="w-5 h-5" />
          </Button>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        <Input
          id="qr"
          className="sr-only"
          placeholder="Scanned result will appear here"
          value={QRResult}
          readOnly
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
        <Input
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="phone">Name</FieldLabel>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Field>
      <Field orientation="horizontal">
        <Button type="submit">Submit</Button>
      </Field>
    </form>
  );
}
