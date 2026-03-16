# Tripleten Software Engineering Program: Project React

# WTWR (What to Wear) Monorepo

> This project is a reimplementation of the original WTWR project, which used separate frontend/backend repos and a VM. It was redesigned as a monorepo and redeployed to modern cloud infrastructure for a more reliable, portfolio-ready demo.

This is a monorepo containing both the React frontend and Express backend for the WTWR (What to Wear) project. The project is now deployed with:

- **Frontend:** Netlify ([lucky-pudding-e6ce7a.netlify.app](https://lucky-pudding-e6ce7a.netlify.app))
- **Backend:** Google Cloud Run (private API endpoint; all features accessed via the frontend)
- **GitHub:** [wtwr_demo](https://github.com/DKraus-SofEng/wtwr_demo)

## Live Demo

- **Frontend Demo:** https://lucky-pudding-e6ce7a.netlify.app
- **Backend API:** https://project-e358f1a6-c26a-4de7-bd3.uc.r.appspot.com  
  _(API endpoint only; direct access in a browser will show “service unavailable.” Use the frontend to access all features.)_

## WTWR (What to Wear)

This is a React + Vite app that recommends clothing based on the current weather for the user's location. It is an educational project of the fulltime Software Engineering program at TripleTen.

## Features

- Real-time weather from OpenWeather API
- Temperature unit toggle (F/C) with accessible tooltips and aria-labels
- Clothing recommendations filtered by weather: hot, warm, or cold
- User authentication, add/view/like/delete clothing items
- Responsive design for desktop and mobile

## Core Technologies / Tech Stack

- React 18 (functional components & hooks)
- Vite (build tool & dev server)
- JavaScript (ES6+)
- CSS3 (BEM methodology)
- React Router DOM (routing)
- React Context API (state management)
- HTML5

## Testing

This project uses **Vitest** and **React Testing Library** for unit and integration tests in the frontend, and **Jest** and **Supertest** for the backend.

### How to Run Tests

Before running tests, make sure you have installed dependencies in each subproject:

- **Frontend:**
  ```
  cd se_project_react
  npm install
  npm run test
  ```
- **Backend:**
  ```
  cd se_project_express
  npm install
  npm test
  ```

See each subproject's README for more details and advanced options.

## Known Issues

### Clothing Weather Options

**Issue**: There are only three options for clothing based solely on the weather temperature.

**Impact**: User may not choose appropriate clothing for the weather conditions based on three temperature-related conditions only.

**Recommended Solutions**:

- Add more weather conditions (rain, wind, snow, etc.) and suggest items beyond clothing (umbrella, sunscreen, etc.)

### Location

**Issue**: The app does not automatically detect and use the user’s location unless the user allows the browser to set their location.

**Impact**: Weather and clothing recommendations may not be accurate or relevant.

**Recommended Solutions**:

- Integrate browser geolocation API to automatically detect the user’s location.
- Optionally, allow users to set a default location in their profile.
- Add a fallback or permission request if the user denies location access.

## Links

- **Live Demo:** https://lucky-pudding-e6ce7a.netlify.app
- **GitHub:** [wtwr_demo](https://github.com/DKraus-SofEng/wtwr_demo)
- **Figma:** [Design](https://www.figma.com/design/bfVOvqlLmoKZ5lpro8WWBe/Sprint-14_-WTWR?node-id=0-1&p=f&t=AU8kFAxDCsvKCeJI-0)
- **Project Pitch Video:** [Watch here](https://www.loom.com/share/c322926d4fff4ba684481389b3af9d2a)
- **Backend Repo:** [se_project_express](https://github.com/DKraus-SofEng/se_project_express)
