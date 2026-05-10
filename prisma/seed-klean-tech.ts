import { PrismaClient } from "@prisma/client";
import * as XLSX from "xlsx";
import * as path from "path";
import * as fs from "fs";

const prisma = new PrismaClient();

export async function seedKleanTech() {
  console.log("Seeding Klean Tech products...");

  // Delete existing Klean Tech products
  await prisma.product.deleteMany({
    where: {
      id: {
        startsWith: "kt-"
      }
    }
  });
  console.log("Deleted existing Klean Tech products.");

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

  const productsMap = new Map<string, any>();

  const normalizeName = (name: string) => name.toLowerCase().replace(/\s+/g, " ").trim();

  const getImagePath = (name: string) => {
    const normalized = name.toLowerCase();
    if (normalized.includes("b 4545") || normalized.includes("b4545")) {
      return "templates/klean-tech/products/B4545.png";
    }
    if (normalized.includes("b 6050") || normalized.includes("b6050")) {
      return "templates/klean-tech/products/B6050.png";
    }
    if (normalized.includes("rb 800") || normalized.includes("rb800")) {
      return "templates/klean-tech/products/RB800.png";
    }
    return null;
  };

  // Process Machines
  for (let i = 0; i < machinesData.length; i++) {
    const row = machinesData[i];
    
    // Table 1
    const desc1 = row['DISCRIPTION '];
    const amount1 = row['AMOUNT '];
    if (desc1) {
      const name = String(desc1).trim();
      const rate = parseFloat(String(amount1));
      
      if (name && !isNaN(rate) && rate > 0) {
        const normalized = normalizeName(name);
        const existing = productsMap.get(normalized);
        if (!existing || existing.defaultRate < rate) {
          productsMap.set(normalized, {
            id: `kt-machine-1-${i}`,
            name,
            description: name,
            category: "MACHINE",
            defaultRate: rate,
            imagePath: getImagePath(name),
            unit: "Nos",
            warranty: "N/A",
          });
        }
      }
    }

    // Table 2
    const desc2 = row['DISCRIPTION _1'];
    const amount2 = row['AMOUNT'];
    if (desc2) {
      const name = String(desc2).trim();
      const rate = parseFloat(String(amount2));
      
      if (name && !isNaN(rate) && rate > 0) {
        const normalized = normalizeName(name);
        const existing = productsMap.get(normalized);
        if (!existing || existing.defaultRate < rate) {
          productsMap.set(normalized, {
            id: `kt-machine-2-${i}`,
            name,
            description: name,
            category: "MACHINE",
            defaultRate: rate,
            imagePath: getImagePath(name),
            unit: "Nos",
            warranty: "N/A",
          });
        }
      }
    }
  }

  // Process Spares
  for (let i = 0; i < sparesData.length; i++) {
    const row = sparesData[i];
    const code = row['Part code '];
    const desc = row['Material Description'];
    const price = row[' Price for  2024-25 '];

    if (desc) {
      const partCode = code ? String(code).trim() : "";
      const name = String(desc).trim();
      const rate = parseFloat(String(price));

      if (name && !isNaN(rate) && rate > 0) {
        const normalized = normalizeName(name);
        const existing = productsMap.get(normalized);
        if (!existing || existing.defaultRate < rate) {
          productsMap.set(normalized, {
            id: partCode ? `kt-spare-${partCode}` : `kt-spare-idx-${i}`,
            name,
            description: name,
            category: "SPARE",
            defaultRate: rate,
            imagePath: getImagePath(name),
            unit: "Nos",
            warranty: "N/A",
          });
        }
      }
    }
  }

  // Add specific machines manually as requested by user
  const manualMachines = [
    {
      id: "kt-spec-rb800",
      name: "Roots Heavy Duty RB800-Battery Operated Ride on Scrubber Drier With SIC Brush",
      description: "Scrubbing width - 800 mm\nSuction width - 1100 mm\nTheoretical area coverage - 4800 m²/hr\nWorking speed - up to 6 km/hr\nTravel speed - 6 km/hr\nPower supply - 24V, 240 V/Ah\nTotal power - 2400 W\nNumber of brushes - 2 pcs\nFresh water tank - 120 L\nDirty water tank - 120 L\nTotal weight (empty / with battery) - 272 / 490 kg",
      category: "MACHINE",
      defaultRate: 718081,
      imagePath: "templates/klean-tech/products/rb800.png",
      unit: "Nos",
      warranty: "N/A",
    },
    {
      id: "kt-spec-b6050",
      name: "Roots Heavy Duty Scrub B6050 Battery Operated Automatic Scrubber Drier with SIC Brush",
      description: "Scrubbing width - 500 mm\nSuction width - 850 mm\nTheoretical area coverage - 2000 m²/hr\nWorking speed - up to 4 km/hr\nBattery - 12/96 V/Ah\nAir flow rate - 28 L/sec\nFresh water tank - 60 L\nDirty water tank - 60 L",
      category: "MACHINE",
      defaultRate: 288546,
      imagePath: "templates/klean-tech/products/B6050.png",
      unit: "Nos",
      warranty: "N/A",
    },
    {
      id: "kt-spec-b4545",
      name: "ROOTS SCRUB B4545 Battery Operated With Sic Brush",
      description: "12V/96Ah Automatic Scrubber Drier\nWith Silicon Carbide brush\nTank capacity - 45 L each of fresh and dirty water\nBrush width - 450 mm\nTheoretical area coverage - 1800 m²/hr",
      category: "MACHINE",
      defaultRate: 234298,
      imagePath: "templates/klean-tech/products/b4545.png",
      unit: "Nos",
      warranty: "N/A",
    }
  ];

  manualMachines.forEach((m) => {
    productsMap.set(normalizeName(m.name), m);
  });

  console.log(`Inserting ${productsMap.size} unique products using createMany...`);
  try {
    const result = await prisma.product.createMany({
      data: Array.from(productsMap.values()),
      skipDuplicates: true,
    });
    console.log(`Successfully inserted ${result.count} products.`);
  } catch (e: any) {
    console.error(`Failed to insert products:`, e.message);
  }
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
