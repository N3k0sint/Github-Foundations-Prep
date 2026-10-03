// Virtual In-Browser Git & Linux Terminal Engine
// Simulates real local filesystem, full Git mechanics, merge conflicts, and remotes without external servers

export class VirtualTerminal {
  constructor() {
    this.reset();
  }

  reset() {
    this.fs = {
      '/home/user/project': {
        type: 'dir',
        children: {
          'README.md': { type: 'file', content: '# My Project\nInitial project documentation.\n' },
          '.gitignore': { type: 'file', content: 'node_modules/\n.env\n*.log\n' }
        }
      }
    };

    this.cwd = '/home/user/project';
    this.user = 'user';
    this.hostname = 'github-sandbox';

    // Git Repository State
    this.git = {
      isRepo: false,
      head: 'main', // active branch name or detached commit hash
      headState: null, // e.g. 'MERGING'
      conflict: null,  // { file, conflictContent, resolvedContent, targetBranch }
      branches: {}, // { 'main': commitHash, 'feature': commitHash }
      staging: {},  // { 'README.md': content }
      commits: [],  // [ { hash, message, author, date, tree: {}, parent } ]
      stash: [],    // [ { staging: {}, workingDiff: {}, message } ]
      remotes: {
        'origin': 'https://github.com/user/project.git'
      },
      remoteBranches: {} // { 'origin/main': commitHash }
    };

    this.conflictScenarios = {};
    this.history = [];
    this.historyIndex = -1;
  }

  // Initialize a new Git repo in cwd
  initGit() {
    if (this.git.isRepo) {
      return "Reinitialized existing Git repository in " + this.cwd + "/.git/";
    }
    this.git.isRepo = true;
    this.git.head = 'main';
    this.git.headState = null;
    this.git.conflict = null;
    this.git.branches = {};
    this.git.staging = {};
    this.git.commits = [];
    this.git.stash = [];
    this.git.remoteBranches = {};
    return "Initialized empty Git repository in " + this.cwd + "/.git/";
  }

  // Seed repository with initial commits, branch, remotes, and conflict scenarios
  seedRepo({ files = {}, commits = [], branches = {}, activeBranch = 'main', remotes = {}, remoteBranches = {}, conflictScenarios = {} }) {
    this.reset();
    this.git.isRepo = true;
    this.git.head = activeBranch;
    this.conflictScenarios = { ...conflictScenarios };

    // Seed files
    const dir = this.getProjectDir();
    Object.entries(files).forEach(([name, content]) => {
      dir[name] = { type: 'file', content };
    });

    // Seed commits
    this.git.commits = commits.map(c => ({
      hash: c.hash || Math.random().toString(16).substring(2, 9),
      message: c.message,
      author: c.author || 'Student Developer <student@github.com>',
      date: c.date || new Date().toISOString(),
      tree: c.tree || { ...files },
      parent: c.parent || null
    }));

    // Seed branches
    this.git.branches = { ...branches };
    if (!this.git.branches[activeBranch] && this.git.commits.length > 0) {
      this.git.branches[activeBranch] = this.git.commits[this.git.commits.length - 1].hash;
    }

    if (Object.keys(remotes).length > 0) {
      this.git.remotes = { ...remotes };
    }
    this.git.remoteBranches = { ...remoteBranches };
    if (!this.git.remoteBranches['origin/main'] && this.git.branches['main']) {
      this.git.remoteBranches['origin/main'] = this.git.branches['main'];
    }
  }

  getProjectDir() {
    if (!this.fs['/home/user/project']) {
      this.fs['/home/user/project'] = { type: 'dir', children: {} };
    }
    return this.fs['/home/user/project'].children;
  }

  // Returns the children object for the CURRENT working directory
  getCwdDir() {
    if (this.cwd === '/home/user/project') {
      return this.getProjectDir();
    }
    // Handle one level deep: /home/user/project/<subdir>
    const projectDir = this.getProjectDir();
    const relative = this.cwd.replace('/home/user/project/', '');
    const parts = relative.split('/').filter(Boolean);
    let node = { children: projectDir };
    for (const part of parts) {
      if (node.children && node.children[part] && node.children[part].type === 'dir') {
        node = node.children[part];
      } else {
        // Fallback to project root if path is broken
        return this.getProjectDir();
      }
    }
    return node.children || {};
  }

