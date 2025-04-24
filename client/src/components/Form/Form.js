import React,{useState, useEffect} from 'react'
import  {TextField, Button, Typography, Paper} from '@material-ui/core'
import useStyles from './styles.js'
import {useDispatch} from 'react-redux'
import { createPost, updatePost } from '../../actions/posts.js'
import { useSelector } from 'react-redux'
import { uploadImage } from '../../API/index.js'

const Form = ({currentID, setCurrentID}) => {
  const post = useSelector((state) => currentID?state.posts.find((p)=>p._id===currentID):null)
  const [postData, setPostData] = useState({
   posted_by:'', post_title:'',post_message:'',post_tags:'',selectedFile:''
  })
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(()=>{
    if(post)
    {
      setPostData(post)
    }
  },[post])

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setUploading(true)
      
      // Only upload file if a new one is selected
      if (file) {
        const formData = new FormData()
        formData.append('image', file)
        
        const response = await uploadImage(formData)
        if (response.data.success) {
          setPostData({ ...postData, selectedFile: response.data.imageUrl })
        }
      }
      
      if(currentID) {
        dispatch(updatePost(currentID, {
          ...postData,
          selectedFile: file ? postData.selectedFile : post.selectedFile
        }))
      } else {
        dispatch(createPost({
          ...postData,
          selectedFile: postData.selectedFile
        }))
      }
      
      clear()
    } catch (error) {
      console.error('Error in form submission:', error)
    } finally {
      setUploading(false)
    }
  }

  const clear =() =>{
    setCurrentID(null)
    setPostData(({
      posted_by:'', post_title:'',post_message:'',post_tags:'',selectedFile:''
    }))
    setFile(null)
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
    <Typography variant='h6'>{currentID? 'Edit ' : "Create "}a Post</Typography>
    <TextField name='creator' variant='outlined' label = "Creator" fullWidth value={postData.posted_by} onChange={(e) =>setPostData({...postData,posted_by:e.target.value})}/>
    <TextField name='title' variant='outlined' label = "Title" fullWidth value={postData.post_title} onChange={(e) =>setPostData({...postData,post_title:e.target.value})}/>
    <TextField name='message' variant='outlined' label = "Message" fullWidth value={postData.post_message} onChange={(e) =>setPostData({...postData,post_message:e.target.value})}/>
    <TextField name='tags' variant='outlined' label = "Tags" fullWidth value={postData.post_tags} onChange={(e) =>setPostData({...postData,post_tags:e.target.value.split(',')})}/>
    <div className={classes.fileInput}>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange}
      />
      {post && post.selectedFile && !file && (
        <div className={classes.filePreview}>
          <img src={post.selectedFile} alt="Current" width="100" />
          <Typography variant="caption">Current image</Typography>
        </div>
      )}
      {file && (
        <Typography variant="caption">{file.name}</Typography>
      )}
    </div>
    <Button 
      className={classes.buttonSubmit} 
      variant='contained' 
      color="primary" 
      size="large" 
      type="submit" 
      fullWidth 
      disabled={uploading}
    >
      {uploading ? 'Uploading...' : 'Submit'}
    </Button>
    <Button variant='contained' color="secondary" size="small" onClick={clear} fullWidth >Clear</Button>
    </form>
    </Paper>
  )
}

export default Form
