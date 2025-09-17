"use client";

import { Check, Zap, Crown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const Pricing = () => {
  return (
    <section id="pricing" className="py-16 bg-gpt-bg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gpt-text mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gpt-textSecondary max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include access to
            our core features.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <Card className="border border-gpt-panel bg-gpt-panel/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 bg-gpt-panel rounded-lg flex items-center justify-center mx-auto mb-4 border border-gpt-panel/80">
                <Zap className="h-6 w-6 text-gpt-text" />
              </div>
              <CardTitle className="text-xl text-gpt-text">Free</CardTitle>
              <div className="text-3xl font-bold text-gpt-text">$0</div>
              <p className="text-gpt-textSecondary">
                Perfect for getting started
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-gpt-sage" />
                  <span className="text-gpt-textSecondary">
                    Basic chat functionality
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-gpt-sage" />
                  <span className="text-gpt-textSecondary">
                    Gemini 2.0 Flash access
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-gpt-sage" />
                  <span className="text-gpt-textSecondary">
                    5 conversations per month
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-gpt-sage" />
                  <span className="text-gpt-textSecondary">
                    Community support
                  </span>
                </li>
              </ul>
              <Link href="/chatbot" className="block">
                <Button className="w-full bg-gpt-sage hover:bg-gpt-sage/80 text-gpt-text">
                  Get Started
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="border-2 border-gpt-panel bg-gpt-panel/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-gpt-panel text-gpt-text px-3 py-1 rounded-full text-xs font-medium border border-gpt-panel/80">
                Most Popular
              </span>
            </div>
            <CardHeader className="text-center pb-4 pt-6">
              <div className="w-12 h-12 bg-gpt-panel rounded-lg flex items-center justify-center mx-auto mb-4 border border-gpt-panel/80">
                <Crown className="h-6 w-6 text-gpt-text" />
              </div>
              <CardTitle className="text-xl text-gpt-text">Pro</CardTitle>
              <div className="text-3xl font-bold text-gpt-text">$19</div>
              <p className="text-gpt-textSecondary">per month</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-gpt-lavender" />
                  <span className="text-gpt-textSecondary">
                    Everything in Free
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-gpt-lavender" />
                  <span className="text-gpt-textSecondary">
                    Unlimited conversations
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-gpt-lavender" />
                  <span className="text-gpt-textSecondary">
                    All AI models (OpenAI, Gemini, etc.)
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-gpt-lavender" />
                  <span className="text-gpt-textSecondary">
                    Local model support
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-gpt-lavender" />
                  <span className="text-gpt-textSecondary">
                    Priority support
                  </span>
                </li>
              </ul>
              <Link href="/chatbot" className="block">
                <Button className="w-full bg-gpt-lavender hover:bg-gpt-lavender/80 text-gpt-text">
                  Start Pro Trial
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Enterprise Plan */}
          <Card className="border border-gpt-panel bg-gpt-panel/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 bg-gpt-panel rounded-lg flex items-center justify-center mx-auto mb-4 border border-gpt-panel/80">
                <Sparkles className="h-6 w-6 text-gpt-text" />
              </div>
              <CardTitle className="text-xl text-gpt-text">
                Enterprise
              </CardTitle>
              <div className="text-3xl font-bold text-gpt-text">Custom</div>
              <p className="text-gpt-textSecondary">
                For teams and organizations
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-gpt-peach" />
                  <span className="text-gpt-textSecondary">
                    Everything in Pro
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-gpt-peach" />
                  <span className="text-gpt-textSecondary">
                    Custom AI model integration
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-gpt-peach" />
                  <span className="text-gpt-textSecondary">
                    Team collaboration features
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-gpt-peach" />
                  <span className="text-gpt-textSecondary">
                    Advanced analytics
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-gpt-peach" />
                  <span className="text-gpt-textSecondary">
                    Dedicated support
                  </span>
                </li>
              </ul>
              <Link href="/chatbot" className="block">
                <Button className="w-full bg-gpt-peach hover:bg-gpt-peach/80 text-gpt-text">
                  Contact Sales
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
