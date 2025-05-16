#!/usr/bin/env bun
// @ts-check
/// <reference types="node" />

import { readFileSync } from "fs";
import { join } from "path";

// Helper to parse YAML frontmatter (reusing from validate-qip.ts)
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

// Get the original author from git history
function getOriginalAuthor(filePath: string): string | null {
  try {
    const { execSync } = require("child_process");
    // Get the commit that first added this file
    const firstCommit = execSync(`git log --reverse --format="%H" -- "${filePath}"`, { encoding: "utf8" }).trim().split("\n")[0];
    if (!firstCommit) return null;

    // Get the GitHub username from the first commit
    const authorInfo = execSync(`git show --format="%an|%ae" ${firstCommit}`, { encoding: "utf8" }).split("\n")[0];
    const [name, email] = authorInfo.split("|");

    // Try to extract GitHub username from email (if it's a GitHub email)
    if (email.includes("@users.noreply.github.com")) {
      const match = email.match(/(\d+\+)?([^@]+)@users\.noreply\.github\.com/);
      if (match) return match[2];
    }

    // Fallback to commit author name
    return name;
  } catch (error) {
    console.error(`Error getting original author for ${filePath}:`, error);
    return null;
  }
}

const args = process.argv.slice(2);
if (args.length < 2) {
  console.log("Usage: validate-author.ts <pr-author> <file1> [file2] ...");
  process.exit(0);
}

const prAuthor = args[0];
const files = args.slice(1);

let hasError = false;

console.log(`Validating that PR author '${prAuthor}' can modify QIP files...`);

for (const file of files) {
  const filePath = join(process.cwd(), file);

  try {
    // Read current file content to get QIP author
    const content = readFileSync(filePath, "utf8");
    const frontmatter = parseFrontmatter(content);

    if (!frontmatter || !frontmatter.author) {
      console.error(`${file}: Missing or invalid author in frontmatter.`);
      hasError = true;
      continue;
    }

    const qipAuthor = frontmatter.author;
    console.log(`${file}: QIP author is '${qipAuthor}'`);

    // Get original author from git history as fallback
    const originalAuthor = getOriginalAuthor(file);
    console.log(`${file}: Original git author is '${originalAuthor}'`);

    // Check if PR author matches QIP author
    const isOriginalAuthorMatch = originalAuthor && originalAuthor === prAuthor;

    if (!isOriginalAuthorMatch) {
      console.error(
        `${file}: PR author '${prAuthor}' is not authorized to modify this QIP. QIP author: '${qipAuthor}', Original author: '${originalAuthor}'`
      );
      hasError = true;
    } else {
      console.log(`${file}: ✅ Author validation passed`);
    }
  } catch (error) {
    console.error(`${file}: Error reading file - ${error}`);
    hasError = true;
  }
}

if (hasError) {
  console.error("\n❌ Author validation failed. Only the original author can modify their QIP files.");
  console.error("If you need to make changes to someone else's QIP, please:");
  console.error("1. Contact the original author to make the changes");
  console.error("2. Update the author mapping in scripts/validate-author.ts if usernames don't match");
  process.exit(1);
} else {
  console.log("\n✅ All QIP author validations passed.");
}
