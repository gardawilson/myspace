# AGENTS.md

## Project overview

This repository contains a personal portfolio/resume website built with Next.js 16, React 19, TypeScript, Tailwind CSS 4, and Framer Motion. It uses the App Router and is configured as a fully static export.

Keep changes focused on the requested task. Preserve the existing visual language, responsive behavior, animations, and portfolio content unless the task explicitly asks to change them.

## Runtime and commands

- Required Node.js version: 20.9.0 or newer.
- Use npm as the default package manager because `README.md` and `package-lock.json` define the current npm workflow.
- On Windows PowerShell in this workspace, invoke `npm.cmd` because the execution policy may block `npm.ps1`.

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run build
npm.cmd run start
```

The development server is available at `http://localhost:3000` by default.

For linting, use the ESLint CLI directly:

```powershell
npm.cmd exec eslint .
```

The existing `npm run lint` script calls `next lint`, which is not supported by the installed Next.js version. Do not treat that script as the validation command unless the script is updated as part of the task.

There is currently no automated test suite. For code changes, run ESLint and a production build. For user-interface changes, also inspect the affected page at mobile and desktop widths when browser tooling is available.

## Repository map

- `src/app/layout.tsx`: root document, metadata, shared header, and footer.
- `src/app/page.tsx`: home page section composition and anchor IDs.
- `src/app/components/home/`: home-page sections.
- `src/app/components/layout/`: shared header, footer, and logo.
- `src/app/projects/[slug]/page.tsx`: statically generated project case-study pages.
- `src/app/skill-detail/[slug]/page.tsx`: statically generated skill detail pages.
- `src/app/globals.css`: Tailwind import, theme tokens, global utilities, base typography, animations, and print styles.
- `src/utils/image.ts`: base-path-safe helpers for asset and JSON URLs.
- `public/data/page-data.json`: contact, social, education, and skill content.
- `public/data/work-data.json`: project cards and case-study content.
- `public/images/`: images and icons served as static assets.
- `next.config.ts`: static export, unoptimized images, and trailing-slash configuration.

## Architecture constraints

- Keep the site compatible with `output: "export"`. Do not introduce server-only runtime features, API routes, middleware dependencies, cookies, request-time rendering, or other behavior that requires a persistent Next.js server unless the user explicitly changes the deployment model.
- Dynamic routes must remain enumerable at build time. When adding a project or skill slug, keep its route data and `generateStaticParams` behavior synchronized so `next build` can export the page.
- Use `getImgPath()` from `@/utils/image` for local image URLs and `getDataPath()` for client-side fetches from `public/data`. Direct root-relative paths can break deployments that set `NEXT_PUBLIC_BASE_PATH`.
- Store static files under `public/`; reference them by URL paths beginning with `/`, never by importing filesystem paths from `public`.
- Preserve `images.unoptimized: true` unless the static-hosting strategy changes.
- The contact form sends data to the external FormSubmit endpoint. Do not change the recipient, submit user data elsewhere, or add another external integration without an explicit request.

## React and Next.js conventions

- Prefer Server Components. Add `"use client"` only when a component needs state, effects, event handlers, animation/browser APIs, or client-side data fetching.
- Keep page and layout files aligned with App Router conventions.
- Use the `@/*` alias for imports from `src` when it makes imports clearer.
- Use `next/image` for rendered images and `next/link` for internal navigation unless there is a specific technical reason not to.
- Give exported data and component props explicit TypeScript types. Avoid `any`; validate unknown external or JSON data before relying on it.
- Keep effects deterministic and clean up timers, observers, and event listeners.
- Do not suppress TypeScript or ESLint errors broadly. Fix the cause or use the narrowest justified suppression with a comment.

## Styling and UI conventions

- Use Tailwind CSS utilities for component styling. Put genuinely global tokens, utilities, print rules, and animations in `src/app/globals.css`.
- Reuse theme colors such as `primary`, `secondary`, `softGray`, `mistGray`, and `gray` rather than scattering equivalent hex values.
- Follow the existing mobile-first responsive approach and the shared `.container` utility.
- Preserve visible keyboard focus, semantic landmarks, logical heading order, useful alternative text, and accessible labels for interactive controls.
- Respect reduced-motion preferences when adding substantial animation.
- Maintain the resume/PDF print experience. Changes to the header, footer, page breaks, backgrounds, or layout should be checked against the `@media print` rules.

## Content and asset changes

- Prefer editing `public/data/*.json` for portfolio content already modeled there instead of hard-coding duplicate content in components.
- Keep JSON valid, consistently formatted with two-space indentation, and compatible with the TypeScript interfaces that consume it.
- Project `slug` values currently contain the full internal route (for example, `/projects/example`). Keep this format consistent unless both the data model and all consumers are deliberately migrated.
- Optimize new images before committing when practical. Use descriptive filenames without unnecessary spaces or generated suffixes, and do not overwrite unrelated existing assets.
- Do not replace personal contact details, project claims, dates, or external profile URLs based on assumptions. Only use information supplied by the user or already present in the repository.

## Working practices

- Inspect the relevant component, data source, and shared utilities before editing.
- Preserve unrelated user changes and avoid broad formatting-only rewrites.
- Do not edit generated directories such as `.next/`, `out/`, or `node_modules/`.
- Do not commit secrets or local environment files. Public browser configuration must use the `NEXT_PUBLIC_` prefix and must not contain secrets.
- When dependencies change, update `package.json` and `package-lock.json` together. Do not update `pnpm-lock.yaml` as a side effect of npm commands.
- Update documentation when setup commands, data shapes, routes, or deployment assumptions change.

## Completion checklist

Before handing off a change, verify the items relevant to the task:

1. `npm.cmd exec eslint .` completes without new errors.
2. `npm.cmd run build` succeeds and static routes are exported.
3. New internal links, anchors, asset paths, and dynamic slugs resolve correctly.
4. The affected UI remains usable on mobile and desktop.
5. Interactive controls remain keyboard-accessible and labeled.
6. Resume printing or PDF export still works when the change touches printable content.
7. No generated output, secrets, or unrelated files were added.
