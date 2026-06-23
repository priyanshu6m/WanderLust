# WanderLust 🏕️

A full-stack, Airbnb-inspired property listing and booking web application. Users can browse, create, edit, and review property listings with image uploads, authentication, and a clean, server-rendered interface.

**Live Demo:** https://wanderlust-92mu.onrender.com/

## Features

- Browse and search property listings with images, pricing, and location details
- Create, edit, and delete listings (owner-only access)
- User authentication and session-based login/signup
- Add, edit, and delete reviews and ratings on listings
- Image upload and cloud storage via Cloudinary
- Server-side input validation to prevent invalid or malicious data
- Flash messages for user feedback (success/error states)

## Tech Stack

**Backend:** Node.js, Express.js
**Database:** MongoDB with Mongoose
**Templating:** EJS, EJS-Mate
**Authentication:** Passport.js (passport-local, passport-local-mongoose)
**File Uploads:** Multer, Cloudinary
**Validation:** Joi
**Session Management:** express-session, connect-mongo, connect-flash

## Project Structure

```
WanderLust/
├── controllers/    # Route handler logic
├── models/         # Mongoose schemas (Listing, Review, User)
├── routes/         # Express route definitions
├── views/          # EJS templates
├── public/         # Static assets (CSS, JS, images)
├── utils/          # Helper functions and error handling
├── init/           # Database seed scripts
├── app.js          # Application entry point
├── middleware.js   # Custom middleware (auth checks, validation)
├── schema.js       # Joi validation schemas
└── cloudConfig.js  # Cloudinary configuration
```

## Getting Started

### Prerequisites
- Node.js (v22+)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### Installation

```bash
git clone https://github.com/priyanshu6m/WanderLust.git
cd WanderLust
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```
ATLASDB_URL=your_mongodb_connection_string
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
SECRET=your_session_secret
```

### Run Locally

```bash
node app.js
```

The app will be available at `http://localhost:8080` (or your configured port).

## Author

**Priyanshu Goyal**
[GitHub](https://github.com/priyanshu6m) · [LinkedIn](https://www.linkedin.com/in/priyanshu6m7/)
