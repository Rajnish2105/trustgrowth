"use client";

import type React from "react";

import { Card } from "@/components/ui/card";
import { TrendingUp, BarChart3, Activity } from "lucide-react";

export default function IntraDayPage() {

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-card/30 to-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          {/* Trading Icons */}
          <div className="flex justify-center items-center gap-6 mb-8">
            <div className="p-3 rounded-full bg-primary/10">
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
            <div className="p-3 rounded-full bg-secondary/10">
              <BarChart3 className="w-8 h-8 text-secondary" />
            </div>
            <div className="p-3 rounded-full bg-accent/10">
              <Activity className="w-8 h-8 text-accent" />
            </div>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-black text-primary tracking-tight">
              Intraday Trading
            </h1>
            <h2 className="text-4xl md:text-5xl font-black text-foreground">
              Coming Soon!
            </h2>
            <p className="text-xl md:text-2xl text-muted max-w-2xl mx-auto leading-relaxed">
              Get ready to trade on-the-go with our revolutionary new intraday
              trading feature. Real-time analytics, instant execution, maximum
              profits.
            </p>
          </div>

          {/* Features Preview */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
            {[
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Real-Time Analytics",
                description:
                  "Advanced charts and indicators for precise market analysis",
              },
              {
                icon: <Activity className="w-8 h-8" />,
                title: "Lightning Fast Execution",
                description:
                  "Execute trades in milliseconds with our optimized platform",
              },
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: "Smart Risk Management",
                description: "Automated stop-loss and take-profit features",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="p-6 bg-card/60 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-colors"
              >
                <div className="text-primary mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">
                  {feature.title}
                </h4>
                <p className="text-muted text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
