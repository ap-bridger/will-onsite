import { useState } from "react";
import Markdown from "react-markdown";
import type { Components } from "react-markdown";
import { MARKDOWN_COMPONENTS } from "@/lib/markdown";

type TruncatedTextCellProps = {
  text: React.ReactNode;
  paddingLeft?: string;
  paddingRight?: string;
  color?: string;
  textAlign?: "end";
  py?: string;
  /**
   * When true, render Markdown when the cell is expanded.
   * The truncated view will still display plain text.
   */
  renderMarkdownWhenExpanded?: boolean;
};

export function TruncatedTextCell({
  text,
  paddingLeft,
  paddingRight,
  color,
  textAlign,
  py,
  renderMarkdownWhenExpanded,
}: TruncatedTextCellProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      onDoubleClick={() => setExpanded(!expanded)}
      style={{
        paddingTop: py || "5px",
        paddingBottom: py || "5px",
        paddingLeft: paddingLeft ?? "12px",
        paddingRight,
        whiteSpace: expanded ? "normal" : "nowrap",
        overflow: expanded ? "visible" : "hidden",
        textOverflow: expanded ? "initial" : "clip",
        fontSize: "14px",
        color: color ?? "#393A3D",
        textAlign,
        maxWidth: "100%",
      }}
    >
      {expanded && renderMarkdownWhenExpanded ? (
        <Markdown components={MARKDOWN_COMPONENTS as Components}>
          {String(text)
            .trim()
            .replace(/\s\*\s/g, '\n* ')  // Replace ' * ' with '\n* '
            .replace(/^\*\s/, '* ')      // Ensure first * has proper spacing
          }
        </Markdown>
      ) : (
        text
      )}
    </div>
  );
}
