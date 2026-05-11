import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getSession();
    if (!session.isLoggedIn) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const database = await prisma.productDatabase.findUnique({
      where: { id },
      include: {
        products: {
          orderBy: { name: "asc" },
        },
      },
    });
    return NextResponse.json(database);
  } catch (error: any) {
    console.error("Error fetching database:", error);
    return NextResponse.json({ 
      error: `Database Error: ${error.message || "Failed to fetch database."}`,
      details: process.env.NODE_ENV === "development" ? error.stack : undefined
    }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getSession();
    if (!session.isLoggedIn) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, isActive } = await req.json();

    if (isActive) {
      // Find the module of this database
      const db = await prisma.productDatabase.findUnique({
        where: { id },
        select: { module: true }
      });
      
      if (db) {
        // Deactivate all others in this module
        await prisma.productDatabase.updateMany({
          where: { module: db.module },
          data: { isActive: false }
        });
      }
    }

    const database = await prisma.productDatabase.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    return NextResponse.json(database);
  } catch (error: any) {
    console.error("Error updating database:", error);
    return NextResponse.json({ 
      error: `Database Error: ${error.message || "Failed to update database."}`,
      details: process.env.NODE_ENV === "development" ? error.stack : undefined
    }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getSession();
    if (!session.isLoggedIn) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Delete all products first
    await prisma.product.deleteMany({
      where: { databaseId: id }
    });

    await prisma.productDatabase.delete({
      where: { id }
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting database:", error);
    return NextResponse.json({ 
      error: `Database Error: ${error.message || "Failed to delete database."}`,
      details: process.env.NODE_ENV === "development" ? error.stack : undefined
    }, { status: 500 });
  }
}
