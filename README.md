# MiniBank

A single-page application that simulates basic banking operations, built with **React + TypeScript + Vite**.

The focus is on code quality, architecture, correctness, and development practices. All data will live in memory for the duration of the session — there is no backend, database, or external API.

## Tech stack

- **React** (function components) + **TypeScript** (strict)
- **Vite** as build/dev tooling
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
├─ App.tsx        # root component
├─ main.tsx       # entry point
└─ index.css      # global styles (temporary — replaced by SCSS later)
```

The `@/` path alias points to `src/` (configured in `vite.config.ts` and `tsconfig.app.json`).
