import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import Togglable from './Togglable'

test('renders content', () => {
  const blog = {
    title: 'Go To Statement Considered Harmful',
    author: 'asssger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Consider…',
    likes: 5,
  }

  const user = {
    username: 'armful',
    name: 'Armful',
  }

  render(
    <div className='testBlog'>
      <Blog blog={blog} user={user} />
    </div>,
  )

  const element = screen.getAllByText('Go To Statement Considered Harmful')
  expect(element).toBeDefined()
})

test('clicking the button twice calls event handler twice', async () => {
  const blog = {
    title: 'Go To Statement Considered Harmful',
    author: 'asssger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Consider…',
    likes: 5,
  }

  const user = {
    username: 'armful',
    name: 'Armful',
  }

  const mockHandler = jest.fn()

  render(
    <div className='testBlog'>
      <Blog blog={blog} user={user} handleLikeBlog={mockHandler} />
    </div>,
  )

  const user2 = userEvent.setup()

  const button = screen.getByText('show details')
  user2.click(button)

  const element2 = screen.getAllByText('asssger W. Dijkstra')
  expect(element2).toBeDefined()

  const button2 = screen.getByText('like')
  await user2.click(button2)
  await user2.click(button2)
  expect(mockHandler.mock.calls).toHaveLength(2)

  /* const element = screen.getAllByText('Go To Statement Considered Harmful')*/
})

test('url is shown after details are clicked open', async () => {
  const blog = {
    title: 'Go To Statement Considered Harmful',
    author: 'asssger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Consider…',
    likes: 5,
  }

  const user = {
    username: 'armful',
    name: 'Armful',
  }

  const mockHandler = jest.fn()

  render(
    <div className='testBlog'>
      <Blog blog={blog} user={user} handleLikeBlog={mockHandler} />
    </div>,
  )

  const user2 = userEvent.setup()

  const button = screen.getByText('show details')
  user2.click(button)

  const element2 = screen.getAllByText('asssger W. Dijkstra')
  expect(element2).toBeDefined()

  const blogUrl = screen.getAllByText(
    'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Consider…',
  )
  expect(blogUrl).toBeDefined
})
