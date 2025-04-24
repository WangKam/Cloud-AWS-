import express from 'express';
import { handleImageUpload, uploadMiddleware } from '../controllers/upload.js';

const router = express.Router();

// Route for uploading images to S3
router.post('/', uploadMiddleware, handleImageUpload);

export default router;