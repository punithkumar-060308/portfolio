from fastapi import APIRouter, HTTPException
from app.db.mongo import get_database

router = APIRouter(prefix="/projects", tags=["Projects"])

FALLBACK_PROJECTS = [
    {
        "slug": "exo-scan-ai",
        "title": "Exo-Scan AI",
        "summary": "Astronomical photometric pipeline analysing NASA TESS light curves to detect exoplanet transit signatures.",
        "description": "A machine learning and signal processing pipeline built to preprocess raw space-telescope flux measurements, eliminate instrumental noise, and classify potential exoplanetary transits using deep convolutional architectures.",
        "problem": "NASA's TESS telescope generates millions of photometric observations. Manual inspection of brightness dips caused by orbiting exoplanets is infeasible due to stellar flares, systematic noise, and false-positive rates.",
        "solution": "Designed an automated preprocessing and classification workflow utilizing Lightkurve and Box Least Squares (BLS) period searching, coupled with a 1D-CNN classifier.",
        "stack": ["Python", "TensorFlow", "Lightkurve", "NumPy", "SciPy", "Matplotlib"],
        "status": "Prototype",
        "category": "AI/ML",
        "featured": True,
        "github_url": "https://github.com",
        "demo_url": None,
        "highlights": [
            "Performs phase-folding, detrending, and outlier rejection on raw FITS time-series flux data.",
            "Identifies periodic transit candidates using Box Least Squares (BLS) period searching.",
            "Engineered lightweight CNN model distinguishing genuine planetary transit dips from eclipsing binaries."
        ]
    },
    {
        "slug": "sentinelmesh-ai",
        "title": "SentinelMesh AI",
        "summary": "Multi-agent autonomous incident detection, diagnosis, and automated remediation framework.",
        "description": "An orchestration engine designed for high-availability backend services that monitors real-time system metrics, classifies anomaly severity, and coordinates specialized AI agents to execute remediation playbooks.",
        "problem": "Modern cloud microservices generate thousands of log traces. When cascading failures happen, human incident response is delayed by alert fatigue and manual cross-service correlation.",
        "solution": "Developed an asynchronous multi-agent architecture where detector agents flag anomalies, analyst agents query telemetry traces, and remediation agents safely propose or trigger container recovery actions.",
        "stack": ["Python", "FastAPI", "Docker", "Pydantic", "Redis", "LangGraph"],
        "status": "In Progress",
        "category": "AI/ML",
        "featured": True,
        "github_url": "https://github.com",
        "demo_url": None,
        "highlights": [
            "Multi-agent coordination workflow with safety guardrails and human-in-the-loop approvals.",
            "FastAPI telemetry collector handling metric ingestion with sub-second analysis turnaround.",
            "Container health reconciliation via Docker engine API."
        ]
    },
    {
        "slug": "acm-automation-suite",
        "title": "ACM Automation Suite",
        "summary": "Modular workflow automation engine for student chapter memberships, event ticketing, and digital certificates.",
        "description": "A production web application built to eliminate repetitive administrative overhead for the ACM Student Chapter. Manages registration rosters, automates cryptographic verification badges, and sends bulk personalized emails.",
        "problem": "Issuing certificates and tracking attendance for hundreds of hackathon participants manually was error-prone, consumed dozens of hours, and resulted in duplicate entries.",
        "solution": "Built a centralized web portal with role-based access, automated PDF certificate rendering with verifiable QR codes, and a reliable email distribution queue.",
        "stack": ["React", "TypeScript", "Tailwind CSS", "FastAPI", "MongoDB", "Pydantic"],
        "status": "Completed",
        "category": "Full-Stack",
        "featured": True,
        "github_url": "https://github.com",
        "demo_url": "https://github.com",
        "highlights": [
            "Dynamic high-throughput PDF generation pipeline creating 500+ customized certificates in seconds.",
            "Unique tamper-evident verification URLs and QR validation for each issued credential.",
            "Responsive administrator dashboard for member analytics and event attendance logs."
        ]
    }
]

@router.get("")
def list_projects():
    db = get_database()
    if db is not None:
        try:
            projects = list(db["projects"].find({"published": True}, {"_id": 0}))
            if projects:
                return projects
        except Exception:
            pass
    return FALLBACK_PROJECTS

@router.get("/{slug}")
def get_project(slug: str):
    db = get_database()
    if db is not None:
        try:
            project = db["projects"].find_one({"slug": slug, "published": True}, {"_id": 0})
            if project:
                return project
        except Exception:
            pass
    for p in FALLBACK_PROJECTS:
        if p["slug"] == slug:
            return p
    raise HTTPException(status_code=404, detail="Project not found")
