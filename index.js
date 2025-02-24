#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");

try {
  console.log("🚀 Initializing Git repository...");
  execSync("git init", { stdio: "inherit" });

  console.log("📄 Creating README.md...");
  if (!fs.existsSync("README.md")) {
    fs.writeFileSync("README.md", "# Git Setup CEIE\n");
    console.log("✅ README.md created!");
  } else {
    console.log("⚠ README.md already exists, skipping...");
  }

  console.log("📄 Creating an initial commit...");
  execSync("git add README.md", { stdio: "inherit" });
  try {
    // Use double quotes for the commit message to avoid shell quoting issues
    execSync('git commit -m "Initial commit"', { stdio: "inherit" });
  } catch (error) {
    console.log("⚠ Initial commit may already exist, skipping commit...");
  }

  // Ensure that HEAD is a valid commit; if not, force an empty commit
  try {
    execSync("git rev-parse --verify HEAD", { stdio: "ignore" });
  } catch {
    console.log("📌 No commit found on current branch, creating an empty commit...");
    execSync('git commit --allow-empty -m "Empty initial commit"', { stdio: "inherit" });
  }

  console.log("✅ Checking for existing branches...");
  const branchExists = (branch) => {
    try {
      execSync(`git show-ref --verify --quiet refs/heads/${branch}`);
      return true;
    } catch {
      return false;
    }
  };

  console.log("🔀 Switching to 'main' branch...");
  if (!branchExists("main")) {
    console.log("🆕 Creating and switching to 'main' branch...");
    execSync("git checkout -b main", { stdio: "inherit" });
  } else {
    console.log("🔄 'main' branch exists, switching to it...");
    execSync("git checkout main", { stdio: "inherit" });
  }

  // Create 'controlled-environment' branch if it doesn't exist
  if (!branchExists("controlled-environment")) {
    console.log("🆕 Creating 'controlled-environment' branch...");
    execSync("git branch controlled-environment", { stdio: "inherit" });
  } else {
    console.log("⚠ Branch 'controlled-environment' already exists, skipping...");
  }

  // Create 'isolated-environment' branch if it doesn't exist
  if (!branchExists("isolated-environment")) {
    console.log("🆕 Creating 'isolated-environment' branch...");
    execSync("git branch isolated-environment", { stdio: "inherit" });
  } else {
    console.log("⚠ Branch 'isolated-environment' already exists, skipping...");
  }

  console.log("🔀 Switching back to 'main' branch...");
  execSync("git checkout main", { stdio: "inherit" });

  console.log("🎉 Git repository is set up with 'main', 'controlled-environment', and 'isolated-environment' branches!");
} catch (error) {
  console.error("❌ Error setting up Git repository:", error.message);
}
