"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCalls } from "@/hooks/useCalls";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Save,
  Loader2,
  AlertCircle,
  TrendingUp,
  DollarSign,
  BarChart3,
} from "lucide-react";

export function CreateCallForm() {
  const router = useRouter();
  const { createCall } = useCalls();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.symbol ||
      !formData.entry ||
      !formData.stoploss ||
      !formData.minTarget ||
      !formData.stock ||
      !formData.description ||
      !imageFile
    ) {
      setError("Please fill in all required fields, add description and image");
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      const payload = new FormData();
      payload.append("symbol", formData.symbol);
      payload.append("entry", formData.entry);
      payload.append("stoploss", formData.stoploss);
      payload.append("minTarget", formData.minTarget);
      payload.append("stock", formData.stock);
      payload.append("action", formData.action);
      payload.append("description", formData.description);
      if (formData.exit) payload.append("exit", formData.exit);
      if (formData.return) payload.append("return", formData.return);
      if (imageFile) payload.append("image", imageFile);

      await createCall(payload);

      router.push("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create call");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => router.push("/admin")}
            className="mb-6 flex items-center gap-2 hover:bg-primary/10 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Admin
          </Button>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">
              Create New Trading Call
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Set up a new stock trading call with precise entry points, risk
              management, and target objectives
            </p>
          </div>
        </div>

        <Card className="p-6 sm:p-8 shadow-xl border-0 bg-card/80 backdrop-blur-sm bg-slate-200 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="flex items-center text-destructive bg-destructive/10 p-4 rounded-lg border border-destructive/20">
                <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            <div className="space-y-8">
              {/* Basic Information Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold text-foreground">
                    Basic Information
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="symbol"
                      className="text-sm font-medium text-foreground"
                    >
                      Stock Symbol *
                    </Label>
                    <Input
                      id="symbol"
                      value={formData.symbol}
                      onChange={(e) =>
                        handleInputChange(
                          "symbol",
                          e.target.value.toUpperCase()
                        )
                      }
                      placeholder="e.g., AAPL"
                      className="bg-input border-border focus:ring-2 focus:ring-primary/20 transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="stock"
                      className="text-sm font-medium text-foreground"
                    >
                      Company Name *
                    </Label>
                    <Input
                      id="stock"
                      value={formData.stock}
                      onChange={(e) =>
                        handleInputChange("stock", e.target.value)
                      }
                      placeholder="e.g., Apple Inc."
                      className="bg-input border-border focus:ring-2 focus:ring-primary/20 transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="action"
                      className="text-sm font-medium text-foreground"
                    >
                      Action Type *
                    </Label>
                    <Select
                      value={formData.action}
                      onValueChange={(value: string) =>
                        handleInputChange("action", value)
                      }
                    >
                      <SelectTrigger className="bg-input border-border focus:ring-2 focus:ring-primary/20 transition-all">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem
                          value="BUY"
                          className="text-green-600 font-medium"
                        >
                          🟢 BUY
                        </SelectItem>
                        <SelectItem
                          value="SELL"
                          className="text-red-600 font-medium"
                        >
                          🔴 SELL
                        </SelectItem>
                        <SelectItem
                          value="WATCH"
                          className="text-blue-600 font-medium"
                        >
                          👁️ WATCH
                        </SelectItem>
                        <SelectItem
                          value="HOLD"
                          className="text-yellow-600 font-medium"
                        >
                          ✋ HOLD
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Pricing & Risk Management Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold text-foreground">
                    Pricing & Risk Management
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="entry"
                      className="text-sm font-medium text-foreground"
                    >
                      Entry Price *{" "}
                      <span className="text-xs text-muted-foreground">($)</span>
                    </Label>
                    <Input
                      id="entry"
                      type="number"
                      step="0.01"
                      value={formData.entry}
                      onChange={(e) =>
                        handleInputChange("entry", e.target.value)
                      }
                      placeholder="150.00"
                      className="bg-input border-border focus:ring-2 focus:ring-primary/20 transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="stoploss"
                      className="text-sm font-medium text-foreground"
                    >
                      Stop Loss *{" "}
                      <span className="text-xs text-muted-foreground">($)</span>
                    </Label>
                    <Input
                      id="stoploss"
                      type="number"
                      step="0.01"
                      value={formData.stoploss}
                      onChange={(e) =>
                        handleInputChange("stoploss", e.target.value)
                      }
                      placeholder="145.00"
                      className="bg-input border-border focus:ring-2 focus:ring-primary/20 transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="minTarget"
                      className="text-sm font-medium text-foreground"
                    >
                      Min Target *{" "}
                      <span className="text-xs text-muted-foreground">(%)</span>
                    </Label>
                    <Input
                      id="minTarget"
                      type="number"
                      value={formData.minTarget}
                      onChange={(e) =>
                        handleInputChange("minTarget", e.target.value)
                      }
                      placeholder="5"
                      className="bg-input border-border focus:ring-2 focus:ring-primary/20 transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Performance Tracking Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold text-foreground">
                    Performance Tracking
                  </h2>
                  <span className="text-xs text-muted-foreground ml-2">
                    (Optional)
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="exit"
                      className="text-sm font-medium text-foreground"
                    >
                      Exit Price{" "}
                      <span className="text-xs text-muted-foreground">($)</span>
                    </Label>
                    <Input
                      id="exit"
                      type="number"
                      step="0.01"
                      value={formData.exit}
                      onChange={(e) =>
                        handleInputChange("exit", e.target.value)
                      }
                      placeholder="155.00"
                      className="bg-input border-border focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="return"
                      className="text-sm font-medium text-foreground"
                    >
                      Return{" "}
                      <span className="text-xs text-muted-foreground">(%)</span>
                    </Label>
                    <Input
                      id="return"
                      value={formData.return}
                      onChange={(e) =>
                        handleInputChange("return", e.target.value)
                      }
                      placeholder="3.33"
                      className="bg-input border-border focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* description and image field */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-800">
                    Description
                  </Label>
                  <div className="relative">
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Enter a clear, concise description of the call..."
                      maxLength={280}
                      className="min-h-28 resize-y w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      required
                    />
                    <div className="pointer-events-none absolute bottom-2 right-3 text-xs text-gray-500">
                      {formData.description.length}/280
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Keep it informative and actionable. Max 280 characters.
                  </p>
                </div>

                {/* Image Upload (Dropzone-style) */}
                <div
                  className="rounded-md border border-dashed border-gray-300 bg-white hover:border-gray-400 transition-colors"
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const file = e.dataTransfer.files?.[0];
                    if (file) {
                      setImageFile(file);
                      setImageName(file.name);
                    }
                  }}
                >
                  <label
                    htmlFor="image"
                    className="flex cursor-pointer flex-col items-center justify-center gap-2 px-4 py-6 text-center"
                  >
                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="text-sm font-medium">
                        Click to upload
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      or drag & drop
                    </span>
                    <span className="text-xs text-gray-400">
                      PNG, JPG up to 2MB
                    </span>
                  </label>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setImageFile(file);
                      setImageName(file ? file.name : null);
                    }}
                    className="sr-only"
                  />
                </div>
                {/* Preview filename */}
                {imageName && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-gray-700">
                    <span className="truncate">{imageName}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-border">
              <Button
                type="submit"
                disabled={isSaving}
                className="w-full sm:w-auto flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-base font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {isSaving ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Save className="h-5 w-5" />
                )}
                {isSaving ? "Creating Call..." : "Create Trading Call"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin")}
                className="w-full sm:w-auto px-8 py-3 text-base border-border hover:bg-muted/50 transition-all duration-200"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
