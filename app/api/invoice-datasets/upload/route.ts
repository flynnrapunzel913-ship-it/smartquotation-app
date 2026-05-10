import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as XLSX from "xlsx";
import pdf from "pdf-parse";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const datasetName = formData.get("name") as string;

    if (!file || !datasetName) {
      return NextResponse.json({ error: "File and dataset name are required" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name.toLowerCase();
    let extractedProducts: any[] = [];

    if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls") || fileName.endsWith(".csv")) {
      // Parse Excel/CSV
      const workbook = XLSX.read(buffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const rawData = XLSX.utils.sheet_to_json(worksheet) as any[];

      extractedProducts = rawData.map((row: any) => {
        // Basic mapping logic
        const name = row["Product Name"] || row["Item Name"] || row["Product"] || row["Name"] || "";
        const description = row["Description"] || row["Details"] || "";
        const rate = Number(row["Rate"] || row["Price"] || row["Unit Price"] || row["Amount"] || 0);
        const unit = row["Unit"] || row["Qty Unit"] || "Nos";
        const hsnCode = String(row["HSN"] || row["HSN Code"] || "");
        const gstRate = Number(row["GST"] || row["GST Rate"] || 0);
        const code = String(row["Code"] || row["Product Code"] || row["Item Code"] || "");

        return {
          name,
          description,
          defaultRate: rate,
          unit,
          hsnCode,
          gstRate,
          sectionCode: code, // Reusing sectionCode for product code
        };
      }).filter(p => p.name); // Filter out empty rows
    } else if (fileName.endsWith(".pdf")) {
      // Parse PDF
      const data = await pdf(buffer);
      const text = data.text;
      
      // Basic PDF line parsing - search for potential rows
      // This is a naive implementation, user might need to refine Step 4 preview
      const lines = text.split('\n');
      extractedProducts = lines.map(line => {
        const trimmed = line.trim();
        if (!trimmed) return null;
        
        // Naive regex to find "Name ... Price" pattern
        // Example: "Filter 1HP   15000"
        const match = trimmed.match(/^(.+?)\s+(\d+(?:\.\d+)?)$/);
        if (match) {
          return {
            name: match[1].trim(),
            description: "",
            defaultRate: Number(match[2]),
            unit: "Nos",
            hsnCode: "",
            gstRate: 0,
            sectionCode: "",
          };
        }
        return null;
      }).filter(p => p !== null);
    } else {
      return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
    }

    return NextResponse.json({
      name: datasetName,
      fileName: file.name,
      products: extractedProducts,
    });
  } catch (error) {
    console.error("Error uploading dataset:", error);
    return NextResponse.json({ error: "Failed to parse dataset" }, { status: 500 });
  }
}
