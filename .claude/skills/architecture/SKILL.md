---
name: architecture
description: How the Proto Shadcn codebase is structured and the conventions to follow when building or changing anything in it. Use this skill at the start of every session and whenever you create a new feature/module, add or edit a component, write business logic, add test data, set up routing, or decide where a piece of code should live. Covers the stack, the module isolation model, the component hierarchy (shadcn → shared → module-private), the "logic in hooks, rendering in components" rule, the prototyping workflow (one module per chat), and the step-by-step recipe for adding a new module. Consult it before writing code so prototypes stay consistent — even when the user doesn't explicitly mention "architecture".
---

# Proto Shadcn — Architecture & Conventions

This is a **rapid prototyping platform**. Product managers describe a feature and watch it get built in real time. Each feature is one **module**, fully isolated from the others, reachable from a module-selector dropdown in the header.

Your job is to turn feature descriptions into elegant, working UI **fast**, while keeping every prototype consistent with the conventions below. Consistency is what lets the next person (and the next session) understand the code instantly — that's worth more here than cleverness.

## Stack

React 19 + TypeScript · Vite · React Router (v7) · Tailwind CSS v4 · shadcn/ui (New York style, Stone base color) · Lucide icons · Recharts. Path alias `@` → `src/`.

## The prototyping workflow

1. **Make sure the app is running first.** Environment bootstrap (install + dev server + hot reload) is the job of the `setup-learning` skill — use it before anything else so the user sees their changes live.
2. **Check `src/modules/registry.ts`** to see what modules already exist. This is the single source of truth — both the router and the Layout read from it.
3. **Figure out which module you're working on:**
   - Describes an existing module → confirm, then continue on it.
   - Describes something new → confirm it's a new module before creating one.
   - Unclear → ask: *"Are we working on an existing feature or starting a new one?"*
4. **One module per chat.** You can only work on a single module/feature in a given chat. If the user pivots to a different feature, suggest starting a new chat before continuing — it keeps each prototype's context clean.
5. **When given a new feature description, write a short MD file in the module's directory** describing the feature, so the intent is captured alongside the code.
6. **When the user is done, commit and push** the code — the `/commit` command does this in one step (stage → message → commit → push).

## Module structure

Each module lives in `src/modules/[module-name]/` and is **completely isolated** — no cross-module imports, no shared state, no shared data.

```
src/modules/[module-name]/
├── [ModuleName].tsx          # Root component: internal <Routes> + sidebar nav
├── [feature].md              # Short description of the feature (the intent)
├── components/               # Module-private components (small, focused)
├── hooks/                    # Business logic lives here, not in components
├── data/                     # Test/mock data + TypeScript interfaces
└── [ModuleName].css          # Optional module-specific styles
```

## Routing

- **App-level router** (`src/App.tsx`) maps URL paths to modules.
- **Each module owns its own `<Routes>`** for internal page navigation, with real URL paths (not local state tabs).
- The header's **module selector** dropdown navigates between features.
- **`src/modules/registry.ts`** is the single source of truth for the module list. Adding a module means adding an entry here.

## Component conventions

**Component hierarchy — always reuse in this order:**
1. **shadcn/ui** (`src/components/ui/`) — reach for an existing shadcn component first.
2. **Shared components** (`src/components/`) — reusable across modules; create here if no shadcn option fits.
3. **Module-private components** (`src/modules/[name]/components/`) — only if the thing is genuinely specific to one module.

**Small, focused components.** If a component grows past ~80–100 lines or renders multiple distinct sections, split it. Each component should do one thing. When you see a pattern repeated (e.g. a card used six times), extract it (`StatCard`).

**Components render; hooks think.** Components are purely presentational — they receive data via props and emit events via callbacks. All business logic (navigation, data transforms, filtering, state machines) goes into custom hooks in `hooks/`. No `useState`-driven business logic inside components.

**Data.** All test/mock data lives in the module's `data/` folder, with its TypeScript interfaces exported alongside it. Modules never share data — each carries its own.

## Adding a new module

1. Create the folder `src/modules/[module-name]/`.
2. Write the root component with its own `<Routes>` for internal navigation.
3. Add a short `[feature].md` describing the feature.
4. Add test data (and interfaces) in `data/`.
5. Put any business logic in `hooks/`.
6. Register the module in `src/modules/registry.ts` (id, name, description, icon, path).
7. Add the route in `src/App.tsx`.

## Looking up shadcn components

Use the shadcn MCP tools (`list_shadcn_components`, `search_components`, `get_component_details`, `get_component_examples`) to look up components, props, and real usage examples **before** hand-rolling anything custom. For library/API questions beyond shadcn, the context7 MCP has up-to-date docs.

## Principles (the short version)

- **UI first** — elegant, functional UI built from shadcn components.
- **Small components** — split when one does more than one thing.
- **Logic in hooks** — components render, hooks think.
- **Module isolation** — no cross-module imports or shared state.
- **Reuse** — shadcn → shared → module-private, in that order.
