 # FRIENDBOOK
 ## Introduction
This app is a social networking platform that allows users to register and login, create and view posts, and add and view friends. It has a backend API that handles user authentication, storing user and post data, and handling friend requests.

## Features
User registration and login: Users can create an account and log in to the app using their email and password. The app uses JSON Web Tokens (JWT) for authentication.
Post creation: Users can create text and photo posts, which are stored in a database and displayed in a feed on the app.
Friend management: Users can search for and send friend requests to other users, view their friends' profiles, and accept or reject incoming friend requests.
Profile display: Users can view and edit their own profile, which includes their name, bio, and profile picture.
### Technologies
HTML and CSS for the frontend
JavaScript for the frontend and backend
Node.js and Express for the backend
MongoDB for storing user and post data
Unsplash API for retrieving photos for the posts
#### Usage
To use the app, you will need to have Node.js and MongoDB installed on your computer.

Clone the repository and navigate to the project directory:
git clone https://github.com/Dancunrandy/https://github.com/Dancunrandy/Phase-1-Independent-Project.git
cd https://github.com/Dancunrandy/Phase-1-Independent-Project
Install the dependencies:
npm install
Start the MongoDB server:
mongod
Start the app:
npm start
Open a web browser and go to http://localhost:3000 to access the app.
### API Endpoints
The app has the following API endpoints:

POST /register: Creates a new user account.
POST /login: Logs in an existing user.
POST /logout: Logs out the current user.
GET /profile: Gets the current user's profile.
POST /profile: Updates the current user's profile.
POST /photos: Uploads a photo to the Unsplash API.
POST /posts: Creates a new post.
GET /posts: Gets all the posts.
GET /friends: Gets the current user's friends.
POST /friends: Sends a friend request to another user.
PUT /friends/:userId: Accepts or rejects a friend request from another user.
### Deployment
To deploy the app, you can use a service like Heroku.

Create a new Heroku app and link it to the GitHub repository.
Set up the Heroku MongoDB add-on.
Set the DATABASE_URL and JWT_SECRET environment variables in the Heroku app settings.
Deploy the app to Heroku.
### Credits
This app was created by Daniel Mutie as a learning project