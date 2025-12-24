# Automated Resume Website Builder

A full-stack DevOps project that allows users to build and update their resume dynamically with a real-time preview, MongoDB persistence, and automated Git commits.

## Features
- **Live Preview**: See your resume update instantly as you type.
- **Form Builder**: Easy-to-use fields for Personal Info, Skills, Experience, Education, and Projects.
- **Git Automation**: Resume updates are automatically committed to a local git repository (simulating a "Content as Code" workflow).
- **Dockerized**: Full stack (Frontend, Backend, Database) runs with a single command.
- **CI/CD**: GitHub Actions workflow included for automated build testing.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express, Mongoose, Simple-Git
- **Database**: MongoDB
- **DevOps**: Docker, Docker Compose, GitHub Actions
-  "Updated frontend structure"
-   "Updated backend files


## Prerequisites
- Docker & Docker Compose
- Node.js (for local development without Docker)

## Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd automated-resume-builder
```

### 2. Run with Docker (Recommended)
This command will build the images and start the frontend (port 3000), backend (port 5000), and MongoDB.
```bash
docker-compose up --build
```
- Access the app at: [http://localhost:3000](http://localhost:3000)
- API endpoint: [http://localhost:5000](http://localhost:5000)

### 3. Local Development (Manual)
**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Project Structure
```
automated-resume-builder/
├── frontend/             # React App
├── backend/              # Node/Express API
├── docker-compose.yml    # Orchestration
└── .github/workflows/    # CI Pipeline
```

## Git Automation Note
The backend uses `simple-git` to commit changes to a `resume-data.json` file in the project root whenever the resume is saved. In a production environment, this could push to a remote repository to trigger a static site rebuild (e.g., Gatsby or Next.js static export).
Commit 3: Project description updated
Commit 4: Frontend module info added
Commit 5: Backend module info added
Commit 6: Docker setup explanation added
Commit 7: Git commands documented
Commit 8: Branch strategy explained
Commit 9: Merge process documented
