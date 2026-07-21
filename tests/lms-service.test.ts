import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { LmsError } from "../src/features/lms/errors";
import { createSeededRepository } from "../src/features/lms/repository";
import { LmsService } from "../src/features/lms/service";

const setup = () => new LmsService(createSeededRepository());

describe("LMS tenancy and authorization", () => {
  it("creates an organization workspace with the creator as a teacher", () => {
    const service = setup();
    const workspace = service.createWorkspace("user-sam", { name: "Acme Learning", mode: "organization" });
    assert.equal(workspace.mode, "organization");
    assert.equal(workspace.role, "teacher");
  });

  it("creates a self-serve workspace with its individual as owner", () => {
    const service = setup();
    const workspace = service.createWorkspace("user-maya", { name: "Maya Personal", mode: "self-serve" });
    assert.equal(workspace.mode, "self-serve");
    assert.equal(workspace.role, "owner");
  });

  it("allows an organization teacher to create a draft course", () => {
    const service = setup();
    const course = service.createCourse("user-elena", { workspaceId: "ws-northstar", title: "Research Methods", code: "RES-100", description: "Core methods" });
    assert.equal(course.status, "draft");
    assert.equal(course.createdBy, "user-elena");
  });

  it("blocks an organization student from creating a course", () => {
    const service = setup();
    assert.throws(
      () => service.createCourse("user-maya", { workspaceId: "ws-northstar", title: "Unauthorized Course", code: "NO-101", description: "" }),
      (error) => error instanceof LmsError && error.code === "FORBIDDEN",
    );
  });

  it("allows only teachers to add organization members", () => {
    const service = setup();
    const membership = service.addOrganizationMember("user-elena", "ws-northstar", "user-sam", "student");
    assert.equal(membership.role, "student");
    assert.throws(
      () => setup().addOrganizationMember("user-maya", "ws-northstar", "user-sam", "student"),
      (error) => error instanceof LmsError && error.code === "FORBIDDEN",
    );
  });

  it("allows a teacher to enroll an organization student", () => {
    const service = setup();
    const enrollment = service.enrollStudent("user-elena", { workspaceId: "ws-northstar", courseId: "course-data-101", studentId: "user-jordan" });
    assert.equal(enrollment.studentId, "user-jordan");
    assert.equal(enrollment.enrolledBy, "user-elena");
  });

  it("blocks organization students from enrolling other students", () => {
    const service = setup();
    assert.throws(
      () => service.enrollStudent("user-maya", { workspaceId: "ws-northstar", courseId: "course-data-101", studentId: "user-jordan" }),
      (error) => error instanceof LmsError && error.code === "FORBIDDEN",
    );
  });

  it("allows a self-serve owner to manage a personal course and enroll themselves", () => {
    const service = setup();
    const course = service.createCourse("user-sam", { workspaceId: "ws-sam", title: "Personal Study Plan", code: "SELF-1", description: "Independent study" });
    service.publishCourse("user-sam", "ws-sam", course.id);
    const enrollment = service.enrollStudent("user-sam", { workspaceId: "ws-sam", courseId: course.id, studentId: "user-sam" });
    assert.equal(enrollment.studentId, "user-sam");
  });

  it("prevents a self-serve owner from enrolling another user", () => {
    const service = setup();
    const course = service.createCourse("user-sam", { workspaceId: "ws-sam", title: "Private Study", code: "SELF-2", description: "" });
    service.publishCourse("user-sam", "ws-sam", course.id);
    assert.throws(
      () => service.enrollStudent("user-sam", { workspaceId: "ws-sam", courseId: course.id, studentId: "user-maya" }),
      (error) => error instanceof LmsError && error.code === "FORBIDDEN",
    );
  });
});
