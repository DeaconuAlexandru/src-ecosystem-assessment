# SRC Ecosystem Frontend Assessment

A polished React app that demonstrates the four UI/UX tasks for the SRC Ecosystem onboarding assessment.

## Included tasks

- Dashboard UI implementation with sidebar navigation, top bar, 3 statistics cards, and recent transactions table
- Multi-step exporter onboarding flow with validation, progress indicator, and loading / error / success states
- API integration widget with loading, error, empty, and refresh states
- Blockchain transaction confirmation modal with pending, success, and failure states

## Run locally

```bash
npm install
npm start
```

## Build for production

```bash
npm run build
```

## Design decisions

- Kept the UI component-based so the same cards, panels, and status states can be reused
- Used a soft dashboard aesthetic with glass-like surfaces and strong contrast for readability
- Prioritized clear feedback states for forms, API loading, and transaction confirmation
- Made the layout responsive so the same experience works on desktop and mobile
