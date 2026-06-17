/**
 * Verified mapping: MR product id → source image(s) extracted from the reference quotation PDF.
 * Run `npx tsx scripts/sync-mr-product-images.ts` after changing this file.
 */
export type MRImageSource =
  | { type: "single"; sources: [string] }
  | { type: "stack"; sources: string[] }
  | { type: "row"; sources: string[] };

const IMG = (name: string) => name;

/** Product id → PDF-extracted image file(s) under public/template-images/mr-swimming-pools/ */
export const MR_PRODUCT_IMAGE_SOURCES: Record<string, MRImageSource> = {
  "seed-temp-prod-1": { type: "single", sources: [IMG("pdf-page2-img1.jpeg")] },
  "seed-temp-prod-2": { type: "single", sources: [IMG("pdf-page2-img2.jpeg")] },
  "seed-temp-prod-3": { type: "single", sources: [IMG("pdf-page2-img3.jpeg")] },
  "seed-temp-prod-4": { type: "single", sources: [IMG("pdf-page2-img4.jpeg")] },
  "seed-temp-prod-5": { type: "single", sources: [IMG("pdf-page2-img8.jpeg")] },
  "seed-temp-prod-6": {
    type: "stack",
    sources: [IMG("pdf-page2-img5.jpeg"), IMG("pdf-page2-img6.jpeg")],
  },
  "seed-temp-prod-7": { type: "single", sources: [IMG("pdf-page3-img2.jpeg")] },
  "seed-temp-prod-30": { type: "single", sources: [IMG("pdf-page3-img9.jpeg")] },
  "seed-temp-prod-31": { type: "single", sources: [IMG("pdf-page2-img7.jpeg")] },
  "seed-temp-prod-32": { type: "single", sources: [IMG("pdf-page3-img8.jpeg")] },
  "seed-temp-prod-8": { type: "single", sources: [IMG("std-skimmer.jpg")] },
  "seed-temp-prod-9": { type: "single", sources: [IMG("pdf-page3-img4.jpeg")] },
  "seed-temp-prod-10": { type: "single", sources: [IMG("pdf-page3-img3.jpeg")] },
  "seed-temp-prod-11": {
    type: "row",
    sources: [IMG("pdf-page3-img5.jpeg"), IMG("pdf-page3-img6.jpeg")],
  },
  "seed-temp-prod-12": { type: "single", sources: [IMG("pdf-page3-img7.jpeg")] },
  "seed-temp-prod-13": { type: "single", sources: [IMG("pdf-page4-img6.jpeg")] },
  "seed-temp-prod-14": {
    type: "row",
    sources: [IMG("pdf-page4-img3.jpeg"), IMG("pdf-page4-img4.jpeg")],
  },
  "seed-temp-prod-15": { type: "single", sources: [IMG("pdf-page4-img5.jpeg")] },
  "seed-temp-prod-16": { type: "single", sources: [IMG("pdf-page4-img7.jpeg")] },
  "seed-temp-prod-18": { type: "single", sources: [IMG("pdf-page4-img1.jpeg")] },
  "seed-temp-prod-19": { type: "single", sources: [IMG("pdf-page4-img2.jpeg")] },
  "seed-temp-prod-20": { type: "single", sources: [IMG("pdf-page5-img2.jpeg")] },
  "seed-temp-prod-21": { type: "single", sources: [IMG("pdf-page5-img3.jpeg")] },
  "seed-temp-prod-22": { type: "single", sources: [IMG("pdf-page5-img4.jpeg")] },
  "seed-temp-prod-23": { type: "single", sources: [IMG("pdf-page5-img5.jpeg")] },
  "seed-temp-prod-24": { type: "single", sources: [IMG("pdf-page5-img6.jpeg")] },
  "seed-temp-prod-25": { type: "single", sources: [IMG("pool-chemicals.jpg")] },
  "seed-temp-prod-26": { type: "single", sources: [IMG("pdf-page5-img8.jpeg")] },
  "seed-temp-prod-27": { type: "single", sources: [IMG("pdf-page5-img9.jpeg")] },
  "seed-temp-prod-28": { type: "single", sources: [IMG("pdf-page5-img10.jpeg")] },
  "seed-temp-prod-29": { type: "single", sources: [IMG("pdf-page5-img7.jpeg")] },
};

/** Canonical output filename (without directory) per product id */
export const MR_PRODUCT_IMAGE_OUTPUT: Record<string, string> = {
  "seed-temp-prod-1": "swimming-pool-filter.png",
  "seed-temp-prod-2": "filter-media.png",
  "seed-temp-prod-3": "06-way-multiport-valve.png",
  "seed-temp-prod-4": "recirculating-pump.png",
  "seed-temp-prod-5": "pool-main-drain.png",
  "seed-temp-prod-6": "floor-inlets-composite.png",
  "seed-temp-prod-7": "swimming-pool-ladder.png",
  "seed-temp-prod-30": "overflow-grating.png",
  "seed-temp-prod-31": "wall-conduits.png",
  "seed-temp-prod-32": "vacuum-point.png",
  "seed-temp-prod-8": "std-skimmer.png",
  "seed-temp-prod-9": "labour-charges--plant-room-and-basin-equipments.png",
  "seed-temp-prod-10": "plumbing-materials.png",
  "seed-temp-prod-11": "control-regulating-equipments-composite.png",
  "seed-temp-prod-12": "labour-plumbing.png",
  "seed-temp-prod-13": "underwater-light.png",
  "seed-temp-prod-14": "electrical-materials-composite.png",
  "seed-temp-prod-15": "labour-charges--pool-electrical-works.png",
  "seed-temp-prod-16": "pool-starter-for-pumps-and-lights.png",
  "seed-temp-prod-18": "testing-and-commissioning-of-the-pool.png",
  "seed-temp-prod-19": "vacuum-head.png",
  "seed-temp-prod-20": "vacuum-hose.png",
  "seed-temp-prod-21": "telescopic-rod.png",
  "seed-temp-prod-22": "deep-leaf-rake.png",
  "seed-temp-prod-23": "water-test-kit.png",
  "seed-temp-prod-24": "pool-brush.png",
  "seed-temp-prod-25": "pool-chemicals.png",
  "seed-temp-prod-26": "waterproofing.png",
  "seed-temp-prod-27": "coping-stone.png",
  "seed-temp-prod-28": "swimming-pool-tiles.png",
  "seed-temp-prod-29": "tile-fixing-labour.png",
};
