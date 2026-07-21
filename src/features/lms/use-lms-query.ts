"use client";

import { useCallback, useEffect, useState } from "react";
import { LmsApiError } from "./client";

export type LmsQueryResult<T> =
  | { status: "loading" }
  | { status: "ready"; data: T }
  | { status: "error"; message: string };

type Entry<T> = { key: string; result: LmsQueryResult<T> };

/**
 * Fetches `fetcher()` whenever `key` changes. Loading state is derived by
 * comparing the last-resolved key to the current one, so no setState runs
 * synchronously inside the effect (only inside the async then/catch).
 */
export function useLmsQuery<T>(key: string | null, fetcher: () => Promise<T>): LmsQueryResult<T> & { refresh: () => void } {
  const [entry, setEntry] = useState<Entry<T> | null>(null);
  const run = useCallback((forKey: string) => {
    fetcher()
      .then((data) => setEntry({ key: forKey, result: { status: "ready", data } }))
      .catch((caught: unknown) => {
        const message = caught instanceof LmsApiError ? caught.body.message : "Something went wrong.";
        setEntry({ key: forKey, result: { status: "error", message } });
      });
  }, [fetcher]);

  useEffect(() => {
    if (key !== null) run(key);
  }, [key, run]);

  const refresh = useCallback(() => { if (key !== null) run(key); }, [key, run]);

  if (key === null) return { status: "loading", refresh };
  if (entry?.key === key) return { ...entry.result, refresh };
  return { status: "loading", refresh };
}
