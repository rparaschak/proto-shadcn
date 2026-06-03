# Installing Node.js (for non-technical teammates)

The project runs on **Node.js** (which includes **npm**). You need **version 20 or newer** — version 22 is a safe choice. Here's how to check and install it, explained simply. When helping someone, do the checking yourself and only hand them the install step.

## First, check what's already there

In the terminal:
```
node --version
```
- Prints something like `v22.14.0` and it's **20 or higher** → you're done, go back to bootstrapping.
- Prints a number **below 20** → update Node (instructions below).
- Says "command not found" / "not recognized" → Node isn't installed; install it below.

---

## macOS

**Easiest (official installer):**
1. Go to https://nodejs.org
2. Download the **LTS** version (the big green button).
3. Open the downloaded `.pkg` file and click through the installer.
4. Close and reopen the terminal, then re-run `node --version` to confirm.

**If you already use Homebrew:**
```
brew install node
```

---

## Windows

**Easiest (official installer):**
1. Go to https://nodejs.org
2. Download the **LTS** version (the big green button).
3. Run the downloaded `.msi` installer and click through it (accept the defaults — leave "Add to PATH" checked).
4. Close and reopen PowerShell, then run `node --version` to confirm.

**Tip:** The installer can also offer to install the tools needed to build some packages — for this project that's not required, so you can skip it to save time.

---

## Linux

**Recommended (nvm — lets you pick the version cleanly):**
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
# close & reopen the terminal, then:
nvm install 22
nvm use 22
```

**Or via your distro's package manager** — but distro packages are often outdated; prefer nvm or [NodeSource](https://github.com/nodesource/distributions) to get Node 20+.

---

## After installing

Re-run `node --version` (should be 20+) and `npm --version` (any recent version is fine), then return to the bootstrap sequence in `SKILL.md`.

If the install surfaced anything surprising on this machine/OS, **add a note to `learnings.md`** so the next person has it easier.
