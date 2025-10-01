# AI Video Remix Studio

This project is a sophisticated frontend simulation of a multi-stage AI pipeline designed to remix and generate creative videos. It showcases a professional, production-ready React application built with modern best practices, including a modular component architecture, custom hooks for state management, and a decoupled service layer that realistically mocks a backend API.

## ✨ Features

- **Interactive UI:** A beautiful and engaging interface that visualizes each stage of the AI pipeline.
- **Dynamic Animations:** Smooth animations, a shimmering progress bar, and a celebratory confetti effect make the experience fun and rewarding.
- **Audio Feedback:** Sound effects for stage transitions provide satisfying auditory feedback.
- **Realistic Backend Simulation:** A mock API service that simulates long-running processes, state management, and even random failures, preparing the app for a real backend integration.
- **Industrial-Standard Codebase:** The project is structured with scalability and maintainability in mind, featuring:
  - A clean `src` directory structure.
  - Reusable, single-responsibility components.
  - Logic encapsulated in a custom `usePipelineManager` hook.
  - A decoupled service layer for API interactions.

## 📂 Project Structure

The codebase is organized into a clean and intuitive directory structure:

```
/src
├── assets/         # Static assets like sound files
├── components/     # Reusable React components
├── constants/      # Application-wide constants (e.g., pipeline stages)
├── hooks/          # Custom React hooks for business logic
├── services/       # API interaction layer (currently mocked)
├── types/          # TypeScript type definitions
├── App.tsx         # Main application component
└── index.tsx       # Application entry point
```

## 🚀 Getting Started

To run this project locally, you will need a development environment with Node.js and a package manager like npm or yarn.

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    (This project is set up like a standard Vite React project)
    ```bash
    npm run dev
    ```
    The application should now be running on your local server, typically `http://localhost:5173`.

## 🔌 Backend Integration

The current application operates in a **mock backend mode**. The file `src/services/pipelineService.ts` simulates the behavior of a real server, including API latency, background processing, and state management.

To connect this frontend to a real backend, you would only need to modify the functions within `pipelineService.ts` to make `fetch` requests to your live API endpoints (e.g., `POST /api/pipeline/start`). No changes would be needed in the UI components or hooks, demonstrating the power of a decoupled architecture.
