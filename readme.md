# User Authentication API

A RESTful API built with Node.js, Express, and MySQL for user authentication and management.

## Features

- User registration and authentication
- JWT-based authorization
- Password hashing with bcrypt
- Pagination and sorting for user lists
- Search functionality
- Response standardization
- Error handling
- Request logging

## Tech Stack

- Node.js
- Express.js
- MySQL
- Sequelize ORM
- JSON Web Tokens (JWT)
- bcrypt
- cors
- helmet

## Project Structure

## API Routes

### Authentication Routes

- `POST /register` - Register a new user
- `POST /login` - Login user and get JWT token
- `POST /forgot-password` - Request password reset link
- `POST /reset-password` - Reset password with token

### Protected User Routes (Requires JWT)

- `GET /users` - Get list of all users with pagination
- `GET /users/sorted` - Get sorted and filtered list of users
- `PUT /users` - Update user details
- `DELETE /users` - Delete a user

### Public Routes

- `GET /` - Home endpoint
