import type { ReactNode } from "react";
import type { BoardLayout } from "./protocol.ts";

/**
 * Pure Board shell and presentation types.
 * Web-specific slot content and live engine state stay in apps/web.
 */
export type BoardShellProps = {
  layout?: BoardLayout;
  gridOn?: boolean;
  children?: ReactNode;
};

export function BoardShell({ layout: _layout, gridOn = true, children }: BoardShellProps) {
  return (
    <div className={`board-shell${gridOn ? " grid-on" : ""}`}>
      {children}
    </div>
  );
}
