import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import * as xlsx from "xlsx";
import pdfParse from "pdf-parse";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    let products: any[] = [];

    if (fileExtension === "xlsx" || fileExtension === "xls" || fileExtension === "csv") {
      const workbook = xlsx.read(buffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(worksheet);

      products = data.map((row: any) => ({
        name: row["Product Name"] || row["Name"] || row["Item"] || "",
        description: row["Description"] || row["Details"] || "",
        unit: row["Unit"] || row["UOM"] || "Nos",
        defaultRate: Number(row["Rate"] || row["Price"] || row["Unit Price"] || 0),
        hsnCode: String(row["HSN"] || row["HSN Code"] || ""),
        gstRate: Number(row["GST"] || row["GST Rate"] || row["Tax"] || 18),
      })).filter(p => p.name);
    } else if (fileExtension === "pdf") {
      const data = await pdfParse(buffer);
      const lines = data.text.split("\n");
      
      // Basic PDF parsing logic (refined version of previous turn)
      lines.forEach(line => {
        const parts = line.trim().split(/\s{2,}/);
        if (parts.length >= 2) {
          const rateMatch = line.match(/(\d+\.?\d*)\s*(Nos|Set|Box|Pkt|Mtr)/i);
          if (rateMatch) {
            products.push({
              name: parts[0],
              description: parts[1] || "",
              unit: rateMatch[2],
              defaultRate: Number(rateMatch[1]),
              hsnCode: "",
              gstRate: 18,
            });
          }
        }
      });
    }

    return NextResponse.json({ 
      products, 
      fileName: file.name,
      count: products.length 
    });
  } catch (error) {
    console.error("Error parsing file:", error);
    return NextResponse.json({ error: "Failed to parse file" }, { status: 500 });
  }
}
