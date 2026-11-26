// The Best Meal You Ever Had — one sentence, written to /output/entry.txt.
//
// The sentence: gas-station fried chicken off the hood of a grandfather's
// truck at a desert rest stop, eaten too hot to hold, with the secret
// ingredient named at the end.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const SENTENCE =
  "Gas-station fried chicken off the hood of my grandfather's truck at a " +
  "desert rest stop, eaten too hot to hold while he told me the secret " +
  "ingredient was hunger.";

const OUTPUT_PATH = "/output/entry.txt";
const FALLBACK_PATH = new URL("./entry.txt", import.meta.url).pathname;
const MAX_CHARS = 200;

// The gate wants one clean sentence: non-empty, within the cap, and a
// single sentence that ends with its full stop.
function validate(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("sentence must not be blank");
  }
  if (text.length > MAX_CHARS) {
    throw new Error(`sentence must be at most ${MAX_CHARS} characters`);
  }
  const stops = text.split("").filter((ch) => ch === ".").length;
  if (stops !== 1 || !text.endsWith(".")) {
    throw new Error("entry must be exactly one sentence ending in a period");
  }
}

// Write the sentence to a path, creating its directory when needed.
function writeSentence(path: string, text: string): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, text, "utf8");
}

function main(): void {
  validate(SENTENCE);
  try {
    writeSentence(OUTPUT_PATH, SENTENCE);
  } catch {
    // No writable /output (e.g. a local dry run): keep the sentence beside
    // the program instead of failing outright.
    writeSentence(FALLBACK_PATH, SENTENCE);
  }
  console.log(SENTENCE);
}

main();
