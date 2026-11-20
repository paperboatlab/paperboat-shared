import { useEffect, useState } from "react";

/**
 * What an app is waiting for (a station to answer, a runtime to start), in the middle of the
 * surface it will fill: the words, then how long once it is past 3 s, over the busy wave, and
 * `hint` once it is past 6 s (why it is slow, or what to do). `failed`: the words alone, in the
 * danger ink, no wave. Squero OM opens on it; Paperboat shows it until its station says hello.
 * `elapsed`: how long it has really been going (a build's own clock), in seconds, else since mount.
 */
export function WaitScreen({ words, failed = false, hint, elapsed }: { words: string; failed?: boolean; hint?: string; elapsed?: number }) {
  const [mounted, setSeconds] = useState(0);
  const seconds = elapsed === undefined ? mounted : Math.floor(elapsed);
  useEffect(() => {
    const t = setInterval(() => setSeconds((n) => n + 1), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className={`wait-screen${failed ? " failed" : ""}`} role="status">
      <p>{failed ? words : `${words}…${seconds >= 3 ? ` ${seconds}s` : ""}`}</p>
      {!failed && (
        <span className="wave" aria-hidden="true">
          <i /><i /><i /><i /><i />
        </span>
      )}
      {!failed && hint && seconds >= 6 && <p className="wait-hint">{hint}</p>}
    </div>
  );
}
