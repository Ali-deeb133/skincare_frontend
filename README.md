# Lumière Skincare — Frontend

A React storefront for a skincare brand. Visitors can browse and filter the product catalogue, keep a cart on their account, and ask a chat assistant which products suit their skin.

This repository is the frontend only. It talks to a separate backend API.

## Tech stack

- React 18, TypeScript, Vite
- React Router for pages
- Zustand for state (auth, cart, search filters)
- Axios for API calls (token refresh and cold-start retry in `src/services/api.ts`)
- Tailwind CSS (colours, fonts and animations are defined in `tailwind.config.ts`)

## Getting started

```bash
npm install
cp .env.example .env   # then set VITE_API_URL
npm run dev
```

`VITE_API_URL` is the backend's base URL, without a trailing slash and without `/api`.

## Scripts

| Command                | What it does                            |
| ---------------------- | --------------------------------------- |
| `npm run dev`          | Start the dev server                    |
| `npm run build`        | Type-check, then build for production   |
| `npm run preview`      | Serve the production build locally      |
| `npm run typecheck`    | Type-check only                         |
| `npm run lint`         | Run ESLint                              |
| `npm run format`       | Format every file with Prettier         |
| `npm run format:check` | Check formatting without changing files |

## Pages

| Route          | Page                                                   |
| -------------- | ------------------------------------------------------ |
| `/`            | Home                                                   |
| `/search`      | Catalogue with search, filters and the chat panel      |
| `/product/:id` | Product details                                        |
| `/cart`        | Cart and checkout (checkout is a demo, no payment API) |
| `/login`       | Login page                                             |
| `/register`    | Register page                                          |
| anything else  | Not-found page                                         |

## Project structure

```
src/
  components/   layout (navbar, footer), shared (cards, filters), ui (button, badge, toast)
  pages/        one folder per page, each with its own components/
  hooks/        useAuth, useCart, useProducts, useChatbot
  store/        Zustand stores
  services/     API calls
  types/        shared TypeScript types
  utils/        validation, image URLs, product types
```

## Backend endpoints used

- `POST /api/accounts/login/`, `POST /api/accounts/register/`, `POST /api/token/refresh/`
- `GET /api/products/` (query: `search`, `product_type`, `price__gte`, `price__lte`, `ordering`)
- `GET /api/cart/`, `POST /api/cart/add/`, `/update/`, `/remove/`, `/clear/`
- `POST /api/decision/check/` (chat assistant)
