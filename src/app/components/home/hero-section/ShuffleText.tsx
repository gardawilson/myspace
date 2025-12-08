"use client";

import { useEffect, useState } from "react";

interface ShuffleTextProps {
  text: string;
  interval?: number;
  iterations?: number;
  className?: string;
}

export default function ShuffleText({
  text,
  interval = 30,
  iterations = 10,
  className,
}: ShuffleTextProps) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let current: string[] = text.split("").map(() => "");
    let count = 0;

    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{};:'\",.<>/?";

    const shuffleInterval = setInterval(() => {
      current = current.map((char: string, i: number) => {
        if (count > iterations && i < text.length) return text[i];
        return Math.random() > 0.5
          ? chars[Math.floor(Math.random() * chars.length)]
          : char;
      });
      setDisplayed(current.join(""));
      count++;
      if (count > iterations + text.length) clearInterval(shuffleInterval);
    }, interval);

    return () => clearInterval(shuffleInterval);
  }, [text, interval, iterations]);

  return <span className={className}>{displayed}</span>;
}