# Employee Leave Management - Frontend

A modern, responsive web application for managing employee leave requests, built with Next.js 16, React 19, TypeScript, and Tailwind CSS.

## Features

### 🔐 Authentication
- **Admin Portal**: Manage employees, managers, and leave types
- **Employee Portal**: Request leaves and view balances
- **Manager Portal**: Review and approve leave requests
- JWT-based authentication with protected routes

### 👨‍💼 Admin Features
- Dashboard with system statistics
- Employee management (create, view, delete)
- Manager management (create, view, delete)
- Leave type configuration
- Real-time overview of all leave requests

### 👤 Employee Features
- Personal dashboard with leave statistics
- Submit new leave requests
- View leave request history
- Track leave balances by type
- Visual progress indicators for leave usage

### 👔 Manager Features
- Dashboard showing pending approvals
- Review employee leave requests
- Approve or reject leave applications
- View detailed request information

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Context API
- **API Client**: Native Fetch API

## Getting Started

1. **Install dependencies**:
   ```bash
   pnpm install
   # or
   npm install
   ```

2. **Configure environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local` and set your API URL:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

3. **Run the development server**:
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── admin/                    # Admin portal pages
│   │   ├── dashboard/
│   │   ├── employees/
│   │   ├── managers/
│   │   └── leave-types/
│   ├── employee/                 # Employee portal pages
│   │   ├── dashboard/
│   │   ├── leaves/
│   │   └── balance/
│   ├── manager/                  # Manager portal pages
│   │   ├── dashboard/
│   │   └── approvals/
│   └── login/                    # Authentication pages
├── components/                   # Reusable components
│   ├── ui/                       # shadcn/ui components
│   ├── DashboardLayout.tsx
│   └── ProtectedRoute.tsx
├── contexts/                     # React Context providers
│   └── AuthContext.tsx
└── lib/                          # Utility functions
    ├── api.ts                    # API client functions
    ├── types.ts                  # TypeScript definitions
    └── utils.ts                  # Helper functions
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run Biome linter
- `pnpm format` - Format code with Biome

## User Roles

### Admin
- Manage employees, managers, and leave types
- Credentials set via backend environment variables

### Employee
- Request leaves and view balances
- Credentials created by admin

### Manager
- Approve/reject leave requests
- Credentials created by admin

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# Employee-Frontend
# Employee-Frontend
