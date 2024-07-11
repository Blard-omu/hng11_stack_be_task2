# User-Organisation App

## Overview

The **User-Organisation App** is a backend API application that allows users to register, login, and manage organisations. Each user can belong to multiple organisations, and each organisation can have multiple users. Upon registration, a default organisation is created for the user. The app provides endpoints for creating, retrieving, and managing organisations and users within them.

## Key Features

1. **User Authentication:**
   - Register a new user.
   - Login an existing user.
   - Authentication using JWT tokens.

2. **Organisation Management:**
   - Create organisations.
   - Retrieve a single organisation by ID.
   - Retrieve all organisations a user belongs to.
   - Add users to an organisation.
   
3. **Protected Routes:**
   - Ensure routes are protected and only accessible to authenticated users.
   - Ensure users can only manage organisations they created or belong to.

## Setup Instructions

1. Clone the repository.

2. Folder structure

```
hng_task02/
├── src/
│   ├── controllers/
│   │   ├── auth.js
│   │   └── organisation.js
│   ├── models/
│   │   ├── user.js
│   │   └── organisation.js
│   ├── helpers/
│   │   ├── auth.js
│   │   └── db.config.js
│   ├── middlewares/
│   │   └── auth.js
│   ├── models/
│   │   ├── organisation.js
│   │   └── user.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── organisation.js
│   └── index.js
├── .env
├── package.json
├── README.md
├── initialSetup.js
└── tests/
    ├── auth.spec.js
    └── organisation.spec.js

```

2. Install dependencies using `npm install`.
3. Create a `.env` file with the following environment variables:
   ```env
   PORT=8000
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   ```
4. Run the application using `npm start`.

## Endpoints

### User Authentication

#### Register a New User
- **Endpoint:** `[POST] /api/auth/register`
- **Request Body:**
  ```json
  {
    "firstName": "Didi",
    "lastName": "Roy",
    "email": "didi@email.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Registration successful",
    "data": {
      "accessToken": "jwt_token",
      "user": {
        "userId": "user_id",
        "firstName": "Didi",
        "lastName": "Roy",
        "email": "didi@email.com",
        "phone": "1234567890"
      }
    }
  }
  ```

#### Login a User
- **Endpoint:** `[POST] /api/auth/login`
- **Request Body:**
  ```json
  {
    "email": "didi@email.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Login successful",
    "data": {
      "accessToken": "jwt_token",
      "user": {
        "userId": "user_id",
        "firstName": "Didi",
        "lastName": "Roy",
        "email": "didie@email.com",
        "phone": "1234567890"
      }
    }
  }
  ```

### Organisation Management

#### Create an Organisation
- **Endpoint:** `[POST] /api/organisations`
- **Request Body:**
  ```json
  {
    "name": "John's Organisation",
    "description": "This is John's default organisation."
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Organisation created successfully",
    "data": {
      "orgId": "org_id",
      "name": "John's Organisation",
      "description": "This is John's default organisation."
    }
  }
  ```

#### Get a Single Organisation by ID
- **Endpoint:** `[GET] /api/organisations/:orgId`
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Organisation fetched successfully",
    "data": {
      "orgId": "org_id",
      "name": "John's Organisation",
      "description": "This is John's default organisation."
    }
  }
  ```

#### Get All Organisations for a User
- **Endpoint:** `[GET] /api/organisations`
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Organisations fetched successfully",
    "data": {
      "organisations": [
        {
          "orgId": "org_id_1",
          "name": "John's Organisation",
          "description": "This is John's default organisation."
        },
        {
          "orgId": "org_id_2",
          "name": "Another Organisation",
          "description": "This is another organisation."
        }
      ]
    }
  }
  ```

#### Add a User to an Organisation
- **Endpoint:** `[POST] /api/organisations/:orgId/users`
- **Request Body:**
  ```json
  {
    "userId": "new_user_id"
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "message": "User added to organisation successfully"
  }
  ```

## Database Configuration

### PostgreSQL Connection

Ensure you have PostgreSQL set up and running. Use the provided `db.config.js` file to configure the database connection.

```javascript
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const connectDb = async () => {
  try {
    await pool.connect();
    console.log("DB Connected successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

connectDb();

export default pool;
```

## Running the Application

Use the following command to start the application:

```bash
npm start
```

The application should now be running on the specified port, and you can start interacting with the API endpoints.

---