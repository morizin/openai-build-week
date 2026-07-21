"use client";

import { useCallback } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, CalendarDays, Clock3, FileText, TrendingUp } from "lucide-react";
import { LmsShell } from "@/components/lms-shell";
import { useLmsSession } from "@/features/lms/session-context";
import { useLmsQuery } from "@/features/lms/use-lms-query";
import { assignments } from "@/lib/lms-data";

export default function DashboardPage() {
  const { client, activeWorkspace, session } = useLmsSession();
  const fetchCourses = useCallback(() => client.listCourses(activeWorkspace!.id), [client, activeWorkspace]);
  const coursesQuery = useLmsQuery(activeWorkspace?.id ?? null, fetchCourses);

  if (!activeWorkspace || !session) return null;

  const firstName = session.user.name.split(" ")[0];
  const courses = coursesQuery.status === "ready" ? coursesQuery.data : [];
  const publishedCount = courses.filter((course) => course.status === "published").length;
  const draftCount = courses.filter((course) => course.status === "draft").length;

  return <LmsShell active="Overview" eyebrow="MONDAY, JULY 21" title={`Good morning, ${firstName}.`}>
    <div className="lms-stat-grid">
      <article><span><BookOpen size={19}/>ACTIVE COURSES</span><strong>{coursesQuery.status === "loading" ? "…" : String(publishedCount).padStart(2, "0")}</strong><small>{coursesQuery.status === "loading" ? "Loading" : `${draftCount} in draft`}</small></article>
      <article><span><FileText size={19}/>DUE THIS WEEK</span><strong>06</strong><small>2 require attention</small></article>
      <article><span><TrendingUp size={19}/>GRADE AVERAGE</span><strong>89.4%</strong><small className="positive">↑ 2.1% this term</small></article>
      <article><span><Clock3 size={19}/>LEARNING TIME</span><strong>7.5h</strong><small>This week</small></article>
    </div>
    <div className="lms-two-col">
      <section className="lms-panel">
        <div className="panel-head"><div><span>CONTINUE LEARNING</span><h2>Your courses</h2></div><Link href="/courses">View all <ArrowRight size={15}/></Link></div>
        {coursesQuery.status === "loading" && <div className="skeleton-rows" style={{ padding: 14 }}><i className="skeleton"/><i className="skeleton"/><i className="skeleton"/></div>}
        {coursesQuery.status === "error" && <div className="error-state" style={{ margin: 18 }}><strong>Couldn&apos;t load courses</strong><p>{coursesQuery.message}</p></div>}
        {coursesQuery.status === "ready" && courses.length === 0 && <div className="empty-state" style={{ margin: 18 }}><strong>No courses yet</strong><p>Visit the courses page to get started.</p></div>}
        {coursesQuery.status === "ready" && courses.length > 0 && (
          <div className="course-list">
            {courses.slice(0, 3).map((course) => (
              <Link href={`/courses/${course.id}`} className="course-row" key={course.id}>
                <i className="cyan" />
                <div><small>{course.code}</small><strong>{course.title}</strong><span className={`status-badge ${course.status}`}>{course.status}</span></div>
                <ArrowRight size={17} />
              </Link>
            ))}
          </div>
        )}
      </section>
      <aside className="lms-panel">
        <div className="panel-head"><div><span>UPCOMING</span><h2>Deadlines</h2></div><CalendarDays size={19}/></div>
        <div className="deadline-list">{assignments.slice(0,3).map((a,i)=><div key={a.title}><span><b>{i===0?"21":"22"}</b>JUL</span><div><small>{a.course}</small><strong>{a.title}</strong><em>{a.due}</em></div></div>)}</div>
        <Link className="panel-link" href="/assignments">Open all assignments <ArrowRight size={15}/></Link>
      </aside>
    </div>
    <section className="announcement"><span>ANNOUNCEMENT</span><div><strong>Welcome to the summer term</strong><p>Review your course syllabi and confirm notification preferences before Friday.</p></div><small>2 HOURS AGO</small></section>
  </LmsShell>;
}
