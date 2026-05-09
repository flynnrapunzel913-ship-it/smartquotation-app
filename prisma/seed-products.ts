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
    templateText: "ELECTRICAL MATERIALS:\n\nSupply of 1.5 Sqmm x 2 core Electrical cabling with required conduits for Pool pumps to the electrical panels with required clamping etc.\n\nMAKE : V Guard, Finolex, Havells, Polycab Etc.",
    templateVariables: [],
    category: "ELECTRICAL WORK",
    sectionCode: "B",
    unit: "Lsm",
    warranty: "0",
    defaultRate: 15000,
    sortOrder: 14
  },
  {
    name: "LABOUR CHARGES - POOL ELECTRICAL WORKS",
    templateText: "LABOUR CHARGES - POOL ELECTRICAL WORKS:\n\nLabour charges for Installation of Electrical cabling with required conduits for to Electrical Panel & Pool pumps to the electrical panels with required clamping etc.\n\nMAKE : V Guard, Finolex, Havells, Polycab Etc.",
    templateVariables: [],
    category: "ELECTRICAL WORK",
    sectionCode: "B",
    unit: "Lsm",
    warranty: "01 Years",
    defaultRate: 20000,
    sortOrder: 15
  },

  // SECTION C – ELECTRICAL CONTROL PANEL WITH TIMER
  {
    name: "POOL STARTER FOR PUMPS & LIGHTS",
    templateText: "POOL STARTER FOR PUMPS & LIGHTS:\n\nSupply & fixing of Single Phase starter.",
    templateVariables: [],
    category: "CONTROL PANEL",
    sectionCode: "C",
    unit: "Lsm",
    warranty: "01 Years",
    defaultRate: 3800,
    sortOrder: 16
  },
  {
    name: "TRANSFORMER FOR POOL LIGHTS",
    templateText: "TRANSFORMER FOR POOL LIGHTS:\n\nAC TO DC CONVERTING 12V TRANSFORMER",
    templateVariables: [],
    category: "CONTROL PANEL",
    sectionCode: "C",
    unit: "Nos",
    warranty: "01 YEARS",
    defaultRate: 7500,
    sortOrder: 17
  },
  {
    name: "TESTING & COMMISSIONING OF THE POOL",
    templateText: "TESTING & COMMISSIONING OF THE POOL:\n\nAfter water filling testing, commissioning & running of the pool with required manpower and chemicals for a month time to ensure the proper running condition of the pool filtration system and the pool water clean & Neat.\n\nMAKE : RPSP",
    templateVariables: [],
    category: "CONTROL PANEL",
    sectionCode: "C",
    unit: "Lsm",
    warranty: "0",
    defaultRate: 10000,
    sortOrder: 18
  },

  // SECTION D – SUPPLY OF SWIMMING POOL MAINTENANCE CLEANING KIT
  {
    name: "VACUUM HEAD",
    templateText: "VACUUM HEAD:\n\nSupply of Vacuum Head ABS body with 4 wheels and brush etc.\n\nMAKE : PENTAIR / AQUATIX.",
    templateVariables: [],
    category: "CLEANING KIT",
    sectionCode: "D",
    unit: "Nos",
    warranty: "0",
    defaultRate: 2800,
    sortOrder: 19,
    imagePath: "/template-images/mr-swimming-pools/vacuum-head.jpg"
  },
  {
    name: "VACUUM HOSE",
    templateText: "VACUUM HOSE:\n\nSupply of Vacuum Hose 9 Meter Length for the Pool Cleaning.\n\nMAKE : PENTAIR / AQUATIX.",
    templateVariables: [],
    category: "CLEANING KIT",
    sectionCode: "D",
    unit: "Nos",
    warranty: "0",
    defaultRate: 3500,
    sortOrder: 20,
    imagePath: "/template-images/mr-swimming-pools/vacuum-hose.jpg"
  },
  {
    name: "TELESCOPIC ROD",
    templateText: "TELESCOPIC ROD:\n\nSupply of Telescopic rod 9m length aluminium pole expandable type.\n\nMAKE : PENTAIR / AQUATIX.",
    templateVariables: [],
    category: "CLEANING KIT",
    sectionCode: "D",
    unit: "Nos",
    warranty: "0",
    defaultRate: 4200,
    sortOrder: 21,
    imagePath: "/template-images/mr-swimming-pools/telescopic-rod.jpg"
  },
  {
    name: "DEEP LEAF RAKE",
    templateText: "DEEP LEAF RAKE:\n\nSupply of Deep net for the pool cleaning.\n\nMAKE : PENTAIR / AQUATIX.",
    templateVariables: [],
    category: "CLEANING KIT",
    sectionCode: "D",
    unit: "Nos",
    warranty: "0",
    defaultRate: 1400,
    sortOrder: 22,
    imagePath: "/template-images/mr-swimming-pools/leaf-rake.jpg"
  },
  {
    name: "WATER TEST KIT",
    templateText: "WATER TEST KIT:\n\nSupply of Pool water Test Kit for pH and Chlorin.\n\nMAKE : PENTAIR / AQUATIX.",
    templateVariables: [],
    category: "CLEANING KIT",
    sectionCode: "D",
    unit: "Nos",
    warranty: "0",
    defaultRate: 700,
    sortOrder: 23,
    imagePath: "/template-images/mr-swimming-pools/test-kit.jpg"
  },
  {
    name: "POOL BRUSH",
    templateText: "POOL BRUSH:\n\nSupply of Pool cleaning Brush with aluminium back.\n\nMAKE : PENTAIR / AQUATIX.",
    templateVariables: [],
    category: "CLEANING KIT",
    sectionCode: "D",
    unit: "Nos",
    warranty: "0",
    defaultRate: 1400,
    sortOrder: 24,
    imagePath: "/template-images/mr-swimming-pools/pool-brush.jpg"
  },
  {
    name: "POOL CHEMICALS",
    templateText: "POOL CHEMICALS:\n\nSupply of Pool Chemicals like TCCA 90, Algaecide, pH Balancing Chemicals etc for initial Pool cleaning etc.",
    templateVariables: [],
    category: "CLEANING KIT",
    sectionCode: "D",
    unit: "Lsm",
    warranty: "0",
    defaultRate: 5000,
    sortOrder: 25,
    imagePath: "/template-images/mr-swimming-pools/pool-chemicals.jpg"
  },

  // PART 2 – POOL FINISHES
  {
    name: "WATER PROOFING",
    templateText: "WATER PROOFING:\n\nSupply and applying of ELESTO-MERICO Two coat weather proof high flexibility cementitious mortar with crack bridging capacity up to 2 mm, Edge band for all the corners & Brush bond of 2 coats for swimming pools, Balancing Tank, Filtration room & overflow Gutter.\n\nMAKE : NIPPON / MAPEI / KERAKOLL / NIPPON",
    templateVariables: [],
    category: "POOL FINISHES",
    sectionCode: "Part 2",
    unit: "Lsm",
    warranty: "05 Years",
    defaultRate: 65,
    sortOrder: 26
  },
  {
    name: "COPING STONE: LABOR CHARGES ONLY (**Excluding Granite/cement)",
    templateText: "COPING STONE: LABOR CHARGES ONLY (**Excluding Granite/cement):\n\nLabor charges for fixing of 20mm thick Granite stone as coping stone with required sand, cement or Adhesive including transportation and unloading charges etc.\n\nMAKE : SADARAHALLI / BANGALORE STONE.",
    templateVariables: [],
    category: "POOL FINISHES",
    sectionCode: "Part 2",
    unit: "Sft",
    warranty: "0",
    defaultRate: 80,
    sortOrder: 27
  },
  {
    name: "SWIMMING POOL TILES",
    templateText: "SWIMMING POOL TILES:\n\nSupply of 20mm x 20mm size Glass Mosaic tiles standard colour for the floor and walls of the pool.\n\nMAKE : ",
    templateVariables: [],
    category: "POOL FINISHES",
    sectionCode: "Part 2",
    unit: "Sft",
    warranty: "0",
    defaultRate: 90,
    sortOrder: 28
  },
  {
    name: "Labour charges for Tiles fixing & Epoxy Grouting",
    templateText: "Labour charges for Tiles fixing & Epoxy Grouting with required Tools and materials for cleaning after Grouting etc.",
    templateVariables: [],
    category: "POOL FINISHES",
    sectionCode: "Part 2",
    unit: "Sft",
    warranty: "01 Year for Tiles Fixing",
    defaultRate: 110,
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
