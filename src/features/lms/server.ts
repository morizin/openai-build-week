import { MemoryLmsRepository } from "./repository";
import { LmsService } from "./service";

const globalLms = globalThis as typeof globalThis & { proofPathRepository?: MemoryLmsRepository; proofPathService?: LmsService };

export const lmsRepository = globalLms.proofPathRepository ?? new MemoryLmsRepository();
export const lmsService = globalLms.proofPathService ?? new LmsService(lmsRepository);

if (process.env.NODE_ENV !== "production") {
  globalLms.proofPathRepository = lmsRepository;
  globalLms.proofPathService = lmsService;
}
