"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Call } from "@/hooks/useCalls";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2, Loader2, AlertCircle } from "lucide-react";

import Link from "next/link";

interface CallsTableProps {
  calls: Call[];
  isLoading: boolean;
  error: string | null;
  deleteCall: (id: string) => Promise<void>;
}

export function CallsTable({ calls, isLoading, error, deleteCall }: CallsTableProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleEdit = (callId: string) => {
    router.push(`/admin/calls/${callId}/edit`);
  };

  const handleDelete = async (callId: string) => {
    if (!confirm("Are you sure you want to delete this call?")) {
      return;
    }

    try {
      setDeletingId(callId);
      await deleteCall(callId);
    } catch (error) {
      console.error("Error deleting call:", error);
      alert("Failed to delete call");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getActionBadgeVariant = (action: string) => {
    switch (action) {
      case "BUY":
        return "default";
      case "SELL":
        return "destructive";
      case "WATCH":
        return "secondary";
      case "HOLD":
        return "outline";
      default:
        return "secondary";
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading calls...</span>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="flex items-center text-destructive">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>Error: {error}</span>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-slate-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Trading Calls</h2>
        <Link
          className="py-2 px-4 border border-black rounded-md"
          href="/admin/calls/new"
        >
          New call
        </Link>
      </div>

      {calls.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No calls found. Create your first call to get started.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Entry</TableHead>
                <TableHead>Stop Loss</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Exit</TableHead>
                <TableHead>Return</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {calls.map((call) => (
                <TableRow key={call.id}>
                  <TableCell className="font-medium">{call.symbol}</TableCell>
                  <TableCell>
                    <Badge variant={getActionBadgeVariant(call.action)}>
                      {call.action}
                    </Badge>
                  </TableCell>
                  <TableCell>${call.entry}</TableCell>
                  <TableCell>${call.stoploss}</TableCell>
                  <TableCell>{call.minTarget}%</TableCell>
                  <TableCell>{call.stock}</TableCell>
                  <TableCell>{call.exit || "-"}</TableCell>
                  <TableCell>{call.return || "-"}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(call.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(call.id)}
                        className="flex items-center gap-1"
                      >
                        <Edit className="h-3 w-3" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(call.id)}
                        disabled={deletingId === call.id}
                        className="flex items-center gap-1 text-black"
                      >
                        {deletingId === call.id ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <Trash2 className="h-3 w-3" />
                        )}
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </Card>
  );
}
