import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
        const xlsx = await import("xlsx");
        const workbook = xlsx.read(buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const rawData = xlsx.utils.sheet_to_json(worksheet);

        if (rawData.length === 0) {
          errorMessage = "The uploaded spreadsheet appears to be empty.";
        } else {
          const firstRow = rawData[0] as any;
          const columns = Object.keys(firstRow);
          const findCol = (patterns: string[]) => 
            columns.find(col => patterns.some(p => col.toLowerCase().includes(p.toLowerCase())));

          const codeCol = findCol(["code", "id", "ref", "sl", "no"]);
          const nameCol = findCol(["product", "item", "description", "material", "name", "title"]);
          const descCol = findCol(["details", "full description", "specs"]);
          const rateCol = findCol(["rate", "price", "unit price", "amount", "mrp"]);
          const unitCol = findCol(["unit", "uom", "per"]);
          const hsnCol = findCol(["hsn", "hsn code", "sac"]);
          const gstCol = findCol(["gst", "tax", "gst %", "igst"]);

          if (!nameCol) {
            errorMessage = "Could not detect a product name column.";
          } else if (!rateCol) {
            errorMessage = "Could not detect a rate or price column.";
          } else {
            products = rawData.map((row: any) => ({
              productCode: codeCol ? String(row[codeCol] || "").trim() : "",
              name: String(row[nameCol] || "").trim(),
              description: descCol ? String(row[descCol] || "").trim() : (nameCol.toLowerCase().includes("desc") ? "" : String(row["Description"] || row["Details"] || "").trim()),
              unit: String(row[unitCol || ""] || "Nos").trim(),
              defaultRate: parseFloat(String(row[rateCol] || "0").replace(/[^\d.-]/g, "")) || 0,
              hsnCode: hsnCol ? String(row[hsnCol] || "").trim() : "",
              gstRate: gstCol ? parseFloat(String(row[gstCol] || "18").replace(/[^\d.-]/g, "")) || 18 : 18,
            })).filter(p => p.name && p.defaultRate > 0);

            if (products.length === 0) {
              errorMessage = "No valid product rows were found.";
            }
          }
        }
      } else if (fileExtension === "pdf") {
        // Robust PDF text extraction using pdfjs-dist directly if available, or fallback
        try {
          const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
          const data = new Uint8Array(buffer);
          const loadingTask = pdfjs.getDocument({ data });
          const pdf = await loadingTask.promise;
          let fullText = "";

          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const strings = content.items.map((item: any) => item.str);
            fullText += strings.join(" ") + "\n";
          }

          const lines = fullText.split("\n").map(l => l.trim()).filter(l => l.length > 0);
          lines.forEach(line => {
            const rateMatch = line.match(/^(?:([A-Z0-9-]{3,})\s+)?(.*?)\s+(?:(\d{4,8})\s+)?(\d+(?:\.\d+)?)\s+(Nos|Set|Box|Pkt|Mtr|Kg|Unit|Each|Ltr|Pc)/i);
            if (rateMatch) {
              products.push({
                productCode: rateMatch[1] || "",
                name: rateMatch[2].trim(),
                description: "",
                unit: rateMatch[5],
                defaultRate: parseFloat(rateMatch[4]),
                hsnCode: rateMatch[3] || "",
                gstRate: 18,
              });
            }
          });
        } catch (pdfError) {
          console.error("PDFJS failed, trying fallback...", pdfError);
          // Fallback to pdf-parse if pdfjs-dist fails
          const pdfParse = (await import("pdf-parse")).default || (await import("pdf-parse"));
          const data = await (typeof pdfParse === 'function' ? pdfParse(buffer) : pdfParse.default(buffer));
          const text = data.text;
          const lines = text.split("\n").map((l: string) => l.trim()).filter((l: string) => l.length > 0);
          lines.forEach((line: string) => {
            const rateMatch = line.match(/^(?:([A-Z0-9-]{3,})\s+)?(.*?)\s+(?:(\d{4,8})\s+)?(\d+(?:\.\d+)?)\s+(Nos|Set|Box|Pkt|Mtr|Kg|Unit|Each|Ltr|Pc)/i);
            if (rateMatch) {
              products.push({
                productCode: rateMatch[1] || "",
                name: rateMatch[2].trim(),
                description: "",
                unit: rateMatch[5],
                defaultRate: parseFloat(rateMatch[4]),
                hsnCode: rateMatch[3] || "",
                gstRate: 18,
              });
            }
          });
        }

        if (products.length === 0) {
          errorMessage = "Could not identify any product-rate patterns in the PDF text.";
        }
      } else if (fileExtension === "docx") {
        const mammoth = await import("mammoth");
        const result = await mammoth.extractRawText({ buffer });
        const text = result.value;
        const lines = text.split("\n").map(l => l.trim()).filter(l => l.length > 0);
        lines.forEach(line => {
          const rateMatch = line.match(/^(?:([A-Z0-9-]{3,})\s+)?(.*?)\s+(?:(\d{4,8})\s+)?(\d+(?:\.\d+)?)\s+(Nos|Set|Box|Pkt|Mtr|Kg|Unit|Each|Ltr|Pc)/i);
          if (rateMatch) {
            products.push({
              productCode: rateMatch[1] || "",
              name: rateMatch[2].trim(),
              description: "",
              unit: rateMatch[5],
              defaultRate: parseFloat(rateMatch[4]),
              hsnCode: rateMatch[3] || "",
              gstRate: 18,
            });
          }
        });

        if (products.length === 0) {
          errorMessage = "Could not identify any product-rate patterns in the Word document.";
        }
      } else {
        errorMessage = `Unsupported file format: .${fileExtension}`;
      }
    } catch (parseError: any) {
      console.error("Internal parsing error:", parseError);
      errorMessage = `Parsing error: ${parseError.message || "An unexpected error occurred."}`;
    }

    if (errorMessage) {
      return NextResponse.json({ error: errorMessage }, { status: 422 });
    }

    return NextResponse.json({ 
      success: true,
      databaseName: file.name.split(".")[0],
      fileName: file.name,
      productsCount: products.length,
      columns: ["Product Code", "Product Name", "Description", "Unit", "Rate", "HSN Code", "GST %"],
      products: products
    });
  } catch (error: any) {
    console.error("Critical upload error:", error);
    return NextResponse.json({ 
      error: `Critical Error: ${error.message || "An unexpected server error occurred."}`,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined
    }, { status: 500 });
  }
}