  getPrompt() {
    const statePart = this.git.headState ? `|${this.git.headState}` : '';
    const branchInfo = this.git.isRepo ? ` (${this.git.head}${statePart})` : '';
    const shortCwd = this.cwd.replace('/home/user/project', '~/project');
    return `${this.user}@${this.hostname}:${shortCwd}${branchInfo}$ `;
  }

  // Execute terminal input line
  execute(commandLine) {
    const raw = commandLine.trim();
    if (!raw) return '';

    // Support command chaining: split on && or ; before processing
    const chain = raw.split(/\s*(?:&&|;)\s*/).map(s => s.trim()).filter(Boolean);
    if (chain.length > 1) {
      // Store full chained command once in history
      this.history.push(raw);
      this.historyIndex = this.history.length;
      const outputs = [];
      for (const segment of chain) {
        const result = this._executeSingle(segment);
        if (result && result.clear) return result; // propagate clear
        if (result !== undefined && result !== '') outputs.push(result);
      }
      return outputs.join('\n');
    }

    this.history.push(raw);
    this.historyIndex = this.history.length;
    return this._executeSingle(raw);
  }

  // Internal: execute a single (non-chained) command
  _executeSingle(commandLine) {
    const raw = commandLine.trim();
    if (!raw) return '';

    const parts = this.parseArgs(raw);
    const cmd = parts[0];
    const args = parts.slice(1);

    switch (cmd) {
      case 'clear':
        return { clear: true };

      case 'pwd':
        return this.cwd;

      case 'whoami':
        return this.user;

      case 'date':
        return new Date().toUTCString();

      case 'uname':
        return 'Linux github-sandbox 5.15.0-github #1 SMP x86_64 GNU/Linux';

      case 'history':
        return this.history.map((h, i) => `  ${i + 1}  ${h}`).join('\n');

      case 'help':
        return [
          "Linux commands: ls, cd, pwd, cat, touch, nano, mkdir, rm, echo, whoami, date, uname, clear, help",
          "Git commands: git init, git status, git add, git commit, git log, git branch,",
          "              git switch, git checkout, git diff, git merge, git revert, git stash,",
          "              git reset, git remote, git fetch, git pull, git push"
        ].join('\n');

      case 'cd':
        return this.cmdCd(args);

      case 'ls':
        return this.cmdLs(args);

      case 'cat':
        return this.cmdCat(args);

      case 'touch':
        return this.cmdTouch(args);

      case 'nano':
        return this.cmdNano(args);

      case 'mkdir':
        return this.cmdMkdir(args);

      case 'rm':
        return this.cmdRm(args);

      case 'echo':
        return this.cmdEcho(args);

      case 'git':
        return this.handleGit(args);

      default:
        return `bash: ${cmd}: command not found. Type 'help' for available commands.`;
    }
  }

