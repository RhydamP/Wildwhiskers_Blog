# 🌟 Jeeva Blogs Backend

<div align="center">

![Jeeva Blogs Logo](./Images%20examples/home.png)

**A powerful, scalable blog management API built with modern technologies**
![Admin Dashboard](./Images%20examples/admin_dash.png)
![Login](./Images%20examples/login.png)
![About Us](./Images%20examples/about.png)


</div>


## ✨ Overview

Jeeva Blogs Backend is a robust, production-ready API for managing blog content with advanced features like image uploads, JWT authentication, and efficient database operations. Built with modern TypeScript and designed for scalability.

## 🚀 Key Features

- 📝 **Complete Blog Management** - Create, read, update, and delete blog posts
- 🖼️ **Image Upload Integration** - Seamless Cloudinary integration for image storage
- 🔐 **JWT Authentication** - Secure route protection with token-based auth
- 🏗️ **Modular Architecture** - Clean, maintainable Fastify route structure
- 🗄️ **Prisma ORM** - Type-safe database operations with PostgreSQL
- 🛡️ **Type Safety** - Full TypeScript implementation
- ⚡ **High Performance** - Fastify's speed with optimized database queries
- 📊 **Error Handling** - Comprehensive error management and logging

## 🛠️ Tech Stack

<table align="center">
<tr>
<td align="center"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" width="40" height="40"/><br><b>TypeScript</b></td>
<td align="center"><img src="https://www.fastify.io/img/logos/fastify-black.svg" width="40" height="40"/><br><b>Fastify</b></td>
<td align="center"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/sqlite/sqlite-original.svg" width="40" height="40"/><br><b>SQLite</b></td>
<td align="center"><img src="https://www.prisma.io/images/favicon-32x32.png" width="40" height="40"/><br><b>Prisma</b></td>
<td align="center"><img src="https://res.cloudinary.com/cloudinary/image/upload/c_scale,w_40/v1/logo/for_white_bg/cloudinary_icon_for_white_bg.svg" width="40" height="40"/><br><b>Cloudinary</b></td>
</tr>
</table>

## 📁 Project Structure

```
backend/
├── 📂 routes/              # API route handlers
│   ├── blog.ts            # Blog-related endpoints
│   ├── auth.ts            # Authentication routes
│   └── index.ts           # Route registration
├── 📂 prisma/             # Database schema & migrations
│   ├── schema.prisma      # Prisma schema definition
│   └── migrations/        # Database migration files
├── 📂 types/              # TypeScript type definitions
│   └── fastify.d.ts       # Fastify type extensions
├── 📂 middleware/         # Custom middleware
│   └── auth.ts            # JWT authentication middleware
├── 📂 utils/              # Utility functions
│   └── cloudinary.ts      # Cloudinary configuration
├── 📂 dist/               # Compiled JavaScript output
├── 🔧 server.ts           # Main Fastify server
├── 🌍 .env                # Environment variables
├── 📋 package.json        # Dependencies & scripts
└── ⚙️ tsconfig.json       # TypeScript configuration
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- Cloudinary account

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/yourusername/jeeva-blogs-backend.git
cd jeeva-blogs-backend/backend

# Install dependencies
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/jeeva_blogs"

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# JWT Secret
JWT_SECRET="your_super_secret_jwt_key"

# Server Configuration
PORT=3000
NODE_ENV="development"
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Optional: Seed database with sample data
npx prisma db seed
```

### 4. Development Mode

```bash
# Start development server with hot reload
npm run dev

# Or using ts-node directly
npx ts-node server.ts
```

### 5. Production Build

```bash
# Build TypeScript to JavaScript
npm run build

# Start production server
npm start
```

## 📮 API Reference

<div align="center">

| Method | Endpoint | Auth Required | Description | Body Type |
|--------|----------|---------------|-------------|-----------|
| `POST` | `/api/blogs` | ✅ | Create new blog post | `multipart/form-data` |
| `GET` | `/api/blogs` | ❌ | Fetch all blog posts | - |
| `GET` | `/api/blogs/:id` | ❌ | Get blog post by ID | - |
| `PUT` | `/api/blogs/:id` | ✅ | Update blog post | `multipart/form-data` |
| `DELETE` | `/api/blogs/:id` | ✅ | Delete blog post | - |
| `POST` | `/api/auth/login` | ❌ | User authentication | `application/json` |
| `POST` | `/api/auth/register` | ❌ | User registration | `application/json` |

</div>

### 📝 Example API Usage

<details>
<summary><b>Create Blog Post</b></summary>

```bash
curl -X POST http://localhost:3000/api/blogs \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "title=My Amazing Blog Post" \
  -F "content=This is the blog content..." \
  -F "author=John Doe" \
  -F "image=@/path/to/image.jpg"
```

</details>

<details>
<summary><b>Get All Blogs</b></summary>

```bash
curl -X GET http://localhost:3000/api/blogs
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "title": "My Amazing Blog Post",
      "content": "This is the blog content...",
      "author": "John Doe",
      "imageUrl": "https://res.cloudinary.com/...",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

</details>

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Compile TypeScript to JavaScript
npm start            # Start production server

# Database
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed database with sample data

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm test             # Run test suite
```

## 🏗️ Architecture Overview

```mermaid
graph TB
    A[Client Request] --> B[Fastify Server]
    B --> C{Authentication Required?}
    C -->|Yes| D[JWT Middleware]
    C -->|No| E[Route Handler]
    D --> E
    E --> F[Prisma ORM]
    F --> G[(PostgreSQL)]
    E --> H[Cloudinary API]
    H --> I[Image Storage]
    E --> J[Response]
    J --> A
```

## 🔐 Authentication Flow

1. User registers/logs in via `/auth` endpoints
2. Server validates credentials and returns JWT token
3. Client includes token in `Authorization: Bearer <token>` header
4. Protected routes verify JWT using Fastify middleware
5. Valid tokens grant access to protected resources

## 🚀 Deployment

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables for Production

```env
NODE_ENV=production
DATABASE_URL=your_production_database_url
JWT_SECRET=your_production_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Fastify](https://fastify.io/) for the blazing-fast web framework
- [Prisma](https://prisma.io/) for the excellent ORM and database toolkit
- [Cloudinary](https://cloudinary.com/) for seamless image management
- The open-source community for inspiration and support

---

<div align="center">

**Built with ❤️ by [Rhydam](https://github.com/rhydamp)**

⭐ Star this repository if you found it helpful!

[🐛 Report Bug](https://github.com/yourusername/jeeva-blogs-backend/issues) • [✨ Request Feature](https://github.com/yourusername/jeeva-blogs-backend/issues) • [📖 Documentation](https://github.com/yourusername/jeeva-blogs-backend/wiki)

</div>