"use client";

import React, { useActionState } from "react";
import { Plus } from "lucide-react";
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
import multiavatar from "@multiavatar/multiavatar";
import { addCall } from "@/app/actions/add-call";
import { useSession } from "next-auth/react";
import CallSubmitButton from "./submit-button";

export default function AdminPanel({
  username,
  useremail,
}: {
  username: string;
  useremail: string;
}) {
  const svgCode = multiavatar(username || "user");
  const { data: session } = useSession();
  // Define the form state type
  interface FormState {
    error: string | null;
    success: boolean;
    values?: {
      userId?: string;
      stock?: string;
      action?: "BUY" | "SELL";
      entry?: string;
      exit?: string;
      return?: string;
      status?: "Profit" | "Loss";
      date?: string;
    };
  }
  const initialState: FormState = { error: null, success: false };
  const [state, formAction] = useActionState(addCall, initialState);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600 mt-1">Manage trading calls and results</p>
        </div>

        {/* Admin Details */}
        <Card className="border-0 shadow-sm bg-slate-100">
          <CardContent className="p-6">
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
          </CardContent>
        </Card>

        {/* Add New Call Form */}
        <Card className="border-0 shadow-sm bg-slate-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add New Call
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-4">
              <input type="hidden" name="userId" value={session?.user.id} />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    defaultValue={state.values?.stock || ""}
                    name="stock"
                    placeholder="e.g., RELIANCE"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="action">Action</Label>
                  <Select name="action" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BUY">BUY</SelectItem>
                      <SelectItem value="SELL">SELL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="entry">Entry</Label>
                  <Input
                    id="entry"
                    defaultValue={state.values?.entry || ""}
                    name="entry"
                    placeholder="e.g., 2,456"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exit">Exit</Label>
                  <Input
                    id="exit"
                    defaultValue={state.values?.exit || ""}
                    name="exit"
                    placeholder="e.g., 2,580"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="return">Return</Label>
                  <Input
                    id="return"
                    defaultValue={state.values?.return || ""}
                    name="return"
                    placeholder="e.g., +5.05%"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select name="status" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Profit">Profit</SelectItem>
                      <SelectItem value="Loss">Loss</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    defaultValue={state.values?.date || ""}
                    name="date"
                    type="date"
                    required
                  />
                </div>
              </div>
              <CallSubmitButton />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
