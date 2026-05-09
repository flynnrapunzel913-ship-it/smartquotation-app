import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  // Section A – POOL FILTRATION & BASIN EQUIPMENTS / ACCESSORIES - MEP
  {
    name: "Swimming Pool Filter",
    templateText: "Providing supply of Bobbin Wound Fiber Glass Sand Filters Max. Velocity 50 m/hr. Dia: {{filterDiameter}} mm, Flow Rate: {{flowRate}} m3/hr fitted with 06 way multiport valve fitted with pressure gauge panel, manual air bleeder, UV resistance surface.\n\nMAKE : AQVASTAR- Singapore, HORNER Xpress Aquatix - US",
    templateVariables: ["filterDiameter", "flowRate"],
    category: "Filtration Equipment",
    sectionCode: "A",
    unit: "Nos",
    warranty: "05 Years",
    defaultRate: 45000,
    sortOrder: 1,
    imagePath: "/template-images/mr-swimming-pools/swimming-pool-filter.jpg"
  },
  {
    name: "Filter Media (Silica Sand)",
    templateText: "Glass Filter Media / Silica Sand grading: {{grading}} for Swimming pool filters for 1200 mm Dia for {{quantity}} kg.\n\nMAKE : BLUE LATON/POOL MAXX",
    templateVariables: ["grading", "quantity"],
    category: "Maintenance",
    sectionCode: "A",
    unit: "Kg",
    warranty: "N/A",
    defaultRate: 40,
    sortOrder: 2,
    imagePath: "/template-images/mr-swimming-pools/filter-media.jpg"
  },
  {
    name: "Recirculating Pump",
    templateText: "Single Stage Self Priming Centrifugal Horizontal Pump with prefilter in Techno Polymer. Motor with {{hp}} HP, {{phase}} Phase, {{voltage}} V, {{rpm}} RPM, 50 Hz. IP 55 protection and Insulation class F.\n\nMAKE : BLUE LATON / POOL MAXX",
    templateVariables: ["hp", "phase", "voltage", "rpm"],
    category: "Filtration Equipment",
    sectionCode: "A",
    unit: "Nos",
    warranty: "02 Years",
    defaultRate: 25000,
    sortOrder: 3,
    imagePath: "/template-images/mr-swimming-pools/recirculating-pump.jpg"
  },
  {
    name: "Pool Main Drain",
    templateText: "Drain Grill, Rectangular {{size}}, Made of ABS White plastic, fitted on the pool floor with necessary plumbing connection.\n\nMAKE : BLUE LATON / POOL MAXX",
    templateVariables: ["size"],
    category: "Plumbing",
    sectionCode: "A",
    unit: "Nos",
    warranty: "N/A",
    defaultRate: 1800,
    sortOrder: 4,
    imagePath: "/template-images/mr-swimming-pools/pool-main-drain.jpg"
  },
  {
    name: "Wall Inlets",
    templateText: "Floor/Wall Inlets, ABS white plastics, {{connectionSize}} glue connection. Flow Rate: {{flowRate}} m3/hr.\n\nMAKE : BLUE LATON / POOL MAXX",
    templateVariables: ["connectionSize", "flowRate"],
    category: "Plumbing",
    sectionCode: "A",
    unit: "Nos",
    warranty: "N/A",
    defaultRate: 750,
    sortOrder: 5,
    imagePath: "/template-images/mr-swimming-pools/wall-inlets.jpg"
  },
  {
    name: "Underwater Light",
    templateText: "LED {{wattage}}W {{color}}, 12V AC, 2ft Cord Wall Surface Mounted, IP68 Waterproof, Stainless Steel / ABS.\n\nMAKE : BLUE LATON / POOL MAXX",
    templateVariables: ["wattage", "color"],
    category: "Lighting",
    sectionCode: "A",
    unit: "Nos",
    warranty: "01 Years",
    defaultRate: 3500,
    sortOrder: 6,
    imagePath: "/template-images/mr-swimming-pools/underwater-light.jpg"
  },
  {
    name: "Swimming Pool Ladder",
    templateText: "Heavy Duty {{steps}}-Step Stainless Steel 304 Ladder with Easy Mount Legs and anti-slip steps.\n\nMAKE : BLUE LATON / POOL MAXX",
    templateVariables: ["steps"],
    category: "Accessories",
    sectionCode: "A",
    unit: "Nos",
    warranty: "01 Years",
    defaultRate: 12500,
    sortOrder: 7,
    imagePath: "/template-images/mr-swimming-pools/pool-ladder.jpg"
  },

  // Section B – TESTING & ELECTRICAL
  {
    name: "Testing & Commissioning of the Pool",
    templateText: "Final pressure testing of {{pipeSize}} internal and external pipes, water balancing, and commissioning of the entire filtration system including pump house equipment.",
    templateVariables: ["pipeSize"],
    category: "Labour",
    sectionCode: "B",
    unit: "Lsm",
    warranty: "N/A",
    defaultRate: 5000,
    sortOrder: 8
  },
  {
    name: "Electrical Materials",
    templateText: "Supply of copper cables, PVC conduits, flexible pipes and accessories for pool and plant room electrical works. {{core}} Core {{size}} Sqmm cables.",
    templateVariables: ["core", "size"],
    category: "Electrical",
    sectionCode: "B",
    unit: "Lsm",
    warranty: "N/A",
    defaultRate: 12000,
    sortOrder: 9
  },

  // Section C – POOL STARTER & CONTROL PANEL
  {
    name: "Electrical Control Panel with Timer",
    templateText: "Stator Panel outdoor type double door wall mounted for {{pumpHp}}HP pump with DC control space and {{timerType}} timer for automatic operation.\n\nMAKE : BLUE LATON / POOL MAXX",
    templateVariables: ["pumpHp", "timerType"],
    category: "Electrical",
    sectionCode: "C",
    unit: "Nos",
    warranty: "01 Years",
    defaultRate: 15000,
    sortOrder: 10
  },

  // Section D – MAINTENANCE CLEANING KIT
  {
    name: "Vacuum Head",
    templateText: "Flexible weighted Vacuum Head ({{size}}\") with wheels for floor cleaning.\n\nMAKE : BLUE LATON / POOL MAXX",
    templateVariables: ["size"],
    category: "Maintenance",
    sectionCode: "D",
    unit: "Nos",
    warranty: "N/A",
    defaultRate: 4200,
    sortOrder: 11,
    imagePath: "/template-images/mr-swimming-pools/vacuum-head.jpg"
  },
  {
    name: "Vacuum Hose",
    templateText: "{{size}}\" Heavy duty spiral wound suction hose, flexible EVA material for {{length}} ft.\n\nMAKE : BLUE LATON / POOL MAXX",
    templateVariables: ["size", "length"],
    category: "Maintenance",
    sectionCode: "D",
    unit: "Nos",
    warranty: "N/A",
    defaultRate: 5500,
    sortOrder: 12,
    imagePath: "/template-images/mr-swimming-pools/vacuum-hose.jpg"
  },

  {
    name: "Telescopic Rod",
    templateText: "Reinforced Aluminum Telescopic Rod ({{size}} ft) for pool cleaning accessories.",
    templateVariables: ["size"],
    category: "Maintenance",
    sectionCode: "D",
    unit: "Nos",
    warranty: "N/A",
    defaultRate: 2800,
    sortOrder: 13,
    imagePath: "/template-images/mr-swimming-pools/telescopic-rod.jpg"
  },
  {
    name: "Deep Leaf Rake",
    templateText: "Heavy duty plastic frame with deep nylon mesh for leaf and debris collection.",
    templateVariables: [],
    category: "Maintenance",
    sectionCode: "D",
    unit: "Nos",
    warranty: "N/A",
    defaultRate: 1500,
    sortOrder: 14,
    imagePath: "/template-images/mr-swimming-pools/leaf-rake.jpg"
  },
  {
    name: "Pool Chemicals",
    templateText: "TCCA 90 Chlorine granules, Algaecide, and PH adjusters for initial water treatment.",
    templateVariables: [],
    category: "Maintenance",
    sectionCode: "D",
    unit: "Lsm",
    warranty: "N/A",
    defaultRate: 8500,
    sortOrder: 15,
    imagePath: "/template-images/mr-swimming-pools/pool-chemicals.jpg"
  },
  {
    name: "Water Test Kit",
    templateText: "Test Kit for measuring Chlorine & pH Levels in pool water. (Make: Emaux/Aqua)",
    templateVariables: [],
    category: "Maintenance",
    sectionCode: "D",
    unit: "Nos",
    warranty: "N/A",
    defaultRate: 1500,
    sortOrder: 16,
    imagePath: "/template-images/mr-swimming-pools/test-kit.jpg"
  },
  {
    name: "Pool Brush",
    templateText: "18\" Nylon Bristle brush for wall and floor scrubbing.",
    templateVariables: [],
    category: "Maintenance",
    sectionCode: "D",
    unit: "Nos",
    warranty: "N/A",
    defaultRate: 1200,
    sortOrder: 17,
    imagePath: "/template-images/mr-swimming-pools/pool-brush.jpg"
  },

  // Part 2 – POOL FINISHES
  {
    name: "Waterproofing",
    templateText: "Providing 2-coat polymer-modified cementitious waterproofing coating for pool basin floor and walls for area {{area}} Sft.\n\nMAKE : FOSROC / MYK LATICRETE",
    templateVariables: ["area"],
    category: "Finishes",
    sectionCode: "Part 2",
    unit: "Sft",
    warranty: "05 Years",
    defaultRate: 80,
    sortOrder: 18
  },
  {
    name: "Swimming Pool Tiles",
    templateText: "Supply of Ceramic or Glass Mosaic pool tiles, {{size}} inch, {{color}} color for total area {{area}} Sft.\n\nMAKE : AQVASTAR / KAJARIA",
    templateVariables: ["size", "color", "area"],
    category: "Finishes",
    sectionCode: "Part 2",
    unit: "Sft",
    warranty: "N/A",
    defaultRate: 120,
    sortOrder: 19
  }
];

export async function seedProducts() {
  console.log("Seeding template-driven products...");
  for (const p of products) {
    await prisma.product.upsert({
      where: { id: `seed-temp-prod-${p.sortOrder}` },
      update: {
        templateText: p.templateText,
        templateVariables: p.templateVariables,
        category: p.category,
        sectionCode: p.sectionCode,
        unit: p.unit,
        warranty: p.warranty,
        defaultRate: p.defaultRate,
        sortOrder: p.sortOrder,
        imagePath: p.imagePath || null,
      },
      create: {
        id: `seed-temp-prod-${p.sortOrder}`,
        name: p.name,
        templateText: p.templateText,
        templateVariables: p.templateVariables,
        category: p.category,
        sectionCode: p.sectionCode,
        unit: p.unit,
        warranty: p.warranty,
        defaultRate: p.defaultRate,
        sortOrder: p.sortOrder,
        imagePath: p.imagePath || null,
      },
    });
  }
  console.log(`Seeded ${products.length} template products.`);
}

if (require.main === module) {
  seedProducts()
    .then(() => prisma.$disconnect())
    .catch((e) => {
      console.error(e);
      prisma.$disconnect();
      process.exit(1);
    });
}
