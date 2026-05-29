import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");

function resolveFromNft(nftPath, rel) {
  return path.normalize(path.join(path.dirname(nftPath), rel));
}

function analyzeNft(nftPath) {
  const data = JSON.parse(fs.readFileSync(nftPath, "utf8"));
  const entries = [];

  for (const rel of data.files) {
    const abs = resolveFromNft(nftPath, rel);
    if (!fs.existsSync(abs)) continue;
    const stat = fs.statSync(abs);
    if (!stat.isFile()) continue;
    entries.push({ rel: rel.replace(/\\/g, "/"), size: stat.size });
  }

  entries.sort((a, b) => b.size - a.size);
  const total = entries.reduce((s, e) => s + e.size, 0);

  function categorize(rel) {
    if (rel.includes("@sparticuz/chromium/bin")) return "chromium-bin";
    if (rel.match(/query_engine/)) return "prisma-engine";
    if (rel.includes("generated-client")) return "prisma-client";
    if (rel.includes("puppeteer")) return "puppeteer";
    if (rel.includes("/public/templates")) return "public-templates";
    if (rel.includes("/templates/klean-tech")) return "klean-tech-templates";
    return "other";
  }

  const byCategory = {};
  for (const e of entries) {
    const cat = categorize(e.rel);
    byCategory[cat] = (byCategory[cat] ?? 0) + e.size;
  }

  return { total, fileCount: entries.length, byCategory, top: entries.slice(0, 12) };
}

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (entry.name.endsWith("route.js.nft.json")) acc.push(full);
  }
  return acc;
}

const pdfNfts = walk(path.join(projectRoot, ".next/server/app/api")).filter((p) =>
  p.includes(`${path.sep}pdf${path.sep}`)
);

for (const nftPath of pdfNfts) {
  const rel = nftPath.split(`${path.sep}app${path.sep}api${path.sep}`)[1];
  const r = analyzeNft(nftPath);
  console.log(`\n=== ${rel} ===`);
  console.log(`Total: ${(r.total / 1024 / 1024).toFixed(2)} MB (${r.fileCount} files)`);
  console.log("By category:");
  for (const [cat, size] of Object.entries(r.byCategory).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${cat}: ${(size / 1024 / 1024).toFixed(2)} MB`);
  }
  console.log("Top files:");
  for (const f of r.top) {
    console.log(`  ${(f.size / 1024 / 1024).toFixed(2)} MB  ${f.rel}`);
  }
}
