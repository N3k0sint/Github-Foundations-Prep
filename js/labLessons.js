// DataCamp-Style Interactive Git Lessons, Scenarios, Tasks & Auto-Graders

export const LAB_LESSONS = [
  {
    id: "lesson-1",
    title: "1. Initializing & Making Your First Commit",
    category: "Git Fundamentals",
    description: "Learn how to turn a directory into a Git repository, create a file, stage it in the index, and create your first permanent commit snapshot.",
    scenario: {
      files: {
        'README.md': '# Project Alpha\nWelcome to the application.\n',
        '.gitignore': 'node_modules/\n.env\n'
      },
      isRepo: false,
      activeBranch: 'main'
    },
    tasks: [
      { id: 1, text: "Initialize a new Git repository using `git init`." },
      { id: 2, text: "Create a new file named `app.js` using `touch app.js`." },
      { id: 3, text: "Stage the new file using `git add app.js`." },
      { id: 4, text: "Commit the staged changes with message: `feat: initial app commit`." }
    ],
    hints: [
      "Hint 1: Start by running `git init` to initialize the repository, then use `touch app.js` to create the file.",
      "Hint 2: Run `git add app.js` to move it to staging, then run `git commit -m \"feat: initial app commit\"`."
    ],
    solution: "git init\ntouch app.js\ngit add app.js\ngit commit -m \"feat: initial app commit\"",
    validate: (term) => {
      if (!term.git.isRepo) {
        return { passed: false, error: "The repository is not initialized yet. Run `git init`." };
      }
      const dir = term.getProjectDir();
      if (!dir['app.js']) {
        return { passed: false, error: "File `app.js` was not found. Use `touch app.js` to create it." };
      }
      if (term.git.commits.length === 0) {
        return { passed: false, error: "No commits recorded yet. Stage the file with `git add app.js` and commit with `git commit -m \"feat: initial app commit\"`." };
      }
      const latest = term.getLatestCommit();
      if (!latest.message.toLowerCase().includes("initial app commit")) {
        return { passed: false, error: `Commit recorded, but message was "${latest.message}". Expected message containing "feat: initial app commit".` };
      }
      return { passed: true, message: "Excellent work. You initialized a Git repo, created a file, and recorded your first commit snapshot." };
    }
  },
  {
    id: "lesson-2",
    title: "2. Inspecting Status & Staging (`git diff`)",
    category: "Everyday Workflow",
    description: "In team projects, you will constantly inspect modified files before committing. Practice checking unstaged versus staged changes with `git diff`.",
    scenario: {
      files: {
        'README.md': '# Project Alpha\nUpdated setup instructions for new team members.\n',
        'package.json': '{\n  "name": "project-alpha",\n  "version": "1.0.0"\n}\n'
      },
      commits: [
        {
          hash: 'c1a01b2',
          message: 'chore: initial project scaffold',
          tree: {
            'README.md': '# Project Alpha\nWelcome to the application.\n',
            'package.json': '{\n  "name": "project-alpha",\n  "version": "1.0.0"\n}\n'
          }
        }
      ],
      branches: { 'main': 'c1a01b2' },
      activeBranch: 'main'
    },
    tasks: [
      { id: 1, text: "Inspect repository status with `git status`." },
      { id: 2, text: "Stage the modified `README.md` using `git add README.md`." },
      { id: 3, text: "Verify staged changes using `git diff --staged`." },
      { id: 4, text: "Commit the changes with message: `docs: update setup instructions`." }
    ],
    hints: [
      "Hint 1: Run `git status` to see modified unstaged files, then `git add README.md`.",
      "Hint 2: Run `git diff --staged` to verify staged additions, then commit with `git commit -m \"docs: update setup instructions\"`."
    ],
    solution: "git status\ngit add README.md\ngit diff --staged\ngit commit -m \"docs: update setup instructions\"",
    validate: (term) => {
      const latest = term.getLatestCommit();
      if (!latest || latest.hash === 'c1a01b2') {
        return { passed: false, error: "No new commit detected. Stage `README.md` and commit your update." };
      }
      if (!latest.message.toLowerCase().includes("setup instructions")) {
        return { passed: false, error: `Commit message was "${latest.message}". Expected message containing "docs: update setup instructions".` };
      }
      return { passed: true, message: "Well done. You inspected unstaged diffs, isolated staged changes, and committed cleanly." };
    }
  },
  {
    id: "lesson-3",
    title: "3. Creating & Switching Branches (`git switch -c`)",
    category: "Branching & Merging",
    description: "Branching allows parallel development without destabilizing the production branch. Practice creating and switching to feature branches.",
    scenario: {
      files: {
        'index.html': '<!DOCTYPE html><html><body><h1>Home</h1></body></html>\n',
        'styles.css': 'body { margin: 0; font-family: sans-serif; }\n'
      },
      commits: [
        {
          hash: 'a9b8c7d',
          message: 'feat: add homepage structure',
          tree: {
            'index.html': '<!DOCTYPE html><html><body><h1>Home</h1></body></html>\n',
            'styles.css': 'body { margin: 0; font-family: sans-serif; }\n'
          }
        }
      ],
      branches: { 'main': 'a9b8c7d' },
      activeBranch: 'main'
    },
    tasks: [
      { id: 1, text: "Create and switch to a new branch named `feature-auth` using `git switch -c feature-auth`." },
      { id: 2, text: "Create a new file named `auth.js` using `touch auth.js`." },
      { id: 3, text: "Stage `auth.js` with `git add auth.js` and commit with message: `feat: implement oauth service`." },
      { id: 4, text: "List all local branches with `git branch`." }
    ],
    hints: [
      "Hint 1: Use `git switch -c feature-auth` to create and checkout the branch in one step.",
      "Hint 2: Run `touch auth.js`, then `git add auth.js` and `git commit -m \"feat: implement oauth service\"`."
    ],
    solution: "git switch -c feature-auth\ntouch auth.js\ngit add auth.js\ngit commit -m \"feat: implement oauth service\"\ngit branch",
    validate: (term) => {
      if (!term.git.branches['feature-auth']) {
        return { passed: false, error: "Branch `feature-auth` was not found. Use `git switch -c feature-auth`." };
      }
      if (term.git.head !== 'feature-auth') {
        return { passed: false, error: `Current branch is '${term.git.head}'. Switch to 'feature-auth' using 'git switch feature-auth'.` };
      }
      const dir = term.getProjectDir();
      if (!dir['auth.js']) {
        return { passed: false, error: "File `auth.js` not found. Create it with `touch auth.js`." };
      }
      const latest = term.getLatestCommit();
      if (!latest || !latest.message.toLowerCase().includes("oauth service")) {
        return { passed: false, error: "Commit with message `feat: implement oauth service` was not found on `feature-auth`." };
      }
      return { passed: true, message: "Branching objective complete. Changes are safely isolated on your feature branch." };
    }
  },
  {
    id: "lesson-4",
    title: "4. Merging Branches (`git merge`)",
    category: "Branching & Merging",
    description: "Once feature development is validated, integrate the changes back into `main` using `git merge`.",
    scenario: {
      files: {
        'index.html': '<!DOCTYPE html><html><body><h1>Home</h1></body></html>\n',
        'auth.js': '// OAuth Authentication Service\nexport function login() {}\n'
      },
      commits: [
        {
          hash: '1a2b3c4',
          message: 'feat: add homepage structure',
          tree: {
            'index.html': '<!DOCTYPE html><html><body><h1>Home</h1></body></html>\n'
          }
        },
        {
          hash: '5e6f7a8',
          message: 'feat: implement oauth service',
          tree: {
            'index.html': '<!DOCTYPE html><html><body><h1>Home</h1></body></html>\n',
            'auth.js': '// OAuth Authentication Service\nexport function login() {}\n'
          },
          parent: '1a2b3c4'
        }
      ],
      branches: {
        'main': '1a2b3c4',
        'feature-auth': '5e6f7a8'
      },
      activeBranch: 'feature-auth'
    },
    tasks: [
      { id: 1, text: "Switch back to the main branch using `git switch main`." },
      { id: 2, text: "Merge `feature-auth` into `main` using `git merge feature-auth`." },
      { id: 3, text: "Inspect the commit log with `git log --oneline` to verify the fast-forward merge." }
    ],
    hints: [
      "Hint 1: Always switch to the destination branch first (`git switch main`).",
      "Hint 2: Run `git merge feature-auth` to fast-forward main to include the feature commits."
    ],
    solution: "git switch main\ngit merge feature-auth\ngit log --oneline",
    validate: (term) => {
      if (term.git.head !== 'main') {
        return { passed: false, error: "Active branch must be `main`. Run `git switch main`." };
      }
      if (term.git.branches['main'] !== term.git.branches['feature-auth']) {
        return { passed: false, error: "`main` does not yet contain the commits from `feature-auth`. Run `git merge feature-auth`." };
      }
      return { passed: true, message: "Merge completed successfully. `main` now contains all feature commits." };
    }
  },
  {
    id: "lesson-conflict",
    title: "5. Resolving Merge Conflicts (`git merge` & conflict markers)",
    category: "Branching & Merging",
    description: "When two branches modify the same line of code, Git cannot automatically merge. Learn how to trigger a conflict, inspect markers, resolve the file using nano, and complete the merge commit.",
    scenario: {
      files: {
        'payment.js': '// Payment Gateway Configuration\nconst GATEWAY = "https://api.v1.payments.github.com";\nexport function checkout() { return GATEWAY; }\n',
        'README.md': '# Payment App\n'
      },
      commits: [
        {
          hash: 'b1c2d3e',
          message: 'feat: baseline payment service v1',
          tree: {
            'payment.js': '// Payment Gateway Configuration\nconst GATEWAY = "https://api.v1.payments.github.com";\nexport function checkout() { return GATEWAY; }\n',
            'README.md': '# Payment App\n'
          }
        },
        {
          hash: 'f4e5d6c',
          message: 'feat: update payment endpoint to v2',
          tree: {
            'payment.js': '// Payment Gateway Configuration\nconst GATEWAY = "https://api.v2.payments.github.com";\nexport function checkout() { return GATEWAY; }\n',
            'README.md': '# Payment App\n'
          },
          parent: 'b1c2d3e'
        }
      ],
      branches: {
        'main': 'b1c2d3e',
        'feature-v2': 'f4e5d6c'
      },
      activeBranch: 'main',
      conflictScenarios: {
        'feature-v2': {
          file: 'payment.js',
          conflictContent: '// Payment Gateway Configuration\n<<<<<<< HEAD\nconst GATEWAY = "https://api.v1.payments.github.com";\n=======\nconst GATEWAY = "https://api.v2.payments.github.com";\n>>>>>>> feature-v2\nexport function checkout() { return GATEWAY; }\n',
          targetBranch: 'feature-v2'
        }
      }
    },
    tasks: [
      { id: 1, text: "Attempt to merge `feature-v2` into `main` using `git merge feature-v2`." },
      { id: 2, text: "Check the unmerged conflict status using `git status`." },
      { id: 3, text: "Edit `payment.js` using `nano payment.js` to remove the conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) and keep `v2.payments.github.com`. Save & Exit." },
      { id: 4, text: "Mark resolution by staging: `git add payment.js`." },
      { id: 5, text: "Finalize the merge by committing: `git commit -m \"fix: resolve merge conflict in payment.js\"`." }
    ],
    hints: [
      "Hint 1: First run `git merge feature-v2` to trigger the conflict, then inspect with `git status`.",
      "Hint 2: Open `nano payment.js`, remove conflict markers, keep the v2 endpoint, click Save & Exit, then run `git add payment.js` and `git commit -m \"fix: resolve merge conflict in payment.js\"`."
    ],
    solution: "git merge feature-v2\ngit status\necho '// Payment Gateway Configuration\nconst GATEWAY = \"https://api.v2.payments.github.com\";\nexport function checkout() { return GATEWAY; }' > payment.js\ngit add payment.js\ngit commit -m \"fix: resolve merge conflict in payment.js\"",
    validate: (term) => {
      if (term.git.headState === 'MERGING') {
        return { passed: false, error: "Merge is still in progress with unresolved conflicts. Edit `payment.js` to remove conflict markers, stage with `git add payment.js`, and commit." };
      }
      const dir = term.getProjectDir();
      const content = dir['payment.js'] ? dir['payment.js'].content : '';
      if (content.includes('<<<<<<<') || content.includes('=======') || content.includes('>>>>>>>')) {
        return { passed: false, error: "File `payment.js` still contains conflict markers (<<<<<<<, =======, >>>>>>>). Edit and remove them." };
      }
      if (!content.includes('v2.payments.github.com')) {
        return { passed: false, error: "Expected resolved file to keep the v2 endpoint (`https://api.v2.payments.github.com`)." };
      }
      if (term.git.commits.length < 3) {
        return { passed: false, error: "Merge commit not recorded yet. Run `git commit -m \"fix: resolve merge conflict in payment.js\"`." };
      }
      return { passed: true, message: "Outstanding! You successfully triggered, diagnosed, and resolved a Git merge conflict." };
    }
  },
  {
    id: "lesson-5",
    title: "6. Editing Files & Amending Commits (`nano` & `--amend`)",
    category: "Everyday Workflow",
    description: "Learn how to edit a file using `nano` or modify content, stage the changes, and amend the previous commit without creating redundant history.",
    scenario: {
      files: {
        'config.json': '{\n  "env": "development",\n  "debug": false\n}\n',
        'server.js': 'console.log("Server starting...");\n'
      },
      commits: [
        {
          hash: '7d8e9f0',
          message: 'chore: configure server environment',
          tree: {
            'config.json': '{\n  "env": "development",\n  "debug": false\n}\n',
            'server.js': 'console.log("Server starting...");\n'
          }
        }
      ],
      branches: { 'main': '7d8e9f0' },
      activeBranch: 'main'
    },
    tasks: [
      { id: 1, text: "Edit `config.json` using `nano config.json` (or write modified settings)." },
      { id: 2, text: "Stage the updated configuration using `git add config.json`." },
      { id: 3, text: "Amend the last commit with `git commit --amend -m \"chore: configure production server settings\"`." },
      { id: 4, text: "Verify that only 1 commit exists in `git log --oneline`." }
    ],
    hints: [
      "Hint 1: You can use `nano config.json` or write directly with echo, then stage with `git add config.json`.",
      "Hint 2: Run `git commit --amend -m \"chore: configure production server settings\"` to replace the latest commit."
    ],
    solution: "echo '{\n  \"env\": \"production\",\n  \"debug\": false\n}' > config.json\ngit add config.json\ngit commit --amend -m \"chore: configure production server settings\"\ngit log --oneline",
    validate: (term) => {
      const latest = term.getLatestCommit();
      if (!latest || !latest.message.toLowerCase().includes("production server settings")) {
        return { passed: false, error: "Latest commit message does not match 'chore: configure production server settings'." };
      }
      if (term.git.commits.length > 1) {
        return { passed: false, error: `Found ${term.git.commits.length} commits. Remember to use '--amend' so a new commit is not appended.` };
      }
      return { passed: true, message: "Commit amended successfully without bloating history." };
    }
  },
  {
    id: "lesson-6",
    title: "6. Safe History Reversal with `git revert`",
    category: "Undoing & Safety",
    description: "Unlike `git reset` which rewrites history, `git revert` creates a new inverse commit that safely rolls back changes on shared team repositories.",
    scenario: {
      files: {
        'README.md': '# Project Alpha\nProduction v1.0.0\n',
        'buggy_feature.js': 'function brokenFeature() { throw new Error("Critical Crash!"); }\n'
      },
      commits: [
        {
          hash: '3a4b5c6',
          message: 'feat: stable release v1.0.0',
          tree: {
            'README.md': '# Project Alpha\nProduction v1.0.0\n'
          }
        },
        {
          hash: '9f8e7d6',
          message: 'feat: add experimental payment gateway',
          tree: {
            'README.md': '# Project Alpha\nProduction v1.0.0\n',
            'buggy_feature.js': 'function brokenFeature() { throw new Error("Critical Crash!"); }\n'
          },
          parent: '3a4b5c6'
        }
      ],
      branches: { 'main': '9f8e7d6' },
      activeBranch: 'main'
    },
    tasks: [
      { id: 1, text: "Inspect recent commits with `git log --oneline`." },
      { id: 2, text: "Revert the latest commit safely using `git revert HEAD`." },
      { id: 3, text: "Verify that a new revert commit was appended using `git log --oneline`." }
    ],
    hints: [
      "Hint 1: Inspect `git log --oneline` to note the latest commit `9f8e7d6`.",
      "Hint 2: Run `git revert HEAD` to automatically record an inverse commit."
    ],
    solution: "git log --oneline\ngit revert HEAD\ngit log --oneline",
    validate: (term) => {
      const latest = term.getLatestCommit();
      if (!latest || !latest.message.startsWith("Revert")) {
        return { passed: false, error: "Latest commit is not a revert commit. Run `git revert HEAD`." };
      }
      if (term.git.commits.length < 3) {
        return { passed: false, error: "Expected history to preserve previous commits and append a revert commit." };
      }
      return { passed: true, message: "Revert recorded cleanly. Safe for remote sharing without force pushes." };
    }
  },
  {
    id: "lesson-7",
    title: "7. Stashing In-Progress Changes (`git stash`)",
    category: "Everyday Workflow",
    description: "When an urgent bug arrives and you need to switch branches with unfinished work, use `git stash` to store changes without committing half-finished code.",
    scenario: {
      files: {
        'feature.js': '// Incomplete prototype\nfunction calculateTax() { /* WIP */ }\n'
      },
      commits: [
        {
          hash: '1f2e3d4',
          message: 'chore: baseline project',
          tree: {}
        }
      ],
      branches: { 'main': '1f2e3d4' },
      activeBranch: 'main'
    },
    tasks: [
      { id: 1, text: "Stage `feature.js` with `git add feature.js`." },
      { id: 2, text: "Save the staged changes to the stash stack using `git stash`." },
      { id: 3, text: "Verify working tree is clean with `git status`." },
      { id: 4, text: "Restore your saved work back using `git stash pop`." }
    ],
    hints: [
      "Hint 1: First add `feature.js` to staging index, then type `git stash`.",
      "Hint 2: Run `git status` to verify clean state, then restore with `git stash pop`."
    ],
    solution: "git add feature.js\ngit stash\ngit status\ngit stash pop",
    validate: (term) => {
      const staged = Object.keys(term.git.staging);
      if (!staged.includes('feature.js')) {
        return { passed: false, error: "Stashed work was not restored to staging index. Run `git stash pop`." };
      }
      return { passed: true, message: "Stash lifecycle completed. Changes saved and successfully popped." };
    }
  },
  {
    id: "lesson-8",
    title: "8. Soft Resetting Local Commits (`git reset --soft`)",
    category: "Undoing & Safety",
    description: "If you committed prematurely on a local private branch, move HEAD back 1 commit while keeping your files staged in index using `git reset --soft HEAD~1`.",
    scenario: {
      files: {
        'api.js': 'export const api = { version: "2.0" };\n'
      },
      commits: [
        {
          hash: 'a1b2c3d',
          message: 'feat: v1 api baseline',
          tree: {}
        },
        {
          hash: 'e5f6a7b',
          message: 'feat: premature v2 commit',
          tree: {
            'api.js': 'export const api = { version: "2.0" };\n'
          },
          parent: 'a1b2c3d'
        }
      ],
      branches: { 'main': 'e5f6a7b' },
      activeBranch: 'main'
    },
    tasks: [
      { id: 1, text: "Inspect commits with `git log --oneline`." },
      { id: 2, text: "Roll back HEAD by 1 commit while retaining staged changes using `git reset --soft HEAD~1`." },
      { id: 3, text: "Run `git status` to verify that `api.js` is still in the staging index." }
    ],
    hints: [
      "Hint 1: Use `git reset --soft HEAD~1` to move the branch pointer backward without losing index state.",
      "Hint 2: Verify with `git status` that changes appear under 'Changes to be committed'."
    ],
    solution: "git log --oneline\ngit reset --soft HEAD~1\ngit status",
    validate: (term) => {
      if (term.git.commits.length !== 1) {
        return { passed: false, error: "Expected 1 commit remaining in history after soft reset." };
      }
      if (!term.git.staging['api.js']) {
        return { passed: false, error: "`api.js` must remain staged in the index after a `--soft` reset." };
      }
      return { passed: true, message: "Soft reset verified. HEAD moved back while index changes were preserved." };
    }
  },
  {
    id: "lesson-9",
    title: "9. Remote Sync & Publishing (`git remote`, `git push`)",
    category: "Remotes & Sync",
    description: "Learn how to inspect configured remotes, push local commits to GitHub, fetch updates, and pull incoming changes from your team.",
    scenario: {
      files: {
        'README.md': '# Production Repo\nSynced across team members.\n'
      },
      commits: [
        {
          hash: '4d5e6f7',
          message: 'feat: add production release notes',
          tree: {
            'README.md': '# Production Repo\nSynced across team members.\n'
          }
        }
      ],
      branches: { 'main': '4d5e6f7' },
      activeBranch: 'main',
      remotes: {
        'origin': 'https://github.com/octocat/project.git'
      },
      remoteBranches: {}
    },
    tasks: [
      { id: 1, text: "Inspect remote URL configurations using `git remote -v`." },
      { id: 2, text: "Publish your branch commits to the remote using `git push origin main`." },
      { id: 3, text: "Fetch references from the remote repository with `git fetch origin`." },
      { id: 4, text: "Run `git status` to verify your branch is synchronized with `origin/main`." }
    ],
    hints: [
      "Hint 1: Run `git remote -v` to see fetch and push endpoints.",
      "Hint 2: Push with `git push origin main`, then run `git fetch origin` and `git status`."
    ],
    solution: "git remote -v\ngit push origin main\ngit fetch origin\ngit status",
    validate: (term) => {
      if (!term.git.remoteBranches['origin/main']) {
        return { passed: false, error: "Branch has not been pushed to remote. Run `git push origin main`." };
      }
      return { passed: true, message: "Remote synchronization complete. Branch tracking is established." };
    }
  },
  {
    id: "lesson-10",
    title: "10. Open Sandbox (Free Play)",
    category: "Sandbox",
    description: "An unrestricted sandbox to practice any combination of Linux commands (`ls`, `cd`, `cat`, `touch`, `nano`, `mkdir`, `rm`) and Git commands.",
    scenario: {
      files: {
        'README.md': '# Open Sandbox\nExplore Git and Linux commands freely.\n',
        'index.js': 'console.log("GitHub Foundations Lab Ready");\n',
        '.gitignore': 'node_modules/\n*.log\n'
      },
      commits: [
        {
          hash: 'e1d2c3b',
          message: 'chore: sandbox initial scaffold',
          tree: {
            'README.md': '# Open Sandbox\nExplore Git and Linux commands freely.\n',
            'index.js': 'console.log("GitHub Foundations Lab Ready");\n',
            '.gitignore': 'node_modules/\n*.log\n'
          }
        }
      ],
      branches: { 'main': 'e1d2c3b' },
      activeBranch: 'main'
    },
    tasks: [
      { id: 1, text: "Practice any Git workflows: create branches, merge, stash, revert, or amend." },
      { id: 2, text: "Inspect repository status at any time with `git status` and `git log --oneline`." }
    ],
    hints: [
      "Try `git switch -c experiment`, create a file with `touch test.js`, commit it, and merge it back to main."
    ],
    solution: "git status\ngit log --oneline",
    validate: () => {
      return { passed: true, message: "Sandbox active. Feel free to continue experimenting." };
    }
  }
];
