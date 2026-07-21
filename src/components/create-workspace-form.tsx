"use client";

import { useState } from "react";
import { LmsApiError } from "@/features/lms/client";
import { useLmsSession } from "@/features/lms/session-context";
import type { WorkspaceMode } from "@/features/lms/contracts";

export function CreateWorkspaceForm({ onCreated, onCancel }: { onCreated?: () => void; onCancel?: () => void }) {
  const { createWorkspace } = useLmsSession();
  const [name, setName] = useState("");
  const [mode, setMode] = useState<WorkspaceMode>("organization");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await createWorkspace({ name, mode });
      setName("");
      onCreated?.();
    } catch (caught) {
      setError(caught instanceof LmsApiError ? caught.body.message : "Could not create the workspace.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="form-error">{error}</div>}
      <div className="form-field">
        <label htmlFor="workspace-name">Workspace name</label>
        <input id="workspace-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Riverside High School" required minLength={2} maxLength={80} />
      </div>
      <div className="form-field">
        <label>Type</label>
        <div className="form-radio-row">
          <label>
            <input type="radio" name="mode" checked={mode === "organization"} onChange={() => setMode("organization")} />
            Organization
            <small>Teachers manage members, courses, and enrollments.</small>
          </label>
          <label>
            <input type="radio" name="mode" checked={mode === "self-serve"} onChange={() => setMode("self-serve")} />
            Self-serve
            <small>You create, publish, and enroll in your own courses.</small>
          </label>
        </div>
      </div>
      <div className="form-actions">
        {onCancel && <button type="button" className="lms-secondary" onClick={onCancel}>Cancel</button>}
        <button type="submit" className="lms-primary" disabled={submitting || name.trim().length < 2}>{submitting ? "Creating…" : "Create workspace"}</button>
      </div>
    </form>
  );
}
