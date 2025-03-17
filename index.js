#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const readline = require("readline-sync");
const packageJson = require("../package.json");
const args = process.argv.slice(2);
if (args.includes("--version")) {
  console.log(`CEIE ${packageJson.version}`);
  process.exit(0);
}

// Proceed with the actual setup process...

try {
  console.log("🚀 CEIE 2.0: Automating your Git repository setup...");

  // Check if .git folder exists; if not, initialize the repository
  if (!fs.existsSync(".git")) {
    console.log("🔧 Initializing Git repository...");
    execSync("git init", { stdio: "inherit" });
  } else {
    console.log("✅ Git repository already initialized.");
  }

  console.log("🔍 Checking if remote origin exists...");
  let repoExists = false;
  try {
    execSync("git remote get-url origin", { stdio: "ignore" });
    console.log("✅ Remote origin already exists.");
    repoExists = true;
  } catch {
    console.log("🔗 Enter your repository URL:");
    const repoUrl = readline.question("> ");
    execSync(`git remote add origin ${repoUrl}`, { stdio: "inherit" });
    repoExists = true;
  }

  // Determine if remote 'main' branch exists (i.e. has commits)
  let remoteMainExists = false;
  if (repoExists) {
    try {
      const remoteMain = execSync("git ls-remote origin main", {
        encoding: "utf8",
      });
      if (remoteMain && remoteMain.trim() !== "") {
        remoteMainExists = true;
        console.log(
          "✅ Remote 'main' branch exists. Skipping initial commit creation."
        );
      }
    } catch {
      remoteMainExists = false;
    }
  }

  // Create initial commit only if README.md doesn't exist and remote main doesn't exist
  if (!fs.existsSync("README.md") && !remoteMainExists) {
    console.log("📄 Creating README.md and initial commit...");
    execSync("echo '# Git Setup CEIE' > README.md", { stdio: "inherit" });
    execSync("git add README.md", { stdio: "inherit" });
    try {
      execSync('git commit -m "Initial commit"', { stdio: "inherit" });
      console.log("✅ Initial commit created.");
    } catch {
      console.log("⚠ Initial commit already exists, skipping...");
    }
  } else if (fs.existsSync("README.md")) {
    console.log(
      "✅ README.md already exists locally, skipping initial commit creation."
    );
  }

  console.log("✅ Creating and switching branches...");
  const branches = ["main", "controlled-environment", "isolated-environment"];

  // For each branch, create/reset and pull the latest changes
  branches.forEach((branch) => {
    try {
      execSync(`git checkout -B ${branch}`, { stdio: "inherit" });
      console.log(`✅ Switched to branch '${branch}'`);
      if (repoExists) {
        console.log(`🔄 Pulling latest changes for '${branch}' branch...`);
        // Attempt to rebase with remote changes; if none exist, it will continue smoothly.
        execSync(`git pull origin ${branch} --rebase`, { stdio: "inherit" });
      }
    } catch (error) {
      console.log(`⚠ Error setting up branch '${branch}': ${error.message}`);
    }
  });

  console.log("🔀 Switching back to 'main' branch...");
  execSync("git checkout main", { stdio: "inherit" });

  if (repoExists) {
    console.log("📤 Pushing branches to GitHub...");
    branches.forEach((branch) => {
      try {
        if (branch === "main") {
          // For main branch, push normally after pulling latest changes
          execSync(`git push -u origin ${branch}`, { stdio: "inherit" });
        } else {
          // For controlled and isolated branches, force push with lease to resolve non-fast-forward issues
          execSync(`git push -u origin ${branch} --force-with-lease`, {
            stdio: "inherit",
          });
        }
        console.log(`✅ Pushed '${branch}' branch successfully.`);
      } catch (error) {
        console.log(`⚠ Failed to push '${branch}' branch: ${error.message}`);
      }
    });
  } else {
    console.log(
      "⚠ Skipping push to GitHub because no remote repository was added."
    );
  }

  console.log("🎉 CEIE 2.0 setup is complete!");
} catch (error) {
  console.error("❌ Error setting up Git:", error.message);
}
