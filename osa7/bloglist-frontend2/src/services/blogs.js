import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const postComment = async (blog, comment) => {
  const stringComment = {"comment": comment}
  console.log(comment)
  console.log(stringComment)
  const response = await axios.post(`${baseUrl}/${blog.id}/comments`, stringComment)
  return response.data
}

const postBlog = async (blog, user) => {
  const config = {
    headers: { Authorization: `Bearer ${user.token}` }
  }

  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const del = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  console.log(blog.id)
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return response
}

const likeBlog = async (blog) => {
  const user = blog.user

  console.log(blog)
  const updatedBlog = {
    user: user ? user.id : null,
    likes: blog.likes + 1,
    author: blog.author,
    title: blog.title,
    url: blog.url,
  }

  await axios.put(`${baseUrl}/${blog.id}`, updatedBlog)
  const savedBlog = await axios.get(`${baseUrl}/${blog.id}`)
  return savedBlog.data
}

export default { getAll, postBlog, setToken, likeBlog, del, postComment }
