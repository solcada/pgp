# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `bun run dev` (uses --turbopack flag)
- **Build**: `bun run build` (uses --turbopack flag for faster builds)
- **Production start**: `bun start`
- **Linting**: `bun run lint` (ESLint with Next.js configuration)

## Project Architecture

This is a Next.js 15 application using:
- **Framework**: Next.js 15.5.2 with App Router
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS 4 with shadcn/ui components
- **Package Manager**: Bun (based on bun.lock presence)
- **Build Tool**: Turbopack for faster development and builds

### Key Dependencies

- **UI Components**: shadcn/ui with Radix primitives (@radix-ui/react-*)
- **Styling**: class-variance-authority, clsx, tailwind-merge for component styling
- **Icons**: lucide-react
- **Command Menu**: cmdk

### Directory Structure

- `app/`: Next.js App Router pages and layouts
- `components/ui/`: shadcn/ui component library
- `components/test/`: Test components
- `lib/`: Utility functions (includes utils.ts for cn() helper)
- `public/`: Static assets

### shadcn/ui Configuration

The project uses shadcn/ui with:
- Style: "new-york"
- Base color: "neutral" 
- CSS variables: enabled
- Components path: `@/components`
- Utils path: `@/lib/utils`

### TypeScript Configuration

- Path mapping: `@/*` points to root directory
- Target: ES2017
- Module resolution: bundler
- JSX: preserve (handled by Next.js)

## Current State

The project appears to be in early development with:
- Basic Next.js setup complete
- shadcn/ui components configured  
- Some UI components present but may need cleanup (combobox.tsx deleted, simple-combobox.tsx added)
- Modified app/page.tsx (uncommitted changes)