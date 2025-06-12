#!/usr/bin/env bun
// @ts-check
/// <reference types="node" />

import { readFileSync } from "fs";
import { join, isAbsolute } from "path";

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

// Parse comma-separated author list
function parseAuthors(authorField: string): string[] {
  return authorField
    .split(",")
    .map((author) => author.trim())
    .filter((author) => author.length > 0);
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
  const filePath = isAbsolute(file) ? file : join(process.cwd(), file);

  try {
    // Read current file content to get QIP author
    const content = readFileSync(filePath, "utf8");
    const frontmatter = parseFrontmatter(content);

    if (!frontmatter || !frontmatter.author) {
      console.error(`${file}: Missing or invalid author in frontmatter.`);
      hasError = true;
      continue;
    }

    // Parse authors from frontmatter (comma-separated)
    const qipAuthors = parseAuthors(frontmatter.author);
    console.log(`${file}: QIP authors are '${qipAuthors.join(", ")}'`);

    // Build list of authorized users
    const authorizedUsers = new Set<string>();

    // Add all QIP authors
    qipAuthors.forEach((author) => authorizedUsers.add(author));

    // Add proposed-by user if exists
    if (frontmatter["proposed-by"]) {
      const proposedBy = frontmatter["proposed-by"].trim();
      console.log(`${file}: Proposed by '${proposedBy}'`);
      authorizedUsers.add(proposedBy);
    }

    // Get original author from git history as additional context
    const originalAuthor = getOriginalAuthor(file);
    console.log(`${file}: Original git author is '${originalAuthor}'`);

    // Add original author as authorized user if available
    if (originalAuthor) {
      authorizedUsers.add(originalAuthor);
      console.log(`${file}: Adding original author '${originalAuthor}' to authorized users`);
    }

    // Check if PR author is authorized
    const isAuthorized = authorizedUsers.has(prAuthor);

    if (!isAuthorized) {
      console.error(
        `${file}: PR author '${prAuthor}' is not authorized to modify this QIP. Authorized users: ${Array.from(authorizedUsers).join(", ")}`
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
  console.error("\n❌ Author validation failed. Only authorized users can modify QIP files.");
  console.error("Authorized users include:");
  console.error("- Any author listed in the 'author' field (comma-separated)");
  console.error("- The user listed in the 'proposed-by' field (if present)");
  console.error("\nIf you need to make changes to someone else's QIP, please:");
  console.error("1. Contact one of the authorized authors to make the changes");
  console.error("2. Have them add you as a co-author or set you as 'proposed-by'");
  process.exit(1);
} else {
  console.log("\n✅ All QIP author validations passed.");
}
