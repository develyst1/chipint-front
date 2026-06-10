// Copy assets that `next build` (output: 'standalone') does NOT include automatically.
// Standalone ships server.js + a trimmed node_modules, but you must copy:
//   .next/static  ->  .next/standalone/.next/static
//   public        ->  .next/standalone/public
// Run automatically via the "build" script.
import { cpSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const standalone = join(root, ".next", "standalone");

if (!existsSync(standalone)) {
  console.error("[postbuild] .next/standalone not found — is `output: 'standalone'` set in next.config?");
  process.exit(1);
}

cpSync(join(root, ".next", "static"), join(standalone, ".next", "static"), { recursive: true });
console.log("[postbuild] copied .next/static");

if (existsSync(join(root, "public"))) {
  cpSync(join(root, "public"), join(standalone, "public"), { recursive: true });
  console.log("[postbuild] copied public");
}

console.log("[postbuild] standalone ready -> .next/standalone (server.js)");
