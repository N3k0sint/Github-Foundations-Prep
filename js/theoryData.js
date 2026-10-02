// GitHub Foundations (GH-900) Comprehensive Theory & Concept Guide
// Synthesized from Microsoft Learn GH-900, DataCamp Git/GitHub courses, and GitHub Docs

export const THEORY_MODULES = [
  {
    id: "theory-domain-1",
    domain: "Domain 1",
    title: "Git Internals, Architecture & GitHub Basics",
    summary: "Distributed version control mechanics, 3-state pipeline, commit graph, branching, fast-forward merges, and GitHub Flow.",
    sections: [
      {
        heading: "1. Centralized vs. Distributed Version Control (DVCS)",
        content: `
<p><strong>Version Control Systems (VCS)</strong> track changes to files over time so you can recall specific versions later, audit who changed what, and collaborate safely.</p>
<table class="theory-table">
  <thead>
    <tr><th>Feature</th><th>Centralized VCS (e.g. SVN)</th><th>Distributed VCS (Git)</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Repository Location</strong></td><td>Single central server only.</td><td>Every developer's machine holds a complete copy with full history.</td></tr>
    <tr><td><strong>Offline Work</strong></td><td>Cannot commit, branch, or view history offline.</td><td>Full local operations: commit, branch, diff, log with zero network.</td></tr>
    <tr><td><strong>Single Point of Failure</strong></td><td>If server dies, history is lost without backups.</td><td>Every clone serves as a full backup of the entire repository.</td></tr>
  </tbody>
</table>
<div class="theory-callout tip">
  <strong>⚠️ Must Know for GH-900:</strong> Git is <em>not</em> GitHub. Git is the open-source command-line tool created by Linus Torvalds. GitHub is the cloud-hosted platform providing remote Git hosting, collaboration tools (PRs, Issues, Projects), security scanning, and CI/CD.
</div>
        `
      },
      {
        heading: "2. The Three States of Git",
        content: `
<p>Git files reside in one of three main states, corresponding to the three trees of Git:</p>
<ol class="theory-list">
  <li><strong>Working Directory:</strong> The single checkout of one version of the project on your local filesystem. Files here are either <em>untracked</em>, <em>modified</em>, or <em>unmodified</em>.</li>
  <li><strong>Staging Area (The Index):</strong> A staging file/area that stores information about what changes will go into your next commit. Changes move here via <code>git add</code>.</li>
  <li><strong>Local Repository (<code>.git</code> folder):</strong> The permanent database where Git records committed snapshots as immutable objects identified by cryptographic SHA hashes. Changes move here via <code>git commit</code>.</li>
</ol>
<p>Once pushed via <code>git push</code>, commits are mirrored on the <strong>Remote Repository</strong> (e.g., GitHub).</p>
        `
      },
      {
        heading: "3. Commit Anatomy & The HEAD Pointer",
        content: `
<p>In Git, a commit is a complete snapshot of all files at a specific point in time (not a collection of diff deltas). Each commit contains:</p>
<ul class="theory-list">
  <li>A 40-character SHA-1 (or SHA-256) cryptographic hash string (e.g., <code>7a2f4c9...</code>).</li>
  <li>A pointer to the root tree object (the directory snapshot).</li>
  <li>Pointers to parent commit(s) (enabling historical lineage).</li>
  <li>Author & Committer metadata (Name, Email, Timestamp).</li>
  <li>The commit message describing the change.</li>
</ul>
<p><strong>What is <code>HEAD</code>?</strong> <code>HEAD</code> is a symbolic reference pointer inside <code>.git/HEAD</code> that points to the currently checked-out commit or active branch tip in your working directory.</p>
        `
      },
      {
        heading: "4. Branching & Merging Deep Dive",
        content: `
<p>A branch in Git is simply a lightweight, movable pointer to a commit. Switching branches does not copy code; it just updates the <code>HEAD</code> pointer.</p>
<table class="theory-table">
  <thead>
    <tr><th>Merge Strategy</th><th>When It Happens</th><th>Result in History</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Fast-Forward Merge</strong></td>
      <td>The target branch (e.g. <code>main</code>) has <em>no new commits</em> since the feature branch was created.</td>
      <td>Git simply moves the <code>main</code> branch pointer forward to the tip of the feature branch. <strong>No merge commit is created.</strong></td>
    </tr>
    <tr>
      <td><strong>3-Way Merge (Recursive/Ort)</strong></td>
      <td>Both <code>main</code> and the feature branch have diverged (new commits added to both).</td>
      <td>Git compares the two branch tips and their common ancestor. A new <strong>merge commit</strong> with two parent commits is created.</td>
    </tr>
  </tbody>
</table>
<div class="theory-callout warning">
  <strong>⚠️ Merge Conflicts:</strong> Occur when the same lines of a file are modified differently in both branches. Git cannot decide automatically; it pauses the merge, inserts conflict markers (<code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>, <code>=======</code>, <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code>), and requires a human to resolve, stage, and commit.
</div>
        `
      },
      {
        heading: "5. The GitHub Flow",
        content: `
<p>The standard lightweight, branch-based workflow recommended for all projects using GitHub:</p>
<ol class="theory-list">
  <li><strong>Create a branch:</strong> Descriptively named branch off <code>main</code> (e.g., <code>feature/auth</code> or <code>fix/issue-12</code>).</li>
  <li><strong>Make commits:</strong> Regular, self-contained commits with clear messages.</li>
  <li><strong>Open a Pull Request:</strong> Solicit feedback, run automated CI tests, and discuss changes.</li>
  <li><strong>Review & discuss code:</strong> Reviewers test, comment, approve, or suggest changes.</li>
  <li><strong>Deploy & test:</strong> Test the branch in a staging or preview environment.</li>
  <li><strong>Merge:</strong> Merge into <code>main</code> and delete the feature branch.</li>
</ol>
        `
      },
      {
        heading: "6. GitHub Account Types & Organizations",
        content: `
<table class="theory-table">
  <thead>
    <tr><th>Account Level</th><th>Intended For</th><th>Key Capabilities</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Personal User Account</strong></td>
      <td>One individual human.</td>
      <td>Personal repos, gists, profile README, personal access tokens.</td>
    </tr>
    <tr>
      <td><strong>Organization Account</strong></td>
      <td>Companies, teams, open-source projects.</td>
      <td>Shared repos, centralized billing, teams with inheritance, repository permission levels, SAML SSO, policy enforcement.</td>
    </tr>
    <tr>
      <td><strong>Enterprise Account</strong></td>
      <td>Large enterprises managing multiple organizations.</td>
      <td>Consolidates multiple organizations under one billing umbrella; global policy enforcement, enterprise audit log, Enterprise Managed Users (EMU).</td>
    </tr>
  </tbody>
</table>
        `
      }
    ]
  },
  {
    id: "theory-domain-2",
    domain: "Domain 2",
    title: "Working with GitHub Repositories & Health Files",
    summary: "Repository structure, governance files, licensing laws, fork vs branch, GitHub Pages, and release management.",
    sections: [
      {
        heading: "1. Essential Repository Health & Governance Files",
        content: `
<p>GitHub automatically parses standard governance files located in the repository root, <code>.github/</code>, or <code>docs/</code>:</p>
<table class="theory-table">
  <thead>
    <tr><th>File Name</th><th>Standard Location</th><th>Function & Exam Must-Know</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><code>README.md</code></td>
      <td>Root / <code>.github/</code> / <code>docs/</code></td>
      <td>Project homepage summary. Also used for user profile README when repo name matches username (e.g. <code>octocat/octocat</code>).</td>
    </tr>
    <tr>
      <td><code>LICENSE</code></td>
      <td>Repository root</td>
      <td>Legal license. <strong>Critical exam fact:</strong> Without a license, default copyright laws apply. The author retains all rights, meaning others <em>cannot</em> copy, distribute, or modify the code legally.</td>
    </tr>
    <tr>
      <td><code>CONTRIBUTING.md</code></td>
      <td>Root / <code>.github/</code> / <code>docs/</code></td>
      <td>Guidelines for external contributors: code standards, issue filing rules, testing requirements, and PR procedures.</td>
    </tr>
    <tr>
      <td><code>CODEOWNERS</code></td>
      <td>Root / <code>.github/</code> / <code>docs/</code></td>
      <td>Defines individuals or teams responsible for code in specific files/paths. Automatically requests their review when a PR touches those paths.</td>
    </tr>
    <tr>
      <td><code>SECURITY.md</code></td>
      <td>Root / <code>.github/</code> / <code>docs/</code></td>
      <td>Instructions for privately and securely reporting vulnerabilities without publicly posting them in open issues.</td>
    </tr>
    <tr>
      <td><code>.gitignore</code></td>
      <td>Root / subdirectories</td>
      <td>Patterns of untracked files (build artifacts, dependencies, secrets) that Git should ignore. Does not un-track files already committed.</td>
    </tr>
    <tr>
      <td><code>FUNDING.yml</code></td>
      <td><code>.github/</code></td>
      <td>Displays the "Sponsor this project" button linking to GitHub Sponsors, Patreon, Open Collective, etc.</td>
    </tr>
  </tbody>
</table>
        `
      },
      {
        heading: "2. Forks vs. Branches vs. Template Repositories",
        content: `
<table class="theory-table">
  <thead>
    <tr><th>Concept</th><th>What It Is</th><th>When to Use It</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Branch</strong></td>
      <td>An isolated line of development <em>inside the same repository</em>.</td>
      <td>When you have direct write permissions to the repository (standard team collaboration).</td>
    </tr>
    <tr>
      <td><strong>Fork</strong></td>
      <td>A complete, independent copy of the repository created under <em>your personal account</em>.</td>
      <td>When you do NOT have write permissions to upstream (standard for open-source contributions). Pull requests are submitted cross-repo.</td>
    </tr>
    <tr>
      <td><strong>Template Repository</strong></td>
      <td>A blueprint repo that others can generate new repositories from.</td>
      <td>Scaffolding new projects with identical files/folders, but starting with a <strong>clean, single initial commit</strong> without preserving history.</td>
    </tr>
  </tbody>
</table>
        `
      },
      {
        heading: "3. GitHub Pages Hosting Rules",
        content: `
<p>GitHub Pages is a static site hosting service designed to publish personal, organization, or project websites directly from a repository.</p>
<ul class="theory-list">
  <li><strong>Static Only:</strong> Natively supports static HTML/CSS/JavaScript and Jekyll site generation. It does <strong>NOT</strong> execute server-side code (Node.js backend, Python, PHP, Ruby, SQL databases).</li>
  <li><strong>Publishing Sources:</strong> Can publish from a branch (e.g. <code>main</code> or <code>gh-pages</code> root or <code>/docs</code> folder) or via a custom GitHub Actions workflow.</li>
  <li><strong>Custom Domains & HTTPS:</strong> Supports custom domains with automated free SSL/TLS certificates.</li>
</ul>
        `
      },
      {
        heading: "4. Git Tags vs. GitHub Releases",
        content: `
<p><strong>Git Tag:</strong> A permanent Git marker pointing to a specific commit in history. Can be lightweight (just a commit pointer) or annotated (stores tagger name, email, date, GPG signature, and message).</p>
<p><strong>GitHub Release:</strong> A GitHub packaging feature built on top of a Git tag. It adds a formatted Markdown changelog/release notes and uploaded binary/distribution assets (e.g., compiled <code>.exe</code>, <code>.apk</code>, or tarballs) for users to download.</p>
        `
      }
    ]
  },
  {
    id: "theory-domain-3",
    domain: "Domain 3",
    title: "Collaboration, Project Management & InnerSource",
    summary: "Issues, Discussions, PR code reviews, Milestones, Projects (Tables, Boards, Roadmaps), and InnerSource practices.",
    sections: [
      {
        heading: "1. GitHub Issues vs. GitHub Discussions",
        content: `
<table class="theory-table">
  <thead>
    <tr><th>Aspect</th><th>GitHub Issues</th><th>GitHub Discussions</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Purpose</strong></td><td>Tracking actionable, defined work (bug reports, tasks, feature requests).</td><td>Open-ended conversational space (Q&A, brainstorming, community ideas).</td></tr>
    <tr><td><strong>Workflow</strong></td><td>Has state (Open / Closed), assignees, milestones, labels, PR auto-closing.</td><td>Categorized threads (Announcements, Q&A with upvoting and marked answers).</td></tr>
    <tr><td><strong>Conversion</strong></td><td>Cannot convert an issue into a discussion.</td><td>Maintainers can convert a discussion into an actionable issue.</td></tr>
  </tbody>
</table>
<div class="theory-callout tip">
  <strong>Automatic Issue Closing via PRs:</strong> Using keywords like <code>closes #42</code>, <code>fixes #42</code>, or <code>resolves #42</code> in the PR description will automatically close the linked issue once the PR is merged into the default branch.
</div>
        `
      },
      {
        heading: "2. Pull Request Reviews & Suggested Changes",
        content: `
<p>When reviewing code on GitHub, reviewers can submit three types of feedback:</p>
<ul class="theory-list">
  <li><strong>Comment:</strong> General feedback without explicitly approving or blocking merge.</li>
  <li><strong>Approve:</strong> Confirms changes look good and satisfies "Required reviews" branch protection.</li>
  <li><strong>Request changes:</strong> Blocks the PR from being merged until the author addresses feedback and re-requests review.</li>
</ul>
<p><strong>Suggested Changes:</strong> Reviewers can propose exact inline diffs using Markdown suggestion syntax:</p>
<pre class="theory-code"><code>\`\`\`suggestion
const tokenTimeout = 3600;
\`\`\`</code></pre>
<p>The PR author can click "Commit suggestion" to apply it directly to the branch from the GitHub web UI.</p>
        `
      },
      {
        heading: "3. GitHub Projects (New Projects Experience)",
        content: `
<p>GitHub Projects provides an adaptable spreadsheet and kanban tool built directly into issues and PRs:</p>
<ul class="theory-list">
  <li><strong>Table View:</strong> Spreadsheet layout to sort, group, and slice data across custom fields.</li>
  <li><strong>Board View:</strong> Traditional Kanban board with columns based on status or iterations.</li>
  <li><strong>Roadmap View:</strong> Gantt-style timeline visualization based on start and target dates.</li>
  <li><strong>Custom Fields:</strong> Single-select, text, number, date, and iteration fields for sprint tracking.</li>
  <li><strong>Built-in Workflows:</strong> Automatic status updates (e.g. moving items to "Done" when an issue closes).</li>
</ul>
        `
      },
      {
        heading: "4. Teams & Permission Inheritance",
        content: `
<p>In GitHub Organizations, members are organized into <strong>Teams</strong>:</p>
<ul class="theory-list">
  <li><strong>Team Mentions:</strong> Mentioning <code>@org/team-name</code> notifies all team members.</li>
  <li><strong>Nested Teams & Inheritance:</strong> If Team A (Parent) has "Write" access to a repo, Team B (Child) nested under Team A <strong>automatically inherits "Write" access</strong>. Child permissions can be increased (e.g. Admin), but cannot be lower than parent permissions.</li>
  <li><strong>Team Sync:</strong> In Enterprise plans, organization teams can sync automatically with security groups from Identity Providers (IdPs) like Okta or Microsoft Entra ID.</li>
</ul>
        `
      },
      {
        heading: "5. What is InnerSource?",
        content: `
<p><strong>InnerSource</strong> is the practice of applying open-source culture, methodologies, and collaboration patterns <em>inside</em> an organization's proprietary, private corporate firewall.</p>
<ul class="theory-list">
  <li>Eliminates organizational silos between development teams.</li>
  <li>Allows engineers to submit PRs and contribute to other internal teams' repositories rather than waiting on backlogs.</li>
  <li>Leverages internal open documentation, peer code reviews, and transparent issue tracking.</li>
</ul>
        `
      }
    ]
  },
  {
    id: "theory-domain-4",
    domain: "Domain 4",
    title: "Security, Compliance & Enterprise Administration",
    summary: "2FA, SAML SSO, PATs, GHAS triple shield (Dependabot, Secret Scanning, CodeQL), branch protection, and EMU.",
    sections: [
      {
        heading: "1. Authentication & Enterprise Managed Users (EMU)",
        content: `
<table class="theory-table">
  <thead>
    <tr><th>Authentication Layer</th><th>Description & Exam Importance</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Two-Factor Authentication (2FA)</strong></td>
      <td>Requires password + second factor (TOTP app, SMS, hardware FIDO2 key). Organizations can mandate 2FA for all members; non-compliant users are removed.</td>
    </tr>
    <tr>
      <td><strong>SAML Single Sign-On (SSO)</strong></td>
      <td>Allows enterprise users to authenticate through their corporate Identity Provider (IdP). Members must authorize their personal accounts for SSO.</td>
    </tr>
    <tr>
      <td><strong>Enterprise Managed Users (EMU)</strong></td>
      <td>Users do <em>not</em> create standard GitHub accounts. Accounts are provisioned, owned, and deprovisioned centrally by the enterprise IdP via SCIM and SAML SSO. EMU users cannot create public repositories or collaborate outside the enterprise.</td>
    </tr>
    <tr>
      <td><strong>Personal Access Tokens (PATs)</strong></td>
      <td><strong>Classic PATs:</strong> Wide, account-level scopes.<br><strong>Fine-Grained PATs (Recommended):</strong> Least-privilege access restricted to specific repositories with granular permissions and mandatory expiration dates.</td>
    </tr>
  </tbody>
</table>
        `
      },
      {
        heading: "2. The GitHub Advanced Security (GHAS) Triple Shield",
        content: `
<table class="theory-table">
  <thead>
    <tr><th>Tool</th><th>Primary Purpose</th><th>Key Feature on Exam</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Dependabot</strong></td>
      <td>Dependency Vulnerability Management</td>
      <td>
        • <strong>Alerts:</strong> Flags vulnerable dependencies in the Advisory Database.<br>
        • <strong>Security Updates:</strong> Automatically opens PRs to patch CVEs.<br>
        • <strong>Version Updates:</strong> Periodically updates dependencies according to <code>dependabot.yml</code>.
      </td>
    </tr>
    <tr>
      <td><strong>Secret Scanning</strong></td>
      <td>Credential Leak Prevention</td>
      <td>
        • Scans commits, issues, and PRs for leaked API tokens, passwords, and private keys.<br>
        • <strong>Push Protection:</strong> Actively blocks commits containing high-confidence secrets on <code>git push</code>.<br>
        • <em>Free on all public repositories</em> on GitHub.com.
      </td>
    </tr>
    <tr>
      <td><strong>CodeQL (Code Scanning)</strong></td>
      <td>Static Application Security Testing (SAST)</td>
      <td>
        • Treats source code as a database and runs semantic queries.<br>
        • Traces untrusted data flow from tainted inputs to vulnerable sinks (e.g. SQLi, XSS).<br>
        • Integrates with pull requests to block insecure merges.
      </td>
    </tr>
  </tbody>
</table>
        `
      },
      {
        heading: "3. Branch Protection Rules & Rulesets",
        content: `
<p>Branch protection safeguards critical branches (like <code>main</code> or <code>release/*</code>):</p>
<ul class="theory-list">
  <li><strong>Require pull request reviews before merging:</strong> Disallows direct commits to <code>main</code>; mandates approved reviews.</li>
  <li><strong>Dismiss stale pull request approvals:</strong> New commits invalidate previous approvals, requiring re-review.</li>
  <li><strong>Require status checks to pass:</strong> CI workflows, unit tests, and security scans must succeed before merging.</li>
  <li><strong>Require signed commits:</strong> Blocks pushes unless commits have verified cryptographic signatures (GPG, SSH, or S/MIME).</li>
  <li><strong>Do not allow bypassing (Include administrators):</strong> Forces rules on repository owners and admins too.</li>
</ul>
        `
      },
      {
        heading: "4. Repository Permission Roles",
        content: `
<table class="theory-table">
  <thead>
    <tr><th>Role</th><th>Primary Capabilities</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Read</strong></td><td>Clone, view code, view/open issues and discussions. Cannot push code.</td></tr>
    <tr><td><strong>Triage</strong></td><td>Manage issues and pull requests (assign, label, close). Cannot push code.</td></tr>
    <tr><td><strong>Write</strong></td><td>Push commits to unprotected branches, create releases, review PRs.</td></tr>
    <tr><td><strong>Maintain</strong></td><td>Manage repository settings without sensitive access (like deleting the repo).</td></tr>
    <tr><td><strong>Admin</strong></td><td>Full access: manage access permissions, branch rules, delete repository, configure webhooks and billing.</td></tr>
  </tbody>
</table>
        `
      }
    ]
  },
  {
    id: "theory-domain-5",
    domain: "Domain 5",
    title: "GitHub Actions & CI/CD Automation",
    summary: "Workflows YAML syntax, triggers, GitHub-hosted vs self-hosted runners, jobs, steps, secrets, and artifacts.",
    sections: [
      {
        heading: "1. GitHub Actions Architecture & Terminology",
        content: `
<ol class="theory-list">
  <li><strong>Workflow:</strong> Automated procedure defined in a YAML file located strictly in <code>.github/workflows/*.yml</code>.</li>
  <li><strong>Event (Trigger):</strong> An activity that triggers a workflow (e.g. <code>push</code>, <code>pull_request</code>, <code>workflow_dispatch</code>, <code>schedule</code>).</li>
  <li><strong>Runner:</strong> The server/VM with the runner software installed that executes the jobs.</li>
  <li><strong>Job:</strong> A collection of steps that execute on the same runner. <strong>By default, jobs execute in parallel (concurrently).</strong> Use <code>needs: [job1]</code> for sequential execution.</li>
  <li><strong>Step:</strong> An individual task inside a job. Steps execute sequentially. A step runs either a shell command (<code>run:</code>) or a reusable action (<code>uses:</code>).</li>
  <li><strong>Action:</strong> A standalone reusable unit of code (e.g. <code>actions/checkout@v4</code> or <code>actions/setup-node@v4</code>) published to GitHub Marketplace.</li>
</ol>
        `
      },
      {
        heading: "2. Workflow Triggers (`on:`)",
        content: `
<table class="theory-table">
  <thead>
    <tr><th>Trigger Syntax</th><th>Trigger Condition</th></tr>
  </thead>
  <tbody>
    <tr><td><code>on: [push, pull_request]</code></td><td>Triggers whenever code is pushed or a PR is opened/synchronized.</td></tr>
    <tr><td><code>on: workflow_dispatch</code></td><td>Enables manual execution via a "Run workflow" button in the web UI or GitHub CLI.</td></tr>
    <tr><td><code>on: schedule: - cron: '0 9 * * 1-5'</code></td><td>Scheduled execution using POSIX cron syntax (minute, hour, day-of-month, month, day-of-week).</td></tr>
    <tr><td><code>on: repository_dispatch</code></td><td>Triggers via an external REST API webhook call with custom payload.</td></tr>
  </tbody>
</table>
<div class="theory-callout warning">
  <strong>⚠️ What is NOT a Trigger:</strong> A user visiting a webpage or viewing the repository README does <em>not</em> trigger GitHub Actions.
</div>
        `
      },
      {
        heading: "3. GitHub-Hosted vs. Self-Hosted Runners",
        content: `
<table class="theory-table">
  <thead>
    <tr><th>Property</th><th>GitHub-Hosted Runners</th><th>Self-Hosted Runners</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Maintenance</strong></td><td>Fully managed by GitHub with fresh VM per job.</td><td>Managed, secured, and updated by you.</td></tr>
    <tr><td><strong>OS Options</strong></td><td><code>ubuntu-latest</code>, <code>windows-latest</code>, <code>macos-latest</code>.</td><td>Any OS, hardware, GPU, or local network.</td></tr>
    <tr><td><strong>Security Risk on Public Repos</strong></td><td>Safe; isolated disposable VM destroyed after run.</td><td><strong>High Risk:</strong> Malicious PR forks can run arbitrary code on your internal private network. GitHub strongly advises against self-hosted runners on public repos.</td></tr>
  </tbody>
</table>
        `
      },
      {
        heading: "4. Secrets, Environments & Artifacts",
        content: `
<ul class="theory-list">
  <li><strong>Encrypted Secrets:</strong> Encrypted key-value pairs stored at Organization, Repository, or Environment level. Injected into workflows via <code>\${{ secrets.MY_SECRET }}</code>. Secret values are masked in build logs.</li>
  <li><strong>Environments:</strong> Deployment targets (e.g. <code>production</code>, <code>staging</code>) that support <em>deployment protection rules</em> (required manual approvers, wait timers) and environment-specific secrets.</li>
  <li><strong>Artifacts:</strong> Persistent files (compiled binaries, test reports, code coverage logs) uploaded via <code>actions/upload-artifact</code> and shared or downloaded after the run finishes.</li>
</ul>
        `
      }
    ]
  },
  {
    id: "theory-domain-6",
    domain: "Domain 6",
    title: "Modern Features: Codespaces, Copilot & GitHub CLI",
    summary: "Cloud development containers, devcontainer.json, Copilot pair programming, Copilot Chat, and GitHub CLI.",
    sections: [
      {
        heading: "1. GitHub Codespaces & devcontainer.json",
        content: `
<p><strong>GitHub Codespaces</strong> provides instant, cloud-hosted Docker container development environments accessible from the browser or local VS Code.</p>
<ul class="theory-list">
  <li><strong>Configuration:</strong> Configured via <code>.devcontainer/devcontainer.json</code> (or <code>.devcontainer.json</code>).</li>
  <li><strong>Customizations:</strong> Maintainers configure installed VS Code extensions (<code>customizations.vscode.extensions</code>), ports to forward, and pre-run setup scripts (<code>postCreateCommand</code>).</li>
  <li><strong>Codespace Prebuilds:</strong> Pre-builds containers, compiles assets, and caches package dependencies so developers launch complex workspaces in seconds instead of waiting minutes for container construction.</li>
  <li><strong>Lifecycle & Billing:</strong> Compute charges stop when idle (default idle timeout is 30 minutes). Stopped codespaces are automatically deleted after 30 days unless customized.</li>
</ul>
        `
      },
      {
        heading: "2. GitHub Copilot Architecture & Governance",
        content: `
<p><strong>GitHub Copilot</strong> is an AI-powered pair programmer trained on public code and natural language text:</p>
<ul class="theory-list">
  <li><strong>In-Editor Suggestions:</strong> Auto-completes lines and entire functions in real-time as you write code and comments.</li>
  <li><strong>Copilot Chat:</strong> Conversational assistant inside IDEs and GitHub.com supporting slash commands:
    <ul>
      <li><code>/explain</code>: Explains selected complex code or legacy functions.</li>
      <li><code>/tests</code>: Automatically generates unit tests for selected functions.</li>
      <li><code>/fix</code>: Proposes fixes for bugs or compiler warnings.</li>
    </ul>
  </li>
  <li><strong>Duplication Detection Policy:</strong> Organizations can enforce a policy that blocks suggestions that match public code on GitHub (>150 characters of verbatim match) with reference attributions.</li>
  <li><strong>Copilot Enterprise:</strong> Connects to an organization's private repositories, knowledge bases, and pull requests to give context-aware organization answers.</li>
</ul>
        `
      },
      {
        heading: "3. GitHub CLI (`gh`) & Mobile / Desktop",
        content: `
<p>The official command-line interface tool is <code>gh</code> (distinct from standard <code>git</code>):</p>
<ul class="theory-list">
  <li><code>gh pr create</code>, <code>gh pr view</code>, <code>gh pr checkout</code>: Full pull request lifecycle from the terminal.</li>
  <li><code>gh issue list --assignee "@me"</code>: Triage issues assigned to you.</li>
  <li><code>gh repo clone &lt;owner/repo&gt;</code>: Shorthand cloning without full HTTPS URLs.</li>
  <li><strong>GitHub Mobile:</strong> Mobile app for iOS/Android used for triaging inbox notifications, performing 2FA mobile approvals, reviewing PR diffs, and merging code on the go.</li>
  <li><strong>GitHub Desktop:</strong> Desktop GUI client for visualizing branches, diffs, commits, and resolving merge conflicts without CLI.</li>
</ul>
        `
      }
    ]
  }
];
