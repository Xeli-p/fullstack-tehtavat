import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import PostBlogForm from './components/blogForm'
import './app.css'
import Togglable from './components/Togglable'
import LoginForm from './components/loginForm'
import Notification from './components/Notification'

/*const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const isError = message.toLowerCase().includes('error') || message.toLowerCase().includes('fail')
  console.log({ message })
  return (
    <div className={ isError ? 'error-red' : 'error' } >
      { message }
    </div>
  )
}
*/

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const blogFormRef = useRef()

  const updateBlogs = (likedBlog) => {
    const updatedBlogsList = blogs.map(blog => {
      if (blog.id === likedBlog.id) {
        return likedBlog;
      }
      return blog;
    })
    setBlogs(updatedBlogsList)
  }

  const handleLikeBlog = async(blog) => {
    try{
      const likedBlog = await blogService.likeBlog(blog)
      updateBlogs(likedBlog)
    } catch (error) {
      setErrorMessage(error.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handlePostBlog = async(blog) => {
    const newBlog = blog

    try{
      await blogService.postBlog(newBlog)
      blogFormRef.current.toggleVisibility()
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
      setErrorMessage(`Created ${newBlog.title}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage(error.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleUsernameChange = (usern) => setUsername(usern)

  const handlePasswordChange = (pass) => setPassword(pass)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('fail: wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }


  return (
    <div>
      {!user && <LoginForm
        username={username}
        password={password}
        handlePasswordChange={handlePasswordChange}
        handleUsernameChange={handleUsernameChange}
        handleLogin={handleLogin}
        errorMessage={errorMessage}
      />}
      {user && <div>
        <p>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </p>
        <Notification message={errorMessage} />

        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <PostBlogForm
            handlePostBlog={handlePostBlog}
          />
        </Togglable>
        <div class='blog'>
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              handleLikeBlog={() => handleLikeBlog(blog)}
            />
          )}
        </div>
      </div>
      }
    </div>
  )

}

export default App