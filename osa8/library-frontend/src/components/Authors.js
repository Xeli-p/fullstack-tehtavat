import { gql, useQuery, useMutation} from '@apollo/client'
import { useState } from 'react'

const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      bookCount
    }
  }
`

const EDIT_AUTHOR = gql`
  mutation editAnAuthor($name: String!, $born: Int!) {
    editAuthor (
      name: $name,
      setBornTo: $born
    ) {
      name
      born
    }
  }
`


const Authors = (props) => {

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [editAnAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const token = localStorage.getItem('userToken')

  const submit = async (event) => {
    event.preventDefault()

    const editedUser = await editAnAuthor({ variables: { name, born } })
    console.log(editedUser)

    setName('')
    setBorn('')
  }

  const result = useQuery(ALL_AUTHORS)

  if (result.loading)  {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {token ? (
      <div>
      <h3>Set birthyear</h3>
        <form onSubmit={submit}>
          <div>
            name
            <select
              value={name}
              onChange={({ target }) => setName(target.value)}
            >
              <option value="" disabled>Select an author</option>
              {authors.map((a) => (
                <option key={a.name} value={a.name}>{a.name}</option>
              ))}
            </select>
          </div>
          <div>
            born
            <input
              value={born}
              onChange={({ target }) => setBorn(parseInt(target.value))}
            />
          </div>
          <button type="submit">edit number</button>
        </form>
      </div>
      ) : null}
    </div>
  )
}

export default Authors
