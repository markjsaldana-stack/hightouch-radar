"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, CornerDownRight, RotateCcw } from "lucide-react";

type Line = { label?: string; text: string; reply?: boolean };

type Step = { from: "bot" | "rep"; text?: string; lines?: Line[]; source?: string };

// Milliseconds before each step appears. Bot steps show the typing dots first.
const REP_DELAY = 900;
const BOT_DELAY = 1100;
const ANSWER_DELAY = 1800;
const LINE_DELAY = 650;

function TypingDots() {
  return (
    <span className="flex gap-1 py-1" aria-label="Typing">
      {[0, 1, 2].map((i) => (
        <span key={i} className="animate-typing size-1.5 rounded-full bg-muted" style={{ animationDelay: `${i * 0.2}s` }} />
      ))}
    </span>
  );
}

function BotBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-rise flex max-w-2xl gap-3">
      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
        <Bot className="size-4" aria-hidden />
      </span>
      <div className="space-y-2 rounded-lg rounded-tl-sm border border-line bg-surface px-4 py-2.5">{children}</div>
    </div>
  );
}

export function AssistantMockup({ steps }: { steps: Step[] }) {
  const answer = steps[steps.length - 1];
  const answerLines = answer.lines?.length ?? 0;
  // Progress: how many steps are visible, then how many lines of the final answer.
  const [shown, setShown] = useState(0);
  const [linesShown, setLinesShown] = useState(0);
  const [typing, setTyping] = useState(false);
  const [run, setRun] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clear = () => {
      timers.current.forEach(window.clearTimeout);
      timers.current = [];
    };

    function play() {
      clear();
      if (reduced) {
        setShown(steps.length);
        setLinesShown(answerLines);
        setTyping(false);
        return;
      }
      setShown(0);
      setLinesShown(0);
      let t = 300;
      steps.forEach((step, i) => {
        const isAnswer = i === steps.length - 1;
        if (step.from === "bot") {
          timers.current.push(window.setTimeout(() => setTyping(true), t));
          t += isAnswer ? ANSWER_DELAY : BOT_DELAY;
        } else {
          t += REP_DELAY;
        }
        timers.current.push(
          window.setTimeout(() => {
            setTyping(false);
            setShown(i + 1);
            if (isAnswer) setLinesShown(1);
          }, t),
        );
      });
      for (let line = 2; line <= answerLines; line++) {
        t += LINE_DELAY;
        timers.current.push(window.setTimeout(() => setLinesShown(line), t));
      }
    }

    // Start when the mockup scrolls into view, once per run.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          play();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      clear();
    };
  }, [steps, answerLines, run]);

  const done = shown === steps.length && linesShown === answerLines;

  return (
    <div ref={ref} className="min-h-[50rem] space-y-3 text-sm sm:min-h-[38rem]">
      {steps.slice(0, shown).map((step, i) =>
        step.from === "rep" ? (
          <p
            key={`${run}-${i}`}
            className="animate-rise ml-auto w-fit max-w-xl rounded-lg rounded-br-sm bg-accent px-4 py-2 text-accent-fg"
          >
            {step.text}
          </p>
        ) : step.lines ? (
          <BotBubble key={`${run}-${i}`}>
            {step.lines.slice(0, linesShown).map((line) => (
              <p key={line.text} className={`animate-rise ${line.reply ? "flex gap-1.5" : ""}`}>
                {line.reply ? <CornerDownRight className="mt-0.5 size-4 shrink-0 text-muted" aria-hidden /> : null}
                {line.label ? <span className="font-medium">{line.label} </span> : null}
                <span>{line.text}</span>
              </p>
            ))}
            {linesShown === answerLines && step.source ? (
              <p className="animate-rise font-mono text-xs text-muted">{step.source}</p>
            ) : null}
          </BotBubble>
        ) : (
          <BotBubble key={`${run}-${i}`}>
            <p>{step.text}</p>
          </BotBubble>
        ),
      )}
      {typing ? (
        <BotBubble>
          <TypingDots />
        </BotBubble>
      ) : null}
      {done ? (
        <button
          type="button"
          onClick={() => setRun((r) => r + 1)}
          className="animate-rise mt-2 inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-xs text-muted transition-colors hover:text-fg"
        >
          <RotateCcw className="size-3.5" aria-hidden />
          Replay
        </button>
      ) : null}
    </div>
  );
}
