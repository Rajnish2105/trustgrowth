"use client"
import { Dialog, DialogContent, DialogClose, DialogTitle } from "@/components/ui/dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

type ImageModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  src: string
  alt?: string
  className?: string
}

export function ImageModal({ open, onOpenChange, src, alt = "Image preview", className }: ImageModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "!fixed !inset-0 !top-0 !left-0 !right-0 !bottom-0",
          "!transform-none !translate-x-0 !translate-y-0",
          "!w-screen !h-screen !max-w-none !max-h-none",
          "!p-0 !border-0 !rounded-none",
          "!bg-black/80 !backdrop-blur-sm",
          "z-50 flex items-center justify-center",
          "focus:outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "!data-[state=closed]:zoom-out-100 !data-[state=open]:zoom-in-100",
          className,
        )}
      >
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        <div className="relative max-w-[95vw] max-h-[95vh] flex items-center justify-center">
          <Image
            src={src || "/placeholder.svg"}
            alt={alt}
            width={800}
            height={600}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />
          <DialogClose asChild>
            <button
              type="button"
              aria-label="Close image"
              className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black/90 transition-colors z-10"
            >
              <X className="h-5 w-5" />
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
