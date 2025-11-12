# **ServiceHub API**  
### *A Clean, Scalable, Production-Ready Service Booking Backend with Cloudinary, SSLCommerz & Role-Based Access*

---

## 📖 Overview

**ServiceHub** is a **modular, type-safe, full-featured service management backend** built with:

- **Node.js + Express + TypeScript**
- **Prisma ORM + PostgreSQL**
- **JWT Auth + Refresh Token + Role-Based Access (User / Provider / Admin)**
- **Cloudinary Image Upload**
- **SSLCommerz + Cash Payment**
- **Search, Filter, Reviews, Booking, Admin Dashboard**

Perfect for **marketplace apps**, **local service platforms**, or **freelancer booking systems**.

---

## 🌐 Live API Base URL

```
https://api.servicehub.com
```

> (Local dev: `http://localhost:9999`)

---

## 🛠 Tech Stack

| Layer           | Tech Used |
|----------------|-----------|
| Language       | TypeScript |
| Framework      | Express.js |
| ORM            | Prisma |
| Database       | PostgreSQL |
| Auth           | JWT + Cookies + Refresh Token |
| File Upload    | Cloudinary |
| Payment        | SSLCommerz, Cash |
| Validation     | `http-errors` + Zod (optional) |
| Dev Tools      | `ts-node-dev`, `prisma studio` |

---

## 📁 Project Structure

```bash
root/
├── config/
│   ├── cloudinary.ts     # Cloudinary setup
│   └── dotenv.ts         # Environment variables
├── middlewares/
│   ├── auth.ts           # JWT + protect
│   └── handleError.ts    # Global error handler
├── modules/
│   ├── auth/             # Register, Login, Profile, Logout, Refresh
│   ├── service/          # Create, List, Filter
│   ├── category/         # Manage categories
│   ├── booking/          # Book service
│   ├── payment/          # SSLCommerz & Cash
│   ├── review/           # Add review
│   └── admin/            # Dashboard, approve providers
├── utils/
│   ├── prisma.ts         # Singleton Prisma client
│   ├── generateToken.ts  # JWT helper
│   └── uploadToCloudinary.ts
└── app.ts, server.ts
└── Other files
```

---

## 📋 Prerequisites

| Tool       | Version |
|------------|--------|
| Node.js    | `>=18` |
| PostgreSQL | `>=13` |
| npm/yarn   | latest |

---

## 🚀 Quick Start (5 Minutes)

### 1. Clone & Install

```bash
git clone https://github.com/mdrezuanislamridoy/service-management-system-backend.git
cd service-management-system-backend
npm install
```

### 2. Setup `.env`

```env
# .env
PORT=5000
CLIENT_URL=http://localhost:5173

DATABASE_URL=postgresql://postgres:password@localhost:5432/servicehub

JWT_SECRET=your_very_secure_jwt_secret_123456789

# Cloudinary (Required)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=your_api_secret

# SSLCommerz (Sandbox)
SSLCOMMERZ_STORE_ID=yourstore123
SSLCOMMERZ_STORE_PASSWORD=yourpass@123
```

### 3. Run Database

```bash
# Start PostgreSQL (Docker)
docker run --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres

# Or use local PostgreSQL
```

### 4. Migrate & Seed

```bash
npm run migrate        # Creates tables
npx prisma generate    # Generate client
```

### 5. Start Server

```bash
npm run dev
```

Server runs at: [http://localhost:5000](http://localhost:5000)

---

## 📡 API Endpoints (Frontend Ready)

### Auth

| Method | Endpoint                    | Description |
|--------|-----------------------------|-------------|
| POST   | `/api/v1/auth/register`     | Register user/provider |
| POST   | `/api/v1/auth/login`        | Login + set JWT cookie |
| GET    | `/api/v1/auth/profile`      | Get user profile |
| POST   | `/api/v1/auth/logout`       | Logout + invalidate refresh token |
| PATCH  | `/api/v1/auth/refresh-token`| Refresh access token |

> **Payload Example (Register as Provider)**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "role": "PROVIDER"
}
```

> **Refresh Token Flow**

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Services

| Method | Endpoint                  | Description |
|--------|---------------------------|-------------|
| POST   | `/api/v1/services`        | Create service (Provider) |
| GET    | `/api/v1/services`        | List + filter |
| GET    | `/api/v1/services/my`     | My services (Provider) |

#### Create Service (with images)

```bash
POST /api/v1/services
Content-Type: multipart/form-data
Authorization: Bearer <token>

