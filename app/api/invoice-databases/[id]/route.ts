import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const database = await prisma.productDatabase.findUnique({
      where: { id: params.id },
      include: {
        products: {
          orderBy: { name: "asc" },
        },
      },
    });
    return NextResponse.json(database);
  } catch (error) {
    console.error("Error fetching database:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, isActive } = await req.json();

    if (isActive) {
      // Deactivate all others in this module
      await prisma.productDatabase.updateMany({
        where: { module: "INVOICE" },
        data: { isActive: false }
      });
    }

    const database = await prisma.productDatabase.update({
      where: { id: params.id },
      data: {
        ...(name !== undefined && { name }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    return NextResponse.json(database);
  } catch (error) {
    console.error("Error updating database:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Delete all products first (cascade should handle it if defined, but better to be safe or Prisma will do it if relation is set)
    await prisma.product.deleteMany({
      where: { databaseId: params.id }
    });

    await prisma.productDatabase.delete({
      where: { id: params.id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting database:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
