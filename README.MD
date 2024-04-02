 # Hotel Management API
 APIS for Hotel Management using NodeJs and ExpressJs for the frontend to consume, for storage of room types and rooms, respectively, Authentication and Authorization added preventing unauthenticated users from having access and also if a user is authenticated and not an admin then the user can't delete or edit a room-type

 
 # Requirements
 Node - Javascript runtime Engine MongoDB - A NoSql Database for database connections

 # Installation

 1. clone Repo
 2. install dependencies using the command:

    npm install 

3. Set up:
- MongoDB install MongoDB locally or use cloud based
- Update the MongoDB connection string in config.js file to point to your MongoDB instance.

# Usage
Start the server:

    npm run dev
By default, the server runs on port 3000. You can change the port by setting the PORT environment variable.