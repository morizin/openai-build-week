import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { capabilitiesFor } from "../src/features/lms/capabilities";
import { createLmsApiClient, LmsApiError } from "../src/features/lms/client";

describe("frontend LMS contract", () => {
  it("maps modes and roles to stable UI capabilities", () => {
    assert.deepEqual(capabilitiesFor("organization", "student"), ["workspace:view", "course:view", "enrollment:view"]);
    assert.ok(capabilitiesFor("organization", "teacher").includes("workspace:manage-members"));
    assert.ok(capabilitiesFor("self-serve", "owner").includes("enrollment:self"));
    assert.ok(!capabilitiesFor("self-serve", "owner").includes("enrollment:manage"));
  });

  it("sends the actor header and expected course query", async () => {
    let capturedUrl = "";
    let capturedHeaders: HeadersInit | undefined;
    const client = createLmsApiClient({
      actorId: "user-maya",
      fetcher: async (url, init) => {
        capturedUrl = String(url);
        capturedHeaders = init?.headers;
        return new Response("[]", { status: 200, headers: { "content-type": "application/json" } });
      },
    });
    await client.listCourses("ws-northstar");
    assert.equal(capturedUrl, "/api/courses?workspaceId=ws-northstar");
    assert.equal((capturedHeaders as Record<string, string>)["x-user-id"], "user-maya");
  });

  it("normalizes API failures for UI error states", async () => {
    const client = createLmsApiClient({
      actorId: "user-maya",
      fetcher: async () => new Response(JSON.stringify({ error: "FORBIDDEN", message: "Teacher access required." }), { status: 403 }),
    });
    await assert.rejects(() => client.listMembers("ws-northstar"), (error) =>
      error instanceof LmsApiError && error.status === 403 && error.body.error === "FORBIDDEN",
    );
  });
});
