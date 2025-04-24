const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

// AWS SDK will automatically use IAM Role credentials from the EC2 instance
const s3 = new AWS.S3({ region: process.env.AWS_REGION });

function uploadFile(file) {
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Body: file.buffer,
    Key: `${uuidv4()}-${file.originalname}`,
    ContentType: file.mimetype,
  };

  return s3.upload(uploadParams).promise();
}

module.exports = { uploadFile };
