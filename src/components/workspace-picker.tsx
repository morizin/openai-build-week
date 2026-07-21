"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronsUpDown, Plus } from "lucide-react";
import { useLmsSession } from "@/features/lms/session-context";
import { CreateWorkspaceForm } from "./create-workspace-form";

export function WorkspacePicker() {
  const { workspaces, activeWorkspace, setActiveWorkspaceId } = useLmsSession();
  const [open, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
        setCreating(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  if (!activeWorkspace) return null;

  return (
    <div className="picker workspace-switch" ref={rootRef}>
      <button type="button" className="picker-trigger" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        <div>
          <small>WORKSPACE</small>
          <strong>{activeWorkspace.name}</strong>
          <span className={`mode-badge role-${activeWorkspace.role}`}>{activeWorkspace.role.toUpperCase()}</span>
        </div>
        <ChevronsUpDown size={15} />
      </button>
      {open && (
        <div className="picker-menu" role="menu">
          {creating ? (
            <div className="picker-create">
              <CreateWorkspaceForm onCreated={() => { setCreating(false); setOpen(false); }} onCancel={() => setCreating(false)} />
            </div>
          ) : (
            <>
              {workspaces.map((workspace) => (
                <button
                  type="button"
                  key={workspace.id}
                  className={`picker-menu-item${workspace.id === activeWorkspace.id ? " active" : ""}`}
                  onClick={() => { setActiveWorkspaceId(workspace.id); setOpen(false); }}
                >
                  <span>{workspace.name}<br /><small>{workspace.mode} · {workspace.role}</small></span>
                </button>
              ))}
              <div className="picker-divider" />
              <button type="button" className="picker-menu-item" onClick={() => setCreating(true)}>
                <span><Plus size={13} style={{ verticalAlign: "-2px", marginRight: 6 }} />New workspace</span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
