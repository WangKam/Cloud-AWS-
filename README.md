# Social Media Web Application

A full-stack social media application built with the MERN stack (MongoDB/DynamoDB, Express.js, React.js, Node.js).

![Project Screenshot](project-1.JPG)

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- AWS Account (for DynamoDB)

## Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Social-Media-Web-App-master
```

### 2. Environment Variables

Create a `.env` file in the server directory:

```bash
# server/.env
PORT_NUM=5000
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
```

Replace `your_access_key_id` and `your_secret_access_key` with your actual AWS credentials.

### 3. Install Dependencies

#### Server Setup
```bash
cd server
npm install
```

#### Client Setup
```bash
cd client
npm install --legacy-peer-deps
```

Note: We use `--legacy-peer-deps` due to some dependencies requiring older versions of Material-UI.

## Running the Application

### 1. Start the Server
```bash
cd server
npm start
```
The server will run on http://localhost:5000

### 2. Start the Client
```bash
cd client
npm start
```
The client application will open in your default browser at http://localhost:3000

## Features

- Create, read, update, and delete posts
- Like posts
- User authentication
- Responsive design
- Image upload support
- Real-time updates

## Architecture

- **Frontend**: React.js with Material-UI
- **Backend**: Node.js with Express.js
- **Database**: DynamoDB
- **Authentication**: JWT (JSON Web Tokens)

## API Endpoints

- `GET /posts` - Get all posts
- `POST /posts` - Create a new post
- `PATCH /posts/:id` - Update a post
- `DELETE /posts/:id` - Delete a post
- `PATCH /posts/:id/likePost` - Like a post

## Troubleshooting

1. If you see DynamoDB connection errors:
   - Verify your AWS credentials in the `.env` file
   - Check if your AWS region is correctly set
   - Ensure your AWS user has proper DynamoDB permissions

2. If the client shows connection errors:
   - Verify that the server is running on port 5000
   - Check if CORS is properly configured
   - Ensure all environment variables are set correctly

3. Material-UI version conflicts:
   - Use `npm install --legacy-peer-deps` for client installation
   - If you still see UI issues, clear npm cache and reinstall dependencies

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details