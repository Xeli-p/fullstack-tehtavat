import { useRef } from 'react'
import PostBlogForm from '../components/blogForm'
import Togglable from '../components/Togglable'
import LoginForm from '../components/loginForm'
import Bloglist from '../components/Bloglist'

import { useSelector } from 'react-redux'


const Home = () => {

    const user = useSelector(state => state.user)
  
    const blogFormRef = useRef()

    return (
        <div>
        {!user && 
          <LoginForm />
        }
        {user && (
          <div>
            <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <PostBlogForm user={user}/>
            </Togglable>
            <Bloglist />
          </div>
        )}
      </div>
    )
}

export default Home