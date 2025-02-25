#!/usr/bin/env node

const { execSync } = require("child_process");

try {
  console.log("🚀 Initializing Git repository...");
  execSync("git init", { stdio: "inherit" });

  console.log("🔍 Checking if remote origin exists...");
  let repoExists = false;
  try {
    execSync("git remote get-url origin", { stdio: "ignore" });
    console.log("✅ Remote origin already exists.");
    repoExists = true;
  } catch {
    console.log("🔗 Enter your repository URL:");
    const repoUrl = require("readline-sync").question("> ");
    execSync(`git remote add origin ${repoUrl}`, { stdio: "inherit" });
    repoExists = true;
  }

  console.log("📄 Creating an initial commit...");
  execSync("echo '# Git Setup CEIE' > README.md", { stdio: "inherit" });
  execSync("git add README.md", { stdio: "inherit" });
  try {
    // Use double quotes for Windows compatibility
    execSync('git commit -m "Initial commit"', { stdio: "inherit" });
    console.log("✅ Initial commit created.");
  } catch {
    console.log("⚠ Initial commit already exists, skipping...");
  }

  console.log("✅ Creating and switching branches...");
  const branches = ["main", "controlled-environment", "isolated-environment"];

  // Ensure main branch is created first
  execSync("git checkout -B main", { stdio: "inherit" });
  // Create the other branches
  branches.slice(1).forEach((branch) => {
    try {
      execSync(`git checkout -B ${branch}`, { stdio: "inherit" });
    } catch {
      console.log(`⚠ Branch '${branch}' already exists, skipping...`);
    }
  });

  console.log("🔀 Switching back to 'main' branch...");
  execSync("git checkout main", { stdio: "inherit" });

  if (repoExists) {
    console.log("📤 Pushing branches to GitHub...");
    branches.forEach((branch) => {
      try {
        execSync(`git push -u origin ${branch}`, { stdio: "inherit" });
      } catch {
        console.log(`⚠ Failed to push '${branch}' branch. Make sure the repository is accessible.`);
      }
    });
  } else {
    console.log("⚠ Skipping push to GitHub because no remote repository was added.");
  }

  console.log("🎉 Git repository is fully set up and pushed to GitHub!");
} catch (error) {
  console.error("❌ Error setting up Git:", error.message);
}
