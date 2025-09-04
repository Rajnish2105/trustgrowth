"use client";

import type React from "react";
import { useState } from "react";
import { Plus, UploadCloud, Image as ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import multiavatar from "@multiavatar/multiavatar";
import { useCalls } from "@/hooks/useCalls";
import CallSubmitButton from "./submit-button";
import { CallsTable } from "./CallsTable";
import { WebSocketStatus } from "./WebSocketStatus";
import Link from "next/link";

export default function AdminPanel({
  username,
  useremail,
}: {
  username: string;
  useremail: string;
}) {
  const svgCode = multiavatar(username || "user");

  const { createCall, calls, isLoading, error: callsError, deleteCall } = useCalls();
  const [error, setError] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsAdding(true);
    setError(null);
    const formEl = e.currentTarget;
    const payload = new FormData(formEl);
    try {
      await createCall(payload);
      formEl.reset();
      setDescription("");
      setImageName(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create call");
    } finally {
      setIsAdding(false);
    }
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageName(file.name);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600 mt-1">Manage trading calls and results</p>
        </div>

        {/* Admin Details */}
        <Card className="border-0 shadow-sm bg-slate-200">
          <CardContent className="p-6 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span
                className="rounded-full overflow-hidden"
                style={{ width: 70, height: 70, display: "inline-block" }}
                dangerouslySetInnerHTML={{ __html: svgCode }}
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {username}
                </h3>
                <p className="text-gray-600">{useremail}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <WebSocketStatus />
              <Link
                href="/"
                className="border-2 border-black px-10 py-2 rounded-md"
              >
                Go to home
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Add New Call Form */}
        <Card className="border-0 shadow-sm bg-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add New Call
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="symbol">Symbol</Label>
                  <Input
                    id="symbol"
                    name="symbol"
                    placeholder="e.g., RELIANCE"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Name</Label>
                  <Input
                    id="stock"
                    name="stock"
                    placeholder="e.g., Reliance Industries"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="action">Action</Label>
                  <Select name="action" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select action" />
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
                  <Label htmlFor="entry">Entry Price</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                      ₹
                    </span>
                    <Input
                      id="entry"
                      name="entry"
                      type="number"
                      step="0.01"
                      placeholder="2456.50"
                      className="pl-8"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stoploss">Stop Loss</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                      ₹
                    </span>
                    <Input
                      id="stoploss"
                      name="stoploss"
                      type="number"
                      step="0.01"
                      placeholder="2400.00"
                      className="pl-8"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minTarget">Minimum Target (%)</Label>
                  <Input
                    id="minTarget"
                    name="minTarget"
                    type="number"
                    placeholder="e.g., 5"
                    required
                  />
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
                    <Textarea
                      id="description"
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter a clear, concise description of the call..."
                      maxLength={280}
                      className="min-h-28 resize-y"
                      required
                    />
                    <div className="pointer-events-none absolute bottom-2 right-3 text-xs text-gray-500">
                      {description.length}/280
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
                  onDrop={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const file = e.dataTransfer.files?.[0];
                    if (file) {
                      setImageName(file.name);
                    }
                  }}
                >
                  <label
                    htmlFor="image"
                    className="flex cursor-pointer flex-col items-center justify-center gap-2 px-4 py-6 text-center"
                  >
                    <div className="flex items-center gap-2 text-gray-700">
                      <UploadCloud className="h-5 w-5" />
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
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                </div>
                {/* Preview filename */}
                {imageName && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-gray-700">
                    <ImageIcon className="h-4 w-4 text-gray-500" />
                    <span className="truncate">{imageName}</span>
                  </div>
                )}
              </div>
              <CallSubmitButton isAdding={isAdding} />
            </form>
          </CardContent>
        </Card>

        {/* Calls Management Table */}
        <CallsTable calls={calls} isLoading={isLoading} error={callsError} deleteCall={deleteCall} />
      </div>
    </div>
  );
}
