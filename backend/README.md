# AI Resume Analyzer

An AI-powered resume analyzer that compares a PDF resume with a job description and returns ATS-style insights, keyword matching, resume bullets, score breakdowns, and improvement suggestions.

## Features

- Upload a resume as PDF
- Paste a job description
- Extract resume text from PDF
- Compare resume content with the job description
- Generate:
  - match score
  - ATS readiness
  - resume headline
  - score breakdown
  - matched and missing keywords
  - strengths and gaps
  - resume bullet suggestions
  - next steps
  - action verbs
- Beautiful single-page UI served from the backend
- Gemini AI integration with graceful fallback logic when the model is rate-limited or returns incomplete output

## Tech Stack

- Node.js
- Express
- Google Gemini API
- pdf-parse
- multer
- dotenv
- React and Vite for the frontend

## Project Structure

```text
resume-analyzer/
  backend/
  frontend/
backend/
  app.js
  package.json
  routes/
    analyzeRoute.js
    testRoute.js
  services/
    geminiService.js
    resumeAnalysisService.js
  uploads/
frontend/
  index.html
  src/
    api/
    components/
    App.jsx
    main.jsx
    styles.css
```

## Setup

### 1. Install dependencies

```bash
npm install
npm run build
```

### 2. Add environment variables

Create a `.env` file in the `backend` folder and add:

```env
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-2.5-flash
PORT=5000
```

If `GEMINI_MODEL` is not set, the app will use a supported default model automatically.

### 3. Start the app

```bash
npm start
```

The app will run on `http://localhost:5000`.

For frontend development with Vite hot reload, run the backend and client in separate terminals:

```bash
# backend/
npm run dev

# frontend/
npm install
npm run dev
```

The Vite dev server runs on `http://localhost:5173` and proxies `/api` requests to Express. Set `VITE_API_URL` in
`frontend/.env` only when the API is hosted at a different origin.

## Available Scripts

- `npm start` - start the production Express server
- `npm run dev` - start the Express server with nodemon
- `npm run build` - install client dependencies and build the Vite frontend

## API Endpoints

### GET `/api/test-ai`

Simple Gemini test endpoint.

### POST `/api/analyze-resume`

Analyzes a PDF resume against a job description.

#### Form fields

- `resume` - PDF file
- `jobDescription` - plain text job description

#### Example response

```json
{
  "success": true,
  "fileName": "resume.pdf",
  "matchScore": 85,
  "summary": "...",
  "strengths": [],
  "gaps": [],
  "matchedKeywords": [],
  "missingKeywords": [],
  "resumeBulletPoints": [],
  "nextSteps": [],
  "resumeHeadline": "...",
  "atsReadiness": "Good with targeted edits",
  "scoreBreakdown": {
    "keywordCoverage": 0,
    "impact": 0,
    "clarity": 0,
    "roleFit": 0
  },
  "actionVerbs": []
}
```

## How It Works

1. The user uploads a PDF resume and pastes a job description.
2. The backend extracts text from the PDF.
3. The resume and job description are sent to Gemini for analysis.
4. If Gemini is rate-limited or returns incomplete data, the backend builds local fallback results.
5. The React frontend renders the analysis in a styled dashboard.



### Deployment steps

1. Push the project to GitHub.
2. Connect the repo to your deployment platform.
3. Set the app root to the project root.
4. Set the build command to `npm --prefix backend run build`.
5. Set the start command to `npm --prefix backend start`.
6. Add environment variables:
   - `GEMINI_API_KEY`
   - `GEMINI_MODEL` if needed
   - `PORT` if your platform requires it

## Notes

- The app has fallback logic so it still returns useful analysis when Gemini is rate-limited.
- The summary card and result cards are designed to scroll inside fixed-size panels.
- The production Express server serves `frontend/dist` after a build.
- Gemini credentials stay in the backend environment and are never included in the React bundle.
