import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(
      username: $username,
      password: $password,
    ) {
      token
    }
  }
`

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login] = useMutation(LOGIN)


  if (!props.show) {
    return null
  }


  const submit = async (event) => {

    event.preventDefault()
    /*
    console.log(`{ variables: { ${username}, ${password} } }`)

    const token = await login({ variables: { username, password } })
    console.log(token)

    setUsername('')
    setPassword('')
    */

    props.show = 'authors'
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">log in</button>
      </form>
    </div>
  )
}

export default Login