// GitHub Foundations Study Guide & Commands Reference Dataset

export const GIT_COMMANDS = [
  {
    category: "Everyday Workflow",
    command: "git status",
    syntax: "git status",
    description: "Displays the status of the working tree and staging area. Shows tracked modified files, staged files ready for commit, and untracked files.",
    example: "git status",
    examTip: "Exam tests that `git status` shows all 3 areas: untracked files, modified working tree files, and staged index files."
  },
  {
    category: "Everyday Workflow",
    command: "git add",
    syntax: "git add <file> | git add .",
    description: "Stages changes from the working directory into the index (staging area) preparing them to be committed.",
    example: "git add index.html\ngit add .",
    examTip: "Staging area is also referred to as the 'index'. Changes must be staged before committing."
  },
  {
    category: "Everyday Workflow",
    command: "git commit",
    syntax: "git commit -m \"descriptive message\"",
    description: "Captures a snapshot of the currently staged changes with a SHA-1 hash, author metadata, and a descriptive message.",
    example: "git commit -m \"fix: resolve authentication token expiry\"",
    examTip: "Commits in Git are immutable snapshots, not diff deltas. Each commit is identified by a unique 40-character SHA hash."
  },
  {
    category: "Everyday Workflow",
    command: "git diff",
    syntax: "git diff [options]",
    description: "Shows line-by-line differences. Without arguments, shows unstaged changes. With `--staged`, shows staged changes ready for commit.",
    example: "git diff          # unstaged changes vs working directory\ngit diff --staged # staged changes vs last commit",
    examTip: "`git diff --staged` (or `--cached`) shows what would go into the next commit."
  },
  {
    category: "Everyday Workflow",
    command: "git log",
    syntax: "git log [--oneline] [--graph]",
    description: "Shows the chronological commit history of the current branch.",
    example: "git log --oneline --graph --decorate",
    examTip: "`HEAD` in git log indicates the currently checked-out commit or branch tip."
  },
  {
    category: "Branching & Switching",
    command: "git switch",
    syntax: "git switch -c <new-branch> | git switch <existing>",
    description: "Modern command (Git 2.23+) dedicated specifically to switching and creating branches.",
    example: "git switch -c feature/login-page\ngit switch main",
    examTip: "`git switch -c` replaced the dual-purpose `git checkout -b` to separate branch switching from file discarding."
  },
  {
    category: "Branching & Switching",
    command: "git branch",
    syntax: "git branch [-a] [-d <name>]",
    description: "Lists, creates, or deletes branches. `-a` lists both local and remote-tracking branches.",
    example: "git branch -a\ngit branch -d feature/completed",
    examTip: "Deleting a branch with `-d` is safe; it warns if the branch has unmerged changes. Use `-D` to force delete."
  },
  {
    category: "Branching & Switching",
    command: "git merge",
    syntax: "git merge <branch-name>",
    description: "Integrates changes from another branch into your active branch.",
    example: "# While on main:\ngit merge feature/login-page",
    examTip: "Fast-forward merge happens when the target branch has no competing commits. A 3-way merge creates a merge commit."
  },
  {
    category: "Remotes & Synchronization",
    command: "git clone",
    syntax: "git clone <repository-url>",
    description: "Downloads an entire remote repository, commit history, and creates a default remote named `origin`.",
    example: "git clone https://github.com/octocat/Spoon-Knife.git",
    examTip: "`git clone` runs `git init`, adds the remote `origin`, and runs `git fetch` and `git checkout` automatically."
  },
  {
    category: "Remotes & Synchronization",
    command: "git fetch",
    syntax: "git fetch [remote]",
    description: "Downloads commits, files, and refs from a remote repository into your local repository without altering your working directory or active branch.",
    example: "git fetch origin",
    examTip: "`git fetch` is safe and does not modify your current code. `git pull` = `git fetch` + `git merge`."
  },
  {
    category: "Remotes & Synchronization",
    command: "git pull",
    syntax: "git pull [remote] [branch]",
    description: "Fetches from remote and immediately merges the changes into the current active branch.",
    example: "git pull origin main",
    examTip: "Can cause merge conflicts if remote changes conflict with local commits."
  },
  {
    category: "Remotes & Synchronization",
    command: "git push",
    syntax: "git push [-u] <remote> <branch>",
    description: "Uploads local branch commits to the remote repository. `-u` sets the upstream tracking branch.",
    example: "git push -u origin feature/login-page",
    examTip: "Protected branches on GitHub can block direct pushes if PR reviews or status checks are required."
  },
  {
    category: "Undoing & Temporary Work",
    command: "git stash",
    syntax: "git stash [push -m \"msg\"] | git stash pop",
    description: "Temporarily shelves uncommitted changes (both staged and unstaged), leaving a clean working directory. `git stash pop` reapplies them.",
    example: "git stash push -m \"wip on navbar\"\n# switch branches to fix bug, then return:\ngit stash pop",
    examTip: "Great for quick branch context-switching without making dirty dummy commits."
  },
  {
    category: "Undoing & Temporary Work",
    command: "git reset",
    syntax: "git reset [--soft | --mixed | --hard] <commit>",
    description: "Moves the current branch HEAD to a specified commit. `--soft` keeps changes staged; `--hard` wipes out changes from both index and working tree.",
    example: "git reset --soft HEAD~1  # undoes last commit, keeps changes staged\ngit reset --hard HEAD~1  # permanently discards last commit changes",
    examTip: "Exam questions often test `--hard` as a destructive operation."
  }
];

