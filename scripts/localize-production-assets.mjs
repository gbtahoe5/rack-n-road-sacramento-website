#!/usr/bin/env node

import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";

const productionDir = new URL("../production/", import.meta.url);
const assetPattern = /https?:\/\/[^"'()\s<>]+\.(?:jpe?g|png|webp|gif)(?:\?[^"'()\s<>]*)?/gi;

const htmlFiles = (await readdir(productionDir))
  .filter((name) => name.endsWith(".html"))
  .sort();

const pages = new Map();
const urls = new Set();

for (const file of htmlFiles) {
  const path = new URL(file, productionDir);
  const html = await readFile(path, "utf8");
  pages.set(file, html);
  for (const match of html.matchAll(assetPattern)) {
    urls.add(match[0].replaceAll("&amp;", "&"));
  }
}

for (const sourceUrl of [...urls].sort()) {
  const parsed = new URL(sourceUrl);
  const domain = parsed.hostname.replace(/^www\./, "");
  const directory = new URL(`assets/vendor/${domain}/`, productionDir);
  await mkdir(directory, { recursive: true });

  const filename = basename(parsed.pathname);
  const destination = new URL(filename, directory);
  if (sourceUrl === "https://racknroad.com/img/sacramento-ebike-rack-install-hero.jpg") {
    const eBikePage = pages.get("e-bike-racks-sacramento.html");
    const embeddedHero = eBikePage?.match(
      /<div class="hero-bg"><img src="data:image\/jpeg;base64,([^"]+)"/,
    );
    if (!embeddedHero) {
      throw new Error("Could not recover the embedded e-bike hero image.");
    }
    await writeFile(destination, Buffer.from(embeddedHero[1], "base64"));
  } else {
    const response = await fetch(sourceUrl);
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}: ${sourceUrl}`);
    }
    await writeFile(destination, Buffer.from(await response.arrayBuffer()));
  }

  const localUrl = `/assets/vendor/${domain}/${filename}`;
  for (const [file, html] of pages) {
    pages.set(
      file,
      html
        .replaceAll(sourceUrl, localUrl)
        .replaceAll(sourceUrl.replaceAll("&", "&amp;"), localUrl),
    );
  }
}

for (const [file, html] of pages) {
  await writeFile(new URL(file, productionDir), html);
}

console.log(`Localized ${urls.size} external image assets across ${htmlFiles.length} pages.`);
