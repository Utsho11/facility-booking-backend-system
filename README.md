
# Sport Facility Booking System Server

It's a backend based sport facility provider server which is connected to mongodb database. We can create user,create facilities and booking slot, update our data through this server.

## Project Name:

Sport Facility Booking System

## Live URL:

- [Sport Facility Booking API](https://sport-facility-booking-backend-server.vercel.app/)

## Features:

- **Login/ Signup.**

- **Create User.** (admin/user)

- **Authentication System.**

- **Authorization System.**

- **Create Facilities.** (only admin)

- **Delete Facility.** (only admin)

- **Update Facility.** (only admin)

- **Create Booking.** (only user)

- **Delete Booking.** (only user)

- **Check Availability of free slots.**


## Technology Used

- **bcrypt**: A library to help hash passwords, ensuring secure storage of user passwords in databases.

- **cookie-parser**: Middleware for handling cookies in Express.js applications, allowing easy parsing and manipulation of cookies.

- **cors**: Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express.js, allowing your server to accept requests from different origins.

- **dotenv**: A module that loads environment variables from a `.env` file into `process.env`, facilitating the configuration of environment-specific variables.

- **express**: A fast, unopinionated, minimalist web framework for Node.js, used for building web applications and APIs.

- **http-status**: A utility to interact with HTTP status codes, providing constants and descriptions for standard HTTP status codes.

- **jsonwebtoken**: A library to create, sign, and verify JSON Web Tokens (JWTs), commonly used for authentication in web applications.

- **mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js, providing a schema-based solution to model your application data.

- **ts-node-dev**: A development tool that combines `ts-node` with `nodemon`, enabling automatic restarts and TypeScript compilation for faster development cycles.

- **typescript**: A strongly typed programming language that builds on JavaScript, adding static type definitions to help catch errors early in the development process.

- **zod**: A TypeScript-first schema declaration and validation library, used to validate data and ensure type safety.

- **MongoDB**: NoSQL database.

## Installation

To set up the project locally, follow these steps:

**1. Clone the repository**:

```bash
    git clone https://github.com/Utsho11/facility-booking-backend-system.git
```

**2. Go to the project directory:**

Please change my-project with the main directory here. 

```bash
    cd my-project
```
 

**3. Install dependencies**:

Open your terminal and run these commands to set npm.

```bash
    1. npm init -y
    
    2. npm install
```

**4. Set up environment variables**:

Create a `.env` file in the root of the project and add the following variables:

`NODE_ENV`

`PORT`

`DATABASE_URL`

`BCRYPT_SALT_ROUNDS`

`DEFAULT_PASS`

`JWT_ACCESS_SECRET`

`JWT_REFRESH_SECRET`

`JWT_ACCESS_EXPIRES_IN`

`JWT_REFRESH_EXPIRES_IN`


**5. Run the application**:

```bash
    npm run start:dev
```
