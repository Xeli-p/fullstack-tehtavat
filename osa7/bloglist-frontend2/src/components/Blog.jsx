import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { del, like2, comment, initializeBlogs } from '../reducers/blogsReducer'
import { useNavigate } from 'react-router-dom'
import {
  Paper,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';

const Blog = ({ blog }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleComment = event => {
    event.preventDefault()
    dispatch(comment(blog, event.target.comment.value))
    navigate(`/blogs/${blog.id}`)
  }

  const style1 = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  if (!blog) return <p>Loading...</p> 

  return (
    <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
      <Typography variant="h5" gutterBottom>
        {blog.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Author: {blog.author}
      </Typography>
      <Typography variant="body1" gutterBottom>
        URL: {blog.url}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Likes: {blog.likes}{' '}
        <Button variant="outlined" color="primary" size="small" onClick={() => dispatch(like2(blog))}>
          Like
        </Button>
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        User: {blog.user.name}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Comments:
      </Typography>
      <List>
        {blog.comments.map((comment, index) => (
          <ListItem key={index}>
            <ListItemText>{String(comment)}</ListItemText>
          </ListItem>
        ))}
      </List>
      <form onSubmit={handleComment}>
        <TextField
          id="commentinput"
          name="comment"
          label="Write comment here"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </form>
      {user && blog.user && user.username === blog.user.username && (
        <Box mt={2}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              dispatch(del(blog));
              dispatch(initializeBlogs());
              navigate('/blogs');
            }}
          >
            Delete Blog
          </Button>
        </Box>
      )}
    </Paper>
  )
}

export default Blog