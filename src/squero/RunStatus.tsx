// What a run is doing, in a status strip: the busy wave (or a bar once the count is known), the
// phase, the time since it started and a Cancel key. One look for every app's long work (#23).
import { useEffect, useState } from "react";

/** "4.2 s", "1 min 05 s". */
export function elapsed(ms: number): string {
  const s = ms / 1000;
  if (s < 60) return `${s.toFixed(1)} s`;
  return `${Math.floor(s / 60)} min ${String(Math.floor(s % 60)).padStart(2, "0")} s`;
}

export function RunStatus({ phase, since, fraction, onCancel }: {
  /** evaluating, solving, plotting… */
  phase: string;
  /** performance.now() when the run started. */
  since: number;
  /** 0..1 when the amount of work is known; the wave otherwise. */
  fraction?: number;
  onCancel?: () => void;
}) {
  const [now, setNow] = useState(() => performance.now());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(performance.now()), 100);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <span className="run-status" role="status">
      {fraction === undefined ? (
        <span className="wave" aria-hidden="true"><i /><i /><i /><i /><i /></span>
      ) : (
        <span className="run-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(fraction * 100)}>
          <i style={{ width: `${Math.max(0, Math.min(100, fraction * 100))}%` }} />
        </span>
      )}
      <span className="run-phase">{phase}…</span>
      <span className="run-time">{elapsed(Math.max(0, now - since))}</span>
      {onCancel && <button type="button" className="key small run-cancel" onClick={onCancel} title="Stop the run (Ctrl+C in the CLI)">Cancel</button>}
    </span>
  );
}
