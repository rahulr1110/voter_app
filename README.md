# Voting Application(Backend NODEJS)
This is a backend application for a voting system where users can vote for candidates. It provides functionalities for user authentication, candidate management, and voting.

# Features
- User sign up and login with Aadhar Card Number and password
- User can view the list of candidates
- User can vote for a candidate (only once)
- Admin can manage candidates (add, update, delete)
- Admin cannot vote

# Technologies Used
- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT) for authentication

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rahulr1110/voter_app.git

# API Endpoints

## Authentication

### Sign Up
- `POST /user/signup`: Sign up a user

### Login
- `POST /user/login`: Login a user

### Get User Profile
- `GET /user/userprofile` get user details

### Change User Profile Password
- `PUT /user/userpasswordchange` change user password

## Candidates

### Add Candidate
- `POST /candidate/addcandidate`: Add candidate

### Update Candidate
- `PUT /candidate/updatecandidate/:id`: update Candidate profile

### Delete Candidate
- `DELETE /candidate/deletecandidate/:id`: delete Candidate profile

## Voting

### Login As Voter
- `POST /user/login`: Login As Voter

### Add Vote to Candidate
- `POST /voter/addvote/:id`: Add Vote to Candidate

### Get Votes Count to Candidate
- `GET /voter/getvotescounts`: Get the Votes Count to Candidates

### Get All Candidate
- `GET /voter/getallcandidates`: Get All the Candidates
  



   

