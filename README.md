# Ruh Platform Frontend

A modern React frontend for the Ruh Platform API, providing client and appointment management functionality with a clean, responsive UI.

## Features

- **Client Management**: View, add, and edit client information
- **Appointment Scheduling**: Schedule, view, and manage appointments
- **Dashboard**: Overview of recent clients and upcoming appointments
- **Search & Filter**: Find clients and appointments quickly
- **Responsive Design**: Works on desktop and mobile devices
- **Material UI**: Modern and clean user interface

## Prerequisites

- Node.js v14.0.0 or higher
- npm v6.0.0 or higher
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

3. Start the development server:
```bash
npm run dev
```

## Configuration

The application connects to the Ruh Platform API backend. By default, it connects to `http://localhost:3000`. You can modify the API URL in `src/services/api.js` if needed.

You'll need to provide an API key to authenticate with the backend. This can be set through the UI after starting the application.

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

## License

ISC

---

© 2025 Ruh Platform. All rights reserved.
