"use client";

import Link from "next/link";
import { Bell, BookOpen, CalendarDays, FileText, Gauge, GraduationCap, Inbox, Search, Settings, Users } from "lucide-react";
import { can } from "@/features/lms/client";
import { useLmsSession } from "@/features/lms/session-context";
import { ActorPicker } from "./actor-picker";
import { CreateWorkspaceForm } from "./create-workspace-form";
import { WorkspacePicker } from "./workspace-picker";

const baseNav = [
  ["/dashboard", "Overview", Gauge], ["/courses", "Courses", BookOpen], ["/assignments", "Assignments", FileText],
  ["/calendar", "Calendar", CalendarDays], ["/grades", "Grades", GraduationCap], ["/inbox", "Inbox", Inbox],
] as const;

export function LmsShell({ active, title, eyebrow, actions, children }: { active: string; title: string; eyebrow: string; actions?: React.ReactNode; children: React.ReactNode }) {
  const { status, error, activeWorkspace, session, refresh } = useLmsSession();

  const nav = activeWorkspace && can(activeWorkspace.capabilities, "workspace:manage-members")
    ? [...baseNav, ["/people", "People", Users] as const]
    : baseNav;

  return <main className="lms-shell">
    <aside className="lms-sidebar">
      <Link className="lms-logo" href="/"><span>PP</span><b>PROOFPATH</b></Link>
      <WorkspacePicker />
      <nav aria-label="LMS navigation">{nav.map(([href,label,Icon])=><Link className={active===label?"active":""} href={href} key={href}><Icon size={18}/><span>{label}</span>{label==="Inbox"&&<i>3</i>}</Link>)}</nav>
      <div className="sidebar-bottom"><Link href="/settings"><Settings size={18}/> Settings</Link><ActorPicker /></div>
    </aside>
    <section className="lms-workspace">
      <div className="lms-topbar"><div className="lms-search"><Search size={17}/><span>Search courses, assignments, people...</span><kbd>⌘ K</kbd></div><button aria-label="Notifications"><Bell size={18}/><i/></button></div>
      <div className="lms-page">
        <header className="lms-page-head"><div><span>{eyebrow}</span><h1>{title}</h1></div>{actions}</header>
        {status === "loading" && (
          <div className="skeleton-stat-grid"><i className="skeleton"/><i className="skeleton"/><i className="skeleton"/><i className="skeleton"/></div>
        )}
        {status === "error" && (
          <div className="error-state">
            <strong>{error?.body.error === "UNAUTHENTICATED" ? "Session could not be established" : "Something went wrong loading your workspace"}</strong>
            <p>{error?.body.message ?? "Please try again."}</p>
            <button type="button" className="lms-secondary" onClick={() => refresh()}>Retry</button>
          </div>
        )}
        {status === "ready" && session && session.workspaces.length === 0 && (
          <div className="empty-state">
            <strong>Create your first workspace</strong>
            <p>{session.user.name} isn&apos;t part of a workspace yet. Choose organization if you&apos;re teaching a group, or self-serve for a personal learning space.</p>
            <div style={{ width: "min(420px, 100%)", marginTop: 8 }}><CreateWorkspaceForm /></div>
          </div>
        )}
        {status === "ready" && activeWorkspace && children}
      </div>
    </section>
  </main>;
}
