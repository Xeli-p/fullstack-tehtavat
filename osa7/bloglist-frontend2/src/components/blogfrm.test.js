import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import PostBlogForm from './blogForm'
import Togglable from './Togglable'

test('blogform calls the prop function with the right parameters', async () => {
  const mockHandler = jest.fn()
  render(
    <div className='postBlogForm'>
      <PostBlogForm handlePostBlog={mockHandler} />
    </div>,
  )

  const user2 = userEvent.setup()

  const inputTitle = screen.getByPlaceholderText('write title here')
  const inputAuthor = screen.getByPlaceholderText('write author here')
  const inputUrl = screen.getByPlaceholderText('write url here')

  const sendButton = screen.getByText('save')

  await user2.type(inputTitle, 'Jotakin tapahtui joskus')
  await user2.type(inputAuthor, 'Erkki Koski')
  await user2.type(inputUrl, 'http://www.munkotisivu.fi/354246')

  await user2.click(sendButton)

  expect(mockHandler).toHaveBeenCalledWith({
    title: 'Jotakin tapahtui joskus',
    author: 'Erkki Koski',
    url: 'http://www.munkotisivu.fi/354246',
  })
})
