# AI Assistant Platform

This is a **Next.js** project bootstrapped with `create-next-app`.

## 🚀 Getting Started

First, set up the environment variables and Convex backend, then run the development server.

---

## 📋 Prerequisites

Make sure you have the following installed:

- **Node.js**: Version 18 or higher  
- **Package Manager**: `npm`, `yarn`, `pnpm`, or `bun`  
- **Convex CLI**: For managing the Convex backend  
- **Eden AI Account**: To obtain an API key  
- **Google Cloud Console**: For OAuth client ID

---

## 📦 Installation

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

--- 

## 📦 Install Dependencies

```bash
# Choose one
npm install
yarn install
pnpm install
bun install

```

## 🔐 Environment Variables

Create a `.env.local` file in the root of the project with the following variables:

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
EDEN_AI_API_KEY=your-eden-ai-api-key
CONVEX_DEPLOYMENT=your-convex-deployment
NEXT_PUBLIC_CONVEX_URL=your-convex-url


```
## 🏃 Running the Application

### 1. Start the Convex development server:

```bash
npx convex dev

```
## start the development server:

```bash
# Choose one
npm run dev
yarn dev
pnpm dev
bun dev

```

--- Visit http://localhost:3000 to see the application.

## ✨ Features
Create and manage AI assistants using Eden AI

Real-time data storage with ConvexDB

Secure Google OAuth authentication

Fully type-safe with TypeScript

Responsive UI built with Next.js

# 🛠 Tech Stack

### Next.js – React framework for SSR and SSG

### Eden AI – Unified API for AI capabilities

### ConvexDB – Real-time serverless database

### TypeScript – Type-safe JavaScript development

### Other tools – Libraries for UI, state management, and auth

---
## 📸 Demo Screenshots

Here are some key screens of the application:

### 🧠 AI Assistants Overview  
![AI Assistants](public\Adding_assistant.png)


### 🧩 Assistant Resolution  
![Assistant Resolution](public\Assistant_resolve.png)

### ➕ Adding a New Assistant  
![Adding Assistant](public\Adding_assistant.png)

### 🔐 Authorization Page  
![Authorization](public\Authorisation.png)

