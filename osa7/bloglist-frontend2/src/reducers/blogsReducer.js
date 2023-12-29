import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { changeNotification } from './notificationReducer'


const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes)
    },
    like(state, action) {
      return state.map(blog => blog.id !== action.payload.id ? blog : action.payload)
    },
    remove(state, action) {
      return state.filter(blog => blog.id !== action)
    }
  }
})

export const {appendBlog, setBlogs, like, remove} = blogsSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addBlog2 = (content, user) => {
  console.log(content)
  return async dispatch => {
    const blog = await blogService.postBlog(content, user)
    dispatch(appendBlog(blog))
    dispatch(changeNotification(`Added ${blog.title}`))
  }
}

export const like2 = (blog) => {
  return async dispatch => {
    const likedBlog = await blogService.likeBlog(blog)
    dispatch(like(likedBlog))
    dispatch(changeNotification(`Liked ${blog.title}`))
  }
}

export const comment = (blog, comment) => {
  return async dispatch => {
    const commentedBlog = await blogService.postComment(blog, comment)
    dispatch(like({...commentedBlog, user: blog.user}))
    dispatch(changeNotification(`Commented ${blog.title}`))
  }
}

export const del = (blog) => {
  return async dispatch => {
    const response = await blogService.del(blog)
    if (response.status === 200) dispatch(del(blog.id))
    dispatch(changeNotification(`Deleted ${blog.title}`))
  }
}

export default blogsSlice.reducer