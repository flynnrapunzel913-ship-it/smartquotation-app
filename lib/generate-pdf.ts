import fs from "fs";
import path from "path";
import puppeteerCore from "puppeteer-core";
import { getLocalChromeExecutablePath } from "@/lib/chrome-path";

type PdfOptions = {
  displayHeaderFooter?: boolean;
  headerTemplate?: string;
  footerTemplate?: string;
  margin?: { top?: string; bottom?: string; left?: string; right?: string };
};

function getSparticuzBinPath(): string {
  return path.join(process.cwd(), "node_modules", "@sparticuz/chromium", "bin");
}

function isServerlessRuntime(): boolean {
  return process.env.VERCEL === "1" || Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME);
}

async function resolveExecutablePath(): Promise<string> {
  const useLocalChrome =
    process.env.NODE_ENV === "development" || !isServerlessRuntime();

  if (useLocalChrome) {
    const localChrome = getLocalChromeExecutablePath();
    if (localChrome) {
      return localChrome;
    }
    if (process.env.NODE_ENV === "development") {
      throw new Error(
        "Local Chrome not found. Install Google Chrome or set CHROME_EXECUTABLE_PATH to your chrome executable."
      );
    }
  }

  const chromium = (await import("@sparticuz/chromium")).default;
  const binPath = getSparticuzBinPath();

  if (fs.existsSync(binPath)) {
    return chromium.executablePath(binPath);
  }

  return chromium.executablePath();
}

async function launchBrowser() {
  if (isServerlessRuntime()) {
    const chromium = (await import("@sparticuz/chromium")).default;
    chromium.setGraphicsMode = false;

    return puppeteerCore.launch({
      args: chromium.args,
      executablePath: await resolveExecutablePath(),
      headless: true,
    });
  }

  const executablePath = await resolveExecutablePath();
  return puppeteerCore.launch({
    executablePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
  });
}

export async function htmlToPdfBuffer(html: string, options?: PdfOptions): Promise<Buffer> {
  const browser = await launchBrowser();
  try {
    const page = await browser.newPage();
    await page.setContent(html, {
      waitUntil: process.env.NODE_ENV === "development" ? "load" : "networkidle0",
    });
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      displayHeaderFooter: options?.displayHeaderFooter,
      headerTemplate: options?.headerTemplate,
      footerTemplate: options?.footerTemplate,
      margin: options?.margin ?? { top: "12mm", bottom: "14mm", left: "12mm", right: "12mm" },
    });
    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}
