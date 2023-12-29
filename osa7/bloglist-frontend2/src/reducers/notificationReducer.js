import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
      notificationChange(state, action) {
        return action.payload
      },
      zero(state, action) {
        return ''
      }
    }
})

export const {notificationChange, zero} = notificationSlice.actions

export const changeNotification = (content) => {
  return async dispatch => {
    dispatch(notificationChange(content))
    setTimeout(() => {
      dispatch(zero())
    }, 3000)
  }
}

export default notificationSlice.reducer