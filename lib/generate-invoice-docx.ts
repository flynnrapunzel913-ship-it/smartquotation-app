import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  ImageRun,
} from "docx";
import fs from "fs";
import path from "path";

export async function generateInvoiceDocx(invoice: any): Promise<Buffer> {
  const items = invoice.items as any[];
  
  // Calculate totals for rendering
  const subTotal = Number(invoice.subTotal).toFixed(2);
  const cgstAmount = Number(invoice.cgstAmount).toFixed(2);
  const sgstAmount = Number(invoice.sgstAmount).toFixed(2);
  const grandTotal = Number(invoice.grandTotal).toFixed(2);
  const roundOff = Number(invoice.roundOff).toFixed(2);

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Header (Logo and Company Info)
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              insideHorizontal: { style: BorderStyle.NONE },
              insideVertical: { style: BorderStyle.NONE },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 40, type: WidthType.PERCENTAGE },
                    children: [
                      // Logo placeholder or actual image if possible
                      new Paragraph({
                        children: [
                          new TextRun({ text: "MR SWIMMING POOLS & SPA", bold: true, size: 24 }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 60, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        children: [
                          new TextRun({ text: "+91 9538840277 | mracademyhubli@gmail.com", size: 18 }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        children: [
                          new TextRun({ text: "Regd. Office: #191, Sri Mallikarjuna, Naveen Park, Kusugal Road, Hubballi", size: 18 }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        children: [
                          new TextRun({ text: `GSTNo: 29ABMFM0120E1ZL`, bold: true, size: 20 }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 400, after: 400 },
            children: [
              new TextRun({ text: `TAX INVOICE NO: ${invoice.invoiceNumber}`, bold: true, size: 28, underline: {} }),
            ],
          }),

          // Date and To Section
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              insideHorizontal: { style: BorderStyle.NONE },
              insideVertical: { style: BorderStyle.NONE },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 70, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({ children: [new TextRun({ text: "To,", bold: true })] }),
                      new Paragraph({ children: [new TextRun({ text: `M/s. ${invoice.customerName}`, bold: true })] }),
                      new Paragraph({ children: [new TextRun({ text: invoice.customerAddress })] }),
                      new Paragraph({ children: [new TextRun({ text: `GST: ${invoice.customerGST || ""}`, bold: true })] }),
                      new Paragraph({ children: [new TextRun({ text: `MOB: ${invoice.customerMobile || ""}`, bold: true })] }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 30, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        children: [
                          new TextRun({ text: `Date: ${new Date(invoice.invoiceDate).toLocaleDateString("en-GB")}`, bold: true }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          // Items Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            spacing: { before: 400 },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: "SL. No", bold: true, alignment: AlignmentType.CENTER })] }),
                  new TableCell({ children: [new Paragraph({ text: "Description", bold: true, alignment: AlignmentType.CENTER })] }),
                  new TableCell({ children: [new Paragraph({ text: "Unit Per", bold: true, alignment: AlignmentType.CENTER })] }),
                  new TableCell({ children: [new Paragraph({ text: "Qty", bold: true, alignment: AlignmentType.CENTER })] }),
                  new TableCell({ children: [new Paragraph({ text: "Total", bold: true, alignment: AlignmentType.CENTER })] }),
                ],
              }),
              ...items.map((item, index) => (
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph({ text: (index + 1).toString(), alignment: AlignmentType.CENTER })] }),
                    new TableCell({ children: [new Paragraph({ text: item.description.toUpperCase() })] }),
                    new TableCell({ children: [new Paragraph({ text: Number(item.unitPrice).toFixed(2), alignment: AlignmentType.RIGHT })] }),
                    new TableCell({ children: [new Paragraph({ text: item.qty.toString(), alignment: AlignmentType.CENTER })] }),
                    new TableCell({ children: [new Paragraph({ text: Number(item.total).toFixed(2), alignment: AlignmentType.RIGHT })] }),
                  ],
                })
              )),
              // Totals rows
              new TableRow({
                children: [
                  new TableCell({ columnSpan: 3, children: [] }),
                  new TableCell({ children: [new Paragraph({ text: "Sub Total", bold: true })] }),
                  new TableCell({ children: [new Paragraph({ text: subTotal, alignment: AlignmentType.RIGHT })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ columnSpan: 3, children: [] }),
                  new TableCell({ children: [new Paragraph({ text: `CGST@${invoice.cgstPercent}%`, bold: true })] }),
                  new TableCell({ children: [new Paragraph({ text: cgstAmount, alignment: AlignmentType.RIGHT })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ columnSpan: 3, children: [] }),
                  new TableCell({ children: [new Paragraph({ text: `SGST@${invoice.sgstPercent}%`, bold: true })] }),
                  new TableCell({ children: [new Paragraph({ text: sgstAmount, alignment: AlignmentType.RIGHT })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ columnSpan: 3, children: [] }),
                  new TableCell({ children: [new Paragraph({ text: "Grand Total", bold: true })] }),
                  new TableCell({ children: [new Paragraph({ text: grandTotal, alignment: AlignmentType.RIGHT, bold: true })] }),
                ],
              }),
            ],
          }),

          new Paragraph({
            spacing: { before: 400 },
            children: [
              new TextRun({ text: `RUPEES : ${invoice.amountInWords}`, bold: true }),
            ],
          }),

          new Paragraph({
            spacing: { before: 400 },
            children: [
              new TextRun({ text: "OUR BANK DETAILS-", bold: true, underline: {} }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: invoice.bankDetails }),
            ],
          }),

          new Paragraph({
            alignment: AlignmentType.RIGHT,
            spacing: { before: 800 },
            children: [
              new TextRun({ text: "For M R SWIMMING POOL AND SPA CONSTRUCTION CO,", bold: true }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            spacing: { before: 1200 },
            children: [
              new TextRun({ text: "AUTHORISED SIGNATORY.", bold: true }),
            ],
          }),
        ],
      },
    ],
  });

  return await Packer.toBuffer(doc);
}
