# Project Setup Instructions

## Stack
- **Backend**: Strapi CMS (Content Management System)
- **Frontend**: Next.js (React Framework)

## Project Structure
- `/backend` - Strapi backend application
- `/frontend` - Next.js frontend application

## Setup Status
- [x] Created copilot-instructions.md file
- [x] Scaffolded Strapi backend
- [x] Scaffolded Next.js frontend
- [x] Configured environment variables
- [x] Installed dependencies
- [x] Created documentation
- [x] Verified setup

## Development Workflow

### Starting the Backend (Strapi)
```bash
cd backend
npm run develop
```
Access admin panel at: http://localhost:1337/admin

### Starting the Frontend (Next.js)
```bash
cd frontend
npm run dev
```
Access application at: http://localhost:3000

## Key Files
- `backend/.env` - Strapi environment configuration
- `frontend/.env.local` - Next.js environment configuration
- `frontend/lib/strapi.ts` - Strapi API client utilities
- `README.md` - Complete project documentation
