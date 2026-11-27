
@echo off
echo =======================================================
echo Starting Punith Kumar B S Portfolio Development Servers
echo =======================================================
start "Portfolio Backend (FastAPI)" cmd /k "cd backend && python -m uvicorn app.main:app --reload --port 8000"
start "Portfolio Frontend (Vite)" cmd /k "cd frontend && npm run dev"
echo.
echo Both servers are launching in separate windows:
echo - Frontend: http://localhost:5173
echo - Backend:  http://localhost:8000/docs
echo =======================================================
