import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog , user , handleLikeBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = {
    display: visible ? '' : 'none',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleDelBlog = async () => {
    if (window.confirm(`Do you really want delete ${blog.title}?`)) {
      const response = await blogService.del(blog)
      console.log('Delete response:', response)
    }
  }

  const currentBlogUser = blog.user

  return (
    <div>
      <div style={hideWhenVisible}>
        {blog.title} <button onClick={toggleVisibility}>show details</button>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.title}</p>
        <p>{blog.author}</p>
        <p>{blog.url}</p>
        <p>
          likes: {blog.likes} <button onClick={() => handleLikeBlog(blog)}> like </button>
        </p>
        {currentBlogUser && currentBlogUser.username && <p>{currentBlogUser.name}</p>}
        {user && blog.user && user.username === blog.user.username && (
          <button onClick={handleDelBlog}>delete blog</button>
        )}
        <button onClick={toggleVisibility}>hide details</button>
      </div>
    </div>
  )
}

export default Blog