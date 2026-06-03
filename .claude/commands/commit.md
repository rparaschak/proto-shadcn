---
description: Commit all changes and push to the remote, with a clear message
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git add:*), Bash(git commit:*), Bash(git push:*), Bash(git pull:*), Bash(git log:*), Bash(git branch:*)
---

Save the user's work: stage everything, commit with a clear message, and push.

This is a prototyping project where committing straight to the current branch is the intended workflow — don't create a new branch, just commit and push to wherever HEAD is.

Steps:

1. Run `git status` and `git diff` (and `git diff --staged`) to see what changed.
2. Stage all changes with `git add -A`.
3. Write a concise, descriptive commit message summarizing what actually changed — group it by feature/module when that makes sense. Use a short imperative subject line (e.g. `Add date filter to Analytics Demo 1`). Add a brief body only if the change needs explanation. End the message with:

   ```
   Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
   ```
4. Commit, then `git push`. If the push is rejected because the remote moved ahead, run `git pull --rebase` and push again.
5. Report back in one plain sentence what you committed and that it's pushed — no jargon. If there was nothing to commit, just say the working tree is already clean.

$ARGUMENTS may contain a commit message the user wants to use — if present, use it (still appending the Co-Authored-By line) instead of writing your own.
