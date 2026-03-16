# WTWR React Frontend (Monorepo)

This is the React frontend for the WTWR (What to Wear) project, part of the [wtwr_demo](https://github.com/DKraus-SofEng/wtwr_demo) monorepo. For a full project overview, features, and demo links, see the [main README](../README.md).

## Setup & Local Development

- By default, the frontend expects the backend at `https://project-e358f1a6-c26a-4de7-bd3.uc.r.appspot.com` (update API URL in your config if needed).
- For local development, you can use `http://localhost:3001` for the backend.

### How to Run

1. Clone the repo and install dependencies:
   ```
   git clone https://github.com/DKraus-SofEng/wtwr_demo.git
   cd wtwr_demo/se_project_react
   npm install
   ```
2. Start the dev server:
   ```
   npm run dev
   ```
   The app runs at http://localhost:3000 by default (or another port if 3000 is in use).

## Testing

This project uses **Vitest** and **React Testing Library** for unit and integration tests.

### How to Run Tests

Before running tests, make sure you have installed dependencies.

```
npm install
npm run test
```

- All tests are located in the `src/tests/` folder.
- Matchers from `@testing-library/jest-dom` are enabled for robust assertions.

## Known Issues

See the [main README](../README.md#known-issues) for known issues and recommendations.

## Links

- **Main Monorepo:** [wtwr_demo](https://github.com/DKraus-SofEng/wtwr_demo)
