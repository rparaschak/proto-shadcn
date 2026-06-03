# Setup Learnings — the living playbook

This file is the shared memory of everyone who has set up Proto Shadcn. **Read the section for your OS before bootstrapping.** When you solve a new setup problem, **add an entry** so the next teammate doesn't hit it.

## How to add an entry

Append under the matching OS section, newest at the top of that section, using this template:

```
### <short symptom> — <YYYY-MM-DD>
- **Symptom:** what the user saw (the error / behavior, in plain terms)
- **Cause:** the underlying reason
- **Fix:** the exact steps that resolved it
- **Notes:** anything to watch for next time (optional)
```

Keep entries concrete and short. If a fix turns out to be general (all OSes), put it under "All platforms".

---

## All platforms

### Baseline that works — 2026-06-03
- **Symptom:** n/a (reference setup)
- **Cause:** n/a
- **Fix:** Requires **Node 20+** (developed on Node 22, npm 10). Standard flow: `bash scripts/dev.sh` installs deps, starts Vite, and waits for http://localhost:5173. Hot reload is on by default.
- **Notes:** `scripts/dev.sh` logs the dev server to `/tmp/proto-shadcn-dev.log` on macOS/Linux. The default port is **5173**.

### Port 5173 already in use — 2026-06-03
- **Symptom:** Vite starts on a different port (e.g. 5174), or `dev.sh` reports the server didn't come up on 5173.
- **Cause:** Another dev server (an old session, or another Vite app) is already holding 5173.
- **Fix:** Reuse the running server if it's this project (just open http://localhost:5173). Otherwise stop the old one — macOS/Linux: `lsof -ti:5173 | xargs kill`; Windows PowerShell: `Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess | Stop-Process`.

---

## macOS

### Confirmed working via dev.sh — 2026-06-03
- **Symptom:** n/a
- **Cause:** n/a
- **Fix:** `bash scripts/dev.sh` works out of the box on macOS with Node 22 / npm 10 installed. Nothing special required.
- **Notes:** If `node`/`npm` aren't found, see `install-node.md` (Homebrew or the official installer).

---

## Windows

### dev.sh doesn't run in PowerShell/cmd — 2026-06-03
- **Symptom:** Double-clicking or running `bash scripts/dev.sh` in PowerShell/cmd fails with "bash not recognized" or the script doesn't execute.
- **Cause:** `dev.sh` is a bash script; plain Windows shells have no bash.
- **Fix:** Either (a) run it inside **Git Bash** (installed with Git for Windows) or **WSL**, or (b) skip the script and run the steps directly in PowerShell: `git pull --ff-only`, then `npm install`, then `npm start`. The npm path is the most reliable for non-technical Windows users.
- **Notes:** `npm start` gives the same Vite dev server + hot reload on http://localhost:5173.

---

## Linux

_No entries yet. Add the first one when someone sets up on Linux._
