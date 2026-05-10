import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import * as xlsx from "xlsx";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "No file provided for upload." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    let products: any[] = [];
    let errorMessage = "";

    try {
      if (fileExtension === "xlsx" || fileExtension === "xls" || fileExtension === "csv") {
        const workbook = xlsx.read(buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const rawData = xlsx.utils.sheet_to_json(worksheet);

        if (rawData.length === 0) {
          errorMessage = "The uploaded spreadsheet appears to be empty.";
        } else {
          // Smart column detection
          const firstRow = rawData[0] as any;
          const columns = Object.keys(firstRow);
          
          const findCol = (patterns: string[]) => 
            columns.find(col => patterns.some(p => col.toLowerCase().includes(p.toLowerCase())));

          const nameCol = findCol(["product", "item", "description", "material", "name"]);
          const rateCol = findCol(["rate", "price", "unit price", "amount"]);
          const unitCol = findCol(["unit", "uom"]);
          const hsnCol = findCol(["hsn", "hsn code", "code"]);
          const gstCol = findCol(["gst", "tax", "gst %"]);

          if (!nameCol) {
            errorMessage = "Could not detect a product name or description column.";
          } else if (!rateCol) {
            errorMessage = "Could not detect a rate or price column.";
          } else {
            products = rawData.map((row: any) => ({
              name: String(row[nameCol] || "").trim(),
              description: nameCol.toLowerCase().includes("desc") ? "" : String(row["Description"] || row["Details"] || "").trim(),
              unit: String(row[unitCol || ""] || "Nos").trim(),
              defaultRate: parseFloat(String(row[rateCol] || "0").replace(/[^\d.-]/g, "")) || 0,
              hsnCode: hsnCol ? String(row[hsnCol] || "").trim() : "",
              gstRate: gstCol ? parseFloat(String(row[gstCol] || "18").replace(/[^\d.-]/g, "")) || 18 : 18,
            })).filter(p => p.name && p.defaultRate > 0);

            if (products.length === 0) {
              errorMessage = "No valid product rows (with name and price) were found in the spreadsheet.";
            }
          }
        }
      } else if (fileExtension === "pdf") {
        const data = await pdfParse(buffer);
        const text = data.text;
        if (!text || text.trim().length < 10) {
          errorMessage = "PDF text extraction failed or returned no content.";
        } else {
          const lines = text.split("\n").map(l => l.trim()).filter(l => l.length > 0);
          
          // Improved PDF regex parsing for price lists
          lines.forEach(line => {
            // Regex to find a pattern like: [Product Name] [Optional HSN] [Price/Rate] [Unit]
            // Example: "LED UNDERWATER LIGHT 12V/10W 12500 Nos"
            const rateMatch = line.match(/(.*?)\s+(\d{3,})\s+(Nos|Set|Box|Pkt|Mtr|Kg|Unit|Each)/i);
            if (rateMatch) {
              products.push({
                name: rateMatch[1].trim(),
                description: "",
                unit: rateMatch[3],
                defaultRate: parseFloat(rateMatch[2]),
                hsnCode: "",
                gstRate: 18,
              });
            }
          });

          if (products.length === 0) {
            errorMessage = "Could not identify any product-rate patterns in the PDF text.";
          }
        }
      } else if (fileExtension === "docx") {
        const result = await mammoth.extractRawText({ buffer });
        const text = result.value;
        if (!text || text.trim().length < 10) {
          errorMessage = "Word document text extraction failed.";
        } else {
          const lines = text.split("\n").map(l => l.trim()).filter(l => l.length > 0);
          lines.forEach(line => {
            const rateMatch = line.match(/(.*?)\s+(\d{3,})\s+(Nos|Set|Box|Pkt|Mtr|Kg|Unit|Each)/i);
            if (rateMatch) {
              products.push({
                name: rateMatch[1].trim(),
                description: "",
                unit: rateMatch[3],
                defaultRate: parseFloat(rateMatch[2]),
                hsnCode: "",
                gstRate: 18,
              });
            }
          });

          if (products.length === 0) {
            errorMessage = "Could not identify any product-rate patterns in the Word document.";
          }
        }
      } else {
        errorMessage = `Unsupported file format: .${fileExtension}`;
      }
    } catch (parseError: any) {
      console.error("Internal parsing error:", parseError);
      errorMessage = `Parsing error: ${parseError.message || "An unexpected error occurred while reading the file."}`;
    }

    if (errorMessage) {
      return NextResponse.json({ error: errorMessage }, { status: 422 });
    }

    return NextResponse.json({ 
      products, 
      fileName: file.name,
      count: products.length 
    });
  } catch (error) {
    console.error("Critical upload error:", error);
    return NextResponse.json({ error: "A critical error occurred during file upload." }, { status: 500 });
  }
}