Form Data:
- title: "Home Cleaning"
- description: "Deep cleaning service"
- categoryId: 1
- price: 1500
- location: "Dhaka"
- images: [file1.jpg, file2.jpg]
```

#### Filter Services

```http
GET /api/v1/services?category=1&location=Dhaka&minPrice=1000&maxPrice=2000
```

---

### Categories

| Method | Endpoint              | Description |
|--------|-----------------------|-------------|
| POST   | `/api/v1/categories`  | Create (Admin) |
| GET    | `/api/v1/categories`  | List all |

---

### Bookings

| Method | Endpoint                     | Description |
|--------|------------------------------|-------------|
| POST   | `/api/v1/bookings`           | Book a service |
| PATCH  | `/api/v1/bookings/:id/status`| Update status (Provider) |

```json
{
  "serviceId": 5,
  "paymentMethod": "SSLCOMMERZ"
}
```

---

### Payments

| Method | Endpoint                            | Description |
|--------|-------------------------------------|-------------|
| POST   | `/api/v1/payments/sslcommerz/:id`   | Redirect to SSLCommerz |
| POST   | `/api/v1/payments/cash/:id`         | Confirm cash payment |

> Returns `redirectUrl` for SSLCommerz

---

### Reviews

| Method | Endpoint             | Description |
|--------|----------------------|-------------|
| POST   | `/api/v1/reviews`    | Add review (after completion) |

```json
{
  "bookingId": 10,
  "rating": 5,
  "comment": "Great service!"
}
```

---

### Admin Dashboard

| Method | Endpoint                           | Description |
|--------|------------------------------------|-------------|
| GET    | `/api/v1/admin/dashboard`          | Stats |
| PATCH  | `/api/v1/admin/providers/approve/:id` | Approve provider |
| PATCH  | `/api/v1/admin/providers/reject/:id`  | Reject provider |

---

## 🔐 Role-Based Access

| Role     | Can Access |
|----------|------------|
| `USER`   | Browse, Book, Review |
| `PROVIDER` | Create/Edit Services, Accept Bookings |
| `ADMIN`  | Approve Providers, View Dashboard |

---

## ☁️ Cloudinary Image Upload

- Upload up to **5 images** per service
- Auto-optimized (`f_auto,q_auto`)
- Stored in `services/` folder
- Returns **secure HTTPS URLs**

---

## ⚠️ Error Handling

All errors return:

```json
{
  "success": false,
  "message": "Error description"
}
```

---

## 📝 Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Start with hot reload |
| `npm run build` | Compile to JS |
| `npm run start` | Run production |
| `npm run migrate` | Run Prisma migrations |
| `npm run studio` | Open Prisma Studio |

---

## 🔧 Environment Variables (`.env`)

```env
PORT=5000
CLIENT_URL=http://localhost:5173

DATABASE_URL=postgresql://postgres:password@localhost:5432/servicehub

JWT_SECRET=your_very_secure_jwt_secret_123456789

CLOUDINARY_CLOUD_NAME=yourname
CLOUDINARY_API_KEY=123456789
CLOUDINARY_API_SECRET=your_secret

SSLCOMMERZ_STORE_ID=testbox
SSLCOMMERZ_STORE_PASSWORD=testbox@123
```

---

## 🧪 Testing with Postman / Frontend

1. Register → Get `accessToken` from cookie
2. Use `Authorization: Bearer <token>` in headers
3. Upload images via `form-data`
4. For refresh: Send `refreshToken` from localStorage

---

## 🎨 Frontend Integration Tips


### 2. Upload Images

```ts
const formData = new FormData();
formData.append("title", "Cleaning");
formData.append("images", file1);
formData.append("images", file2);

fetch("/api/v1/services", {
  method: "POST",
  body: formData,
  credentials: "include"
});
```

### 3. Handle Refresh Token

```ts
// Axios interceptor
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401 && !originalReq._retry) {
      const { data } = await api.patch("/auth/refresh-token", {
        refreshToken: localStorage.getItem("refreshToken")
      });
      
      localStorage.setItem("refreshToken", data.refreshToken);
      originalReq.headers.Authorization = `Bearer ${data.accessToken}`;
      return api(originalReq);
    }
  }
);
```

### 4. Handle Redirect (SSLCommerz)

```ts
if (response.redirectUrl) {
  window.location.href = response.redirectUrl;
}
```

---

## 🤝 Contributing

1. Fork the repo
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

