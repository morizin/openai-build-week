"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { LmsShell } from "@/components/lms-shell";
import { can, LmsApiError } from "@/features/lms/client";
import { useLmsSession } from "@/features/lms/session-context";
import { useLmsQuery } from "@/features/lms/use-lms-query";
import type { Enrollment, Membership } from "@/features/lms/contracts";
import { demoUserById, initialsFor } from "@/lib/demo-users";

type Tab = "overview" | "people";

export default function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const { client, actorId, activeWorkspace } = useLmsSession();
  const [tab, setTab] = useState<Tab>("overview");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [enrolling, setEnrolling] = useState(false);
  const [enrollError, setEnrollError] = useState<string | null>(null);
  const [publishing, setPublishing] = useState(false);

  const workspaceId = activeWorkspace?.id ?? null;
  const canPublish = activeWorkspace ? can(activeWorkspace.capabilities, "course:publish") : false;
  const canManageEnrollment = activeWorkspace ? can(activeWorkspace.capabilities, "enrollment:manage") : false;
  const canSelfEnroll = activeWorkspace ? can(activeWorkspace.capabilities, "enrollment:self") : false;

  const fetchCourses = useCallback(() => client.listCourses(workspaceId!), [client, workspaceId]);
  const coursesQuery = useLmsQuery(workspaceId, fetchCourses);
  const course = coursesQuery.status === "ready" ? coursesQuery.data.find((candidate) => candidate.id === courseId) ?? null : null;

  // A self-serve owner needs their enrollment before the People tab is opened,
  // otherwise the primary action can incorrectly offer a duplicate enrollment.
  const rosterKey = workspaceId && course && (tab === "people" || canSelfEnroll) ? `${workspaceId}:${courseId}` : null;
  const fetchEnrollments = useCallback(() => client.listEnrollments(workspaceId!, courseId), [client, workspaceId, courseId]);
  const enrollmentsQuery = useLmsQuery<Enrollment[]>(rosterKey, fetchEnrollments);
  const fetchMembers = useCallback(() => client.listMembers(workspaceId!), [client, workspaceId]);
  const membersQuery = useLmsQuery<Membership[]>(rosterKey && canManageEnrollment ? `${rosterKey}:members` : null, fetchMembers);
  const studentOptions = useMemo(() => {
    const enrollments = enrollmentsQuery.status === "ready" ? enrollmentsQuery.data : [];
    const members = membersQuery.status === "ready" ? membersQuery.data : [];
    const enrolledIds = new Set(enrollments.map((enrollment) => enrollment.studentId));
    return members.filter((member) => member.role === "student" && !enrolledIds.has(member.userId));
  }, [membersQuery, enrollmentsQuery]);
  const enrollments = enrollmentsQuery.status === "ready" ? enrollmentsQuery.data : [];
  const alreadySelfEnrolled = enrollments.some((enrollment) => enrollment.studentId === actorId);

  async function handleEnroll(studentId: string) {
    if (!workspaceId || !course) return;
    setEnrolling(true);
    setEnrollError(null);
    try {
      await client.enrollStudent({ workspaceId, courseId: course.id, studentId });
      enrollmentsQuery.refresh();
      setSelectedStudent("");
    } catch (caught) {
      setEnrollError(caught instanceof LmsApiError ? caught.body.message : "Could not enroll this learner.");
    } finally {
      setEnrolling(false);
    }
  }

  async function handlePublish() {
    if (!workspaceId || !course) return;
    setPublishing(true);
    try {
      await client.publishCourse(workspaceId, course.id);
      coursesQuery.refresh();
    } catch (caught) {
      setEnrollError(caught instanceof LmsApiError ? caught.body.message : "Could not publish this course.");
    } finally {
      setPublishing(false);
    }
  }

  const courseNotFound = coursesQuery.status === "ready" && !course;

  return (
    <LmsShell active="Courses" eyebrow="COURSE" title={course?.title ?? "Course"}>
      <Link className="back-link" href="/courses"><ArrowLeft size={14} /> All courses</Link>
      {coursesQuery.status === "loading" && <div className="skeleton-rows"><i className="skeleton" /><i className="skeleton" /></div>}
      {coursesQuery.status === "error" && <div className="error-state"><strong>Couldn&apos;t load this course</strong><p>{coursesQuery.message}</p><Link href="/courses">Back to courses</Link></div>}
      {courseNotFound && <div className="empty-state"><strong>Course not found</strong><p>This course isn&apos;t in the active workspace.</p><Link href="/courses">Back to courses</Link></div>}
      {course && (
        <>
          <div className="course-detail-head">
            <div><div className="course-detail-meta"><span className={`status-badge ${course.status}`}>{course.status}</span><span>{course.code}</span></div><h2>{course.title}</h2><p>{course.description || "No description yet."}</p></div>
            {course.status === "draft" && canPublish && <button type="button" className="lms-primary" onClick={handlePublish} disabled={publishing}>{publishing ? "Publishing…" : "Publish course"}</button>}
            {course.status === "published" && canSelfEnroll && !alreadySelfEnrolled && <button type="button" className="lms-primary" onClick={() => handleEnroll(actorId)} disabled={enrolling}>{enrolling ? "Enrolling…" : "Enroll me"}</button>}
          </div>
          {enrollError && <div className="form-error">{enrollError}</div>}
          <div className="tab-row"><button className={tab === "overview" ? "selected" : ""} onClick={() => setTab("overview")}>Overview</button><button className={tab === "people" ? "selected" : ""} onClick={() => setTab("people")}>People</button></div>
          {tab === "overview" && <div className="lms-panel course-placeholder"><p>Assignments, calendar, and grades for this course will appear here once those services are connected.</p></div>}
          {tab === "people" && (
            <div className="lms-panel">
              {canManageEnrollment && <div className="enrollment-form"><div className="form-field"><label htmlFor="enroll-student">Enroll a student</label><select id="enroll-student" value={selectedStudent} onChange={(event) => setSelectedStudent(event.target.value)}><option value="">Select a student…</option>{studentOptions.map((member) => <option key={member.id} value={member.userId}>{demoUserById(member.userId)?.name ?? member.userId}</option>)}</select></div><button type="button" className="lms-primary" disabled={!selectedStudent || enrolling} onClick={() => handleEnroll(selectedStudent)}>{enrolling ? "Enrolling…" : "Enroll"}</button>{membersQuery.status === "ready" && studentOptions.length === 0 && <p>Every workspace student is already enrolled.</p>}</div>}
              {enrollmentsQuery.status === "loading" && <div className="skeleton-rows roster-loading"><i className="skeleton" /><i className="skeleton" /></div>}
              {enrollmentsQuery.status === "error" && <div className="error-state"><strong>Couldn&apos;t load the roster</strong><p>{enrollmentsQuery.message}</p></div>}
              {enrollmentsQuery.status === "ready" && enrollments.length === 0 && <div className="empty-state"><strong>No one enrolled yet</strong><p>{canManageEnrollment ? "Enroll a student above." : "Check back once you&apos;re enrolled."}</p></div>}
              {enrollmentsQuery.status === "ready" && enrollments.map((enrollment) => { const user = demoUserById(enrollment.studentId); return <div className="roster-row" key={enrollment.id}><span>{user ? initialsFor(user.name) : "?"}</span><div><strong>{user?.name ?? enrollment.studentId}</strong><small>{user?.email ?? "Unknown learner"}</small></div><small>Enrolled {new Date(enrollment.createdAt).toLocaleDateString()}</small></div>; })}
            </div>
          )}
        </>
      )}
    </LmsShell>
  );
}
