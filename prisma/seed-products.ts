import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  // SECTION A – PLANT ROOM EQUIPMENTS
  {
    name: "SWIMMING POOL FILTER",
    templateText: "SWIMMING POOL FILTER:\n\nProviding supply of Bobbin Wound Sand Filter {{filterDiameter}} mm Dia fitted with pressure gauge panel, manual air bleeder, UV resistance surface, Non corrosive material, water drain and emptying plug fitted with collector arms and diffuser made from PVC and polypropylene.\n\nMAKE : AQVASTAR- Singapore, HORNER Xpress Aquatix - US",
    templateVariables: ["filterDiameter"],
    category: "PLANT ROOM EQUIPMENTS",
    sectionCode: "A",
    unit: "Nos",
    warranty: "01 Years for Filter Shell",
    defaultRate: 48372,
    sortOrder: 1,
    imagePath: "/template-images/mr-swimming-pools/swimming-pool-filter.jpg"
  },
  {
    name: "FILTER MEDIA",
    templateText: "FILTER MEDIA:\n\nSupply of Silica sand media for the filtrations bed and testing and commissioning.\n\nSand & Gravel grading : {{sandGrading}}\n\nMAKE : RPSP",
    templateVariables: ["sandGrading"],
    category: "PLANT ROOM EQUIPMENTS",
    sectionCode: "A",
    unit: "Kg",
    warranty: "N/A",
    defaultRate: 25,
    sortOrder: 2,
    imagePath: "/template-images/mr-swimming-pools/filter-media.jpg"
  },
  {
    name: "06 WAY MULTIPORT VALVE 1.5\"",
    templateText: "06 WAY MULTIPORT VALVE {{valveSize}}:\n\nSupply of 6 way Multiport valve for the filter unit with pressure gauge, connectors & unions etc.\n\nType : Top Mounted.\n\nMAKE : AQVASTAR- Singapore, HORNER Xpress Aquatix - US",
    templateVariables: ["valveSize"],
    category: "PLANT ROOM EQUIPMENTS",
    sectionCode: "A",
    unit: "Nos",
    warranty: "01 Years",
    defaultRate: 12400,
    sortOrder: 3,
    imagePath: "/template-images/mr-swimming-pools/multiport-valve.jpg"
  },
  {
    name: "RECIRCULATING PUMP",
    templateText: "RECIRCULATING PUMP:\n\nSupply of {{pumpHP}} hp Three phase Self priming low noise pump with built in pre filter and removable strainer, and unions, Heat and chemical resistant casing with Noryl impeller & diffuser, Mechanical Seal, Class F insulation, IP 55 Protection etc.\n\nMAKE : AQVASTAR- Singapore, HORNER Xpress Aquatix - US",
    templateVariables: ["pumpHP"],
    category: "PLANT ROOM EQUIPMENTS",
    sectionCode: "A",
    unit: "Nos",
    warranty: "01 Years",
    defaultRate: 35145,
    sortOrder: 4,
    imagePath: "/template-images/mr-swimming-pools/recirculating-pump.jpg"
  },
  {
    name: "POOL MAIN DRAIN",
    templateText: "POOL MAIN DRAIN:\n\nSupply of {{mainDrainDiameter}} mm dia ABS made floor drain with {{mainDrainPipeSize}} pipe size for the pool water dewatering.\n\nMAKE : PENTAIR / MIDAS / AQUATIX / AQVASTAR",
    templateVariables: ["mainDrainDiameter", "mainDrainPipeSize"],
    category: "PLANT ROOM EQUIPMENTS",
    sectionCode: "A",
    unit: "Nos",
    warranty: "02 Years",
    defaultRate: 1900,
    sortOrder: 5,
    imagePath: "/template-images/mr-swimming-pools/pool-main-drain.jpg"
  },
  {
    name: "WALL INLETS",
    templateText: "WALL INLETS:\n\nSupply of Wall / Floor inlets to the pool with {{wallInletPipeSize}} pipe connection & capable of discharging 5000 - 7000 liter / Hr.\n\nMAKE : PENTAIR / MIDAS / AQUATIX / AQVASTAR",
    templateVariables: ["wallInletPipeSize"],
    category: "PLANT ROOM EQUIPMENTS",
    sectionCode: "A",
    unit: "Nos",
    warranty: "02 Years",
    defaultRate: 920,
    sortOrder: 6,
    imagePath: "/template-images/mr-swimming-pools/wall-inlets.jpg"
  },
  {
    name: "SWIMMING POOL LADDER",
    templateText: "SWIMMING POOL LADDER:\n\nSupply of SS 304 Grade imported Swimming Pool ladder with necessary anchoring etc.\n\nNo of Steps : {{ladderSteps}}\n\nMAKE : PENTAIR / MIDAS / AQUATIX / AQVASTAR",
    templateVariables: ["ladderSteps"],
    category: "PLANT ROOM EQUIPMENTS",
    sectionCode: "A",
    unit: "Nos",
    warranty: "02 Years",
    defaultRate: 22500,
    sortOrder: 7,
    imagePath: "/template-images/mr-swimming-pools/pool-ladder.jpg"
  },
  {
    name: "STD SKIMMER",
    templateText: "STD SKIMMER:\n\nSupply of Standard SKIMMER fitted on the wall of the pool.\n\nMAKE : PENTAIR / MIDAS / AQUATIX / AQVASTAR",
    templateVariables: [],
    category: "PLANT ROOM EQUIPMENTS",
    sectionCode: "A",
    unit: "Nos",
    warranty: "01 Years",
    defaultRate: 6500,
    sortOrder: 8
  },
  {
    name: "LABOUR CHARGES - PLANT ROOM & BASIN EQUIPMENTS",
    templateText: "LABOUR CHARGES - PLANT ROOM & BASIN EQUIPMENTS:\n\nInstallation charges for Plant room filtration equipments & pool inside and outside basin fittings etc.",
    templateVariables: [],
    category: "PLANT ROOM EQUIPMENTS",
    sectionCode: "A",
    unit: "Lsm",
    warranty: "01 Years",
    defaultRate: 25000,
    sortOrder: 9
  },
  {
    name: "PLUMBING MATERIALS",
    templateText: "PLUMBING MATERIALS:\n\nSupply of required Heavy duty 10kg/6kg {{plumbingPipeSize}} PVC/UPVC pipes with required fittings for the Pool and filtration room between plumbing connections etc. All in pasting type.\n\nUPVC Pipes - Elbows - Tees - Shoes\nEnd Cap - MTA - FTA - Coupling - UPVC Solvent etc.\n\nSCH-40 UPVC pipe or 10 Kgf/cm² PVC Pipe.\n\nMAKE : ASTRAL, SUPREME, FINOLEX etc.",
    templateVariables: ["plumbingPipeSize"],
    category: "PLANT ROOM EQUIPMENTS",
    sectionCode: "A",
    unit: "Lsm",
    warranty: "0",
    defaultRate: 115000,
    sortOrder: 10
  },
  {
    name: "CONTROL & REGULATING EQUIPMENTS",
    templateText: "CONTROL & REGULATING EQUIPMENTS:\n\nProviding Supply of Imported Ball valves & NRV to the Pump & filter and Standard ball valves to the Connection Pipe Lines etc.\n\nMAKE : CEPEX - Spain or Equivalent.",
    templateVariables: [],
    category: "PLANT ROOM EQUIPMENTS",
    sectionCode: "A",
    unit: "Nos",
    warranty: "01 Years",
    defaultRate: 3800,
    sortOrder: 11
  },
  {
    name: "LABOUR CHARGES - PLUMBING WORKS",
    templateText: "LABOUR CHARGES - PLUMBING WORKS:\n\nInstallation charges for Plant room filtration equipments & pool inside and outside basin fittings etc.\n\nMAKE :",
    templateVariables: [],
    category: "PLANT ROOM EQUIPMENTS",
    sectionCode: "A",
    unit: "Lsm",
    warranty: "01 Years",
    defaultRate: 25000,
    sortOrder: 12
  },
  {
    name: "UNDERWATER LIGHT",
    templateText: "UNDERWATER LIGHT:\n\nProviding & Laying of {{underwaterLightWattage}} LED underwater Lights with IP68 ratings.",
    templateVariables: ["underwaterLightWattage"],
    category: "PLANT ROOM EQUIPMENTS",
    sectionCode: "A",
    unit: "Nos",
    warranty: "02 Years",
    defaultRate: 5800,
    sortOrder: 13,
    imagePath: "/template-images/mr-swimming-pools/underwater-light.jpg"
  },

  // SECTION B – FILTRATION ROOM ELECTRICAL WORK
  {
    name: "ELECTRICAL MATERIALS",
    templateText: "ELECTRICAL MATERIALS:\n\nSupply of copper cables, PVC conduits, flexible pipes and accessories for pool and plant room electrical works.",
    templateVariables: [],
    category: "ELECTRICAL WORK",
    sectionCode: "B",
    unit: "Lsm",
    warranty: "N/A",
    defaultRate: 18500,
    sortOrder: 14
  },
  {
    name: "LABOUR CHARGES - POOL ELECTRICAL WORKS",
    templateText: "LABOUR CHARGES - POOL ELECTRICAL WORKS:\n\nInstallation charges for Pool lights cabling and Plant room electrical panel connections etc.",
    templateVariables: [],
    category: "ELECTRICAL WORK",
    sectionCode: "B",
    unit: "Lsm",
    warranty: "01 Years",
    defaultRate: 15000,
    sortOrder: 15
  },

  // SECTION C – ELECTRICAL CONTROL PANEL WITH TIMER
  {
    name: "POOL STARTER FOR PUMPS & LIGHTS",
    templateText: "POOL STARTER FOR PUMPS & LIGHTS:\n\nStator Panel outdoor type double door wall mounted for pumps with DC control space and analog timer for automatic operation.",
    templateVariables: [],
    category: "CONTROL PANEL",
    sectionCode: "C",
    unit: "Nos",
    warranty: "01 Years",
    defaultRate: 18500,
    sortOrder: 16
  },
  {
    name: "TRANSFORMER FOR POOL LIGHTS",
    templateText: "TRANSFORMER FOR POOL LIGHTS:\n\nSupply of Step down transformer for underwater LED lights with required wattage.",
    templateVariables: [],
    category: "CONTROL PANEL",
    sectionCode: "C",
    unit: "Nos",
    warranty: "01 Years",
    defaultRate: 12500,
    sortOrder: 17
  },
  {
    name: "TESTING & COMMISSIONING OF THE POOL",
    templateText: "TESTING & COMMISSIONING OF THE POOL:\n\nTesting of all filtration equipments, chemical dosing and handover the pool in operational condition.",
    templateVariables: [],
    category: "CONTROL PANEL",
    sectionCode: "C",
    unit: "Lsm",
    warranty: "N/A",
    defaultRate: 5000,
    sortOrder: 18
  },

  // SECTION D – MAINTENANCE CLEANING KIT
  {
    name: "VACUUM HEAD",
    templateText: "VACUUM HEAD:\n\nFlexible weighted Vacuum Head (14\") with wheels for floor cleaning.",
    templateVariables: [],
    category: "CLEANING KIT",
    sectionCode: "D",
    unit: "Nos",
    warranty: "N/A",
    defaultRate: 4200,
    sortOrder: 19,
    imagePath: "/template-images/mr-swimming-pools/vacuum-head.jpg"
  },
  {
    name: "VACUUM HOSE",
    templateText: "VACUUM HOSE:\n\n1.5\" Heavy duty spiral wound suction hose, flexible EVA material for 30 ft.",
    templateVariables: [],
    category: "CLEANING KIT",
    sectionCode: "D",
    unit: "Nos",
    warranty: "N/A",
    defaultRate: 5500,
    sortOrder: 20,
    imagePath: "/template-images/mr-swimming-pools/vacuum-hose.jpg"
  },
  {
    name: "TELESCOPIC ROD",
    templateText: "TELESCOPIC ROD:\n\nReinforced Aluminum Telescopic Rod (16 ft) for pool cleaning accessories.",
    templateVariables: [],
    category: "CLEANING KIT",
    sectionCode: "D",
    unit: "Nos",
    warranty: "N/A",
    defaultRate: 2800,
    sortOrder: 21,
    imagePath: "/template-images/mr-swimming-pools/telescopic-rod.jpg"
  },
  {
    name: "DEEP LEAF RAKE",
    templateText: "DEEP LEAF RAKE:\n\nHeavy duty plastic frame with deep nylon mesh for leaf and debris collection.",
    templateVariables: [],
    category: "CLEANING KIT",
    sectionCode: "D",
    unit: "Nos",
    warranty: "N/A",
    defaultRate: 1500,
    sortOrder: 22,
    imagePath: "/template-images/mr-swimming-pools/leaf-rake.jpg"
  },
  {
    name: "WATER TEST KIT",
    templateText: "WATER TEST KIT:\n\nTest Kit for measuring Chlorine & pH Levels in pool water.",
    templateVariables: [],
    category: "CLEANING KIT",
    sectionCode: "D",
    unit: "Nos",
    warranty: "N/A",
    defaultRate: 1500,
    sortOrder: 23,
    imagePath: "/template-images/mr-swimming-pools/test-kit.jpg"
  },
  {
    name: "POOL BRUSH",
    templateText: "POOL BRUSH:\n\n18\" Nylon Bristle brush for wall and floor scrubbing.",
    templateVariables: [],
    category: "CLEANING KIT",
    sectionCode: "D",
    unit: "Nos",
    warranty: "N/A",
    defaultRate: 1200,
    sortOrder: 24,
    imagePath: "/template-images/mr-swimming-pools/pool-brush.jpg"
  },
  {
    name: "POOL CHEMICALS",
    templateText: "POOL CHEMICALS:\n\nTCCA 90 Chlorine granules, Algaecide, and PH adjusters for initial water treatment.",
    templateVariables: [],
    category: "CLEANING KIT",
    sectionCode: "D",
    unit: "Lsm",
    warranty: "N/A",
    defaultRate: 8500,
    sortOrder: 25,
    imagePath: "/template-images/mr-swimming-pools/pool-chemicals.jpg"
  },

  // PART 2 – POOL FINISHES
  {
    name: "WATER PROOFING",
    templateText: "WATER PROOFING:\n\nProviding 2-coat polymer-modified cementitious waterproofing coating for pool basin floor and walls.",
    templateVariables: [],
    category: "POOL FINISHES",
    sectionCode: "Part 2",
    unit: "Sft",
    warranty: "05 Years",
    defaultRate: 80,
    sortOrder: 26
  },
  {
    name: "COPING STONE: LABOR CHARGES ONLY (**Excluding Granite/cement)",
    templateText: "COPING STONE: LABOR CHARGES ONLY (**Excluding Granite/cement):\n\nInstallation charges for Granite coping around the pool periphery.",
    templateVariables: [],
    category: "POOL FINISHES",
    sectionCode: "Part 2",
    unit: "Rft",
    warranty: "N/A",
    defaultRate: 150,
    sortOrder: 27
  },
  {
    name: "SWIMMING POOL TILES",
    templateText: "SWIMMING POOL TILES:\n\nSupply of Ceramic or Glass Mosaic pool tiles, 1x1 inch, Sky Blue color.",
    templateVariables: [],
    category: "POOL FINISHES",
    sectionCode: "Part 2",
    unit: "Sft",
    warranty: "N/A",
    defaultRate: 120,
    sortOrder: 28
  },
  {
    name: "Labour charges for Tiles fixing & Epoxy Grouting",
    templateText: "Labour charges for Tiles fixing & Epoxy Grouting:\n\nInstallation of pool tiles with specialized adhesive and epoxy grouting for long lasting finish.",
    templateVariables: [],
    category: "POOL FINISHES",
    sectionCode: "Part 2",
    unit: "Sft",
    warranty: "01 Years",
    defaultRate: 220,
    sortOrder: 29
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
