# Rajat Khandelwal Profile

Rajat Khandelwal (He/Him)  
AI Engineer | MERN Stack Developer | Azure Cloud & DevOps | Generative AI & LLM Workflows | Python & Machine Learning  
Location: Delhi, India

## Summary

I am a Lead AI Engineer passionate about building scalable, intelligent systems that bridge research and production. My expertise lies in architecting and optimizing Large Language Model (LLM) workflows using frameworks such as LangChain, LangGraph, LlamaIndex, and Autogen. I build conversational agents and autonomous AI systems powered by Generative AI.

I bring strong experience in end-to-end delivery, from data preprocessing and model fine-tuning to API deployment, Azure cloud pipelines, and production monitoring. I have designed and deployed enterprise-grade systems leveraging Azure Kubernetes Service, Azure Functions, Web Apps, and Power BI analytics.

Alongside AI, I have a solid foundation in full-stack development (MERN), DevOps, and cloud-native architecture. My background also includes vector database integration, semantic retrieval, and context-aware reasoning at scale. I thrive in client-facing roles and cross-functional teams.

Core skills:
- Generative AI, Conversational AI, Agentic AI
- LLM workflows: LangChain, LangGraph, LlamaIndex, Autogen, CrewAI
- Cloud and DevOps: Azure (AKS, Functions, Web Apps, Blob Storage), Docker, Kubernetes
- Full-stack: MERN, React, Node.js, Flask, Python
- ML and NLP: Sentiment analysis, summarization (BART), entity extraction, semantic search
- Vector databases and custom embeddings

## Current Preferences

- Open to work for: Full Stack Engineer, Web Developer, Back End Developer, Artificial Intelligence Engineer, and Generative AI Engineer roles
- Followers: 528
- Connections: 462

## Experience

### Tata Consultancy Services Ltd

#### Lead AI Engineer - Agentic AI Workflow for Infra Operations (ITIS) (August 2025 - Present)
- Designed and implemented an agentic AI ecosystem across heatmap, incident, patch compliance, and drive cleanup workflows.
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

### Web Intern - Design and Simulation, Skill-Lync (May 2020 - March 2021, Remote)
- Applied multibody dynamics, computational fluid dynamics (CFD), and finite element analysis (FEA) concepts using engineering software.
- Implemented data parsing, analysis, and visualization pipelines in Python and MATLAB for simulation results.
- Integrated simulation results into software workflows with emphasis on automation and data processing.
- Developed scripts for extracting, transforming, and visualizing engineering simulation data.
- Gained hands-on experience with engineering simulation tools and computational analysis methodologies.
- Tech tags: Python, MATLAB, CFD, FEA, Data Analysis, Simulation, Visualization.

### Intern, Center for Railway Information Systems, Indian Railways (May 2019 - Aug 2019)
- Internship on software and information-system-oriented tasks

## Education

### Government Engineering College Bikaner
- Bachelor of Technology (2017 - 2021)
- Grade: 67 percent aggregate
- Activities: ethical hacking, full-stack development, Java, DSA, automation projects, Arduino, Raspberry Pi, hackathons, volunteering

### Geetanjali Senior Secondary School
- High School Diploma (Science), Jul 2015 - Jun 2016
- Grade: 81 percent

## Licenses and Certifications

- Deep Agents with LangGraph (LangChain), Issued Oct 2025, Credential ID: nu1kb236qa
- AI Agents Fundamentals (Hugging Face), Issued Oct 2025, Credential ID: Rajatkhandelwal27

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

### Solar-powered pesticide spraying system with autonomous mower (Jun 2021 - Jul 2021)
- Built with Arduino and embedded systems
- Focused on autonomous spraying, mowing, navigation, and software-hardware co-design

### Skill-Lync internship project set (May 2020 - Oct 2020)
- Parsed and visualized NASA thermodynamic datasets in Python
- Simulated computational engine models
- Implemented robotic arm control challenge in MATLAB and Simulink
- Worked on motion control algorithm design and CAD-linked multi-body dynamics simulation
