"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { createLmsApiClient, LmsApiError, type LmsApiClient } from "./client";
import type { CreateWorkspaceInput, SessionResponse, WorkspaceAccess } from "./contracts";
import { useDemoActor } from "./demo-actor";

type SessionEntry =
  | { status: "ready"; forActor: string; session: SessionResponse }
  | { status: "error"; forActor: string; error: LmsApiError };

type SessionStatus = "loading" | "ready" | "error";

interface LmsSessionContextValue {
  client: LmsApiClient;
  actorId: string;
  status: SessionStatus;
  error: LmsApiError | null;
  session: SessionResponse | null;
  workspaces: WorkspaceAccess[];
  activeWorkspace: WorkspaceAccess | null;
  setActiveWorkspaceId: (workspaceId: string) => void;
  refresh: () => void;
  createWorkspace: (input: CreateWorkspaceInput) => Promise<WorkspaceAccess>;
}

const LmsSessionContext = createContext<LmsSessionContextValue | null>(null);

function activeWorkspaceStorageKey(actorId: string) {
  return `proofpath-active-workspace:${actorId}`;
}

export function LmsSessionProvider({ children }: { children: React.ReactNode }) {
  const { actorId } = useDemoActor();
  const client = useMemo(() => createLmsApiClient({ actorId }), [actorId]);

  const [entry, setEntry] = useState<SessionEntry | null>(null);
  const [activeWorkspaceId, setActiveWorkspaceIdState] = useState<string | null>(null);

  const fetchSession = useCallback((forActor: string) => {
    client.session()
      .then((session) => {
        setEntry({ status: "ready", forActor, session });
        setActiveWorkspaceIdState((current) => {
          const stored = window.localStorage.getItem(activeWorkspaceStorageKey(forActor));
          const candidates = session.workspaces.map((workspace) => workspace.id);
          if (current && candidates.includes(current)) return current;
          if (stored && candidates.includes(stored)) return stored;
          return session.workspaces[0]?.id ?? null;
        });
      })
      .catch((caught) => {
        setEntry({
          status: "error",
          forActor,
          error: caught instanceof LmsApiError ? caught : new LmsApiError(500, { error: "INTERNAL_ERROR", message: "Unexpected error." }),
        });
      });
  }, [client]);

  useEffect(() => {
    fetchSession(actorId);
  }, [actorId, fetchSession]);

  const refresh = useCallback(() => fetchSession(actorId), [fetchSession, actorId]);

  const setActiveWorkspaceId = useCallback((workspaceId: string) => {
    setActiveWorkspaceIdState(workspaceId);
    window.localStorage.setItem(activeWorkspaceStorageKey(actorId), workspaceId);
  }, [actorId]);

  const createWorkspace = useCallback(async (input: CreateWorkspaceInput) => {
    const workspace = await client.createWorkspace(input);
    fetchSession(actorId);
    setActiveWorkspaceId(workspace.id);
    return workspace;
  }, [client, fetchSession, actorId, setActiveWorkspaceId]);

  const current = entry && entry.forActor === actorId ? entry : null;
  const status: SessionStatus = !current ? "loading" : current.status;
  const session = current?.status === "ready" ? current.session : null;
  const error = current?.status === "error" ? current.error : null;
  const workspaces = session?.workspaces ?? [];
  const activeWorkspace = workspaces.find((workspace) => workspace.id === activeWorkspaceId) ?? workspaces[0] ?? null;

  const value: LmsSessionContextValue = {
    client,
    actorId,
    status,
    error,
    session,
    workspaces,
    activeWorkspace,
    setActiveWorkspaceId,
    refresh,
    createWorkspace,
  };

  return <LmsSessionContext.Provider value={value}>{children}</LmsSessionContext.Provider>;
}

export function useLmsSession(): LmsSessionContextValue {
  const context = useContext(LmsSessionContext);
  if (!context) throw new Error("useLmsSession must be used within an LmsSessionProvider");
  return context;
}
