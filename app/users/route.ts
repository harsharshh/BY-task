import { NextResponse } from "next/server";
import { isDatabaseConfigured } from "@/lib/env";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    if (!isDatabaseConfigured()) {
      return NextResponse.json(
        {
          error:
            "Database is not configured. Set DATABASE_URL, POSTGRES_URL, or PRISMA_DATABASE_URL.",
        },
        { status: 503 },
      );
    }

    const users = await prisma.user.findMany({
      include: { role: true },
      orderBy: { id: "asc" },
    });

    const payload = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: {
        id: user.role.id,
        name: user.role.name,
      },
    }));

    return NextResponse.json(payload);
  } catch (error) {
    console.error("[GET /users]", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch users";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
