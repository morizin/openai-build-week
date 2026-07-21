import type { LmsCapability, MembershipRole, WorkspaceMode } from "./types";

const shared: LmsCapability[] = ["workspace:view", "course:view", "enrollment:view"];

export function capabilitiesFor(mode: WorkspaceMode, role: MembershipRole): LmsCapability[] {
  if (mode === "self-serve" && role === "owner") {
    return [...shared, "course:create", "course:publish", "enrollment:self"];
  }
  if (mode === "organization" && role === "teacher") {
    return [...shared, "workspace:manage-members", "course:create", "course:publish", "enrollment:manage"];
  }
  return shared;
}
