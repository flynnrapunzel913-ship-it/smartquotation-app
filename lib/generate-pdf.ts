import type { Browser } from "puppeteer-core";
import puppeteerCore from "puppeteer-core";
import { getLocalChromeExecutablePath } from "@/lib/chrome-path";

type PdfOptions = {
  displayHeaderFooter?: boolean;
  headerTemplate?: string;
  footerTemplate?: string;
  margin?: { top?: string; bottom?: string; left?: string; right?: string };
};

type SparticuzChromium = (typeof import("@sparticuz/chromium"))["default"];

let sparticuzExecutablePathPromise: Promise<string> | null = null;
let sparticuzChromiumModule: SparticuzChromium | null = null;

function isServerlessRuntime(): boolean {
  return process.env.VERCEL === "1" || Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME);
}

function logPdfError(error: unknown, executablePath?: string): void {
  console.error({
    error,
    stack: error instanceof Error ? error.stack : undefined,
    executablePath,
    platform: process.platform,
    nodeEnv: process.env.NODE_ENV,
    vercel: process.env.VERCEL,
  });
}

async function getSparticuzChromium(): Promise<SparticuzChromium> {
  if (!sparticuzChromiumModule) {
    sparticuzChromiumModule = (await import("@sparticuz/chromium")).default;
    sparticuzChromiumModule.setGraphicsMode = false;
  }
  return sparticuzChromiumModule;
}

/**
 * Resolve Sparticuz Chromium once per warm Lambda container.
 * Uses the package default bin path (do not pass node_modules/.../bin manually).
 */
async function getSparticuzExecutablePath(): Promise<string> {
  if (!sparticuzExecutablePathPromise) {
    sparticuzExecutablePathPromise = (async () => {
      const chromium = await getSparticuzChromium();
      return chromium.executablePath();
    })().catch((error) => {
      sparticuzExecutablePathPromise = null;
      throw error;
    });
  }
  return sparticuzExecutablePathPromise;
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

  return getSparticuzExecutablePath();
}

async function launchBrowser(): Promise<Browser> {
  let executablePath: string | undefined;

  try {
    if (isServerlessRuntime()) {
      const chromium = await getSparticuzChromium();
      executablePath = await getSparticuzExecutablePath();

      return puppeteerCore.launch({
        args: puppeteerCore.defaultArgs({ args: chromium.args, headless: "shell" }),
        executablePath,
        headless: "shell",
      });
    }

    executablePath = await resolveExecutablePath();
    return puppeteerCore.launch({
      executablePath,
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
    });
  } catch (error) {
    logPdfError(error, executablePath);
    throw error;
  }
}

export async function htmlToPdfBuffer(html: string, options?: PdfOptions): Promise<Buffer> {
  try {
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
  } catch (error) {
    logPdfError(error);
    throw error;
  }
}
