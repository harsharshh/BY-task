export type UserWithRole = {
  id: number;
  name: string;
  email: string;
  role: {
    id: number;
    name: string;
  };
};

export function isUserWithRole(value: unknown): value is UserWithRole {
  if (!value || typeof value !== "object") return false;

  const record = value as Record<string, unknown>;
  const role = record.role;

  return (
    typeof record.id === "number" &&
    typeof record.name === "string" &&
    typeof record.email === "string" &&
    !!role &&
    typeof role === "object" &&
    typeof (role as Record<string, unknown>).id === "number" &&
    typeof (role as Record<string, unknown>).name === "string"
  );
}

export function parseUsersPayload(payload: unknown): UserWithRole[] | null {
  if (!Array.isArray(payload)) return null;

  const users: UserWithRole[] = [];
  for (const item of payload) {
    if (!isUserWithRole(item)) return null;
    users.push(item);
  }

  return users;
}
