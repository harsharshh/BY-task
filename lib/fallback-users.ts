import type { UserWithRole } from "@/types/user";

export const FALLBACK_USERS: UserWithRole[] = [
  {
    id: 0,
    name: "Offline Demo User",
    email: "demo@offline.local",
    role: { id: 0, name: "Viewer (cached)" },
  },
];
