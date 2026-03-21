import { useEffect, useRef, useState } from "react"
import type { Html5Qrcode } from "html5-qrcode"
import { ArrowRight, Camera, CheckCircleIcon, Upload } from "lucide-react"
import { parseAsString, useQueryStates } from "nuqs"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function BKashForm() {
  const readerRef = useRef<HTMLDivElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [QRResult, setQRResult] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [scanning, setScanning] = useState(false)
  const scannerRef = useRef<Html5Qrcode | null>(null)

  useEffect(() => {
    if (!scanning) return

    let isMounted = true

    async function init() {
      const { Html5Qrcode } = await import("html5-qrcode")

      if (!readerRef.current || !isMounted) return

      const scanner = new Html5Qrcode(readerRef.current.id)
      scannerRef.current = scanner

      try {
        await scanner.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText: string) => {
            setQRResult(decodedText)
            stop()
          },
          () => {}
        )
      } catch (err) {
        console.error("Camera start failed", err)
      }
    }

    init()

    return () => {
      isMounted = false
      stop()
    }

    async function stop() {
      if (scannerRef.current) {
        try {
          await scannerRef.current.stop()
          await scannerRef.current.clear()
        } catch (error) {
          console.warn(error)
        }
        scannerRef.current = null
      }
      setScanning(false)
    }
  }, [scanning])

  const toggleCamera = async () => {
    if (scanning) {
      if (scannerRef.current) {
        try {
          await scannerRef.current.stop()
          await scannerRef.current.clear()
        } catch (error) {
          console.warn(error)
        }
        scannerRef.current = null
      }
      setScanning(false)
    } else {
      setScanning(true)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const { Html5Qrcode } = await import("html5-qrcode")
    const scanner = new Html5Qrcode("qr-reader")

    try {
      const decodedText = await scanner.scanFile(file, true)
      setQRResult(decodedText)
    } catch (err) {
      console.error("File scan failed", err)
    }
  }

  const [, setBkashInfo] = useQueryStates({
    qr: parseAsString,
    name: parseAsString,
    phone: parseAsString,
  })

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault()
        if (!QRResult) return toast.error("Please scan or upload a QR code")
        const match = QRResult.match(/^https:\/\/qr.bka.sh\/(\w+)/)
        if (match) {
          await setBkashInfo({
            qr: match[1],
            name,
            phone,
          })

          await navigator.clipboard.writeText(window.location.href)
          toast.success("The card URL copied to clipboard")
        } else {
          toast.error("Invalid bKash QR Code")
        }
      }}
      className="prose max-w-md space-y-4 text-start"
    >
      <h1>Get Salami</h1>
      <p>
        Generate a salami request card with your bKash info.
        <br />
        Then share the card URL to ask salami.
      </p>
      <Field>
        <FieldLabel htmlFor="qr">bKash QR</FieldLabel>
        <div>
          {QRResult && (
            <div className="mx-auto flex aspect-square w-32 max-w-full items-center justify-center overflow-hidden rounded-xl border">
              <CheckCircleIcon />
            </div>
          )}
          <div
            id="qr-reader"
            ref={readerRef}
            className={cn(
              "mx-auto aspect-square w-32 max-w-full overflow-hidden rounded-xl border",
              scanning || "hidden"
            )}
          />
        </div>

        <div className="flex justify-center gap-2">
          <Button type="button" onClick={toggleCamera} size="icon">
            <Camera className="h-5 w-5" />
          </Button>

          <Button
            type="button"
            onClick={handleUploadClick}
            size="icon"
            variant="secondary"
          >
            <Upload className="h-5 w-5" />
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
        <FieldDescription>
          Scan the QR you get in bKash app:
          <br />
          My bKash <ArrowRight className="inline" /> My QR (the QR icon at the
          top)
        </FieldDescription>
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
        <Button type="submit">Generate Card</Button>
      </Field>
    </form>
  )
}
