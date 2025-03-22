import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import { createTable } from './config/dynamodb.js'
import postRoutes from './routes/posts.js'

const app = express()
dotenv.config()

//setting up bodyParser to properly send and test requests
app.use(bodyParser.json({limit:"30mb", extended:"true"}))
app.use(bodyParser.urlencoded({limit:"30mb", extended:"true"}))
app.use(cors())

//express middleware
app.use('/posts', postRoutes)

const PORT_NUM = process.env.PORT_NUM || 5000;

// Initialize DynamoDB table and start server
createTable()
    .then(() => {
        app.listen(PORT_NUM, () => console.log(`Server is running on port: ${PORT_NUM}`));
    })
    .catch((error) => {
        console.error('Failed to initialize server:', error);
        process.exit(1);
    });
