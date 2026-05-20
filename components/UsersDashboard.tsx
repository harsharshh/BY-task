"use client";

import { useCallback, useEffect, useState } from "react";
import { FailureAlert } from "@/components/FailureAlert";
import { UsersTable } from "@/components/UsersTable";
import { fetchUsers } from "@/lib/fetch-users";
import type { UserWithRole } from "@/types/user";

export function UsersDashboard() {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usedFallback, setUsedFallback] = useState(false);
  const [alertDismissed, setAlertDismissed] = useState(false);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    const result = await fetchUsers();
    setUsers(result.users);
    setError(result.error);
    setUsedFallback(result.usedFallback);
    setAlertDismissed(false);
    setLoading(false);
  }, []);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Users &amp; Roles
        </h1>
        <p className="mt-2 text-zinc-600">
          Live data from <code className="text-sm">/users</code> with
          validation, fallback, and pagination.
        </p>
      </header>

      {usedFallback && error && !alertDismissed ? (
        <div className="mb-6">
          <FailureAlert
            message={error}
            onDismiss={() => setAlertDismissed(true)}
          />
        </div>
      ) : null}

      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm text-zinc-500">
          {loading
            ? "Loading users…"
            : usedFallback
              ? "Displaying fallback dataset"
              : "Displaying live API data"}
        </p>
        <button
          type="button"
          onClick={() => void loadUsers()}
          disabled={loading}
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {loading ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      {loading ? (
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-6 py-16 text-center text-zinc-500">
          Fetching users from API…
        </div>
      ) : (
        <UsersTable data={users} pageSize={5} />
      )}
    </div>
  );
}
