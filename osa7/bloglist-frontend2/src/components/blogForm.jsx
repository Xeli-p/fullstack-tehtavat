import { useDispatch, useSelector } from 'react-redux'
import { addBlog2 } from '../reducers/blogsReducer'

const PostBlogForm = ({user}) => {

  const dispatch = useDispatch()

  const addBlog = (event) => {

    event.preventDefault()

    const author = event.target.author.value
    const title = event.target.title.value
    const url = event.target.url.value
  
    dispatch(addBlog2({ author, title, url }, user))
  
  }

  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={addBlog}>
        <p>
          title:{' '}
          <input
            id='titleinput'
            name='title'
            placeholder='write title here'
          />
        </p>
        <p>
          author:{' '}
          <input
            id='authorinput'
            name='author'
            placeholder='write author here'
          />
        </p>
        <p>
          url:{' '}
          <input
            id='urlinput'
            name='url'
            placeholder='write url here'
          />
        </p>
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default PostBlogForm
