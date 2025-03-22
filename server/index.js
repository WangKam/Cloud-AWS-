import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import dotenv from "dotenv";
import { createTable } from "./config/dynamodb.js";

//initializing app

const app = express();
dotenv.config();
//setting up bodyParser to properly send and test requests
app.use(bodyParser.json({ limit: "30mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));

app.use(cors());

//express middleware
app.use("/posts", postRoutes);

//Connecting to MongoDB database.

const PORT_NUM = process.env.PORT_NUM || 5000;

// Initialize DynamoDB table and start server
createTable()
  .then(() => {
    app.listen(PORT_NUM, () =>
      console.log(`Server is running on port: ${PORT_NUM}`)
    );
  })
  .catch((error) => {
    console.error("Failed to initialize DynamoDB:", error);
    process.exit(1);
  });