  parseArgs(str) {
    const regex = /[^\s"']+|"([^"]*)"|'([^']*)'/g;
    const matches = [];
    let match;
    while ((match = regex.exec(str)) !== null) {
      matches.push(match[1] || match[2] || match[0]);
    }
    return matches;
  }

  // Linux command: cd
  cmdCd(args) {
    const target = args[0] || '~';
    if (target === '~' || target === '/home/user' || target === '/home/user/project') {
      this.cwd = '/home/user/project';
      return '';
    }
    if (target === '..' || target === '../') {
      if (this.cwd !== '/home/user/project') {
        this.cwd = '/home/user/project';
      }
      return '';
    }
    // Navigate into a subdirectory from current cwd
    const dir = this.getCwdDir();
    if (dir[target] && dir[target].type === 'dir') {
      this.cwd = `${this.cwd}/${target}`;
      return '';
    }
    return `bash: cd: ${target}: No such file or directory`;
  }

  // Linux command: ls
  cmdLs(args) {
    const dir = this.getCwdDir();  // ← uses real cwd, not hardcoded root
    const showAll = args.includes('-a') || args.includes('-la') || args.includes('-al');
    const isLong = args.includes('-l') || args.includes('-la') || args.includes('-al');
    let names = Object.keys(dir);

    if (this.git.isRepo && showAll && this.cwd === '/home/user/project') {
      names.push('.git');
    }

    if (!showAll) {
      names = names.filter(n => !n.startsWith('.'));
    }

    names.sort();

    if (names.length === 0) return '';

    if (isLong) {
      const lines = [`total ${names.length * 4}`];
      names.forEach(n => {
        const item = dir[n] || (n === '.git' ? { type: 'dir' } : { type: 'file' });
        const isDir = item.type === 'dir';
        const perms = isDir ? 'drwxr-xr-x' : '-rw-r--r--';
        const size = (item.content ? item.content.length : 4096).toString().padStart(5);
        lines.push(`${perms} 1 user user ${size} Oct 02 04:00 ${n}`);
      });
      return lines.join('\n');
    }

    return names.join('  ');
  }

  // Linux command: cat
  cmdCat(args) {
    if (!args[0]) return "cat: missing file operand";
    const dir = this.getCwdDir();
    const file = dir[args[0]];
    if (!file) return `cat: ${args[0]}: No such file or directory`;
    if (file.type === 'dir') return `cat: ${args[0]}: Is a directory`;
    return file.content;
  }

  // Linux command: touch
  cmdTouch(args) {
    if (!args[0]) return "touch: missing file operand";
    const dir = this.getCwdDir();
    args.forEach(f => {
      if (!dir[f]) {
        dir[f] = { type: 'file', content: '' };
      }
    });
    return "";
  }

  // Linux command: nano
  cmdNano(args) {
    const filename = args[0] || 'untitled.txt';
    const dir = this.getProjectDir();
    let content = '';
    if (dir[filename] && dir[filename].type === 'file') {
      content = dir[filename].content;
    }
    return {
      nano: true,
      filename: filename,
      content: content
    };
  }

  // Save content from nano editor
  saveNanoFile(filename, content) {
    const dir = this.getProjectDir();
    dir[filename] = { type: 'file', content };
    return `[ Wrote ${content.split('\n').length} lines to ${filename} ]`;
  }

  // Linux command: mkdir
  cmdMkdir(args) {
    if (!args[0]) return "mkdir: missing operand";
    const dir = this.getCwdDir();
    if (dir[args[0]]) return `mkdir: cannot create directory '${args[0]}': File exists`;
    dir[args[0]] = { type: 'dir', children: {} };
    return "";
  }

  // Linux command: rm
  cmdRm(args) {
    if (!args[0]) return "rm: missing operand";
    const dir = this.getCwdDir();
    const isRecursive = args.includes('-r') || args.includes('-rf');
    const target = args.find(a => !a.startsWith('-'));
    if (!target) return "rm: missing operand";
    if (!dir[target]) return `rm: cannot remove '${target}': No such file or directory`;
    if (dir[target].type === 'dir' && !isRecursive) {
      return `rm: cannot remove '${target}': Is a directory`;
    }
    delete dir[target];
    return "";
  }

  // Linux command: echo
  cmdEcho(args) {
    const arrowIdx = args.indexOf('>');
    const appendIdx = args.indexOf('>>');
    const dir = this.getProjectDir();

    if (arrowIdx !== -1 && args[arrowIdx + 1]) {
      const text = args.slice(0, arrowIdx).join(' ');
      const target = args[arrowIdx + 1];
      dir[target] = { type: 'file', content: text + '\n' };
      return "";
    }

    if (appendIdx !== -1 && args[appendIdx + 1]) {
      const text = args.slice(0, appendIdx).join(' ');
      const target = args[appendIdx + 1];
      const existing = dir[target] ? dir[target].content : '';
      dir[target] = { type: 'file', content: existing + text + '\n' };
      return "";
    }

    return args.join(' ');
  }

  // Git Command Handler
  handleGit(args) {
    if (args.length === 0) {
      return "usage: git [--version] [--help] <command> [<args>]";
    }

    const sub = args[0];
    const subArgs = args.slice(1);

    if (sub === 'init') {
      return this.initGit();
    }

    if (!this.git.isRepo) {
      return "fatal: not a git repository (or any of the parent directories): .git";
    }

    switch (sub) {
      case 'status':
        return this.gitStatus();

      case 'add':
        return this.gitAdd(subArgs);

      case 'commit':
        return this.gitCommit(subArgs);

      case 'log':
        return this.gitLog(subArgs);

      case 'branch':
        return this.gitBranch(subArgs);

      case 'switch':
        return this.gitSwitch(subArgs);

      case 'checkout':
        return this.gitCheckout(subArgs);

      case 'diff':
        return this.gitDiff(subArgs);

      case 'merge':
        return this.gitMerge(subArgs);

      case 'revert':
        return this.gitRevert(subArgs);

      case 'stash':
        return this.gitStash(subArgs);

      case 'reset':
        return this.gitReset(subArgs);

      case 'remote':
        return this.gitRemote(subArgs);

      case 'fetch':
        return this.gitFetch(subArgs);

      case 'pull':
        return this.gitPull(subArgs);

      case 'push':
        return this.gitPush(subArgs);

      default:
        return `git: '${sub}' is not a git command. See 'help'.`;
    }
  }

  gitStatus() {
    const statePart = this.git.headState ? `|${this.git.headState}` : '';
    const lines = [`On branch ${this.git.head}${statePart}`];
    const dir = this.getProjectDir();

    // Check conflict status
    if (this.git.conflict) {
      lines.push("You have unmerged paths.");
      lines.push('  (fix conflicts and run "git commit")');
      lines.push('  (use "git merge --abort" to abort the merge)');
      lines.push("");
      lines.push("Unmerged paths:");
      lines.push('  (use "git add <file>..." to mark resolution)');
      lines.push(`\t\x1b[31mboth modified:   ${this.git.conflict.file}\x1b[0m`);
      lines.push("");
      return lines.join('\n');
    }

    // Check upstream tracking status
    const remoteRef = this.git.remoteBranches[`origin/${this.git.head}`];
    const localRef = this.git.branches[this.git.head];
    if (remoteRef) {
      if (remoteRef === localRef) {
        lines.push("Your branch is up to date with 'origin/" + this.git.head + "'.");
      } else {
        lines.push("Your branch is ahead of 'origin/" + this.git.head + "' by 1 commit.");
        lines.push('  (use "git push" to publish your local commits)');
      }
      lines.push("");
    }

    const stagedFiles = Object.keys(this.git.staging);
    const lastCommit = this.getLatestCommit();
    const lastTree = lastCommit ? lastCommit.tree : {};

    // Changes staged for commit
    if (stagedFiles.length > 0) {
      lines.push("Changes to be committed:");
      lines.push('  (use "git restore --staged <file>..." to unstage)');
      stagedFiles.forEach(f => {
        const statusType = lastTree[f] ? 'modified' : 'new file';
        lines.push(`\t\x1b[32m${statusType}:   ${f}\x1b[0m`);
      });
      lines.push("");
    }

    // Untracked files & modified unstaged
    const untracked = [];
    const modifiedUnstaged = [];

    Object.keys(dir).forEach(f => {
      if (f.startsWith('.')) return;
      if (this.git.staging[f] !== undefined) return; // already staged

      if (!lastTree[f]) {
        untracked.push(f);
      } else if (lastTree[f] !== dir[f].content) {
        modifiedUnstaged.push(f);
      }
    });

    if (modifiedUnstaged.length > 0) {
      lines.push("Changes not staged for commit:");
      lines.push('  (use "git add <file>..." to update what will be committed)');
      lines.push('  (use "git restore <file>..." to discard changes in working directory)');
      modifiedUnstaged.forEach(f => {
        lines.push(`\t\x1b[31mmodified:   ${f}\x1b[0m`);
      });
      lines.push("");
    }

    if (untracked.length > 0) {
      lines.push("Untracked files:");
      lines.push('  (use "git add <file>..." to include in what will be committed)');
      untracked.forEach(f => {
        lines.push(`\t\x1b[31m${f}\x1b[0m`);
      });
      lines.push("");
    }

    if (stagedFiles.length === 0 && untracked.length === 0 && modifiedUnstaged.length === 0) {
      lines.push("nothing to commit, working tree clean");
    }

    return lines.join('\n');
  }

  gitAdd(args) {
    if (args.length === 0) {
      return "Nothing specified, nothing added.\nhint: Maybe you wanted to say 'git add .'?";
    }

    const dir = this.getProjectDir();

    if (args[0] === '.' || args[0] === '-A') {
      Object.entries(dir).forEach(([name, item]) => {
        if (!name.startsWith('.')) {
          this.git.staging[name] = item.content;
        }
      });
      return "";
    }

    let error = "";
    args.forEach(f => {
      if (dir[f]) {
        this.git.staging[f] = dir[f].content;
      } else {
        error = `fatal: pathspec '${f}' did not match any files`;
      }
    });

    return error;
  }

  gitCommit(args) {
    const isAmend = args.includes('--amend');
    const msgFlagIdx = args.indexOf('-m');
    let message = null;

    if (msgFlagIdx !== -1 && args[msgFlagIdx + 1]) {
      message = args[msgFlagIdx + 1];
    }

    // Check if committing a merge conflict resolution
    if (this.git.conflict) {
      const dir = this.getProjectDir();
      const fileContent = dir[this.git.conflict.file] ? dir[this.git.conflict.file].content : '';
      if (fileContent.includes('<<<<<<<') || fileContent.includes('=======') || fileContent.includes('>>>>>>>')) {
        return `fatal: cannot commit: file '${this.git.conflict.file}' still has unresolved conflict markers (<<<<<<<, =======, >>>>>>>)`;
      }
      if (this.git.staging[this.git.conflict.file] === undefined) {
        return `fatal: cannot commit: file '${this.git.conflict.file}' was not staged after resolving. Run 'git add ${this.git.conflict.file}' first.`;
      }
      const targetBranch = this.git.conflict.targetBranch;
      this.git.conflict = null;
      this.git.headState = null;

      const lastCommit = this.getLatestCommit();
      const newHash = Math.random().toString(16).substring(2, 9);
      const commitMsg = message || `Merge branch '${targetBranch}' and resolve conflict`;
      const newCommit = {
        hash: newHash,
        message: commitMsg,
        author: 'Student Developer <student@github.com>',
        date: new Date().toISOString(),
        tree: { ...lastCommit.tree, ...this.git.staging },
        parent: lastCommit ? lastCommit.hash : null
      };

      this.git.commits.push(newCommit);
      this.git.branches[this.git.head] = newHash;
      this.git.staging = {};

      return `[${this.git.head} ${newHash}] ${commitMsg}\n 1 file changed, resolved merge conflict`;
    }

    // Amend handling
    if (isAmend) {
      if (this.git.commits.length === 0) {
        return "fatal: cannot amend: no commits yet";
      }
      const lastCommit = this.getLatestCommit();
      const updatedTree = { ...lastCommit.tree, ...this.git.staging };
      const updatedMessage = message || lastCommit.message;

      lastCommit.tree = updatedTree;
      lastCommit.message = updatedMessage;
      lastCommit.date = new Date().toISOString();
      this.git.staging = {};

      const shortHash = lastCommit.hash.substring(0, 7);
      return `[${this.git.head} ${shortHash}] (amended) ${updatedMessage}\n Date: ${lastCommit.date}\n 1 file changed`;
    }

    if (!message) {
      return "error: switch `m' requires a value (e.g. git commit -m \"message\")";
    }

    const stagedKeys = Object.keys(this.git.staging);
    if (stagedKeys.length === 0) {
      return "nothing to commit, working tree clean";
    }

    const lastCommit = this.getLatestCommit();
    const parentTree = lastCommit ? lastCommit.tree : {};
    const newTree = { ...parentTree, ...this.git.staging };

    const newHash = Math.random().toString(16).substring(2, 9);
    const newCommit = {
      hash: newHash,
      message: message,
      author: 'Student Developer <student@github.com>',
      date: new Date().toISOString(),
      tree: newTree,
      parent: lastCommit ? lastCommit.hash : null
    };

    this.git.commits.push(newCommit);
    this.git.branches[this.git.head] = newHash;
    this.git.staging = {};

    return `[${this.git.head} ${newHash}] ${message}\n ${stagedKeys.length} file(s) changed`;
  }

  gitLog(args) {
    if (this.git.commits.length === 0) {
      return "fatal: your current branch '" + this.git.head + "' does not have any commits yet";
    }

    const isOneLine = args.includes('--oneline');
    const isGraph = args.includes('--graph');
    const commits = [...this.git.commits].reverse();

    if (isOneLine || isGraph) {
      return commits.map((c, i) => {
        const isHead = c.hash === this.git.branches[this.git.head] ? ` \x1b[36m(HEAD -> ${this.git.head})\x1b[0m` : '';
        const graphPrefix = isGraph ? `* ` : '';
        return `${graphPrefix}\x1b[33m${c.hash.substring(0, 7)}\x1b[0m${isHead} ${c.message}`;
      }).join('\n');
    }

    return commits.map(c => {
      const isHead = c.hash === this.git.branches[this.git.head] ? ` (HEAD -> ${this.git.head})` : '';
      return [
        `\x1b[33mcommit ${c.hash}\x1b[0m${isHead}`,
        `Author: ${c.author}`,
        `Date:   ${c.date}`,
        "",
        `    ${c.message}`,
        ""
      ].join('\n');
    }).join('\n');
  }

  gitBranch(args) {
    // git branch -a (include remotes)
    if (args.includes('-a')) {
      const locals = Object.keys(this.git.branches).map(b => {
        return b === this.git.head ? `* \x1b[32m${b}\x1b[0m` : `  ${b}`;
      });
      const remotes = Object.keys(this.git.remoteBranches).map(rb => {
        return `  \x1b[31mremotes/${rb}\x1b[0m`;
      });
      return [...locals, ...remotes].join('\n');
    }

    // git branch -d <name> (delete branch)
    if (args[0] === '-d' || args[0] === '-D') {
      const target = args[1];
      if (!target) return "fatal: branch name required";
      if (target === this.git.head) {
        return `error: Cannot delete branch '${target}' checked out at '${this.cwd}'`;
      }
      if (!this.git.branches[target]) {
        return `error: branch '${target}' not found.`;
      }
      delete this.git.branches[target];
      return `Deleted branch ${target}.`;
    }

    // FIX #2: git branch -f <name> (force-move branch pointer to current HEAD)
    if (args[0] === '-f') {
      const target = args[1];
      if (!target) return "fatal: branch name required after -f";
      const currentHash = this.git.branches[this.git.head] || null;
      this.git.branches[target] = currentHash;
      return `Branch '${target}' set to ${currentHash ? currentHash.substring(0, 7) : 'HEAD'}.`;
    }

    // git branch <new-branch> (create branch)
    // FIX #1: use current branch's commit hash, NOT getLatestCommit()
    // getLatestCommit() returns the last item in the commits array which may
    // belong to a different branch. this.git.branches[head] is always accurate.
    if (args.length > 0 && !args[0].startsWith('-')) {
      const newName = args[0];
      if (this.git.branches[newName]) {
        return `fatal: A branch named '${newName}' already exists.`;
      }
      // Use current HEAD's hash — guaranteed to be a valid commit or null only
      // if we're on an unborn branch (no commits yet), which is valid Git behavior.
      const currentHash = this.git.branches[this.git.head] || null;
      this.git.branches[newName] = currentHash;
      return "";
    }

    // list local branches
    const names = Object.keys(this.git.branches);
    if (names.length === 0) return "* " + this.git.head;
    return names.map(b => b === this.git.head ? `* \x1b[32m${b}\x1b[0m` : `  ${b}`).join('\n');
  }

  gitSwitch(args) {
    if (args.length === 0) return "fatal: missing branch name";
    if (args[0] === '-c' && args[1]) {
      const newBranch = args[1];
      const latest = this.getLatestCommit();
      this.git.branches[newBranch] = latest ? latest.hash : null;
      this.git.head = newBranch;
      return `Switched to a new branch '${newBranch}'`;
    }

    const branchName = args[0];
    if (!this.git.branches[branchName]) {
      return `fatal: invalid reference: ${branchName}`;
    }

    this.git.head = branchName;
    this.restoreTreeForHead();
    return `Switched to branch '${branchName}'`;
  }

  gitCheckout(args) {
    if (args.length === 0) return "fatal: missing branch or file argument";

    if (args[0] === '-b' && args[1]) {
      const newBranch = args[1];
      const latest = this.getLatestCommit();
      this.git.branches[newBranch] = latest ? latest.hash : null;
      this.git.head = newBranch;
      return `Switched to a new branch '${newBranch}'`;
    }

    const branchName = args[0];
    if (this.git.branches[branchName]) {
      this.git.head = branchName;
      this.restoreTreeForHead();
      return `Switched to branch '${branchName}'`;
    }

    // Checkout file
    const targetFile = args[0] === '--' ? args[1] : args[0];
    const latest = this.getLatestCommit();
    if (latest && latest.tree[targetFile] !== undefined) {
      const dir = this.getProjectDir();
      dir[targetFile] = { type: 'file', content: latest.tree[targetFile] };
      delete this.git.staging[targetFile];
      return `Updated 1 path from the index`;
    }

    return `error: pathspec '${branchName}' did not match any file(s) known to git`;
  }

  restoreTreeForHead() {
    const headHash = this.git.branches[this.git.head];
    const commit = this.git.commits.find(c => c.hash === headHash);
    if (!commit) return;
    const dir = this.getProjectDir();
    // Replace files from snapshot
    Object.keys(dir).forEach(k => {
      if (!k.startsWith('.')) delete dir[k];
    });
    Object.entries(commit.tree).forEach(([k, v]) => {
      dir[k] = { type: 'file', content: v };
    });
  }

  gitDiff(args) {
    const isStaged = args.includes('--staged') || args.includes('--cached');
    if (isStaged) {
      const staged = Object.keys(this.git.staging);
      if (staged.length === 0) return "";
      return staged.map(f => `diff --git a/${f} b/${f}\n--- a/${f}\n+++ b/${f}\n@@ -0,0 +1,5 @@\n+${this.git.staging[f]}`).join('\n');
    }

    // Unstaged diff
    const dir = this.getProjectDir();
    const lastCommit = this.getLatestCommit();
    const lastTree = lastCommit ? lastCommit.tree : {};
    const diffs = [];

    Object.keys(dir).forEach(f => {
      if (f.startsWith('.')) return;
      if (lastTree[f] !== undefined && lastTree[f] !== dir[f].content) {
        diffs.push(`diff --git a/${f} b/${f}\n--- a/${f}\n+++ b/${f}\n@@ -1 +1 @@\n-${lastTree[f].trim()}\n+${dir[f].content.trim()}`);
      }
    });

    return diffs.join('\n');
  }

  // Git Merge with Conflict Detection
  gitMerge(args) {
    if (args.includes('--abort')) {
      if (!this.git.conflict) {
        return "fatal: There is no merge to abort (MERGE_HEAD missing).";
      }
      this.restoreTreeForHead();
      this.git.conflict = null;
      this.git.headState = null;
      this.git.staging = {};
      return "";
    }

    if (!args[0]) return "fatal: No commit specified and merge.default not set.";
    const targetBranch = args[0];

    if (!this.git.branches[targetBranch]) {
      return `merge: ${targetBranch} - not something we can merge`;
    }

    if (targetBranch === this.git.head) {
      return "Already up to date.";
    }

    // Check if this branch merge triggers a conflict scenario
    if (this.conflictScenarios && this.conflictScenarios[targetBranch]) {
      const conf = this.conflictScenarios[targetBranch];
      this.git.conflict = { ...conf, targetBranch };
      this.git.headState = 'MERGING';
      const dir = this.getProjectDir();
      dir[conf.file] = { type: 'file', content: conf.conflictContent };
      return [
        `Auto-merging ${conf.file}`,
        `CONFLICT (content): Merge conflict in ${conf.file}`,
        `Automatic merge failed; fix conflicts and then commit the result.`
      ].join('\n');
    }

    const currentCommit = this.getLatestCommit();
    const targetHash = this.git.branches[targetBranch];
    const targetCommit = this.git.commits.find(c => c.hash === targetHash);

    if (!targetCommit) {
      return "Already up to date.";
    }

    // Fast-Forward Merge
    this.git.branches[this.git.head] = targetHash;
    this.restoreTreeForHead();

    return [
      `Updating ${(currentCommit ? currentCommit.hash.substring(0, 7) : 'initial')}..${targetHash.substring(0, 7)}`,
      "Fast-forward",
      ` ${Object.keys(targetCommit.tree).join(', ')} | 2 +-`,
      " 1 file changed, 1 insertion(+)"
    ].join('\n');
  }

  // Git Revert (safe remote undo by creating new inverse commit)
  gitRevert(args) {
    const target = args[0] || 'HEAD';
    let commitToRevert = null;

    if (target === 'HEAD') {
      commitToRevert = this.getLatestCommit();
    } else {
      commitToRevert = this.git.commits.find(c => c.hash.startsWith(target));
    }

    if (!commitToRevert) {
      return `fatal: bad revision '${target}'`;
    }

    // Find parent snapshot
    const parent = this.git.commits.find(c => c.hash === commitToRevert.parent);
    const restoredTree = parent ? { ...parent.tree } : {};

    const newHash = Math.random().toString(16).substring(2, 9);
    const revertCommit = {
      hash: newHash,
      message: `Revert "${commitToRevert.message}"`,
      author: 'Student Developer <student@github.com>',
      date: new Date().toISOString(),
      tree: restoredTree,
      parent: this.getLatestCommit() ? this.getLatestCommit().hash : null
    };

    this.git.commits.push(revertCommit);
    this.git.branches[this.git.head] = newHash;
    this.restoreTreeForHead();

    return `[${this.git.head} ${newHash}] Revert "${commitToRevert.message}"\n 1 file changed, 1 deletion(-)`;
  }

  gitStash(args) {
    if (args[0] === 'pop') {
      if (this.git.stash.length === 0) {
        return "error: No stash entries found.";
      }
      const entry = this.git.stash.pop();
      this.git.staging = { ...this.git.staging, ...entry.staging };
      return "On branch " + this.git.head + "\nChanges restored from stash:\nDropped stash@{0}";
    }

    const stagedCount = Object.keys(this.git.staging).length;
    if (stagedCount === 0) {
      return "No local changes to save";
    }

    this.git.stash.push({
      staging: { ...this.git.staging },
      message: args[1] || 'WIP on ' + this.git.head
    });
    this.git.staging = {};
    return `Saved working directory and index state WIP on ${this.git.head}`;
  }

  gitReset(args) {
    if (args.includes('--soft')) {
      if (this.git.commits.length <= 1) return "fatal: cannot reset: no parent commit";
      const popped = this.git.commits.pop();
      const latest = this.getLatestCommit();
      this.git.branches[this.git.head] = latest ? latest.hash : null;
      this.git.staging = { ...popped.tree };
      return "HEAD is now at " + (latest ? latest.hash : 'initial');
    }

    if (args.includes('--hard')) {
      if (this.git.commits.length <= 1) return "fatal: cannot reset: no parent commit";
      this.git.commits.pop();
      const latest = this.getLatestCommit();
      this.git.branches[this.git.head] = latest ? latest.hash : null;
      this.git.staging = {};
      this.restoreTreeForHead();
      return "HEAD is now at " + (latest ? latest.hash : 'initial');
    }

    return "Unstaged changes after reset.";
  }

  // Git Remotes
  gitRemote(args) {
    if (args.length === 0) {
      return Object.keys(this.git.remotes).join('\n');
    }

    if (args[0] === '-v') {
      return Object.entries(this.git.remotes).map(([name, url]) => 
        `${name}\t${url} (fetch)\n${name}\t${url} (push)`
      ).join('\n');
    }

    if (args[0] === 'add' && args[1] && args[2]) {
      const name = args[1];
      const url = args[2];
      if (this.git.remotes[name]) {
        return `error: remote ${name} already exists.`;
      }
      this.git.remotes[name] = url;
      return "";
    }

    return "usage: git remote [-v] | git remote add <name> <url>";
  }

  // Git Fetch
  gitFetch(args) {
    const remote = args[0] || 'origin';
    if (!this.git.remotes[remote]) {
      return `fatal: '${remote}' does not appear to be a git repository`;
    }

    // Sync remote branches
    this.git.remoteBranches[`${remote}/main`] = this.git.branches['main'] || 'b8c1a90';
    return [
      `From ${this.git.remotes[remote]}`,
      ` * [new branch]      main       -> ${remote}/main`
    ].join('\n');
  }

  // Git Pull
  gitPull(args) {
    const remote = args[0] || 'origin';
    const branch = args[1] || this.git.head;

    this.gitFetch([remote]);

    const remoteHash = this.git.remoteBranches[`${remote}/${branch}`];
    const localHash = this.git.branches[branch];

    if (remoteHash === localHash) {
      return "Already up to date.";
    }

    this.git.branches[branch] = remoteHash;
    this.restoreTreeForHead();
    return [
      `Updating ${(localHash ? localHash.substring(0, 7) : 'initial')}..${remoteHash.substring(0, 7)}`,
      "Fast-forward",
      " README.md | 2 +-",
      " 1 file changed, 1 insertion(+), 1 deletion(-)"
    ].join('\n');
  }

  // Git Push
  gitPush(args) {
    const remote = args.find(a => !a.startsWith('-') && a !== 'push') || 'origin';
    const branch = args.find(a => !a.startsWith('-') && a !== remote && a !== 'push') || this.git.head;

    if (!this.git.remotes[remote]) {
      return `fatal: '${remote}' does not appear to be a git repository`;
    }

    const currentHash = this.git.branches[this.git.head];
    if (!currentHash) {
      return "error: src refspec " + this.git.head + " does not match any";
    }

    this.git.remoteBranches[`${remote}/${branch}`] = currentHash;

    return [
      "Enumerating objects: 5, done.",
      "Counting objects: 100% (5/5), done.",
      "Writing objects: 100% (3/3), 320 bytes | 320.00 KiB/s, done.",
      "Total 3 (delta 1), reused 0 (delta 0), pack-reused 0",
      `To ${this.git.remotes[remote]}`,
      `   * [new branch]      ${this.git.head} -> ${branch}`,
      `Branch '${this.git.head}' set up to track remote branch '${branch}' from '${remote}'.`
    ].join('\n');
  }

  getLatestCommit() {
    if (this.git.commits.length === 0) return null;
    return this.git.commits[this.git.commits.length - 1];
  }
}
