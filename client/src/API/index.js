import axios from 'axios'

const url = 'http://localhost:5000/posts';
const uploadUrl = 'http://localhost:5000/upload';

export const fetchPosts =() => axios.get(url);
export const createPost=(newPost)=>axios.post(url,newPost);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);

// New function to upload image to S3
export const uploadImage = (formData) => {
  return axios.post(uploadUrl, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};