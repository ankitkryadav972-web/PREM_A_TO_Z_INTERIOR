# PREM A TO Z INTERIOR DESIGN — BACKEND API DOCUMENTATION

This document is the **single source of truth** and technical contract for the **PREM A TO Z INTERIOR DESIGN** REST API backend. It serves as the complete reference for backend developers and future frontend engineers connecting a React client.

---

## 1. Project Overview

The backend for **PREM A TO Z INTERIOR DESIGN** is a robust, modular, and production-ready Node.js REST API designed with a clean layered architecture (Controllers, Middleware, Models, Routes, Services, Validators, and Utilities).

### Architecture Highlights
* **Stateless RESTful Design**: Fully stateless API utilizing JSON Web Tokens (JWT) for secure authentication.
* **Role-Based Access Control (RBAC)**: Strict separation of privileges between `public` visitors, authenticated `customer` users, and `admin` administrators.
* **Resilient Data Layer**: MongoDB ODM powered by Mongoose with strict schema typing, indexes, pre-save hooks, and automated URL slugification.
* **Defensive Security Architecture**: Helmet security headers, configurable CORS whitelisting, bcrypt password hashing (12 salt rounds), rate limiting against brute force, and sanitized data responses (zero password leakage).
* **Centralized Error Handling**: Predictable error response contract with specific HTTP status codes and machine-readable error codes.
* **Extensible Asset Management**: Modular file upload system handling local storage with clean abstraction ready for cloud storage (e.g., AWS S3, Cloudinary).

---

## 2. Tech Stack

| Technology | Purpose | Version / Details |
| :--- | :--- | :--- |
| **Node.js** | Runtime Environment | v18+ / v20+ (ES Modules `"type": "module"`) |
| **Express.js** | Web Framework | 5.x |
| **MongoDB** | Primary NoSQL Database | Modern MongoDB / MongoDB Atlas |
| **Mongoose** | Object Data Modeling (ODM) | 9.x |
| **JSON Web Tokens (JWT)** | Authentication Token Protocol | `jsonwebtoken` 9.x |
| **Bcryptjs** | Password Hashing | 12 Salt Rounds |
| **Helmet** | HTTP Security Headers | 8.x |
| **CORS** | Cross-Origin Resource Sharing | Whitelisted frontend origins |
| **Express Rate Limit** | Rate Limiting & DoS Protection | Dedicated limits for Auth and API |
| **Express Validator** | Request Validation & Sanitization | 7.x |
| **Multer** | Multipart/Form-Data File Uploads | Image MIME filtering & 5MB file cap |
| **Morgan** | HTTP Request Logger | Development request tracing |
| **Dotenv** | Environment Configuration | Safe environment variable management |

---

## 3. Folder Structure

```text
Backend/
├── src/
│   ├── config/
│   │   ├── db.js                 # MongoDB connection & lifecycle listeners
│   │   └── env.js                # Validated environment configuration defaults
│   ├── controllers/
│   │   ├── auth.controller.js       # Register, login, getMe, logout
│   │   ├── user.controller.js       # User management (Admin) & Profile (Self)
│   │   ├── service.controller.js    # Interior services catalog & management
│   │   ├── product.controller.js    # Interior products & catalog
│   │   ├── gallery.controller.js    # Project photos & portfolio showcase
│   │   ├── testimonial.controller.js# Customer reviews & ratings
│   │   ├── enquiry.controller.js    # Customer enquiry submission & admin triage
│   │   ├── setting.controller.js    # Business details & homepage CMS content
│   │   ├── dashboard.controller.js  # Admin metrics & high-level analytics
│   │   └── upload.controller.js     # Image file upload processing
│   ├── middleware/
│   │   ├── auth.middleware.js       # verifyToken (protect), authorize, optionalAuth
│   │   ├── error.middleware.js      # notFoundHandler & centralized errorHandler
│   │   ├── rateLimiter.middleware.js# General API and strict Auth rate limiters
│   │   ├── validate.middleware.js   # express-validator result formatter
│   │   └── upload.middleware.js     # Multer storage, limits & image filters
│   ├── models/
│   │   ├── user.model.js            # User accounts, passwords & roles
│   │   ├── service.model.js         # Core services (Doors, Kitchen, POP, etc.)
│   │   ├── product.model.js         # Products & categories
│   │   ├── gallery.model.js         # Gallery items & portfolios
│   │   ├── enquiry.model.js         # Leads & customer enquiries
│   │   ├── testimonial.model.js     # Customer reviews & ratings
│   │   └── setting.model.js         # Exact business details & site settings
│   ├── routes/
│   │   ├── index.js                 # Main router aggregator (/api and /api/v1)
│   │   ├── auth.routes.js           # /api/auth
│   │   ├── user.routes.js           # /api/users
│   │   ├── service.routes.js        # /api/services
│   │   ├── product.routes.js        # /api/products
│   │   ├── gallery.routes.js        # /api/gallery
│   │   ├── testimonial.routes.js    # /api/testimonials
│   │   ├── enquiry.routes.js        # /api/enquiries
│   │   ├── setting.routes.js        # /api/settings
│   │   ├── dashboard.routes.js      # /api/admin
│   │   ├── upload.routes.js         # /api/uploads
│   │   └── health.routes.js         # /api/health
│   ├── seeds/
│   │   └── seed.js                  # Automated database seeder with sample data
│   ├── utils/
│   │   ├── apiResponse.js           # Standard JSON response formatting helper
│   │   ├── apiError.js              # Custom ApiError with HTTP & error codes
│   │   ├── asyncHandler.js          # Async wrapper preventing unhandled rejections
│   │   └── slugify.js               # Clean URL slug generation
│   ├── validators/
│   │   ├── auth.validator.js        # Input validation for registration & login
│   │   ├── user.validator.js        # Input validation for user updates
│   │   ├── service.validator.js     # Input validation for services
│   │   ├── product.validator.js     # Input validation for products
│   │   ├── gallery.validator.js     # Input validation for gallery
│   │   ├── enquiry.validator.js     # Input validation for enquiries
│   │   ├── testimonial.validator.js # Input validation for testimonials
│   │   └── setting.validator.js     # Input validation for site settings
│   ├── app.js                       # Express app configuration & middleware pipeline
│   ├── server.js                    # Server listener & graceful shutdown
│   └── test_api.js                  # Automated API test suite
├── uploads/                         # Directory for uploaded media assets
├── .env                             # Local environment variables
├── .env.example                     # Environment variables template
├── .gitignore                       # Git exclusion rules
├── package.json                     # Dependencies & scripts
└── backend.md                       # Single source of truth documentation
```

