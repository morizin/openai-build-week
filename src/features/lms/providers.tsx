"use client";

import { LmsSessionProvider } from "./session-context";

export function LmsProviders({ children }: { children: React.ReactNode }) {
  return <LmsSessionProvider>{children}</LmsSessionProvider>;
}
