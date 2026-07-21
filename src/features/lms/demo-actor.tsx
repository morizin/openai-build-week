"use client";

import { useSyncExternalStore } from "react";
import { demoUsers } from "@/lib/demo-users";

// Local authentication seam: a browser-tab-scoped "signed in as" picker
// standing in for real auth. Swap for a real session once auth lands.
const STORAGE_KEY = "proofpath-demo-actor";
const DEFAULT_ACTOR_ID = demoUsers[0].id;

let cachedActorId: string | null = null;
const listeners = new Set<() => void>();

function readActorId(): string {
  if (cachedActorId) return cachedActorId;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  cachedActorId = stored && demoUsers.some((user) => user.id === stored) ? stored : DEFAULT_ACTOR_ID;
  return cachedActorId;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function setActorId(id: string) {
  cachedActorId = id;
  window.localStorage.setItem(STORAGE_KEY, id);
  listeners.forEach((listener) => listener());
}

export function useDemoActor(): { actorId: string; setActorId: (id: string) => void } {
  const actorId = useSyncExternalStore(subscribe, readActorId, () => DEFAULT_ACTOR_ID);
  return { actorId, setActorId };
}
