"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Gavel, TrendingUp, Search, Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center space-y-8">
        {/* 404 Header */}
        <div className="space-y-4">
          <div className="relative">
            <h1 className="text-9xl font-bold text-slate-200 select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <Search className="w-16 h-16 text-slate-400" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            Page Not Found
          </h2>
          <p className="text-lg text-slate-600 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-blue-200">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                <Code className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-800">
                Web Application Projects
              </h3>
              <p className="text-sm text-slate-600">
                Request custom web applications tailored to your business needs
              </p>
              <Link href="/webSolutions">
                <Button
                  variant="outline"
                  className="w-full bg-white text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  Explore Projects
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-green-200">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                <Gavel className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-slate-800">Auction Bidding</h3>
              <p className="text-sm text-slate-600">
                Participate in competitive bidding for exclusive opportunities
              </p>
              <Link href="/auction">
                <Button
                  variant="outline"
                  className="w-full bg-white text-green-600 border-green-200 hover:bg-green-50"
                >
                  View Auctions
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-purple-200">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-800">
                Stock Market Data
              </h3>
              <p className="text-sm text-slate-600">
                Access real-time and historical stock market information
              </p>
              <Link href="/stockMarket">
                <Button
                  variant="outline"
                  className="w-full bg-white text-purple-600 border-purple-200 hover:bg-purple-50"
                >
                  Get Data
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Link href="/">
            <Button className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Help Text */}
        <div className="pt-8 border-t border-slate-200 mt-12">
          <p className="text-sm text-slate-500">
            Need help? Contact our support team or browse our services above to
            find what you&apos;re looking for.
          </p>
        </div>
      </div>
    </div>
  );
}
