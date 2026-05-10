import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const dataset = await prisma.productDataset.findUnique({
      where: { id: params.id },
      include: {
        products: {
          orderBy: { name: "asc" },
        },
      },
    });

    if (!dataset) {
      return NextResponse.json({ error: "Dataset not found" }, { status: 404 });
    }

    return NextResponse.json(dataset);
  } catch (error) {
    console.error("Error fetching dataset:", error);
    return NextResponse.json({ error: "Failed to fetch dataset" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name } = body;

    const dataset = await prisma.productDataset.update({
      where: { id: params.id },
      data: { name },
    });

    return NextResponse.json(dataset);
  } catch (error) {
    console.error("Error updating dataset:", error);
    return NextResponse.json({ error: "Failed to update dataset" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Delete all products in the dataset first
    await prisma.product.deleteMany({
      where: { datasetId: params.id },
    });

    // Delete the dataset
    await prisma.productDataset.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting dataset:", error);
    return NextResponse.json({ error: "Failed to delete dataset" }, { status: 500 });
  }
}
