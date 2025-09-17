"use client";

import { MessageSquare, Github, Twitter, Mail } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gpt-panel/60 backdrop-blur-sm border-t border-gpt-panel/50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-gpt-text">
              <MessageSquare className="h-5 w-5 text-gpt-accent" />
              <span className="font-semibold">Chat Nodes</span>
            </Link>
            <p className="text-sm text-gpt-textSecondary">
              Interactive AI conversations with intelligent topic branching and
              beautiful design.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="text-gpt-textSecondary hover:text-gpt-accent transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gpt-textSecondary hover:text-gpt-accent transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gpt-textSecondary hover:text-gpt-accent transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gpt-text">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/chatbot"
                  className="text-gpt-textSecondary hover:text-gpt-accent transition-colors"
                >
                  Chat Interface
                </Link>
              </li>
              <li>
                <Link
                  href="/c"
                  className="text-gpt-textSecondary hover:text-gpt-accent transition-colors"
                >
                  Node System
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gpt-textSecondary hover:text-gpt-accent transition-colors"
                >
                  AI Models
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gpt-textSecondary hover:text-gpt-accent transition-colors"
                >
                  Features
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gpt-text">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/#about"
                  className="text-gpt-textSecondary hover:text-gpt-accent transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gpt-textSecondary hover:text-gpt-accent transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gpt-textSecondary hover:text-gpt-accent transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gpt-textSecondary hover:text-gpt-accent transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gpt-text">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/faq"
                  className="text-gpt-textSecondary hover:text-gpt-accent transition-colors"
                >
                  Help Center / FAQ
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gpt-textSecondary hover:text-gpt-accent transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gpt-textSecondary hover:text-gpt-accent transition-colors"
                >
                  Community
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gpt-textSecondary hover:text-gpt-accent transition-colors"
                >
                  Status
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gpt-panel/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gpt-textSecondary">
            © 2024 Chat Nodes. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-sm text-gpt-textSecondary hover:text-gpt-accent transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-gpt-textSecondary hover:text-gpt-accent transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-sm text-gpt-textSecondary hover:text-gpt-accent transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
