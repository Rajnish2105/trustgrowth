"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCalls, type Call } from "@/hooks/useCalls"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageModal } from "@/components/adminPanel/image-modal"
import {
  ArrowLeft,
  Save,
  Loader2,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Target,
  Shield,
  UploadCloud,
  ImageIcon,
  FileText,
} from "lucide-react"
import Image from "next/image"

interface EditCallFormProps {
  callId: string
}

export function EditCallForm({ callId }: EditCallFormProps) {
  const router = useRouter()
  const { updateCall } = useCalls()
  const [call, setCall] = useState<Call | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [updateNote, setUpdateNote] = useState("")
  const [imageName, setImageName] = useState<string | null>(null)
  const [description, setDescription] = useState("")
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    symbol: "",
    entry: "",
    stoploss: "",
    minTarget: "",
    stock: "",
    action: "WATCH" as "BUY" | "SELL" | "WATCH" | "HOLD",
    exit: "",
    return: "",
    description: "",
    imageUrl: "",
  })

  // Fetch call data
  useEffect(() => {
    const fetchCall = async () => {
      try {
        const response = await fetch(`/api/calls/${callId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch call")
        }
        const data = await response.json()
        setCall(data.call)
        setFormData({
          symbol: data.call.symbol || "",
          entry: data.call.entry?.toString() || "",
          stoploss: data.call.stoploss?.toString() || "",
          minTarget: data.call.minTarget?.toString() || "",
          stock: data.call.stock || "",
          action: data.call.action || "WATCH",
          exit: data.call.exit || "",
          return: data.call.return || "",
          description: data.call.description || "",
          imageUrl: data.call.imageUrl || "",
        })
        setDescription(data.call.description || "")
        if (data.call.imageUrl) {
          // Extract filename from URL for display
          const urlParts = data.call.imageUrl.split("/")
          setImageName(decodeURIComponent(urlParts[urlParts.length - 1]))
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch call")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCall()
  }, [callId])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    // Update description state for character counting
    if (field === "description") {
      setDescription(value)
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageName(file.name)
    // Note: In edit mode, we'll handle image upload separately
    // For now, just track the filename for display
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.symbol ||
      !formData.entry ||
      !formData.stoploss ||
      !formData.minTarget ||
      !formData.stock ||
      !formData.description
    ) {
      setError("Please fill in all required fields")
      return
    }

    try {
      setIsSaving(true)
      setError(null)

      await updateCall(callId, {
        symbol: formData.symbol,
        entry: Number.parseFloat(formData.entry),
        stoploss: Number.parseFloat(formData.stoploss),
        minTarget: Number.parseInt(formData.minTarget),
        stock: formData.stock,
        action: formData.action,
        description: formData.description,
        exit: formData.exit || undefined,
        return: formData.return || undefined,
        ...(updateNote.trim() ? { updateNote: updateNote.trim() } : {}),
      })

      router.push("/admin")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update call")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
        <Card className="p-8 shadow-xl border-0 bg-card/80 backdrop-blur-sm">
          <div className="flex items-center justify-center space-x-3">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="text-lg font-medium text-foreground">Loading trading call...</span>
          </div>
        </Card>
      </div>
    )
  }

  if (error && !call) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
        <Card className="p-8 shadow-xl border-0 bg-card/80 backdrop-blur-sm">
          <div className="flex items-center text-destructive space-x-3">
            <AlertCircle className="h-6 w-6" />
            <span className="text-lg font-medium">Error: {error}</span>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => router.push("/admin")}
            className="mb-6 hover:bg-primary/10 hover:text-primary hover:border-primary transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admin Dashboard
          </Button>

          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-foreground tracking-tight">Edit Trading Call</h1>
            <p className="text-lg text-muted-foreground">
              Update your stock call details with precision and confidence
            </p>
          </div>
        </div>

        <Card className="shadow-2xl border-0 bg-card/80 backdrop-blur-sm overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 p-6 border-b border-border/50">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Trading Call Details</h2>
                <p className="text-sm text-muted-foreground">Manage your investment strategy</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="flex items-center space-x-3 text-destructive bg-destructive/10 p-4 rounded-lg border border-destructive/20">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium">{error}</span>
                </div>
              )}

              <div className="space-y-8">
                {/* Stock Information Section */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 pb-2 border-b border-border/30">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">Stock Information</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="symbol"
                        className="text-sm font-medium text-foreground flex items-center space-x-1"
                      >
                        <span>Symbol</span>
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="symbol"
                        value={formData.symbol}
                        onChange={(e) => handleInputChange("symbol", e.target.value)}
                        placeholder="e.g., AAPL"
                        className="h-11 bg-input border-border/50 focus:border-primary focus:ring-primary/20"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="stock"
                        className="text-sm font-medium text-foreground flex items-center space-x-1"
                      >
                        <span>Company Name</span>
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="stock"
                        value={formData.stock}
                        onChange={(e) => handleInputChange("stock", e.target.value)}
                        placeholder="e.g., Apple Inc."
                        className="h-11 bg-input border-border/50 focus:border-primary focus:ring-primary/20"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Trading Strategy Section */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 pb-2 border-b border-border/30">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">Trading Strategy</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="action"
                        className="text-sm font-medium text-foreground flex items-center space-x-1"
                      >
                        <span>Action</span>
                        <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.action}
                        onValueChange={(value: string) => handleInputChange("action", value)}
                      >
                        <SelectTrigger className="h-11 bg-input border-border/50 focus:border-primary focus:ring-primary/20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="BUY">BUY</SelectItem>
                          <SelectItem value="SELL">SELL</SelectItem>
                          <SelectItem value="WATCH">WATCH</SelectItem>
                          <SelectItem value="HOLD">HOLD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="entry"
                        className="text-sm font-medium text-foreground flex items-center space-x-1"
                      >
                        <span>Entry Price</span>
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="entry"
                        type="number"
                        step="0.01"
                        value={formData.entry}
                        onChange={(e) => handleInputChange("entry", e.target.value)}
                        placeholder="e.g., 150.00"
                        className="h-11 bg-input border-border/50 focus:border-primary focus:ring-primary/20"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Risk Management Section */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 pb-2 border-b border-border/30">
                    <Shield className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">Risk Management</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="stoploss"
                        className="text-sm font-medium text-foreground flex items-center space-x-1"
                      >
                        <span>Stop Loss</span>
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="stoploss"
                        type="number"
                        step="0.01"
                        value={formData.stoploss}
                        onChange={(e) => handleInputChange("stoploss", e.target.value)}
                        placeholder="e.g., 145.00"
                        className="h-11 bg-input border-border/50 focus:border-primary focus:ring-primary/20"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="minTarget"
                        className="text-sm font-medium text-foreground flex items-center space-x-1"
                      >
                        <span>Min Target %</span>
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="minTarget"
                        type="number"
                        value={formData.minTarget}
                        onChange={(e) => handleInputChange("minTarget", e.target.value)}
                        placeholder="e.g., 5"
                        className="h-11 bg-input border-border/50 focus:border-primary focus:ring-primary/20"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Performance Tracking Section */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 pb-2 border-b border-border/30">
                    <Target className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">Performance Tracking</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="exit" className="text-sm font-medium text-foreground">
                        Exit Price
                      </Label>
                      <Input
                        id="exit"
                        type="number"
                        step="0.01"
                        value={formData.exit}
                        onChange={(e) => handleInputChange("exit", e.target.value)}
                        placeholder="e.g., 155.00"
                        className="h-11 bg-input border-border/50 focus:border-primary focus:ring-primary/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="return" className="text-sm font-medium text-foreground">
                        Return %
                      </Label>
                      <Input
                        id="return"
                        value={formData.return}
                        onChange={(e) => handleInputChange("return", e.target.value)}
                        placeholder="e.g., 3.33%"
                        className="h-11 bg-input border-border/50 focus:border-primary focus:ring-primary/20"
                      />
                    </div>
                  </div>
                </div>

                {/* Description and Image Section */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 pb-2 border-b border-border/30">
                    <FileText className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">Additional Information</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Description */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="description"
                        className="text-sm font-medium text-foreground flex items-center space-x-1"
                      >
                        <span>Description</span>
                        <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => handleInputChange("description", e.target.value)}
                          placeholder="Enter a clear, concise description of the call..."
                          maxLength={280}
                          className="min-h-28 resize-y bg-input border-border/50 focus:border-primary focus:ring-primary/20"
                          required
                        />
                        <div className="pointer-events-none absolute bottom-2 right-3 text-xs text-muted-foreground">
                          {description.length}/280
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Keep it informative and actionable. Max 280 characters.
                      </p>
                    </div>

                    {/* Image Upload/Display */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">Call Image</Label>

                      {/* Current Image Display */}
                      {formData.imageUrl && (
                        <div className="mb-4">
                          <p className="text-sm text-muted-foreground mb-2">Current image:</p>
                          <div
                            className="relative w-full h-32 bg-muted rounded-lg overflow-hidden border border-border/50 cursor-zoom-in group"
                            role="button"
                            tabIndex={0}
                            aria-label="Open current image in full-screen modal"
                            title="Click to view larger"
                            onClick={() => setIsImageModalOpen(true)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault()
                                setIsImageModalOpen(true)
                              }
                            }}
                          >
                            <Image
                              src={formData.imageUrl || "/placeholder.svg"}
                              alt="Current call image"
                              width={400}
                              height={200}
                              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                              onError={(e) => {
                                e.currentTarget.style.display = "none"
                                const nextElement = e.currentTarget.nextElementSibling as HTMLElement
                                if (nextElement) {
                                  nextElement.style.display = "flex"
                                }
                              }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground hidden">
                              <ImageIcon className="h-8 w-8" />
                              <span className="ml-2">Image not available</span>
                            </div>
                            <div className="absolute bottom-1 right-2 rounded bg-black/60 px-2 py-0.5 text-[11px] text-white">
                              Click to enlarge
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Modal for full-screen view */}
                      {isImageModalOpen && (
                        <ImageModal
                          open={isImageModalOpen}
                          onOpenChange={setIsImageModalOpen}
                          src={formData.imageUrl || "/placeholder.svg"}
                          alt={imageName ? `Current call image: ${imageName}` : "Current call image"}
                        />
                      )}

                      {/* File Upload */}
                      <div
                        className="rounded-md border border-dashed border-border/50 bg-input hover:border-primary/50 transition-colors"
                        onDragOver={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                        }}
                        onDrop={async (e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          const file = e.dataTransfer.files?.[0]
                          if (file) {
                            setImageName(file.name)
                          }
                        }}
                      >
                        <label
                          htmlFor="image"
                          className="flex cursor-pointer flex-col items-center justify-center gap-2 px-4 py-6 text-center"
                        >
                          <div className="flex items-center gap-2 text-foreground">
                            <UploadCloud className="h-5 w-5" />
                            <span className="text-sm font-medium">
                              {formData.imageUrl ? "Replace image" : "Upload image"}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">or drag & drop</span>
                          <span className="text-xs text-muted-foreground">PNG, JPG up to 2MB</span>
                        </label>
                        <input
                          id="image"
                          name="image"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                      </div>

                      {/* Preview filename */}
                      {imageName && (
                        <div className="mt-2 flex items-center gap-2 text-sm text-foreground">
                          <ImageIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="truncate">{imageName}</span>
                        </div>
                      )}

                      <p className="text-xs text-muted-foreground">
                        Note: Image replacement will require re-uploading to cloud storage.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Update note */}
                <div className="space-y-2">
                  <Label htmlFor="updateNote" className="text-sm font-medium text-foreground">
                    Update note (optional)
                  </Label>
                  <Input
                    id="updateNote"
                    value={updateNote}
                    onChange={(e) => setUpdateNote(e.target.value)}
                    placeholder="One-line summary of this change"
                    className="h-11 bg-input border-border/50 focus:border-primary focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-border/30">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/admin")}
                  className="px-6 py-2 hover:bg-muted/50 transition-all duration-200"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={isSaving}
                  className="px-8 py-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  )
}
