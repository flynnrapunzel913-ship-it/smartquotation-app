import { QuotationFormValues } from "@/types";

export const MR_MASTER_TEMPLATE: Partial<QuotationFormValues> = {
  gstPercent: 18,
  projectSpecifications: {
    poolLength: "30",
    poolWidth: "20",
    poolDepth: "5",
    poolVolume: "3000 Cft",
    plantRoomSize: "8'X8'X6'",
    shapeOfPool: "RECTANGLE POOL",
    typeOfPool: "SKIMMER TYPE",
    totalPoolVolume: "84951 Ltrs",
    filtrationVolume: "84951 Ltrs",
    turnoverPeriod: "4 Hours",
    tilingArea: "1100 Sft",
    copingArea: "100 Rft",
    waterproofingArea: "1100 Sft"
  },
  sections: [
    { code: "A", title: "Section A – POOL FILTRATION & BASIN EQUIPMENTS / ACCESSORIES - MEP", included: true, sortOrder: 1 },
    { code: "B", title: "Section B – TESTING & ELECTRICAL", included: true, sortOrder: 2 },
    { code: "C", title: "Section C – POOL STARTER & CONTROL PANEL", included: true, sortOrder: 3 },
    { code: "D", title: "Section D – SUPPLY OF SWIMMING POOL MAINTENANCE CLEANING KIT", included: true, sortOrder: 4 },
    { code: "Part 2", title: "Part 2 – POOL FINISHES", included: true, sortOrder: 5 }
  ],
  items: [
    // Section A
    {
      section: "A",
      serialNo: 1,
      category: "Filtration Equipment",
      description: "Providing supply of Bobbin Wound Fiber Glass Sand Filters Max. Velocity 50 m/hr. Dia: 1200 mm, Flow Rate: 12 m3/hr fitted with 06 way multiport valve fitted with pressure gauge panel, manual air bleeder, UV resistance surface.\n\nMAKE : AQVASTAR- Singapore, HORNER Xpress Aquatix - US",
      warranty: "05 Years",
      qty: 1,
      unit: "Nos",
      rate: 45000,
      amount: 45000,
      productId: "seed-temp-prod-1",
      variableValues: { "filterDiameter": "1200", "flowRate": "12" },
      imageUrl: "/template-images/mr-swimming-pools/swimming-pool-filter.jpg"
    },
    {
      section: "A",
      serialNo: 2,
      category: "Maintenance",
      description: "Glass Filter Media / Silica Sand grading: 0.5-1.0 mm for Swimming pool filters for 1200 mm Dia for 500 kg.\n\nMAKE : BLUE LATON/POOL MAXX",
      warranty: "N/A",
      qty: 500,
      unit: "Kg",
      rate: 40,
      amount: 20000,
      productId: "seed-temp-prod-2",
      variableValues: { "grading": "0.5-1.0", "quantity": "500" },
      imageUrl: "/template-images/mr-swimming-pools/filter-media.jpg"
    },
    {
      section: "A",
      serialNo: 3,
      category: "Filtration Equipment",
      description: "Single Stage Self Priming Centrifugal Horizontal Pump with prefilter in Techno Polymer. Motor with 1.5 HP, 1 Phase, 230 V, 2900 RPM, 50 Hz. IP 55 protection and Insulation class F.\n\nMAKE : BLUE LATON / POOL MAXX",
      warranty: "02 Years",
      qty: 1,
      unit: "Nos",
      rate: 25000,
      amount: 25000,
      productId: "seed-temp-prod-3",
      variableValues: { "hp": "1.5", "phase": "1", "voltage": "230", "rpm": "2900" },
      imageUrl: "/template-images/mr-swimming-pools/recirculating-pump.jpg"
    },
    {
      section: "A",
      serialNo: 4,
      category: "Plumbing",
      description: "Drain Grill, Rectangular 300x300mm, Made of ABS White plastic, fitted on the pool floor with necessary plumbing connection.\n\nMAKE : BLUE LATON / POOL MAXX",
      warranty: "N/A",
      qty: 1,
      unit: "Nos",
      rate: 1800,
      amount: 1800,
      productId: "seed-temp-prod-4",
      variableValues: { "size": "300x300mm" },
      imageUrl: "/template-images/mr-swimming-pools/pool-main-drain.jpg"
    },
    {
      section: "A",
      serialNo: 5,
      category: "Plumbing",
      description: "Floor/Wall Inlets, ABS white plastics, 50mm glue connection. Flow Rate: 4 m3/hr.\n\nMAKE : BLUE LATON / POOL MAXX",
      warranty: "N/A",
      qty: 4,
      unit: "Nos",
      rate: 750,
      amount: 3000,
      productId: "seed-temp-prod-5",
      variableValues: { "connectionSize": "50mm", "flowRate": "4" },
      imageUrl: "/template-images/mr-swimming-pools/wall-inlets.jpg"
    },
    {
      section: "A",
      serialNo: 6,
      category: "Lighting",
      description: "LED 9W RGB, 12V AC, 2ft Cord Wall Surface Mounted, IP68 Waterproof, Stainless Steel / ABS.\n\nMAKE : BLUE LATON / POOL MAXX",
      warranty: "01 Years",
      qty: 4,
      unit: "Nos",
      rate: 3500,
      amount: 14000,
      productId: "seed-temp-prod-6",
      variableValues: { "wattage": "9", "color": "RGB" },
      imageUrl: "/template-images/mr-swimming-pools/underwater-light.jpg"
    },
    {
      section: "A",
      serialNo: 7,
      category: "Accessories",
      description: "Heavy Duty 3-Step Stainless Steel 304 Ladder with Easy Mount Legs and anti-slip steps.\n\nMAKE : BLUE LATON / POOL MAXX",
      warranty: "01 Years",
      qty: 1,
      unit: "Nos",
      rate: 12500,
      amount: 12500,
      productId: "seed-temp-prod-7",
      variableValues: { "steps": "3" },
      imageUrl: "/template-images/mr-swimming-pools/pool-ladder.jpg"
    },

    // Section B
    {
      section: "B",
      serialNo: 1,
      category: "Labour",
      description: "Final pressure testing of 50mm internal and external pipes, water balancing, and commissioning of the entire filtration system including pump house equipment.",
      warranty: "N/A",
      qty: 1,
      unit: "Lsm",
      rate: 5000,
      amount: 5000,
      productId: "seed-temp-prod-8",
      variableValues: { "pipeSize": "50mm" }
    },
    {
      section: "B",
      serialNo: 2,
      category: "Electrical",
      description: "Supply of copper cables, PVC conduits, flexible pipes and accessories for pool and plant room electrical works. 3 Core 2.5 Sqmm cables.",
      warranty: "N/A",
      qty: 1,
      unit: "Lsm",
      rate: 12000,
      amount: 12000,
      productId: "seed-temp-prod-9",
      variableValues: { "core": "3", "size": "2.5" }
    },

    // Section C
    {
      section: "C",
      serialNo: 1,
      category: "Electrical",
      description: "Stator Panel outdoor type double door wall mounted for 1.5HP pump with DC control space and analog timer for automatic operation.\n\nMAKE : BLUE LATON / POOL MAXX",
      warranty: "01 Years",
      qty: 1,
      unit: "Nos",
      rate: 15000,
      amount: 15000,
      productId: "seed-temp-prod-10",
      variableValues: { "pumpHp": "1.5", "timerType": "analog" }
    },

    // Section D
    {
      section: "D",
      serialNo: 1,
      category: "Maintenance",
      description: "Flexible weighted Vacuum Head (14\") with wheels for floor cleaning.\n\nMAKE : BLUE LATON / POOL MAXX",
      warranty: "N/A",
      qty: 1,
      unit: "Nos",
      rate: 4200,
      amount: 4200,
      productId: "seed-temp-prod-11",
      variableValues: { "size": "14" },
      imageUrl: "/template-images/mr-swimming-pools/vacuum-head.jpg"
    },
    {
      section: "D",
      serialNo: 2,
      category: "Maintenance",
      description: "1.5\" Heavy duty spiral wound suction hose, flexible EVA material for 30 ft.\n\nMAKE : BLUE LATON / POOL MAXX",
      warranty: "N/A",
      qty: 1,
      unit: "Nos",
      rate: 5500,
      amount: 5500,
      productId: "seed-temp-prod-12",
      variableValues: { "size": "1.5", "length": "30" },
      imageUrl: "/template-images/mr-swimming-pools/vacuum-hose.jpg"
    },
    {
      section: "D",
      serialNo: 3,
      category: "Maintenance",
      description: "Reinforced Aluminum Telescopic Rod (16 ft) for pool cleaning accessories.",
      warranty: "N/A",
      qty: 1,
      unit: "Nos",
      rate: 2800,
      amount: 2800,
      productId: "seed-temp-prod-13",
      variableValues: { "size": "16" },
      imageUrl: "/template-images/mr-swimming-pools/telescopic-rod.jpg"
    },
    {
      section: "D",
      serialNo: 4,
      category: "Maintenance",
      description: "Heavy duty plastic frame with deep nylon mesh for leaf and debris collection.",
      warranty: "N/A",
      qty: 1,
      unit: "Nos",
      rate: 1500,
      amount: 1500,
      productId: "seed-temp-prod-14",
      variableValues: {},
      imageUrl: "/template-images/mr-swimming-pools/leaf-rake.jpg"
    },
    {
      section: "D",
      serialNo: 5,
      category: "Maintenance",
      description: "TCCA 90 Chlorine granules, Algaecide, and PH adjusters for initial water treatment.",
      warranty: "N/A",
      qty: 1,
      unit: "Lsm",
      rate: 8500,
      amount: 8500,
      productId: "seed-temp-prod-15",
      variableValues: {},
      imageUrl: "/template-images/mr-swimming-pools/pool-chemicals.jpg"
    },
    {
      section: "D",
      serialNo: 6,
      category: "Maintenance",
      description: "Test Kit for measuring Chlorine & pH Levels in pool water. (Make: Emaux/Aqua)",
      warranty: "N/A",
      qty: 1,
      unit: "Nos",
      rate: 1500,
      amount: 1500,
      productId: "seed-temp-prod-16",
      variableValues: {},
      imageUrl: "/template-images/mr-swimming-pools/test-kit.jpg"
    },
    {
      section: "D",
      serialNo: 7,
      category: "Maintenance",
      description: "18\" Nylon Bristle brush for wall and floor scrubbing.",
      warranty: "N/A",
      qty: 1,
      unit: "Nos",
      rate: 1200,
      amount: 1200,
      productId: "seed-temp-prod-17",
      variableValues: {},
      imageUrl: "/template-images/mr-swimming-pools/pool-brush.jpg"
    },

    // Part 2
    {
      section: "Part 2",
      serialNo: 1,
      category: "Finishes",
      description: "Providing 2-coat polymer-modified cementitious waterproofing coating for pool basin floor and walls for area 1100 Sft.\n\nMAKE : FOSROC / MYK LATICRETE",
      warranty: "05 Years",
      qty: 1100,
      unit: "Sft",
      rate: 80,
      amount: 88000,
      productId: "seed-temp-prod-18",
      variableValues: { "area": "1100" }
    },
    {
      section: "Part 2",
      serialNo: 2,
      category: "Finishes",
      description: "Supply of Ceramic or Glass Mosaic pool tiles, 1x1 inch, Sky Blue color for total area 1100 Sft.\n\nMAKE : AQVASTAR / KAJARIA",
      warranty: "N/A",
      qty: 1100,
      unit: "Sft",
      rate: 120,
      amount: 132000,
      productId: "seed-temp-prod-19",
      variableValues: { "size": "1x1", "color": "Sky Blue", "area": "1100" }
    }
  ],
  terms: `1. Single phase connection up to the plant room is in your scope of work.
2. Back wash line after the plant room and water supply to balance tank is in your scope.
3. All Civil works mentioned above are at our scope.
4. Rates are valid for 30 days from the date of quotation.`,
  paymentTerms: `1. 30% Payment along with the PO.
2. 30% payment after bar bending.
3. 30% during tile fixing work.
4. 10% on successful commissioning and testing.`,
  notes: ""
};
