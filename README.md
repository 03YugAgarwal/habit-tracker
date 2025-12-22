# Habit Tracker

A minimalist habit tracker inspired by **GitHub’s contribution heatmap**.  
Track habits daily, visualize consistency, and build long-term discipline with a simple click.

🔗 **Live Demo:** 

---

## ✨ Features

- 📊 **GitHub-style heatmap** for habit tracking  
- ✅ One-click daily logging (toggle done / undone)
- 🗓️ Add or edit past entries if you forgot
- 🎨 Custom habit icons & colors
- 🔐 Secure authentication with HTTP-only cookies
- 🌙 GitHub Dark–inspired UI
- 📱 Fully responsive (desktop & mobile)
- 🚀 Fast server-side rendering with Next.js App Router

---

## 🛠 Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL (Neon)
- **ORM:** Drizzle ORM
- **Auth:** Cookie-based JWT authentication
- **Deployment:** Vercel

---

## 🚀 Getting Started (Local Development)

### Clone & Install

```bash
git clone https://github.com/your-username/habit-tracker.git
cd habit-tracker
npm install
```

### Environment Variables

Create `.env.local`:

```env
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
JWT_SECRET=your-secret-key
NODE_ENV=development
```

### Run

```bash
npx drizzle-kit push
npm run dev
```

---

## ☕ Support

Buy me a coffee: 

---

MIT License © 2025
