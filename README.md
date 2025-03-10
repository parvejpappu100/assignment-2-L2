# **User Management API**

This is a **Node.js-based RESTful API** for user management, built using **TypeScript, Express.js, Mongoose, and Zod** for validation.

## **Features**
- **Create, update, delete, and retrieve** user information.
- **User validation** using Zod.
- **Secure password handling** with bcrypt.
- Retrieve **user orders and calculate total order prices**.
- Uses **MongoDB** for data persistence.

## **Technologies Used**

| Technology   | Description                         |
|-------------|---------------------------------|
| **Node.js** | Backend runtime                 |
| **Express.js** | Web framework                  |
| **Mongoose** | ODM for MongoDB                 |
| **Zod** | Schema validation              |
| **TypeScript** | Typed JavaScript              |
| **Bcrypt** | Password hashing               |
| **CORS** | Cross-Origin Resource Sharing |
| **Dotenv** | Environment variable management |

## **Installation**

### **Clone the repository:**
```sh
git clone <repository_url>
cd <project_directory>
```

### **Install dependencies:**
```sh
npm install
```

### **Create a `.env` file and define your environment variables.**

### **Start the development server:**
```sh
npm run start:dev
```

### **To build for production:**
```sh
npm run build
```

### **Then start the production server:**
```sh
npm run start:prod
```

## **API Endpoints**

### **User Routes**

| Method | Endpoint | Description |
|--------|-----------------------------|--------------------------------|
| **POST** | `api/users/create-user` | Create a new user |
| **GET** | `api/users/` | Get all users |
| **GET** | `api/users/:userId` | Get a single user by ID |
| **DELETE** | `api/users/:userId` | Delete a user by ID |
| **PUT** | `api/users/:userId` | Update a user by ID |
| **PUT** | `api/users/:userId/create-order` | Add an order to a user |
| **GET** | `api/users/:userId/orders` | Get a user's orders |
| **GET** | `api/users/:userId/orders/total-price` | Get total order price for a user |

## **Project Structure**
```
├── src
│   ├── controllers
│   │   └── user.controller.ts
│   ├── models
│   │   └── user.model.ts
│   ├── routes
│   │   └── user.route.ts
│   ├── services
│   │   └── user.service.ts
│   ├── validation
│   │   └── user.validation.ts
│   ├── interfaces
│   │   └── user.interface.ts
│   ├── server.ts
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## **Code Style**

### **Linting:**
```sh
npm run lint
```

### **Auto-fix lint issues:**
```sh
npm run lint:fix
```

### **Prettier formatting:**
```sh
npm run prettier