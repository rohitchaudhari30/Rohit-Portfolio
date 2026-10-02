import type { SkillCategory } from "@/types/content";

// Every item here is backed by either the resume's stated tech stack or the
// actual code in the analyzed projects — nothing here is a guess.
export const skills: SkillCategory[] = [
  {
    category: "Programming Languages",
    items: [
      { name: "Python", icon: "Code2" },
      { name: "SQL / T-SQL", icon: "Code2" },
      { name: "C#", icon: "Code2" },
      { name: "TypeScript", icon: "Code2" },
      { name: "JavaScript", icon: "Code2" },
    ],
  },
  {
    category: "Data Engineering",
    items: [
      { name: "ETL / ELT Pipelines", icon: "Workflow" },
      { name: "Data Warehousing (Star Schema)", icon: "Database" },
      { name: "Data Validation & Profiling", icon: "CheckCheck" },
      { name: "Data Transformation", icon: "Shuffle" },
      { name: "Pipeline Automation", icon: "Cog" },
      { name: "Data Cleansing", icon: "Eraser" },
      { name: "Pandas", icon: "Table" },
      { name: "NumPy", icon: "Sigma" },
      { name: "Document Data Extraction", icon: "FileSearch" },
    ],
  },
  {
    category: "BI & Analytics",
    items: [
      { name: "Power BI", icon: "BarChart3" },
      { name: "DAX", icon: "Sigma" },
      { name: "Power Query", icon: "Filter" },
      { name: "Data Visualization", icon: "PieChart" },
      { name: "Statistical Analysis", icon: "LineChart" },
      { name: "Exploratory Data Analysis (EDA)", icon: "Telescope" },
      { name: "Advanced Excel", icon: "FileSpreadsheet" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "FastAPI", icon: "Server" },
      { name: "ASP.NET Core", icon: "Server" },
      { name: "Entity Framework Core (Code-First, Migrations)", icon: "Layers" },
      { name: "REST APIs", icon: "Plug" },
      { name: "Microservices Architecture", icon: "Network" },
      { name: "API Gateway (Ocelot)", icon: "Route" },
      { name: "Clean Architecture", icon: "Layers" },
      { name: "SQLAlchemy (async)", icon: "Layers" },
      { name: "Alembic Migrations", icon: "GitCommitHorizontal" },
      { name: "ADO.NET", icon: "Database" },
      { name: "WebSockets", icon: "Radio" },
      { name: "JWT Auth", icon: "ShieldCheck" },
      { name: "asyncio", icon: "Zap" },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "SQL Server", icon: "Table" },
      { name: "PostgreSQL", icon: "Table" },
      { name: "MySQL", icon: "Table" },
      { name: "MongoDB", icon: "Table" },
      { name: "SQLite", icon: "Table" },
    ],
  },
  {
    category: "AI / ML",
    items: [
      { name: "LLM Integration (Groq, Gemini)", icon: "BrainCircuit" },
      { name: "NL-to-SQL", icon: "MessageSquareCode" },
      { name: "Vision LLMs", icon: "ScanEye" },
      { name: "Multi-Agent AI Pipelines", icon: "Workflow" },
      { name: "OCR (Tesseract)", icon: "ScanText" },
      { name: "Speech-to-Text (Whisper)", icon: "Mic" },
      { name: "Machine Learning", icon: "BrainCircuit" },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React", icon: "Atom" },
      { name: "Vite", icon: "Zap" },
      { name: "Framer Motion", icon: "Sparkles" },
      { name: "Zustand", icon: "Boxes" },
      { name: "Tailwind CSS", icon: "Paintbrush" },
      { name: "HTML / CSS", icon: "Code2" },
    ],
  },
  {
    category: "Cloud & Storage",
    items: [{ name: "Azure Blob Storage", icon: "Cloud" }],
  },
  {
    category: "Tools",
    items: [
      { name: "Git & GitHub", icon: "GitBranch" },
      { name: "Flask", icon: "FlaskConical" },
      { name: "Postman", icon: "Send" },
      { name: "Serilog (Structured Logging)", icon: "ScrollText" },
      { name: "Swagger / OpenAPI", icon: "FileCode" },
    ],
  },
];
