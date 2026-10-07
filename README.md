# 🎙️ AI Mock Interview Platform

An intelligent, always-available mock interview coach that listens to your answers, reads your resume, evaluates your code, and gives you real-time feedback — no scheduling, no waiting, no cost.

---

## 🚀 What Is This?

Most developers struggle to get quality interview practice. Booking a mock session with a friend takes days of coordination. Hiring a career coach costs hundreds of dollars. And LeetCode alone won't prepare you for the full interview experience.

This platform changes that. Upload your resume, pick a role and difficulty, and start a live AI-driven interview — right now. The AI interviewer asks personalized, role-specific questions, listens to your spoken answers, challenges you with live coding problems, and scores you across 5 performance dimensions with detailed written feedback.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 📄 **Resume-Based Questions** | AI analyzes your uploaded resume and generates personalized questions tailored to your actual experience |
| 🎤 **Voice Interviews** | Hear questions read aloud via Murf AI TTS; record your verbal answers using your microphone |
| 💻 **Live Coding** | Answer coding questions inside a built-in Monaco Editor (the same engine powering VS Code) |
| 🤖 **AI Scoring & Feedback** | Gemini AI evaluates every answer and scores you across 5 categories with detailed written commentary |
| 📊 **Interview History** | Track all past interviews with overall scores, role, difficulty, and per-session feedback |
| 🎯 **Multi-Role Support** | 8 roles: Frontend, Backend, Full Stack, React, Python, Java, Data Analyst, DevOps |
| 🔐 **Auth & Protected Routes** | JWT-based authentication — your interview history is private to your account |
| ⚙️ **Difficulty Levels** | Starter (4 questions), Standard (5 questions), Advanced (7 questions + coding challenges) |

---

## 🛠️ Tech Stack

### Frontend
- **React 19** + **Vite 6** — fast, modern UI
- **React Router v7** — client-side routing with protected routes
- **Monaco Editor** (`@monaco-editor/react`) — VS Code-grade in-browser code editor
- **Axios** — API communication layer
- **React Hot Toast** — non-intrusive notifications
- **React Icons** — consistent iconography

### Backend
- **Node.js** + **Express 5** (ESM) — REST API server
- **MongoDB Atlas** + **Mongoose** — persistent storage for users, resumes, and interviews
- **Multer** + **pdfjs-dist** — resume file upload and PDF text extraction
- **JWT** + **bcryptjs** — secure authentication and password hashing

### AI & External Services
- **Google Gemini AI** (`@google/genai`) — question generation, answer evaluation, feedback synthesis
- **AssemblyAI** — speech-to-text transcription of recorded answers
- **Murf AI** — text-to-speech for the AI interviewer's voice (streaming + non-streaming)

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    React Frontend                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │  Setup   │→ │Interview │→ │ Feedback │  │ History │ │
│  │  Page    │  │  Page    │  │  Page    │  │  Page   │ │
│  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │
│                      ↓                                   │
│  ┌──────────────────────────────────────────────────┐   │
│  │            Axios API Service Layer               │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────┬───────────────────────────────────┘
                      │ HTTP REST API
┌─────────────────────┴───────────────────────────────────┐
│                   Express Backend                        │
│  ┌──────────┐  ┌────────────┐  ┌──────────┐  ┌───────┐ │
│  │  Routes  │→ │Controllers │→ │ Services │→ │Models │ │
│  └──────────┘  └────────────┘  └──────────┘  └───────┘ │
│                      ↓                                   │
│  ┌──────────────────────────────────────────────────┐   │
│  │              External AI Services                │   │
│  │  ┌──────────┐   ┌──────────┐   ┌─────────────┐  │   │
│  │  │  Gemini  │   │  Murf AI │   │ AssemblyAI  │  │   │
│  │  │  (LLM)   │   │  (TTS)   │   │   (STT)     │  │   │
│  │  └──────────┘   └──────────┘   └─────────────┘  │   │
│  └──────────────────────────────────────────────────┘   │
│                      ↓                                   │
│  ┌──────────────────────────────────────────────────┐   │
│  │              MongoDB Atlas                       │   │
│  │    ┌───────┐   ┌───────────┐   ┌──────────┐    │   │
│  │    │ Users │   │Interviews │   │ Resumes  │    │   │
│  │    └───────┘   └───────────┘   └──────────┘    │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
├── client/                        # React frontend (Vite)
│   └── src/
│       ├── components/
│       │   ├── AudioPlayer/       # Plays AI interviewer TTS audio
│       │   ├── CodeEditor/        # Monaco-based code editor
│       │   ├── ConversationalMic/ # Animated mic UI for recording
│       │   ├── InterviewCard/     # History list item card
│       │   ├── Navbar/            # Top navigation bar
│       │   ├── ProtectedRoute/    # Auth gate for private pages
│       │   ├── ScoreCard/         # Per-category score display
│       │   └── VoiceRecorder/     # Record + transcribe user answers
│       ├── constants/
│       │   ├── difficulty.js      # Starter / Standard / Advanced levels
│       │   ├── roles.js           # 8 supported interview roles
│       │   └── scoreColors.js     # Color mapping for score ranges
│       ├── context/
│       │   └── AuthContext.jsx    # Global auth state (JWT + user)
│       ├── pages/
│       │   ├── HomePage/          # Dashboard with stats + quick start
│       │   ├── InterviewSetupPage/# 3-step wizard (role, difficulty, resume)
│       │   ├── InterviewPage/     # Live interview with state machine
│       │   ├── FeedbackPage/      # Post-interview scores + feedback
│       │   ├── HistoryPage/       # Paginated past interview list
│       │   └── LoginPage/         # Login / Register
│       └── services/
│           ├── api.js             # Axios base instance
│           ├── authService.js     # Login, register, logout
│           └── interviewService.js# Interview CRUD + answer submission
│
└── server/                        # Express backend (ESM)
    └── src/
        ├── config/
        │   └── db.config.js       # MongoDB Atlas connection
        ├── controllers/           # Route handlers (auth, resume, interview, history)
        ├── middleware/
        │   ├── auth.middleware.js # JWT verification
        │   ├── error.middleware.js# Global error handler
        │   └── upload.middleware.js# Multer file upload config
        ├── models/
        │   ├── User.model.js      # User schema
        │   ├── Resume.model.js    # Parsed resume storage
        │   └── Interview.model.js # Interview + answers + feedback schema
        ├── routes/                # Route definitions (auth, resume, interview, history)
        ├── services/              # Business logic (Gemini, Murf, AssemblyAI, PDF parsing)
        └── utils/
            └── jwt.utils.js       # Token sign / verify helpers
