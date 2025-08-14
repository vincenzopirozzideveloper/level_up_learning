# GEMINI.md

## Project Overview

This is a React-based web application called "Level Up Learn". It's a dashboard template built with Chakra UI, a popular component library for React. The project is designed to provide a modern and innovative user interface for a gamified learning platform.

The project uses `react-scripts` for building and development, and includes tools like ESLint for code quality and Prettier for code formatting. The styling is done using Chakra UI's theming capabilities, with custom themes defined in the `src/theme` directory.

## Building and Running

To get started with this project, you'll need to have Node.js and npm (or yarn) installed.

**1. Install Dependencies:**

```bash
npm install
```

or

```bash
yarn install
```

**2. Running the Development Server:**

```bash
npm start
```

This will start the development server and open the application in your default browser at `http://localhost:3000`.

**3. Building for Production:**

```bash
npm run build
```

This will create a production-ready build of the application in the `build` directory.

**4. Running Tests:**

```bash
npm test
```

This will launch the test runner in interactive watch mode.

**5. Linting:**

To check for linting errors, run:

```bash
npm run lint:check
```

To automatically fix linting errors, run:

```bash
npm run lint:fix
```

## Development Conventions

*   **Component-Based Architecture:** The application follows a component-based architecture, with components located in the `src/components` directory.
*   **Styling:** Styling is done using Chakra UI's theming system. Custom theme configurations can be found in the `src/theme` directory.
*   **Routing:** The application uses `react-router-dom` for routing. The routes are defined in `src/routes.js`.
*   **Code Quality:** The project uses ESLint and Prettier to enforce code quality and a consistent coding style.