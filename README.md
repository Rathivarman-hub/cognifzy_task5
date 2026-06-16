# ⚡ ShopNest — MERN Stack Product Management App

> **Task 5 — API Integration & Front-End Interaction**
> Full-stack MERN app with MVC architecture, REST API, React frontend, dark/light mode, search, filter, sort, and pagination.

---

## 🗂️ Project Structure

```
mern-product-app/
├── client/              # Vite + React 19 + Bootstrap 5
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Route-level pages
│   │   ├── context/     # React Context (Theme + Products)
│   │   ├── hooks/       # Custom hooks
│   │   └── services/    # Axios API layer
│   └── .env
└── server/              # Node.js + Express (ES6 modules)
    ├── src/
    │   ├── controllers/ # Business logic
    │   ├── models/      # In-memory data store
    │   ├── routes/      # Express routers
    │   └── middleware/  # Error handling + validation
    └── .env
```

---

## 🚀 Getting Started

### 1. Install & Run the Server

```bash
cd server
npm install
npm run dev
# Server runs at http://localhost:5000
```

### 2. Install & Run the Client

```bash
cd client
npm install
npm run dev
# Client runs at http://localhost:5173
```

---

## 🔌 API Endpoints

| Method | Endpoint              | Description          |
|--------|-----------------------|----------------------|
| GET    | /api/products         | Get all (w/ filters) |
| GET    | /api/products/:id     | Get single product   |
| POST   | /api/products         | Create product       |
| PUT    | /api/products/:id     | Update product       |
| DELETE | /api/products/:id     | Delete product       |
| GET    | /api/health           | Server health check  |

### Query Parameters (GET /api/products)

| Param      | Example          | Description              |
|------------|------------------|--------------------------|
| `search`   | `?search=phone`  | Search by name/desc/cat  |
| `category` | `?category=Electronics` | Filter by category |
| `sort`     | `?sort=price_asc`| Sort order               |
| `page`     | `?page=2`        | Page number              |
| `limit`    | `?limit=6`       | Items per page           |

---

## ✨ Features

- ✅ Full CRUD with toast notifications and delete confirmation modal
- 🔍 Live search + category filter + sort (price/name/date)
- 📄 Server-side pagination (6 items/page)
- 🌙 Dark/Light mode with localStorage persistence
- 📱 Responsive: 1/2/3 column grid (mobile/tablet/desktop)
- ⚡ Loading skeleton cards
- 🏗️ MVC server architecture
- 🔒 Request validation middleware
- 📝 Morgan HTTP logger
- 🌐 CORS enabled

---

## 🎨 Color Scheme

| Mode  | Background | Card    | Text    | Accent  |
|-------|------------|---------|---------|---------|
| Dark  | #0f172a    | #1e293b | #f1f5f9 | #6366f1 |
| Light | #f8fafc    | #ffffff | #0f172a | #4f46e5 |

---

## 🛠️ Tech Stack

**Client:** React 19, Vite, Bootstrap 5, Axios, React Router v6, Context API

**Server:** Node.js, Express, ES6 Modules, Morgan, CORS, uuid, dotenv
