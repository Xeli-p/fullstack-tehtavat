import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
      notificationChange(state, action) {
        return action.payload
      }
    }
})

export const {notificationChange} = notificationSlice.actions

export const changeNotification = (content, time) => {
  const timeout = time * 1000
  return async dispatch => {
    dispatch(notificationChange(content))
    setTimeout(() => {
      dispatch(notificationChange(''))
    }, timeout)
  }
}

export default notificationSlice.reducer