---

## 4. Environment Variables

All environment variables are loaded and validated in [`src/config/env.js`](file:///c:/Project/Prem%20A%20to%20Z/Backend/src/config/env.js).

| Variable | Description | Default Value | Example |
| :--- | :--- | :--- | :--- |
| `PORT` | Port on which the HTTP server listens | `5000` | `5000` |
| `NODE_ENV` | Application environment | `development` | `production` / `development` |
| `MONGODB_URI` | MongoDB connection URI | `mongodb://127.0.0.1:27017/prem_a_to_z_interior` | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key used to sign and verify JWT tokens | `prem_a_to_z_interior_secure_dev_jwt_key_2026` | `your_64char_production_random_secret` |
| `JWT_EXPIRES_IN` | Token validity duration | `7d` | `7d`, `24h`, `30d` |
| `CLIENT_URL` | Allowed CORS origins (comma-separated for multiple) | `http://localhost:5173,http://localhost:3000` | `https://premAtoZ.com,http://localhost:5173` |
| `RATE_LIMIT_WINDOW_MS` | General rate limit time window in milliseconds | `900000` (15 minutes) | `900000` |
| `RATE_LIMIT_MAX_REQUESTS` | Max general requests allowed per IP per window | `200` | `200` |
| `AUTH_RATE_LIMIT_MAX_REQUESTS` | Max auth requests allowed per IP per 15 minutes | `20` | `20` |

---

## 5. Database Models

### 5.1 User Model (`User`)
Stores all user accounts including customers, administrators, and future employee roles.

| Field | Type | Required | Enums / Rules | Description |
| :--- | :--- | :--- | :--- | :--- |
| `name` | `String` | Yes | Min: 2, Max: 100 chars, Trimmed | Full name of the user |
| `email` | `String` | Yes | Unique, Lowercase, Valid Email | Email address (unique account identifier) |
| `mobile` | `String` | Yes | Unique, 10-digit Indian pattern `^[6-9]\d{9}$` | Mobile phone number (can log in with this) |
| `password` | `String` | Yes | Min: 6 chars, `select: false` | Bcrypt-hashed password (never returned in responses) |
| `role` | `String` | Yes | `['customer', 'admin', 'employee', 'manager']` | User access tier (default: `'customer'`) |
| `isActive` | `Boolean` | Yes | Default: `true` | Account active status (deactivated users cannot log in) |
| `createdAt` | `Date` | Auto | Mongoose Timestamp | Account creation timestamp |
| `updatedAt` | `Date` | Auto | Mongoose Timestamp | Account last updated timestamp |

* **Indexes**: `{ email: 1 }` (unique), `{ mobile: 1 }` (unique)
* **Pre-save Hook**: Automatically hashes `password` using `bcrypt.hash(..., 12)` if modified.
* **Instance Methods**: `comparePassword(candidatePassword)` returns boolean.
* **JSON Serialization**: Automatically removes `password` and `__v`.

---

### 5.2 Service Model (`Service`)
Catalog of interior design services offered by Prem A to Z Interior Design.

| Field | Type | Required | Enums / Rules | Description |
| :--- | :--- | :--- | :--- | :--- |
| `title` | `String` | Yes | Max: 120 chars, Trimmed | Service title (e.g. "Doors", "Kitchen") |
| `slug` | `String` | Yes | Unique, Indexed, Lowercase | Clean URL slug (e.g. `pop-and-false-ceiling`) |
| `description` | `String` | Yes | Text | Detailed description of the service |
| `shortDescription`| `String` | No | Max: 300 chars | Brief summary for cards and search snippets |
| `image` | `String` | No | URL / Path | Cover image URL or upload path |
| `features` | `[String]`| No | Array of strings | Key bullet-point highlights of the service |
| `isActive` | `Boolean` | Yes | Default: `true`, Indexed | Visibility status |
| `createdAt` | `Date` | Auto | Mongoose Timestamp | Creation timestamp |
| `updatedAt` | `Date` | Auto | Mongoose Timestamp | Modification timestamp |

* **Indexes**: `{ slug: 1 }` (unique), `{ isActive: 1 }`
* **Pre-save Hook**: Auto-generates `slug` using `slugify(title)` if not provided or title changes.

---

### 5.3 Product Model (`Product`)
Products, fittings, hardware, modular designs, and furnishings.

| Field | Type | Required | Enums / Rules | Description |
| :--- | :--- | :--- | :--- | :--- |
| `name` | `String` | Yes | Max: 150 chars, Trimmed | Product name |
| `slug` | `String` | Yes | Unique, Indexed, Lowercase | URL slug |
| `category` | `String` | Yes | Trimmed, Indexed | Category (e.g. "Doors", "Kitchen", "Ceiling") |
| `description` | `String` | No | Text | Comprehensive product details |
| `images` | `[String]`| No | Array of URLs / Paths | Gallery images of the product |
| `features` | `[String]`| No | Array of strings | Key specifications or material features |
| `isActive` | `Boolean` | Yes | Default: `true`, Indexed | Visibility status |
| `createdAt` | `Date` | Auto | Mongoose Timestamp | Creation timestamp |
| `updatedAt` | `Date` | Auto | Mongoose Timestamp | Modification timestamp |

* **Indexes**: `{ slug: 1 }` (unique), `{ category: 1 }`, `{ isActive: 1 }`
* **Pre-save Hook**: Auto-generates `slug` using `slugify(name)`.

---

### 5.4 Gallery Model (`Gallery`)
Project portfolio, work photos, and finished design showcase.

| Field | Type | Required | Enums / Rules | Description |
| :--- | :--- | :--- | :--- | :--- |
| `title` | `String` | Yes | Max: 150 chars, Trimmed | Project / Image title |
| `category` | `String` | Yes | Trimmed, Indexed | Category (e.g. "Living Room", "Kitchen", "Ceiling") |
| `image` | `String` | Yes | URL / Path | Image URL or uploaded path |
| `description` | `String` | No | Text | Optional caption / description |
| `isPublished` | `Boolean` | Yes | Default: `true`, Indexed | Publication flag |
| `createdAt` | `Date` | Auto | Mongoose Timestamp | Creation timestamp |
| `updatedAt` | `Date` | Auto | Mongoose Timestamp | Modification timestamp |

* **Indexes**: `{ category: 1 }`, `{ isPublished: 1 }`

---

### 5.5 Enquiry Model (`Enquiry`)
Customer inquiries, project quotes, and contact leads.

| Field | Type | Required | Enums / Rules | Description |
| :--- | :--- | :--- | :--- | :--- |
| `name` | `String` | Yes | Max: 100 chars, Trimmed | Contact person name |
| `email` | `String` | No | Valid email format, Lowercase | Optional contact email |
| `phone` | `String` | Yes | 7 to 15 digits | Primary contact phone number |
| `service` | `String` | No | Default: `'General Enquiry'` | Service interested in |
| `message` | `String` | Yes | Max: 2000 chars | Customer inquiry details |
| `status` | `String` | Yes | `['new', 'contacted', 'in-progress', 'completed', 'closed']` | Lead status (Default: `'new'`) |
| `userId` | `ObjectId`| No | Ref: `'User'`, Indexed | Linked registered user ID (if logged in) |
| `createdAt` | `Date` | Auto | Mongoose Timestamp | Submission timestamp |
| `updatedAt` | `Date` | Auto | Mongoose Timestamp | Last updated timestamp |

* **Indexes**: `{ status: 1 }`, `{ userId: 1 }`, `{ createdAt: -1 }`

---

### 5.6 Testimonial Model (`Testimonial`)
Client feedback, ratings, and reviews.

| Field | Type | Required | Enums / Rules | Description |
| :--- | :--- | :--- | :--- | :--- |
| `customerName`| `String` | Yes | Max: 100 chars, Trimmed | Client name |
| `location` | `String` | No | Default: `'Gorakhpur'` | Client location/city |
| `rating` | `Number` | Yes | Min: 1, Max: 5, Integer | Star rating out of 5 |
| `message` | `String` | Yes | Max: 1000 chars | Review text |
| `isPublished` | `Boolean` | Yes | Default: `true`, Indexed | Visibility status |
| `createdAt` | `Date` | Auto | Mongoose Timestamp | Creation timestamp |
| `updatedAt` | `Date` | Auto | Mongoose Timestamp | Modification timestamp |

* **Indexes**: `{ isPublished: 1 }`, `{ rating: -1 }`

---

### 5.7 Setting Model (`Setting`)
Central store for business details, contact information, and editable homepage CMS content.

> **CRITICAL**: The business details strictly adhere to confirmed values:
> * **Business Name**: `PREM A TO Z INTERIOR DESIGN`
> * **Phone**: `9454107810`
> * **WhatsApp**: `7458905073`, `9454107810`
> * **Address**: `BAHARAMPUR URF PIPRAPUR, GORAKHPUR`
> * **Email**: `""` *(Not provided — never invented)*
> * **Instagram**: `""` *(Not provided — never invented)*

| Field | Type | Description |
| :--- | :--- | :--- |
| `businessName` | `String` | Business brand name (`PREM A TO Z INTERIOR DESIGN`) |
| `phones` | `[String]` | Official contact numbers (`["9454107810"]`) |
| `whatsAppNumbers` | `[String]` | Official WhatsApp contact numbers (`["7458905073", "9454107810"]`) |
| `address` | `String` | Workshop and office address in Gorakhpur |
| `email` | `String` | Official email address (empty string if unprovided) |
| `instagram` | `String` | Official Instagram handle/URL (empty string if unprovided) |
| `homepage` | `Object` | Configurable hero title, subtitle, CTA text, CTA link, and about text |
| `workingHours` | `String` | Business operating schedule |

---

## 6. Authentication

Authentication is completely stateless via **JSON Web Tokens (JWT)**.

* When a user registers or logs in, the server returns a signed JWT token in `data.token`.
* Subsequent authenticated requests must provide this token in the `Authorization` header using the standard Bearer scheme:
  ```http
  Authorization: Bearer <token>
  ```
* The token contains payload `{ id: "<user_id>", role: "<user_role>" }` and is signed using `JWT_SECRET` with an expiry of `7d` (configurable via `JWT_EXPIRES_IN`).

### Supported Login Identifiers
Users can log in with:
1. `email` (e.g. `admin@premAtoZ.com`)
2. `mobile` (e.g. `9454107810`)
3. Generic `identifier` field accepting either email or mobile.

---

## 7. Roles & Permissions Matrix

| Resource & Action | Public | Authenticated Customer | Admin |
| :--- | :---: | :---: | :---: |
| **Health Check** (`GET /api/health`) | ✅ | ✅ | ✅ |
| **Register** (`POST /api/auth/register`) | ✅ | ✅ | ✅ |
| **Login** (`POST /api/auth/login`) | ✅ | ✅ | ✅ |
| **Get Own Profile** (`GET /api/auth/me`) | ❌ | ✅ | ✅ |
| **Update Own Profile** (`PATCH /api/users/:id`) | ❌ | ✅ *(Self only)* | ✅ *(Any user)* |
| **View All Users** (`GET /api/users`) | ❌ | ❌ | ✅ |
| **Delete User** (`DELETE /api/users/:id`) | ❌ | ❌ | ✅ *(Excludes self)* |
| **View Services** (`GET /api/services`, `/:id`) | ✅ | ✅ | ✅ |
| **Create / Update / Delete Services** | ❌ | ❌ | ✅ |
| **View Products** (`GET /api/products`, `/:id`) | ✅ | ✅ | ✅ |
| **Create / Update / Delete Products** | ❌ | ❌ | ✅ |
| **View Gallery** (`GET /api/gallery`, `/:id`) | ✅ | ✅ | ✅ |
| **Create / Update / Delete Gallery** | ❌ | ❌ | ✅ |
| **View Testimonials** (`GET /api/testimonials`) | ✅ | ✅ | ✅ |
| **Create / Update / Delete Testimonials** | ❌ | ❌ | ✅ |
| **Submit Enquiry** (`POST /api/enquiries`) | ✅ | ✅ *(Auto-linked)* | ✅ |
| **View My Enquiries** (`GET /api/enquiries/my`) | ❌ | ✅ | ✅ |
| **View All Enquiries** (`GET /api/enquiries`) | ❌ | ❌ | ✅ |
| **Update Enquiry Status / Delete** | ❌ | ❌ | ✅ |
| **View Public Settings** (`GET /api/settings/public`) | ✅ | ✅ | ✅ |
| **View Full Settings / Update Settings** | ❌ | ❌ | ✅ |
| **Admin Dashboard** (`GET /api/admin/dashboard`) | ❌ | ❌ | ✅ |
| **Upload Image** (`POST /api/uploads`) | ❌ | ❌ | ✅ |

---

## 8. Complete API Reference

All routes are mounted at `/api/...` and `/api/v1/...`.

### 8.1 Health Check

#### `GET /api/health`
* **Auth**: None (Public)
* **Purpose**: Check if API server and runtime are healthy.
* **Success Response (200)**:
  ```json
  {
    "success": true,
    "message": "API is running",
    "timestamp": "2026-09-03T17:46:42.123Z",
    "uptime": 12.34
  }
  ```

---

### 8.2 Authentication Routes (`/api/auth`)

#### `POST /api/auth/register`
* **Auth**: None (Public)
* **Rate Limit**: Stricter auth rate limiter (20 requests / 15 min)
* **Request Body**:
  ```json
  {
    "name": "Anita Sharma",
    "email": "anita@example.com",
    "mobile": "9876543211",
    "password": "Password@123",
    "confirmPassword": "Password@123"
  }
  ```
* **Success Response (201)**:
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": {
      "user": {
        "_id": "67c5cf79a32431001234abcd",
        "name": "Anita Sharma",
        "email": "anita@example.com",
        "mobile": "9876543211",
        "role": "customer",
        "isActive": true,
        "createdAt": "2026-09-03T17:46:42.000Z",
        "updatedAt": "2026-09-03T17:46:42.000Z"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```
* **Error Responses**:
  * `400 BAD_REQUEST / VALIDATION_ERROR`: Missing/invalid fields or passwords do not match.
  * `409 EMAIL_ALREADY_EXISTS`: An account with this email already exists.
  * `409 MOBILE_ALREADY_EXISTS`: An account with this mobile number already exists.

---

#### `POST /api/auth/login`
* **Auth**: None (Public)
* **Rate Limit**: Stricter auth rate limiter
* **Request Body (using email OR mobile OR identifier)**:
  ```json
  {
    "email": "admin@premAtoZ.com",
    "password": "AdminPassword@123"
  }
  ```
  *OR*
  ```json
  {
    "mobile": "9454107810",
    "password": "AdminPassword@123"
  }
  ```
* **Success Response (200)**:
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "user": {
        "_id": "67c5cf79a324310012341111",
        "name": "Prem Admin",
        "email": "admin@prematoz.com",
        "mobile": "9454107810",
        "role": "admin",
        "isActive": true
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```
* **Error Responses**:
  * `401 INVALID_CREDENTIALS`: Email/mobile or password incorrect.
  * `403 ACCOUNT_DEACTIVATED`: Account has been deactivated.

---

#### `GET /api/auth/me`
* **Auth**: Required (`customer` or `admin`)
* **Headers**: `Authorization: Bearer <token>`
* **Success Response (200)**:
  ```json
  {
    "success": true,
    "message": "Current user profile fetched successfully",
    "data": {
      "user": {
        "_id": "67c5cf79a324310012341111",
        "name": "Prem Admin",
        "email": "admin@prematoz.com",
        "mobile": "9454107810",
        "role": "admin",
        "isActive": true
      }
    }
  }
  ```
* **Error Responses**: `401 AUTHENTICATION_REQUIRED / INVALID_TOKEN / TOKEN_EXPIRED`.

---

#### `POST /api/auth/logout`
* **Auth**: Public / Authenticated
* **Purpose**: Log out client session (client clears local token).
* **Success Response (200)**:
  ```json
  {
    "success": true,
    "message": "Logged out successfully",
    "data": null
  }
  ```

---

### 8.3 User Routes (`/api/users`)

#### `GET /api/users`
* **Auth**: Required (`admin`)
* **Query Parameters**:
  * `page` (number, default: 1)
  * `limit` (number, default: 10)
  * `search` (string, searches name, email, mobile)
  * `role` (string, e.g. `customer`, `admin`)
  * `isActive` (boolean: `true`/`false`)
* **Success Response (200)**:
  ```json
  {
    "success": true,
    "message": "Users fetched successfully",
    "data": [
      {
        "_id": "67c5cf79a324310012341111",
        "name": "Prem Admin",
        "email": "admin@prematoz.com",
        "mobile": "9454107810",
        "role": "admin",
        "isActive": true
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "totalPages": 1
    }
  }
  ```

---

#### `GET /api/users/:id`
* **Auth**: Required (`admin` or Self)
* **Parameters**: `id` (MongoDB ObjectId)
* **Success Response (200)**: Returns user object.

---

#### `PATCH /api/users/:id`
* **Auth**: Required (`admin` or Self)
* **Request Body**:
  ```json
  {
    "name": "Updated Name",
    "mobile": "9876543299"
  }
  ```
  *(Admin can also send `"role": "admin"` or `"isActive": false`)*.
* **Success Response (200)**: Returns updated user.

---

#### `DELETE /api/users/:id`
* **Auth**: Required (`admin`)
* **Note**: Admins cannot delete their own account (`CANNOT_DELETE_SELF`).
* **Success Response (200)**:
  ```json
  {
    "success": true,
    "message": "User deleted successfully",
    "data": null
  }
  ```

---

### 8.4 Service Routes (`/api/services`)

#### `GET /api/services`
* **Auth**: None (Public)
* **Query Parameters**:
  * `page` (default: 1)
  * `limit` (default: 50)
  * `search` (searches title, description)
  * `isActive` (default: true for public, customizable by admin)
* **Success Response (200)**:
  ```json
  {
    "success": true,
    "message": "Services fetched successfully",
    "data": [
      {
        "_id": "67c5cf79a324310012340001",
        "title": "Doors",
        "slug": "doors",
        "description": "Custom luxury wooden and flush doors...",
        "shortDescription": "Custom wooden, flush, and decorative doors.",
        "image": "/uploads/sample-doors.jpg",
        "features": ["Solid teak & flush wood options", "Premium veneer & laminate finishes"],
        "isActive": true
      }
    ],
    "pagination": { "page": 1, "limit": 50, "total": 5, "totalPages": 1 }
  }
  ```

---

#### `GET /api/services/:id`
* **Auth**: None (Public)
* **Parameters**: `id` (Accepts either MongoDB ObjectId **or** string slug, e.g. `doors` or `kitchen`)
* **Success Response (200)**:
  ```json
  {
    "success": true,
    "message": "Service details fetched successfully",
    "data": {
      "service": {
        "_id": "67c5cf79a324310012340001",
        "title": "Doors",
        "slug": "doors",
        "description": "Custom luxury wooden and flush doors...",
        "features": ["..."]
      }
    }
  }
  ```

---

#### `POST /api/services`
* **Auth**: Required (`admin`)
* **Request Body**:
  ```json
  {
    "title": "Glass Partition Work",
    "description": "Modern acoustic glass partition systems.",
    "shortDescription": "Frameless and acoustic glass partitions.",
    "image": "/uploads/sample.jpg",
    "features": ["Toughened glass", "Sound dampening"],
    "isActive": true
  }
  ```
* **Success Response (201)**: Returns created service with auto-generated slug `glass-partition-work`.

---

#### `PATCH /api/services/:id`
* **Auth**: Required (`admin`)
* **Parameters**: `id` (ObjectId or slug)
* **Request Body**: Any editable fields (`title`, `description`, `shortDescription`, `image`, `features`, `isActive`).
* **Success Response (200)**: Returns updated service.

---

#### `DELETE /api/services/:id`
* **Auth**: Required (`admin`)
* **Parameters**: `id` (ObjectId or slug)
* **Success Response (200)**: Returns `{ success: true, message: "Service deleted successfully", data: null }`.

---

### 8.5 Product Routes (`/api/products`)

#### `GET /api/products`
* **Auth**: None (Public)
* **Query Parameters**:
  * `page` (number, default: 1)
  * `limit` (number, default: 12)
  * `category` (string, case-insensitive filter, e.g. `Kitchen` or `Doors`)
  * `search` (string, searches name, description, category)
* **Success Response (200)**:
  ```json
  {
    "success": true,
    "message": "Products fetched successfully",
    "data": [
      {
        "_id": "67c5cf79a324310012340101",
        "name": "L-Shaped Acrylic Modular Kitchen",
        "slug": "l-shaped-acrylic-modular-kitchen",
        "category": "Kitchen",
        "description": "High-gloss modular kitchen with quartz counter.",
        "images": ["/uploads/sample-kitchen-1.jpg"],
        "features": ["Hettich soft-close channels"],
        "isActive": true
      }
    ],
    "pagination": { "page": 1, "limit": 12, "total": 4, "totalPages": 1 }
  }
  ```

---

#### `GET /api/products/:id`
* **Auth**: None (Public)
* **Parameters**: `id` (MongoDB ObjectId or slug)
* **Success Response (200)**: Returns single product details.

---

#### `POST /api/products`
* **Auth**: Required (`admin`)
* **Request Body**:
  ```json
  {
    "name": "Veneer Flush Door",
    "category": "Doors",
    "description": "Natural Burma teak veneer on high-density core.",
    "images": ["/uploads/sample.jpg"],
    "features": ["35mm thickness", "Weatherproof polish"],
    "isActive": true
  }
  ```
* **Success Response (201)**: Returns created product.

---

#### `PATCH /api/products/:id`
* **Auth**: Required (`admin`)
* **Parameters**: `id` (ObjectId or slug)
* **Success Response (200)**: Returns updated product.

---

#### `DELETE /api/products/:id`
* **Auth**: Required (`admin`)
* **Parameters**: `id` (ObjectId or slug)
* **Success Response (200)**: Returns deletion confirmation.

---

### 8.6 Gallery Routes (`/api/gallery`)

#### `GET /api/gallery`
* **Auth**: None (Public)
* **Query Parameters**: `page`, `limit`, `category`, `search`
* **Success Response (200)**:
  ```json
  {
    "success": true,
    "message": "Gallery items fetched successfully",
    "data": [
      {
        "_id": "67c5cf79a324310012340201",
        "title": "Luxury Living Room Interior",
        "category": "Living Room",
        "image": "/uploads/sample-gallery-1.jpg",
        "description": "Italian marble flooring and custom TV unit in Gorakhpur.",
        "isPublished": true
      }
    ],
    "pagination": { "page": 1, "limit": 16, "total": 4, "totalPages": 1 }
  }
  ```

---

#### `GET /api/gallery/:id`
* **Auth**: None (Public)
* **Success Response (200)**: Returns single gallery item.

---

#### `POST /api/gallery`
* **Auth**: Required (`admin`)
* **Request Body**:
  ```json
  {
    "title": "Contemporary Dining Ceiling",
    "category": "Ceiling",
    "image": "/uploads/dining-ceiling.jpg",
    "description": "POP ceiling with embedded chandeliers."
  }
  ```
* **Success Response (201)**: Returns created gallery item.

---

#### `PATCH /api/gallery/:id`
* **Auth**: Required (`admin`)
* **Success Response (200)**: Returns updated gallery item.

---

#### `DELETE /api/gallery/:id`
* **Auth**: Required (`admin`)
* **Success Response (200)**: Returns deletion confirmation.

---

### 8.7 Testimonial Routes (`/api/testimonials`)

#### `GET /api/testimonials`
* **Auth**: None (Public)
* **Query Parameters**: `page`, `limit`
* **Success Response (200)**:
  ```json
  {
    "success": true,
    "message": "Testimonials fetched successfully",
    "data": [
      {
        "_id": "67c5cf79a324310012340301",
        "customerName": "Sunil Verma",
        "location": "Gorakhpur",
        "rating": 5,
        "message": "Prem A to Z transformed our newly built home completely...",
        "isPublished": true
      }
    ],
    "pagination": { "page": 1, "limit": 20, "total": 3, "totalPages": 1 }
  }
  ```

---

#### `GET /api/testimonials/:id`
* **Auth**: None (Public)
* **Success Response (200)**: Returns single testimonial.

---

#### `POST /api/testimonials`
* **Auth**: Required (`admin`)
* **Request Body**:
  ```json
  {
    "customerName": "Alok Mishra",
    "location": "Gorakhpur",
    "rating": 5,
    "message": "Flawless modular kitchen installation!",
    "isPublished": true
  }
  ```
* **Success Response (201)**: Returns created testimonial.

---

#### `PATCH /api/testimonials/:id`
* **Auth**: Required (`admin`)
* **Success Response (200)**: Returns updated testimonial.

---

#### `DELETE /api/testimonials/:id`
* **Auth**: Required (`admin`)
* **Success Response (200)**: Returns deletion confirmation.

---

### 8.8 Enquiry Routes (`/api/enquiries`)

#### `POST /api/enquiries`
* **Auth**: Public (Optional Auth: if `Bearer <token>` is present, automatically records `userId`)
* **Request Body**:
  ```json
  {
    "name": "Amit Gupta",
    "phone": "9876501234",
    "email": "amit@example.com",
    "service": "Kitchen",
    "message": "Looking for modern modular kitchen estimate for our new apartment in Gorakhpur."
  }
  ```
* **Success Response (201)**:
  ```json
  {
    "success": true,
    "message": "Enquiry submitted successfully. Our team will contact you shortly.",
    "data": {
      "enquiry": {
        "_id": "67c5cf79a324310012340401",
        "name": "Amit Gupta",
        "phone": "9876501234",
        "email": "amit@example.com",
        "service": "Kitchen",
        "message": "Looking for modern modular kitchen estimate...",
        "status": "new",
        "userId": null,
        "createdAt": "2026-09-03T17:46:42.000Z"
      }
    }
  }
  ```

---

#### `GET /api/enquiries/my`
* **Auth**: Required (`customer` or `admin`)
* **Headers**: `Authorization: Bearer <token>`
* **Purpose**: Returns enquiries submitted by the logged-in user (matched by `userId` or user's registered phone/email).
* **Success Response (200)**: Returns array of enquiries with pagination.

---

#### `GET /api/enquiries`
* **Auth**: Required (`admin`)
* **Query Parameters**:
  * `page` (default: 1)
  * `limit` (default: 10)
  * `status` (filter by: `new`, `contacted`, `in-progress`, `completed`, `closed`)
  * `search` (searches name, email, phone, service, message)
* **Success Response (200)**:
  ```json
  {
    "success": true,
    "message": "Enquiries fetched successfully",
    "data": [
      {
        "_id": "67c5cf79a324310012340401",
        "name": "Amit Gupta",
        "phone": "9876501234",
        "service": "Kitchen",
        "status": "new",
        "userId": null
      }
    ],
    "pagination": { "page": 1, "limit": 10, "total": 1, "totalPages": 1 }
  }
  ```

---

#### `GET /api/enquiries/:id`
* **Auth**: Required (`admin`)
* **Success Response (200)**: Returns populated enquiry.

---

#### `PATCH /api/enquiries/:id`
* **Auth**: Required (`admin`)
* **Request Body**:
  ```json
  {
    "status": "in-progress"
  }
  ```
  *(Allowed statuses: `new`, `contacted`, `in-progress`, `completed`, `closed`)*.
* **Success Response (200)**: Returns updated enquiry.

---

#### `DELETE /api/enquiries/:id`
* **Auth**: Required (`admin`)
* **Success Response (200)**: Returns deletion confirmation.

---

### 8.9 Site Settings & Business Information (`/api/settings`)

#### `GET /api/settings/public`
* **Auth**: None (Public)
* **Purpose**: Provides business contact numbers, Gorakhpur address, and homepage hero/about content.
* **Success Response (200)**:
  ```json
  {
    "success": true,
    "message": "Site settings fetched successfully",
    "data": {
      "businessName": "PREM A TO Z INTERIOR DESIGN",
      "phones": ["9454107810"],
      "whatsAppNumbers": ["7458905073", "9454107810"],
      "address": "BAHARAMPUR URF PIPRAPUR, GORAKHPUR",
      "email": "",
      "instagram": "",
      "homepage": {
        "heroTitle": "Transform Your Space with Prem A to Z Interior Design",
        "heroSubtitle": "Expert Doors, Modular Kitchens, POP & False Ceilings, Electrical and Complete Furniture Work",
        "ctaText": "Book a Free Consultation",
        "ctaLink": "#contact",
        "aboutText": "PREM A TO Z INTERIOR DESIGN brings your dream spaces to life with expert craftsmanship, premium materials, and tailored turnkey interior solutions in Gorakhpur."
      },
      "workingHours": "Monday - Saturday: 9:00 AM - 8:00 PM"
    }
  }
  ```

---

#### `GET /api/settings`
* **Auth**: Required (`admin`)
* **Success Response (200)**: Returns full site settings document.

---

#### `PATCH /api/settings`
* **Auth**: Required (`admin`)
* **Request Body**: Any updated fields (`businessName`, `phones`, `whatsAppNumbers`, `address`, `email`, `instagram`, `homepage`, `workingHours`).
* **Success Response (200)**: Returns updated settings.

---

### 8.10 Admin Dashboard (`/api/admin`)

#### `GET /api/admin/dashboard`
* **Auth**: Required (`admin`)
* **Purpose**: Overview counts and triage metrics for admin backoffice.
* **Success Response (200)**:
  ```json
  {
    "success": true,
    "message": "Admin dashboard statistics fetched successfully",
    "data": {
      "totalUsers": 2,
      "totalServices": 5,
      "totalProducts": 4,
      "totalGalleryItems": 4,
      "totalTestimonials": 3,
      "totalEnquiries": 2,
      "newEnquiries": 1,
      "recentEnquiries": [
        {
          "_id": "67c5cf79a324310012340401",
          "name": "Amit Gupta",
          "phone": "9876501234",
          "service": "Kitchen",
          "status": "new",
          "createdAt": "2026-09-03T17:46:42.000Z"
        }
      ]
    }
  }
  ```

---

### 8.11 Image Uploads (`/api/uploads`)

#### `POST /api/uploads`
* **Auth**: Required (`admin`)
* **Content-Type**: `multipart/form-data`
* **Form Field**: `image` (single file: JPEG, PNG, WEBP, GIF, SVG, up to 5MB)
* **Success Response (201)**:
  ```json
  {
    "success": true,
    "message": "Image uploaded successfully",
    "data": {
      "url": "/uploads/kitchen-photo-1725381234-987654321.webp",
      "filename": "kitchen-photo-1725381234-987654321.webp",
      "originalName": "kitchen-photo.webp",
      "size": 245120,
      "mimetype": "image/webp"
    }
  }
  ```
* **Static File Access**: Files stored in `/uploads` are statically served directly at:
  `http://localhost:5000/uploads/<filename>`

---

## 9. Error Codes

When any request encounters an error, the response format is standardized:
```json
{
  "success": false,
  "message": "Human-readable explanation of error",
  "error": "MACHINE_READABLE_CODE",
  "details": []
}
```

| HTTP Status | Error Code | Description |
| :---: | :--- | :--- |
| **400** | `BAD_REQUEST` | Generic client request error |
| **400** | `VALIDATION_ERROR` | Schema validation failed (`details` array lists field issues) |
| **400** | `INVALID_ID_FORMAT` | Provided MongoDB ID format is invalid |
| **400** | `FILE_UPLOAD_ERROR` | Upload exceeds 5MB or Multer processing failed |
| **400** | `INVALID_FILE_TYPE` | Uploaded file is not an allowed image MIME type |
| **400** | `CANNOT_DELETE_SELF` | Admin attempted to delete their own account |
| **401** | `AUTHENTICATION_REQUIRED` | Missing `Authorization: Bearer <token>` header |
| **401** | `INVALID_TOKEN` | Malformed or unrecognized JWT |
| **401** | `TOKEN_EXPIRED` | JWT token lifetime has lapsed |
| **401** | `INVALID_CREDENTIALS` | Incorrect email/mobile or password |
| **403** | `FORBIDDEN` | Authenticated user lacks required role (`customer` vs `admin`) |
| **403** | `ACCOUNT_DEACTIVATED` | User account has `isActive: false` |
| **404** | `ROUTE_NOT_FOUND` | URL or HTTP verb does not exist on this server |
| **404** | `USER_NOT_FOUND` | User record not found |
| **404** | `SERVICE_NOT_FOUND` | Service matching ID or slug not found |
| **404** | `PRODUCT_NOT_FOUND` | Product matching ID or slug not found |
| **404** | `GALLERY_ITEM_NOT_FOUND` | Gallery item matching ID not found |
| **404** | `TESTIMONIAL_NOT_FOUND`| Testimonial matching ID not found |
| **404** | `ENQUIRY_NOT_FOUND` | Enquiry matching ID not found |
| **409** | `DUPLICATE_RESOURCE` | General unique index constraint violation |
| **409** | `EMAIL_ALREADY_EXISTS` | Registered email already in use |
| **409** | `MOBILE_ALREADY_EXISTS` | Registered mobile already in use |
| **409** | `SERVICE_ALREADY_EXISTS`| Service with identical title or slug exists |
| **409** | `PRODUCT_ALREADY_EXISTS`| Product with identical name or slug exists |
| **429** | `RATE_LIMIT_EXCEEDED` | Exceeded general IP request limit |
| **429** | `AUTH_RATE_LIMIT_EXCEEDED`| Exceeded authentication attempt limit (15 min cooldown) |
| **500** | `INTERNAL_SERVER_ERROR`| Unhandled server exception |

---

## 10. Validation Rules

All validation rules are enforced using `express-validator` middleware.

* **User Registration**:
  * `name`: Required, 2 to 100 characters.
  * `email`: Required, valid email format, normalized to lowercase.
  * `mobile`: Required, 10-digit Indian phone pattern (`^[6-9]\d{9}$`).
  * `password`: Required, minimum 6 characters.
  * `confirmPassword`: Required, must exactly match `password`.
* **User Login**:
  * Requires `password` plus either `email`, `mobile`, or `identifier`.
* **Services**:
  * `title`: Required, maximum 120 characters.
  * `description`: Required.
  * `shortDescription`: Optional, maximum 300 characters.
  * `features`: Optional, array of strings.
* **Products**:
  * `name`: Required, maximum 150 characters.
  * `category`: Required.
* **Gallery**:
  * `title`: Required.
  * `category`: Required.
  * `image`: Required URL or path string.
* **Enquiry**:
  * `name`: Required, 2 to 100 characters.
  * `phone`: Required, valid phone pattern (7-15 digits).
  * `message`: Required, 5 to 2000 characters.
  * `email`: Optional, validated if provided.
* **Testimonials**:
  * `customerName`: Required.
  * `rating`: Required integer from 1 to 5.
  * `message`: Required, 10 to 1000 characters.

---

## 11. Security Implementation

1. **Password Security**:
   * Hashes passwords using `bcryptjs` with salt round cost 12.
   * `select: false` on the User schema and custom `.toJSON()` transform prevent passwords from ever leaking in queries, logs, or JSON payloads.
2. **HTTP Headers (Helmet)**:
   * Enforces security headers (DNS Prefetch Control, Frameguard, Hide Powered-By, HSTS, IE No Open, No Sniff, Permitted Cross-Domain Policies, Referrer Policy, and XSS Filter).
3. **CORS Policy**:
   * Dynamically evaluates incoming origin against configured `CLIENT_URL` whitelist.
   * Configured for `credentials: true` and supports standard REST methods.
4. **Rate Limiting**:
   * General API rate limiter protects server from rapid automated request storms.
   * Specific auth rate limiter mitigates brute-force credential stuffing.
5. **No Hard-coded Secrets**:
   * All sensitive keys are loaded exclusively through environment variables.
6. **Graceful Shutdown**:
   * Intercepts `SIGTERM` and `SIGINT` signals to flush open database transactions and close active connections smoothly.

---

## 12. Seed Data & Development Credentials

A seeding utility is provided at [`src/seeds/seed.js`](file:///c:/Project/Prem%20A%20to%20Z/Backend/src/seeds/seed.js).

### Running the Seed Script
```bash
npm run seed
```

### Seeded Development Credentials

> **SECURITY NOTICE**: The credentials below are intended strictly for local development and integration testing. Production deployments must use unique, securely generated credentials.

#### 1. Administrator Account
* **Role**: `admin`
* **Email**: `admin@premAtoZ.com`
* **Mobile**: `9454107810`
* **Password**: `AdminPassword@123`
* **Privileges**: Full access to dashboard, users, services, products, gallery, testimonials, enquiries, settings, and image uploads.

#### 2. Sample Customer Account
* **Role**: `customer`
* **Email**: `ramesh@example.com`
* **Mobile**: `9876543210`
* **Password**: `Customer@123`
* **Privileges**: Profile access, self-service updates, view own enquiries (`/api/enquiries/my`).

#### 3. Core Initial Services Seeded
1. **Doors** (`/services/doors`)
2. **Kitchen** (`/services/kitchen`)
3. **POP & False Ceiling** (`/services/pop-and-false-ceiling`)
4. **Electrical Work** (`/services/electrical-work`)
5. **Complete Furniture Work** (`/services/complete-furniture-work`)

#### 4. Site Settings Seeded
Configured with verified business details:
* Phone: `9454107810`
* WhatsApp: `7458905073`, `9454107810`
* Address: `BAHARAMPUR URF PIPRAPUR, GORAKHPUR`
* Email & Instagram: *Empty string (not invented)*

---

## 13. Running the Backend

Inside directory `Backend/`:

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env` and configure variables if necessary:
```bash
cp .env.example .env
```

### 3. Seed the Database
```bash
npm run seed
```

### 4. Run Development Server (with hot reloading)
```bash
npm run dev
```

### 5. Run Production Server
```bash
npm start
```

### 6. Run Automated Test Suite
```bash
npm test
```

---

## 14. Frontend Integration Guide

This guide describes how the future React frontend should integrate with this backend.

### 14.1 Base URL
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

### 14.2 Axios Instance Example
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach JWT token from localStorage or session
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercept 401 Unauthorized responses to redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 14.3 Common Request Examples

#### Fetch Services for Homepage / Services Page
```javascript
import api from './api';

export const getServices = async () => {
  const response = await api.get('/services');
  return response.data.data; // Array of active services
};
```

#### Submit Customer Enquiry
```javascript
export const submitEnquiry = async (formData) => {
  // formData: { name, phone, email, service, message }
  const response = await api.post('/enquiries', formData);
  return response.data;
};
```

#### Admin Login & Save Token
```javascript
export const loginUser = async (credentials) => {
  // credentials: { email: "...", password: "..." } or { mobile: "...", password: "..." }
  const response = await api.post('/auth/login', credentials);
  const { token, user } = response.data.data;
  localStorage.setItem('token', token);
  return user;
};
```

#### Image Upload (Admin)
```javascript
export const uploadImage = async (file) => {
  const data = new FormData();
  data.append('image', file);
  const response = await api.post('/uploads', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data.data.url; // Relative URL e.g. "/uploads/my-image-123.jpg"
};
```

---

## 15. Changelog

### v1.0.0 (2026-09-03)
* **Initial Release**: Complete modular REST API architecture for Prem A to Z Interior Design.
* **Authentication**: JWT token issuance, verification, and bcrypt hashing with 12 salt rounds.
* **Role-Based Access Control**: Strict role separation between public visitors, customers, and administrators.
* **Catalog Services**: Full CRUD for Services, Products, Gallery, and Testimonials with search, category filters, and pagination.
* **Lead Capture**: Public and authenticated customer enquiry submission and tracking with status progression.
* **Exact Business Details**: Embedded exact phone numbers, WhatsApp, and Gorakhpur address in site settings without inventing missing email or Instagram channels.
* **Admin Dashboard**: Aggregated overview metrics and recent leads endpoint.
* **Security & Infrastructure**: Helmet protection, CORS policy, rate limiting, and centralized error handling.
* **Automated Seeding & Tests**: Complete seed script and 54-assertion end-to-end test suite (`npm test`).
