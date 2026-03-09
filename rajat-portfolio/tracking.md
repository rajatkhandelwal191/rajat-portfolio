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
| 2026-03-02 | Frontend | Added dedicated `/contact` page with dual-theme form UI | Feature | Done | Integrated contact form, social icons, timeline dots, and consistent sidebar navigation |
| 2026-03-09 | Frontend | Moved detailed About content to dedicated `/about` page and kept home layout unchanged | UX Refactor | Done | Added colorful About route and updated nav/card links across pages |
| 2026-03-09 | Frontend | Connected RajatGPT chat UI to backend `/api/chat` and added RajatGPT icon in sidebar navigation | Feature | Done | Chat now sends real API requests, shows responses/errors, and nav includes smart_toy link on all pages |
| 2026-03-09 | Frontend | Added intent-based RajatGPT follow-up flows with direct section links and larger responsive chat panel | Feature | Done | GPT now suggests About/Projects/Experience/Contact navigation based on query intent with generic fallback CTA |
| 2026-03-09 | Backend + Frontend | Added structured interaction and error logging pipeline for terminal visibility | Feature | Done | FastAPI request/chat/ingest logs + frontend click/chat/error event forwarding to backend `/api/chat/frontend-event` |
| 2026-03-09 | Frontend | Added Next.js terminal logging endpoint for UI events | Fix | Done | Added `/api/frontend-log` and wired frontend logger to post events so clicks/errors show in frontend terminal |
| 2026-03-09 | Backend | Added cloud mode to skip FAISS/local embeddings and use Supabase text retrieval | Refactor | Done | Fly deployments can run without sentence-transformers/faiss packages; local mode remains available for ingestion |
| 2026-03-09 | Backend | Moved FAISS/embedding heavy dependencies to optional Poetry `local` group | Optimization | Done | Default install no longer pulls sentence-transformers/faiss/torch stack; use `poetry install --with local` for local ingestion workflows |
| 2026-03-09 | Backend | Implemented RajatGPT RAG backend with LangGraph + FastAPI + Groq + FAISS + Supabase pgvector | Feature | Done | Added pydantic graph state, tool-node retrieval, ingestion endpoint, markdown profile knowledge base, and vector storage pipeline |
| 2026-03-09 | Backend | Forced initial retrieval before answer generation in LangGraph flow | Quality | Done | Seeded FAISS + Postgres tool calls before final LLM response to improve grounding |
| 2026-03-09 | Backend | Added Gemini embedding provider support for cloud semantic retrieval | Feature | Done | Added `EMBEDDING_PROVIDER` auto/local/gemini/none, Gemini REST embedding client, FAISS gating by provider, and keyword fallback on embedding errors |

## Bug Fixes
| Date | Bug | Root Cause | Fix | Status |
|---|---|---|---|---|
| 2026-03-02 | Next.js build failed with `Cannot find namespace JSX` | Return type used `JSX.Element` without namespace resolution in current TS config | Removed explicit JSX return type from page component | Done |
| 2026-03-02 | `Cannot find module for page: /_document` during build | Stale `.next` build cache state after major page refactor | Cleared `.next` and rebuilt successfully | Done |
| 2026-03-02 | `/projects` appeared unstyled in dev | CSS asset generation instability with unsupported `color-mix(...)` rule in dev pipeline | Replaced with variable-based hover border color and rebuilt | Done |
| 2026-03-09 | Frontend build failed in sandbox with `spawn EPERM` | Windows sandbox restriction during Next.js build process | Re-ran `npm run build` with elevated permissions for successful verification | Done |
| 2026-03-09 | Backend import failed while loading app | Embeddings model was eagerly initialized at module import time | Switched embedding initialization to lazy loading in retrieval service | Done |
| 2026-03-09 | Poetry lock resolution failed for `faiss-cpu` | Project Python range allowed unsupported Python versions for FAISS wheels | Restricted backend Python range to `>=3.11,<3.13` and regenerated lockfile | Done |
| 2026-03-09 | Docker backend install step failed | Poetry attempted to install root package without package config | Switched Docker install command to `poetry install --no-root` | Done |
| 2026-03-09 | Backend failed to read root `.env` from backend runtime directory | Settings only loaded `.env` from backend path | Updated settings env sources to include `../.env` fallback | Done |
| 2026-03-09 | Backend startup crashed on `ALLOWED_ORIGINS` parsing | pydantic-settings attempted JSON decoding for list field from dotenv | Disabled automatic complex decoding and kept custom CSV parser | Done |

## Next Tasks
- [ ] Initialize Next.js app dependencies and scripts
- [x] Build first landing page sections (hero, about, projects, contact)
- [x] Add chatbot UI shell with Framer Motion
- [ ] Implement FastAPI chat route + health route
- [x] Implement FastAPI chat route + health route
- [ ] Wire frontend to backend via `NEXT_PUBLIC_API_BASE_URL`
- [x] Add Supabase pgvector integration and retrieval flow
- [ ] Add Docker setup validation for fly.io deployment

