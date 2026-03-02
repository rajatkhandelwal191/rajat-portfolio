# Tracking Log

## Project Setup
- [x] Monorepo scaffold created (frontend + backend)
- [x] Base env/config files added
- [x] Initial README and run instructions added

## Work Log
| Date | Area | Change | Type | Status | Notes |
|---|---|---|---|---|---|
| 2026-03-02 | Repo | Initial structure scaffolded | Setup | Done | Created frontend/backend skeleton and configs |
| 2026-03-02 | Env | Added Groq model/API key and Supabase DB URL | Config | Done | Added URL-encoded DB password in connection string |
| 2026-03-02 | Frontend | Implemented full dual-theme portfolio UI with Framer Motion and glassmorphism cards | Feature | Done | Added theme toggle, animated cards, nav, and chatbot shell |
| 2026-03-02 | Frontend | Integrated featured projects screen into main page for both light/dark themes | Feature | Done | Added gradient project cards, side rails, CTA section, and theme-aware styling |
| 2026-03-02 | Frontend | Restored original home/about navigation flow and moved featured projects into dedicated projects section | Fix | Done | Reverted nav style and preserved previous home section structure |
| 2026-03-02 | Frontend | Split featured projects into dedicated `/projects` page and kept home screen cards-only | Feature | Done | Added nav hover labels and route-based project view |
| 2026-03-02 | Frontend | Renamed projects screen label to Project Page and added hover tooltips for footer icons | UX | Done | Replaced unclear icons with labeled GitHub/LinkedIn/Email actions |
| 2026-03-02 | Frontend | Renamed project route folder from `projects` to `project-page` | Refactor | Done | Updated all navigation links to `/project-page` |
| 2026-03-02 | Frontend | Restructured projects route to keep `project-page.tsx` as main file under `app/projects` | Refactor | Done | `app/projects/page.tsx` now wraps and exports `./project-page` to satisfy Next.js |
| 2026-03-02 | Frontend | Simplified projects route back to single `app/projects/page.tsx` file | Refactor | Done | Removed `project-page.tsx` per preference and kept `/projects` |
| 2026-03-02 | Frontend | Added dedicated `/experience` timeline page with dark/light theme support | Feature | Done | Integrated glass cards, timeline bullets, nav, and theme toggle |
| 2026-03-02 | Frontend | Standardized experience sidebar nav to match home/projects exactly | UX Fix | Done | Unified nav shape, icon set, active color, and hover labels |

## Bug Fixes
| Date | Bug | Root Cause | Fix | Status |
|---|---|---|---|---|
| 2026-03-02 | Next.js build failed with `Cannot find namespace JSX` | Return type used `JSX.Element` without namespace resolution in current TS config | Removed explicit JSX return type from page component | Done |
| 2026-03-02 | `Cannot find module for page: /_document` during build | Stale `.next` build cache state after major page refactor | Cleared `.next` and rebuilt successfully | Done |
| 2026-03-02 | `/projects` appeared unstyled in dev | CSS asset generation instability with unsupported `color-mix(...)` rule in dev pipeline | Replaced with variable-based hover border color and rebuilt | Done |

## Next Tasks
- [ ] Initialize Next.js app dependencies and scripts
- [x] Build first landing page sections (hero, about, projects, contact)
- [x] Add chatbot UI shell with Framer Motion
- [ ] Implement FastAPI chat route + health route
- [ ] Wire frontend to backend via `NEXT_PUBLIC_API_BASE_URL`
- [ ] Add Supabase pgvector integration and retrieval flow
- [ ] Add Docker setup validation for fly.io deployment

