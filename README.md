# Ruh Platform Frontend

A modern React frontend for the Ruh Platform API, providing client and appointment management functionality with a clean, responsive UI. This application has been optimized for performance by centralizing API calls and deployed to Fly.io.

## Live Demo

Visit the live application at: [https://ruh-frontend-app.fly.dev/](https://ruh-frontend-app.fly.dev/)

## Tech Stack

- **React 19**: Frontend library
- **Vite**: Build tool for faster development and optimized production builds
- **Material UI 7**: Component library for modern UI design
- **React Router v6**: Navigation and routing
- **Axios**: HTTP client for API requests
- **React Context API**: For centralized state management
- **ESLint with react-refresh**: For code quality and improved hot reloading
- **Docker**: Multi-stage build for optimized deployment
- **Nginx**: Web server for serving the static files
- **Fly.io**: Cloud hosting platform

## Features

- **Client Management**: View, add, and edit client information
- **Appointment Scheduling**: Schedule, view, and manage appointments
- **Dashboard**: Overview of recent clients and upcoming appointments
- **Search & Filter**: Find clients and appointments quickly
- **Responsive Design**: Works on desktop and mobile devices
- **Centralized API Calls**: Prevents duplicate API requests across components

## Prerequisites

- Node.js v20.0.0 or higher
- npm v9.0.0 or higher
- Ruh Platform API backend running

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ruh-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file for local development:
```bash
VITE_API_URL=https://wellness-platform-api.fly.dev
VITE_DEFAULT_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

## Deployment

The application is configured for deployment to Fly.io using Docker. To deploy:

1. Ensure you have the Fly CLI installed:
```bash
curl -L https://fly.io/install.sh | sh
```

2. Create a `.env.production` file with your production environment variables:
```bash
VITE_API_URL=https://wellness-platform-api.fly.dev
VITE_DEFAULT_API_KEY=your_api_key_here
```

3. Deploy to Fly.io:
```bash
fly deploy
```

4. (Optional) Set environment secrets:
```bash
fly secrets set VITE_DEFAULT_API_KEY=your_api_key_here
```

## Configuration

The application connects to the Ruh Platform API backend. By default, it connects to `https://wellness-platform-api.fly.dev`. Environment variables can be configured in:

- `.env` for local development
- `.env.production` for production builds
- Fly.io secrets for runtime environment variables (note: Vite requires build-time variables)

## Project Structure

```
ruh-frontend/
├── public/             # Static files
├── src/
│   ├── components/     # React components
│   │   ├── Appointments/  # Appointment-related components
│   │   ├── Clients/       # Client-related components
│   │   ├── Dashboard/     # Dashboard components
│   │   └── Layout/        # Layout components
│   ├── context/        # React context for state management
│   ├── services/       # API services
│   ├── App.jsx         # Main application component
│   ├── App.css         # Global styles
│   └── main.jsx        # Application entry point
└── package.json        # Project dependencies and scripts
```

## Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm run preview`: Preview the production build locally

## Technologies Used

- **React**: Frontend library
- **React Router**: Navigation and routing
- **Material UI**: Component library
- **Axios**: HTTP client
- **Date-fns**: Date manipulation
- **Vite**: Build tool

## Recent Changes

### UI Improvements
- Moved "View All" buttons to the bottom of the Upcoming Appointments and Recent Clients lists
- Removed "Add New Client" and "Schedule New Appointment" buttons from the Dashboard
- Removed the Statistics section from the Dashboard UI

### Code Refactoring
- Split the AppContext into three files to comply with ESLint's `react-refresh/only-export-components` rule:
  - `AppContextUtils.js`: Exports the context and hook
  - `AppProvider.jsx`: Contains the provider component only
  - `AppContext.jsx`: Acts as an index file re-exporting the above
- Centralized API calls in AppContext to prevent duplicate API requests
- Modified API key retrieval to rely solely on environment variables

### Deployment
- Created a multi-stage Dockerfile for optimized builds
- Added Nginx configuration to support React Router client-side routing
- Successfully deployed to Fly.io

## Assumptions Made

1. **API Structure**: The backend API follows RESTful conventions with endpoints for clients and appointments
2. **Authentication**: The API uses Bearer token authentication with API keys
3. **Environment Variables**: Vite environment variables are used for configuration
4. **User Preferences**: Users prefer a clean, simplified dashboard without statistics
5. **Performance**: Centralized data fetching is preferred over component-level fetching to avoid duplicate API calls

## Incomplete Items and Future Work

1. **Unit Testing**: Add comprehensive unit and integration tests for components and context
2. **Error Handling**: Enhance error handling for API failures
3. **Custom Domain**: Set up a custom domain with HTTPS certificates
4. **User Authentication**: Implement proper user authentication flow instead of API key
5. **Performance Monitoring**: Add analytics and performance monitoring

## Time Spent

Total time spent on the project: Approximately 16 hours

- Initial setup and understanding the codebase: 2 hours
- Refactoring AppContext to fix ESLint issues: 3 hours
- UI modifications per requirements: 2 hours
- API service centralization: 2 hours
- Docker and Nginx configuration: 3 hours
- Fly.io deployment and troubleshooting: 3 hours
- Documentation: 1 hour

## License

ISC

---

© 2025 Ruh Platform. All rights reserved.
