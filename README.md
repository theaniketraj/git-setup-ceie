# 🚀 Git Setup CEIE

**Git Setup CEIE** is a CLI tool that automates the creation of a structured Git repository with three branches:

1. **Main** - The primary stable branch.
2. **Controlled Environment** - A review stage before merging changes into `main`.
3. **Isolated Environment** - For offline work, pushed to GitHub but not directly merged into `main`.

This ensures a layered approach for managing code changes, especially useful for developers who work offline frequently. 🌍

---

## ✨ Features

✅ Initializes a new Git repository automatically.  
✅ Creates `main`, `controlled-environment`, and `isolated-environment` branches.  
✅ Ensures `main` exists even if Git defaults to `master`.  
✅ Skips branch creation if they already exist.  
✅ Provides structured workflow for offline development.  

---

## 📦 Installation

Install globally using npm:

```bash
npm install -g git-setup-ceie
```

---

## 🚀 Usage

Run the following command inside a project directory:

```bash
git-setup-ceie
```

### 📜 What Happens?
- Initializes Git (if not already initialized).
- Creates a `README.md` and commits it (if not already committed).
- Creates the required branches.
- Switches back to the `main` branch.

---

## 🛠 Example Output

```bash
$ git-setup-ceie
🚀 Initializing Git repository...
📄 Creating an initial commit...
✅ Creating branches...
🔀 Switching back to main branch...
🎉 Git repository is set up with Main, Controlled, and Isolated branches!
```

---

## 📖 Why Use This?

🔹 **Streamlined Branching Strategy** - Ensures changes go through proper review before reaching `main`.  
🔹 **Offline-Friendly** - Work in `Isolated Environment` and sync changes later.  
🔹 **Better Collaboration** - Use `Controlled Environment` for team review.  

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request. 🚀

---

## 📜 License

MIT License. See [LICENSE](LICENSE) for details.

---

### ⭐ If you find this tool helpful, give it a star on GitHub! ⭐

<<<<<<< HEAD
=======

>>>>>>> 3549256 (Initial commit)
