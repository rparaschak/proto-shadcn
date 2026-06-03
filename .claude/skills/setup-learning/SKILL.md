---
name: setup-learning
description: Get the Proto Shadcn project installed and running in dev mode (hot reload) on the user's machine, and capture what was learned so the next teammate has less friction. USE THIS SKILL AT THE START OF EVERY SESSION, before doing any feature work — the goal is that right after the user's first message the app is up and running at http://localhost:5173. Also use it whenever the app won't start, the dev server died, hot reload stopped working, dependencies fail to install, Node/npm is missing, or the user is on a fresh machine or a different operating system (Windows, macOS, Linux) and hits any setup friction. This project is used by non-technical teammates across different OSes; this skill is the shared, growing playbook for bootstrapping it. When you solve a new setup problem, you MUST record it here so the playbook gets smarter over time.
---

# Setup & Learning — get the app running, then teach the next person

This project is used by **non-technical product people on macOS, Windows, and Linux**. The single goal of this skill: **after the user's first message, the app is running at http://localhost:5173 with hot reload**, with as little friction as possible.

The skill is *self-improving*. It ships with a living playbook — `references/learnings.md` — that accumulates every OS-specific quirk and fix previous teammates have hit. You read it before you start so you don't rediscover known problems, and you append to it when you solve something new. Because the skill is committed to the repo, the next person who pulls gets your fix for free.

## Talk like a human, not a terminal

The user is likely non-technical. Don't paste raw stack traces or jargon at them. Say what you're doing in one plain sentence ("Installing the project's dependencies — about a minute…"), and if something breaks, explain it simply and tell them the one thing you need from them (e.g. *"Node isn't installed yet — I'll walk you through a 2-minute install"*). Do the technical work yourself; only ask the user to act when a step genuinely needs them (installing software, an admin password, a restart).

## The bootstrap sequence

Run these in order. Stop and resolve the moment something fails — don't push past a broken step.

### Step 0 — Read the playbook first

Open **`references/learnings.md`** and scan the section for the user's operating system. It is the accumulated wisdom of everyone who set this project up before. If a known issue matches the current machine, apply the documented fix immediately instead of rediscovering it.

### Step 1 — Pull the latest code (always, first thing)

Before anything else, get the newest code so the user starts the session on top of what teammates have pushed:
```bash
git pull --ff-only
```
Do this **every session, even if the app is already running** from before — otherwise the user works against stale code and their teammates' latest modules. If the pull can't fast-forward (local commits or conflicts), don't force it — tell the user plainly that their local copy has diverged and ask how they'd like to handle it. `scripts/dev.sh` in Step 3 also pulls, but run this explicitly here so the pull happens regardless of which bootstrap path you take.

### Step 2 — Detect the environment

Figure out, quickly:
- **OS**: macOS, Windows, or Linux. (You usually know from the platform info in your context.)
- **Whether a bash shell is available.** `scripts/dev.sh` is a bash script — it runs as-is on macOS/Linux and inside Git Bash/WSL on Windows, but **not** in plain Windows `cmd`/PowerShell.
- **Node and npm**: check `node --version` and `npm --version`. This project needs **Node 20 or newer** (built/tested on Node 22). npm comes with Node.

If Node/npm are missing or too old, that's the most common blocker — see `references/install-node.md` for the plain-language, per-OS install walkthrough, then come back here.

### Step 3 — Bootstrap, the right way for this OS

**macOS / Linux (and Windows with Git Bash or WSL):**
```bash
bash scripts/dev.sh
```
This pulls latest, installs dependencies if needed, starts the dev server, and waits until it answers on port 5173.

**Windows without bash (plain PowerShell / cmd):** `dev.sh` won't run. Do its steps directly instead (the pull already happened in Step 1):
```
npm install
npm start
```
`npm start` runs Vite, which serves the app with hot reload. (If you'd rather not depend on bash on Windows at all, this npm path always works cross-platform.)

### Step 4 — Confirm it's actually up

Verify the server responds at **http://localhost:5173** (e.g. `curl -s http://localhost:5173` returns HTML, or load it in the browser). Hot reload is on by default with Vite — edits to `src/` show up live. Tell the user the app is ready and give them the link.

If the dev server is already running from a previous session, don't start a second one — just confirm it answers and reuse it. (You still pulled the latest code in Step 1, so a running server picks up the new code via hot reload.)

### Step 5 — If you hit friction, fix it, then **record the learning**

This is the part that makes the project easier for everyone over time. Whenever you run into a setup problem that wasn't already in the playbook — a missing tool, a wrong Node version, a port conflict, a Windows path quirk, a permissions error, a corporate-proxy npm failure, anything — and you find the fix:

1. Get the user unblocked first.
2. **Append a dated entry to `references/learnings.md`** under the right OS section, using the template at the top of that file. Keep it concrete: the symptom the user would see, the cause, and the exact fix.
3. **Offer to commit it** so the next teammate benefits:
   > "I hit a setup snag and figured out the fix. Want me to save it to the project's setup playbook and commit, so the next person doesn't hit it?"
   On yes, commit just the learnings file (and any script change) with a clear message like `setup-learning: capture <OS> <problem> fix`.

Treat the playbook as the real deliverable of this skill — a great run that doesn't record what it learned has left the next person to rediscover it.

## Quick reference

| Situation | What to do |
|---|---|
| Every session start | `git pull --ff-only` first (Step 1) — always, even if the app is already running |
| Fresh session, app not running | Pull → run `bash scripts/dev.sh` (or npm path on Windows) → confirm port 5173 |
| Node/npm missing or < 20 | `references/install-node.md`, install, then retry Step 3 |
| Windows, no bash | Pull, then the `npm install` / `npm start` path |
| Dev server died / hot reload stopped | Re-run Step 3; check `/tmp/proto-shadcn-dev.log` (macOS/Linux) |
| Solved something new | Append to `references/learnings.md`, offer to commit |

## Files in this skill

- `references/learnings.md` — the living, dated playbook of OS-specific setup issues and fixes. **Read before bootstrapping, append after solving.**
- `references/install-node.md` — plain-language Node.js install instructions per OS, for non-technical users.
