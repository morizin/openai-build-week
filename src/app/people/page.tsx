"use client";

import { useCallback, useMemo, useState } from "react";
import { UserPlus } from "lucide-react";
import { LmsShell } from "@/components/lms-shell";
import { can, LmsApiError } from "@/features/lms/client";
import { useLmsSession } from "@/features/lms/session-context";
import { useLmsQuery } from "@/features/lms/use-lms-query";
import type { OrgRole } from "@/features/lms/contracts";
import { demoUserById, demoUsers, initialsFor } from "@/lib/demo-users";

export default function PeoplePage() {
  const { client, activeWorkspace } = useLmsSession();
  const [adding, setAdding] = useState(false);
  const [newUserId, setNewUserId] = useState("");
  const [newRole, setNewRole] = useState<OrgRole>("student");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const allowed = activeWorkspace ? can(activeWorkspace.capabilities, "workspace:manage-members") : false;
  const fetchMembers = useCallback(() => client.listMembers(activeWorkspace!.id), [client, activeWorkspace]);
  const membersQuery = useLmsQuery(activeWorkspace && allowed ? activeWorkspace.id : null, fetchMembers);
  const availableUsers = useMemo(() => {
    const members = membersQuery.status === "ready" ? membersQuery.data : [];
    const memberIds = new Set(members.map((member) => member.userId));
    return demoUsers.filter((user) => !memberIds.has(user.id));
  }, [membersQuery]);
  const members = membersQuery.status === "ready" ? membersQuery.data : [];

  async function handleAdd(event: React.FormEvent) {
    event.preventDefault();
    if (!activeWorkspace || !newUserId) return;
    setSubmitting(true);
    setFormError(null);
    try {
      await client.addMember(activeWorkspace.id, { userId: newUserId, role: newRole });
      membersQuery.refresh();
      setNewUserId("");
      setAdding(false);
    } catch (caught) {
      setFormError(caught instanceof LmsApiError ? caught.body.message : "Could not add this member.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!activeWorkspace) return null;

  if (!allowed) {
    return (
      <LmsShell active="People" eyebrow="ORGANIZATION" title="People">
        <div className="empty-state">
          <strong>Not available here</strong>
          <p>People management is available to teachers in an organization workspace. {activeWorkspace.mode === "self-serve" ? "Self-serve workspaces don't have organization members." : "Your current role doesn't include workspace management."}</p>
        </div>
      </LmsShell>
    );
  }

  return (
    <LmsShell
      active="People"
      eyebrow="ORGANIZATION"
      title="People"
      actions={<button className="lms-primary" onClick={() => setAdding((value) => !value)}><UserPlus size={17} /> {adding ? "Close" : "Add member"}</button>}
    >
      {adding && (
        <form onSubmit={handleAdd} className="lms-panel" style={{ padding: 20, marginBottom: 18 }}>
          {formError && <div className="form-error">{formError}</div>}
          <div className="form-field">
            <label htmlFor="member-user">Person</label>
            <select id="member-user" value={newUserId} onChange={(event) => setNewUserId(event.target.value)} required>
              <option value="">Select a person…</option>
              {availableUsers.map((user) => <option key={user.id} value={user.id}>{user.name} · {user.email}</option>)}
            </select>
          </div>
          <div className="form-field">
            <label>Role</label>
            <div className="form-radio-row">
              <label><input type="radio" name="role" checked={newRole === "teacher"} onChange={() => setNewRole("teacher")} /> Teacher<small>Manages members, courses, and enrollments.</small></label>
              <label><input type="radio" name="role" checked={newRole === "student"} onChange={() => setNewRole("student")} /> Student<small>Views assigned courses and their own enrollments.</small></label>
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="lms-secondary" onClick={() => setAdding(false)}>Cancel</button>
            <button type="submit" className="lms-primary" disabled={submitting || !newUserId}>{submitting ? "Adding…" : "Add member"}</button>
          </div>
        </form>
      )}

      {membersQuery.status === "loading" && <div className="skeleton-rows"><i className="skeleton" /><i className="skeleton" /><i className="skeleton" /></div>}
      {membersQuery.status === "error" && <div className="error-state"><strong>Couldn&apos;t load members</strong><p>{membersQuery.message}</p></div>}
      {membersQuery.status === "ready" && members.length === 0 && (
        <div className="empty-state"><strong>No members yet</strong><p>Add teachers and students to this workspace.</p></div>
      )}
      {membersQuery.status === "ready" && members.length > 0 && (
        <div className="lms-panel">
          {members.map((member) => {
            const user = demoUserById(member.userId);
            return (
              <div className="roster-row" key={member.id}>
                <span>{user ? initialsFor(user.name) : "?"}</span>
                <div><strong>{user?.name ?? member.userId}</strong><small>{user?.email ?? "Unknown user"}</small></div>
                <span className={`mode-badge role-${member.role}`}>{member.role.toUpperCase()}</span>
              </div>
            );
          })}
        </div>
      )}
    </LmsShell>
  );
}
