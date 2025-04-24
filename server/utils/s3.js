import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

// Configure S3 with endpoint URL instead of access keys
const s3 = new AWS.S3({ 
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_ENDPOINT_URL,
  s3ForcePathStyle: true // Required for some S3-compatible services
});

export function uploadFile(file) {
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Body: file.buffer,
    Key: `${uuidv4()}-${file.originalname}`,
    ContentType: file.mimetype,
  };

  return s3.upload(uploadParams).promise();
}

// Get the URL for a file in S3
export function getFileUrl(key) {
  // If we have a custom endpoint, use it to construct the URL
  if (process.env.AWS_ENDPOINT_URL) {
    return `${process.env.AWS_ENDPOINT_URL}/${process.env.AWS_BUCKET_NAME}/${key}`;
  }
  
  // Fallback to standard S3 URL format
  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}
