const AWS = require('aws-sdk');
const express = require('express');
const router = express.Router();

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
});

router.get('/generate-presigned-url', (req, res) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: req.query.filename,
    Expires: 60,
    ContentType: req.query.filetype,
  };

  s3.getSignedUrl('putObject', params, (err, url) => {
    if (err) {
      return res.status(500).json({ error: 'Error generating URL' });
    }
    res.json({ url });
  });
});

module.exports = router;
