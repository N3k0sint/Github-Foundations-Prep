// GitHub Foundations (GH-900) Comprehensive Question Bank
// Sources: Microsoft Learn GH-900, Official Microsoft Practice Assessment, GitHub Docs, DataCamp Curriculum

export const DOMAINS = {
  DOMAIN_1: "Domain 1: Understand Git & GitHub Basics (25-30%)",
  DOMAIN_2: "Domain 2: Work with GitHub Repositories (10-15%)",
  DOMAIN_3: "Domain 3: Collaboration & Project Management (15-20%)",
  DOMAIN_4: "Domain 4: Security, Privacy & Compliance (15-20%)",
  DOMAIN_5: "Domain 5: GitHub Actions & Automation (10-15%)",
  DOMAIN_6: "Domain 6: Modern GitHub Features (Copilot, Codespaces, CLI) (10-15%)"
};

export const QUESTION_BANK = [
  // ==========================================
  // DOMAIN 1: GIT & GITHUB BASICS
  // ==========================================
  {
    id: 1,
    domain: DOMAINS.DOMAIN_1,
    type: "single",
    question: "What is the primary difference between Git and GitHub?",
    options: [
      "Git is a cloud-based hosting platform, while GitHub is a command-line version control system.",
      "Git is a distributed version control tool installed locally, while GitHub is a cloud-based hosting service and collaboration platform built around Git.",
      "Git only works with open-source software, whereas GitHub is exclusively for private enterprise code.",
      "Git was developed by Microsoft, while GitHub was developed by Linus Torvalds."
    ],
    correctAnswer: [1],
    explanation: "Git is an open-source distributed version control system created by Linus Torvalds that runs locally on your machine. GitHub is a cloud-hosted platform that provides hosting for Git repositories alongside collaboration features such as issues, pull requests, and CI/CD.",
    source: "Microsoft Learn & DataCamp"
  },
  {
    id: 2,
    domain: DOMAINS.DOMAIN_1,
    type: "boolean",
    question: "True or False: In Git's distributed version control model, every developer has a full copy of the project history on their local machine, allowing work even without internet connectivity.",
    options: ["True", "False"],
    correctAnswer: [0],
    explanation: "True. In a distributed version control system (DVCS) like Git, each clone contains the entire commit history and repository metadata locally, enabling offline commits, branching, and history inspection.",
    source: "Microsoft Learn"
  },
  {
    id: 3,
    domain: DOMAINS.DOMAIN_1,
    type: "single",
    question: "Which of the following Git commands moves changes from the working directory into the staging area (index)?",
    options: [
      "git commit",
      "git push",
      "git add",
      "git checkout"
    ],
    correctAnswer: [2],
    explanation: "`git add` stages changes by adding modified and new files from the working directory to the index (staging area). `git commit` then records the staged snapshot into the repository history.",
    source: "DataCamp Git Basics"
  },
  {
    id: 4,
    domain: DOMAINS.DOMAIN_1,
    type: "single",
    question: "In the GitHub Flow collaboration model, what is the recommended practice when you want to start working on a new feature or bug fix?",
    options: [
      "Commit changes directly to the default `main` branch to keep history linear.",
      "Create a descriptively named branch off the default branch and make commits on that branch.",
      "Fork the repository into a separate organization and delete the original repository.",
      "Submit a pull request before creating any branches or writing code."
    ],
    correctAnswer: [1],
    explanation: "GitHub Flow is a lightweight, branch-based workflow. The core step is creating a new, descriptively named branch from `main` (e.g., `feature/login-page`), committing your work there, opening a Pull Request for discussion/review, and merging only after passing tests and review.",
    source: "GitHub Docs (GitHub Flow)"
  },
  {
    id: 5,
    domain: DOMAINS.DOMAIN_1,
    type: "boolean",
    question: "True or False: Fast-forward merging occurs when the target branch has not had any new commits added since the feature branch was created.",
    options: ["True", "False"],
    correctAnswer: [0],
    explanation: "True. When no competing commits exist on the base branch, Git simply moves the base branch pointer forward to point to the latest commit of the feature branch without creating an explicit merge commit.",
    source: "DataCamp"
  },
  {
    id: 6,
    domain: DOMAINS.DOMAIN_1,
    type: "single",
    question: "What is the primary function of the `.gitignore` file in a Git repository?",
    options: [
      "It deletes tracked files automatically from the remote GitHub server on every push.",
      "It specifies intentionally untracked files and patterns (such as build artifacts, logs, and sensitive credentials) that Git should ignore.",
      "It blocks unauthorized collaborators from pushing commits to protected branches.",
      "It encrypts secret configuration files before committing them to version control."
    ],
    correctAnswer: [1],
    explanation: "The `.gitignore` file instructs Git which files or directories (like `node_modules/`, `.env`, temporary build artifacts) should remain untracked and never prompted for staging or committing.",
    source: "Microsoft Learn Practice Assessment"
  },
  {
    id: 7,
    domain: DOMAINS.DOMAIN_1,
    type: "single",
    question: "How are individual commits uniquely identified in Git?",
    options: [
      "Sequential integers starting from 1 (1, 2, 3...)",
      "A 40-character SHA-1 (or SHA-256) cryptographic hash string",
      "The author's email address concatenated with the date and time",
      "A randomly assigned UUID generated by GitHub's cloud API"
    ],
    correctAnswer: [1],
    explanation: "Git identifies commits using cryptographic checksums (traditionally a 40-character SHA-1 hash, with newer support for SHA-256) computed from the commit contents, tree, parent commit, author, and timestamp.",
    source: "Microsoft Learn"
  },
  {
    id: 8,
    domain: DOMAINS.DOMAIN_1,
    type: "single",
    question: "Which Markdown syntax correctly formats text as a clickable hyperlink on GitHub?",
    options: [
      "[GitHub Website](https://github.com)",
      "(https://github.com)[GitHub Website]",
      "{link: https://github.com, text: 'GitHub Website'}",
      "<GitHub Website | https://github.com>"
    ],
    correctAnswer: [0],
    explanation: "In GitHub Flavored Markdown (GFM), hyperlinks are formatted with brackets around the display text followed immediately by parentheses containing the URL: `[display text](url)`.",
    source: "GitHub Docs (GFM)"
  },
  {
    id: 9,
    domain: DOMAINS.DOMAIN_1,
    type: "single",
    question: "What is the difference between an individual user account and an organization account on GitHub?",
    options: [
      "User accounts can own unlimited private repositories, while organizations are restricted to public repositories only.",
      "User accounts are intended for a single person with personal credentials, whereas organizations are shared accounts for businesses and open-source teams with granular member permissions and teams.",
      "Organizations can only be managed by automated GitHub Actions bots.",
      "User accounts require enterprise licenses, whereas organizations are always free of charge."
    ],
    correctAnswer: [1],
    explanation: "Personal accounts belong to an individual developer. Organizations allow teams to collaborate with shared repositories, centralized billing, role-based access, and nested teams.",
    source: "Microsoft Learn"
  },
  {
    id: 10,
    domain: DOMAINS.DOMAIN_1,
    type: "boolean",
    question: "True or False: GitHub Desktop and GitHub Mobile allow developers to review pull requests, triage issues, and perform Git operations without using the command line.",
    options: ["True", "False"],
    correctAnswer: [0],
    explanation: "True. GitHub Desktop provides a graphical desktop interface for Git operations (commits, branches, diffs), while GitHub Mobile enables triaging notifications, reviewing code, and commenting on the go.",
    source: "Microsoft Learn GH-900 Outline"
  },
  {
    id: 11,
    domain: DOMAINS.DOMAIN_1,
    type: "single",
    question: "Which command would you use to download a remote repository and its full commit history to your local computer for the first time?",
    options: [
      "git pull",
      "git clone",
      "git checkout",
      "git init"
    ],
    correctAnswer: [1],
    explanation: "`git clone <url>` copies an existing remote repository, sets up the default remote called `origin`, checks out the default branch, and downloads all history.",
    source: "DataCamp"
  },
  {
    id: 12,
    domain: DOMAINS.DOMAIN_1,
    type: "single",
    question: "What is the effect of running `git fetch` compared to `git pull`?",
    options: [
      "`git fetch` immediately merges changes into your active branch, while `git pull` only downloads metadata.",
      "`git fetch` downloads remote changes to your local repository without altering your working directory or merging, while `git pull` fetches and then automatically attempts to merge.",
      "`git fetch` deletes untracked local files before downloading changes.",
      "`git fetch` is deprecated and completely identical to `git push`."
    ],
    correctAnswer: [1],
    explanation: "`git pull` is effectively a combination of `git fetch` followed by `git merge FETCH_HEAD`. Fetching alone is safer because it lets you inspect remote updates before merging.",
    source: "Microsoft Learn"
  },
  {
    id: 13,
    domain: DOMAINS.DOMAIN_1,
    type: "multiple",
    question: "Which of the following are valid benefits of using a Version Control System like Git? (Select TWO)",
    options: [
      "Ability to revert files and projects back to previous working states",
      "Guarantees that your source code is completely free of software bugs",
      "Provides a complete audit trail of who made changes, when, and why",
      "Eliminates the need for writing automated unit tests"
    ],
    correctAnswer: [0, 2],
    explanation: "Version control provides historical tracking, branching, collaboration, accountability, and the ability to roll back mistakes. It does not replace testing or guarantee bug-free code.",
    source: "Microsoft Learn GH-900"
  },
  {
    id: 14,
    domain: DOMAINS.DOMAIN_1,
    type: "single",
    question: "What syntax is used in GitHub Flavored Markdown to render an interactive interactive task checkbox list?",
    options: [
      "- [ ] Incomplete task\n- [x] Completed task",
      "* ( ) Incomplete task\n* (x) Completed task",
      "#check Incomplete task\n#done Completed task",
      "<task checked=\"false\">Incomplete task</task>"
    ],
    correctAnswer: [0],
    explanation: "Task lists in GFM use `- [ ]` for an unchecked checkbox and `- [x]` for a checked item.",
    source: "GitHub Docs (GFM)"
  },
  {
    id: 15,
    domain: DOMAINS.DOMAIN_1,
    type: "boolean",
    question: "True or False: In GitHub Enterprise Server or GitHub Enterprise Cloud, organizations can be grouped and centrally managed under an Enterprise Account.",
    options: ["True", "False"],
    correctAnswer: [0],
    explanation: "True. An enterprise account sits above multiple organizations, providing enterprise administrators centralized billing, policy enforcement, single sign-on (SSO), and audit logs.",
    source: "Microsoft Learn (Enterprise Architecture)"
  },
  {
    id: 16,
    domain: DOMAINS.DOMAIN_1,
    type: "single",
    question: "What is the recommended command in modern Git to switch to a new branch and create it simultaneously?",
    options: [
      "git branch -m new-branch",
      "git switch -c new-branch",
      "git commit -b new-branch",
      "git merge --new new-branch"
    ],
    correctAnswer: [1],
    explanation: "`git switch -c <branch-name>` (or `git checkout -b <branch-name>`) creates and switches to the new branch in a single command.",
    source: "DataCamp & Microsoft Learn"
  },
  {
    id: 17,
    domain: DOMAINS.DOMAIN_1,
    type: "boolean",
    question: "True or False: The `git status` command will show untracked files, modified tracked files, and files currently staged in the index ready for commit.",
    options: ["True", "False"],
    correctAnswer: [0],
    explanation: "True. `git status` displays the state of the working directory and the staging area.",
    source: "DataCamp"
  },
  {
    id: 18,
    domain: DOMAINS.DOMAIN_1,
    type: "single",
    question: "What is InnerSource?",
    options: [
      "Publishing proprietary software publicly to GitHub without a software license.",
      "Applying open-source development methodologies, collaboration, and transparency within an organization's private corporate boundary.",
      "Hosting your own internal Git server using open-source hardware.",
      "An automated GitHub tool that removes sensitive API keys from public repositories."
    ],
    correctAnswer: [1],
    explanation: "InnerSource is the practice of adopting open-source best practices (such as public discussions, open PRs, peer review, and cross-team contributions) inside an enterprise's private firewalls.",
    source: "Official Microsoft Practice Assessment"
  },

  // ==========================================
  // DOMAIN 2: WORK WITH GITHUB REPOSITORIES
  // ==========================================
  {
    id: 19,
    domain: DOMAINS.DOMAIN_2,
    type: "single",
    question: "Which file in a repository root or `.github/` directory is automatically used by GitHub to determine who should be automatically requested for review when pull requests touch specific files or paths?",
    options: [
      "CONTRIBUTING.md",
      "CODEOWNERS",
      "MAINTAINERS.txt",
      "SECURITY.md"
    ],
    correctAnswer: [1],
    explanation: "The `CODEOWNERS` file defines individuals or teams responsible for code in a repository. When a PR modifies code owned by someone in `CODEOWNERS`, they are automatically added as reviewers.",
    source: "Microsoft Learn & Official Practice Assessment"
  },
  {
    id: 20,
    domain: DOMAINS.DOMAIN_2,
    type: "single",
    question: "What is the primary purpose of the `CONTRIBUTING.md` file in a GitHub repository?",
    options: [
      "It legally defines the copyright ownership and distribution license for the project.",
      "It provides guidelines, coding standards, and step-by-step instructions for contributors on how to submit issues and pull requests.",
      "It contains credentials and secret keys for deploying to production.",
      "It automatically runs CI/CD workflows when a new developer clones the repo."
    ],
    correctAnswer: [1],
    explanation: "`CONTRIBUTING.md` explains how developers can contribute to the project, covering topics like code style, issue filing, testing requirements, and PR submission rules.",
    source: "GitHub Docs"
  },
  {
    id: 21,
    domain: DOMAINS.DOMAIN_2,
    type: "single",
    question: "Where should instructions for privately reporting security vulnerabilities in a repository be documented according to GitHub standards?",
    options: [
      "In the public README.md file in large bold red text",
      "In a `SECURITY.md` file located in the root, `.github/`, or `docs/` directory",
      "In the LICENSE file under Section 4",
      "By tagging repository owners in public GitHub Discussions"
    ],
    correctAnswer: [1],
    explanation: "A `SECURITY.md` file gives users clear instructions on how to report a security vulnerability responsibly and confidentially (e.g., via private vulnerability reporting).",
    source: "Microsoft Learn & GitHub Docs"
  },
  {
    id: 22,
    domain: DOMAINS.DOMAIN_2,
    type: "boolean",
    question: "True or False: Marking a repository as a 'Template repository' allows other users to generate a brand new repository with the same directory structure and files, but starting with a single clean initial commit rather than copying the entire commit history.",
    options: ["True", "False"],
    correctAnswer: [0],
    explanation: "True. Template repositories let users scaffold new projects with a clean git history, unlike forking which preserves full parent commit history and creates an ongoing upstream link.",
    source: "Microsoft Learn & GitHub Docs"
  },
  {
    id: 23,
    domain: DOMAINS.DOMAIN_2,
    type: "single",
    question: "What is the fundamental difference between forking a repository and creating a new branch within the original repository?",
    options: [
      "A fork is a completely separate copy of the repository under your own account or organization, whereas a branch lives directly inside the existing repository.",
      "Forking requires write/admin permissions to the original repository, while branching requires no permissions.",
      "Branches are permanent and cannot be deleted, whereas forks expire after 30 days.",
      "A fork can only contain public files, while branches support private files."
    ],
    correctAnswer: [0],
    explanation: "A fork creates an independent remote copy under the user's personal account, ideal when you do not have write access to the upstream repo (common in open source). A branch is created directly inside the original repo by someone with write permissions.",
    source: "DataCamp & Microsoft Learn"
  },
  {
    id: 24,
    domain: DOMAINS.DOMAIN_2,
    type: "single",
    question: "Which feature in GitHub repository Insights allows project owners to see traffic statistics, including unique visitors, page views, and referring websites?",
    options: [
      "Dependency graph",
      "Network graph",
      "Traffic",
      "Code frequency"
    ],
    correctAnswer: [2],
    explanation: "The Traffic tab under repository Insights displays visitor numbers, page views over the last 14 days, referring sites, and popular content.",
    source: "GitHub Docs"
  },
  {
    id: 25,
    domain: DOMAINS.DOMAIN_2,
    type: "boolean",
    question: "True or False: GitHub Pages can host static HTML, CSS, and client-side JavaScript websites directly from a repository, but it does not support server-side languages like PHP, Python, or Ruby backends.",
    options: ["True", "False"],
    correctAnswer: [0],
    explanation: "True. GitHub Pages is a static site hosting service. It natively supports Jekyll and static HTML/CSS/JS assets, but does not execute server-side code like Node.js, PHP, or Python.",
    source: "Microsoft Learn Practice Assessment"
  },
  {
    id: 26,
    domain: DOMAINS.DOMAIN_2,
    type: "single",
    question: "From which of the following sources can GitHub Pages be configured to deploy your website?",
    options: [
      "Only from an external FTP server",
      "From a branch (such as `main` or `gh-pages` root or `/docs` folder) or via custom GitHub Actions workflows",
      "Directly from a zipped email attachment sent to GitHub Support",
      "From the GitHub Discussions tab"
    ],
    correctAnswer: [1],
    explanation: "GitHub Pages can be published by selecting a branch and folder (`/` or `/docs`), or by deploying via a custom GitHub Actions workflow.",
    source: "Official Microsoft Practice Assessment"
  },
  {
    id: 27,
    domain: DOMAINS.DOMAIN_2,
    type: "single",
    question: "What is a GitHub Release based on?",
    options: [
      "A Git tag that marks a specific point in the repository's commit history, accompanied by release notes and optional binary assets",
      "A temporary branch that automatically gets deleted when closed",
      "An uncommitted stash stored locally on the administrator's computer",
      "A GitHub Project milestone with 100% completion"
    ],
    correctAnswer: [0],
    explanation: "Releases are GitHub packaging constructs tied to a specific Git tag. They let maintainers publish changelogs and compiled binary release assets (e.g. .exe, .tar.gz) for users to download.",
    source: "Microsoft Learn"
  },
  {
    id: 28,
    domain: DOMAINS.DOMAIN_2,
    type: "boolean",
    question: "True or False: If a repository does not have a `LICENSE` file, the code is considered public domain and anyone can freely use, modify, and distribute it commercially.",
    options: ["True", "False"],
    correctAnswer: [1],
    explanation: "False! Without an open-source license, default copyright laws apply. The creator retains all rights to their source code, meaning nobody else may reproduce, distribute, or create derivative works from the code.",
    source: "GitHub Docs (Licensing) & Microsoft Learn"
  },

  // ==========================================
  // DOMAIN 3: COLLABORATION & PROJECT MANAGEMENT
  // ==========================================
  {
    id: 29,
    domain: DOMAINS.DOMAIN_3,
    type: "single",
    question: "How can you assign an issue to a specific GitHub user?",
    options: [
      "Edit the issue's Markdown content to mention the user's username.",
      "Use the 'Assignees' section when creating or editing the issue.",
      "Assigning issues to users is only possible for repository owners.",
      "Send a direct message to the user containing the issue details."
    ],
    correctAnswer: [1],
    explanation: "You can assign an issue to up to 10 users using the 'Assignees' sidebar dropdown in the issue view. The assigned user is notified and designated as responsible for the work.",
    source: "Official Microsoft Practice Assessment"
  },
  {
    id: 30,
    domain: DOMAINS.DOMAIN_3,
    type: "single",
    question: "How can you search for specific issues within a GitHub repository?",
    options: [
      "Use the repository's README.md file to search for issues.",
      "Search for issue titles using the global GitHub search bar or the repository's Issues search filter bar.",
      "Manually browse through each issue in the repository one by one.",
      "Open each milestone to find related issues."
    ],
    correctAnswer: [1],
    explanation: "GitHub provides search bars with qualifiers (e.g., `is:issue is:open label:bug author:octocat`) to quickly query and filter issues across the repo or globally.",
    source: "Official Microsoft Practice Assessment"
  },
  {
    id: 31,
    domain: DOMAINS.DOMAIN_3,
    type: "single",
    question: "When should a team use GitHub Discussions instead of GitHub Issues?",
    options: [
      "When they want to file a specific, actionable bug report or feature request with tasks to be done.",
      "When they want an open-ended conversational space for brainstorming, Q&A, ideas, and community conversations that are not yet actionable work items.",
      "When they need to review pull requests and suggest code edits.",
      "Discussions have been completely replaced by GitHub Wiki and should not be used."
    ],
    correctAnswer: [1],
    explanation: "Issues are for actionable, trackable work (bugs, tasks, user stories). Discussions are for collaborative conversation, polling, brainstorming, and community Q&A.",
    source: "Microsoft Learn & GitHub Docs"
  },
  {
    id: 32,
    domain: DOMAINS.DOMAIN_3,
    type: "single",
    question: "Which keyword used in a Pull Request description will automatically close issue #42 when the pull request is merged into the default branch?",
    options: [
      "Closes #42",
      "LinkTo #42",
      "Mention #42",
      "Review #42"
    ],
    correctAnswer: [0],
    explanation: "GitHub recognizes linking keywords such as `close`, `closes`, `closed`, `fix`, `fixes`, `fixed`, `resolve`, `resolves`, and `resolved`. When the PR is merged into default branch, the referenced issue closes automatically.",
    source: "Microsoft Learn & DataCamp"
  },
  {
    id: 33,
    domain: DOMAINS.DOMAIN_3,
    type: "boolean",
    question: "True or False: In GitHub Projects, you can visualize and organize your items using Table views, Board (Kanban) views, and Roadmap (Gantt-style timeline) views.",
    options: ["True", "False"],
    correctAnswer: [0],
    explanation: "True. GitHub Projects (built on the modern Projects experience) allows users to switch between Table, Board, and Roadmap views to organize issues and PRs.",
    source: "Official Microsoft Practice Assessment"
  },
  {
    id: 34,
    domain: DOMAINS.DOMAIN_3,
    type: "single",
    question: "What is the purpose of GitHub Milestones?",
    options: [
      "To track groups of issues and pull requests targeted for a specific release, sprint, or deadline with a progress bar indicator.",
      "To award achievement badges to top code contributors.",
      "To enforce billing quotas across organizations.",
      "To backup the repository to an external cloud provider."
    ],
    correctAnswer: [0],
    explanation: "Milestones group issues and pull requests together toward a target date, displaying completion percentage based on closed versus open items.",
    source: "Microsoft Learn GH-900"
  },
  {
    id: 35,
    domain: DOMAINS.DOMAIN_3,
    type: "single",
    question: "In an organization, what happens to repository permissions when a nested child team is added under a parent team?",
    options: [
      "Child teams automatically inherit the access permissions granted to their parent team.",
      "Child team members lose all repository access until granted by an enterprise admin.",
      "Parent teams lose permissions whenever child teams are modified.",
      "Inheritance is not supported; all teams must be completely isolated."
    ],
    correctAnswer: [0],
    explanation: "In GitHub Organizations, nested teams inherit permissions from parent teams. If a parent team has 'Write' access to a repository, child teams also inherit 'Write' access.",
    source: "Official Microsoft Practice Assessment & Docs"
  },
  {
    id: 36,
    domain: DOMAINS.DOMAIN_3,
    type: "multiple",
    question: "Which of the following actions can a reviewer perform during a Pull Request code review on GitHub? (Select THREE)",
    options: [
      "Comment on specific lines of code and suggest multi-line replacements",
      "Approve the pull request",
      "Request changes, blocking merge if required reviews are configured",
      "Permanently delete the repository without administrator permission"
    ],
    correctAnswer: [0, 1, 2],
    explanation: "Reviewers can submit comments, approve the changes, or request changes. They cannot delete the repository during a review.",
    source: "Microsoft Learn & DataCamp"
  },
  {
    id: 37,
    domain: DOMAINS.DOMAIN_3,
    type: "boolean",
    question: "True or False: Mentioning `@username` or `@org/team-name` in an issue, PR, or comment sends a notification to that user or team members and subscribes them to future updates.",
    options: ["True", "False"],
    correctAnswer: [0],
    explanation: "True. @mentions alert the referenced users and automatically subscribe them to updates on that thread unless they manually unsubscribe.",
    source: "GitHub Docs"
  },
  {
    id: 38,
    domain: DOMAINS.DOMAIN_3,
    type: "single",
    question: "What is an Issue Template used for in GitHub?",
    options: [
      "To standardize the information contributors provide when creating bug reports or feature requests, ensuring required details are gathered.",
      "To automatically answer user questions using generative AI.",
      "To prevent non-members from reading existing issues.",
      "To compile the source code whenever an issue is saved."
    ],
    correctAnswer: [0],
    explanation: "Issue templates (configured in `.github/ISSUE_TEMPLATE/`) provide predefined forms and markdown prompts so contributors include reproduction steps, environment details, and logs.",
    source: "Microsoft Learn"
  },

  // ==========================================
  // DOMAIN 4: SECURITY, PRIVACY & COMPLIANCE
  // ==========================================
  {
    id: 39,
    domain: DOMAINS.DOMAIN_4,
    type: "single",
    question: "Which GitHub security feature detects and alerts maintainers when a repository depends on an open-source package with a known vulnerability registered in the GitHub Advisory Database?",
    options: [
      "Dependabot alerts",
      "Secret scanning",
      "CodeQL code scanning",
      "GitHub Copilot security scan"
    ],
    correctAnswer: [0],
    explanation: "Dependabot alerts notify repository owners about vulnerable dependencies and can even automatically open pull requests (Dependabot security updates) to patch them.",
    source: "Microsoft Learn & Official Practice Assessment"
  },
  {
    id: 40,
    domain: DOMAINS.DOMAIN_4,
    type: "single",
    question: "What does GitHub Secret Scanning do?",
    options: [
      "It scans repositories for accidentally committed credentials, API tokens, and private keys, notifying the repository admin and the issuing partner provider.",
      "It hides the names of repository collaborators from search engines.",
      "It automatically decrypts encrypted files inside pull requests.",
      "It locks user accounts that have weak passwords."
    ],
    correctAnswer: [0],
    explanation: "Secret scanning searches code, commits, and issue descriptions for known token formats (e.g. AWS keys, GitHub tokens, Slack tokens) to prevent security breaches.",
    source: "GitHub Docs (Security)"
  },
  {
    id: 41,
    domain: DOMAINS.DOMAIN_4,
    type: "boolean",
    question: "True or False: Secret Scanning push protection can actively prevent developers from pushing code if a recognized secret is detected in the commit, unless bypassed with a valid reason.",
    options: ["True", "False"],
    correctAnswer: [0],
    explanation: "True. When push protection is enabled, GitHub checks commits on `git push` and blocks the push if a high-confidence secret is found.",
    source: "Microsoft Learn"
  },
  {
    id: 42,
    domain: DOMAINS.DOMAIN_4,
    type: "single",
    question: "What is CodeQL primarily used for in GitHub Advanced Security?",
    options: [
      "Semantic static code analysis (SAST) to discover security vulnerabilities and coding flaws by querying source code as if it were a database.",
      "Validating credit card numbers during checkout on GitHub Marketplace.",
      "Testing whether pull request titles follow conventional commit standards.",
      "Compressing git repositories to save storage space."
    ],
    correctAnswer: [0],
    explanation: "CodeQL is GitHub's semantic code analysis engine. It treats code as data, enabling queries that trace untrusted user input to vulnerable execution sinks (SQL injection, XSS, etc.).",
    source: "GitHub Docs (Code Scanning)"
  },
  {
    id: 43,
    domain: DOMAINS.DOMAIN_4,
    type: "single",
    question: "Which branch protection rule prevents direct commits to `main` and mandates peer verification before code can be merged?",
    options: [
      "Require pull request reviews before merging",
      "Lock branch",
      "Allow force pushes",
      "Include administrators"
    ],
    correctAnswer: [0],
    explanation: "Enabling 'Require a pull request before merging' (with a specified number of approving reviews) ensures no one pushes directly to the branch and all changes are reviewed.",
    source: "Microsoft Learn & Official Practice Assessment"
  },
  {
    id: 44,
    domain: DOMAINS.DOMAIN_4,
    type: "boolean",
    question: "True or False: Fine-grained Personal Access Tokens (PATs) provide better security than classic PATs because they can be restricted to specific repositories and granted minimal, granular permissions with mandatory expiration dates.",
    options: ["True", "False"],
    correctAnswer: [0],
    explanation: "True. Fine-grained PATs follow the principle of least privilege: you can limit them to selected repos and specific scopes (e.g., read-only issues), unlike classic tokens which grant wide account-level access.",
    source: "Microsoft Learn (Authentication)"
  },
  {
    id: 45,
    domain: DOMAINS.DOMAIN_4,
    type: "single",
    question: "What is the primary benefit of enabling Two-Factor Authentication (2FA) on GitHub accounts?",
    options: [
      "It adds a second verification factor (like a TOTP app or hardware security key) in addition to a password, making account takeover significantly harder.",
      "It speeds up git push commands by caching passwords.",
      "It grants unlimited free GitHub Actions runner minutes.",
      "It automatically signs all Git commits without needing GPG keys."
    ],
    correctAnswer: [0],
    explanation: "2FA requires both something you know (password) and something you have (authenticator app code or security key), protecting your account even if credentials are leaked.",
    source: "Official Microsoft Practice Assessment"
  },
  {
    id: 46,
    domain: DOMAINS.DOMAIN_4,
    type: "single",
    question: "In an Enterprise setting, what feature allows centralized management of user identities, provisioning, and automatic deprovisioning via an external Identity Provider (such as Microsoft Entra ID or Okta)?",
    options: [
      "Enterprise Managed Users (EMU) and SCIM provisioning",
      "GitHub Student Developer Pack",
      "Git LFS (Large File Storage)",
      "Repository star federation"
    ],
    correctAnswer: [0],
    explanation: "GitHub Enterprise Managed Users (EMU) allows enterprises to manage user accounts through their Identity Provider (IdP) via SAML SSO and SCIM, ensuring automated onboarding and offboarding.",
    source: "Official Microsoft Practice Assessment"
  },
  {
    id: 47,
    domain: DOMAINS.DOMAIN_4,
    type: "boolean",
    question: "True or False: Commit signature verification uses GPG, SSH, or S/MIME keys to verify that a commit genuinely came from the registered author and was not spoofed.",
    options: ["True", "False"],
    correctAnswer: [0],
    explanation: "True. Signed commits show a green 'Verified' badge on GitHub, confirming the authenticity and integrity of the author's identity.",
    source: "Microsoft Learn & GitHub Docs"
  },
  {
    id: 48,
    domain: DOMAINS.DOMAIN_4,
    type: "single",
    question: "Which of the following repository permission levels on GitHub allows a user to read and clone the repository, but CANNOT push commits or open pull request reviews?",
    options: [
      "Read",
      "Triage",
      "Write",
      "Maintain"
    ],
    correctAnswer: [0],
    explanation: "`Read` permission grants read-only access (cloning, viewing issues/discussions). `Triage` allows managing issues/PRs without write access to code. `Write` grants push permissions.",
    source: "GitHub Docs (Permissions)"
  },
  {
    id: 49,
    domain: DOMAINS.DOMAIN_4,
    type: "single",
    question: "What is the difference between Dependabot Alerts, Dependabot Security Updates, and Dependabot Version Updates?",
    options: [
      "Alerts notify you of vulnerabilities; Security Updates automatically open PRs to fix known vulnerabilities; Version Updates automatically keep dependencies updated to their latest releases.",
      "Alerts are for public repositories only, while Security Updates are exclusive to GitHub Enterprise Server.",
      "Version Updates scan for secret API tokens, whereas Security Updates manage branch protection.",
      "There is no difference; they are three names for the same feature."
    ],
    correctAnswer: [0],
    explanation: "Alerts detect CVEs; Security Updates open automated PRs for vulnerable dependencies; Version updates periodically bump packages according to `dependabot.yml`.",
    source: "Microsoft Learn GH-900"
  },

  // ==========================================
  // DOMAIN 5: GITHUB ACTIONS & AUTOMATION
  // ==========================================
  {
    id: 50,
    domain: DOMAINS.DOMAIN_5,
    type: "single",
    question: "Where must GitHub Actions workflow YAML files be stored in a repository?",
    options: [
      "`.github/workflows/`",
      "`.github/actions/`",
      "`workflows/`",
      "`.actions/`"
    ],
    correctAnswer: [0],
    explanation: "GitHub Actions workflow files must be placed in the `.github/workflows/` directory in the repository and have `.yml` or `.yaml` extensions.",
    source: "Official Microsoft Practice Assessment"
  },
  {
    id: 51,
    domain: DOMAINS.DOMAIN_5,
    type: "single",
    question: "Which of the following is NOT a valid GitHub Actions workflow trigger event (`on:`)?",
    options: [
      "A push to a specified branch",
      "Opening or updating a pull request",
      "A user visits a specified webpage or README on GitHub",
      "A scheduled cron trigger (`schedule:`)"
    ],
    correctAnswer: [2],
    explanation: "GitHub Actions triggers on Git events (push, pull_request), issue/PR lifecycle events, release events, schedules (`schedule`), repository dispatches, or manual triggers (`workflow_dispatch`). A user simply viewing a webpage does NOT trigger a workflow.",
    source: "Official Microsoft Practice Assessment"
  },
  {
    id: 52,
    domain: DOMAINS.DOMAIN_5,
    type: "single",
    question: "In GitHub Actions terminology, what is a 'runner'?",
    options: [
      "A software developer who creates workflows",
      "A server or virtual machine with the GitHub Actions runner application installed that executes the jobs in a workflow",
      "A command line tool used to write commit messages quickly",
      "A special branch used for continuous deployment"
    ],
    correctAnswer: [1],
    explanation: "A runner is a virtual machine or container (either GitHub-hosted like `ubuntu-latest` or self-hosted) that executes the steps of a job when triggered.",
    source: "Microsoft Learn"
  },
  {
    id: 53,
    domain: DOMAINS.DOMAIN_5,
    type: "single",
    question: "How do jobs in a GitHub Actions workflow execute by default if no `needs:` dependency is specified?",
    options: [
      "Sequentially in alphabetical order",
      "In parallel (concurrently), assuming sufficient runner capacity is available",
      "Only the first job executes; remaining jobs require manual approval",
      "In reverse order of declaration in the YAML file"
    ],
    correctAnswer: [1],
    explanation: "By default, all jobs in a workflow run in parallel. If you want job B to run only after job A completes successfully, you must specify `needs: jobA`.",
    source: "GitHub Docs (Actions)"
  },
  {
    id: 54,
    domain: DOMAINS.DOMAIN_5,
    type: "single",
    question: "Where can you securely store sensitive credentials (such as cloud deployment tokens or database passwords) for use within GitHub Actions workflows?",
    options: [
      "Hardcoded in the `.github/workflows/deploy.yml` file",
      "In GitHub encrypted Secrets (at repository, environment, or organization level)",
      "In the repository's public README.md file",
      "As comments inside the source code"
    ],
    correctAnswer: [1],
    explanation: "GitHub Secrets are encrypted environment variables stored securely in repository, environment, or org settings, accessible in workflows via `${{ secrets.MY_SECRET }}`.",
    source: "Microsoft Learn & DataCamp"
  },
  {
    id: 55,
    domain: DOMAINS.DOMAIN_5,
    type: "boolean",
    question: "True or False: Self-hosted runners offer custom hardware and network access, but hosting self-hosted runners on public repositories poses security risks from malicious pull request code.",
    options: ["True", "False"],
    correctAnswer: [0],
    explanation: "True. GitHub strongly recommends against using self-hosted runners on public repositories because forks can submit malicious PRs that execute arbitrary code on your internal infrastructure.",
    source: "GitHub Docs (Self-hosted runner security)"
  },
  {
    id: 56,
    domain: DOMAINS.DOMAIN_5,
    type: "single",
    question: "What syntax is used in GitHub Actions to manually trigger a workflow from the GitHub web UI or CLI?",
    options: [
      "on: [web_click]",
      "on: workflow_dispatch",
      "on: user_event",
      "on: manual_run"
    ],
    correctAnswer: [1],
    explanation: "`workflow_dispatch` enables a 'Run workflow' button in the GitHub Actions tab, allowing manual execution with optional custom input parameters.",
    source: "Official Microsoft Practice Assessment"
  },
  {
    id: 57,
    domain: DOMAINS.DOMAIN_5,
    type: "single",
    question: "What are GitHub Actions Artifacts?",
    options: [
      "Historical records of deleted repositories",
      "Files produced during a workflow run (such as compiled binaries, test reports, or logs) that are persisted and can be downloaded after the run finishes",
      "Old commits that have been tagged as deprecated",
      "Third-party integrations listed on GitHub Marketplace"
    ],
    correctAnswer: [1],
    explanation: "Workflow artifacts allow you to persist data after a job has completed (using `actions/upload-artifact` and `actions/download-artifact`) for sharing between jobs or downloading.",
    source: "Microsoft Learn"
  },
  {
    id: 58,
    domain: DOMAINS.DOMAIN_5,
    type: "boolean",
    question: "True or False: GitHub Marketplace allows developers to discover, share, and reuse pre-built actions created by GitHub and the broader community.",
    options: ["True", "False"],
    correctAnswer: [0],
    explanation: "True. GitHub Marketplace contains thousands of verified and community actions (like `actions/checkout` or `actions/setup-node`) that you can reference directly in your steps with `uses:`.",
    source: "Microsoft Learn"
  },

  // ==========================================
  // DOMAIN 6: MODERN GITHUB FEATURES (COPILOT, CODESPACES, CLI)
  // ==========================================
  {
    id: 59,
    domain: DOMAINS.DOMAIN_6,
    type: "single",
    question: "What is GitHub Copilot?",
    options: [
      "An AI-powered pair programmer that provides real-time code completions, explanations, and conversational assistance within compatible IDEs and on GitHub.com",
      "A hardware flight simulator joystick distributed to GitHub employees",
      "A project management tool that automatically assigns issues to developers based on seniority",
      "A backup server tool for migrating Git repos to Azure"
    ],
    correctAnswer: [0],
    explanation: "GitHub Copilot is an AI coding assistant powered by advanced language models that assists developers by auto-completing code, generating unit tests, chatting, and explaining complex logic.",
    source: "Microsoft Learn GH-900"
  },
  {
    id: 60,
    domain: DOMAINS.DOMAIN_6,
    type: "single",
    question: "What is the primary configuration file used to define the development environment, installed extensions, and container settings for GitHub Codespaces?",
    options: [
      "`.devcontainer/devcontainer.json`",
      "`.github/codespace.yml`",
      "`Dockerfile.env`",
      "`environment.config`"
    ],
    correctAnswer: [0],
    explanation: "GitHub Codespaces uses the Development Containers specification, configured via `.devcontainer/devcontainer.json` (or `.devcontainer.json`), to customize tools, runtimes, and VS Code extensions.",
    source: "Official Microsoft Practice Assessment"
  },
  {
    id: 61,
    domain: DOMAINS.DOMAIN_6,
    type: "boolean",
    question: "True or False: GitHub Codespaces is a cloud-hosted development environment running inside a Docker container that you can connect to via a web browser or a local VS Code instance.",
    options: ["True", "False"],
    correctAnswer: [0],
    explanation: "True. Codespaces provides complete cloud-powered developer workspaces accessible through the browser or desktop IDEs with dedicated compute and storage.",
    source: "Microsoft Learn"
  },
  {
    id: 62,
    domain: DOMAINS.DOMAIN_6,
    type: "single",
    question: "What is the command-line syntax for the official GitHub CLI tool?",
    options: [
      "github <command>",
      "gh <command>",
      "git hub <command>",
      "cli-github <command>"
    ],
    correctAnswer: [1],
    explanation: "The official GitHub command-line interface tool uses the executable prefix `gh` (e.g. `gh pr create`, `gh issue list`, `gh repo clone`).",
    source: "GitHub Docs (GitHub CLI)"
  },
  {
    id: 63,
    domain: DOMAINS.DOMAIN_6,
    type: "single",
    question: "Which of the following commands in the GitHub CLI creates a new Pull Request right from your terminal?",
    options: [
      "gh pr create",
      "git make-pr",
      "gh request pull",
      "gh merge new"
    ],
    correctAnswer: [0],
    explanation: "`gh pr create` opens interactive prompts to define title, body, and reviewers, or you can supply flags like `--title` and `--body`.",
    source: "GitHub CLI Docs"
  },
  {
    id: 64,
    domain: DOMAINS.DOMAIN_6,
    type: "boolean",
    question: "True or False: GitHub Copilot can generate unit tests and explain unfamiliar blocks of code when prompted in Copilot Chat.",
    options: ["True", "False"],
    correctAnswer: [0],
    explanation: "True. Copilot Chat supports slash commands like `/tests` to generate unit tests and `/explain` to clarify code structure and logic.",
    source: "Microsoft Learn GH-900"
  },
  {
    id: 65,
    domain: DOMAINS.DOMAIN_6,
    type: "single",
    question: "What happens to the cloud compute charges when a GitHub Codespace remains idle past its configured timeout period?",
    options: [
      "It automatically stops the codespace container to conserve compute resources and stop compute billing.",
      "It deletes the entire repository from GitHub.",
      "It converts the user account to a paid Enterprise plan.",
      "The codespace continues running indefinitely at maximum charges."
    ],
    correctAnswer: [0],
    explanation: "To prevent unnecessary compute consumption, Codespaces automatically stops idle instances according to the timeout configuration (default is 30 minutes).",
    source: "Microsoft Learn (Codespaces)"
  },

  // ==========================================
  // ADDITIONAL HIGH-YIELD & OFFICIAL STYLE QUESTIONS
  // ==========================================
  {
    id: 66,
    domain: DOMAINS.DOMAIN_1,
    type: "single",
    question: "Which Git command is used to record changes currently staged in the index into the local repository's permanent history?",
    options: [
      "git commit -m \"message\"",
      "git save",
      "git stage --save",
      "git upload"
    ],
    correctAnswer: [0],
    explanation: "`git commit -m <message>` creates a new commit containing the staged snapshot, along with author metadata and a descriptive message.",
    source: "DataCamp"
  },
  {
    id: 67,
    domain: DOMAINS.DOMAIN_1,
    type: "single",
    question: "What is the function of `HEAD` in Git?",
    options: [
      "A pointer referring to the currently checked out commit or branch tip in the working directory",
      "The very first commit ever made in the repository",
      "The remote URL pointing to GitHub.com",
      "The lead developer who created the repository"
    ],
    correctAnswer: [0],
    explanation: "`HEAD` is a symbolic reference in `.git/HEAD` pointing to the currently active branch or commit in your working directory.",
    source: "DataCamp & Microsoft Learn"
  },
  {
    id: 68,
    domain: DOMAINS.DOMAIN_2,
    type: "boolean",
    question: "True or False: A repository Wiki has its own independent Git repository behind the scenes that can be cloned and pushed to using standard Git commands.",
    options: ["True", "False"],
    correctAnswer: [0],
    explanation: "True. Every GitHub repository Wiki is itself a Git repository ending with `.wiki.git`, which maintainers can clone locally to edit Markdown files with their favorite local editor.",
    source: "GitHub Docs (Wikis)"
  },
  {
    id: 69,
    domain: DOMAINS.DOMAIN_2,
    type: "single",
    question: "Where can you customize the social preview image (Open Graph image) that appears when your repository link is shared on social networks or messaging apps?",
    options: [
      "In Repository Settings under the 'General' tab",
      "By adding an image named `favicon.ico` in the root",
      "In the billing tab of your personal settings",
      "Social preview images are exclusively controlled by GitHub's algorithm and cannot be customized"
    ],
    correctAnswer: [0],
    explanation: "Under Repository Settings > General, repository administrators can upload a custom Social Preview image (recommended 1280x640px).",
    source: "GitHub Docs"
  },
  {
    id: 70,
    domain: DOMAINS.DOMAIN_3,
    type: "single",
    question: "What is the primary role of a Pull Request in GitHub Flow?",
    options: [
      "To notify maintainers that a branch is ready for code review, feedback, automated testing, and eventual merging into the target branch",
      "To immediately shut down a developer's access to the codebase",
      "To convert an open-source project into a paid subscription",
      "To pull code from another developer's local hard drive directly over Bluetooth"
    ],
    correctAnswer: [0],
    explanation: "A Pull Request lets you propose changes, request peer reviews, run automated CI checks, discuss implementation details, and cleanly merge code once approved.",
    source: "Microsoft Learn"
  },
  {
    id: 71,
    domain: DOMAINS.DOMAIN_3,
    type: "boolean",
    question: "True or False: Draft Pull Requests allow you to open a pull request to get early feedback and run CI checks while signaling that the PR is still work-in-progress and not ready for final merge.",
    options: ["True", "False"],
    correctAnswer: [0],
    explanation: "True. Draft PRs cannot be merged until marked as 'Ready for review', making them ideal for work-in-progress visibility without premature merging.",
    source: "Official Microsoft Practice Assessment"
  },
  {
    id: 72,
    domain: DOMAINS.DOMAIN_3,
    type: "single",
    question: "What is a merge conflict, and when does it occur?",
    options: [
      "It occurs when two branches have modified the exact same lines of a file differently, and Git cannot automatically determine which version to keep.",
      "It occurs when a developer's GitHub password expires while committing.",
      "It occurs when a repository exceeds its file storage limit.",
      "It occurs when GitHub Actions fails due to a network timeout."
    ],
    correctAnswer: [0],
    explanation: "A merge conflict happens when competing changes are made to the same lines of a file or when one branch deleted a file that another modified. Humans must resolve the discrepancy.",
    source: "DataCamp & Microsoft Learn"
  },
  {
    id: 73,
    domain: DOMAINS.DOMAIN_4,
    type: "single",
    question: "Which file format is used by GitHub to export and display Software Bill of Materials (SBOM) information for supply chain compliance?",
    options: [
      "SPDX (Software Package Data Exchange) JSON standard",
      "Plain Microsoft Word (.docx)",
      "Adobe PDF file",
      "MP4 video summary"
    ],
    correctAnswer: [0],
    explanation: "GitHub allows exporting a repository's dependency graph as an industry-standard SPDX JSON SBOM file.",
    source: "GitHub Docs (Supply Chain)"
  },
  {
    id: 74,
    domain: DOMAINS.DOMAIN_4,
    type: "boolean",
    question: "True or False: Private Vulnerability Reporting allows security researchers to report security vulnerabilities privately and securely to repository maintainers directly on GitHub without disclosing the vulnerability publicly.",
    options: ["True", "False"],
    correctAnswer: [0],
    explanation: "True. Private vulnerability reporting provides a private channel for security researchers and repository maintainers to discuss, triage, and collaborate on security fixes before public release.",
    source: "Microsoft Learn GH-900"
  },
  {
    id: 75,
    domain: DOMAINS.DOMAIN_4,
    type: "single",
    question: "Which of the following authentication protocols is recommended for securely pushing Git commits from your local machine to GitHub without repeatedly entering credentials?",
    options: [
      "SSH Key (Ed25519 or RSA) or Personal Access Token over HTTPS with Git Credential Manager",
      "Unencrypted plaintext HTTP with standard account password",
      "Sending your password via email to support@github.com",
      "Telnet port 23"
    ],
    correctAnswer: [0],
    explanation: "GitHub deprecated password authentication for Git operations. Users must use SSH keys or Personal Access Tokens (often managed automatically via Git Credential Manager over HTTPS).",
    source: "Official Microsoft Practice Assessment"
  },
  {
    id: 76,
    domain: DOMAINS.DOMAIN_5,
    type: "single",
    question: "In a GitHub Actions workflow, what is the role of the `actions/checkout@v4` action?",
    options: [
      "It clones the repository's code onto the runner workspace so subsequent steps can build and test it.",
      "It finalizes billing charges for the user's shopping cart on GitHub Marketplace.",
      "It checks if any pull requests are waiting for code review.",
      "It deletes the runner after the job completes."
    ],
    correctAnswer: [0],
    explanation: "`actions/checkout` checks out your repository under `$GITHUB_WORKSPACE`, so your workflow can access and execute your codebase.",
    source: "DataCamp & Microsoft Learn"
  },
  {
    id: 77,
    domain: DOMAINS.DOMAIN_5,
    type: "single",
    question: "What is the function of the `strategy: matrix:` syntax in a GitHub Actions workflow?",
    options: [
      "It allows you to run a job multiple times simultaneously across different combinations of parameters (e.g., multiple OS versions and Node.js or Python runtimes).",
      "It renders 3D animations in the workflow visualization tab.",
      "It automatically encrypts secrets inside matrix data structures.",
      "It restricts workflow runs exclusively to weekend schedules."
    ],
    correctAnswer: [0],
    explanation: "Matrix builds let you test your project against multiple configurations (such as Node 18, 20, 22 on both Ubuntu and Windows) from a single job definition.",
    source: "Microsoft Learn GH-900"
  },
  {
    id: 78,
    domain: DOMAINS.DOMAIN_6,
    type: "single",
    question: "How can repository maintainers ensure that all developers opening a Codespace get consistent VS Code settings and pre-installed extensions?",
    options: [
      "By configuring the `customizations.vscode.extensions` array in `.devcontainer/devcontainer.json`",
      "By manually emailing every developer a list of extensions to install",
      "By storing compiled DLLs in the root folder",
      "Codespaces does not support pre-installed extensions"
    ],
    correctAnswer: [0],
    explanation: "Inside `.devcontainer/devcontainer.json`, the `customizations.vscode.extensions` setting specifies extension IDs that are automatically installed when the container is built.",
    source: "Official Microsoft Practice Assessment"
  },
  {
    id: 79,
    domain: DOMAINS.DOMAIN_1,
    type: "single",
    question: "What does the `git log` command display?",
    options: [
      "A chronological history of commits in the repository with commit hashes, author details, dates, and commit messages",
      "A real-time stream of server CPU and memory usage",
      "A list of all users who recently visited your GitHub profile",
      "The contents of the `.gitignore` file"
    ],
    correctAnswer: [0],
    explanation: "`git log` lists the commit history for the current branch.",
    source: "DataCamp"
  },
  {
    id: 80,
    domain: DOMAINS.DOMAIN_2,
    type: "single",
    question: "What is the purpose of pinning a repository or gist on your GitHub profile?",
    options: [
      "To showcase up to 6 of your most important or proudest projects prominently at the top of your public profile",
      "To prevent that repository from ever receiving new commits",
      "To transfer ownership of the repository to GitHub",
      "To hide the repository from public view"
    ],
    correctAnswer: [0],
    explanation: "You can pin up to 6 public repositories or gists to highlight your work to profile visitors and recruiters.",
    source: "GitHub Docs"
  },
  {
    id: 81,
    domain: DOMAINS.DOMAIN_3,
    type: "boolean",
    question: "True or False: GitHub allows creating 'Issue Forms' using YAML syntax that define structured form fields (text inputs, dropdowns, checkboxes) rather than free-form Markdown text.",
    options: ["True", "False"],
    correctAnswer: [0],
    explanation: "True. Issue forms (configured via YAML files in `.github/ISSUE_TEMPLATE/`) provide structured form fields with validation for cleaner bug reports.",
    source: "Microsoft Learn"
  },
  {
    id: 82,
    domain: DOMAINS.DOMAIN_4,
    type: "single",
    question: "What happens when you enable 'Require signed commits' in branch protection rules?",
    options: [
      "Any commit pushed to the protected branch must have a verified cryptographic signature (GPG/SSH/S/MIME), or the push will be blocked.",
      "The author must physically sign a paper document and upload a scan.",
      "All commits are automatically marked as private.",
      "Only enterprise administrators can commit."
    ],
    correctAnswer: [0],
    explanation: "Requiring signed commits ensures that all commits merged or pushed to the branch are cryptographically signed and verified.",
    source: "Official Microsoft Practice Assessment"
  },
  {
    id: 83,
    domain: DOMAINS.DOMAIN_5,
    type: "boolean",
    question: "True or False: The `GITHUB_TOKEN` secret is automatically created by GitHub for every workflow run and provides temporary permissions to authenticate against the GitHub API.",
    options: ["True", "False"],
    correctAnswer: [0],
    explanation: "True. GitHub automatically provisions a temporary `GITHUB_TOKEN` for each workflow job, with permissions that can be fine-tuned using the `permissions:` key in YAML.",
    source: "Microsoft Learn"
  },
  {
    id: 84,
    domain: DOMAINS.DOMAIN_6,
    type: "single",
    question: "Which GitHub Copilot subscription tier is designed specifically for enterprise organizations that require policy controls, IP indemnification, and SAML SSO integration?",
    options: [
      "GitHub Copilot Enterprise (and Business)",
      "GitHub Copilot Individual Free Trial",
      "GitHub Copilot Hobbyist",
      "GitHub Copilot Personal"
    ],
    correctAnswer: [0],
    explanation: "GitHub Copilot Business and GitHub Copilot Enterprise are tailored for organizations, providing centralized license management, policy enforcement, and IP indemnification.",
    source: "GitHub Docs"
  },
  {
    id: 85,
    domain: DOMAINS.DOMAIN_1,
    type: "single",
    question: "What is the purpose of the `git diff` command?",
    options: [
      "To compare and display changes between commits, commit and working tree, or between the working tree and the staging area",
      "To delete conflicting files automatically",
      "To send code to a difference-checking AI bot",
      "To install missing Git dependencies"
    ],
    correctAnswer: [0],
    explanation: "`git diff` shows the line-by-line differences between files across various states (unstaged changes, staged changes via `--staged`, or between branches).",
    source: "DataCamp"
  },
  {
    id: 86,
    domain: DOMAINS.DOMAIN_2,
    type: "boolean",
    question: "True or False: Creating a special repository named exactly after your GitHub username with a `README.md` file will display that README on your public GitHub profile.",
    options: ["True", "False"],
    correctAnswer: [0],
    explanation: "True. A public repository matching your username (e.g. `octocat/octocat`) with a root `README.md` acts as your profile README.",
    source: "Microsoft Learn & GitHub Docs"
  },
  {
    id: 87,
    domain: DOMAINS.DOMAIN_3,
    type: "single",
    question: "What is the primary difference between a repository Star and a repository Watch on GitHub?",
    options: [
      "Starring bookmarks or shows appreciation for a repository; Watching configures notifications for repository activity (e.g. releases, issues, PRs).",
      "Starring gives you write permissions, while Watching gives you read permissions.",
      "Watching costs money, while Starring is free.",
      "Starring is private to you, while Watching is broadcast to your employers."
    ],
    correctAnswer: [0],
    explanation: "Stars are bookmarks and signals of interest. Watching controls how many notifications you receive in your inbox for new activity in that repository.",
    source: "Official Microsoft Practice Assessment"
  },
  {
    id: 88,
    domain: DOMAINS.DOMAIN_4,
    type: "single",
    question: "What is a security advisory in GitHub?",
    options: [
      "A structured vulnerability notification created by maintainers under repository Security to privately collaborate on a fix and request a CVE identifier",
      "A pop-up window warning you when you type a password incorrectly",
      "A legal subpoena delivered by GitHub Compliance",
      "An automated bot that deletes unmaintained repositories"
    ],
    correctAnswer: [0],
    explanation: "Repository security advisories allow maintainers to privately discuss and fix security vulnerabilities, collaborate in a temporary private fork, and publish a CVE to the GitHub Advisory Database.",
    source: "GitHub Docs (Security Advisories)"
  },
  {
    id: 89,
    domain: DOMAINS.DOMAIN_5,
    type: "single",
    question: "Which keyword in a GitHub Actions job specifies the operating system environment for a GitHub-hosted runner?",
    options: [
      "`runs-on:` (e.g. `runs-on: ubuntu-latest`)",
      "`operating-system:`",
      "`env-os:`",
      "`machine-type:`"
    ],
    correctAnswer: [0],
    explanation: "`runs-on:` defines the runner image, such as `ubuntu-latest`, `windows-latest`, or `macos-latest`.",
    source: "DataCamp & Microsoft Learn"
  },
  {
    id: 90,
    domain: DOMAINS.DOMAIN_6,
    type: "boolean",
    question: "True or False: You can prebuild Codespaces so that developers can launch large repositories with pre-installed dependencies and pre-compiled assets in seconds instead of waiting for a cold container build.",
    options: ["True", "False"],
    correctAnswer: [0],
    explanation: "True. Codespace prebuilds automatically prepare dependencies, extensions, and build caches ahead of time, dramatically cutting startup times.",
    source: "Microsoft Learn GH-900"
  },
  {
    id: 91,
    domain: DOMAINS.DOMAIN_1,
    type: "single",
    question: "Which of the following describes a remote tracking branch in Git?",
    options: [
      "A local read-only reference to the state of a branch on a remote repository (such as `origin/main`)",
      "A branch that is physically tracked by GPS on your phone",
      "A branch that can only be accessed through GitHub Enterprise",
      "A branch that deletes itself after 24 hours"
    ],
    correctAnswer: [0],
    explanation: "Remote tracking branches (like `origin/main`) reflect the state of branches on the remote repository when you last ran `git fetch` or `git pull`.",
    source: "DataCamp"
  },
  {
    id: 92,
    domain: DOMAINS.DOMAIN_2,
    type: "single",
    question: "What is Git LFS (Large File Storage)?",
    options: [
      "A Git extension that replaces large files (audio, video, large datasets) with lightweight text pointers in Git while storing the actual file contents on a remote server",
      "A compression tool that converts images to ASCII art",
      "A cloud backup service provided exclusively to GitHub Sponsors",
      "A feature that triples the RAM of developer machines"
    ],
    correctAnswer: [0],
    explanation: "Git LFS keeps Git repositories lean and fast by substituting large binary assets with small pointer files and storing the heavy payload on a dedicated LFS server.",
    source: "GitHub Docs (Git LFS)"
  },
  {
    id: 93,
    domain: DOMAINS.DOMAIN_3,
    type: "boolean",
    question: "True or False: In a repository with branch protection, an administrator can bypass protections if the 'Do not allow bypassing the above settings' (or 'Include administrators') rule is NOT enforced.",
    options: ["True", "False"],
    correctAnswer: [0],
    explanation: "True. By default, repository administrators can bypass branch rules unless 'Do not allow bypassing' (previously 'Include administrators') is explicitly checked.",
    source: "Official Microsoft Practice Assessment"
  },
  {
    id: 94,
    domain: DOMAINS.DOMAIN_4,
    type: "single",
    question: "Which GitHub Enterprise authentication feature allows members to log in using corporate credentials while automatically synchronizing team memberships from Okta or Entra ID groups?",
    options: [
      "SAML Single Sign-On (SSO) with Team Synchronization",
      "OAuth apps with public client secrets",
      "Plain username and password login",
      "FTP basic authentication"
    ],
    correctAnswer: [0],
    explanation: "SAML SSO coupled with Team Sync allows enterprise organizations to map identity provider directory groups directly to GitHub teams for automated access management.",
    source: "Microsoft Learn (Security)"
  },
  {
    id: 95,
    domain: DOMAINS.DOMAIN_5,
    type: "single",
    question: "Which of the following represents a valid cron expression in GitHub Actions for running a workflow every weekday (Monday through Friday) at 09:00 UTC?",
    options: [
      "`- cron: '0 9 * * 1-5'`",
      "`- cron: '9 0 1-5 * *'`",
      "`- cron: 'every weekday at 9am'`",
      "`- cron: '0 9 mon-fri'`"
    ],
    correctAnswer: [0],
    explanation: "Cron format follows: `minute hour day-of-month month day-of-week`. `0 9 * * 1-5` specifies minute 0, hour 9, every day of month, every month, days 1 through 5 (Monday through Friday).",
    source: "GitHub Docs (Actions Scheduling)"
  },
  {
    id: 96,
    domain: DOMAINS.DOMAIN_6,
    type: "single",
    question: "Which of the following can GitHub Copilot Chat do inside a supported editor?",
    options: [
      "Explain selected code, suggest refactorings, write docstrings, and generate unit tests based on natural language prompts",
      "Physically recompile your CPU motherboard",
      "Automatically charge client invoices without consent",
      "Directly merge unapproved pull requests into protected production branches without review"
    ],
    correctAnswer: [0],
    explanation: "Copilot Chat is a conversational assistant that can explain code, spot bugs, propose fixes, and write documentation and tests.",
    source: "Microsoft Learn"
  },
  {
    id: 97,
    domain: DOMAINS.DOMAIN_1,
    type: "boolean",
    question: "True or False: `git reset --hard` completely discards all uncommitted changes in both the staging area and the working directory, returning files to the state of the target commit.",
    options: ["True", "False"],
    correctAnswer: [0],
    explanation: "True. `git reset --hard` is a destructive operation that wipes out uncommitted changes in both staging and the working tree.",
    source: "DataCamp"
  },
  {
    id: 98,
    domain: DOMAINS.DOMAIN_2,
    type: "single",
    question: "Which file located in `.github/` allows you to customize the default funding links (such as GitHub Sponsors, Patreon, or Open Collective) displayed in the 'Sponsor this project' button on your repository?",
    options: [
      "`FUNDING.yml`",
      "`SPONSORS.md`",
      "`DONATIONS.json`",
      "`BILLING.yml`"
    ],
    correctAnswer: [0],
    explanation: "GitHub looks for `.github/FUNDING.yml` to display a 'Sponsor' button on the repository linking to supported donation platforms.",
    source: "GitHub Docs"
  },
  {
    id: 99,
    domain: DOMAINS.DOMAIN_3,
    type: "single",
    question: "When reviewing a Pull Request, what feature allows you to suggest an exact code change that the PR author can apply directly with a single click from GitHub's web interface?",
    options: [
      "Suggested Changes (using Markdown ````suggestion ```` code blocks)",
      "Commit override button",
      "Quick fix ticket",
      "Auto-patch bot"
    ],
    correctAnswer: [0],
    explanation: "Using suggested changes in a PR review allows reviewers to propose inline diffs that authors can commit directly from the conversation tab.",
    source: "Microsoft Learn Practice Assessment"
  },
  {
    id: 100,
    domain: DOMAINS.DOMAIN_4,
    type: "boolean",
    question: "True or False: Secret scanning is available for free on all public repositories on GitHub.com.",
    options: ["True", "False"],
    correctAnswer: [0],
    explanation: "True. GitHub provides secret scanning alerts for free on all public repositories to help protect the open-source ecosystem.",
    source: "Microsoft Learn & GitHub Docs"
  },
  {
    id: 101,
    domain: DOMAINS.DOMAIN_5,
    type: "single",
    question: "What is an Environment in GitHub Actions?",
    options: [
      "A target (like `production` or `staging`) with protection rules (required reviewers, wait timers) and environment-specific secrets for safe deployment workflows",
      "The physical temperature of the GitHub server room",
      "A list of external URLs saved in user bookmarks",
      "A theme setting for the GitHub dark mode UI"
    ],
    correctAnswer: [0],
    explanation: "Environments allow you to configure deployment gates (such as requiring approval from designated people before deploying to `production`) and store environment-scoped secrets.",
    source: "Microsoft Learn GH-900"
  },
  {
    id: 102,
    domain: DOMAINS.DOMAIN_6,
    type: "single",
    question: "Which GitHub CLI command lists open issues assigned to you in the current repository?",
    options: [
      "gh issue list --assignee \"@me\"",
      "git issues --mine",
      "gh get issues --user current",
      "github list-issues -me"
    ],
    correctAnswer: [0],
    explanation: "`gh issue list --assignee \"@me\"` filters issues assigned to the currently authenticated user.",
    source: "GitHub CLI Docs"
  },
  {
    id: 103,
    domain: DOMAINS.DOMAIN_1,
    type: "boolean",
    question: "True or False: `git checkout <branch>` and `git switch <branch>` both switch the active working branch in modern versions of Git.",
    options: ["True", "False"],
    correctAnswer: [0],
    explanation: "True. `git switch` was introduced in Git 2.23 as an intuitive command dedicated specifically to switching branches, while `git checkout` remains supported for backward compatibility.",
    source: "DataCamp"
  },
  {
    id: 104,
    domain: DOMAINS.DOMAIN_2,
    type: "single",
    question: "What is the primary benefit of archiving a repository on GitHub?",
    options: [
      "It marks the repository as read-only for all users, closing all open issues/PRs and preventing new commits while preserving all code, forks, and history",
      "It deletes the repository permanently from GitHub servers after 90 days",
      "It makes the repository private and inaccessible to previous contributors",
      "It exports the repository to an external tape drive"
    ],
    correctAnswer: [0],
    explanation: "Archiving puts the repository into a frozen, read-only state. Code, history, issues, and PRs remain viewable, but no further modifications can be made.",
    source: "GitHub Docs (Archiving Repositories)"
  },
  {
    id: 105,
    domain: DOMAINS.DOMAIN_3,
    type: "single",
    question: "Which of the following roles allows a user to triage issues and manage pull requests in a repository without granting write access to the source code?",
    options: [
      "Triage",
      "Write",
      "Maintain",
      "Admin"
    ],
    correctAnswer: [0],
    explanation: "The `Triage` role is tailored for issue and PR triagers. They can label, assign, close, and reopen issues and PRs without having permission to push code to the repo.",
    source: "Microsoft Learn & GitHub Docs"
  },
  {
    id: 106,
    domain: DOMAINS.DOMAIN_4,
    type: "boolean",
    question: "True or False: Dependabot can generate automated pull requests to update dependencies even when there are no known security vulnerabilities, keeping libraries continuously up to date.",
    options: ["True", "False"],
    correctAnswer: [0],
    explanation: "True. Dependabot Version Updates (configured via `dependabot.yml`) regularly check package registries and submit PRs to upgrade dependencies to their latest versions.",
    source: "Microsoft Learn"
  },
  {
    id: 107,
    domain: DOMAINS.DOMAIN_5,
    type: "single",
    question: "In a GitHub Actions workflow YAML file, which context object provides access to information about the current workflow run, actor, repository, and ref?",
    options: [
      "`github` (e.g. `${{ github.actor }}` or `${{ github.ref }}`)",
      "`runner_info`",
      "`system_meta`",
      "`context_api`"
    ],
    correctAnswer: [0],
    explanation: "The `github` context contains information about the workflow run and the event that triggered it, such as `${{ github.repository }}`, `${{ github.sha }}`, and `${{ github.actor }}`.",
    source: "Microsoft Learn & GitHub Docs"
  },
  {
    id: 108,
    domain: DOMAINS.DOMAIN_6,
    type: "single",
    question: "How long are inactive GitHub Codespaces retained before being automatically deleted by default?",
    options: [
      "30 days (unless custom retention is configured)",
      "24 hours",
      "1 year",
      "Codespaces are never deleted unless you manually delete them"
    ],
    correctAnswer: [0],
    explanation: "By default, stopped codespaces are retained for 30 days before being automatically deleted to free up storage space.",
    source: "GitHub Docs (Codespaces lifecycle)"
  },
  {
    id: 109,
    domain: DOMAINS.DOMAIN_1,
    type: "single",
    question: "What does the command `git stash` do?",
    options: [
      "Temporarily shelves (stashes) your uncommitted working directory changes so you can work on something else, allowing you to reapply them later with `git stash pop`",
      "Permanently deletes all untracked files from disk",
      "Compresses the `.git` folder into a ZIP archive",
      "Pushes all commits directly to production without running tests"
    ],
    correctAnswer: [0],
    explanation: "`git stash` takes your uncommitted modifications (both staged and unstaged) and saves them on a temporary stack, giving you a clean working directory.",
    source: "DataCamp"
  },
  {
    id: 110,
    domain: DOMAINS.DOMAIN_2,
    type: "boolean",
    question: "True or False: You can configure GitHub to automatically delete head branches after pull requests are merged.",
    options: ["True", "False"],
    correctAnswer: [0],
    explanation: "True. Under repository Settings > General, maintainers can enable 'Automatically delete head branches' to keep the repository branch list clean.",
    source: "Microsoft Learn & GitHub Docs"
  },
  {
    id: 111,
    domain: DOMAINS.DOMAIN_3,
    type: "single",
    question: "What is a GitHub Project 'Field'?",
    options: [
      "A customizable column or attribute (such as Status, Priority, Iteration, Story Points, or Due Date) used to track metadata on project items",
      "A designated sports area at GitHub headquarters",
      "A single line of code inside a Git commit",
      "The input box where you enter credit card billing information"
    ],
    correctAnswer: [0],
    explanation: "In GitHub Projects, custom fields allow teams to assign custom metadata (like Priority, Estimate, Iteration, Single Select, Date) to issues and PRs.",
    source: "GitHub Docs (Projects)"
  },
  {
    id: 112,
    domain: DOMAINS.DOMAIN_4,
    type: "single",
    question: "Which of the following is an example of Static Application Security Testing (SAST) available natively in GitHub?",
    options: [
      "CodeQL Code Scanning",
      "GitHub Sponsors badge",
      "Markdown linter",
      "Repository star counter"
    ],
    correctAnswer: [0],
    explanation: "CodeQL performs SAST by analyzing the codebase's syntax and data flow to identify security vulnerabilities before code is deployed.",
    source: "Microsoft Learn GH-900"
  },
  {
    id: 113,
    domain: DOMAINS.DOMAIN_5,
    type: "boolean",
    question: "True or False: If a step in a GitHub Actions job fails, subsequent steps in that job will be skipped by default unless configured with conditions like `if: always()`.",
    options: ["True", "False"],
    correctAnswer: [0],
    explanation: "True. By default, if any step returns a non-zero exit code, subsequent steps are skipped. Using `if: always()` or `if: failure()` allows cleanup or notification steps to run.",
    source: "Microsoft Learn"
  },
  {
    id: 114,
    domain: DOMAINS.DOMAIN_6,
    type: "boolean",
    question: "True or False: GitHub Copilot can be configured at the organization or enterprise level to block suggestions that match public code on GitHub.",
    options: ["True", "False"],
    correctAnswer: [0],
    explanation: "True. Administrators can enable or disable the 'Suggestions matching public code (duplication detection filter)' policy to prevent Copilot from outputting verbatim public snippets.",
    source: "Microsoft Learn GH-900 & GitHub Docs"
  },
  {
    id: 115,
    domain: DOMAINS.DOMAIN_1,
    type: "single",
    question: "What is the default primary branch name created when initializing a new repository on GitHub today?",
    options: [
      "main",
      "master",
      "trunk",
      "develop"
    ],
    correctAnswer: [0],
    explanation: "GitHub standardized the default branch name to `main` for all newly created repositories across personal, organization, and enterprise accounts.",
    source: "GitHub Docs"
  }
];
