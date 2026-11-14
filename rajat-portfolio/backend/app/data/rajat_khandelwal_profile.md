# Rajat Khandelwal Profile

Rajat Khandelwal (He/Him)  
AI Engineer — GenAI & LLM Specialist — Azure Cloud & DevOps  
Location: Delhi, India  
Email: rajatkhandelwal191@gmail.com | Phone: +91-9461115167  
LinkedIn: https://linkedin.com/in/rajatkhandelwal27 | GitHub: https://github.com/rajatkhandelwal191  
Resume / CV: [Download Rajat's Resume](/Rajat_Khandelwal_Resume.pdf)

## Summary

Lead AI Engineer and Full Stack Developer with 4.5+ years of experience at Tata Consultancy Services Ltd (TCS), architecting and deploying enterprise-grade AI systems, agentic workflows, and cloud-native platforms for Fortune 500 clients such as Enbridge, Exelon, and Outokumpu.

Currently working at TCS as a Lead AI Engineer and Full Stack Developer, delivering solutions across major enterprise client engagements including Enbridge’s EOL Agent platform, Exelon’s Infra Operations agentic workflows, and Outokumpu’s multilingual enterprise chatbot.

Specialized in Agentic AI workflows, Microsoft Agent Framework, LangChain/LangGraph, RAG pipelines, full-stack web architectures, and Azure cloud infrastructure. Proven track record of reducing manual operations effort by 70-80% through intelligent automation, designing resilient agent orchestration patterns, and delivering zero-SLA-breach production systems.

Core skills & competencies:
- Generative AI, Conversational AI, Agentic AI Systems, Microsoft Agent Framework, LangGraph, LangChain, LlamaIndex
- Cloud and DevOps: Azure (Web Apps, Container Apps, Functions, Durable Functions, Blob Storage, Cosmos DB, PostgreSQL Flexible Server), Bicep, Docker, Kubernetes, GitHub Actions CI/CD
- Full-stack & APIs: React, TypeScript, Vite, Python 3.12, FastAPI, Node.js, Next.js, MSAL, NGINX
- RAG, Semantic Search & Web Grounding: Azure AI Search, Blob documents, text-embedding-3-small, Microsoft Foundry web grounding, SAS URLs, Qdrant, FAISS, pgvector
- Data Engineering & Ingestion: ServiceNow CMDB (cmdb_ci_business_app, cmdb_ci_win_server, cmdb_rel_ci), PostgreSQL Flexible Server, snapshot reconciliation, SHA-256 deterministic IDs
- Identity, Security & Networking: Microsoft Entra ID (SSO), Managed Identities, Service Principals, GitHub OIDC, RBAC, Key Vault secretless architecture, VNets, Private Endpoints, Private DNS, NSGs
- Observability: Application Insights, Log Analytics, OpenTelemetry, KQL, Azure Workbooks

## Current Preferences

- Open to work for: Full Stack Engineer, Web Developer, Back End Developer, Artificial Intelligence Engineer, and Generative AI Engineer roles
- Followers: 528
- Connections: 462

## Experience

### Tata Consultancy Services Ltd (TCS) (December 2021 - Present)

Rajat Khandelwal is currently working at Tata Consultancy Services (TCS) as a Lead AI Engineer and Full Stack Developer. Across his tenure at TCS, he has engineered and delivered enterprise-grade AI, full-stack, and cloud solutions for major global clients including **Enbridge**, **Exelon**, and **Outokumpu**.

#### Lead AI Engineer / Full Stack Developer - EOL Agent Platform (Client: Enbridge) (2025 - Present)

##### 1. Overall Role and Solution Scope
- Full Stack Developer / AI Engineer at TCS working on the EOL Agent platform for client Enbridge.
- End-to-end engineering of an AI-assisted Windows Server End-of-Life (EOL) management solution.
- Scope spans: React-based user experience, Python/FastAPI backend services, Microsoft Agent Framework agents and tools, ServiceNow CMDB ingestion and relationship mapping, PostgreSQL data persistence, Azure AI Search document retrieval, Microsoft Foundry and Azure OpenAI integration, containerized application hosting, Azure networking, identity, and access configuration, Infrastructure as Code (Bicep) and automated deployment workflows (GitHub Actions), application telemetry, operational troubleshooting, and technical documentation.
- Documented delivery scope explicitly includes: backend AI development, frontend development, Azure cloud configuration, networking, RBAC, ACR, and GitHub Actions.

##### 2. What the EOL Agent Use Case Does
The platform brings together CMDB inventory, lifecycle evidence, application ownership, AI-generated recommendations, and operational workflows.
Key capabilities developed as part of the solution:
- Application-to-server mapping: Identify which Windows servers support a business application.
- Server-to-application mapping: Search a server and inspect its associated applications and ownership.
- Owner-focused inventory views: Display application and server estates with lifecycle status, operating system, criticality, and environment information.
- EOL identification: Identify expired assets and assets approaching end of support within a selected time window.
- EOL chatbot: Answer inventory, ownership, lifecycle, and remediation questions using approved tools and evidence.
- Remediation planning: Generate grouped recommendations covering upgrade, migrate, replace, defer through ESU (Extended Security Updates), or retire.
- Evidence-backed answers: Provide references to retrieved documents and authoritative lifecycle sources.
- ServiceNow workflow handoff: Direct users to existing lifecycle-management forms for operational requests.
- Notification integration: Support the wider owner-notification workflow and subsequent inventory refresh.
- Scope & MVP boundaries: The current MVP is recommendation-oriented, not an autonomous remediation engine. It does not automatically upgrade, migrate, or retire servers. Windows Server is the initial scope; Linux, hardware, and additional discovery sources are broader roadmap items.

##### 3. Full-Stack Frontend Development
- Technologies: React, TypeScript, JavaScript, Vite, Node.js/npm, MSAL, NGINX.
- Developed and integrated the React/Vite application with FastAPI APIs.
- Built and enhanced key UI components: Agentic AI Hub, dashboard, inventory views, EOL chatbot, remediation-plan interface, ticket-navigation components, server/workspace panels, ticket-generator, and notification interface.
- Managed frontend environment configuration through VITE_* variables.
- Configured backend API connectivity for local and deployed environments.
- Integrated Microsoft Entra ID sign-in through MSAL (Microsoft Authentication Library), handling login, logout, protected routes, and authentication redirects.
- Packaged frontend via multi-stage Docker build: Node.js build stage -> NGINX runtime Docker image serving the compiled SPA on port 8080 with NGINX SPA fallback routing.
- Accurate Node.js positioning: Node.js is primarily part of the frontend development and build toolchain. The main application backend is Python/FastAPI, rather than a separately evidenced Node.js backend.

##### 4. Python and FastAPI Backend Engineering
- Technologies: Python 3.12, FastAPI, Azure SDKs, uv, pytest, Ruff.
- Built high-performance REST APIs for chatbot, inventory, ingestion handoff, and remediation capabilities.
- Defined typed request/response contracts and citation models with Pydantic.
- Integrated PostgreSQL, Azure AI Search, Microsoft Foundry, Azure OpenAI, Blob Storage, and Azure Key Vault.
- Architecture: Clean separation of routes, agents, tools, repositories, configuration, and workflow logic.
- Restructured backend from a monolithic chatbot workflow toward capability-based agent packages and clearer shared-tool boundaries.
- Managed dependencies through pyproject.toml and uv.lock; built reproducible container images using `uv sync --frozen`.
- Implemented environment-specific configuration, authentication behavior, code comments, docstrings, Ruff linting, and automated pytest suites.

##### 5. Microsoft Agent Framework and Agentic AI
- Implemented orchestration using Microsoft Agent Framework.
- Connected agents to structured CMDB inventory tools and unstructured document-search tools.
- Defined agent instructions, system prompts, tool schemas/descriptions, and strict domain boundaries.
- Distinguished inventory questions (queried from structured PostgreSQL CMDB data) from lifecycle-document questions (retrieved via Azure AI Search).
- Required approved tool use instead of relying on model parametric memory.
- Separated conversational tool use from genuinely multi-stage, stateful workflows.
- Organized EOL-specific agents and prompts separately from reusable platform capabilities.
- Supervisor-to-Specialist Optimization: Tested supervisor-to-specialist delegation and identified unnecessary model round trips. Provided the supervisor direct access to inventory and document-search tools, reducing avoidable orchestration overhead and eliminating 30–50+ seconds of additional latency reported in the earlier nested-call pattern.
- Evidence and Citation Controls: Implemented request-scoped evidence tracking through `RunEvidence`. Built citations strictly from actual tool execution results, avoiding treating model-generated citation markers as proof of retrieval, and strengthened routing and grounding instructions.

##### 6. Azure AI Search and RAG
- Integrated Azure AI Search as the document-retrieval layer for lifecycle policy and documentation.
- Implemented Blob-backed document ingestion, index schema design, metadata extraction, retrieval configuration, and embedding-based search using `text-embedding-3-small`.
- Connected retrieved lifecycle guidance directly into chatbot and remediation-plan responses.
- Maintained clear architectural separation: structured CMDB inventory queries in PostgreSQL vs. unstructured document retrieval in Azure AI Search.
- Evaluated embedding choices and resolved document extraction, indexing, metadata, and source-link issues.
- Secure Document Citations: Restored `document_sas_url` through search and citation response models. Implemented account-key SAS for local testing and user-delegation SAS through managed identity for cloud execution, including delegation-key caching. Prioritized `metadata_storage_path` with a `document_id` decoding fallback when source metadata is empty.

##### 7. Microsoft Foundry, Azure OpenAI, and Web Grounding
- Integrated Azure-hosted models (Azure OpenAI) with agent workflows, configuring model endpoints, authentication, and environment settings.
- Implemented Microsoft Foundry-based web grounding for authoritative Windows Server lifecycle dates.
- Restricted lifecycle evidence strictly to approved Microsoft official sources.
- Normalized equivalent operating-system labels into canonical versions (e.g. mapping varied OS string representations to standard releases).
- Validated returned source URLs, confidence metrics, and date formats before ingestion.
- Persisted validated lifecycle evidence and mappings in PostgreSQL.
- Security enhancement: Replaced initial Foundry API-key implementation with secretless Managed Identity authentication, validating Entra bearer-token grounding requests and applying validated lifecycle dates to matching CMDB relationships.

##### 8. ServiceNow CMDB Integration and Data Engineering
- Ingestion pipeline consuming ServiceNow REST Table APIs for:
  - `cmdb_ci_business_app` (Business Applications)
  - `cmdb_ci_win_server` (Windows Servers)
  - `cmdb_rel_ci` (CI Relationships)
- Investigated complex application-to-server relationship paths, resolving relationships through intermediary Configuration Items (CIs) where direct links were absent.
- Handled paginated API extraction, schema normalization, and validation of source records.
- Built relationship bridges and merged application/server datasets while preserving raw responses and audit information.
- Implemented deterministic relationship identifiers using SHA-256 hashing.
- Applied transactional PostgreSQL staging, upserts, and snapshot reconciliation: full-snapshot refresh with relationship resolution, transactional updates, and pruning/removal of rows absent from a successfully completed snapshot.
- Status distinction: Implemented robust CMDB ingestion and reconciliation, with subsequent incremental/delta-ingestion enhancements.

##### 9. PostgreSQL Flexible Server
- Connected backend services and Azure Functions workloads to Azure Database for PostgreSQL Flexible Server.
- Designed relational schemas for source snapshots, CI relationships, merged inventory, lifecycle evidence, and audit logs.
- Implemented optimized application/server mapping queries and indexing.
- Validated ACID transactions, updates, rollback behavior, and fine-grained database permissions.
- Configured private networking and secure connection pooling.
- Handled credentials via Azure Key Vault where password authentication was used, and engineered Managed Identity / Entra ID authentication configurations where enabled.

##### 10. Azure Functions, Durable Functions, and Azurite
- Developed Python Azure Functions for both scheduled (timer-triggered) and manually triggered CMDB ingestion.
- Utilized Azure Durable Functions to orchestrate long-running, multi-step asynchronous processing: extraction, transformation, validation, persistence, enrichment, and run-status activities.
- Packaged Functions as custom Linux containers and deployed/validated workloads on Azure Container Apps.
- Configured runtime identities, storage access (Blob, Queue, Table), secrets, and health endpoints.
- Leveraged Azure Functions Core Tools and Azurite emulator for local development and integration testing.

##### 11. Docker, ACR, and Azure Application Hosting
- Maintained separate container images for backend (FastAPI), frontend (NGINX), and ingestion (Functions).
- Created multi-stage Dockerfiles and `.dockerignore` configurations optimized for small image footprints and fast builds.
- Published container images to Azure Container Registry (ACR) using immutable Git commit SHA tags.
- Configured container-based Azure Web Apps (App Service) with managed-identity ACR image pull.
- Managed Azure Container Apps revisions for the Functions ingestion workload.
- Troubleshot private ACR network access, runner build capabilities, image pull permissions, container startup sequences, and deployment failures.

##### 12. Azure Networking and Private Connectivity
- Configured and validated application private connectivity, and coordinated centrally owned network, DNS, firewall, NSG, and NSP changes.
- Designed and validated Virtual Networks (VNets) and delegated subnets.
- Configured App Service outbound VNet integration and dedicated private-endpoint subnets.
- Implemented and validated Private Endpoints for application and data services (PostgreSQL, Storage, Key Vault, AI Search).
- Configured Private DNS Zones, resolution, and VNet zone-link ownership.
- Validated Network Security Groups (NSGs), route tables, firewall egress rules, and service reachability.
- Coordinated cross-region application/service connectivity dependencies across East US 2, West US 2, and Canada Central.
- Managed Blob, Queue, and Table private connectivity for Durable Functions and Container Apps environment subnets.
- Conducted Network Security Perimeter (NSP) access-policy troubleshooting.

##### 13. Identity, IAM, and Secretless Authentication
Architected a strict three-layer identity model separating privileges:
1. Infrastructure Service Principal: Used for Bicep provisioning, ARM validation, and infrastructure configuration.
2. GitHub Deployment Identity: Used for container build/push to ACR and application releases via GitHub OIDC federation.
3. Runtime Managed Identity: Used by running applications for secretless access to Azure services (Key Vault, PostgreSQL, AI Search, Storage, Azure OpenAI, Foundry).
- Implemented `DefaultAzureCredential` with runtime `AZURE_CLIENT_ID`.
- Configured resource-scoped Role-Based Access Control (RBAC): ACR push/pull, Managed Identity Operator, Key Vault Secrets User, Storage Blob Data Contributor/Reader, Search Index Data Contributor, Cognitive Services OpenAI User.
- Achieved secretless architecture where managed identity or OIDC is supported, with remaining legacy integration credentials securely vaulted in Azure Key Vault.

##### 14. Microsoft Entra ID, SSO, and User Access
- Frontend Single Sign-On (SSO) via Microsoft Entra ID using MSAL (Microsoft Authentication Library).
- Configured Azure App Registrations, tenant/client IDs, redirect URIs, and logout URIs.
- Backend JWT bearer-token validation: verified token signature, tenant ID, and audience claims (`aud`).
- Architectural separation between user-facing API authentication and internal service-to-service API access.
- Coordinated AD/Entra security-group memberships for role-based authorization of approved users.
- Prepared independent QA authentication configuration, internal API-key validation, and environment-specific Key Vault handling.

##### 15. Bicep, IAM Workflows, and GitHub Actions CI/CD
- Authored modular Infrastructure as Code (IaC) using Azure Bicep for application hosting, container apps, and private endpoints.
- Maintained environment-specific `.bicepparam` parameter files across DEV, QA, and PROD.
- Automated CI pipeline steps: Bicep linting, ARM template validation, and `what-if` deployment checks (e.g. validated QA hosting deployment with 5 creates, 0 modifications, 0 deletions).
- Maintained GitHub Actions CI/CD workflows for infrastructure deployment, IAM alignment, and container deployment.
- Configured OIDC login to Azure without stored secrets, environment approvals, designated reviewers, and branch-based deployment gates.
- Built, tagged (immutable Git commit SHA), pushed, and deployed backend, frontend, and Functions containers.
- Strictly separated infrastructure provisioning workflows from application release pipelines.

##### 16. Application Insights, Log Analytics, and Observability
- Configured Azure Application Insights connected to a shared Log Analytics workspace.
- Implemented backend OpenTelemetry-based telemetry export capturing request, trace, session, and job identifiers.
- Designed authenticated-user attribution using privacy-aware actor identifiers.
- Tracked capability usage, agent execution, tool calls, model invocations, token consumption, latency, and operational outcomes.
- Built custom Azure Workbook dashboards for operational visibility and monitoring.
- Analyzed App Service diagnostic logs and telemetry via Kusto Query Language (KQL).
- Troubleshot ingestion connection resets, coordinating firewall and Network Security Perimeter (NSP) diagnostics.

##### 17. Azure CLI, Testing, Documentation, and Knowledge Transfer
- Utilized Azure CLI for deep resource inspection, RBAC auditing, container logs, and network connectivity validation.
- Performed local development authentication via `az login` for Azure SDK integration testing.
- Conducted comprehensive API testing using Postman collections.
- Maintained code quality and reliability with `pytest` unit/integration test suites and `Ruff` linting/formatting.
- Conducted database transaction validation, rollback verification, and data-quality reconciliation checks.
- Prepared user acceptance testing (UAT) scenarios and supported stakeholder demonstrations.
- Authored comprehensive architecture blueprints, build books, Standard Operating Procedures (SOPs), runbooks, data lineage diagrams, and troubleshooting guides.
- Onboarded team members to the codebase, Azure infrastructure, SSO configurations, branching strategies, PR workflows, and deployment lifecycles.

##### Consolidated Technical Stack (Enbridge EOL Agent Platform)
- Frontend: React, TypeScript, JavaScript, Vite, Node.js/npm, MSAL, NGINX
- Backend: Python 3.12, FastAPI, REST APIs, Azure SDKs, uv, Ruff, pytest
- Agentic AI: Microsoft Agent Framework, agent orchestration, tool calling, system prompts, RunEvidence tracking
- Models & Grounding: Azure OpenAI, Microsoft Foundry, embeddings, approved-source web grounding
- Retrieval: Azure AI Search, Blob documents, RAG, metadata, citations, SAS URLs (user-delegation & account-key)
- Data: Azure Database for PostgreSQL Flexible Server, SQL, CMDB relationships, normalization, reconciliation
- Background Processing: Azure Functions, Azure Durable Functions, timers, HTTP triggers, Azurite
- Hosting: Docker, Azure Container Registry (ACR), Azure Web Apps (App Service), Azure Container Apps
- Security: Microsoft Entra ID (SSO), Managed Identities, Service Principals, RBAC, GitHub OIDC, Azure Key Vault
- Networking: VNets, delegated subnets, private endpoints, private DNS, NSGs, firewall/NSP coordination
- Automation: Azure Bicep, GitHub Actions CI/CD, IAM configuration, approval-gated deployments
- Observability: Azure Application Insights, Log Analytics, OpenTelemetry, KQL, Azure Workbooks
- Engineering Tools: Azure CLI, VS Code, Git, Postman, pytest, Ruff

##### Reusable Professional Summary
"I am currently working at Tata Consultancy Services (TCS) as a Lead AI Engineer and Full Stack Developer, delivering enterprise AI systems, full-stack applications, and cloud solutions for major global clients including Enbridge, Exelon, and Outokumpu. For Enbridge, I engineered the EOL Agent platform, developing React/TypeScript interfaces, Python/FastAPI services, Microsoft Agent Framework workflows, and evidence-grounded AI capabilities using Azure OpenAI, Microsoft Foundry, and Azure AI Search. My responsibilities also include ServiceNow CMDB ingestion through Azure Durable Functions, PostgreSQL data engineering, Docker-based Azure hosting, Bicep infrastructure automation, GitHub Actions CI/CD, Entra SSO, managed identities, private connectivity, and application observability."

##### Supporting Technical References & Status Distinction
- Wording clearly distinguishes completed hands-on implementation from shared-team capabilities, centrally managed infrastructure changes, and deployment-readiness activities (e.g. Bicep QA what-if validated with 5 creates, ready for gated deployment).
- Current MVP is recommendation-oriented for Windows Server End-of-Life management; Linux, hardware, and additional discovery sources represent roadmap items.

#### Lead AI Engineer - Agentic AI Workflow for Infra Operations (ITIS) (Client: Exelon) (August 2025 - Present)
- Designed and implemented an agentic AI ecosystem for enterprise client Exelon across heatmap, incident, patch compliance, and drive cleanup workflows.
- Automated daily, weekly, and monthly audit-ready reporting pipelines using LangGraph, Python, FPDF, and Azure Blob Storage.
- Built resilient orchestration with schema-driven outputs, chunking and retry logic, and spawned long-running task handling.
- Implemented blob leasing and locking with idempotent execution to prevent race conditions and duplicate report generation.
- Reduced manual Infra Ops effort by about 70 to 80 percent while improving stability, governance, and triage standardization.
- Tech tags: LangGraph, LangChain, Python, Azure Blob Storage, Streamlit, Plotly, FPDF, GitHub Actions.

Key detailed implementation:
- Delivered multiple production-grade AI agents:
  - Heatmap Analysis AI Agent with LangGraph reusable nodes, deterministic JSON prompts, and recurring issue trend detection.
  - Patching Analysis AI Agent with iPatch validation, compliance KPI computation, patch-incident correlation, and automated PDF reports.
  - Incident Analysis AI Agent with governed historical-resolution retrieval for faster RCA.
  - Drive Cleanup Agent for filesystem incident classification and standardized triage.
- Engineered advanced orchestration patterns:
  - Branching and fallback LangGraph flows.
  - Token/rate limit handling with chunking, retries, and timeout control.
  - Spawn-based execution for workloads beyond 240 seconds.
  - Real-time status tracking to improve user visibility during long-running report jobs.
- Built enterprise-grade Azure Blob locking/leasing/caching:
  - Single-writer guarantees and race-condition protection.
  - Cached SAS URL reuse for repeated runs to improve response time and reduce cloud cost.
- Resolved high-impact production blockers:
  - Long-running request failures.
  - Token overflow and model rate limits.
  - Duplicate PDF generation under concurrency.
  - RAG/Cosmos/indexing configuration failures.
  - Merge-conflict regressions via DRY refactor and CI/CD improvements.

#### Lead Developer - User Analysis Project (TCS Innovista) (November 2024 - August 2025)
- Built an end-to-end AI automation pipeline for ITSM user analysis from file upload to dashboard insights.
- Implemented Azure Blob event-driven workflows with Azure Functions for scalable asynchronous processing.
- Delivered NLP-powered ticket classification, sentiment analysis, and summarization using HuggingFace models.
- Processed high-volume ticket datasets (around 100K records) to cut manual analysis timelines from weeks to automated runs.
- Enabled automation opportunity discovery and recurring incident pattern detection with Cosmos DB and Power BI analytics.
- Tech tags: Python, Azure Blob Storage, Azure Functions, Cosmos DB, HuggingFace, Power BI, AKS, Docker.

Key detailed implementation:
- Data ingestion system:
  - Built upload portal for CSV/XLSX datasets up to 100 MB and around one lakh ticket records.
  - Validated schema columns and persisted uploads to Azure Blob Storage.
- Blob-based processing pipeline:
  - Azure Function triggers for decoupled, scalable asynchronous batch workflows.
- Preprocessing pipeline:
  - Text cleaning, normalization, column mapping, category dictionary mapping, and structured dataset creation.
- NLP/ML pipeline:
  - HuggingFace Transformers with BART, T5, and Pegasus for summarization and text transformation.
  - Libraries and runtime: transformers, PyTorch/TensorFlow, NumPy, Pandas, NLTK, spaCy.
- Analytics features:
  - Ticket categorization, sentiment analysis (positive/neutral/negative), and ticket summarization.
  - Repeated issue and automation-candidate detection from incident patterns.
- Storage and visualization:
  - Processed outputs stored in Cosmos DB.
  - Power BI dashboards for distribution trends, sentiments, recurring categories, and automation opportunities.
- Infra and scaling:
  - Azure Blob Storage, Azure Functions, AKS, ACI, Azure App Service, Azure Service Bus.
  - Containerized processing with Docker on AKS/ACI.
  - GPU VM stack with NVIDIA, CUDA, cuDNN for accelerated transformer inference.
- Simplified pipeline:
  - Ticket upload -> Blob -> Function trigger -> preprocessing -> NLP model inference -> classification/sentiment -> Cosmos DB -> Power BI.

#### Developer / Core Chatbot Developer - OTK Chatbot Implementation (Outokumpu) (December 2021 - October 2024)
- Developed a multilingual enterprise chatbot with GenAI and RAG-based retrieval capabilities.
- Integrated OpenAI APIs, vector embeddings, and LangChain workflows for knowledge-driven responses and prompt automation.
- Built Node.js chatbot backend with Python Flask ML services in a microservice architecture.
- Delivered enterprise integrations across ServiceNow, Genesys Chat, Twilio, Redis, and Microsoft Adaptive Cards.
- Owned Azure deployment and CI/CD execution with strong reliability outcomes, including zero SLA breaches.
- Tech tags: Yellow.ai, Node.js, Python, LangChain, OpenAI APIs, Azure DevOps, ServiceNow, Redis.

Key detailed implementation:
- Multilingual chatbot and GenAI:
  - Built ML model workflows in Python/Jupyter and integrated into chatbot architecture.
  - Developed RAG retrieval with vector embeddings and LangChain pipelines.
- Yellow.ai platform development:
  - Implemented core conversation flows and enterprise automation logic.
- Company Communicator Notification Bot (POC):
  - Built user plus agent notification bot and integrated with ServiceNow/chatbot ecosystem.
  - Delivered POC within one month.
- Backend and microservices:
  - Node.js dialog engine and response orchestration.
  - Flask API-based Python ML services connected to chatbot backend.
  - Microservice components for chatbot-service and ML-service interaction.
- Cloud/DevOps and architecture:
  - Azure setup, deployment orchestration, environment configuration, and production rollout.
  - Azure DevOps CI/CD with automated build, deploy, and testing stages.
  - Architecture design support for single-tenant routing and secure integration traffic.
- Testing and defect lifecycle:
  - Unit, integration, end-to-end, and performance testing.
  - Defect triage and remediation across dialog flows, API bugs, expired keys, Redis issues, and third-party dependencies.
  - Risk-prioritized fixes with production validation and SLA adherence.

### Internship Trainee - Assistant Tutor, Pepcoding Education Private Limited (May 2021 - December 2021, Delhi, On-site)
- Handled course structure for Data Structures and Algorithms in Java and Web applications using MERN stack.
- Managed LeetCode Blind 75 curriculum covering arrays, linked lists, graphs, and trees with structured problem sets.
- Designed course structure and curated practice questions aligned with industry interview patterns.
- Provided one-on-one doubt resolution sessions for students, improving concept clarity and problem-solving skills.
- Assisted in curriculum development and content creation for DSA and full-stack web development courses.
- Tech tags: Java, DSA, MERN Stack, LeetCode, Teaching, Curriculum Design.

### Intern, Center for Railway Information Systems, Indian Railways (May 2019 - Aug 2019)
- Software and information systems intern working on backend operations, database queries, and system data pipelines.
- Tech tags: Python, SQL, Backend Systems, Data Processing.

## Education

### Government Engineering College Bikaner, Rajasthan, India
- Bachelor of Technology (B.Tech), Graduated: 2021
- Grade: 67 percent aggregate
- Core Areas: Data Structures & Algorithms, Software Architecture, Database Systems, Full-Stack Web Development, Machine Learning, Automation, Ethical Hacking

### Geetanjali Senior Secondary School
- High School Diploma (Science), Jul 2015 - Jun 2016
- Grade: 81 percent

## Licenses and Certifications

- **Anthropic Claude Certified Architect Professional**
  - Verification: https://www.credly.com/badges/7dd35d2b-d461-40a6-90da-2114681ff507/public_url
  - Credly Profile: https://www.credly.com/users/rajat-khandelwal.b764d962
  - Focus: Production enterprise Claude architecture, prompt engineering, extended context reasoning, agentic tool workflows, guardrails, and evaluation.

- **Microsoft Certified: Azure AI Engineer Associate (AI-102)**
  - Credly Profile: https://www.credly.com/users/rajat-khandelwal.b764d962
  - Focus: Building, managing, and deploying AI solutions leveraging Azure OpenAI, Azure AI Search, Azure Cognitive Services, speech, computer vision, and NLP pipelines.

- **Deep Agents with LangGraph (LangChain)**
  - Issued: Oct 2025
  - Credential ID: nu1kb236qa
  - Focus: Multi-agent state machines, cyclical graphs, supervisor-worker orchestration, dynamic tool selection, memory checkpoints, and error recovery.

- **AI Agents Fundamentals (Hugging Face)**
  - Issued: Oct 2025
  - Credential ID: Rajatkhandelwal27
  - Focus: Autonomous agent architectures, tool integration, reasoning loops, and open-source LLM agents.

## Projects

### RAG Playground - Interactive RAG Pipeline (2024)
Live URL: https://ragtutorial.netlify.app/

An interactive web application that demonstrates and visualizes the complete Retrieval-Augmented Generation (RAG) pipeline. Built as an educational platform for understanding and experimenting with each stage of the RAG process.

Key Features:
- 9-stage RAG pipeline: Ingestion, Preprocessing, Chunking, Embedding, Vector Store Indexing, Retrieval, Reranking, Generation, and Evaluation.
- Interactive visual pipeline with React Flow DAG visualization showing data flow between stages.
- Multi-provider embedding support: Google Gemini (768-dim), OpenAI text-embedding-3-small/large (1536/3072-dim), ada-002.
- Dual vector store support: Local FAISS and Qdrant Cloud with HNSW indexing and automatic failover.
- Three chunking strategies: Fixed-size (1000 chars, 200 overlap), Recursive (paragraph-aware), and Semantic (sentence-boundary).
- Multiple LLM providers: OpenAI GPT-3.5/4, Google Gemini, Groq Llama with multiple prompt templates (default, detailed, concise, step-by-step).
- Real-time logging with color-coded levels, stage filtering, and comprehensive observability.
- Comprehensive evaluation metrics: latency, token counts, estimated costs, faithfulness, relevance, context utilization, response quality.

Technical Architecture:
- Frontend: Next.js 16, React 19, TypeScript 5, Tailwind 4, shadcn/ui, Zustand state management, React Flow for pipeline visualization, Recharts for data visualization, Framer Motion for animations.
- Backend: FastAPI 0.135, Python 3.11, Uvicorn ASGI server, Pydantic 2 for data validation.
- RAG Pipeline Libraries: pdfplumber for PDF extraction, qdrant-client for vector database, google-generativeai for Gemini embeddings and chat, openai for embeddings and chat, groq for LLM inference, tiktoken for token counting, scikit-learn for ML utilities.
- Infrastructure: Supabase S3 for cloud file storage with automatic fallback to local filesystem, Qdrant Cloud for vector database with HNSW indexing and payload storage, Netlify for frontend deployment, Docker for backend containerization.

Pipeline Stages Detail:
1. Ingestion: Upload PDF, TXT, MD, HTML files via multipart/form-data. Supports local filesystem and Supabase S3 cloud storage with automatic fallback. Uses pdfplumber for PDF extraction with PyPDF2 fallback. Generates UUID for each document with metadata extraction.
2. Preprocessing: Configurable text cleaning with TextPreprocessor class. Options include lowercase conversion, whitespace normalization, Unicode NFKC normalization, URL/email/phone removal, OCR artifact fixes (ligatures, smart quotes, hyphenation), and punctuation preservation. Provides text statistics: character count, word count, sentence count, average word length, line count.
3. Chunking: Three strategies via ChunkService. Fixed-size splits text into chunks with configurable overlap and sentence boundary detection. Recursive respects paragraph boundaries and groups paragraphs into chunks. Semantic splits by sentence boundaries and groups sentences. All strategies include token counting and metadata.
4. Embedding: Generates vector embeddings using cloud-based models. Batch processing (100 per batch) with error handling returning zero vectors on API failure. Each embedding gets unique UUID for Qdrant indexing. Supports task type specification (retrieval_document for chunks).
5. Vector Store Indexing: Indexes embeddings into Qdrant with HNSW algorithm for approximate nearest neighbor search. Auto-creates collections with correct dimensions, handles dimension mismatches with auto-recreation. Stores vectors with payloads containing chunk_id, document_id, model, full chunk content, start_pos, end_pos, token_count. Supports Cosine, Euclidean, Dot Product distance metrics.
6. Retrieval: Similarity search with query embedding generation using same model as indexed chunks. Model auto-detection from indexed payloads. Uses Qdrant query_points API for vector search. Maps vector results back to chunks with in-memory store check and payload reconstruction fallback. Supports metadata filtering by document_id. Returns top-k chunks with scores and latency metrics.
7. Reranking: Re-ranks retrieved chunks using keyword overlap scoring algorithm. Formula: score equals intersection of query words and chunk words divided by query words. Sorts by score in descending order. Production systems would use cross-encoder models or Cohere Rerank API.
8. Generation: Generates AI responses using retrieved chunks as context. Combines chunks into context string and constructs prompts with system message, context sections, and question. Async calls to selected provider (OpenAI, Gemini, Groq). Token counting with tiktoken for OpenAI models and word-based fallback for others. Collects metrics: latency, input/output tokens, model used. Supports multiple prompt templates for different response styles.
9. Evaluation: Calculates evaluation metrics for generated responses. Tracks latency (response time in ms), input/output tokens (tiktoken or word count), estimated cost (OpenAI GPT-3.5 pricing), confidence score, faithfulness (answer grounded in context), relevance (answer relevance to query), context utilization (percentage of context tokens used), response quality (overall quality score).

Architecture Highlights:
- Modular Pipeline Design: Each RAG stage is independently testable with clear input/output contracts. Stages can be swapped or upgraded without affecting others.
- Provider Abstraction: Unified interfaces for embeddings (Google/OpenAI) and LLMs (OpenAI/Gemini/Groq) enable easy provider switching via configuration.
- Storage Flexibility: Environment-based switching between local filesystem and Supabase S3 with automatic fallback ensures development and production compatibility.
- Observability First: Structured logging with request IDs, stage tracking, and error traces. Frontend log viewer provides real-time pipeline visibility.

Deployment:
- Frontend deployed on Netlify with automatic deployments from Git, branch previews, and edge CDN distribution.
- Backend supports Docker deployment on Render, Railway, or Fly.io with health check endpoints.
- Qdrant Cloud provides free tier with 1GB storage for vector database.
- Supabase provides free tier with 500MB storage for S3-compatible file storage.

Tech tags: Next.js 16, React 19, TypeScript 5, FastAPI, Python 3.11, Qdrant, FAISS, OpenAI, Google Gemini, Groq, Supabase S3, Zustand, React Flow, Recharts, shadcn/ui, Tailwind 4, Docker, Netlify.

### Capstone Project - Enterprise Assistant (2024)
Live URL: https://capstoneprojectagenticairag-hgpicyqq4joiksq2bhtc3q.streamlit.app/
GitHub: https://github.com/rajatkhandelwal191/Capstone_Project_Agentic_Ai_RAG

End-to-end enterprise assistant built with Streamlit and LangGraph that combines retrieval Q&A, operational tool automation, and RFP proposal generation in a single routed architecture.

Key Features:
- LangGraph multi-route architecture with supervisor and deterministic routing paths.
- RAG pipeline with local FAISS indexing and cloud Qdrant retrieval abstraction.
- Tooling agent integrated with SQLite incidents and service request tables.
- RFP proposal generator using uploaded PDF parsing with bounded context extraction.
- Provider-aware model layer supporting Ollama, Gemini, and Groq via config.
- Observability-first logging chain from UI events to node and tool execution.

Architecture:
- UI Layer: Streamlit chat UI captures prompt, builds GraphState, invokes LangGraph, renders responses plus upload controls.
- Orchestration Layer: Supervisor classifies intent and routes to RAG_FLOW, TOOL_FLOW, RFP_FLOW, or UPLOAD_FLOW using conditional graph edges.
- Execution Layer: Specialized agents execute retrieval Q&A, SQLite tool actions, enterprise RFP drafting, and upload-first workflows.
- Data and Ops Layer: Retrieval runs on FAISS or Qdrant, tool data comes from SQLite, standardized logger traces each request_id end to end.

Request Lifecycle:
1. Receive Question: Streamlit captures user text with st.chat_input(), generates request_id, initializes GraphState with optional uploaded_file.
2. Classify Intent: Supervisor node in nodes.py calls router.py intent logic with keyword-first routing and optional LLM fallback.
3. Route by Graph: graph.py sends flow to rag/tool/rfp/upload nodes through conditional edges and exits at END.
4. Execute Agent: RAG uses similarity search context, TOOL queries open incidents/requests, RFP drafts proposals with optional PDF context.
5. Render and Log: Response, intent, and upload hints returned to UI; chat history updates and logs include flow decisions and response preview.

Tech tags: LangGraph, LangChain, Streamlit, RAG, FAISS, Qdrant, SQLite, Python, Ollama, Gemini, Groq.

### MobiKwik Lendbox XTRA P2P NBFC Scam Tracker (2024)
Live URL: https://mobikwik-lendbox-scam.vercel.app/

Community-driven evidence collection platform for tracking financial issues. Features complaint submission with evidence upload, admin moderation, and public transparency dashboard.

Key Features:
- Next.js 14 frontend with Supabase PostgreSQL backend and Row Level Security.
- Google OAuth authentication with role-based admin access control.
- Cloudflare R2 storage with automatic WebP conversion and compression.
- Block-level CMS for content management and community updates.
- Complaint submission system with evidence upload and status tracking.
- Admin moderation dashboard for reviewing and managing submissions.
- Public transparency dashboard showing complaint statistics and trends.

Tech tags: Next.js 14, TypeScript, Supabase, PostgreSQL, Cloudflare R2, Google OAuth, Row Level Security, Vercel.

## Technical Skills

- AI/ML & LLMs: Microsoft Agent Framework, LangChain, LangGraph, LlamaIndex, HuggingFace Transformers, Azure OpenAI, Microsoft Foundry, RAG, Azure AI Search, Vector Databases (Qdrant, FAISS, pgvector), Agentic AI
- Languages: Python 3.12, JavaScript/TypeScript, Node.js, SQL, KQL (Kusto Query Language)
- Cloud, IaC & DevOps: Azure (Web Apps, Container Apps, Functions, Durable Functions, Blob Storage, Cosmos DB, PostgreSQL Flexible Server, Key Vault, ACR), Azure Bicep, Docker, Kubernetes, CI/CD, GitHub Actions (OIDC)
- Networking & Security: Azure VNets, Private Endpoints, Private DNS, NSGs, Microsoft Entra ID (SSO, MSAL), Managed Identities, Service Principals, RBAC, Secretless Architecture
- Frameworks & Web: FastAPI, React, Vite, Next.js, Flask, Streamlit, NGINX
- Databases & Data Engineering: Azure Database for PostgreSQL Flexible Server, ServiceNow CMDB APIs, Supabase, MongoDB, Redis, Cosmos DB
- Observability & Monitoring: Azure Application Insights, Log Analytics, OpenTelemetry, Azure Workbooks
- Tools & Quality: Azure CLI, Azurite, VS Code, Git, Postman, pytest, Ruff, Power BI, Jupyter

