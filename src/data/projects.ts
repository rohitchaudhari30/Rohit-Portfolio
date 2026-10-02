import type { Project } from "@/types/project";

/**
 * ============================================================
 *  These projects were written up from the actual source code,
 *  READMEs, and your own notes for each project. Two things
 *  still need you:
 *
 *   1. githubUrl — add your real repo link to each project below
 *      (left blank on purpose rather than a fake placeholder link).
 *   2. Screenshots — add real product screenshots to
 *      /public/assets/projects/<slug>/ and set coverImage /
 *      galleryImages. Until then, each card uses a designed
 *      abstract cover (cover.svg) so it doesn't look empty.
 * ============================================================
 */
export const projects: Project[] = [
  {
    id: "sdlc-intelligence-platform",
    slug: "sdlc-intelligence-platform",
    title: "SDLC Intelligence Platform",
    subtitle: "AI-assisted platform that turns raw requirements into architecture, sprints, and QA tests",
    shortDescription:
      "A full-stack platform where uploading a requirements document kicks off a five-agent AI pipeline that drafts architecture, sprint plans, an API spec, and QA tests — with live progress over WebSocket.",
    fullDescription:
      "An engineering platform for the parts of the SDLC that usually get written by hand: requirements docs, architecture decisions, sprint plans, API specs, and QA test cases. You upload a requirements document, and a five-agent AI pipeline turns it into structured, editable artifacts for each of those stages, with progress streamed to the UI in real time.",
    category: "Full Stack",
    featured: true,
    status: "Completed",
    coverImage: "/assets/projects/sdlc-intelligence-platform/cover.svg",
    galleryImages: [],
    technologies: ["FastAPI", "React", "SQLAlchemy", "Groq", "Gemini", "WebSockets"],
    techGroups: [
      { group: "Frontend", items: ["React 18", "Vite", "Zustand", "Axios", "Recharts", "React Router"] },
      { group: "Backend", items: ["FastAPI", "SQLAlchemy (async)", "Alembic", "Pydantic"] },
      { group: "AI / ML", items: ["Groq LLM API", "Google Gemini API"] },
      { group: "Database", items: ["SQLite (aiosqlite)", "swappable to PostgreSQL"] },
    ],
    problem:
      "Writing requirements docs, architecture decisions, sprint plans, API specs, and QA test cases by hand takes real time, and the quality varies a lot depending on who's writing that week.",
    motivation:
      "I wanted to build a genuine multi-agent AI pipeline end to end — not a single prompt wrapped in a UI, but something with real auth, an async database, WebSockets, and background job processing behind it.",
    objectives: [
      "Turn an uploaded requirements document into structured, usable engineering artifacts automatically.",
      "Keep every stage editable — the AI drafts, a person reviews.",
      "Show live progress instead of a spinner with no idea what's happening underneath.",
    ],
    targetUsers: "Small engineering teams who want a head start on SDLC documentation instead of a blank page.",
    solution:
      "You create a project and upload requirement documents in PDF, DOCX, XLSX, or CSV. A five-agent pipeline processes them: requirements extraction runs first, then architecture design and sprint planning run in parallel, then API spec generation and QA test generation run in parallel. Progress streams over WebSocket, with a polling fallback if the connection drops.",
    keyFeatures: [
      {
        icon: "Workflow",
        title: "Five-agent AI pipeline",
        description:
          "Requirements extraction feeds parallel architecture design and sprint planning, then parallel API spec and QA test generation.",
      },
      {
        icon: "Radio",
        title: "Live progress over WebSocket",
        description: "Job status streams to the UI in real time, with a polling fallback if the socket drops.",
      },
      {
        icon: "FileStack",
        title: "Multi-format document intake",
        description: "Accepts PDF, DOCX, XLSX, and CSV requirement documents and extracts usable text from each.",
      },
      {
        icon: "ShieldCheck",
        title: "JWT-based auth",
        description: "Registration, login, refresh tokens, and per-organisation project isolation.",
      },
    ],
    architecture:
      "A FastAPI backend with async SQLAlchemy and Alembic migrations sits behind a unified AI provider layer that calls a primary LLM provider (Groq) first and falls back to a secondary provider (Gemini). Background workers handle document processing and the AI pipeline outside the request/response cycle. The React 18 + Vite frontend uses Zustand for state and a WebSocket hook with an automatic polling fallback.",
    workflow: [
      "Create a project and upload one or more requirement documents.",
      "Documents are parsed in the background and stored as extracted text.",
      "Agent 1 extracts structured requirements from the parsed text.",
      "Agents 2 and 3 run in parallel: architecture design and sprint planning.",
      "Agents 4 and 5 run in parallel: API specification and QA test generation.",
      "Progress and results stream to the UI over WebSocket as each stage completes.",
    ],
    challenges: [
      {
        challenge: "Background document processing crashed with a SQLAlchemy \"prepared state\" error.",
        whyDifficult:
          "The background task was reusing the same database session from the original HTTP request, which had already been committed and closed by the time the task actually ran.",
        solution: "Opened a fresh async session inside the background task itself instead of reusing the request's session.",
        result: "Document uploads process reliably in the background without corrupting ORM session state.",
      },
      {
        challenge: "WebSocket connections were rejected with a 403 error.",
        whyDifficult:
          "Browsers can't attach an Authorization header to a WebSocket handshake, so the route had no way to read the JWT the same way the REST endpoints did.",
        solution:
          "Changed the route to accept the token as a query parameter instead, and validate it manually before accepting the connection.",
        result: "Real-time pipeline progress works end to end, with polling as a fallback if a connection drops.",
      },
    ],
    technicalDecisions: [
      {
        decision: "Groq as the primary AI provider, Gemini as fallback",
        reasoning:
          "Groq's API responds fast enough that a five-agent pipeline still feels responsive; Gemini as a fallback keeps the app usable if the primary provider hits a rate limit.",
      },
      {
        decision: "SQLite for local development, swappable to PostgreSQL",
        reasoning:
          "Keeping DATABASE_URL swappable means the same codebase runs locally with zero setup and against a real Postgres instance in production.",
      },
    ],
    securityConsiderations: [
      "JWT access/refresh tokens with bcrypt password hashing.",
      "Per-organisation data isolation enforced at the repository layer.",
    ],
    performanceConsiderations: [
      "Independent pipeline stages run in parallel instead of one long sequential chain.",
      "WebSocket progress updates avoid constant polling under normal conditions.",
    ],
    scalabilityConsiderations: [
      "Background workers keep long AI calls off the request/response cycle so the API stays responsive under load.",
    ],
    results: [
      "The full pipeline — from document upload to generated QA tests — runs end to end without manual intervention.",
      "Both blocking bugs (session reuse, WebSocket auth) were root-caused and fixed rather than patched around.",
    ],
    lessonsLearned: [
      "Background tasks need their own database session — reusing a request-scoped session only breaks once things are under load.",
      "Real-time features need a fallback path from day one, not bolted on afterward.",
    ],
    futureImprovements: [
      "Make PostgreSQL the default for production deployments.",
      "Let teams edit AI-generated artifacts inline and re-run only the affected pipeline stage.",
    ],
  },
  {
    id: "docuvision-ai",
    slug: "docuvision-ai",
    title: "DocuVision AI",
    subtitle: "Vision-LLM document extraction API — straight from image to structured JSON, no OCR",
    shortDescription:
      "A FastAPI service that reads Indian identity and academic documents directly with vision models, skipping OCR entirely, and returns clean, validated JSON.",
    fullDescription:
      "A document extraction API purpose-built for Indian identity and academic documents — Aadhaar cards, PAN cards, mark sheets, transfer and leaving certificates. Instead of running OCR and handing noisy text to an LLM, document images go straight to a vision model, which reads the document directly and returns structured JSON.",
    category: "AI / ML",
    featured: true,
    status: "Completed",
    company: "ERelate Labs Pvt. Ltd.",
    coverImage: "/assets/projects/docuvision-ai/cover.svg",
    galleryImages: [],
    technologies: ["FastAPI", "Gemini Vision", "Groq Vision", "Python"],
    techGroups: [
      { group: "Backend", items: ["FastAPI", "Python"] },
      { group: "AI / ML", items: ["Google Gemini Vision API", "Groq Vision API"] },
      { group: "Tools", items: ["Pillow", "pdf2image"] },
    ],
    problem:
      "Extracting structured data from Aadhaar cards, PAN cards, and mark sheets is normally done with OCR — but OCR struggles badly with the mixed scripts and inconsistent layouts common in these documents, producing noisy text that gives an LLM nothing solid to parse.",
    motivation:
      "I'd already built an OCR-then-LLM version and kept hitting the same wall: garbage in, garbage out. I wanted to test whether skipping OCR entirely and sending the image straight to a vision model would actually work better in practice, not just on paper.",
    objectives: [
      "Remove OCR from the pipeline entirely and compare accuracy and speed directly.",
      "Support the specific Indian document types a real onboarding flow needs.",
      "Keep the service running even if one AI provider is down or rate-limited.",
    ],
    targetUsers:
      "Backends that need to turn identity or academic document uploads into structured fields — for example, a candidate or student onboarding flow.",
    solution:
      "Each document type has its own route and its own extraction service, tuned to that document's layout. Images go straight to a vision-capable model — Google's Gemini Vision API by default, with Groq's vision API as a backup — and the response comes back as validated JSON.",
    keyFeatures: [
      {
        icon: "ScanEye",
        title: "Zero-OCR vision extraction",
        description: "Images (and PDFs, converted to images) go directly to a vision LLM — no Tesseract step, no noisy intermediate text.",
      },
      {
        icon: "Repeat",
        title: "Automatic provider failover",
        description: "On a 401, 429, or quota error, the router switches providers automatically and reports the switch via /status.",
      },
      {
        icon: "FileCheck2",
        title: "Document-specific parsers",
        description: "Separate services for Aadhaar (front/back), PAN, 10th/12th mark sheets, and transfer/leaving certificates.",
      },
      {
        icon: "Gauge",
        title: "5–10× faster per document",
        description: "Dropping the OCR preprocessing step cut per-document processing time significantly versus the original pipeline.",
      },
    ],
    architecture:
      "An upload goes through image preparation — PDFs converted to JPEG, oversized images resized — then straight to an LLM router that calls whichever vision provider (Gemini or Groq) is currently active and returns a parsed JSON response.",
    workflow: [
      "A document image (or PDF) is uploaded to the route matching its type.",
      "The image is normalized — PDFs converted to JPEG, oversized images resized.",
      "The image is sent directly to the active vision provider with a document-specific prompt.",
      "The response is parsed into structured JSON and returned, with the active provider reported via /status.",
    ],
    challenges: [
      {
        challenge: "OCR preprocessing was producing all-null extraction results on real documents.",
        whyDifficult:
          "Indian mark sheets and ID cards often mix scripts and have inconsistent layouts, and Tesseract's output on these was noisy enough that the LLM had nothing usable to work with.",
        solution: "Removed OCR from the pipeline entirely and sent images directly to a vision-capable LLM instead of pre-extracted text.",
        result: "Extraction accuracy improved noticeably, and per-document processing got 5–10× faster with no OCR pass to wait on.",
      },
    ],
    technicalDecisions: [
      {
        decision: "Gemini as primary provider, Groq's vision model as backup",
        reasoning:
          "Only one provider is active at a time by design — this keeps behavior predictable and makes the automatic failover simple to reason about when quota or rate limits are hit.",
      },
    ],
    securityConsiderations: ["API keys are read from environment configuration, never hardcoded or logged."],
    performanceConsiderations: ["Images are resized before being sent to the vision model, keeping request payloads and latency down."],
    scalabilityConsiderations: [
      "Adding a new document type means adding one route and one service file, following the same pattern as the existing document types.",
    ],
    results: ["Replaced a noisy, OCR-dependent pipeline with a direct vision-model approach that's both faster and more accurate on real documents."],
    lessonsLearned: ["Sometimes the fix for a flaky pipeline stage is removing it, not tuning it further."],
    futureImprovements: ["Add confidence scores per extracted field so low-confidence results can be flagged for manual review."],
  },
  {
    id: "bulk-resume-parser",
    slug: "bulk-resume-parser",
    title: "Bulk Resume Parser",
    subtitle: "Concurrent resume ingestion with OCR fallback and AI-based field extraction",
    shortDescription:
      "An ASP.NET Core service that accepts single or bulk resume uploads, extracts text with an OCR fallback for scanned files, and uses an LLM to pull structured candidate data.",
    fullDescription:
      "A resume-processing service built on ASP.NET Core: upload one resume or a batch of them, and it extracts text (falling back to OCR when a file has no usable text layer), sends that text to an LLM for structured field extraction, and queues the results for storage without blocking the response.",
    category: "Backend",
    featured: true,
    status: "Completed",
    company: "Matisaar Technologies",
    coverImage: "/assets/projects/bulk-resume-parser/cover.svg",
    galleryImages: [],
    technologies: ["ASP.NET Core", "C#", "Groq", "SQL Server", "Tesseract OCR"],
    techGroups: [
      { group: "Backend", items: ["ASP.NET Core (.NET 8)", "C#"] },
      { group: "AI / ML", items: ["Groq LLM API"] },
      { group: "Database", items: ["SQL Server"] },
      { group: "Tools", items: ["PdfPig", "DocumentFormat.OpenXml", "Tesseract OCR", "PDFtoImage", "SkiaSharp"] },
    ],
    problem:
      "Reviewing a stack of resumes one at a time and manually copying candidate details into a tracking system doesn't scale once you're hiring for more than a handful of roles at once.",
    motivation:
      "I wanted practice combining a few things that don't usually show up together in one small project: concurrent file processing, a text-extraction fallback chain, an LLM extraction step, and a non-blocking database write path.",
    objectives: [
      "Handle single-file and bulk uploads through the same underlying pipeline.",
      "Get usable text out of resumes even when direct text extraction fails.",
      "Never let a slow database write block the upload response.",
    ],
    targetUsers: "Recruiters or hiring pipelines that need candidate data pulled from resumes quickly and attached to a specific job posting.",
    solution:
      "Uploaded PDFs and DOCX files go through direct text extraction first (PdfPig for PDFs, OpenXml for DOCX); if that comes back too thin, the file is rendered to images and run through Tesseract OCR instead. The extracted text goes to Groq for structured field extraction, with regex-based extraction as a safety net for any field the model leaves blank. Bulk uploads are processed concurrently, and database writes happen on a dedicated background channel so the response doesn't wait on SQL Server.",
    keyFeatures: [
      {
        icon: "Layers",
        title: "Bulk and single upload, one pipeline",
        description: "Both entry points funnel into the same extraction logic instead of duplicating it.",
      },
      {
        icon: "ScanText",
        title: "OCR fallback for scanned resumes",
        description: "Falls back to rendering pages as images and running Tesseract when direct text extraction isn't enough.",
      },
      {
        icon: "Regex",
        title: "Regex safety net",
        description: "Email, phone, role, experience, and location all have regex-based extraction as a backup if the LLM leaves a field blank.",
      },
      {
        icon: "Workflow",
        title: "Non-blocking database writes",
        description: "Uploads are parsed and returned immediately; a background channel handles the actual SQL Server writes.",
      },
    ],
    architecture:
      "An ASP.NET Core MVC controller coordinates extraction: PdfPig/OpenXml for direct text, a PDFtoImage + SkiaSharp + Tesseract path for OCR fallback, and a GroqService for LLM-based field extraction. A dedicated unbounded Channel with a single background reader handles all SQL Server writes so the request thread never blocks on the database.",
    workflow: [
      "A resume — or a batch of resumes — is uploaded through the single or bulk endpoint.",
      "Text is extracted directly from the PDF or DOCX file.",
      "If direct extraction is too thin, pages are rendered to images and run through Tesseract OCR instead.",
      "The extracted text is sent to Groq to pull out name, contact details, role, experience, and location.",
      "Any field the model leaves blank is filled in with a regex-based fallback.",
      "The parsed result is returned immediately; the database write is queued on a background channel.",
    ],
    challenges: [
      {
        challenge: "Some resumes returned little or no usable text from direct PDF/DOCX parsing.",
        whyDifficult: "Scanned resumes and certain DOCX exports don't carry a proper text layer, so direct parsing would extract almost nothing.",
        solution: "Added a fallback path that renders each page as an image and runs it through Tesseract OCR when direct extraction comes back too short.",
        result: "Scanned and awkwardly-formatted resumes still produce usable text for the extraction step instead of failing silently.",
      },
      {
        challenge: "Bulk uploads risked blocking on SQL Server writes under load.",
        whyDifficult: "Writing every parsed resume to SQL Server synchronously inside the request would slow bulk uploads down as file count grew.",
        solution: "Queued all database writes onto a single unbounded Channel with one dedicated background reader, decoupling the write from the request.",
        result: "Bulk uploads return parsed results quickly regardless of how busy the database write queue is.",
      },
    ],
    technicalDecisions: [
      {
        decision: "Groq for extraction, regex as a fallback rather than the primary method",
        reasoning:
          "An LLM handles the messy, inconsistent formatting of real resumes far better than regex alone, but regex is fast and reliable enough to fill in specific fields when the model call fails or omits something.",
      },
    ],
    securityConsiderations: ["Upload size limits are enforced separately for single-file and bulk uploads."],
    performanceConsiderations: ["Bulk files are processed concurrently, and database writes are fully decoupled from the request/response cycle."],
    scalabilityConsiderations: [
      "The background write channel uses a single reader by design, keeping SQL Server writes ordered and avoiding connection contention under concurrent load.",
    ],
    results: ["Bulk resume uploads are parsed, extracted, and queued for storage without the request blocking on OCR, the LLM call, or the database."],
    lessonsLearned: [
      "A regex fallback isn't a downgrade from an LLM — it's cheap insurance for the fields where good-enough-instantly beats perfect-sometimes.",
    ],
    futureImprovements: ["Surface which extraction path (direct or OCR) produced each result, so low-confidence extractions are easy to spot."],
  },
  {
    id: "ai-interviewer",
    slug: "ai-interviewer",
    title: "AI Interviewer",
    subtitle: "AI-conducted mock interviews, tailored to a real resume and job description",
    shortDescription:
      "A FastAPI app that runs a full mock interview end to end — resume and job description in, spoken questions and answers, structured feedback out.",
    fullDescription:
      "A mock interview platform that generates questions from an actual resume and job description instead of a generic question bank, runs the interview with spoken answers, scores each answer as it comes in, and produces a feedback report once the session ends.",
    category: "AI / ML",
    featured: true,
    status: "Completed",
    company: "Matisaar Technologies",
    coverImage: "/assets/projects/ai-interviewer/cover.svg",
    galleryImages: [],
    technologies: ["FastAPI", "Groq", "Gemini", "Whisper", "SQLAlchemy"],
    techGroups: [
      { group: "Backend", items: ["FastAPI", "SQLAlchemy (async)", "Jinja2"] },
      { group: "AI / ML", items: ["Groq LLM API", "Google Gemini API", "OpenAI Whisper (optional)"] },
      { group: "Database", items: ["SQLite"] },
      { group: "Tools", items: ["pdfplumber", "python-docx"] },
    ],
    problem:
      "Practicing against generic interview question banks doesn't help much when the questions have nothing to do with the actual role or the candidate's actual background.",
    motivation:
      "I wanted to build something with a real conversational loop instead of a single request/response AI feature — question generation, timed answers, live transcription, and feedback generation, all tracked across one interview session.",
    objectives: [
      "Generate interview questions from the candidate's actual resume and the actual job description.",
      "Support spoken answers, not just typed ones.",
      "Score each answer as it comes in rather than waiting until the end.",
    ],
    targetUsers: "Anyone preparing for an interview who wants practice tailored to a specific resume and job posting.",
    solution:
      "A candidate uploads a resume and pastes a job description; the app parses both and generates a tailored set of interview questions. During the interview, answers are captured via the browser's speech API (with an optional Whisper upgrade for higher accuracy), scored in the background as they arrive, and compiled into a feedback report once the interview finishes.",
    keyFeatures: [
      {
        icon: "FileSearch",
        title: "Resume + JD-aware questions",
        description: "Questions are generated from the parsed resume and job description instead of a static question bank.",
      },
      {
        icon: "Mic",
        title: "Spoken answers",
        description: "Uses the browser's Web Speech API for transcription by default, with an optional Whisper upgrade for higher accuracy.",
      },
      {
        icon: "Activity",
        title: "Background answer scoring",
        description: "Each answer is scored against expected keywords and category as soon as it's submitted, not batched at the end.",
      },
      {
        icon: "ClipboardList",
        title: "Automatic feedback report",
        description: "A full feedback report is generated in the background once the interview is marked finished.",
      },
    ],
    architecture:
      "A FastAPI backend with async SQLAlchemy tracks interview state; resume and job description parsing runs through pdfplumber/python-docx; an AI service layer tries Groq first and falls back to Gemini for every generation and scoring call, with a request timeout and a graceful fallback response if both providers fail.",
    workflow: [
      "Upload a resume and paste the target job description.",
      "The app parses both and creates an interview with a tailored question set.",
      "The interview starts; each question is presented and the spoken answer is transcribed.",
      "Each answer is scored in the background against keywords and category as it's submitted.",
      "Marking the interview finished triggers background feedback generation.",
      "The feedback report is fetched and displayed once ready.",
    ],
    challenges: [
      {
        challenge: "AI generation calls would occasionally hang or fail depending on provider load.",
        whyDifficult:
          "Interview questions and feedback are generated live during a session, so a hung request stalls the whole interview rather than just one background job.",
        solution:
          "Wrapped every AI call with a request timeout and a Groq-then-Gemini fallback chain, with a final graceful fallback response if both providers fail.",
        result: "The interview keeps moving even when a provider is slow, rate-limited, or unavailable.",
      },
    ],
    technicalDecisions: [
      {
        decision: "Browser Web Speech API as the default transcription path, Whisper as an opt-in upgrade",
        reasoning:
          "Zero-install transcription that works out of the box matters more for a practice tool than maximum accuracy, but Whisper is auto-detected and used automatically when it's installed.",
      },
    ],
    securityConsiderations: ["API keys are configured via .env or a setup UI and are never exposed to the frontend."],
    performanceConsiderations: ["Answer scoring runs as a background task per answer instead of blocking the interview flow on the AI call."],
    scalabilityConsiderations: [
      "The Groq-then-Gemini fallback chain is reused for every AI call in the app, so adding a third provider means changing one function, not every call site.",
    ],
    results: ["A complete interview — question generation, spoken answers, live scoring, and a final feedback report — runs end to end without manual intervention."],
    lessonsLearned: ["A consistent fallback chain used everywhere is worth building once properly, rather than handling provider failure differently at every call site."],
    futureImprovements: ["Add interview history and analytics across multiple sessions so a candidate can track improvement over time."],
  },
  {
    id: "boosterchatbot",
    slug: "boosterchatbot",
    title: "BoosterChatBot",
    subtitle: "Production AI chatbot that turns plain-language questions into live SQL queries, in four languages",
    shortDescription:
      "A FastAPI chatbot that lets non-technical teams ask questions in English, Hindi, Marathi, or Hinglish and get real answers straight from a live SQL Server database.",
    fullDescription:
      "A production chatbot built at ERelate Labs, used daily by non-technical teams to query the company database in plain language — no SQL knowledge required. It converts natural-language questions into T-SQL, runs them safely against a live database, and answers in whichever of four languages the question was asked in.",
    category: "AI / ML",
    featured: true,
    status: "Live",
    company: "ERelate Labs Pvt. Ltd.",
    coverImage: "/assets/projects/boosterchatbot/cover.svg",
    galleryImages: [],
    technologies: ["FastAPI", "Groq", "Gemini", "SQL Server", "Python"],
    techGroups: [
      { group: "Backend", items: ["FastAPI", "Python", "asyncio"] },
      { group: "AI / ML", items: ["Groq LLM API", "Google Gemini API", "NL-to-SQL"] },
      { group: "Database", items: ["SQL Server"] },
      { group: "Tools", items: ["Custom JWT Auth (stdlib)"] },
    ],
    problem:
      "Non-technical teams needed answers from the database constantly, but writing SQL themselves wasn't an option, and routing every small question through a data person created a bottleneck.",
    motivation:
      "I wanted to ship something people would actually open every day, not just a demo — which meant getting response time, language coverage, and safety all genuinely production-ready, not just good enough for a proof of concept.",
    objectives: [
      "Let non-technical team members ask questions in their own words and get real answers from the database.",
      "Support the languages the team actually speaks day to day — English, Hindi, Marathi, and Hinglish.",
      "Make sure no query could ever modify or damage the underlying data.",
    ],
    targetUsers: "Non-technical business and operations teams who need quick answers from the database without waiting on a data person.",
    solution:
      "The chatbot takes a natural-language question, sends it to an LLM to translate into T-SQL, and runs that query against a live SQL Server database — with multilingual support including Devanagari script, a dual AI provider setup so a rate limit or outage on one provider doesn't take the bot down, and validation on every generated query before it's executed.",
    keyFeatures: [
      {
        icon: "Languages",
        title: "Multilingual NL-to-SQL",
        description: "Understands questions in English, Hindi, Marathi, and Hinglish, including Devanagari script.",
      },
      {
        icon: "Repeat",
        title: "Dual AI provider failover",
        description: "Falls back from Groq to Gemini automatically, so a single provider issue doesn't take the chatbot offline.",
      },
      {
        icon: "ShieldAlert",
        title: "SQL injection prevention",
        description: "Generated SQL is validated before execution, blocking destructive or out-of-scope queries at the LLM output layer.",
      },
      {
        icon: "Timer",
        title: "Fast, everyday responses",
        description: "Tuned to keep the question-to-answer loop quick enough for casual, daily use rather than a one-off lookup.",
      },
    ],
    architecture:
      "A FastAPI service receives the question, sends it to the active LLM provider with database schema context to generate T-SQL, validates the generated query before execution, runs it against SQL Server, and returns a plain-language answer. Custom JWT authentication, written from the Python standard library rather than a third-party package, protects every endpoint.",
    workflow: [
      "A team member asks a question in plain language, in whichever supported language they're comfortable with.",
      "The question is sent to the active LLM provider along with database schema context.",
      "The LLM generates a T-SQL query, which is validated before anything runs.",
      "The validated query executes against SQL Server.",
      "The result comes back as a plain-language answer.",
    ],
    challenges: [
      {
        challenge: "Letting an LLM generate SQL directly is a real injection risk.",
        whyDifficult:
          "A model that can write arbitrary T-SQL can just as easily write a destructive query as a safe one, and the whole point of the tool was to let non-technical users run it unsupervised.",
        solution:
          "Added a validation layer between SQL generation and execution that inspects the generated query and blocks anything outside a safe, read-focused pattern.",
        result: "Non-technical teams can query the database daily without a person reviewing every request first.",
      },
      {
        challenge: "One AI provider going down or rate-limiting would take the whole chatbot offline.",
        whyDifficult:
          "The bot is used daily during normal working hours, so any downtime is immediately visible to the whole team rather than a background job quietly retrying.",
        solution: "Built a fallback chain that switches from the primary provider to a secondary one automatically on failure.",
        result: "The chatbot has stayed usable through provider-side issues that would otherwise have caused an outage.",
      },
    ],
    technicalDecisions: [
      {
        decision: "Custom JWT auth written from the Python standard library instead of a third-party package",
        reasoning: "Kept the authentication layer small, dependency-light, and fully understood rather than pulling in a larger framework for something this focused.",
      },
    ],
    securityConsiderations: [
      "Generated SQL is validated before execution to block destructive or out-of-scope queries.",
      "Custom JWT authentication protects every endpoint.",
    ],
    performanceConsiderations: ["Tuned the generation-to-execution loop to keep responses fast enough for everyday, casual use."],
    scalabilityConsiderations: ["Dual-provider failover means the chatbot keeps working through a single provider's rate limits or outages."],
    results: [
      "Used daily by non-technical teams as their main way of getting quick answers from the database.",
      "Removed a recurring bottleneck where every ad-hoc question had to go through a data person first.",
    ],
    lessonsLearned: ["Letting an LLM touch a production database safely is mostly a validation-layer problem, not a prompting problem."],
    futureImprovements: ["Add caching for repeated common questions to cut average response time further."],
  },
  {
    id: "etl-data-validation-platform",
    slug: "etl-data-validation-platform",
    title: "ETL & Data Validation Platform",
    subtitle: "Python ETL pipelines, automated data validation, and Power BI dashboards replacing a manual workflow",
    shortDescription:
      "A production data platform that ingests data from multiple sources, validates it automatically at scale, models it into a star schema, and surfaces it through Power BI dashboards business teams actually use.",
    fullDescription:
      "The data infrastructure behind day-to-day reporting and decision-making at ERelate Labs — Python ETL pipelines with full audit traceability, an automated validation engine that replaced a manual Excel QA process, a star schema data model, and Power BI dashboards used directly by business teams instead of one-off report requests.",
    category: "Data Engineering",
    featured: true,
    status: "Completed",
    company: "ERelate Labs Pvt. Ltd.",
    coverImage: "/assets/projects/etl-data-validation-platform/cover.svg",
    galleryImages: [],
    technologies: ["Python", "SQL Server", "PostgreSQL", "MySQL", "Power BI"],
    techGroups: [
      { group: "Backend", items: ["Python", "Pandas", "NumPy"] },
      { group: "Database", items: ["SQL Server", "PostgreSQL", "MySQL"] },
      { group: "Tools", items: ["Power BI", "DAX", "Power Query", "openpyxl"] },
    ],
    problem:
      "Data validation was done manually in Excel against reference files, which was slow and error-prone and didn't scale as record volume grew — and business teams had to file a request and wait every time they needed a report that wasn't already built.",
    motivation:
      "Wanted to replace a manual, spreadsheet-driven process with something that actually scaled, and give business teams the ability to self-serve their own reporting instead of queuing behind ad-hoc requests.",
    objectives: [
      "Replace manual Excel-based QA with an automated validation engine.",
      "Give every pipeline run full audit traceability, not just a pass or fail result.",
      "Model the data so reporting teams could self-serve instead of filing requests.",
    ],
    targetUsers: "Internal business and analytics teams who need reliable, validated data and reports without waiting on a manual process.",
    solution:
      "Python-based ETL pipelines handle schema alignment, completeness checks, and transformation logic, with every run leaving a full audit trail. An automated validation engine compares thousands of records per run against reference files, replacing the manual Excel process entirely. The validated data is modeled into a star schema across orders, customers, products, and transactions, and surfaced through Power BI dashboards with drill-down slicers and geographic maps.",
    keyFeatures: [
      {
        icon: "Workflow",
        title: "Auditable ETL pipelines",
        description: "Every pipeline run leaves a full audit trail — what changed, what was validated, what failed.",
      },
      {
        icon: "CheckCheck",
        title: "Automated data validation",
        description: "Compares thousands of records per run against reference files, replacing a fully manual Excel QA process.",
      },
      {
        icon: "Network",
        title: "Star schema data model",
        description: "Orders, customers, products, and transactions modeled for fast, reliable reporting queries.",
      },
      {
        icon: "BarChart3",
        title: "Self-serve Power BI dashboards",
        description: "DAX measures covering YoY revenue, margins, and regional performance, with drill-down and geographic maps.",
      },
    ],
    architecture:
      "Source data is profiled before ingestion — checking for null patterns, duplicates, and schema issues — so problems get caught before they enter a pipeline run. Python handles extraction, transformation, and validation across SQL Server, PostgreSQL, and MySQL sources; validated data is loaded into a star schema; Power BI connects directly to the modeled tables for reporting.",
    workflow: [
      "Source data is profiled before ingestion to catch null patterns, duplicates, and schema issues early.",
      "ETL pipelines extract and transform data from each source, with schema alignment and completeness checks.",
      "The validation engine compares processed records against reference files at scale.",
      "Validated data is loaded into a star schema modeled around orders, customers, products, and transactions.",
      "Power BI dashboards connect to the modeled data for self-serve reporting.",
    ],
    challenges: [
      {
        challenge: "Manual Excel-based QA couldn't keep up as record volume grew.",
        whyDifficult: "Comparing large volumes of records against reference files by hand is slow and error-prone, and the process didn't get faster as the business generated more data.",
        solution: "Built an automated validation engine that runs the same comparison logic against reference files at scale.",
        result: "QA validation cycle time dropped by 70%, and the process no longer depends on someone manually working through spreadsheets.",
      },
      {
        challenge: "Business teams were stuck waiting on ad-hoc reporting requests.",
        whyDifficult: "Every new reporting need had to be built one-off, which meant a queue of requests with a data person as the bottleneck for anything not already covered.",
        solution: "Modeled the data into a star schema and built self-serve Power BI dashboards with drill-down slicers so business teams could answer most of their own questions.",
        result: "Ad-hoc reporting requests dropped by 40%.",
      },
    ],
    technicalDecisions: [
      {
        decision: "Star schema over a flatter reporting model",
        reasoning: "Modeling orders, customers, products, and transactions as a star schema kept Power BI queries fast and made adding new measures straightforward as reporting needs grew.",
      },
    ],
    performanceConsiderations: ["Pre-ingestion data profiling catches null patterns, duplicates, and schema issues before they reach a pipeline run, instead of failing partway through."],
    scalabilityConsiderations: ["The validation engine's reference-file comparison approach scales to high record volumes per run without manual intervention."],
    results: [
      "QA validation cycle time cut by 70%, replacing a fully manual Excel process.",
      "Ad-hoc reporting requests down 40% thanks to self-serve Power BI dashboards.",
      "Reporting now runs on a star schema instead of ad-hoc queries against raw source tables.",
    ],
    lessonsLearned: ["Catching data problems before ingestion is far cheaper than catching them after a pipeline run fails halfway through."],
    futureImprovements: ["Extend automated validation coverage to additional data sources as they're onboarded."],
  },
  {
    id: "educational-erp-recruitment-module",
    slug: "educational-erp-recruitment-module",
    title: "Educational ERP — Recruitment Module",
    subtitle: "Microservices-based applicant tracking and admissions-lead system for an educational institution",
    shortDescription:
      "A microservices backend, plus its web frontend, adding recruitment and admissions-lead management to a larger educational ERP — job postings, a public career portal, candidate applications, and a lead pipeline for admissions counselors.",
    fullDescription:
      "A new branch of a larger educational ERP built at Matisaar Technologies: independent microservices for authentication, recruitment, and admissions leads, sitting behind a shared API gateway. It covers a public-facing career portal for job candidates and an internal lead pipeline for admissions counselors, plus the web frontend both groups use.",
    category: "Full Stack",
    featured: true,
    status: "In Progress",
    company: "Matisaar Technologies",
    coverImage: "/assets/projects/educational-erp-recruitment-module/cover.svg",
    galleryImages: [],
    technologies: ["ASP.NET Core", "C#", "PostgreSQL", "Ocelot", "Azure Blob Storage"],
    techGroups: [
      { group: "Backend", items: ["ASP.NET Core (.NET 8)", "C#", "Clean Architecture", "Ocelot API Gateway"] },
      { group: "Database", items: ["PostgreSQL"] },
      { group: "Cloud", items: ["Azure Blob Storage"] },
      { group: "Tools", items: ["JWT Bearer Auth", "Serilog", "Swagger / OpenAPI"] },
    ],
    problem:
      "The institution needed a way to manage both hiring and admissions leads, but neither process had a dedicated system — job postings and candidate applications were handled ad hoc, and admissions leads had no structured pipeline or escalation tracking.",
    motivation:
      "This is a new branch of a larger educational ERP I'm building at Matisaar — I wanted to add recruitment and lead management as proper, independent microservices rather than bolting them onto an existing monolith.",
    objectives: [
      "Give the institution a public career portal where candidates can browse jobs by campus and department and apply directly.",
      "Track every application through its full lifecycle, from draft job posting to published, closed, or archived.",
      "Give admissions counselors a structured lead pipeline with escalation and communication history instead of tracking leads informally.",
    ],
    targetUsers: "Internal HR and admissions staff at the institution, plus external job candidates through the public career portal.",
    solution:
      "Independent ASP.NET Core microservices — Auth, Lead, and Recruitment — sit behind an Ocelot API gateway with centralized JWT authentication. The Recruitment service powers a public career portal (browse campuses → departments → jobs → apply, with application tracking by reference number) and an internal job posting workflow (draft → submitted → published → closed → archived). The Lead service manages admissions leads with status tracking, escalation calls, and communication history. I also built the web frontend both staff and candidates use.",
    keyFeatures: [
      {
        icon: "Building2",
        title: "Multi-campus career portal",
        description: "Public candidates browse jobs by campus and department, and track their application by reference number.",
      },
      {
        icon: "GitBranch",
        title: "Full job posting lifecycle",
        description: "Job posts move through draft, submitted, published, closed, and archived states.",
      },
      {
        icon: "PhoneCall",
        title: "Admissions lead pipeline",
        description: "Leads are tracked through status changes, escalation calls, and a full communication history.",
      },
      {
        icon: "ShieldCheck",
        title: "Gateway-level authentication",
        description: "An Ocelot API gateway centralizes JWT authentication and routing across every service.",
      },
    ],
    architecture:
      "Each capability is its own ASP.NET Core microservice (Auth, Lead, Recruitment), following Clean Architecture with separate Domain, Application, Infrastructure, and API layers. An Ocelot API gateway sits in front, handling routing and JWT authentication centrally so individual services don't duplicate that logic. PostgreSQL is the primary datastore, and candidate and lead documents are stored in Azure Blob Storage.",
    workflow: [
      "HR staff create a job post as a draft, tied to a campus and department.",
      "The job post moves through submission and publishing before it appears on the public career portal.",
      "A candidate browses campuses and departments, applies to a job, and receives a tracking reference number.",
      "Admissions leads move through their own pipeline — status updates, escalation calls, and logged communication — independent of the recruitment flow.",
    ],
    challenges: [
      {
        challenge: "Keeping recruitment (hiring) and admissions (leads) as genuinely separate concerns instead of one tangled module.",
        whyDifficult:
          "Both processes involve similar-sounding ideas — applications, statuses, documents — which makes it tempting to merge them into one generic pipeline service that ends up serving neither well.",
        solution:
          "Split them into two independent microservices with their own domain models, so each can evolve around its actual workflow instead of a shared, watered-down abstraction.",
        result: "Each service's domain model — job posting lifecycle vs. lead escalation — matches its real workflow instead of being forced into a shared shape.",
      },
      {
        challenge: "Routing and authenticating requests consistently across multiple independent services.",
        whyDifficult:
          "Without a shared gateway, every service would need to implement and maintain its own JWT validation, duplicating security-critical code across services.",
        solution: "Put an Ocelot API gateway in front of every service, centralizing JWT authentication and request routing in one place.",
        result: "New services can be added behind the gateway without re-implementing authentication from scratch.",
      },
    ],
    technicalDecisions: [
      {
        decision: "Separate microservices over one larger monolith",
        reasoning:
          "Recruitment and admissions-lead management are genuinely different domains inside the same institution — splitting them lets each evolve independently instead of coupling unrelated workflows together.",
      },
      {
        decision: "Ocelot as the API gateway",
        reasoning:
          "Centralizes routing and authentication for every service in one configurable place instead of duplicating JWT validation logic across each microservice.",
      },
    ],
    securityConsiderations: [
      "JWT bearer authentication is enforced centrally at the API gateway rather than per-service.",
      "Candidate and lead documents are stored in Azure Blob Storage rather than on local disk.",
    ],
    scalabilityConsiderations: [
      "Each microservice can be scaled or deployed independently since they don't share a codebase or database context.",
    ],
    results: [
      "The public career portal, job posting lifecycle, and admissions lead pipeline are functional end to end as independent services behind a shared gateway.",
    ],
    lessonsLearned: [
      "Splitting genuinely different domains into separate services early is easier than untangling one shared, generic pipeline abstraction later.",
    ],
    futureImprovements: [
      "Finish wiring the Recruitment service and the ERP's other modules behind the API gateway.",
      "Add centralized structured logging and request tracing across all services, not just individual service logs.",
    ],
  },
  {
    id: "zealchatbot",
    slug: "zealchatbot",
    title: "ZealChatBot",
    subtitle: "An embeddable AI chat widget for instant answers, in the style of Intercom or Drift",
    shortDescription:
      "An AI chatbot built as a compact, embeddable floating widget rather than a full page, with a smart recommendation engine and a calm, restrained visual design.",
    fullDescription:
      "ZealChatBot is an AI chatbot built from scratch as a floating widget that can be embedded on any website with a single script tag, in the style of Intercom or Drift — including a recommendation engine that surfaces relevant follow-up questions after every answer.",
    category: "Full Stack",
    featured: true,
    status: "Completed",
    company: "Matisaar Technologies",
    coverImage: "/assets/projects/zealchatbot/cover.svg",
    galleryImages: [],
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Vite", "FastAPI", "Python"],
    techGroups: [
      { group: "Frontend", items: ["React", "Vite", "Tailwind CSS", "Framer Motion", "react-markdown"] },
      { group: "Backend", items: ["FastAPI", "Python"] },
      { group: "Tools", items: ["react-icons", "highlight.js"] },
    ],
    problem:
      "Visitors to a website often need quick answers without leaving the page or waiting on human support, but a full-page chatbot doesn't fit naturally into an existing site — it either takes over the whole screen or has nowhere to live.",
    motivation:
      "Wanted to build a chat widget that could be dropped onto any site with almost no integration effort, with a visual design good enough to sit comfortably next to a Stripe- or Linear-quality product rather than a 'good enough' internal tool.",
    objectives: [
      "Build a floating chat widget that can be embedded on any external site with minimal setup.",
      "Keep the visual design restrained — a single accent color used purposefully instead of a busy palette.",
      "Add a recommendation engine that suggests relevant follow-up questions instead of leaving people staring at a blank input box.",
    ],
    targetUsers: "Visitors to a client website who want quick answers without leaving the page they're on, and the client team who needed a lightweight, brandable support widget.",
    solution:
      "Built the frontend in React with Tailwind CSS and Framer Motion as a small circular launcher that expands into a floating chat panel (a fullscreen sheet on phones). The frontend compiles into static assets that the backend serves directly, so the whole widget ships as one deployable unit. A lightweight embed script lets the widget be added to any external site with a single line of HTML.",
    keyFeatures: [
      {
        icon: "MessageCircle",
        title: "Floating widget, not a full page",
        description: "A circular launcher expands into a chat panel — a fixed-size floating card on desktop, a fullscreen sheet on mobile.",
      },
      {
        icon: "Sparkles",
        title: "Smart recommendation engine",
        description: "After every answer, contextual follow-up questions are suggested based on lightweight intent detection on the conversation.",
      },
      {
        icon: "Palette",
        title: "Calm, single-accent design system",
        description: "Built around one primary accent color used purposefully, instead of a busy multi-color palette.",
      },
      {
        icon: "Code2",
        title: "One-line embed",
        description: "A small embed script injects the widget as a resizing iframe — no other markup or CSS needed on the host page.",
      },
    ],
    architecture:
      "The frontend is a React + Vite + Tailwind + Framer Motion single-page app that builds into static assets served directly by the backend — no separate frontend deployment or Node.js runtime needed in production. For embedding on external sites, a small script injects a transparent iframe that resizes itself based on messages from the widget (launcher size when closed, full panel when open).",
    workflow: [
      "The compiled widget loads inside an iframe embedded via a single script tag on the host site.",
      "A visitor taps the floating launcher, which expands into the chat panel.",
      "They ask a question directly, or start from a welcome screen of suggested topics.",
      "After each answer, a row of recommended follow-up questions appears based on the conversation so far.",
      "Closing the widget collapses the iframe back down to just the launcher button.",
    ],
    challenges: [
      {
        challenge: "Embedding a full chat interface on an external site without touching that site's own layout or styles.",
        whyDifficult:
          "A normal embedded component risks CSS conflicts with the host page's own styles, and needs to resize itself between a small launcher and a full chat panel without any cooperation from the host page.",
        solution:
          "Used a small script that injects a transparent iframe pinned to a corner, with the iframe's own content posting a message to resize it — so the host page never needs to know the widget's internal size logic.",
        result: "The widget can be dropped onto any external site with a single script tag, with zero risk of CSS collisions.",
      },
      {
        challenge: "Serving the frontend and backend as a single deployable unit without extra infrastructure.",
        whyDifficult: "Running a separate Node server or static host for the frontend would mean managing two deployments and cross-origin configuration for one small widget.",
        solution: "Built the frontend to compile into static assets that the backend serves directly, so the whole widget ships as a single service.",
        result: "The whole widget — frontend and backend together — deploys as one service with no extra infrastructure to manage.",
      },
    ],
    technicalDecisions: [
      {
        decision: "Static build served directly by the backend, rather than a separately hosted frontend",
        reasoning: "Keeps deployment to a single service — no separate frontend host, no cross-origin configuration to manage, no Node.js runtime needed in production.",
      },
    ],
    securityConsiderations: [
      "The embed script only ever renders the widget inside an isolated iframe, so it can't read or modify anything else on the host page.",
    ],
    performanceConsiderations: ["The production build compiles to static assets served directly by the backend, avoiding a separate frontend server or extra network hop."],
    results: [
      "Shipped as a complete, working widget — frontend and backend together — ready to embed on any external site.",
      "The widget can be embedded on any external website with a single script tag.",
    ],
    lessonsLearned: ["Compiling the frontend straight into the backend's static-asset folder from day one kept deployment simple without needing a separate frontend host."],
    futureImprovements: ["Add configurable theming so the widget's accent color can be matched to different host sites without a rebuild."],
  },
];
