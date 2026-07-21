"use client";

import { useState } from "react";
import { LmsApiError } from "@/features/lms/client";
import { useLmsSession } from "@/features/lms/session-context";
import type { Course } from "@/features/lms/contracts";

export function CreateCourseForm({ workspaceId, onCreated, onCancel }: { workspaceId: string; onCreated?: (course: Course) => void; onCancel?: () => void }) {
  const { client } = useLmsSession();
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const course = await client.createCourse({ workspaceId, title, code, description });
      setTitle("");
      setCode("");
      setDescription("");
      onCreated?.(course);
    } catch (caught) {
      setError(caught instanceof LmsApiError ? caught.body.message : "Could not create the course.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="lms-panel" style={{ padding: 20, marginBottom: 18 }}>
      {error && <div className="form-error">{error}</div>}
      <div className="form-field">
        <label htmlFor="course-title">Title</label>
        <input id="course-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Data Structures & Algorithms" required minLength={3} maxLength={120} />
      </div>
      <div className="form-field">
        <label htmlFor="course-code">Code</label>
        <input id="course-code" value={code} onChange={(event) => setCode(event.target.value)} placeholder="e.g. CS301" required minLength={2} maxLength={20} />
      </div>
      <div className="form-field">
        <label htmlFor="course-description">Description</label>
        <textarea id="course-description" value={description} onChange={(event) => setDescription(event.target.value)} rows={3} maxLength={1000} placeholder="What will learners get out of this course?" />
      </div>
      <div className="form-actions">
        {onCancel && <button type="button" className="lms-secondary" onClick={onCancel}>Cancel</button>}
        <button type="submit" className="lms-primary" disabled={submitting || title.trim().length < 3 || code.trim().length < 2}>{submitting ? "Creating…" : "Create course"}</button>
      </div>
    </form>
  );
}
