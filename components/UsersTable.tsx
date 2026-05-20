"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { UserWithRole } from "@/types/user";

const columnHelper = createColumnHelper<UserWithRole>();

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.role.name, {
    id: "role",
    header: "Role",
    cell: (info) => (
      <span className="inline-flex rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-800">
        {info.getValue()}
      </span>
    ),
  }),
];

type UsersTableProps = {
  data: UserWithRole[];
  pageSize?: number;
};

export function UsersTable({ data, pageSize = 5 }: UsersTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize },
    },
  });

  const { pageIndex } = table.getState().pagination;
  const pageCount = table.getPageCount();

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-xl border border-zinc-200">
        <table className="min-w-full divide-y divide-zinc-200 text-left text-sm">
          <thead className="bg-zinc-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 font-semibold text-zinc-700"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-zinc-100 bg-white">
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-zinc-500"
                >
                  No users to display.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-zinc-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 text-zinc-900">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-zinc-600">
        <p>
          Page {pageIndex + 1} of {pageCount || 1} · {data.length} user
          {data.length === 1 ? "" : "s"}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="rounded-md border border-zinc-300 px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="rounded-md border border-zinc-300 px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
