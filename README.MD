 # Hotel Management API
 APIS for Hotel Management using NodeJs and ExpressJs and TypeScript for the frontend to consume, for storage of room types and rooms, respectively, Authentication and Authorization added preventing unauthenticated users from having access and also if a user is authenticated and not an admin then the user can't delete or edit a room-type

 
 # Requirements
 Node - Javascript runtime Engine MongoDB - A NoSql Database for database connections

 # Installation

 1. clone Repo: [Repo Link....](https://github.com/DGreegman/Learnable-Task-XIII/)
 2. install dependencies using the command:

    npm install 

3. Set up:
- MongoDB install MongoDB locally or use cloud based
- Update the MongoDB connection string in config.js file to point to your MongoDB instance.

# Usage
Start the server:

    npm run dev

By default, the server runs on port 3000. You can change the port by setting the PORT environment variable.

## Endpoints

### POST /api/v1/rooms

Create a new room.
Request body format:

```json
{
  "name": "Room Name",
  "roomType": "roomTypeId",
  "price": 100
}


GET /api/v1/rooms
Fetch all rooms with optional filters.
Query parameters:

search: Search by room name (case-insensitive)
roomType: Filter by room type ID
minPrice: Filter by minimum price
maxPrice: Filter by maximum price
PATCH /api/v1/rooms/:id
Edit a room by its ID.
Request body can include any of the following fields:

name: New room name
roomType: New room type ID
price: New room price
DELETE /api/v1/rooms/:id
Delete a room by its ID.

GET /api/v1/rooms/:id
Fetch a room by its ID.

Contributing
Contributions are welcome! Please feel free to submit issues and pull requests.

