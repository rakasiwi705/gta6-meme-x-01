// SPDX-License-Identifier: MIT
// Entry for make.fun bounty gta6-meme-x-01 ("Post a GTA 6 meme on X").
// Copies POST.json (the X post URL of the meme) into ./output/POST.json.
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const outDir = join(root, "output");

if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}

copyFileSync(join(root, "POST.json"), join(outDir, "POST.json"));
console.log("POST.json copied to output/POST.json");
