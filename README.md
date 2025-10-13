# CV Platform

CV Platform is a web application for managing employee CVs, skills, projects, and user profiles. Built with [Next.js](https://nextjs.org), it provides a modern interface for HR and team management tasks.

## Features

- Employee CV management
- Skills and competencies tracking
- Languages and proficiency tracking
- User profiles
- Authentication (login, signup, password recovery)
- Internationalization (i18n) support
- Dark/light theme switching
- Responsive UI

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/)
- **UI:** React 19, Tailwind CSS, Shadcn UI
- **State/Data:** Apollo Client, GraphQL
- **Forms:** React Hook Form, Yup
- **Testing:** Vitest, Testing Library
- **Internationalization:** next-intl
- **Other:** Storybook, ESLint

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-org/cv-Aleinikov-Yutsou.git
   cd cv-Aleinikov-Yutsou
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Configure environment variables as needed (see `.env.example` if present).

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### Building for Production

```bash
npm run build
npm start
```

### Running Tests

```bash
npm run test
```

### Storybook

To run Storybook for UI component development:

```bash
npm run storybook
```

## Project Structure

- `src/app/` — Application routes and pages (Next.js App Router)
- `src/entity/` — Domain entities and related logic
- `src/features/` — Feature modules (forms, tables, etc.)
- `src/shared/` — Shared utilities, GraphQL, providers, and types
- `src/widgets/` — UI widgets and composite components

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Storybook](https://storybook.js.org/)