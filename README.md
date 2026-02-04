# SuperBlog - Full Stack Blog Application

A modern, full-stack blog application built with Next.js, React, TypeScript, and PostgreSQL. Create, edit, and publish blog posts with a Shadcn UI and secure authentication system.

## 🚀 Features

- [ ] User Auth
  - [x] Register
  - [x] Login
  - [x] GetMe (get information about current user)
  - [x] Logout
- [x] Blog Management
- [x] Dashboard
- [ ] Minor styling changes in Main page
- [ ] Change sidebar content to be relative
- [ ] Logout flow implementation (so user be able to logout)

## 🛠️ Tech Stack

### Frontend

- **Next.js 16**: React framework with App Router
- **React 19**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS 4**: Utility-first CSS framework
- **Shadcn UI**: Unstyled accessible components
- **React Hook Form**: Form state management
- **Yup**: Schema validation

### Backend

- **Next.js API Routes and Server Actions**: Serverless backend
- **Prisma**: ORM for database management
- **PostgreSQL**: Relational database
- **JWT**: Authentication tokens
- **Bcrypt**: Password hashing

### Development Tools

- **pnpm**: Package manager
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Husky**: Git hooks
- **lint-staged**: Run linters on staged files
- **TypeScript ESLint**: TypeScript linting rules

## 📋 Prerequisites

- **Node.js**: Version 18+ (uses pnpm)
- **PostgreSQL**: Database server
- **pnpm**: Package manager (yarn@4.12.0 also supported)

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/DreamWorld420/nextjs-blog-fullstack
   cd nextjs-blog-fullstack
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/blog_db"

   # JWT
   JWT_SECRET="your-secret-key-here"

    # API endpoint
    API_ENDPOINT="your-deployed-or-local-url"
   ```

4. **Initialize the database**

   ```bash
   pnpm exec prisma migrate dev

    pnpm exec prisma generate
   ```

   This will:
   - Create the database schema
   - Run all migrations
   - Generate the Prisma client

## 🚀 Development

Start the development server:

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Database Management

- **Prisma Studio**: Explore and manage your database visually

  ```bash
  pnpm exec prisma studio
  ```

- **Create a new migration** (after modifying `schema.prisma`):
  ```bash
  pnpm exec prisma migrate dev --name <migration-name>
  ```

## 📦 Build & Production

Build the application:

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

## 🧹 Code Quality

- **Lint code**:

  ```bash
  pnpm lint
  ```

- **Fix linting issues**:

  ```bash
  pnpm lint:fix
  ```

- **Format code**:
  ```bash
  pnpm format
  ```

## 📚 API Endpoints

### Authentication

- `POST /api/user/register` - Create a new user account
- `POST /api/user/login` - User login
- `POST /api/user/logout` - User logout
- `GET /api/user/me` - Get current user information

### Database Schema

**User Model**

- `id` (Int, Primary Key): Unique user identifier
- `email` (String, Unique): User email address
- `name` (String, Optional): User full name
- `password` (String): Hashed password
- `posts` (Post[]): User's blog posts

**Post Model**

- `id` (Int, Primary Key): Unique post identifier
- `title` (String): Post title
- `content` (String, Optional): Post content in markdown format
- `published` (Boolean): Publication status
- `authorId` (Int, Foreign Key): Author's user ID
- `author` (User): Author relationship
- `createdAt` (DateTime): Post creation timestamp
- `updatedAt` (DateTime, Optional): Post last update timestamp

## 🔐 Authentication Flow

1. User registers with email and password
2. Password is hashed with bcrypt
3. User logs in with credentials
4. Server validates password and generates JWT token
5. JWT token is stored in secure HTTP-only cookies
6. Protected routes verify token on each request

## 🌐 Environment Variables

| Variable       | Description                       | Example                                             |
| -------------- | --------------------------------- | --------------------------------------------------- |
| `DATABASE_URL` | PostgreSQL connection string      | `postgresql://user:password@localhost:5432/blog_db` |
| `JWT_SECRET`   | Secret key for signing JWT tokens | Any random string                                   |
| `API_ENDPOINT` | deployed or local url             | `http://localhost:3000`                             |
