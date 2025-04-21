# Todo App Backend

A RESTful API backend for managing todo tasks built with Node.js and Express.

## Tech Stack

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database for storing todo data
- **Postman**: API testing and documentation

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Reference](#api-reference)
  - [Authentication Routes](#authentication-routes)
  - [Todo Routes](#todo-routes)
- [Error Handling](#error-handling)

## Features

- User authentication (signup and login)
- Create and retrieve todo items
- Delete todo items
- Protected routes with authentication middleware

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/todo-app.git
   cd todo-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/todo-app
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```bash
   npm start
   ```

## Configuration

The application uses environment variables for configuration. Make sure to set up your `.env` file with the appropriate values:

- `PORT`: The port on which the server will run (defaults to 5000)
- `MONGODB_URI`: Connection string for MongoDB
- `JWT_SECRET`: Secret key for JWT token generation and validation

## API Reference

### Authentication Routes

#### POST `/signup`
- **Description**: Register a new user
- **Authentication**: No
- **Request Body**:
  ```json
  {
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "user": {
      "id": "60d21b4667d0d8992e610c85",
      "username": "johndoe",
      "email": "john@example.com"
    }
  }
  ```
- **Error Response**:
  ```json
  {
    "success": false,
    "message": "User already exists"
  }
  ```

#### GET `/login`
- **Description**: Authenticate a user and receive a token
- **Authentication**: No
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Error Response**:
  ```json
  {
    "success": false,
    "message": "Invalid credentials"
  }
  ```

### Todo Routes

#### GET `/get-todos`
- **Description**: Retrieve all todos for the authenticated user
- **Authentication**: Required
- **Headers**:
  ```
  Authorization: Bearer <token>
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "todos": [
      {
        "id": "60d21b4667d0d8992e610c85",
        "title": "Complete project",
        "description": "Finish the todo app",
        "completed": false,
        "createdAt": "2023-06-22T18:30:00.000Z"
      }
    ]
  }
  ```
- **Error Response**:
  ```json
  {
    "success": false,
    "message": "Unauthorized access"
  }
  ```

#### POST `/create-todo`
- **Description**: Create a new todo
- **Authentication**: Required
- **Headers**:
  ```
  Authorization: Bearer <token>
  ```
- **Request Body**:
  ```json
  {
    "title": "Learn Node.js",
    "description": "Study Express and MongoDB integration"
  }
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Todo created successfully",
    "todo": {
      "id": "60d21b4667d0d8992e610c85",
      "title": "Learn Node.js",
      "description": "Study Express and MongoDB integration",
      "completed": false,
      "createdAt": "2023-06-22T18:30:00.000Z"
    }
  }
  ```
- **Error Response**:
  ```json
  {
    "success": false,
    "message": "Failed to create todo"
  }
  ```

#### DELETE `/delete-todo:id`
- **Description**: Delete a todo by ID
- **Authentication**: Required
- **Headers**:
  ```
  Authorization: Bearer <token>
  ```
- **URL Parameters**:
  - `id`: ID of the todo to delete
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Todo deleted successfully"
  }
  ```
- **Error Response**:
  ```json
  {
    "success": false,
    "message": "ID is required"
  }
  ```
  or
  ```json
  {
    "success": false,
    "message": "Internal Server Error"
  }
  ```

## Error Handling

The application implements error handling middleware to provide consistent error responses. Common error types include:

- Authentication errors (401)
- Validation errors (400)
- Resource not found errors (404)
- Server errors (500)

All error responses follow a standard format:
```json
{
  "success": false,
  "message": "Error message"
}
```
