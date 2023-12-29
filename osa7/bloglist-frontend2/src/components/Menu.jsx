import { useSelector, useDispatch } from "react-redux"
import { zeroUser2 } from "../reducers/userReducer"
import { Link } from "react-router-dom"
import { AppBar, Toolbar, Button, Typography } from '@mui/material'

const Menu = () => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.user)

    if(!user) return null

    return (
        <div>
            <AppBar position="static">
              <Toolbar>
                <Button color="inherit" component={Link} to="/">
                  Home
                </Button>
                <Button color="inherit" component={Link} to="/blogs">
                  Blogs
                </Button>
                {user ? (
                  <>
                    <Typography color="inherit" style={{ marginLeft: 'auto' }}>
                      {user.name} logged in
                    </Typography>
                    <Button color="inherit" onClick={() => dispatch(zeroUser2())}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button color="inherit" component={Link} to="/login" style={{ marginLeft: 'auto' }}>
                    Login
                  </Button>
                )}
              </Toolbar>
            </AppBar>
        </div>
      )
}

export default Menu