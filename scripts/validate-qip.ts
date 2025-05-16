#!/usr/bin/env bun
// @ts-check
/// <reference types="node" />

import { readFileSync } from "fs";
import { join } from "path";

// Helper to parse YAML frontmatter
function parseFrontmatter(content: string) {
  const match = content.match(/^---\n([\s\S]+?)\n---/);
  if (!match) return null;
  const yaml = match[1];
  const lines = yaml.split(/\r?\n/);
  const obj: Record<string, string> = {};
  for (const line of lines) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    // Remove surrounding quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    obj[key] = value;
  }
  return obj;
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log("No QIP files to validate. Skipping.");
  process.exit(0);
}

// Find the highest QIP number in the repo (excluding the ones being added in this PR)
import { readdirSync } from "fs";
const qipDir = join(process.cwd(), "contents", "QIP");
const allQipFiles = readdirSync(qipDir).filter((f) => /^QIP-(\d+)\.md$/.test(f));
const prQipFiles = new Set(args.map((f) => f.replace(/^\.\//, "")));
let highestQip = 0;
for (const file of allQipFiles) {
  if (prQipFiles.has(join("contents/QIP", file))) continue; // skip files being added in this PR
  const num = parseInt(file.match(/^QIP-(\d+)\.md$/)?.[1] || "0", 10);
  if (num > highestQip) highestQip = num;
}

const allowedStatuses = ["Draft", "Approved", "Implemented"];
const requiredFields = ["network", "author", "implementor", "implementation-date"];
const today = new Date().toISOString().slice(0, 10);

let hasError = false;

for (const file of args) {
  const filePath = join(process.cwd(), file);
  let content: string;
  try {
    content = readFileSync(filePath, "utf8");
  } catch (e) {
    console.error(`${file}: File not found or unreadable.`);
    hasError = true;
    continue;
  }
  const frontmatter = parseFrontmatter(content);
  if (!frontmatter) {
    console.error(`${file}: Missing or invalid frontmatter.`);
    hasError = true;
    continue;
  }
  // Status check
  if (!allowedStatuses.includes(frontmatter.status)) {
    console.error(`${file}: Invalid status '${frontmatter.status}'. Allowed: ${allowedStatuses.join(", ")}`);
    hasError = true;
  }
  // Required fields
  for (const field of requiredFields) {
    if (!frontmatter[field] || !frontmatter[field].trim()) {
      console.error(`${file}: Missing or empty required field '${field}'.`);
      hasError = true;
    }
  }
  // Created date check
  if (!frontmatter.created) {
    console.error(`${file}: Missing 'created' field.`);
    hasError = true;
  } else if (frontmatter.created > today) {
    console.error(`${file}: 'created' date ${frontmatter.created} is after today (${today}).`);
    hasError = true;
  }
  // QIP number check
  const thisQip = parseInt(frontmatter.qip, 10);
  if (isNaN(thisQip)) {
    console.error(`${file}: Invalid or missing 'qip' number.`);
    hasError = true;
  } else if (thisQip <= highestQip) {
    console.error(`${file}: QIP number ${thisQip} is not greater than the current highest (${highestQip}).`);
    hasError = true;
  }
}

if (hasError) {
  console.error("QIP validation failed.");
  process.exit(1);
} else {
  console.log("All QIP files passed validation.");
}
