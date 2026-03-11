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

### Internship Trainee, Pepcoding (May 2021 - Dec 2021, Delhi, On-site)
- Handled DSA course structure in Java
- Built web apps using MERN stack

### Web Intern, Skill-Lync (May 2020 - Oct 2020, Remote)
- Worked on design and simulation internship projects
- Built parsing, analysis, and visualization workflows in Python and MATLAB
- Applied computational modeling and engineering simulation integration into software workflows

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

### Solar-powered pesticide spraying system with autonomous mower (Jun 2021 - Jul 2021)
- Built with Arduino and embedded systems
- Focused on autonomous spraying, mowing, navigation, and software-hardware co-design

### Skill-Lync internship project set (May 2020 - Oct 2020)
- Parsed and visualized NASA thermodynamic datasets in Python
- Simulated computational engine models
- Implemented robotic arm control challenge in MATLAB and Simulink
- Worked on motion control algorithm design and CAD-linked multi-body dynamics simulation
