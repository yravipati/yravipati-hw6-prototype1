# Eventus User Onboarding Survey Prototype

A full-stack demo prototype for user onboarding flow following Google's Material Design principles.

## Features

- Multi-step onboarding survey form
- Material-UI components with Google Material Design
- Form validation and error handling
- PostgreSQL database integration
- Responsive design for mobile and desktop
- Mock data for rapid prototyping

## Tech Stack

### Frontend
- React 18
- Material-UI (MUI) v5
- React Hook Form for form management
- Axios for API calls

### Backend
- Node.js with Express.js
- PostgreSQL database
- CORS enabled for development

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)

### Installation

1. Install dependencies:
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

2. Set up the database:
```bash
# Create PostgreSQL database
createdb eventus_prototype

# Run database migrations (from backend directory)
npm run migrate
```

3. Start the development servers:
```bash
# Terminal 1: Start backend (from backend directory)
npm run dev

# Terminal 2: Start frontend (from frontend directory)
npm start
```

4. Open http://localhost:3000 to view the application

## Project Structure

```
├── frontend/          # React frontend application
├── backend/           # Express.js backend API
├── database/          # Database schema and migrations
└── README.md
```

## API Endpoints

- `POST /api/user/profile` - Create user profile from onboarding survey
- `GET /api/user/profile/:id` - Get user profile by ID

## Survey Data Collection

The onboarding survey collects:
- Career Interests (industries and roles)
- Skills (technical and soft skills)
- Class Year (Freshman, Sophomore, Junior, Senior, Graduate)
- Primary Goals (Internship, Full-time job, Networking, etc.)
