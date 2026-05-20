import { FALLBACK_USERS } from "@/lib/fallback-users";
import { parseUsersPayload, type UserWithRole } from "@/types/user";

export type FetchUsersResult = {
  users: UserWithRole[];
  usedFallback: boolean;
  error: string | null;
};

export async function fetchUsers(): Promise<FetchUsersResult> {
  try {
    const response = await fetch("/users", {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    let body: unknown = null;
    try {
      body = await response.json();
    } catch {
      return {
        users: FALLBACK_USERS,
        usedFallback: true,
        error: "API returned invalid JSON.",
      };
    }

    if (!response.ok) {
      const message =
        body &&
        typeof body === "object" &&
        "error" in body &&
        typeof (body as { error: unknown }).error === "string"
          ? (body as { error: string }).error
          : `Request failed with status ${response.status}.`;
      return {
        users: FALLBACK_USERS,
        usedFallback: true,
        error: message,
      };
    }

    const users = parseUsersPayload(body);
    if (!users) {
      return {
        users: FALLBACK_USERS,
        usedFallback: true,
        error: "API response shape was invalid.",
      };
    }

    if (users.length === 0) {
      return {
        users: FALLBACK_USERS,
        usedFallback: true,
        error: "No users returned from API.",
      };
    }

    return { users, usedFallback: false, error: null };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Network request failed.";
    return {
      users: FALLBACK_USERS,
      usedFallback: true,
      error: message,
    };
  }
}
