import Link from "next/link";
import { Bell, BookOpen, CalendarDays, FileText, Gauge, GraduationCap, Inbox, Search, Settings } from "lucide-react";

const nav = [
  ["/dashboard", "Overview", Gauge], ["/courses", "Courses", BookOpen], ["/assignments", "Assignments", FileText],
  ["/calendar", "Calendar", CalendarDays], ["/grades", "Grades", GraduationCap], ["/inbox", "Inbox", Inbox],
] as const;

export function LmsShell({ active, title, eyebrow, actions, children }: { active: string; title: string; eyebrow: string; actions?: React.ReactNode; children: React.ReactNode }) {
  return <main className="lms-shell">
    <aside className="lms-sidebar">
      <Link className="lms-logo" href="/"><span>PP</span><b>PROOFPATH</b></Link>
      <div className="workspace-switch"><small>WORKSPACE</small><strong>Northstar Academy</strong><span>LEARNER</span></div>
      <nav aria-label="LMS navigation">{nav.map(([href,label,Icon])=><Link className={active===label?"active":""} href={href} key={href}><Icon size={18}/><span>{label}</span>{label==="Inbox"&&<i>3</i>}</Link>)}</nav>
      <div className="sidebar-bottom"><Link href="/settings"><Settings size={18}/> Settings</Link><div className="lms-user"><span>MC</span><div><strong>Maya Chen</strong><small>maya@northstar.edu</small></div></div></div>
    </aside>
    <section className="lms-workspace">
      <div className="lms-topbar"><div className="lms-search"><Search size={17}/><span>Search courses, assignments, people...</span><kbd>⌘ K</kbd></div><button aria-label="Notifications"><Bell size={18}/><i/></button></div>
      <div className="lms-page"><header className="lms-page-head"><div><span>{eyebrow}</span><h1>{title}</h1></div>{actions}</header>{children}</div>
    </section>
  </main>;
}
