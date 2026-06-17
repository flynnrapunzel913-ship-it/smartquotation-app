import fs from "fs";
import path from "path";
import sharp from "sharp";
import { MR_PRODUCT_DEFINITIONS } from "../lib/templates/mr-product-definitions";
import {
  MR_PRODUCT_IMAGE_OUTPUT,
  MR_PRODUCT_IMAGE_SOURCES,
} from "../lib/templates/mr-product-image-sources";

const IMG_DIR = path.join(process.cwd(), "public", "template-images", "mr-swimming-pools");
const MAX_DIM = 220;
const PADDING = 6;

async function loadSource(filename: string): Promise<sharp.Sharp> {
  const full = path.join(IMG_DIR, filename);
  if (!fs.existsSync(full)) {
    throw new Error(`Missing source image: ${filename}`);
  }
  return sharp(full).rotate();
}

async function fitImage(input: sharp.Sharp): Promise<Buffer> {
  return input
    .resize(MAX_DIM, MAX_DIM, { fit: "inside", withoutEnlargement: false })
    .png()
    .toBuffer();
}

async function buildComposite(
  source: (typeof MR_PRODUCT_IMAGE_SOURCES)[string],
): Promise<Buffer> {
  if (source.type === "single") {
    return fitImage(await loadSource(source.sources[0]));
  }

  const parts: Buffer[] = [];
  for (const file of source.sources) {
    parts.push(await fitImage(await loadSource(file)));
  }

  if (source.type === "stack") {
    const metas = await Promise.all(parts.map((p) => sharp(p).metadata()));
    const width = Math.max(...metas.map((m) => m.width ?? 0));
    const totalHeight =
      metas.reduce((sum, m) => sum + (m.height ?? 0), 0) + PADDING * (parts.length - 1);

    let y = 0;
    const layers: sharp.OverlayOptions[] = [];
    for (let i = 0; i < parts.length; i++) {
      const meta = metas[i];
      const w = meta.width ?? 0;
      const h = meta.height ?? 0;
      layers.push({
        input: parts[i],
        left: Math.max(0, Math.floor((width - w) / 2)),
        top: y,
      });
      y += h + PADDING;
    }

    return sharp({
      create: {
        width,
        height: totalHeight,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      },
    })
      .composite(layers)
      .png()
      .toBuffer();
  }

  const metas = await Promise.all(parts.map((p) => sharp(p).metadata()));
  const height = Math.max(...metas.map((m) => m.height ?? 0));
  const totalWidth =
    metas.reduce((sum, m) => sum + (m.width ?? 0), 0) + PADDING * (parts.length - 1);

  let x = 0;
  const layers: sharp.OverlayOptions[] = [];
  for (let i = 0; i < parts.length; i++) {
    const meta = metas[i];
    const w = meta.width ?? 0;
    const h = meta.height ?? 0;
    layers.push({
      input: parts[i],
      left: x,
      top: Math.max(0, Math.floor((height - h) / 2)),
    });
    x += w + PADDING;
  }

  return sharp({
    create: {
      width: totalWidth,
      height,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite(layers)
    .png()
    .toBuffer();
}

async function main() {
  console.log("Syncing MR product images from PDF sources...\n");

  const pathUpdates: Record<string, string> = {};

  for (const def of MR_PRODUCT_DEFINITIONS) {
    const source = MR_PRODUCT_IMAGE_SOURCES[def.id];
    const outputName = MR_PRODUCT_IMAGE_OUTPUT[def.id];
    if (!source || !outputName) {
      console.warn(`  SKIP ${def.id} ${def.name} — no image mapping`);
      continue;
    }

    const outPath = path.join(IMG_DIR, outputName);
    const buffer = await buildComposite(source);
    await sharp(buffer).toFile(outPath);

    const publicPath = `/template-images/mr-swimming-pools/${outputName}`;
    pathUpdates[def.id] = publicPath;
    console.log(`  OK ${def.name} → ${outputName}`);
  }

  const defsPath = path.join(process.cwd(), "lib", "templates", "mr-product-definitions.ts");
  let defsContent = fs.readFileSync(defsPath, "utf-8");

  for (const [id, imagePath] of Object.entries(pathUpdates)) {
    const blockStart = defsContent.indexOf(`id: "${id}"`);
    if (blockStart === -1) continue;
    const blockEnd = defsContent.indexOf("\n  },", blockStart);
    const block = defsContent.slice(blockStart, blockEnd);
    const updatedBlock = block.replace(
      /imagePath: "[^"]*"/,
      `imagePath: "${imagePath}"`,
    );
    defsContent = defsContent.replace(block, updatedBlock);
  }

  fs.writeFileSync(defsPath, defsContent);
  console.log("\nUpdated mr-product-definitions.ts image paths.");
  console.log("Run: npx tsx prisma/seed-products.ts");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
