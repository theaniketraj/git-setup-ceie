<<<<<<< HEAD
# CEIE - Automated Git Repository Setup

## 🚀 Introduction
CEIE automates Git repository initialization by setting up structured branches and linking your repository to GitHub seamlessly. This tool simplifies the process, ensuring a well-defined workflow.

## 📦 Installation
To install CEIE globally, run:
```sh
npm install -g git-setup-ceie
```

Or, use it directly via `npx`:
```sh
npx git-setup-ceie
```

## ⚡ How It Works
This tool performs the following automated actions:
1. Initializes a Git repository (`git init`).
2. Checks if a remote origin exists; if not, prompts the user to enter a repository URL.
3. Creates an initial commit with a `README.md` file.
4. Sets up the following branches:
   - `main`
   - `controlled-environment`
   - `isolated-environment`
5. Pushes all branches to GitHub and sets up tracking.

## 🛠 Usage
Run the command in your project directory:
```sh
npx git-setup-ceie
```
You will be prompted to enter the repository URL if it isn't set up already.

## 📤 Example Output
```sh
🚀 Initializing Git repository...
🔍 Checking if remote origin exists...
✅ Remote origin already exists.
📄 Creating an initial commit...
✅ Initial commit created.
✅ Creating and switching branches...
🔀 Switching back to 'main' branch...
📤 Pushing branches to GitHub...
🎉 Git repository is fully set up and pushed to GitHub!
```

## 📌 Notes
- If a repository is already initialized, it won’t be reinitialized.
- If branches exist, they won’t be recreated.
- If the remote origin exists, it won’t prompt for a URL.

## 🤝 Contributing
Contributions are welcome! Feel free to submit issues or PRs.

## 📜 License
MIT License.

## 📝 Note

This project serves as the **foundation for [CEIE](https://github.com/theaniketraj/ceie)**, ensuring a streamlined and structured Git setup process. However, `git-setup-ceie` will remain **independent and fully functional**, retaining all **npm commands** indefinitely.
=======
'# Git Setup CEIE' 
>>>>>>> 740c5df (Finalize version update)
