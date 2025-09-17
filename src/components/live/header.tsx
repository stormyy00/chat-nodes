"use client";

import Link from "next/link";
import { MessageSquare } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-gpt-panel/90 border-b border-gpt-panel">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-gpt-text">
          <MessageSquare className="h-5 w-5 text-gpt-accent" />
          <span className="font-semibold">Chat Nodes</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/" className="hover:text-gpt-accent transition-colors">
            Home
          </Link>
          <Link
            href="/#about"
            className="hover:text-gpt-accent transition-colors"
          >
            About
          </Link>
          <Link
            href="/#pricing"
            className="hover:text-gpt-accent transition-colors"
          >
            Pricing
          </Link>
          <Link href="/faq" className="hover:text-gpt-accent transition-colors">
            FAQ
          </Link>
          <Link
            href="/chatbot"
            className="ml-2 rounded-md bg-gpt-accent px-3 py-1.5 text-gpt-text hover:bg-gpt-accent/80 transition-colors"
          >
            Open App
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