export const GITHUB_CLI_COMMANDS = [
  {
    command: "gh auth login",
    description: "Authenticates the GitHub CLI with your GitHub account using web browser or personal access token.",
    syntax: "gh auth login"
  },
  {
    command: "gh pr create",
    description: "Creates a pull request directly from terminal with interactive prompts for title, body, and reviewers.",
    syntax: "gh pr create --title \"Feature title\" --body \"Description\" --base main"
  },
  {
    command: "gh pr checkout",
    description: "Checks out a pull request locally for testing and code review.",
    syntax: "gh pr checkout <pr-number>"
  },
  {
    command: "gh issue list",
    description: "Lists issues in the repository, supporting filters like assigned to current user.",
    syntax: "gh issue list --assignee \"@me\""
  },
  {
    command: "gh issue create",
    description: "Creates a new issue in the repository.",
    syntax: "gh issue create --title \"Bug in checkout\" --body \"Steps to reproduce...\""
  },
  {
    command: "gh repo clone",
    description: "Clones a GitHub repository locally using shorthand `owner/repo` syntax.",
    syntax: "gh repo clone owner/repository"
  }
];

export const REPOSITORY_FILES = [
  {
    fileName: "README.md",
    purpose: "Primary introduction and overview of the project. Rendered on the repository homepage and public profile.",
    location: "Repository root or `.github/` or `docs/`"
  },
  {
    fileName: "LICENSE",
    purpose: "Legally specifies how others can use, modify, and distribute the project's source code. Without a license, default copyright laws apply.",
    location: "Repository root"
  },
  {
    fileName: "CONTRIBUTING.md",
    purpose: "Guidelines for open-source contributors on how to report bugs, suggest features, follow coding style, and submit pull requests.",
    location: "Repository root or `.github/` or `docs/`"
  },
  {
    fileName: "CODEOWNERS",
    purpose: "Automatically designates individuals or teams responsible for code in specific files/paths. Automatically requests reviews on PRs touching those files.",
    location: "Repository root or `.github/` or `docs/`"
  },
  {
    fileName: "SECURITY.md",
    purpose: "Instructions on how to privately and responsibly disclose security vulnerabilities without publishing them openly.",
    location: "Repository root, `.github/`, or `docs/`"
  },
  {
    fileName: ".gitignore",
    purpose: "Tells Git which files or directories (build artifacts, dependencies like `node_modules`, secret `.env` files) to ignore from version control.",
    location: "Repository root and subdirectories"
  },
  {
    fileName: ".github/workflows/*.yml",
    purpose: "Defines automated GitHub Actions CI/CD workflows, build pipelines, test suites, and deployment routines.",
    location: "`.github/workflows/` directory only"
  },
  {
    fileName: ".devcontainer/devcontainer.json",
    purpose: "Configures the cloud development container environment, tools, and VS Code extensions for GitHub Codespaces.",
    location: "`.devcontainer/devcontainer.json` or `.devcontainer.json`"
  }
];

