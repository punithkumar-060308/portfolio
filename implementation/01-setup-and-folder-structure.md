# 01 — Setup and Folder Structure

## Prerequisites
- Node.js LTS and npm
- Python 3.11+
- Git
- MongoDB local instance or MongoDB Atlas database
- Code editor

## Create the repository
```bash
mkdir punith-portfolio
cd punith-portfolio
git init

npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
npm install axios framer-motion lucide-react react-router-dom
npm install -D tailwindcss @tailwindcss/vite
cd ..

mkdir backend
cd backend
python -m venv .venv
# Windows PowerShell:
.venv\Scripts\Activate.ps1
# macOS/Linux:
# source .venv/bin/activate

pip install fastapi "uvicorn[standard]" pymongo pydantic-settings email-validator python-multipart
pip install pytest httpx
pip freeze > requirements.txt
```

Configure Tailwind using the setup instructions for the installed Tailwind version. Do not blindly copy configuration from an older major version.

## Suggested repository layout
```text
punith-portfolio/
├── frontend/
│   ├── public/
│   │   ├── images/
│   │   └── resume.pdf
│   └── src/
│       ├── app/
│       │   ├── App.tsx
│       │   └── router.tsx
│       ├── assets/
│       ├── components/
│       │   ├── layout/
│       │   ├── navigation/
│       │   ├── sections/
│       │   ├── projects/
│       │   └── ui/
│       ├── data/
│       │   ├── profile.ts
│       │   ├── projects.ts
│       │   └── skills.ts
│       ├── hooks/
│       ├── lib/
│       │   └── api.ts
│       ├── pages/
│       ├── styles/
│       └── main.tsx
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── core/
│   │   ├── api/routes/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── db/
│   ├── tests/
│   ├── .env.example
│   └── requirements.txt
├── implementation/
└── README.md
```

## Local development
Frontend:
```bash
cd frontend
npm run dev
```

Backend:
```bash
cd backend
uvicorn app.main:app --reload --port 8000
```

API documentation will be available at `http://localhost:8000/docs` while the backend is running.

## Development conventions
- Use TypeScript types for API responses and content models.
- Keep reusable UI components separate from page sections.
- Keep API calls in `lib/api.ts`, not directly inside visual components.
- Keep environment files out of Git.
- Use feature branches and small commits.
