// SPDX-License-Identifier: MIT
// Entry for make.fun bounty gta6-meme-x-01 ("Post a GTA 6 meme on X").
// Copies POST.json (the X post URL of the meme) into ./output/POST.json.
import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const outDir = join(root, "output");

if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}

// Validate POST.json before copying: it must name a real X post URL,
// so a placeholder or a typo fails loudly instead of shipping silently.
const post = JSON.parse(readFileSync(join(root, "POST.json"), "utf8"));
if (
  typeof post?.url !== "string" ||
  !/^https:\/\/x\.com\/[A-Za-z0-9_]+\/status\/[0-9]+$/.test(post.url)
) {
  throw new Error(
    'POST.json must contain {"url": "https://x.com/<handle>/status/<id>"}',
  );
}

copyFileSync(join(root, "POST.json"), join(outDir, "POST.json"));
console.log("POST.json copied to output/POST.json");