```

---

## 🧩 How It Works

### 1 — Interview Setup (3-Step Wizard)
The user uploads their resume (PDF), selects a role (e.g. "Full Stack Developer"), and picks a difficulty. The backend parses the PDF, stores a structured resume, and calls Gemini to generate a personalized question set before the interview begins.

### 2 — Live Interview (AI State Machine)
The `InterviewPage` runs a 4-state machine:

```
SPEAKING → THINKING → LISTENING → (next question or FAREWELL)
```

- **SPEAKING**: Murf TTS plays the current question aloud via `AudioPlayer`
- **THINKING**: Answer is being submitted and evaluated
- **LISTENING**: User records voice (via `VoiceRecorder`) or types text, or writes code in the Monaco editor
- **FAREWELL**: Final message plays, then redirects to the feedback page

Each answer is transcribed (AssemblyAI), submitted to the backend, and evaluated by Gemini before the next question loads.

### 3 — Feedback & History
After the interview ends, Gemini synthesizes all answers into a structured report scored across 5 categories:

| Category | What's Measured |
|---|---|
| 🗣️ Communication Skills | Clarity, structure, confidence |
| 🧠 Technical Knowledge | Accuracy and depth of answers |
| 💡 Problem Solving | Approach and reasoning |
| 👔 Professionalism | Attitude and interview etiquette |
| 💻 Code Quality | Correctness, readability, efficiency (coding questions) |

The `FeedbackPage` displays the overall score, per-category breakdowns with comments, strengths, areas of improvement, and a final assessment. All interviews are saved and browsable via a paginated `HistoryPage`.

---

## ⚡ Getting Started

### Prerequisites
- Node.js ≥ 18
- MongoDB Atlas account
- API keys: Google Gemini, AssemblyAI, Murf AI

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ai-mock-interview.git
cd ai-mock-interview
```

### 2. Configure environment variables

**`server/.env`**
```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key
ASSEMBLYAI_API_KEY=your_assemblyai_api_key
MURF_API_KEY=your_murf_api_key
```

**`client/.env`**
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Install dependencies & run

```bash
# Backend
cd server
npm install
npm run dev

# Frontend (new terminal)
cd client
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🗺️ Build Journey

This platform was built across **3 major functionalities** and **11 steps**:

**Functionality 1 — Resume Upload & Interview Setup** (Steps 1–4)
Setting up Gemini AI client and prompt templates → Resume model + PDF parsing service → Interview model + start interview service → InterviewSetupPage 3-step wizard + HomePage

**Functionality 2 — AI Interview** (Steps 5–8)
Voice-to-text transcription with AssemblyAI → Text-to-speech with Murf AI → Answer submission, code evaluation, feedback generation + all interview routes → InterviewPage with VoiceRecorder, AudioPlayer, CodeEditor, and interviewer state machine

**Functionality 3 — Feedback & Interview History** (Steps 9–11)
Feedback generation logic (endInterview, getInterviewById) → History service, controller, and routes with pagination → FeedbackPage, HistoryPage, complete HomePage with stats, and final App.jsx routing

---

## 📄 License

MIT — free to use, modify, and build on.

---

*Built the app using React, Express, MongoDB, Gemini AI, AssemblyAI, and Murf AI.*
