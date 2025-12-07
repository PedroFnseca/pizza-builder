<div align="center">
	<h1>Pizza Builder POC 🍕</h1>
	<p>Proof of concept for a pizza ordering stack using an in-memory data store, simple pricing logic, and a mobile client.</p>
</div>

## Index
- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Running the projects](#running-the-projects)
- [Testing](#testing)
- [API documentation](#api-documentation)
- [Logging](#logging)
- [Linting](#linting)

## Overview
This is a small POC that models a pizza builder workflow with an in-memory database. It supports basic order creation, price calculations, and size/ingredient management while showcasing API and mobile layers.

## Features
- In-memory data store for fast iteration without external DB setup.
- Swagger-driven API docs for quick exploration.
- Endpoint logging with the custom `logger-endpoints-api` library for real-time request tracking. [Made by me!](https://www.npmjs.com/package/logger-endpoints-api)
- Automated tests (Jest + Supertest) executed locally and in GitHub Actions on pushes and PRs to `main`.
- React Native app using React Query for caching with different staleness times per screen.
- Codebase follows OOP and SOLID principles in JavaScript to keep services and controllers decoupled.
- ESLint enforces consistent style across API and mobile packages.

## Architecture
- API: Express routes, controllers, services, and validators over an in-memory store; Swagger for docs; logger middleware for observability.
- Mobile: React Native + React Navigation; React Query manages client-side cache and request deduplication.

## Running the projects
API
1) `cd api`
2) `npm install`
3) `npm run dev` (defaults to port 3000)

Mobile (Expo)
1) `cd mobile`
2) `npm install`
3) `npm run start` and choose your platform (Android/iOS/Web)

## Testing
- From `api`: `npm test`
- CI: `.github/workflows/test-api.yml` runs the same suite on GitHub Actions for every push/PR to `main`.

## API documentation
- Swagger UI served at `/docs` when the API is running.

## Logging
- `logger-endpoints-api` middleware logs incoming requests in real time for easier debugging during development.

## Linting
- `npm run lint` or `npm run lint:fix` inside `api` or `mobile` to keep the codebase consistent.
