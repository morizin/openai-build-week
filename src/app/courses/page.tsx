"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { LmsShell } from "@/components/lms-shell";
import { CreateCourseForm } from "@/components/create-course-form";
import { can } from "@/features/lms/client";
import { useLmsSession } from "@/features/lms/session-context";
import { useLmsQuery } from "@/features/lms/use-lms-query";
import type { CourseStatus } from "@/features/lms/contracts";

const bandColors = ["cyan", "violet", "amber", "red"] as const;
function bandColorFor(code: string) {
  const index = [...code].reduce((sum, char) => sum + char.charCodeAt(0), 0) % bandColors.length;
  return bandColors[index];
}

type Filter = "all" | CourseStatus;

export default function CoursesPage() {
  const { client, activeWorkspace } = useLmsSession();
  const [filter, setFilter] = useState<Filter>("all");
  const [creating, setCreating] = useState(false);

  const fetchCourses = useCallback(() => client.listCourses(activeWorkspace!.id), [client, activeWorkspace]);
  const coursesQuery = useLmsQuery(activeWorkspace?.id ?? null, fetchCourses);

  if (!activeWorkspace) return null;

  const canCreate = can(activeWorkspace.capabilities, "course:create");
  const canPublish = can(activeWorkspace.capabilities, "course:publish");

  const courses = coursesQuery.status === "ready" ? coursesQuery.data : [];
  const counts = { all: courses.length, draft: 0, published: 0, archived: 0 };
  courses.forEach((course) => { counts[course.status] += 1; });
  const visible = courses.filter((course) => filter === "all" || course.status === filter);

  return (
    <LmsShell
      active="Courses"
      eyebrow="LEARNING CATALOG"
      title="My courses"
      actions={canCreate ? <button className="lms-primary" onClick={() => setCreating((value) => !value)}><Plus size={17}/> {creating ? "Close" : "Create course"}</button> : undefined}
    >
      {creating && canCreate && (
        <CreateCourseForm workspaceId={activeWorkspace.id} onCreated={() => { coursesQuery.refresh(); setCreating(false); }} onCancel={() => setCreating(false)} />
      )}

      <div className="filter-row">
        <button className={filter === "all" ? "selected" : ""} onClick={() => setFilter("all")}>All courses · {counts.all}</button>
        <button className={filter === "published" ? "selected" : ""} onClick={() => setFilter("published")}>Published · {counts.published}</button>
        <button className={filter === "draft" ? "selected" : ""} onClick={() => setFilter("draft")}>Draft · {counts.draft}</button>
        <button className={filter === "archived" ? "selected" : ""} onClick={() => setFilter("archived")}>Archived · {counts.archived}</button>
      </div>

      {coursesQuery.status === "loading" && <div className="skeleton-rows"><i className="skeleton"/><i className="skeleton"/><i className="skeleton"/></div>}

      {coursesQuery.status === "error" && (
        <div className="error-state"><strong>Couldn&apos;t load courses</strong><p>{coursesQuery.message}</p></div>
      )}

      {coursesQuery.status === "ready" && visible.length === 0 && (
        <div className="empty-state">
          <strong>{filter === "all" ? "No courses yet" : `No ${filter} courses`}</strong>
          <p>{canCreate ? "Create a course to get started." : "Nothing here yet — check back once your instructor publishes a course."}</p>
        </div>
      )}

      {coursesQuery.status === "ready" && visible.length > 0 && (
        <div className="course-card-grid">
          {visible.map((course) => (
            <article key={course.id}>
              <div className={`course-band ${bandColorFor(course.code)}`}><span>{course.code}</span><span className={`status-badge ${course.status}`}>{course.status}</span></div>
              <div className="course-card-body">
                <small>{course.status === "draft" && canPublish ? "Not yet published" : course.status}</small>
                <h2>{course.title}</h2>
                <p>{course.description || "No description yet."}</p>
                <Link href={`/courses/${course.id}`}><button>Open course <span>→</span></button></Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </LmsShell>
  );
}
