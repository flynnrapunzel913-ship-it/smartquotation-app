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
import { format } from "date-fns";
import { formatCurrencyINR } from "@/lib/utils";
import type { QuotationWithRelations } from "@/types";
import type { CompanySettings } from "@prisma/client";
import type { ProjectSpecifications } from "@/types";
import fs from "fs";
import path from "path";

const thinBorder = { style: BorderStyle.SINGLE, size: 1, color: "999999" };
const blackBorder = { style: BorderStyle.SINGLE, size: 1, color: "000000" };
const noBorder = { style: BorderStyle.NIL, size: 0, color: "FFFFFF" };
const brandBlue = "1e3a8a";
const summaryYellow = "FFFF00";

const HEADER_CONTACTS = {
  phone1: "+91 9538840277",
  phone2: "+91 9845326115",
  email: "mracademyhubli@gmail.com",
  website: "www.mrswimmingacademy.com",
  registeredOffice: "Regd. Office: #191, Sri Mallikarjuna, Naveen Park, Kusugal Road, Keshwapur, Hubballi - 580 023",
  branches: "Branches: Bengaluru \u2022 Mysuru \u2022 Kalburgi",
};

function cell(
  text: string,
  opts?: {
    bold?: boolean;
    align?: (typeof AlignmentType)[keyof typeof AlignmentType];
  },
): TableCell {
  return new TableCell({
    borders: { top: thinBorder, bottom: thinBorder, left: thinBorder, right: thinBorder },
    width: { size: 14, type: WidthType.PERCENTAGE },
    children: [
      new Paragraph({
        alignment: opts?.align,
        children: [new TextRun({ text, bold: opts?.bold, size: 18 })],
      }),
    ],
  });
}

function borderlessCell(children: (Paragraph | Table)[], widthPct: number): TableCell {
  return new TableCell({
    width: { size: widthPct, type: WidthType.PERCENTAGE },
    borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder },
    children,
  });
}

function contactParagraph(
  label: string,
  value: string,
  align: (typeof AlignmentType)[keyof typeof AlignmentType] = AlignmentType.LEFT,
): Paragraph {
  return new Paragraph({
    alignment: align,
    spacing: { after: 40 },
    children: [
      new TextRun({ text: `${label}: `, bold: true, size: 16, color: brandBlue }),
      new TextRun({ text: value, bold: true, size: 19, color: brandBlue }),
    ],
  });
}

function plainValue(value?: string | null): string {
  return value?.trim() ? value : "";
}

function formatAmountWithoutCurrency(amount: number | string): string {
  return formatCurrencyINR(amount).replace("₹", "").trim();
}

function specText(text: string, bold = false): TextRun {
  return new TextRun({ text, bold, size: 18, color: "000000" });
}

function specSimpleCell(
  text: string,
  widthPct: number,
  opts?: { bold?: boolean; align?: (typeof AlignmentType)[keyof typeof AlignmentType] },
): TableCell {
  return new TableCell({
    borders: { top: thinBorder, bottom: thinBorder, left: thinBorder, right: thinBorder },
    width: { size: widthPct, type: WidthType.PERCENTAGE },
    children: [
      new Paragraph({
        alignment: opts?.align,
        children: [specText(text, opts?.bold)],
      }),
    ],
  });
}

function summaryCell(
  text: string,
  widthPct: number,
  opts?: {
    align?: (typeof AlignmentType)[keyof typeof AlignmentType];
    color?: string;
  },
): TableCell {
  return new TableCell({
    borders: { top: blackBorder, bottom: blackBorder, left: blackBorder, right: blackBorder },
    shading: { fill: summaryYellow },
    width: { size: widthPct, type: WidthType.PERCENTAGE },
    children: [
      new Paragraph({
        alignment: opts?.align,
        children: [new TextRun({ text, bold: true, size: 18, color: opts?.color ?? "000000" })],
      }),
    ],
  });
}

function multilineParagraphs(text: string, size = 20): Paragraph[] {
  return text.split(/\r?\n/).map(
    (line) =>
      new Paragraph({
        children: [new TextRun({ text: line, size })],
      }),
  );
}

