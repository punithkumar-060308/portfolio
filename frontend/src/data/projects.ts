/**
 * ============================================================================
 * PROJECT BLUEPRINT & DATA REPOSITORY
 * ============================================================================
 *
 * HOW TO ADD A NEW PROJECT:
 * ----------------------------------------------------------------------------
 * 1. Copy the `PROJECT_BLUEPRINT_TEMPLATE` below.
 * 2. Paste it into the `projectsData` array.
 * 3. Fill in your project details. Any optional fields (like `coverImage`,
 *    `demoUrl`, `docsUrl`, `metric`) will cleanly hide if omitted or left undefined.
 * 4. The sequential numbers ("01", "02", "03"...), layout grid, animations,
 *    hover glows, and popup modals are AUTOMATICALLY generated and handled.
 * ============================================================================
 */

export interface ProjectMetric {
  value: string; // e.g., "+94.2%", "4.8x", "500+"
  label: string; // e.g., "Accuracy", "Faster Resolution", "Certificates"
  trend?: "up" | "down";
}

export interface Project {
  slug: string; // Unique URL-friendly slug, e.g. "my-project-name"
  title: string; // Project Name, e.g. "Exo-Scan AI"
  displayTitle?: string; // Optional uppercase title label shown below card, defaults to title
  tag: string; // Top badge on card, e.g. "AI & ML", "FULL-STACK", "AUTOMATION"
  category: "AI/ML" | "Full-Stack" | "Automation" | "Robotics" | "Computer Vision";
  status: "Completed" | "In Progress" | "Prototype";
  summary: string; // Concise 1-2 sentence card summary
  description: string; // Comprehensive multi-paragraph architectural overview
  problem: string; // Core problem statement
  solution: string; // Engineered technical solution
  role?: string; // Your specific responsibilities and contributions
  coverImage?: string; // Path or URL to screenshot/cover image (e.g. "/projects/my-screenshot.png")
  bannerImage?: string; // Optional modal header banner image
  githubUrl?: string; // GitHub repository link
  demoUrl?: string; // Live demo or production deployment link
  docsUrl?: string; // Documentation or paper link
  presentationUrl?: string; // Presentation or slide deck link
  metric?: ProjectMetric; // Key metric badge displayed on card
  stack: string[]; // List of technologies (e.g. ["Python", "PyTorch", "Docker"])
  keyFeatures: string[]; // List of key technical features
  highlights?: string[]; // Quick bullet points
  featured?: boolean;
}

/**
 * ============================================================================
 * REUSABLE BLUEPRINT TEMPLATE (COPY & PASTE THIS FOR NEW PROJECTS)
 * ============================================================================
 *
 * {
 *   slug: "your-project-slug",
 *   title: "Your Project Title",
 *   displayTitle: "YOUR PROJECT DISPLAY NAME",
 *   tag: "SYSTEM ARCHITECTURE",
 *   category: "AI/ML",
 *   status: "In Progress",
 *   summary: "Short concise description of what this project accomplishes.",
 *   description: "Detailed system architecture and implementation narrative.",
 *   problem: "What engineering challenge or bottleneck prompted this build.",
 *   solution: "How you technically solved it using your chosen stack.",
 *   role: "Your leadership, system design, or engineering contributions.",
 *   coverImage: undefined, // e.g., "/projects/preview.png" or leave undefined for animated canvas
 *   githubUrl: "https://github.com/your-username/repo",
 *   demoUrl: undefined,
 *   docsUrl: undefined,
 *   metric: {
 *     value: "+99.0%",
 *     label: "Reliability",
 *     trend: "up"
 *   },
 *   stack: ["TypeScript", "Python", "FastAPI"],
 *   keyFeatures: [
 *     "Feature one description",
 *     "Feature two description"
 *   ],
 *   highlights: [
 *     "Highlight bullet one"
 *   ],
 *   featured: true
 * }
 */

