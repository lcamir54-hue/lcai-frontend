import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarkdownProps {
  content: string;
  className?: string;
}

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(
        <strong key={`b-${key++}`} className="font-medium text-[var(--text-primary)]">
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
      nodes.push(
        <code
          key={`c-${key++}`}
          dir="ltr"
          className="rounded-[6px] bg-[var(--surface-secondary)] px-1.5 py-0.5 font-mono text-[12.5px] text-[var(--text-primary)]"
        >
          {token.slice(1, -1)}
        </code>,
      );
    }
    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

export function Markdown({ content, className }: MarkdownProps) {
  const blocks = content.replace(/\r\n/g, "\n").split("\n");
  const elements: ReactNode[] = [];
  let index = 0;

  while (index < blocks.length) {
    const line = blocks[index];

    if (line.startsWith("```")) {
      const code: string[] = [];
      index += 1;
      while (index < blocks.length && !blocks[index].startsWith("```")) {
        code.push(blocks[index]);
        index += 1;
      }
      elements.push(
        <pre
          key={`pre-${index}`}
          dir="ltr"
          className="my-3 overflow-x-auto rounded-[14px] bg-[var(--surface-secondary)] px-4 py-3 text-[12.5px] leading-6 text-[var(--text-primary)]"
        >
          <code>{code.join("\n")}</code>
        </pre>,
      );
      index += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h3
          key={`h-${index}`}
          className="mb-2 mt-4 font-serif text-[22px] leading-[1.5] text-[var(--text-primary)]"
        >
          {renderInline(line.slice(3))}
        </h3>,
      );
      index += 1;
      continue;
    }

    if (line.startsWith("# ")) {
      elements.push(
        <h2
          key={`h-${index}`}
          className="mb-2 mt-4 font-serif text-[26px] leading-[1.5] text-[var(--text-primary)]"
        >
          {renderInline(line.slice(2))}
        </h2>,
      );
      index += 1;
      continue;
    }

    if (/^[\d۰-۹]+\.\s/.test(line)) {
      const items: string[] = [];
      while (index < blocks.length && /^[\d۰-۹]+\.\s/.test(blocks[index])) {
        items.push(blocks[index]);
        index += 1;
      }
      elements.push(
        <ol
          key={`ol-${index}`}
          className="my-3 list-none space-y-1.5 text-[14.5px] leading-8"
        >
          {items.map((item, itemIndex) => (
            <li key={itemIndex}>{renderInline(item)}</li>
          ))}
        </ol>,
      );
      continue;
    }

    if (/^[-*]\s/.test(line)) {
      const items: string[] = [];
      while (index < blocks.length && /^[-*]\s/.test(blocks[index])) {
        items.push(blocks[index].replace(/^[-*]\s/, ""));
        index += 1;
      }
      elements.push(
        <ul
          key={`ul-${index}`}
          className="my-3 list-disc space-y-1.5 ps-5 text-[14.5px] leading-8"
        >
          {items.map((item, itemIndex) => (
            <li key={itemIndex}>{renderInline(item)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    if (line.trim() === "") {
      index += 1;
      continue;
    }

    const paragraph: string[] = [line];
    index += 1;
    while (
      index < blocks.length &&
      blocks[index].trim() !== "" &&
      !blocks[index].startsWith("#") &&
      !blocks[index].startsWith("```") &&
      !/^[-*]\s/.test(blocks[index]) &&
      !/^[\d۰-۹]+\.\s/.test(blocks[index])
    ) {
      paragraph.push(blocks[index]);
      index += 1;
    }

    elements.push(
      <p key={`p-${index}`} className="my-2.5 text-[14.5px] leading-8">
        {renderInline(paragraph.join(" "))}
      </p>,
    );
  }

  return (
    <div dir="auto" className={cn("text-[var(--text-primary)]", className)}>
      {elements}
    </div>
  );
}
