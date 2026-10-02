# GitHub Foundations (GH-900) Exam Simulator & Practice Platform

> **🌐 Live Demo**: [https://n3k0sint.github.io/Github-Foundations-Prep/](https://n3k0sint.github.io/Github-Foundations-Prep/)

Interactive, high-yield practice assessment simulator for the **GitHub Foundations (GH-900)** certification exam. Built based on the **Microsoft Learn GH-900 Curriculum**, **Official Microsoft Practice Assessment patterns**, **GitHub Docs**, and **DataCamp GitHub Foundations Course**.

---

## Key Features

1. **115+ High-Yield Question Bank**:
   - Covers all 6 official exam domains.
   - Includes real question patterns from the Official Microsoft Practice Assessment.
   - Question types: **Single-Choice**, **Multi-Select**, and **True / False drills**.

2. **Interactive Study Hub & Comprehensive Theory**:
   - In-depth conceptual study modules for all 6 exam domains (DVCS architecture, commit objects & HEAD, fast-forward vs 3-way merges, GitHub Flow, repository governance files, issues vs discussions, Projects, teams & InnerSource, 2FA/SAML/EMU, GHAS, Actions CI/CD, Codespaces & Copilot).
   - **Git CLI Cheatsheet**, **GitHub CLI (`gh`) Reference**, **Visual Architecture Diagrams**, **Repository Files Guide**.

3. **Interactive Terminal Lab (In-Browser Git Simulator)**:
   - 100% local simulation — zero cloud dependencies.
   - Linux commands: `ls`, `cd`, `cat`, `touch`, `nano`, `mkdir`, `rm`, `echo`, `clear`.
   - Git commands: `git init`, `add`, `commit`, `--amend`, `log`, `branch`, `switch`, `diff`, `merge`, `revert`, `stash`, `reset`, `remote`, `fetch`, `pull`, `push`.
   - Embedded `nano` editor, multi-tier hints, solution viewer, automated task grading.
   - **10 Guided Scenarios** + Open Sandbox.

4. **Multiple Practice Modes**: Full Exam (75 Qs / 120 min), Microsoft Style (50 Qs), Quick Sprint (20 Qs), True/False Drill, Domain Focus, Full Bank.

5. **Diagnostic Analytics**: Domain accuracy bars, question navigator, flagging, LocalStorage history, Dark/Light mode.

---

## 🚀 How to Run

### Option 1: Live on GitHub Pages (No setup needed!)
**[https://n3k0sint.github.io/Github-Foundations-Prep/](https://n3k0sint.github.io/Github-Foundations-Prep/)**

### Option 2: Run Locally

```bash
git clone https://github.com/N3k0sint/Github-Foundations-Prep.git
cd Github-Foundations-Prep
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 3: Open Directly
Open `index.html` in any modern browser (Chrome, Edge, Firefox, Safari). No build step required.

---

## 📂 Project Structure

```
Github-Foundations-Prep/
├── index.html              # App shell (Practice Exam, Study Hub, Terminal Lab)
├── css/
│   └── style.css           # GitHub Primer design system, dark/light theme
├── js/
│   ├── app.js              # Application state, router, exam controller
│   ├── questions.js        # 115+ questions across 6 domains
│   ├── studyData.js        # Git & GitHub CLI reference data
│   ├── theoryData.js       # Theory modules for all 6 domains
│   ├── terminalEngine.js   # In-browser virtual Linux/Git engine
│   └── labLessons.js       # Guided lab scenarios & auto-graders
├── package.json
└── README.md
```

---

## 📚 Exam Domains

| Domain | Topic | Weight |
|---|---|---|
| Domain 1 | Understand Git & GitHub Basics | 25–30% |
| Domain 2 | Work with GitHub Repositories | 10–15% |
| Domain 3 | Collaboration & Project Management | 15–20% |
| Domain 4 | Security, Privacy & Compliance | 15–20% |
| Domain 5 | GitHub Actions & Automation | 10–15% |
| Domain 6 | Modern Features (Copilot, Codespaces, CLI) | 10–15% |

---

## 👤 Author & Credits

- **Creator**: **N3k0sint**
- **Version**: v2.5.0
- **License**: MIT

---

*Built with ❤️ for developers preparing for the GitHub Foundations (GH-900) certification.*