export async function quotationToDocxBuffer(
  quote: QuotationWithRelations,
  company: CompanySettings | null,
): Promise<Buffer> {
  const specs = quote.projectSpecifications as ProjectSpecifications;
  const c = company;

  const sections = (quote as any).sections && (quote as any).sections.length > 0
    ? (quote as any).sections.filter((s: any) => s.included)
    : [
        { code: "A", title: "Section A - MEP & Filtration" },
        { code: "B", title: "Section B - Testing & Electrical" },
        { code: "C", title: "Section C - Maintenance Cleaning Kit" },
        { code: "Part 2", title: "Part 2 - Pool Finishes" },
      ];

  const children: (Paragraph | Table)[] = [];
  const sumSections = (sectionCodes: string[]) =>
    quote.items
      .filter((item) => sectionCodes.includes(item.section))
      .reduce((total, item) => total + Number(item.amount), 0);
  const part1Total = sumSections(["A", "B", "C", "D"]);
  const part2Total = sumSections(sections.map((s: any) => s.code).filter((c: string) => !["A", "B", "C", "D"].includes(c)));

  const logoPath = path.join(process.cwd(), "public", "templates", "mr-swimming-pools", "logo.png");
  const logoChildren: Paragraph[] = [
    new Paragraph({
      children: fs.existsSync(logoPath)
        ? [
            new ImageRun({
              type: "png",
              data: fs.readFileSync(logoPath),
              transformation: { width: 185, height: 59 },
              altText: {
                title: "MR Swimming Pools logo",
                description: "MR Swimming Pools & Spa Construction Company logo",
                name: "MR Swimming Pools logo",
              },
            }),
          ]
        : [new TextRun({ text: c?.companyName ?? "MR SWIMMING POOLS & SPA", bold: true, size: 24, color: brandBlue })],
    }),
  ];

  children.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder, insideHorizontal: noBorder, insideVertical: noBorder },
      rows: [
        new TableRow({
          children: [
            borderlessCell(logoChildren, 32),
            borderlessCell([
              contactParagraph("Tel", HEADER_CONTACTS.phone1),
              contactParagraph("Tel", HEADER_CONTACTS.phone2),
            ], 32),
            borderlessCell([
              contactParagraph("Mail", HEADER_CONTACTS.email, AlignmentType.RIGHT),
              contactParagraph("Web", HEADER_CONTACTS.website, AlignmentType.RIGHT),
            ], 36),
          ],
        }),
      ],
    }),
  );

  children.push(
    new Paragraph({
      spacing: { before: 120 },
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: HEADER_CONTACTS.registeredOffice, bold: true, size: 18, color: brandBlue })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: HEADER_CONTACTS.branches, bold: true, size: 18, color: brandBlue })],
    }),
  );
  children.push(
    new Paragraph({
      spacing: { before: 200 },
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "QUOTATION / BILL OF QUANTITIES", bold: true, size: 28 })],
    }),
  );

  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: "Client: ", bold: true, size: 22 }),
        new TextRun({ text: quote.customer.name, size: 22 }),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "Site: ", bold: true, size: 22 }),
        new TextRun({ text: quote.customer.address, size: 22 }),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "Date: ", bold: true, size: 22 }),
        new TextRun({ text: format(new Date(quote.date), "dd MMM yyyy"), size: 22 }),
      ],
    }),
  );

  children.push(
    new Paragraph({
      spacing: { before: 160, after: 120 },
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "ELECTRO - MECHANICAL AND WATERPROOFING, POOL TILING WORKS SPECIFICATIONS", bold: true, size: 22 })],
    }),
  );

  const mainPoolSize = [specs.poolLength, specs.poolWidth, specs.poolDepth].map(plainValue).filter(Boolean).join("X");

  children.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              borders: { top: thinBorder, bottom: thinBorder, left: thinBorder, right: thinBorder },
              width: { size: 50, type: WidthType.PERCENTAGE },
              children: [
                new Paragraph({ alignment: AlignmentType.CENTER, children: [specText("SWIMMING POOL SPECIFICATIONS", true)] }),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [specText(`(Main Pool ${mainPoolSize})`)] }),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [specText(`Plant Room -${String(specs.plantRoomSize ?? "")}`)] }),
              ],
            }),
            new TableCell({
              borders: { top: thinBorder, bottom: thinBorder, left: thinBorder, right: thinBorder },
              width: { size: 50, type: WidthType.PERCENTAGE },
              children: [
                new Paragraph({ children: [specText("SHAPE OF POOL", true), specText(` - ${plainValue(specs.shapeOfPool)}`)] }),
                new Paragraph({ children: [specText("TYPE OF POOL", true), specText(` - ${plainValue(specs.typeOfPool)}`)] }),
              ],
            }),
          ],
        }),
      ],
    }),
  );

  const mainPoolTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          specSimpleCell("MAIN POOL", 50, { bold: true }),
          specSimpleCell("In FT", 50, { bold: true }),
        ],
      }),
      new TableRow({
        children: [
          specSimpleCell("Length", 50),
          specSimpleCell(plainValue(specs.poolLength), 50, { align: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          specSimpleCell("Width", 50),
          specSimpleCell(plainValue(specs.poolWidth), 50, { align: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          specSimpleCell("Depth", 50),
          specSimpleCell(plainValue(specs.poolDepth), 50, { align: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          specSimpleCell("Water Volume", 50),
          specSimpleCell(plainValue(specs.poolVolume), 50, { align: AlignmentType.CENTER }),
        ],
      }),
    ],
  });

  const plantRoomTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          specSimpleCell("PLANT ROOM SIZE", 50, { bold: true }),
          specSimpleCell(plainValue(String(specs.plantRoomSize ?? "")), 50, { align: AlignmentType.CENTER }),
        ],
      }),
    ],
  });

  const detailRows = [
    ["Total Pool Volume in Liters", specs.totalPoolVolume],
    ["Total Filtration Volume in Ltrs", specs.filtrationVolume],
    ["Turnover Period", specs.turnoverPeriod],
    ["Total Tiling Area in Sft", specs.tilingArea],
    ["Total Coping Area in Rft", specs.copingArea],
    ["Total Waterproofing Area in Sft", specs.waterproofingArea],
  ];

  const detailsTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: detailRows.map(([label, value]) =>
      new TableRow({
        children: [
          specSimpleCell(label ?? "", 68),
          specSimpleCell(plainValue(value), 32, { align: AlignmentType.CENTER }),
        ],
      }),
    ),
  });

  children.push(
    new Paragraph({ spacing: { before: 120 } }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder, insideHorizontal: noBorder, insideVertical: noBorder },
      rows: [
        new TableRow({
          children: [
            borderlessCell([mainPoolTable, new Paragraph({ spacing: { after: 80 } }), plantRoomTable], 50),
            borderlessCell([detailsTable], 50),
          ],
        }),
      ],
    }),
  );

  const itemsBySection = new Map<string, typeof quote.items>();
  for (const item of quote.items) {
    const list = itemsBySection.get(item.section) ?? [];
    list.push(item);
    itemsBySection.set(item.section, list);
  }
  for (const sec of sections) {
    const rows = itemsBySection.get(sec.code);
    if (!rows?.length) continue;

    children.push(
      new Paragraph({
        spacing: { before: 160 },
        children: [new TextRun({ text: sec.title, bold: true, size: 24 })],
      }),
    );

    const headerRow = new TableRow({
      tableHeader: true,
      children: [
        cell("SL", { bold: true }),
        cell("Description", { bold: true }),
        cell("Wty", { bold: true }),
        cell("Qty", { bold: true, align: AlignmentType.RIGHT }),
        cell("Unit", { bold: true }),
        cell("Rate", { bold: true, align: AlignmentType.RIGHT }),
        cell("Amount", { bold: true, align: AlignmentType.RIGHT }),
      ],
    });

    const dataRows = rows.map(
      (it: (typeof quote.items)[number]) => {
        const descriptionCellChildren: Paragraph[] = it.description.split("\n").map(line => {
          const isMakeLine = line.toUpperCase().includes("MAKE :");
          return new Paragraph({
            children: [
              new TextRun({ 
                text: line, 
                color: isMakeLine ? "1e40af" : "000000",
                bold: isMakeLine,
                size: 18 
              })
            ]
          });
        });
        if (it.imageUrl) {
          const imageTypeMatch = it.imageUrl.match(/^data:image\/(png|jpg|jpeg|gif|bmp);base64,/);
          const imageType = imageTypeMatch?.[1] === "jpeg" ? "jpg" : imageTypeMatch?.[1] ?? "png";
          const base64Data = it.imageUrl.replace(/^data:image\/\w+;base64,/, "");
          descriptionCellChildren.push(new Paragraph({
            children: [
              new ImageRun({
                type: imageType as "jpg" | "png" | "gif" | "bmp",
                data: Buffer.from(base64Data, "base64"),
                transformation: { width: 100, height: 75 },
              }),
            ],
          }));
        }

        return new TableRow({
          children: [
            cell(String(it.serialNo)),
            new TableCell({
              borders: { top: thinBorder, bottom: thinBorder, left: thinBorder, right: thinBorder },
              width: { size: 14, type: WidthType.PERCENTAGE },
              children: descriptionCellChildren,
            }),
            cell(it.warranty),
            cell(String(Number(it.qty)), { align: AlignmentType.RIGHT }),
            cell(it.unit),
            cell(formatAmountWithoutCurrency(Number(it.rate)), { align: AlignmentType.RIGHT }),
            cell(formatAmountWithoutCurrency(Number(it.amount)), { align: AlignmentType.RIGHT }),
          ],
        });
      }
    );

    children.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [headerRow, ...dataRows],
      }),
    );
  }

  children.push(
    new Paragraph({ spacing: { before: 200 } }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            summaryCell("Description", 58),
            summaryCell("Qty", 10, { align: AlignmentType.CENTER }),
            summaryCell("Unit", 12, { align: AlignmentType.CENTER }),
            summaryCell("Amount", 20, { align: AlignmentType.RIGHT }),
          ],
        }),
        new TableRow({
          children: [
            summaryCell("Cost for Pool Electromechanical works", 58),
            summaryCell("1", 10, { align: AlignmentType.CENTER }),
            summaryCell("Set", 12, { align: AlignmentType.CENTER }),
            summaryCell(formatCurrencyINR(part1Total), 20, { align: AlignmentType.RIGHT }),
          ],
        }),
        new TableRow({
          children: [
            summaryCell("Cost for Waterproofing, Granite Copping & Swimming Pool Tiles work", 58),
            summaryCell("1", 10, { align: AlignmentType.CENTER }),
            summaryCell("Set", 12, { align: AlignmentType.CENTER }),
            summaryCell(formatCurrencyINR(part2Total), 20, { align: AlignmentType.RIGHT }),
          ],
        }),
        new TableRow({
          children: [
            summaryCell("", 58),
            summaryCell("", 10),
            summaryCell("*TOTAL Rs.", 12, { align: AlignmentType.CENTER, color: "0000FF" }),
            summaryCell(formatCurrencyINR(Number(quote.subtotal)), 20, { align: AlignmentType.RIGHT }),
          ],
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: { before: 80, after: 180 },
      children: [
        new TextRun({
          text: `*GST@${Number(quote.gstPercent)}% EXTRA`,
          bold: true,
          underline: {},
          color: "0000FF",
          size: 20,
        }),
      ],
    }),
  );

  if (quote.terms) {
    children.push(
      new Paragraph({
        spacing: { before: 120 },
        children: [new TextRun({ text: "TERMS & CONDITIONS", bold: true, size: 22 })],
      }),
      ...multilineParagraphs(quote.terms),
    );
  }

  if (quote.paymentTerms) {
    children.push(
      new Paragraph({
        spacing: { before: 160 },
        children: [new TextRun({ text: "PAYMENT TERMS", bold: true, size: 22 })],
      }),
      ...multilineParagraphs(quote.paymentTerms),
    );
  }

  if (quote.notes) {
    children.push(
      new Paragraph({
        spacing: { before: 120 },
        children: [new TextRun({ text: "Notes", bold: true, size: 22 })],
      }),
      new Paragraph({ children: [new TextRun({ text: quote.notes, size: 20 })] }),
    );
  }

  children.push(
    new Paragraph({
      spacing: { before: 280 },
      children: [new TextRun({ text: "Thanking you,", size: 20, bold: true })],
    }),
    new Paragraph({
      spacing: { before: 160 },
      children: [new TextRun({ text: "For M R SWIMMING POOL & SPA CONSTRUCTION COMPANY", size: 20, bold: true })],
    }),
    new Paragraph({
      spacing: { before: 160 },
      children: [new TextRun({ text: "(Rajesh V Shetti)", size: 20, bold: true })],
    }),
    new Paragraph({
      children: [new TextRun({ text: "9538840277 / 9845326115", size: 20, bold: true })],
    }),
  );

  const doc = new Document({
    sections: [{ children }],
  });

  const buf = await Packer.toBuffer(doc);
  return Buffer.from(buf);
}


