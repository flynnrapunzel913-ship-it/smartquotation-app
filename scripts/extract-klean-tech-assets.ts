import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";

async function extractAssets() {
  const pdfPath = path.join(process.cwd(), "templates", "DANA ANAND INDIA PRIVATE LIMITED RB800 AND B4545 B6050 08.05 2026.pdf");
  const outputDir = path.join(process.cwd(), "public", "templates", "klean-tech");
  const productsDir = path.join(outputDir, "products");

  // Create directories if they don't exist
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  if (!fs.existsSync(productsDir)) fs.mkdirSync(productsDir, { recursive: true });

  console.log("Launching browser to extract assets from PDF...");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Set viewport to a standard A4-like width in pixels
  await page.setViewport({ width: 1200, height: 1600 });

  // Open the local PDF file
  const fileUrl = `file://${pdfPath}`;
  console.log(`Opening ${fileUrl}`);
  await page.goto(fileUrl, { waitUntil: "networkidle0" });

  // Wait a bit for the PDF to render
  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log("Capturing regions...");

  // Coordinates are guesses for a 1200px wide viewport.
  // You may need to adjust these if they don't capture correctly!
  
  // 1. Extract ROOTS Logo (Top Left)
  await page.screenshot({
    path: path.join(outputDir, "roots-logo.png"),
    clip: { x: 50, y: 50, width: 200, height: 80 },
  });
  console.log("Extracted roots-logo.png");

  // 2. Extract Product Images
  // We'll take a few crops where the images usually are in the table
  
  // Product 1 (e.g., RB 800)
  await page.screenshot({
    path: path.join(productsDir, "rb800.png"),
    clip: { x: 450, y: 400, width: 100, height: 100 },
  });
  console.log("Extracted rb800.png");

  // Product 2 (e.g., B 4545)
  await page.screenshot({
    path: path.join(productsDir, "b4545.png"),
    clip: { x: 450, y: 550, width: 100, height: 100 },
  });
  console.log("Extracted b4545.png");

  // Product 3 (e.g., B 6050)
  await page.screenshot({
    path: path.join(productsDir, "b6050.png"),
    clip: { x: 450, y: 700, width: 100, height: 100 },
  });
  console.log("Extracted b6050.png");

  await browser.close();
  console.log("Extraction complete! Please check the public/templates/klean-tech/ folder.");
  console.log("If the crops are off, adjust the 'clip' coordinates in this script and run again.");
}

extractAssets().catch(console.error);
