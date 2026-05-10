import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, description, type, unitPrice, hsnCode, imagePath } = body;

    const product = await prisma.invoiceProduct.update({
      where: { id: params.id },
      data: {
        name,
        description,
        type,
        unitPrice: parseFloat(unitPrice.toString()),
        hsnCode: hsnCode || "",
        imagePath,
      }
    });
    return NextResponse.json(product);
  } catch (error: any) {
    console.error("PUT invoice product failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.invoiceProduct.delete({
      where: { id: params.id }
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
