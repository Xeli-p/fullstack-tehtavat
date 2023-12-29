import './app.css'
import { Container } from '@mui/material'

import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useRef } from 'react'

import { initializeUsers } from './reducers/usersReducer'
import { checkForLogin } from './reducers/userReducer'

import Users from './components/Users'
import User from './components/User'
import Home from './components/Home'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Bloglist from './components/Bloglist'
import Menu from './components/Menu'

import {
  Routes, Route, useMatch
} from 'react-router-dom'



const App = () => {

  const dispatch = useDispatch()

  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  const matchUser = useMatch('/users/:id')
  const user = matchUser 
    ? users.find(user => user.id === String(matchUser.params.id))
    : null

  const matchBlog = useMatch('/blogs/:id')
  const blog = matchBlog
    ? blogs.find(blog => blog.id === String(matchBlog.params.id))
    : null

  useEffect(() => {
    dispatch(initializeUsers())
    dispatch(checkForLogin())
  }, [dispatch])

  return (
    <Container>
      <div>
        <Menu />
        <Notification />
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<Home />} />
          <Route path='/users/:id' element={<User user={user} />} />
          <Route path="/blogs/:id" element={<Blog blog={blog} />} />
          <Route path="/blogs" element={<Bloglist />} />
        </Routes>
      </div>
    </Container>
  )
}

export default App
