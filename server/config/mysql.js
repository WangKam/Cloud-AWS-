import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables with explicit path to .env file
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

// MySQL connection options
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Create connection pool
let pool;

// Initialize database tables
const initializeDatabase = async () => {
    try {
        // Log environment variables for debugging (not the password)
        console.log('Environment variables loaded:', {
            DB_HOST: process.env.DB_HOST,
            DB_USER: process.env.DB_USER,
            DB_NAME: process.env.DB_NAME,
            DB_PASSWORD: process.env.DB_PASSWORD,
            // Not logging password for security
        });

        console.log('Attempting to connect to MySQL database with config:', {
            host: dbConfig.host,
            user: dbConfig.user,
            database: dbConfig.database,
            // Not logging password for security
        });

        // First create a connection without specifying database to create db if not exists
        const tempPool = mysql.createPool({
            ...dbConfig,
            database: null
        });

        // Create database if it doesn't exist
        await tempPool.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
        console.log(`Ensured database ${dbConfig.database} exists`);
        
        // Close the temporary connection
        await tempPool.end();
        
        // Create the real connection pool with the database
        pool = mysql.createPool(dbConfig);
        
        // Check if the connection is successful
        const [result] = await pool.query('SELECT 1');
        console.log('MySQL connection established successfully');
        
        // Create posts table if it doesn't exist
        await pool.query(`
            CREATE TABLE IF NOT EXISTS posts (
                _id VARCHAR(36) PRIMARY KEY,
                title VARCHAR(100) NOT NULL,
                message TEXT,
                creator VARCHAR(100),
                tags VARCHAR(255),
                selectedFile VARCHAR(2048),
                likeCount INT DEFAULT 0,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('Posts table initialized');
        
        return true;
    } catch (error) {
        console.error('MySQL Connection Error:', {
            message: error.message,
            code: error.code,
            errno: error.errno,
            sqlMessage: error.sqlMessage
        });
        
        if (error.code === 'ECONNREFUSED') {
            console.error('SOLUTION: Please ensure MySQL server is running on your machine');
        } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('SOLUTION: Check your MySQL username and password in .env file');
        } else if (error.code === 'ER_BAD_DB_ERROR') {
            console.error('SOLUTION: Database does not exist. Will attempt to create it.');
        }
        
        throw error;
    }
};

export { pool, initializeDatabase };