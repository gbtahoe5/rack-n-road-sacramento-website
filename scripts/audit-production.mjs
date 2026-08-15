import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = path.resolve(import.meta.dirname, "..");
const productionRoot = path.join(repoRoot, "production");
const netlifyConfig = fs.readFileSync(path.join(repoRoot, "netlify.toml"), "utf8");

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

const allFiles = walk(productionRoot);
const htmlFiles = allFiles.filter((file) => file.endsWith(".html"));
const redirects = new Map();
const redirectBlocks = netlifyConfig.matchAll(/\[\[redirects\]\]([\s\S]*?)(?=\n\[\[|$)/g);

for (const match of redirectBlocks) {
  const from = match[1].match(/\bfrom\s*=\s*"([^"]+)"/);
  const to = match[1].match(/\bto\s*=\s*"([^"]+)"/);
  if (from && to) redirects.set(from[1], to[1]);
}

const errors = [];
const checked = new Set();

function isExternal(reference) {
  return /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(reference);
}

function candidatesFor(reference, sourceFile, isLink) {
  const clean = decodeURIComponent(reference.split(/[?#]/, 1)[0]);
  const relative = clean.startsWith("/")
    ? clean.slice(1)
    : path.relative(productionRoot, path.resolve(path.dirname(sourceFile), clean));
  const normalized = relative.replace(/\/$/, "");
  const candidates = [path.join(productionRoot, normalized)];

  if (isLink && !path.extname(normalized)) {
    candidates.push(path.join(productionRoot, `${normalized}.html`));
    candidates.push(path.join(productionRoot, normalized, "index.html"));
  }

  if (!normalized) candidates.push(path.join(productionRoot, "index.html"));
  return candidates;
}

function checkReference(reference, sourceFile, isLink) {
  const trimmed = reference.trim();
  if (!trimmed || isExternal(trimmed) || trimmed.includes("${") || trimmed.includes("+")) return;

  const key = `${sourceFile}\0${trimmed}`;
  if (checked.has(key)) return;
  checked.add(key);

  const cleanPath = trimmed.split(/[?#]/, 1)[0] || "/";
  if (isLink && redirects.has(cleanPath)) return;

  const candidates = candidatesFor(trimmed, sourceFile, isLink);
  if (!candidates.some((candidate) => fs.existsSync(candidate))) {
    errors.push(`${path.relative(repoRoot, sourceFile)} -> ${trimmed}`);
  }
}

for (const htmlFile of htmlFiles) {
  const html = fs.readFileSync(htmlFile, "utf8");
  const attributePattern = /\b(href|src|data-static)\s*=\s*(["'])(.*?)\2/gi;
  const cssUrlPattern = /url\(\s*(["']?)(.*?)\1\s*\)/gi;
  const externalImagePattern = /https?:\/\/[^"'()\s<>]+\.(?:jpe?g|png|webp|gif)(?:\?[^"'()\s<>]*)?/gi;

  for (const match of html.matchAll(externalImagePattern)) {
    errors.push(`${path.relative(repoRoot, htmlFile)} -> external image dependency: ${match[0]}`);
  }

  for (const match of html.matchAll(attributePattern)) {
    checkReference(match[3], htmlFile, match[1].toLowerCase() === "href");
  }
  for (const match of html.matchAll(cssUrlPattern)) {
    checkReference(match[2], htmlFile, false);
  }

  const jsonLdPattern = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  for (const match of html.matchAll(jsonLdPattern)) {
    try {
      JSON.parse(match[1]);
    } catch (error) {
      errors.push(`${path.relative(repoRoot, htmlFile)} -> invalid JSON-LD: ${error.message}`);
    }
  }
}

for (const file of allFiles.filter((item) => /\.(?:jpe?g|png|webp|gif)$/i.test(item))) {
  if (fs.statSync(file).size === 0) {
    errors.push(`${path.relative(repoRoot, file)} -> empty image file`);
  }
}

if (errors.length) {
  console.error(`Production audit failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Production audit passed: ${htmlFiles.length} HTML pages and ${allFiles.length} total files.`);
console.log(`Verified ${checked.size} unique local references and ${redirects.size} Netlify routes.`);
