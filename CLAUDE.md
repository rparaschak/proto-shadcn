# Proto Shadcn — Rapid Feature Prototyping

A platform where product people describe a feature and watch it get built in real time. Each feature is one isolated **module**, reachable from a module-selector dropdown in the header.

## At the start of every session, load these skills

There's no way to auto-attach a skill in Claude Code, so invoke both of these yourself before doing anything else:

1. **`setup-learning`** — get the app installed and running with hot reload (the goal is that the app is up at http://localhost:5173 right after the user's first message). Use it whenever setup breaks, too.
2. **`architecture`** — how this codebase is structured and the conventions to follow. Use it before creating or changing any feature.

Run `setup-learning` first so the user can see changes live, then let `architecture` guide everything you build.

Everything about the stack, structure, conventions, workflow, and how to run the project lives in those two skills — keep it there, not here.
