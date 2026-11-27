# 10 — Deployment and Environment

## Frontend environment
Create `frontend/.env.example`:
```env
VITE_API_BASE_URL=http://localhost:8000
```

Only variables prefixed with `VITE_` are exposed to browser code. Never put private keys in these variables.

## Backend environment
Create `backend/.env.example`:
```env
APP_ENV=development
FRONTEND_ORIGIN=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017
MONGODB_DATABASE=punith_portfolio
EMAIL_PROVIDER_API_KEY=
CONTACT_NOTIFICATION_EMAIL=
```

Do not commit real `.env` files. Add `.env` to `.gitignore`.

## Deployment outline
### Frontend (Vercel)
1. Import the Git repository.
2. Set the root directory to `frontend`.
3. Set build command to `npm run build`.
4. Set output directory to `dist`.
5. Configure `VITE_API_BASE_URL` with the deployed backend URL.
6. Add SPA rewrite rules if using client-side routes.

### Backend (Render or equivalent)
1. Create a Python web service.
2. Set root directory to `backend`.
3. Build/install from `requirements.txt`.
4. Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
5. Configure environment variables in the hosting dashboard.
6. Set production CORS origin to the deployed frontend domain.
7. Configure health checks and logs.

### MongoDB Atlas
1. Create a database user with a strong generated password.
2. Restrict network access to the hosting provider's supported network configuration.
3. Add the URI as a backend secret.
4. Use backups and least-privilege permissions.

## Production checklist
- HTTPS enabled.
- Production CORS configured.
- Debug mode disabled.
- Database credentials stored as secrets.
- Contact rate limiting enabled.
- Resume and social links verified.
- Error monitoring/logging configured.
- Domain and DNS verified.
