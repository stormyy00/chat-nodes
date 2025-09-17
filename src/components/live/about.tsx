"use client";

import { MessageSquare, Zap, Users, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <section className="py-16 bg-gpt-bg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gpt-text mb-4">
            About Chat Nodes
          </h2>
          <p className="text-lg text-gpt-textSecondary max-w-2xl mx-auto">
            Revolutionizing AI conversations with interactive nodes, intelligent
            topic management, and seamless integration with your favorite AI
            models.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="border-0 bg-gpt-sage/20 backdrop-blur-sm shadow-sm hover:bg-gpt-sage/30 transition-colors">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gpt-sage/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-6 w-6 text-gpt-sage" />
              </div>
              <h3 className="font-semibold text-gpt-text mb-2">
                Interactive Conversations
              </h3>
              <p className="text-sm text-gpt-textSecondary">
                Create dynamic, branching conversations that adapt to your needs
                and interests.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gpt-lavender/20 backdrop-blur-sm shadow-sm hover:bg-gpt-lavender/30 transition-colors">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gpt-lavender/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-gpt-lavender" />
              </div>
              <h3 className="font-semibold text-gpt-text mb-2">
                Multi-Model Support
              </h3>
              <p className="text-sm text-gpt-textSecondary">
                Connect with OpenAI, Gemini, local models, and custom AI
                providers seamlessly.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gpt-peach/20 backdrop-blur-sm shadow-sm hover:bg-gpt-peach/30 transition-colors">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gpt-peach/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-gpt-peach" />
              </div>
              <h3 className="font-semibold text-gpt-text mb-2">
                User-Centric Design
              </h3>
              <p className="text-sm text-gpt-textSecondary">
                Built with a beautiful, intuitive interface inspired by Studio
                Ghibli aesthetics.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gpt-mint/20 backdrop-blur-sm shadow-sm hover:bg-gpt-mint/30 transition-colors">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gpt-mint/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-gpt-mint" />
              </div>
              <h3 className="font-semibold text-gpt-text mb-2">
                Privacy First
              </h3>
              <p className="text-sm text-gpt-textSecondary">
                Your conversations stay private with local model support and
                secure API key management.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gpt-panel/40 backdrop-blur-sm rounded-lg p-8">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-semibold text-gpt-text mb-4">
              The Future of AI Conversations
            </h3>
            <p className="text-gpt-textSecondary mb-6">
              Chat Nodes goes beyond traditional chatbots by creating an
              interactive, node-based conversation system. When topics change or
              new questions arise, the system automatically creates new
              conversation branches, making it easy to explore different aspects
              of your discussions without losing context.
            </p>
            <p className="text-gpt-textSecondary">
              Whether you're brainstorming ideas, learning new concepts, or
              collaborating on projects, Chat Nodes adapts to your workflow and
              helps you stay organized while maintaining the natural flow of
              conversation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
