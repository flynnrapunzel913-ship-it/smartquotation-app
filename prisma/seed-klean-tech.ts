import { PrismaClient } from "@prisma/client";
import * as XLSX from "xlsx";
import * as path from "path";
import * as fs from "fs";

const prisma = new PrismaClient();

export async function seedKleanTech() {
  console.log("Seeding Klean Tech products with createMany...");

  const machinesPath = path.join(process.cwd(), "data", "MACHINES PRICES.xlsx");
  const sparesPath = path.join(process.cwd(), "data", "SPARES PRICE LIST 2024-25.xlsx");

  if (!fs.existsSync(machinesPath)) {
    console.error(`File not found: ${machinesPath}`);
    return;
  }
  if (!fs.existsSync(sparesPath)) {
    console.error(`File not found: ${sparesPath}`);
    return;
  }

  console.log("Reading machines file...");
  const machinesWorkbook = XLSX.readFile(machinesPath);
  const machinesSheet = machinesWorkbook.Sheets[machinesWorkbook.SheetNames[0]];
  const machinesData = XLSX.utils.sheet_to_json(machinesSheet) as any[];

  console.log("Reading spares file...");
  const sparesWorkbook = XLSX.readFile(sparesPath);
  const sparesSheet = sparesWorkbook.Sheets[sparesWorkbook.SheetNames[0]];
  const sparesData = XLSX.utils.sheet_to_json(sparesSheet) as any[];

  console.log(`Found ${machinesData.length} machines and ${sparesData.length} spares.`);

  const productsToInsert: any[] = [
    {
      id: "kt-spec-rb800",
      name: "ROOTS Heavy Duty RB800",
      description: "Roots Heavy Duty RB800-Battery operated Ride on Scrubber Drier With SIC Brush\nHSN Code: 8479\n\nSpecifications:\n* Scrubbing width: 800 mm\n* Suction width: 1100 mm\n* Theoretical area coverage: 4800 m²/H\n* Working speed: up to 6 km/hr\n* Travel speed: 6 km/hr\n* Power supply: 24V / 240Ah\n* Total power: 2400 W\n* Number of brushes: 2 pcs\n* Fresh water tank: 120 L\n* Dirty water tank: 120 L\n* Total weight empty/with battery: 272 / 490 kg",
      category: "MACHINE",
      defaultRate: 0,
      imagePath: "/templates/klean-tech/products/rb800.png",
      unit: "Nos",
      warranty: "N/A",
    },
    {
      id: "kt-spec-b6050",
      name: "ROOTS Heavy Duty Scrub B6050",
      description: "Roots Heavy Duty Scrub B6050 Battery operated automatic Scrubber drier with SIC brush\nHSN Code: 8479\n\nSpecifications:\n* Scrubbing width: 500 mm\n* Suction width: 850 mm\n* Theoretical area coverage: 2000 m²/h\n* Working speed: up to 4 km/h\n* Battery: 12V / 96Ah\n* Air flow rate: 28 L/sec\n* Fresh water tank: 60 L\n* Dirty water tank: 60 Ltrs",
      category: "MACHINE",
      defaultRate: 0,
      imagePath: "/templates/klean-tech/products/b6050.png",
      unit: "Nos",
      warranty: "N/A",
    },
    {
      id: "kt-spec-b4545",
      name: "ROOTS SCRUB B4545",
      description: "ROOTS SCRUB B4545 Battery Operated With Sic Brush\nHSN Code: 8479\n\nSpecifications:\n* 12V / 96Ah Automatic Scrubber Drier\n* Tank capacity: 45 Ltrs each of fresh/dirt water\n* Brush width: 450 mm\n* Theoretical area coverage: 1800 m²/hr",
      category: "MACHINE",
      defaultRate: 0,
      imagePath: "/templates/klean-tech/products/b4545.png",
      unit: "Nos",
      warranty: "N/A",
    }
  ];

  // Process Machines
  for (let i = 0; i < machinesData.length; i++) {
    const row = machinesData[i];
    
    // Table 1
    const desc1 = row['DISCRIPTION '];
    const amount1 = row['AMOUNT '];
    if (desc1 && amount1) {
      const name = String(desc1).trim();
      const rate = parseFloat(String(amount1)) || 0;
      productsToInsert.push({
        id: `kt-machine-1-${i}`,
        name,
        description: name,
        category: "MACHINE",
        defaultRate: rate,
        imagePath: `/templates/klean-tech/products/${encodeURIComponent(name)}.png`,
        unit: "Nos",
        warranty: "N/A",
      });
    }

    // Table 2
    const desc2 = row['DISCRIPTION _1'];
    const amount2 = row['AMOUNT'];
    if (desc2 && amount2) {
      const name = String(desc2).trim();
      const rate = parseFloat(String(amount2)) || 0;
      productsToInsert.push({
        id: `kt-machine-2-${i}`,
        name,
        description: name,
        category: "MACHINE",
        defaultRate: rate,
        imagePath: `/templates/klean-tech/products/${encodeURIComponent(name)}.png`,
        unit: "Nos",
        warranty: "N/A",
      });
    }
  }

  // Process Spares
  for (let i = 0; i < sparesData.length; i++) {
    const row = sparesData[i];
    const code = row['Part code '];
    const desc = row['Material Description'];
    const price = row[' Price for  2024-25 '];

    if (code && desc) {
      const partCode = String(code).trim();
      const name = String(desc).trim();
      const rate = parseFloat(String(price)) || 0;

      productsToInsert.push({
        id: `kt-spare-${partCode}`,
        name,
        description: name,
        category: "SPARE",
        defaultRate: rate,
        // code: partCode, // Omit to bypass missing column error
        imagePath: `/templates/klean-tech/products/${encodeURIComponent(partCode)}.png`,
        unit: "Nos",
        warranty: "N/A",
      });
    }
  }

  console.log("Inserting products one by one to bypass missing columns...");
  let insertedCount = 0;
  for (const product of productsToInsert) {
    try {
      await prisma.product.upsert({
        where: { id: product.id },
        update: { imagePath: product.imagePath },
        create: product,
      });
      insertedCount++;
    } catch (e: any) {
      console.error(`Failed to upsert ${product.name}:`, e.message);
    }
  }

  console.log(`Successfully inserted ${insertedCount} new products.`);
}

if (require.main === module) {
  seedKleanTech()
    .then(() => prisma.$disconnect())
    .catch((e) => {
      console.error(e);
      prisma.$disconnect();
      process.exit(1);
    });
}
