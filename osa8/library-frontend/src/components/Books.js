import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'

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


const Books = (props) => {

  const [filter, setFilter] = useState('')

  const result = useQuery(ALL_BOOKS, {
    variables: { genre: filter }
  }) 

  if (result.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const books = result.data.allBooks

  const genres = ['refactoring', 'horror', 'thriller', 'database']

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
          {books && books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author?.name || 'Unknown Author'}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map(genre => (
        <button key={genre} onClick={() => {
          setFilter(genre);
          result.refetch({
            refetchQueries: [{ query: ALL_BOOKS, variables: { genre: filter } }],
          });
        }}>{genre}</button>
      ))}
       <button onClick={() => {
        setFilter('')
        }
        }>all books</button>
    </div>
  )
}

export default Books