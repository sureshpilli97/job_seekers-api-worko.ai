# User Management API

This project is a simple Node.js/Express API for managing users, integrated with Firebase Firestore for data storage. It provides endpoints for creating, reading, updating, and deleting users, along with validation and testing.

## Prerequisites

- Node.js v14 or later
- Firebase Account
- Firebase Service Account Key

## Setup

1. Clone the Repository

   - git clone https://github.com/sureshpilli97/job_seekers-api-worko.ai.git
   - cd job_seekers-api-worko.ai

2. Install Dependencies

   - npm install

3. Run the Server

    - npm start

   local request api call to this link after run the server --> http://localhost:5000/worko/user


 **Note** The service uses basic authentication with default credentials (admin:Admin123).
    Username: admin
    Password: Admin123

# Testing

    - npm test

# API Endpoints
    GET /worko/user -> Get all users
    GET /worko/user/{id} -> Get a user by ID
    POST /worko/user -> Create a new user
    PUT /worko/user/{id} -> Update an existing user
    PATCH /worko/user/{id} -> Partially update an existing user
    DELETE /worko/user/{id} ->elete a user by ID


# Online Deployed API Link

   Use below link for deployed api in vercel to directly test above mentioned api request calls use 
   same authentication credentials.

   - https://job-seekers-api-worko-ai.vercel.app/worko/user
