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

## Bug Fixes
| Date | Bug | Root Cause | Fix | Status |
|---|---|---|---|---|
| 2026-03-02 | Next.js build failed with `Cannot find namespace JSX` | Return type used `JSX.Element` without namespace resolution in current TS config | Removed explicit JSX return type from page component | Done |

## Next Tasks
- [ ] Initialize Next.js app dependencies and scripts
- [x] Build first landing page sections (hero, about, projects, contact)
- [x] Add chatbot UI shell with Framer Motion
- [ ] Implement FastAPI chat route + health route
- [ ] Wire frontend to backend via `NEXT_PUBLIC_API_BASE_URL`
- [ ] Add Supabase pgvector integration and retrieval flow
- [ ] Add Docker setup validation for fly.io deployment

