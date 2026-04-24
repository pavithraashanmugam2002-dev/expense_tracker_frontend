
# Expense Tracker Frontend

React + TypeScript frontend for the full-stack expense tracker application.

## Features

- React 18 with TypeScript
- React Router v6 for navigation
- Axios for API calls
- Session-based authentication
- Protected routes
- Real-time financial summary
- Full CRUD operations for income/expense records

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm

## Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` and set the backend API URL:
```
VITE_API_URL=http://localhost:8000
```

## Running the Application

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

Build the application:
```bash
npm run build
```

The production build will be in the `dist/` directory.

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ErrorBoundary.tsx     # Error boundary wrapper
│   │   ├── FinancialSummary.tsx  # Summary display
│   │   ├── Navbar.tsx            # Top navigation bar
│   │   ├── ProtectedRoute.tsx    # Route guard
│   │   ├── RecordForm.tsx        # Add/edit record form
│   │   └── RecordList.tsx        # Record listing
│   ├── contexts/
│   │   └── AuthContext.tsx       # Auth state management
│   ├── pages/
│   │   ├── DashboardPage.tsx     # Main dashboard
│   │   └── LoginPage.tsx         # Login page
│   ├── services/
│   │   ├── api.ts                # Axios base client
│   │   ├── auth.service.ts       # Auth API calls
│   │   ├── records.service.ts    # Records API calls
│   │   └── summary.service.ts    # Summary API calls
│   ├── styles/
│   │   └── global.css            # Global styles
│   ├── App.tsx                   # App router
│   └── main.tsx                  # App entry point
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Environment Variables

- `VITE_API_URL` — Backend API base URL (default: `http://localhost:8000`)

## Authentication

The app uses session-based authentication with HTTP-only cookies. After login, the session state is stored in sessionStorage for route protection.

Default login credentials:
- `user1@example.com` / `password123`
- `user2@example.com` / `password123`
- `user3@example.com` / `password123`

## Features Walkthrough

1. **Login** — Enter email and password to authenticate
2. **Dashboard** — View financial summary and transaction list
3. **Add Record** — Click "Add New Record" to create income/expense
4. **Edit Record** — Click "Edit" on any record to modify it
5. **Delete Record** — Click "Delete" to remove a record (with confirmation)
6. **Logout** — Click "Logout" in the navbar to end session
