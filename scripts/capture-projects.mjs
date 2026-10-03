import { chromium } from "playwright";
import { mkdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const root = process.cwd();
const metadataPath = resolve(root, "src/data/projects.json");
const projects = JSON.parse(readFileSync(metadataPath, "utf8"));
const featured = projects.filter((project) => project.featured);

const browser = await chromium.launch({ headless: true });

try {
  for (const project of featured) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
      colorScheme: "light",
    });

    const page = await context.newPage();

    await page.addInitScript(() => {
      try {
        localStorage.setItem("theme", "light");
      } catch {}
    });

    console.log(`Capturing ${project.name}: ${project.url}`);

    const response = await page.goto(project.url, {
      waitUntil: "domcontentloaded",
      timeout: 60_000,
    });

    if (response && response.status() >= 400) {
      throw new Error(`${project.name} returned HTTP ${response.status()}`);
    }

    await page.waitForTimeout(3500);

    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition: none !important;
          caret-color: transparent !important;
        }
        html { scroll-behavior: auto !important; }
        ::-webkit-scrollbar { display: none !important; }
      `,
    }).catch(() => {});

    const output = resolve(root, "public", project.image.replace(/^\//, ""));
    mkdirSync(dirname(output), { recursive: true });

    await page.screenshot({
      path: output,
      type: "jpeg",
      quality: 86,
      fullPage: false,
    });

    await context.close();
  }
} finally {
  await browser.close();
}
