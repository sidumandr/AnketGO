# AnketGo - Internal Survey and Evaluation System

A React-based frontend application for managing internal surveys and evaluations.

## Features

- User authentication (login/register)
- Survey management
- Survey response collection
- Admin panel for user and survey management
- Responsive design using Bootstrap

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository
2. Navigate to the client directory:
   ```bash
   cd client
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## Project Structure

```
src/
  ├── components/         # Reusable components
  │   ├── auth/          # Authentication related components
  │   ├── common/        # Common UI components
  │   ├── layout/        # Layout components
  │   └── survey/        # Survey related components
  ├── context/           # React Context providers
  ├── pages/             # Page components
  │   └── admin/         # Admin panel pages
  ├── services/          # API services
  └── utils/             # Utility functions
```

## API Integration

The application expects a backend API with the following endpoints:

### Authentication
- POST /api/auth/login
- POST /api/auth/register
- GET /api/auth/me

### Surveys
- GET /api/surveys/dashboard
- GET /api/surveys/:id
- POST /api/responses
- GET /api/responses/my-answers

### Admin
- GET /api/admin/users
- GET /api/admin/users/:id
- GET /api/admin/users/:id/responses
- POST /api/admin/responses/:id/evaluate
- GET /api/admin/surveys
- POST /api/admin/surveys
- DELETE /api/admin/surveys/:id

## Dependencies

- React
- React Router
- Axios
- Bootstrap
- React Toastify
- Font Awesome

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
