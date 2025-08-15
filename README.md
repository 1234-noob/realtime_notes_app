# Realtime Notes App

This is a realtime notes application with a frontend and backend. Follow the steps below to run the application on your local machine.

## Prerequisites

- Node.js installed on your machine (https://nodejs.org/)
- npm or yarn package manager

## Running the Backend

1. Navigate to the `backend` directory:

   ```bash
   cd backend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory and configure the required environment variables. Example:

   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:

   ```bash
   npm run dev
   ```

   The backend server will run on `http://localhost:3000` (or the port specified in your `.env` file).

## Running the Frontend

1. Navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `frontend` directory and configure the required environment variables. Example:

   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. Start the frontend development server:

   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173` (or the default Vite development server port).

## Authentication Endpoints

The authentication endpoints allow users to register and log in to the application.

### Base URL

The base URL for all authentication endpoints is `/auth`.

### Endpoints

#### 1. Register User

**URL:** `/auth/register`

**Method:** `POST`

**Description:** Registers a new user.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

- **201 Created:**

  ```json
  {
    "id": "userId",
    "email": "user@example.com"
  }
  ```

- **400 Bad Request:** Missing email or password.
- **409 Conflict:** Email already in use.
- **500 Internal Server Error:** Server error.

#### 2. Login User

**URL:** `/auth/login`

**Method:** `POST`

**Description:** Logs in an existing user.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

- **200 OK:**

  ```json
  {
    "token": "jwtToken",
    "user": {
      "id": "userId",
      "email": "user@example.com"
    }
  }
  ```

- **400 Bad Request:** Missing email or password.
- **401 Unauthorized:** Invalid credentials.
- **500 Internal Server Error:** Server error.

## Notes Endpoints

The notes endpoints allow users to create and retrieve notes.

### Base URL

The base URL for all notes endpoints is `/notes`.

### Endpoints

#### 1. Create a Note

**URL:** `/notes-add`

**Method:** `POST`

**Description:** Creates a new note for the logged-in user.

**Headers:**

```json
{
  "Authorization": "Bearer <your_jwt_token>"
}
```

**Request Body:**

```json
{
  "title": "Note Title",
  "content": "Note Content"
}
```

**Response:**

- **201 Created:**

  ```json
  {
    "_id": "noteId",
    "user": "userId",
    "title": "Note Title",
    "content": "Note Content",
    "createdAt": "2025-08-15T12:00:00Z",
    "updatedAt": "2025-08-15T12:00:00Z"
  }
  ```

- **400 Bad Request:** Missing title or content.
- **401 Unauthorized:** No token provided or invalid token.
- **500 Internal Server Error:** Server error.

#### 2. Get All Notes

**URL:** `/notes`

**Method:** `GET`

**Description:** Retrieves all notes for the logged-in user.

**Headers:**

```json
{
  "Authorization": "Bearer <your_jwt_token>"
}
```

**Response:**

- **200 OK:**

  ```json
  [
    {
      "_id": "noteId",
      "user": "userId",
      "title": "Note Title",
      "content": "Note Content",
      "createdAt": "2025-08-15T12:00:00Z",
      "updatedAt": "2025-08-15T12:00:00Z"
    }
  ]
  ```

- **401 Unauthorized:** No token provided or invalid token.
- **500 Internal Server Error:** Server error.

## Technologies Used

### Backend

- **Node.js**: JavaScript runtime for building the backend server.
- **Express.js**: Web framework for creating RESTful APIs.
- **MongoDB**: NoSQL database for storing user and notes data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **bcryptjs**: Library for hashing passwords securely.
- **jsonwebtoken**: Library for generating and verifying JWT tokens.
- **Socket.IO**: Real-time communication between the server and clients.

### Frontend

- **React.js**: JavaScript library for building user interfaces.
- **Vite**: Build tool for fast development and bundling.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: HTTP client for making API requests.
- **Socket.IO Client**: Real-time communication with the backend server.

## Notes

- Ensure the backend is running before starting the frontend to avoid API connection issues.
- Replace placeholder values in the `.env` files with your actual configuration.
