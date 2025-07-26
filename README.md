## Introduction

This project is a modern, responsive landing page for ConvergeINNOV, featuring a custom dashboard that provides statistics and real-time CRUD operations to efficiently manage page content. 

## Technologies

- **Next.js** (Frontend), **Next.js API Routes** (Backend)
- **HeroUI** (UI Library), **RadixUI** (Icon Library)
- **Framer Motion** (Animation), **Tailwind CSS** (Styling), **Spline** (3D)
- **NextAuth.js**, **bcryptjs** (Authentication)
- **MongoDB** (Database), **Mongoose** (ODM)
- **Upstash Redis** (Serverless DB for dashboard stats — visitor counter for now, expandable)


## Getting Started

To get started with this project, follow these steps:

1. Clone the repository: `git clone https://github.com/firas1438/ConvergeINNOV`
2. Install the dependencies: `npm install`
3. Start the development server: `npm run dev`

## Usage

Once the development server is running, you can access the application at `http://localhost:3000`. 

## Environment Variables

Create a `.env` file in your project root with the following variables:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<database-name>?retryWrites=true&w=majority
AUTH_SECRET=your_auth_secret_here

UPSTASH_REDIS_REST_URL=https://<identifier>.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_redis_token_here
