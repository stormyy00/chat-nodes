"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative py-20 bg-gpt-bg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gpt-panel text-gpt-text px-4 py-2 rounded-full text-sm font-medium mb-6 border border-gpt-panel/80">
            <Sparkles className="h-4 w-4" />
            Interactive AI Conversations
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gpt-text mb-6">
            Chat with{" "}
            <span className="bg-gradient-to-r from-gpt-lavender to-gpt-accent bg-clip-text text-transparent">
              Intelligence
            </span>
            <br />
            Create with{" "}
            <span className="bg-gradient-to-r from-gpt-peach to-gpt-coral bg-clip-text text-transparent">
              Imagination
            </span>
          </h1>

          <p className="text-xl text-gpt-text max-w-3xl mx-auto mb-8 leading-relaxed">
            Experience the future of AI conversations with interactive nodes,
            intelligent topic branching, and seamless integration with your
            favorite AI models.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/chatbot">
              <Button
                size="lg"
                className="bg-gpt-accent hover:bg-gpt-accent/80 text-gpt-text px-8 py-3 text-lg"
              >
                Start Chatting
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/c">
              <Button
                size="lg"
                variant="outline"
                className="border-gpt-sage text-gpt-sage hover:bg-gpt-sage/10 px-8 py-3 text-lg"
              >
                Try Nodes
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <Card className="border border-gpt-panel bg-gpt-panel/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gpt-panel rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gpt-panel/80">
                <Sparkles className="h-8 w-8 text-gpt-text" />
              </div>
              <h3 className="text-lg font-semibold text-gpt-text mb-2">
                Smart Branching
              </h3>
              <p className="text-gpt-textSecondary">
                Conversations automatically branch into topics, keeping your
                ideas organized and accessible.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gpt-panel bg-gpt-panel/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gpt-panel rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gpt-panel/80">
                <ArrowRight className="h-8 w-8 text-gpt-text" />
              </div>
              <h3 className="text-lg font-semibold text-gpt-text mb-2">
                Multi-Model
              </h3>
              <p className="text-gpt-textSecondary">
                Connect with OpenAI, Gemini, local models, and custom AI
                providers all in one place.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gpt-panel bg-gpt-panel/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gpt-panel rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gpt-panel/80">
                <Sparkles className="h-8 w-8 text-gpt-text" />
              </div>
              <h3 className="text-lg font-semibold text-gpt-text mb-2">
                Beautiful Design
              </h3>
              <p className="text-gpt-textSecondary">
                Inspired by Studio Ghibli aesthetics, every interaction feels
                magical and intuitive.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Hero;
