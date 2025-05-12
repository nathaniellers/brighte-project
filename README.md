```markdown
# 🍽️ Brighte Eats - Expression of Interest System

Welcome to **Brighte Eats**! This project provides a complete system to capture and view customer expressions of interest in our upcoming service. 🚀

Users can register interest in:
- 🛵 Delivery  
- 🧍 Pick-up  
- 💳 Payment  

This solution includes a GraphQL API (written in TypeScript for Node.js) and an optional front-end interface to view leads in a dashboard.

---

## ✨ Features

- 🗃️ **Relational Database** using **SQLite**
- ⚙️ **GraphQL API** built with Node.js + TypeScript
- ✍️ `register` mutation to collect user interest
- 🔍 `leads` and `lead` queries to retrieve data
- ✅ Includes **unit tests**
- 🧪 Easily extendable for interviews or live demos
- 🖥️ Optional Frontend (TypeScript, React — optional setup explained below)

---

## 📦 Tech Stack

- **Node.js**
- **TypeScript**
- **GraphQL** (`graphql`, `apollo-server`)
- **SQLite** (via `Prisma ORM`)
- **Jest** for unit testing
- **React** (optional dashboard frontend)
- **ESLint & Prettier** for code quality

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/brighte-eats.git
cd brighte-eats
```

### 2. Install Dependencies

```bash
# Backend
cd backend
npm install

# (Optional) Frontend
cd ../brighte-fe
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the `backend/` directory with the following content:

```
DATABASE_URL="file:./dev.db"
PORT=4000
```

> ✅ No need to install or run an external database server — SQLite runs in-process!

### 4. Set Up the Database

Use Prisma to initialize and migrate your database:

```bash
cd server
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Start the API Server

```bash
npm run dev
```

GraphQL Playground should now be available at: [http://localhost:4000/graphql](http://localhost:4000/graphql)

### 6. (Optional) Start the Frontend

```bash
cd ../brighte-fe
npm start
```

---

## 🧪 Running Tests

```bash
cd bright-fe
npm test
```

Tests are written using **Jest**, and include basic coverage for queries.

---

## 🧱 API Overview

### 🔧 Mutation: `register`

Registers a new lead.

```graphql
mutation {
  register(input: {
    name: "Jane Doe",
    email: "jane@example.com",
    mobile: "0400000000",
    postcode: "2000",
    services: ["delivery", "payment"]
  }) {
    id
    name
  }
}
```

### 🔍 Queries

#### `leads`

Returns a list of all leads.
_You can also run this query in [Apollo Studio](https://studio.apollographql.com/sandbox/explorer)_
```graphql
query {
  leads {
    id
    name
    email
    mobile
    postcode
    createdAt
    services {
      id
      name
    }
  }
}
```
---

## 🧠 Project Structure

```bash
brighte-eats/
├── backend/             # GraphQL API (Node.js + TypeScript)
│   ├── prisma/         # Prisma schema and SQLite database
│   ├── src/
│   │   ├── resolvers/
│   │   ├── schema/
│   │   └── index.ts
├── brighte-fe/             # Optional frontend (React + TS)
│   ├── src/
│   └── ...
└── README.md
```

---

## ✅ Future Improvements

- Admin authentication for the dashboard
- Filtering & pagination for leads
- Email confirmation on registration
- CI/CD pipeline for deployment

---

## 👥 Author

Built with ❤️ by [Nathanielle Romero](https://www.linkedin.com/in/nathanielle-romero-a2580020a/) for the Brighte Eats technical interview challenge.

---

## 📄 License

MIT License. See [LICENSE](./LICENSE) for details.
```
