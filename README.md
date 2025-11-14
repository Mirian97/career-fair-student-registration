# 🎓 Career Fair — Student Registration

A complete fullstack system for managing students, schools, and users during career fair events.

## 📌 About the Project

The **Career Fair Student Registration** is a **Fullstack application** composed of:

- **Backend (server/)** — A REST API built with **NestJS**, using **JWT authentication**, **role-based access control**, **PostgreSQL with TypeORM**, and **data validation** with `class-validator`.
- **Frontend (web/)** — _(under development)_ — Interface for registering and viewing students, schools, and system users.

The goal is to provide an organized platform for career fair organizers to **register schools**, **enroll students**, **manage system users**, and enforce **secure role-based permissions**.

## 🚀 Tech Stack

### **Backend**

- NestJS
- TypeORM
- PostgreSQL
- JWT Authentication
- Passport
- Bcrypt
- Class-validator
- Docker + Docker Compose

### **Frontend**

- _(coming soon)_ — likely React or Next.js

## 🔐 Authentication and Authorization

The backend includes:

### ✔ JWT Authentication

Users receive a token upon login:

```ts
@Post('login')
@Public()
login(@Body() loginDto: LoginDto)
```

### ✔ Role-based Authorization

```ts
@Roles(Role.Admin)
@Get()
findAll()
```

### ✔ Global Guards

```ts
{
  provide: APP_GUARD,
  useClass: AuthGuard,
},
{
  provide: APP_GUARD,
  useClass: RolesGuard,
},
```

## 👥 Access Roles

Defined in the `Role` enum:

```ts
export enum Role {
  Admin = "admin",
  Reviewer = "reviewer",
  Registrar = "registrar",
}
```

- **Admin** — Full system access
- **Registrar** — Can register students
- **Reviewer** — Read-only operations

## 🧑‍🎓 Students Module

Students are associated with a school:

```ts
@ManyToOne(() => School, (school) => school.students, { eager: true })
school: School;
```

Custom CPF validation:

```ts
@IsCPF({ message: 'Invalid CPF' })
cpf: string;
```

## 🏫 Schools Module

Full CRUD with validation:

```ts
@Post()
create(@Body() dto: CreateSchoolDto)
```

## 👤 Users Module

✔ Create users
✔ Update with email conflict detection
✔ Prevent a user from deleting themselves:

```ts
if (authUser.id === id) {
  throw new CannotDeleteSelfException();
}
```

## 🧱 Database

Using **PostgreSQL** with the following tables:

- `users`
- `schools`
- `students`

TypeORM configuration:

```ts
TypeOrmModule.forRoot({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  synchronize: true,
});
```

## 🐳 Running with Docker

### **1. Create a `.env` file**

```
PORT=3000

DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=admin
DB_PASSWORD=pass1234
DB_NAME=career_fair

JWT_SECRET=my-secret-key
JWT_EXPIRES_IN=7d
```

### **2. Start containers**

```bash
docker compose up --build
```

## ▶ Running Locally (without Docker)

```bash
cd server
pnpm install
pnpm run start:dev
```
