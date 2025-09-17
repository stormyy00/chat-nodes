"use client";

import { HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "What is Chat Nodes?",
    a: "Chat Nodes is an interactive AI chat app that organizes conversations into branches (nodes) when topics change, so you can explore ideas without losing context.",
  },
  {
    q: "Which AI models are supported?",
    a: "Gemini, OpenAI, local, and custom models. You can add API keys and configure providers in the Models tab.",
  },
  {
    q: "Can I use local models?",
    a: "Yes. Add a local provider with a base URL (e.g., http://localhost:11434) and select the model ID.",
  },
  {
    q: "Is my data private?",
    a: "We support local models and secure API key storage to help keep your data private. Review your provider settings before sharing sensitive information.",
  },
  {
    q: "Will there be a node-based UI?",
    a: "Yes. The /c route is reserved for the nodes UI. We will enable this once the core chat experience is finalized.",
  },
];

const Faq = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gpt-bg via-gpt-cream to-gpt-soft">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gpt-sage/20 text-gpt-sage px-4 py-2 rounded-full text-sm font-medium mb-4">
            <HelpCircle className="h-4 w-4" />
            Frequently Asked Questions
          </div>
          <h1 className="text-4xl font-bold text-gpt-text">FAQ</h1>
          <p className="mt-2 text-gpt-textSecondary">
            Quick answers to common questions.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map(({ q, a }) => (
            <details
              key={q}
              className="group border border-gpt-panel/60 rounded-lg bg-gpt-botBubble/90 open:bg-gpt-peach/10 transition-colors"
            >
              <summary className="cursor-pointer list-none px-4 py-3 flex items-start justify-between gap-4">
                <span className="font-medium text-gpt-text">{q}</span>
                <span className="text-gpt-textSecondary group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <div className="px-4 pb-4 text-gpt-textSecondary">{a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
