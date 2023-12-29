import { useDispatch, useSelector } from "react-redux"
import { initializeBlogs } from "../reducers/blogsReducer"
import {  useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material'

const Bloglist = () => {

  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(initializeBlogs())
    }, [dispatch])
    
  const blogs = useSelector(state => state.blogs)
  return(
  <div>
    <h2>Blogs</h2>
      
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {blogs.map(blog => (
            <TableRow key={blog.id}>
              <TableCell>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </TableCell>
              <TableCell>
                {blog.author}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
  )
}
export default Bloglist