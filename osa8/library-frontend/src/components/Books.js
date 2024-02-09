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
    variables: { genre: filter },
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const books = result.data.allBooks

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
      <button onClick={() => setFilter('refactoring')}>refactoring</button> 
      <button onClick={() => setFilter('horror')}>horror</button> 
      <button onClick={() => setFilter('thriller')}>thriller</button> 
      <button onClick={() => setFilter('database')}>database</button> 
      <button onClick={() => setFilter('')}>all genres</button> 
    </div>
  )
}

export default Books