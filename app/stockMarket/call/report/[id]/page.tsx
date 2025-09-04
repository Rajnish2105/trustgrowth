"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageModal } from "@/components/adminPanel/image-modal";
import Image from "next/image";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Target,
  Shield,
  Calendar,
  Clock,
  DollarSign,
  BarChart3,
  AlertCircle,
  Loader2,
  ImageIcon,
  FileText,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface Call {
  id: string;
  symbol: string;
  entry: number;
  stoploss: number;
  minTarget: number;
  stock: string;
  action: "BUY" | "SELL" | "WATCH" | "HOLD";
  description: string;
  imageUrl: string;
  exit?: string;
  return?: string;
  allUpdates: string[];
  createdAt: string;
  updatedAt: string;
}

export default function CallDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const callId = params.id as string;
  
  const [call, setCall] = useState<Call | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    const fetchCall = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`/api/calls/${callId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch call details");
        }
        
        const data = await response.json();
        setCall(data.call);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load call details");
      } finally {
        setIsLoading(false);
      }
    };

    if (callId) {
      fetchCall();
    }
  }, [callId]);

  const getActionColor = (action: string) => {
    switch (action) {
      case "BUY":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "SELL":
        return "bg-red-100 text-red-700 border-red-200";
      case "WATCH":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "HOLD":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "BUY":
        return <TrendingUp className="h-5 w-5" />;
      case "SELL":
        return <TrendingDown className="h-5 w-5" />;
      case "WATCH":
        return <BarChart3 className="h-5 w-5" />;
      case "HOLD":
        return <Shield className="h-5 w-5" />;
      default:
        return <BarChart3 className="h-5 w-5" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateTargetPrice = () => {
    if (!call) return 0;
    const multiplier = call.action === "SELL" ? (100 - call.minTarget) / 100 : (100 + call.minTarget) / 100;
    return call.entry * multiplier;
  };

  const getCallStatus = () => {
    if (!call) return "Unknown";
    if (call.exit) return "Closed";
    return "Active";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Closed":
        return "bg-gray-100 text-gray-700";
      case "Active":
        return "bg-emerald-100 text-emerald-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <Card className="p-8 shadow-xl">
          <div className="flex items-center justify-center space-x-3">
            <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
            <span className="text-lg font-medium text-gray-700">Loading call details...</span>
          </div>
        </Card>
      </div>
    );
  }

  if (error || !call) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <Card className="p-8 shadow-xl">
          <div className="flex items-center text-red-600 space-x-3">
            <AlertCircle className="h-6 w-6" />
            <span className="text-lg font-medium">{error || "Call not found"}</span>
          </div>
        </Card>
      </div>
    );
  }

  const targetPrice = calculateTargetPrice();
  const status = getCallStatus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="mb-6 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Calls
          </Button>

          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Badge className={`px-3 py-1 ${getActionColor(call.action)} border`}>
                {getActionIcon(call.action)}
                <span className="ml-2 font-semibold">{call.action}</span>
              </Badge>
              <Badge className={`px-3 py-1 ${getStatusColor(status)}`}>
                {status === "Closed" ? <XCircle className="h-4 w-4 mr-1" /> : <CheckCircle className="h-4 w-4 mr-1" />}
                {status}
              </Badge>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">{call.stock}</h1>
            <p className="text-xl text-gray-600">{call.symbol}</p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Key Metrics */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-emerald-600" />
                  Key Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-emerald-50 rounded-lg">
                    <p className="text-sm text-emerald-600 font-medium mb-1">Entry Price</p>
                    <p className="text-2xl font-bold text-emerald-700">₹{call.entry.toFixed(2)}</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium mb-1">Target Price</p>
                    <p className="text-2xl font-bold text-blue-700">₹{targetPrice.toFixed(2)}</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-600 font-medium mb-1">Stop Loss</p>
                    <p className="text-2xl font-bold text-red-700">₹{call.stoploss.toFixed(2)}</p>
                  </div>
                  <div className="text-center p-4 bg-amber-50 rounded-lg">
                    <p className="text-sm text-amber-600 font-medium mb-1">Target %</p>
                    <p className="text-2xl font-bold text-amber-700">{call.minTarget}%</p>
                  </div>
                </div>

                {/* Exit and Return if available */}
                {(call.exit || call.return) && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {call.exit && (
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <p className="text-sm text-purple-600 font-medium mb-1">Exit Price</p>
                          <p className="text-2xl font-bold text-purple-700">₹{call.exit}</p>
                        </div>
                      )}
                      {call.return && (
                        <div className="text-center p-4 bg-emerald-50 rounded-lg">
                          <p className="text-sm text-emerald-600 font-medium mb-1">Return</p>
                          <p className="text-2xl font-bold text-emerald-700">{call.return}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Analysis & Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed">{call.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Call Updates */}
            {call.allUpdates && call.allUpdates.length > 0 && (
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-amber-600" />
                    Call Updates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {call.allUpdates.map((update, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700">{update}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Call Image */}
            {call.imageUrl && (
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-purple-600" />
                    Call Chart
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="relative w-full h-48 bg-gray-50 rounded-lg overflow-hidden cursor-zoom-in group"
                    onClick={() => setIsImageModalOpen(true)}
                  >
                    <Image
                      src={call.imageUrl}
                      alt={`${call.stock} call chart`}
                      width={400}
                      height={192}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                        if (nextElement) {
                          nextElement.style.display = "flex";
                        }
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 hidden">
                      <ImageIcon className="h-8 w-8" />
                      <span className="ml-2">Image not available</span>
                    </div>
                    <div className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-1 text-xs text-white">
                      Click to enlarge
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Call Timeline */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-indigo-600" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 mt-1"></div>
                    <div>
                      <p className="font-medium text-gray-900">Call Created</p>
                      <p className="text-sm text-gray-500">{formatDate(call.createdAt)}</p>
                    </div>
                  </div>
                  {call.updatedAt !== call.createdAt && (
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mt-1"></div>
                      <div>
                        <p className="font-medium text-gray-900">Last Updated</p>
                        <p className="text-sm text-gray-500">{formatDate(call.updatedAt)}</p>
                      </div>
                    </div>
                  )}
                  {call.exit && (
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 rounded-full bg-gray-500 mt-1"></div>
                      <div>
                        <p className="font-medium text-gray-900">Call Closed</p>
                        <p className="text-sm text-gray-500">Exit at ₹{call.exit}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Risk Assessment */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-red-600" />
                  Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Risk-Reward Ratio</span>
                    <span className="font-medium">
                      1:{((Math.abs(targetPrice - call.entry) / Math.abs(call.entry - call.stoploss))).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Potential Gain</span>
                    <span className="font-medium text-emerald-600">
                      ₹{Math.abs(targetPrice - call.entry).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Potential Loss</span>
                    <span className="font-medium text-red-600">
                      ₹{Math.abs(call.entry - call.stoploss).toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isImageModalOpen && call.imageUrl && (
        <ImageModal
          open={isImageModalOpen}
          onOpenChange={setIsImageModalOpen}
          src={call.imageUrl}
          alt={`${call.stock} call chart`}
        />
      )}
    </div>
  );
}