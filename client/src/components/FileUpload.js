import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) return;
    try {
      const response = await axios.get('http://localhost:5000/generate-presigned-url', {
        params: {
          filename: file.name,
          filetype: file.type,
        },
      });
      await axios.put(response.data.url, file, {
        headers: {
          'Content-Type': file.type,
        },
      });
      alert('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload</button>
    </div>
  );
};

export default FileUpload;
