# MiniBank

A single-page application that simulates basic banking operations, built with **React + TypeScript + Vite**.

The focus is on code quality, architecture, correctness, and development practices. All data will live in memory for the duration of the session — there is no backend, database, or external API.

## Tech stack

- **React** (function components) + **TypeScript** (strict)
- **Vite** as build/dev tooling
- **SCSS** (Sass) for styling — global design tokens
- **Vitest** for tests
- **ESLint** + **Prettier** for linting and formatting
- **pnpm** as package manager

### Prerequisites

- Node.js 18+
- pnpm

### Install

```bash
pnpm install
```

### Scripts

```bash
pnpm dev           # start the dev server
pnpm build         # type-check and build for production
pnpm preview       # preview the production build
pnpm lint          # run ESLint
pnpm format        # format the codebase with Prettier
pnpm test          # run the test suite (Vitest)
```

## Project structure

```
src/
├─ domain/               # pure, framework-independent banking logic (unit-testable)
│  ├─ account.types.ts   # Account discriminated union (normal | savings)
│  └─ account.rules.ts   # overdraft limits, welcome bonus, canDebit
├─ styles/
│  └─ global.scss        # design tokens (CSS custom properties) + reset + base typography
├─ App.tsx               # root component
└─ main.tsx              # entry point
```

The `domain/`folder is holding the banking rules, it can be unit-tested in isolation.

The `@/` path alias points to `src/` (configured in `vite.config.ts` and `tsconfig.app.json`).