export const projectsData: Project[] = [
  {
    slug: "exo-scan-ai",
    title: "Exo-Scan AI",
    displayTitle: "EXO-SCAN PHOTOMETRIC PIPELINE",
    tag: "ASTRONOMY & AI",
    category: "AI/ML",
    status: "Prototype",
    summary: "Astronomical photometric pipeline analysing NASA TESS light curves to detect exoplanet transit signatures.",
    description: "A machine learning and signal processing pipeline built to preprocess raw space-telescope flux measurements, eliminate instrumental noise, and classify potential exoplanetary transits using deep convolutional architectures.",
    problem: "NASA's TESS telescope generates millions of photometric time-series observations. Manual inspection of brightness dips (transits) caused by orbiting exoplanets is infeasible due to stellar flares, systematic spacecraft pointing noise, and high false-positive rates.",
    solution: "Designed an automated preprocessing and classification workflow utilizing Lightkurve and Box Least Squares (BLS) period searching, coupled with a 1D-CNN classifier trained on labeled Kepler and TESS transit candidates to discern true transits from eclipsing binaries.",
    role: "ML & Astronomical Data Pipeline Lead — Architected the photometric preprocessing routines, implemented BLS transit search algorithms, and trained the 1D-CNN candidate classification model.",
    coverImage: "/exo-scan-cover.jpg",
    githubUrl: "https://github.com",
    demoUrl: undefined,
    docsUrl: "https://github.com",
    metric: {
      value: "+94.2%",
      label: "Transit Accuracy",
      trend: "up"
    },
    stack: ["Python", "TensorFlow", "Lightkurve", "NumPy", "SciPy", "Matplotlib"],
    keyFeatures: [
      "Automated FITS photometric file ingestion and raw flux data calibration.",
      "Outlier rejection, spline trend normalization, and spacecraft jitter noise reduction.",
      "Box Least Squares (BLS) periodogram computation to detect periodic orbital dips.",
      "Deep 1D-CNN model to separate bona fide planetary transits from stellar variability and instrument anomalies.",
      "Automated phase-folding visualization and transit candidate summary generation."
    ],
    highlights: [
      "Performs phase-folding, detrending, and outlier rejection on raw FITS time-series flux data.",
      "Identifies periodic transit candidates using Box Least Squares (BLS) period searching.",
      "Engineered lightweight CNN model distinguishing genuine planetary transit dips from eclipsing binaries."
    ],
    featured: true
  },
  {
    slug: "sentinelmesh-ai",
    title: "SentinelMesh AI",
    displayTitle: "AUTONOMOUS INCIDENT REMEDIATION",
    tag: "MULTI-AGENT AI",
    category: "AI/ML",
    status: "In Progress",
    summary: "Multi-agent autonomous incident detection, diagnosis, and automated remediation framework.",
    description: "An orchestration engine designed for high-availability backend services that monitors real-time system metrics, classifies anomaly severity, and coordinates specialized AI agents to execute safe remediation playbooks.",
    problem: "Modern cloud microservices generate thousands of log traces and distributed metrics. When cascading failures occur, engineer incident response is severely hampered by alert fatigue and manual cross-service correlation.",
    solution: "Developed an asynchronous multi-agent architecture where detector agents flag anomalies, analyst agents query telemetry traces to isolate root causes, and remediation agents safely propose or trigger container recovery actions under strict guardrails.",
    role: "System Architect & Backend Developer — Designed the multi-agent state graph, asynchronous telemetry ingestion collector, and safe Docker engine reconciliation playbooks.",
    coverImage: "/sentinelmesh-cover.jpg",
    githubUrl: "https://github.com",
    demoUrl: undefined,
    docsUrl: "https://github.com",
    metric: {
      value: "4.8x",
      label: "Faster Resolution",
      trend: "up"
    },
    stack: ["Python", "FastAPI", "Docker", "Pydantic", "Redis", "LangGraph"],
    keyFeatures: [
      "Multi-agent collaborative state graph with specialized roles: Detector, Analyst, and Remediator.",
      "Real-time metric anomaly identification and log pattern clustering.",
      "Safe remediation loop with human-in-the-loop review mode and rollback mechanisms.",
      "High-throughput FastAPI telemetry ingestion service backed by Redis message queues.",
      "Container health monitoring and automated healing actions via Docker Engine API."
    ],
    highlights: [
      "Multi-agent coordination workflow with safety guardrails and human-in-the-loop approvals.",
      "FastAPI telemetry collector handling metric ingestion with sub-second analysis turnaround.",
      "Container health reconciliation via Docker engine API."
    ],
    featured: true
  },
  {
    slug: "acm-automation-suite",
    title: "ACM Automation Suite",
    displayTitle: "STUDENT CHAPTER AUTOMATION SUITE",
    tag: "FULL-STACK PLATFORM",
    category: "Full-Stack",
    status: "Completed",
    summary: "Modular workflow automation engine for student chapter memberships, event ticketing, and digital certificates.",
    description: "A production web application built to eliminate repetitive administrative overhead for the ACM Student Chapter. Manages registration rosters, automates cryptographic verification badges, and sends bulk personalized emails.",
    problem: "Issuing certificates and tracking attendance for hundreds of hackathon participants manually was error-prone, consumed dozens of hours, and resulted in duplicate entries and verification failures.",
    solution: "Built a centralized web portal with role-based access, automated PDF certificate rendering with tamper-evident QR verification codes, and a reliable email distribution queue.",
    role: "Full-Stack Developer — Built the responsive React frontend dashboard, engineered the high-throughput PDF generation pipeline, and implemented the MongoDB credential verification system.",
    coverImage: "/acm-suite-cover.jpg",
    githubUrl: "https://github.com",
    demoUrl: "https://github.com",
    docsUrl: "https://github.com",
    metric: {
      value: "500+",
      label: "Credentials Issued",
      trend: "up"
    },
    stack: ["React", "TypeScript", "Tailwind CSS", "FastAPI", "MongoDB", "Pydantic"],
    keyFeatures: [
      "Dynamic high-throughput PDF generation pipeline creating 500+ customized certificates in seconds.",
      "Unique tamper-evident verification URLs and QR validation for each issued credential.",
      "Role-based access control (RBAC) separating administrative staff from attendee access.",
      "Asynchronous email dispatcher with personalization tags and delivery tracking.",
      "Responsive analytics dashboard for real-time member registrations and event check-in counts."
    ],
    highlights: [
      "Dynamic high-throughput PDF generation pipeline creating 500+ customized certificates in seconds.",
      "Unique tamper-evident verification URLs and QR validation for each issued credential.",
      "Responsive administrator dashboard for member analytics and event attendance logs."
    ],
    featured: true
  },
  {
    slug: "neuralflow-vision",
    title: "NeuralFlow Vision",
    displayTitle: "REAL-TIME EDGE OBJECT TRACKING",
    tag: "EDGE AI & CV",
    category: "AI/ML",
    status: "Completed",
    summary: "Ultra-low-latency edge computer vision pipeline for multi-object detection, trajectory tracking, and spatial speed estimation.",
    description: "A production-grade edge computer vision framework built on TensorRT and PyTorch. Capable of processing multi-stream high-definition video feeds to detect dynamic objects, predict occlusion trajectories using Kalman filtering, and compute real-time spatial velocity vectors.",
    problem: "Deploying high-accuracy deep object detectors on edge hardware typically induces severe latency spikes and dropped frames, making real-time spatial tracking and trajectory forecasting unreliable in resource-constrained environments.",
    solution: "Engineered an INT8 quantized YOLOv8 inference pipeline accelerated via TensorRT with custom CUDA memory pooling, integrated alongside an enhanced ByteTrack association tracker and velocity extrapolation module operating at 60+ FPS on edge embedded devices.",
    role: "Edge AI Engineer — Quantized deep neural architectures, built TensorRT execution pipelines, and engineered low-overhead multi-object tracking association logic.",
    coverImage: "/neuralflow-cover.jpg",
    githubUrl: "https://github.com",
    demoUrl: undefined,
    docsUrl: "https://github.com",
    metric: {
      value: "64 FPS",
      label: "Edge Inference",
      trend: "up"
    },
    stack: ["Python", "PyTorch", "TensorRT", "OpenCV", "CUDA", "YOLOv8"],
    keyFeatures: [
      "INT8 quantized deep neural detection delivering 64 FPS on edge hardware.",
      "Multi-object ByteTrack association with Kalman trajectory extrapolation.",
      "Occlusion resilience and cross-frame spatial re-identification.",
      "CUDA asynchronous memory pooling for zero-copy frame ingestion.",
      "Real-time velocity and trajectory vector overlay rendering."
    ],
    highlights: [
      "Sustained 64 FPS real-time edge inference with INT8 quantization.",
      "ByteTrack multi-target association robust to long occlusions.",
      "Zero-copy CUDA memory pooling reducing frame transfer overhead by 70%."
    ],
    featured: true
  },
  {
    slug: "cognigraph-rag",
    title: "CogniGraph RAG",
    displayTitle: "GRAPH-AUGMENTED INTELLIGENT RETRIEVAL",
    tag: "KNOWLEDGE GRAPH & NLP",
    category: "AI/ML",
    status: "In Progress",
    summary: "Hybrid GraphRAG retrieval engine integrating vector embeddings and Neo4j knowledge graphs for multi-hop semantic reasoning.",
    description: "An advanced retrieval-augmented generation platform combining dense vector search with structural knowledge graph traversals. Resolves multi-hop entity queries across technical documentation, codebases, and domain specifications with verifiable citation paths.",
    problem: "Traditional dense vector RAG models suffer from semantic blindness when queries require synthesizing relationships across non-adjacent document sections, entity hierarchies, or complex multi-step reasoning paths.",
    solution: "Architected a hybrid GraphRAG framework using LangChain, Qdrant vector indexing, and Neo4j labeled property graphs with automated Cypher query synthesis to retrieve structural relationship subgraphs alongside semantic chunk embeddings.",
    role: "NLP & Knowledge Systems Lead — Built automated entity extraction pipelines, designed Neo4j graph schema, and engineered hybrid vector-graph fusion rerankers.",
    coverImage: "/cognigraph-cover.jpg",
    githubUrl: "https://github.com",
    demoUrl: undefined,
    docsUrl: "https://github.com",
    metric: {
      value: "+88.4%",
      label: "Multi-Hop Accuracy",
      trend: "up"
    },
    stack: ["Python", "LangChain", "Neo4j", "Qdrant", "FastAPI", "HuggingFace"],
    keyFeatures: [
      "Hybrid dense-vector and knowledge graph traversal retrieval pipeline.",
      "Automated entity-relation extraction and dynamic Cypher query synthesis.",
      "Multi-hop graph reasoning over dense dependency hierarchies.",
      "Reciprocal Rank Fusion (RRF) reranking of graph context and vector hits.",
      "Verifiable entity citation paths and hallucination mitigation guardrails."
    ],
    highlights: [
      "Achieves +88.4% retrieval accuracy on complex multi-hop relational queries.",
      "Dynamic entity-relation subgraph traversal with Cypher query synthesis.",
      "Hybrid vector-graph fusion eliminating knowledge retrieval dead ends."
    ],
    featured: true
  },
  {
    slug: "devpulse-telemetry",
    title: "DevPulse Telemetry",
    displayTitle: "DISTRIBUTED SERVICE TELEMETRY RUNTIME",
    tag: "DISTRIBUTED SYSTEMS",
    category: "Full-Stack",
    status: "Prototype",
    summary: "High-throughput distributed telemetry collector and anomaly stream processor built for microservice observability.",
    description: "A high-performance observability runtime built to ingest, aggregate, and query millions of distributed service metrics per second. Combines Kafka message buffering with ClickHouse columnar storage for real-time anomaly detection.",
    problem: "High-frequency microservice metrics and distributed tracing often overwhelm collector pipelines, causing tail-latency degradation, memory bloat, and dropped telemetry during traffic surges.",
    solution: "Engineered an asynchronous stream aggregator in Go and FastAPI with Kafka buffer queues and ClickHouse columnar storage, delivering sub-10ms query times over billions of metric data points.",
    role: "Backend & Systems Architect — Designed the event ingestion pipeline, ClickHouse time-series schema, and high-throughput Kafka consumers.",
    coverImage: "/devpulse-cover.jpg",
    githubUrl: "https://github.com",
    demoUrl: undefined,
    docsUrl: "https://github.com",
    metric: {
      value: "< 8ms",
      label: "Query Latency",
      trend: "down"
    },
    stack: ["Go", "FastAPI", "Kafka", "ClickHouse", "Docker", "Tailwind CSS"],
    keyFeatures: [
      "High-throughput stream ingestion processing 50,000+ metrics/sec per node.",
      "Columnar ClickHouse storage with zstd compression and partitioning.",
      "Asynchronous Kafka topic partitioning and buffered batch writing.",
      "Sub-10ms real-time metric filtering and anomaly threshold alerting.",
      "Interactive developer telemetry UI with instant time-range aggregations."
    ],
    highlights: [
      "Sub-8ms query latency across multi-million time-series telemetry rows.",
      "Kafka stream buffering handling traffic surges with zero dropped packets.",
      "ClickHouse columnar partitioning achieving 10x storage compression."
    ],
    featured: true
  }
];
