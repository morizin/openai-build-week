"use client";

import { useEffect, useRef, useState } from "react";
import { useDemoActor } from "@/features/lms/demo-actor";
import { useLmsSession } from "@/features/lms/session-context";
import { demoUserById, demoUsers, initialsFor } from "@/lib/demo-users";

export function ActorPicker() {
  const { actorId, setActorId } = useDemoActor();
  const { session } = useLmsSession();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const current = session?.user ?? demoUserById(actorId) ?? demoUsers[0];

  useEffect(() => {
    if (!open) return;
    function onClickOutside(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  return (
    <div className="picker actor-picker" ref={rootRef}>
      <button type="button" className="actor-picker-trigger" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        <span>{initialsFor(current.name)}</span>
        <div><strong>{current.name}</strong><small>{current.email}</small></div>
      </button>
      {open && (
        <div className="picker-menu" role="menu">
          <div className="actor-picker-label">DEMO ACTOR — LOCAL AUTH SEAM</div>
          {demoUsers.map((user) => (
            <button
              type="button"
              key={user.id}
              className={`picker-menu-item${user.id === actorId ? " active" : ""}`}
              onClick={() => { setActorId(user.id); setOpen(false); }}
            >
              <span>{user.name}<br /><small>{user.email}</small></span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
