import { useState, useEffect, useRef } from "react";

export default function Timer({ seconds }) {
  const [remaining, setRemaining] = useState(seconds);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setRemaining(seconds);
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [seconds]);

  useEffect(() => {
    if (running && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((r) => {
          if (r <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            return 0;
          }
          return r - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, remaining]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const display = `${mins}:${secs.toString().padStart(2, "0")}`;
  const done = remaining === 0;

  return (
    <div className="flex flex-col items-center gap-3 mt-4">
      <div
        className={`text-4xl font-mono font-bold tabular-nums ${
          done ? "text-green-600" : "text-primary-dark"
        }`}
      >
        {done ? "✅ Done!" : display}
      </div>
      {!done && (
        <button
          onClick={() => setRunning((r) => !r)}
          className="px-5 py-2 rounded-full bg-primary text-white text-sm font-medium
                     transition-all hover:bg-primary-dark active:scale-95 cursor-pointer"
        >
          {running ? "Pause" : remaining === seconds ? "Start Timer" : "Resume"}
        </button>
      )}
    </div>
  );
}
