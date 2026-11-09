# Ink & Ideas

A simple blog application built with Node.js, Express, MongoDB, Mongoose, and EJS. Users can create an account, publish stories with an optional cover image, and join the conversation with comments.

## Features

- Browse published stories on the home page
- Create an account and sign in
- Publish a story with a title, body, and optional cover image
- Read individual stories and view their authors
- Comment on stories while signed in
- Responsive pages rendered with EJS and styled with Bootstrap and custom CSS

## Tech stack

- Node.js and Express 5
- MongoDB with Mongoose
- EJS templates
- Bootstrap 5 and custom CSS
- JSON Web Tokens stored in a cookie
- Multer for cover image uploads

## Prerequisites

- Node.js and npm
- MongoDB running locally, or a MongoDB connection string

The app currently connects to MongoDB at `mongodb://localhost:27017/blogify`.

## Getting started

1. Clone the repository and move into the project directory:

   ```bash
   git clone https://github.com/Alanmp1857/blog-app.git
   cd blog-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Make sure MongoDB is running locally.

4. Start the application:

   ```bash
   npm run dev
   ```

   For a regular start without the development watcher:

   ```bash
   npm start
   ```

5. Open [http://localhost:8000](http://localhost:8000).

<img width="1861" height="831" alt="image" src="https://github.com/user-attachments/assets/a25efa97-0e10-4128-a9b8-39952c055ce8" />

<img width="1812" height="826" alt="image" src="https://github.com/user-attachments/assets/e50ad880-233d-4abf-8525-65840c7aa6fb" />

<img width="1592" height="887" alt="image" src="https://github.com/user-attachments/assets/30514e91-4320-48dc-aa33-19a6bbdcf03d" />




## Main routes

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/` | Browse stories |
| `GET` | `/user/signup` | Show the sign-up form |
| `POST` | `/user/signup` | Create an account |
| `GET` | `/user/signin` | Show the sign-in form |
| `POST` | `/user/signin` | Sign in |
| `GET` | `/user/signout` | Sign out |
| `GET` | `/blog/add-new` | Show the story editor |
| `POST` | `/blog/add-new` | Publish a story |
| `GET` | `/blog/:id` | Read a story and its comments |
| `POST` | `/blog/comment/:blogId` | Add a comment |

## Project structure

```text
.
├── index.js                 # Express app, middleware, MongoDB connection, and home route
├── middlewares/
│   └── authentication.js    # Reads and validates the authentication cookie
├── models/                  # Mongoose user, blog, and comment models
├── public/
│   ├── images/              # Static images
│   ├── uploads/             # Uploaded story cover images
│   └── styles.css           # Shared application styles
├── routes/                  # User and blog routes
├── services/
│   └── authentication.js    # JWT creation and validation
└── views/                   # EJS pages and shared partials
```

## Configuration and deployment

The MongoDB connection string and JWT signing secret are currently defined in the application source. Before deploying, move these values into environment variables, use a strong private JWT secret, and configure the MongoDB URI for your environment. Do not commit credentials or secrets.

Uploaded cover images are stored in `public/uploads`, so make sure that directory is available and writable by the application.
