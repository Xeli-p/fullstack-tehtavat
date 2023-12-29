import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'


const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
      setUser(state, action) {
        return action.payload
      },
      zeroUser(state, action) {
        return null
      }
    }
})

export const { setUser, zeroUser } = userSlice.actions

export const setUser2 = (user) => {
    return async dispatch => {
        dispatch(setUser(user))
    }
}

export const zeroUser2 = () => {
    return async dispatch => {
        window.localStorage.removeItem('loggedBlogappUser')
        dispatch(zeroUser())
    }
}
 
export const checkForLogin = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          blogService.setToken(user.token)
          dispatch(setUser(user))
        }
    }
}

export const login2 = (username, password) => {
    return async dispatch => {
        const user = await loginService.login({
            username,
            password
        })
          window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
          dispatch(setUser(user))
    }
}



export default userSlice.reducer