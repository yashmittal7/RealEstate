EstateHub — AI-Assisted Real Estate Marketplace

EstateHub is a full-stack real-estate marketplace built with the MERN stack. It allows users to discover properties, search and filter listings, save favorites, and view detailed property information. Property owners can create and manage listings, upload images, and monitor their portfolio through an owner dashboard.

The platform also integrates Groq-powered AI features for natural-language property search, property-description generation, property-specific Q&A, and personalized property recommendations.

Live Demo

Frontend: https://estate-hu.netlify.app/

The frontend requires a running backend API configured through VITE_API_URL for authentication, property data, image uploads, and AI features.

Features

Property Discovery

Browse recently added properties

Search by city or locality

Filter by property type and price range

Sort by newest, lowest price, or highest price

Paginated property results

View detailed property pages

Display property images, price, location, bedrooms, bathrooms, description, and owner information

Authentication & User Accounts

User registration and login

Password hashing with bcryptjs

JWT-based authentication

Persistent client-side authentication state

Protected routes for authenticated users

Role-based access for buyers, property owners, and admins

User profile page

Save properties to favorites

Owner Workspace

Create property listings

Upload up to five property images

Store listing images using Cloudinary

View personal listings

Delete owned listings

Owner dashboard with:

Number of personal listings

Total platform users

Total properties

Estimated portfolio value

Recent listings

AI-Powered Features

EstateHub uses the Groq API with the llama-3.3-70b-versatile model for several application workflows:

AI Search: Convert natural-language property requests into structured filters such as location, property type, budget, bedrooms, and sorting preference.

AI Description Generator: Generate a professional listing description from property details.

AI Property Advisor: Ask questions about a specific property using the stored listing data as context.

AI Recommendations: Filter candidate properties from the application database and ask the AI model to rank the best matches with a match score, summary, and highlights.

The recommendation workflow uses the database to produce candidate properties first; the AI layer is used for ranking and explanation rather than directly inventing property records.

Tech Stack

Frontend

React 19

Vite

React Router

Tailwind CSS

Axios

React Hook Form

React Hot Toast

React Icons

JWT Decode

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT

bcryptjs

Multer

Cloudinary

Groq SDK

Express CORS

Nodemon for development

Architecture

                         ┌───────────────────────┐
                         │      React + Vite      │
                         │    Tailwind CSS UI    │
                         └───────────┬───────────┘
                                     │
                                  Axios
                                     │
                             REST API Requests
                                     │
                         ┌───────────▼───────────┐
                         │    Express Backend     │
                         │   Controllers/Routes   │
                         └──────┬──────┬──────┬──┘
                                │      │      │
                           Auth/API  Property  AI
                                │      │      │
                                │      │      ├──────────────┐
                                │      │                     │
                         ┌──────▼──────▼──────┐      ┌──────▼──────┐
                         │      MongoDB        │      │   Groq LLM   │
                         │  Users / Properties │      │ AI Services  │
                         └────────────────────┘      └─────────────┘
                                │
                         ┌──────▼──────┐
                         │  Cloudinary │
                         │    Images   │
                         └─────────────┘

Project Structure

RealEstate/
│
├── backend/
│   ├── config/
│   │   ├── cloudinary.js
│   │   └── db.js
│   ├── controllers/
│   │   ├── aiController.js
│   │   ├── propertyController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── models/
│   │   ├── Property.js
│   │   └── user.js
│   ├── routes/
│   │   ├── aiRoutes.js
│   │   ├── propertyRoutes.js
│   │   └── userRoutes.js
│   ├── services/
│   │   ├── aiService.js
│   │   └── recommendationService.js
│   ├── utils/
│   │   └── parseAIResponse.js
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── ai/
    │   │   ├── common/
    │   │   ├── layout/
    │   │   └── property/
    │   ├── context/
    │   ├── hooks/
    │   ├── layouts/
    │   ├── pages/
    │   │   ├── auth/
    │   │   ├── owner/
    │   │   └── user/
    │   ├── routes/
    │   ├── services/
    │   ├── utils/
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json

Backend API Overview

Authentication

Method

Endpoint

Description

POST

/api/users/register

Register a new user

POST

/api/users/login

Login and receive JWT

GET

/api/users/profile

Get authenticated user profile

POST

/api/users/favorites/:propertyId

Add a property to favorites

Properties

Method

Endpoint

Description

GET

/api/properties

Search, filter, sort and paginate properties

GET

/api/properties/:id

Get a property by ID

GET

/api/properties/my-properties

Get listings owned by the authenticated user

GET

/api/properties/stats

Get dashboard statistics

POST

/api/properties

Create a property listing with image uploads

PUT

/api/properties/:id

Update an owned property

DELETE

/api/properties/:id

Delete an owned property

AI

Method

Endpoint

Description

POST

/api/ai/generate-description

Generate a property description

POST

/api/ai/search

Convert natural-language search into filters

POST

/api/ai/advisor

Answer questions about a property

POST

/api/ai/recommend

Rank matching properties with AI

Data Models

User

name
email
password
role: user | owner | admin
favorites: [Property IDs]
createdAt
updatedAt

Property

title
description
price
location
propertyType
bedrooms
bathrooms
images: [Cloudinary URLs]
owner: User ID
createdAt
updatedAt

Authentication Flow

Register / Login
       │
       ▼
 Backend validates credentials
       │
       ▼
 bcrypt password verification / hashing
       │
       ▼
 JWT issued on successful login
       │
       ▼
 Token stored client-side
       │
       ▼
 Axios interceptor adds:
 Authorization: Bearer <token>
       │
       ▼
 Backend JWT middleware validates token
       │
       ▼
 Protected controller receives req.user

Owner/admin routes additionally use role-based authorization before allowing listing creation or owner dashboard access.

AI Recommendation Flow

The recommendation feature uses a two-stage approach:

User preferences
       │
       ▼
MongoDB candidate filtering
       │
       ▼
Up to 10 matching properties
       │
       ▼
Groq / Llama model
       │
       ▼
Top recommendations + score + summary + highlights
       │
       ▼
Match recommendation cards in React

This keeps the actual property records in MongoDB and uses the LLM primarily for ranking and natural-language explanation.

Getting Started

Prerequisites

Install the following before running the project:

Node.js 18+

npm

MongoDB Atlas or another MongoDB deployment

Cloudinary account for image uploads

Groq API key for AI functionality

1. Clone the repository

git clone https://github.com/yashmittal7/RealEstate.git
cd RealEstate

2. Install backend dependencies

cd backend
npm install

3. Configure backend environment variables

Create:

backend/.env

Add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GROQ_API_KEY=your_groq_api_key
PORT=5000

4. Install frontend dependencies

Open a second terminal:

cd frontend
npm install

5. Configure frontend environment variables

Create/update:

frontend/.env

Add:

VITE_API_URL=http://localhost:5000/api

For deployment, replace the local URL with your deployed backend API URL.

Running Locally

Start the backend

From backend/:

npm run dev

The API will run on:

http://localhost:5000

Start the frontend

From frontend/:

npm run dev

Vite will provide the local development URL, normally:

http://localhost:5173

Available Scripts

Backend

npm run dev      # Start with Nodemon
npm start        # Start the Node.js server

Frontend

npm run dev      # Start Vite development server
npm run build    # Create production build
npm run preview  # Preview production build
npm run lint     # Run ESLint

Security Notes

Never commit .env files or API keys.

Passwords are hashed with bcryptjs before storage.

Protected APIs use JWT authentication.

Owner/admin capabilities are checked through role middleware.

Property ownership is verified before update/delete operations.

Keep MongoDB, Cloudinary, JWT, and Groq credentials in environment variables.

Current Scope

EstateHub is a portfolio/learning project focused on demonstrating full-stack web development and practical AI integration. The current implementation focuses on property discovery, listing management, authentication, image storage, and AI-assisted search/recommendation workflows rather than real-world property verification, payment processing, bookings, or transaction settlement.

Future Enhancements

Potential next improvements include:

Property editing UI for owners

Remove/unfavorite support

Property comparison

Saved searches and alerts

Map-based property discovery

Contact/inquiry persistence instead of mailto-only contact

Stronger server-side validation and centralized error handling

Automated tests for API and authentication flows

Admin-specific management screens

More robust AI recommendation scoring and evaluation

Author

Yash Mittal

GitHub: https://github.com/yashmittal7

Repository: https://github.com/yashmittal7/RealEstate
