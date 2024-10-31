Streaks App
The Streaks App is a habit-tracking application that allows users to create, monitor, and manage personal streaks or habits. Users can sign up, log in, track their habits daily, reset their passwords, and view their progress. This app uses Node.js and TypeScript for the backend and a frontend built with HTML, CSS, and TypeScript.

Table of Contents
Features
Project Structure
Installation
Usage
Scripts
Configuration
Contributing
License

Features:
User Authentication: Secure signup, login, and JWT-based authentication.
Password Reset: Users can request password resets and set a new password through email verification.
Habit Tracking: Track daily habits and view streaks on a personalized dashboard.
Statistics: Visualize streak data with line graphs and other statistical insights.
User Settings: Update profile details and manage account settings.
Responsive UI: Frontend design supports desktop and mobile views.

Project Structure:
The project has two main directories: backend and frontend.

├── backend              # Backend services for user and streak management
│   ├── src
│   │   ├── bgServices   # Background services (e.g., email)
│   │   ├── config       # Configuration files for email and service settings
│   │   ├── controllers  # Handlers for authentication, streaks, etc.
│   │   ├── mails        # Email templates (e.g., Welcome email)
│   │   ├── middleware   # Authentication and error handling
│   │   ├── models       # Data models for Prisma ORM
│   │   ├── routes       # API routes for authentication, streaks, and user profiles
│   │   ├── services     # Business logic for handling streaks and user data
│   │   ├── utils        # Utility functions (e.g., JWT, logging, password utilities)
│   │   └── validators   # Validation for user input
│   └── tsconfig.json    # TypeScript configuration
└── frontend             # Frontend UI for user interaction
    ├── src
    │   ├── api.ts       # API functions for handling HTTP requests
    │   ├── components   # UI components (dashboard, login, signup, etc.)
    │   ├── config       # Configuration file for frontend settings
    │   ├── utils        # Utilities for handling calendar and statistics
    │   ├── validators   # Input validation for forms
    └── webpack.config.js # Webpack configuration for bundling
Backend:
src: Contains the source code for the backend API.
bgServices: Background services (e.g., email notifications).
config: Configuration files for email and other services.
controllers: Business logic for user and streak operations.
middleware: Authentication and error-handling middlewares.
models: Prisma models defining the data structure.
routes: API routes for authentication, streak management, and user profiles.
services: Core business logic services.
utils: Utility functions for token handling, logging, and more.
validators: Validation logic for user profiles and authentication.

Frontend
src: Contains the source code for the frontend UI.
components: Individual UI components (login, signup, dashboard, etc.).
config: Configurations for API and environment settings.
utils: Utility functions for calendar calculations, error handling, and data visualization.
validators: Validation logic for user profiles.

Installation
Prerequisites:
Node.js (version 14 or higher)
TypeScript (globally installed)
Prisma ORM (included in dependencies)
SQL Database (Microsoft SQL Server/Azure)

Backend Setup
Clone the repository:
git clone https://github.com/Markide/streakApp.git

cd streakApp/backend
Install dependencies:
npm install

Configure environment variables: Create a .env file in the backend directory with the following:
.env
DATABASE_URL=<your_database_url>
JWT_SECRET=<your_jwt_secret>

Run database migrations:
npx prisma migrate dev

Start the server:
npm run dev

Frontend Setup
Navigate to the frontend directory:
cd ../frontend

Install dependencies:
npm install

Start the frontend development server:
npm start

Open your browser to http://localhost:3000.

Usage:
User Registration and Login:

Users can sign up, log in, and reset their password.
On successful login, users are redirected to the dashboard.
Creating and Managing Streaks:

After logging in, users can create habits and track their progress.
Streaks are visualized on a line graph, with options to view past records and statistics.
Settings and Profile:

Users can update their profile information and manage preferences in the settings.
API Documentation
The backend API includes endpoints for authentication, user profile management, and streak tracking. Documentation for each endpoint is available in src/routes.

Example Endpoints:
POST /api/auth/signup: Register a new user.
POST /api/auth/login: Log in an existing user.
POST /api/streaks: Create a new streak.
GET /api/streaks: Retrieve all streaks for a user.
PUT /api/streaks: Update a streak.

Contributing
Fork the repository and create a new branch.
Make your changes and test thoroughly.
Submit a pull request with a detailed description of your changes.

License
This project is licensed under the MIT License. See the LICENSE file for details.
