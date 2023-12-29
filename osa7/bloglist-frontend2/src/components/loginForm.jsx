import Notification from './Notification'
import { useDispatch } from 'react-redux'
import { login2 } from '../reducers/userReducer'
import { Typography, TextField, Button, Box } from '@mui/material'

const LoginForm = () => {

  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    
    const username = event.target.username.value;
    const password = event.target.password.value;
    
    dispatch(login2(username, password))
  }

  return (
    <div>
 <Box mt={5}>
        <Typography variant="h5">Log in to application</Typography>
        <form onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="Username"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Password"
            label="Password"
            type="password"
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: '1rem' }}
          >
            Log In
          </Button>
        </form>
      </Box>
    </div>
  )
}

export default LoginForm
