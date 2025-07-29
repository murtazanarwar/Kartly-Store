## 🧪 Demo Credentials

for quick demo, use the following account:

| Role       | Email                     | Password   |
| ---------- | ------------------------- | ---------- |
| Admin User | demo@kartly.com     | demo123  |

Simply sign in at the Clerk-powered login page with these credentials.
# Project Overview

🛒 Kartly Store Platform combined with Kartly Admin Platform is a full‑featured, lightning‑fast shopping experience built with Next.js and React for indie brands, growing retailers, and developers who crave customizable, real‑time storefronts.

Whether you’re an entrepreneur launching your first online shop or a seasoned dev looking for a rock‑solid starter kit, Kartly gives you:

- 🛒 **Flexible Cart & Inventory**: Quantity control, category/size/color filters, and live stock updates via Socket.IO  
- 💳 **Seamless Payments**: Razorpay integration out of the box  
- 📣 **Marketing Ready**: Billboards to spotlight promos  
- 🔒 **Rock‑Solid Auth**: Email signup/login/recovery/verification plus OAuth (Google, Meta)  
- 📐 **Modern Tech Stack**: Next.js 15, React 18, Tailwind CSS, Zustand, React Hook Form & Zod, Cloudinary, and more  

Kartly is perfect for:  
- 🛍️ Small‑to‑mid‑sized brands who want a polished storefront  
- ⚙️ Developers seeking a plug‑and‑play e‑commerce boilerplate  
- 🚀 Teams that need real‑time features with minimal setup  

Get started in minutes and delight your customers with a buttery‑smooth shopping journey!  


## 🛠 Tech Stack

### Framework & Runtime
- 🚀 **Next.js 15** (React 18) — Full‑stack React framework with built‑in SSR, SSG, and API routes  

### Styling & UI
- 🎨 **Tailwind CSS 3** + Plugins — Utility‑first styling, animations, and custom scrollbars  
- 🧩 **Radix UI** & **Headless UI** — Unstyled, accessible components you can theme  

### State & Data
- 🌐 **Zustand** — Lightweight, scalable global state  
- 🔄 **React Hook Form** & **Zod** — Schema‑driven form handling & validation  
- 🔗 **Axios** / **query-string** — Easy API calls and query management  

### Real‑Time & Media
- ⚡ **Socket.IO** (client & server) — Live stock updates and notifications  
- 📸 **next-cloudinary** — Seamless image uploads & transformations  

### Authentication & Payments
- 🔒 **Custom Auth** (Email/Password + Password Recovery)  
- 🌐 **OAuth** (Google, Facebook in progress)  
- 💳 **Razorpay Checkout** — Indian market payment integration  

### Dev & Deployment
- 🛠️ **ESLint** & **TypeScript** — Static typing and linting for rock‑solid code  
- ⚙️ **PostCSS** & **Tailwind CSS CLI** — Build‑time CSS processing  
- ☁️ **Vercel** (or your preferred host) — One‑click deployment, auto‑scaling  
- 🎁 **React Hot Toast** — User‑friendly in‑app notifications  
- 🔍 **Lucide React** & **React Icons** — Feather‑style and custom iconography  

## Demo

Insert gif or link to demo


## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

```env
# Backend API base URL (replace {storeId} with actual store identifier at runtime)
NEXT_PUBLIC_API_URL=http://your-admin.com/api/{storeId}

# Cloudinary Cloud Name for image uploads
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name_here

# URL for your real-time socket server
NEXT_PUBLIC_SOCKET_SERVICE_URL=https://your-socket-server.com

```


## Run Locally

Clone the project

```bash
  git clone https://github.com/murtazanarwar/E-Commerce-Store
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Build the Next.js application

```bash
  npm run build
```

Start the server

```bash
  npm run start
```


## License

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)  

## Badges
[![Version](https://img.shields.io/npm/v/e-commerce-platform.svg)](https://www.npmjs.com/package/e-commerce-platform)  
[![Build Status](https://img.shields.io/github/actions/workflow/status/your-username/e-commerce-platform/ci.yml?branch=main)](https://github.com/your-username/e-commerce-platform/actions)  
[![Coverage Status](https://img.shields.io/codecov/c/gh/your-username/e-commerce-platform/main.svg)](https://codecov.io/gh/your-username/e-commerce-platform)  
[![Dependencies](https://img.shields.io/librariesio/release/npm/e-commerce-platform)](https://libraries.io/npm/e-commerce-platform)  
[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/GPL-3.0)  
[![License: AGPL](https://img.shields.io/badge/License-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)  
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/your-username/e-commerce-platform/pulls)  
