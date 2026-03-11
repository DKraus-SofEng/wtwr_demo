# Tripleten Software Engineering Program: Project React

## WTWR (What to Wear)

This is a React + Vite app that recommends clothing based on the current weather for the user's location. It is an educational project of the fulltime Software Engineering program at TripleTen.

## Live Demo

- **Frontend:** https://storage.googleapis.com/wtwr-demo-frontend-dk/index.html
- **Backend API:** https://project-e358f1a6-c26a-4de7-bd3.uc.r.appspot.com

The backend only accepts image URLs (not file uploads) for clothing items.

## Features

- Fetches real-time weather from OpenWeather API
- Normalizes temperature (F/C) and day/night
- Recommends clothing cards filtered by weather type (hot/warm/cold)
- Temperature unit controlled via a context and a toggle switch
- User can add their own clothing items via a modal form (image URL only)
- Responsive design for desktop and mobile

## Core Technologies / Tech Stack

- React 18 (functional components & hooks)
- Vite (build tool & dev server)
- JavaScript (ES6+)
- CSS3 (BEM methodology)
- React Router DOM (routing)
- React Context API (state management)
- HTML5

## APIs / Backend

- OpenWeather API (real-time weather data)
- WTWR Express backend ([se_project_express](https://github.com/DKraus-SofEng/se_project_express))

## Backend Integration

This app requires the WTWR Express backend to provide user, clothing, and weather data.

- By default, the frontend expects the backend at `https://project-e358f1a6-c26a-4de7-bd3.uc.r.appspot.com` (update API URL in your config if needed).
- For local development, you can use `http://localhost:3001`.

## How to Run

1. Start the backend server (see backend README for details, or use the cloud backend)
2. Start the frontend:
   - Clone the repo
   - Install dependencies: `npm install`
   - Start the dev server: `npm run dev`
   - App runs at http://localhost:5173

## Testing

This project uses **Vitest** and **React Testing Library** for unit and integration tests.

- All core components (App, RegisterModal, LoginModal, Sidebar) have basic render and interaction tests.
- API error handling and loading states are tested for Sidebar.
- Context and router providers are mocked for isolated component tests.

### How to Run Tests

```
npm run test
```

- All tests are located in the `src/tests/` folder.
- Matchers from `@testing-library/jest-dom` are enabled for robust assertions.

## Known Issues

### Clothing Weather Options

**Issue**: There are only three options for clothing based solely on the weather temperature.

**Impact**: User may not choose appropriate clothing for the weather conditions based on three temperature-related conditions only.

**Recommended Solutions**:

- Add more weather conditions (rain, wind, snow, etc.) and suggest items beyond clothing (umbrella, sunscreen, etc.)

### Location

**Issue**: The app does not provide a way for users to manually select or enter their location. It only attempts to detect the user's location using the browser's Geolocation API on load.

**Impact**: If the user denies location access or geolocation fails, there is no fallback to manually set a location, so weather and clothing recommendations may not be accurate or relevant.

**Recommended Solutions**:

- Add a UI for users to manually enter or select their location if geolocation is unavailable or denied.
- Optionally, allow users to set a default location in their profile.
- Add a fallback or permission request if the user denies location access.

## Links

- **Figma**: [Design][(https://www.figma.com/design/bfVOvqlLmoKZ5lpro8WWBe/Sprint-14_-WTWR?node-id=0-1&p=f&t=AU8kFAxDCsvKCeJI-0](https://www.figma.com/design/bfVOvqlLmoKZ5lpro8WWBe/Sprint-14_-WTWR?node-id=0-1&p=f&t=AU8kFAxDCsvKCeJI-0)

- **GitHub Pages**: [Deployed Project](https://DKraus-SofEng.github.io/se_project_react/)

- **Project Pitch Video**: [Watch here](https://www.loom.com/share/c322926d4fff4ba684481389b3af9d2a)

- **Backend Repo**: [se_project_express](https://github.com/DKraus-SofEng/se_project_express)

## Deployment

- Production backend API: https://project-e358f1a6-c26a-4de7-bd3.uc.r.appspot.com
- Production frontend: https://storage.googleapis.com/wtwr-demo-frontend-dk/index.html
- No custom domain is currently configured for the live demo. The public URL is the Google Cloud Storage bucket link above.
- For local development, the frontend expects the backend at `http://localhost:3001`
- Update the API URL in your frontend config to switch between local and production
