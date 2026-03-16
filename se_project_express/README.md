# WTWR Express Backend (Monorepo)

This backend is part of the WTWR monorepo ([wtwr_demo](https://github.com/DKraus-SofEng/wtwr_demo)), paired with a React frontend.

> This project is a reimplementation of the original WTWR project, which used separate frontend/backend repos and a VM. It was redesigned as a monorepo and redeployed to modern cloud infrastructure for a more reliable, portfolio-ready demo.

## Deployment

- **Backend API:** https://project-e358f1a6-c26a-4de7-bd3.uc.r.appspot.com (Google Cloud Run)
- **Frontend:** https://lucky-pudding-e6ce7a.netlify.app (Netlify)

## Features

- User registration/login (JWT)
- Secure password hashing
- CRUD for clothing items (image URL only)
- Error handling and validation
- Accessibility: API supports frontend with aria-label/title tooltips

## Local Development

- For local development, use `http://localhost:3001` for the backend and update frontend config as needed.

## Links

- **Monorepo GitHub:** [wtwr_demo](https://github.com/DKraus-SofEng/wtwr_demo)

- **Live Demo:** https://lucky-pudding-e6ce7a.netlify.app

## License

ISC
