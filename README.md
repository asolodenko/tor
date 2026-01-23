# Strapi + Next.js Clickable Prototype

A full-stack application with **Strapi CMS** as the backend for content management and schema handling, and **Next.js** for the frontend.

## 📁 Project Structure

```
strapi-app/
├── backend/          # Strapi CMS backend
├── frontend/         # Next.js frontend
└── README.md         # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### 1. Backend Setup (Strapi)

```bash
cd backend
npm install
npm run develop
```

The Strapi admin panel will be available at **http://localhost:1337/admin**

**First time setup:**
1. Create your admin account when prompted
2. The backend will run on port 1337

### 2. Frontend Setup (Next.js)

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The Next.js app will be available at **http://localhost:3000**

## 🔧 Configuration

### Backend Environment Variables

Copy `.env.example` to `.env` in the backend folder:

```bash
cd backend
cp .env.example .env
```

Key variables:
- `PORT=1337` - Strapi server port
- `FRONTEND_URL=http://localhost:3000` - Frontend URL for CORS

### Frontend Environment Variables

Create `.env.local` in the frontend folder:

```bash
cd frontend
cp .env.local.example .env.local
```

Key variables:
- `NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337` - Strapi API URL
- `STRAPI_API_TOKEN=` - API token (optional, for authenticated requests)

## 📡 API Integration

The frontend includes a Strapi API utility at [`frontend/lib/strapi.ts`](frontend/lib/strapi.ts):

```typescript
import { fetchAPI, getStrapiMedia } from '@/lib/strapi';

// Fetch data
const data = await fetchAPI('/api/articles');

// Get media URL
const imageUrl = getStrapiMedia(article.image.url);
```

## 🎨 Creating Content Types in Strapi

1. Go to **http://localhost:1337/admin**
2. Navigate to **Content-Type Builder**
3. Create your content types (e.g., Articles, Pages, Components)
4. Add fields to your content types
5. Save and restart the server if prompted

## 🔐 Setting Up API Permissions

1. In Strapi admin, go to **Settings > Users & Permissions > Roles**
2. Select **Public** role
3. Enable permissions for your content types (e.g., `find`, `findOne`)
4. Save

## 🛠️ Development Commands

### Backend (Strapi)

```bash
npm run develop    # Start in development mode with admin panel
npm run start      # Start in production mode
npm run build      # Build admin panel
npm run strapi     # Run Strapi CLI commands
```

### Frontend (Next.js)

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

## 📚 Tech Stack

### Backend
- **Strapi v5** - Headless CMS
- **SQLite** - Default database (can be changed to PostgreSQL, MySQL, etc.)
- **Node.js** - Runtime environment

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **React Compiler** - Optimized React rendering

## 🌐 CORS Configuration

CORS is pre-configured in Strapi to allow requests from `http://localhost:3000`. To modify:

1. Edit `backend/config/middlewares.ts`
2. Update the `origin` array with your frontend URLs

## 📝 Next Steps

1. **Create content types** in Strapi admin panel
2. **Set up API permissions** for public access
3. **Build your frontend** pages using the Strapi data
4. **Customize the design** with Tailwind CSS

## 🐛 Troubleshooting

- **Port conflicts**: Change ports in `.env` files if 1337 or 3000 are in use
- **CORS errors**: Verify `FRONTEND_URL` in backend `.env` matches your frontend URL
- **API token errors**: Generate an API token in Strapi admin if using authenticated requests

## 📖 Documentation

- [Strapi Documentation](https://docs.strapi.io)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 📄 License

This project is for prototype development purposes.
