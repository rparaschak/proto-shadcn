# Proto Shadcn - Rapid Feature Prototyping

## What This Is
A prototyping platform where product managers create and navigate feature prototypes via a module selector in the header. Each module = one feature, fully isolated.

## Workflow
When user starts a chat, check if local app is running using curl. 
If not run `npm start` and give the url to the user
When user is done, commit and push the code

## Commands
- `npm start`

## Rules
- You can work only on a single module/feature in the same chat. If user starts working on other feature suggest starting a new chat before you continue.
- When given a feature description, create MD file in the module directory describing the feature

## Stack
React 19 + TypeScript, Vite, React Router, Tailwind CSS v4, shadcn/ui (New York style, Stone base color), Lucide icons, Recharts

## Architecture

### Routing
- **App-level router** (`src/App.tsx`) maps URL paths to modules using React Router
- **Each module has its own `<Routes>`** for internal page navigation with proper URL paths
- Header contains a **module selector** dropdown for navigating between features
- **Module registry** (`src/modules/registry.ts`) — single source of truth for all modules. Both the router and Layout consume this.

### Module Structure
Each module lives in `src/modules/[module-name]/` and is completely isolated:
```
src/modules/[module-name]/
├── [ModuleName].tsx          # Root component (internal Routes + sidebar nav)
├── components/               # Module-private components (small, focused)
├── hooks/                    # Business logic lives here, not in components
├── data/                     # Test data + TypeScript interfaces
└── [ModuleName].css          # Optional module-specific styles
```

### Component Guidelines
- **Prefer small, focused components.** If a component grows beyond ~80-100 lines or renders multiple distinct sections, split it. Each component should do one thing.
- **Extract repeated patterns** into reusable components (e.g., a card wrapper used 6 times → StatCard).
- **Components are purely presentational.** They receive data via props and emit events via callbacks. No business logic in components.
- **Business logic belongs in hooks** (`hooks/` folder). Navigation, data transformations, filtering, state machines — all go into custom hooks. Components call hooks and render the result.

### Component Hierarchy (follow this order)
1. **shadcn/ui** (`src/components/ui/`) — use existing shadcn components first
2. **Shared components** (`src/components/`) — reusable across modules; create here if no shadcn option exists
3. **Module-private components** (`src/modules/[name]/components/`) — only if truly module-specific

### Data
- All test/mock data lives in `data/` folder within the module
- Export TypeScript interfaces alongside the data
- Modules never share data — each has its own

## Adding a New Module
1. Create folder `src/modules/[module-name]/`
2. Create root component with `<Routes>` for internal navigation
3. Add test data in `data/` subfolder
4. Add hooks in `hooks/` subfolder for any business logic
5. Register module in `src/modules/registry.ts`
6. Add route in `src/App.tsx`

## Principles
- **UI first**: Focus on elegant, functional UI using shadcn components
- **Small components**: Split when a component does more than one thing or exceeds ~100 lines
- **Logic in hooks**: Components render, hooks think. No `useState` for business logic in components.
- **Module isolation**: No cross-module imports, no shared state between modules
- **Reuse components**: Always check shadcn → shared → then build module-private

## Shadcn MCP
Use shadcn MCP tools to look up components, examples, and details before building custom ones.
