import { useEffect, useState } from "react";

import { birthdayContent } from "@/constants/birthday-content";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let completed = false;
    const interval = window.setInterval(() => {
      setProgress((current) => {
        const next = Math.min(current + 4, 100);
        if (next >= 100 && !completed) {
          completed = true;
          window.clearInterval(interval);
          window.setTimeout(onComplete, 420);
        }
        return next;
      });
    }, 90);

    return () => window.clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6 pb-16 pt-10 page-shell">
      <div className="max-w-md text-center story-panel animate-enter">
        <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full border border-border/60 bg-card/80 shadow-[var(--shadow-dream)] backdrop-blur-md">
          <div className="kitty-face">
            <span className="kitty-bow kitty-bow-left" />
            <span className="kitty-bow kitty-bow-right" />
            <span className="kitty-ear kitty-ear-left" />
            <span className="kitty-ear kitty-ear-right" />
            <span className="kitty-eye kitty-eye-left" />
            <span className="kitty-eye kitty-eye-right" />
            <span className="kitty-nose" />
            <span className="kitty-whisker kitty-whisker-left-top" />
            <span className="kitty-whisker kitty-whisker-left-bottom" />
            <span className="kitty-whisker kitty-whisker-right-top" />
            <span className="kitty-whisker kitty-whisker-right-bottom" />
          </div>
        </div>

        <p className="mt-8 text-xl font-semibold text-foreground">{birthdayContent.loading.label}</p>
        <p className="mt-2 text-sm text-muted-foreground">{birthdayContent.loading.hint}</p>

        <div className="mt-8 h-4 overflow-hidden rounded-full border border-border/60 bg-secondary/80">
          <div className="loading-progress" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-3 text-sm text-muted-foreground">{progress}%</p>
      </div>
    </div>
  );
}
