import { uploadFile, getFileUrl } from '../utils/s3.js';
import multer from 'multer';

// Configure multer storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // Limit to 5MB
});

// Middleware export for routes
export const uploadMiddleware = upload.single('image');

// Controller for image upload
export const handleImageUpload = async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    // Upload to S3
    const result = await uploadFile(req.file);
    
    // Return the file URL
    return res.status(200).json({ 
      success: true, 
      imageUrl: getFileUrl(result.Key),
      key: result.Key
    });
  } catch (error) {
    console.error('Error uploading image to S3:', error);
    return res.status(500).json({ message: 'Failed to upload image', error: error.message });
  }
};