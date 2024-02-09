import { gql, useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'

const ALL_BOOKS = gql`
  query AllBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
    }
  }
`

const ME = gql`
  query {
    me {
      favoriteGenre
    }
  }
`

const Recommend = (props) => {
  const [filter, setFilter] = useState('')

  const { data: meData, loading: meLoading } = useQuery(ME)

  useEffect(() => {
    if (!meLoading && meData && meData.me) {
      console.log(meData.me.favoriteGenre)
      setFilter(meData.me.favoriteGenre)
    }
  }, [meData, meLoading])

  const { loading: booksLoading, data: booksData } = useQuery(ALL_BOOKS, {
    variables: { genre: filter },
  })

  if (meLoading || booksLoading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const books = booksData.allBooks

  console.log(books)

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author?.name || 'Unknown Author'}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend