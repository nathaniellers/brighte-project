# Brighte Eats - Lead Management API

## 🚀 Tech Stack
- Node.js + TypeScript
- GraphQL (Apollo Server)
- Prisma + PostgreSQL
- Jest (for testing)

## 📦 Setup

```bash
git clone https://github.com/YOUR_USERNAME/brighte-eats.git
cd brighte-eats
npm install
cp .env.example .env
# Update .env with your PostgreSQL DB URL

npx prisma generate
npx prisma migrate dev --name init

npm run dev
