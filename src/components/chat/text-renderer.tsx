"use client";

import React from "react";

type Block =
  | { type: "code"; language: string | null; content: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "heading"; level: 1 | 2 | 3; content: string }
  | { type: "paragraph"; content: string };

function parseTextToBlocks(text: string): Block[] {
  const blocks: Block[] = [];
  const lines = text.replace(/\r\n?/g, "\n").split("\n");

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block ```lang
    const fenceMatch = line.match(/^```\s*([\w+-]+)?\s*$/);
    if (fenceMatch) {
      const lang = fenceMatch[1] || null;
      i++;
      const codeLines: string[] = [];
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      // consume closing fence if present
      if (i < lines.length && lines[i].startsWith("```")) i++;
      blocks.push({
        type: "code",
        language: lang,
        content: codeLines.join("\n"),
      });
      continue;
    }

    // Headings #, ##, ### or **Section:**
    const hMatch = line.match(/^(#{1,3})\s+(.+)$/);
    if (hMatch) {
      const level = hMatch[1].length as 1 | 2 | 3;
      blocks.push({ type: "heading", level, content: hMatch[2].trim() });
      i++;
      continue;
    }

    // Bold section line like **Museums & Culture:**
    const boldSection = line.match(/^\s*\*\*(.+?)\*\*:?\s*$/);
    if (boldSection) {
      blocks.push({
        type: "heading",
        level: 2,
        content: boldSection[1].trim(),
      });
      i++;
      continue;
    }

    // Lists (ordered/unordered)
    const listItems: string[] = [];
    let ordered = false;
    let j = i;
    while (j < lines.length) {
      const li = lines[j];
      const ul = li.match(/^\s*[-*]\s+(.+)$/);
      const ol = li.match(/^\s*\d+[.)]\s+(.+)$/);
      if (ul) {
        listItems.push(ul[1]);
        ordered = false;
        j++;
      } else if (ol) {
        listItems.push(ol[1]);
        ordered = true;
        j++;
      } else {
        break;
      }
    }
    if (listItems.length > 0) {
      blocks.push({ type: "list", ordered, items: listItems });
      i = j;
      continue;
    }

    // Paragraph (accumulate consecutive non-empty lines)
    const paraLines: string[] = [];
    j = i;
    while (j < lines.length && lines[j].trim() !== "") {
      paraLines.push(lines[j]);
      j++;
    }
    if (paraLines.length > 0) {
      blocks.push({ type: "paragraph", content: paraLines.join("\n") });
      i = j + 1; // skip following blank line
      continue;
    }

    // empty line
    i++;
  }

  return blocks.length ? blocks : [{ type: "paragraph", content: text }];
}

function linkify(text: string): (string | JSX.Element)[] {
  const parts: (string | JSX.Element)[] = [];
  const urlRegex = /(https?:\/\/[^\s)]+)|(www\.[^\s)]+)/gi;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = urlRegex.exec(text)) !== null) {
    const start = match.index;
    if (start > lastIndex) parts.push(text.slice(lastIndex, start));
    const url = match[0].startsWith("http") ? match[0] : `https://${match[0]}`;
    parts.push(
      <a
        key={`${start}-${url}`}
        href={url}
        target="_blank"
        rel="noreferrer"
        className="underline decoration-gpt-accent/60 underline-offset-2"
      >
        {match[0]}
      </a>,
    );
    lastIndex = start + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

function inlineMarkdown(text: string): (string | JSX.Element)[] {
  // process inline code first
  const segments: (string | JSX.Element)[] = [];
  const codeRe = /`([^`]+)`/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = codeRe.exec(text)) !== null) {
    if (m.index > last) segments.push(...linkify(text.slice(last, m.index)));
    segments.push(
      <code
        key={m.index}
        className="rounded bg-muted px-1 py-0.5 text-[0.85em]"
      >
        {m[1]}
      </code>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) segments.push(...linkify(text.slice(last)));

  // now apply bold and italic on string segments only
  const processEmphasis = (
    node: string | JSX.Element,
    idx: number,
  ): (string | JSX.Element)[] => {
    if (typeof node !== "string") return [node];
    // bold **text**
    const out: (string | JSX.Element)[] = [];
    const boldRe = /\*\*([^*]+)\*\*/g;
    let li = 0;
    let bm: RegExpExecArray | null;
    let counter = 0;
    while ((bm = boldRe.exec(node)) !== null) {
      if (bm.index > li) out.push(node.slice(li, bm.index));
      out.push(<strong key={`b-${idx}-${counter++}`}>{bm[1]}</strong>);
      li = bm.index + bm[0].length;
    }
    if (li < node.length) out.push(node.slice(li));

    // italic *text*
    const final: (string | JSX.Element)[] = [];
    out.forEach((piece, j) => {
      if (typeof piece !== "string") {
        final.push(piece);
        return;
      }
      const emRe = /(^|\s)\*([^*]+)\*(?=\s|$)/g;
      let lj = 0;
      let em: RegExpExecArray | null;
      let c2 = 0;
      while ((em = emRe.exec(piece)) !== null) {
        const start = em.index;
        if (start > lj) final.push(piece.slice(lj, start));
        final.push(em[1]);
        final.push(<em key={`i-${idx}-${j}-${c2++}`}>{em[2]}</em>);
        lj = start + em[0].length;
      }
      if (lj < piece.length) final.push(piece.slice(lj));
    });
    return final;
  };

  return segments.flatMap(processEmphasis);
}

interface TextRendererProps {
  text: string;
}

const TextRenderer: React.FC<TextRendererProps> = ({ text }) => {
  const blocks = parseTextToBlocks(text);
  return (
    <div className="space-y-3">
      {blocks.map((b, idx) => {
        if (b.type === "code") {
          return (
            <div key={idx} className="rounded-md overflow-hidden border">
              <div className="flex items-center justify-between bg-muted px-3 py-1.5 text-xs text-muted-foreground">
                <span>{b.language ?? "code"}</span>
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(b.content)}
                  className="rounded bg-background px-2 py-0.5 hover:bg-accent"
                >
                  Copy
                </button>
              </div>
              <pre className="bg-[#1e1e1e] text-white p-3 text-xs leading-relaxed overflow-x-auto">
                <code>{b.content}</code>
              </pre>
            </div>
          );
        }
        if (b.type === "list") {
          const ListTag = b.ordered ? "ol" : "ul";
          return (
            <ListTag
              key={idx}
              className={
                b.ordered
                  ? "list-decimal pl-5 space-y-1"
                  : "list-disc pl-5 space-y-1"
              }
            >
              {b.items.map((it, i) => (
                <li key={i} className="leading-6">
                  {inlineMarkdown(it)}
                </li>
              ))}
            </ListTag>
          );
        }
        if (b.type === "heading") {
          const sizes = { 1: "text-xl", 2: "text-lg", 3: "text-base" } as const;
          return (
            <div key={idx} className={`${sizes[b.level]} font-semibold`}>
              {inlineMarkdown(b.content)}
            </div>
          );
        }
        return (
          <p key={idx} className="leading-7 whitespace-pre-wrap break-words">
            {inlineMarkdown(b.content)}
          </p>
        );
      })}
    </div>
  );
};

export default TextRenderer;
