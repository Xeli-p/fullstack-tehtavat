import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload.content
      state.push({
        content,
        id: getId(),
        votes: 0
      })
    },
    addVote(state, action) {
      const id = action.payload
      const aneToChange = state.find(n => n.id === id)
      const changedAne = { 
        ...aneToChange, 
        votes: aneToChange.votes + 1
      }
      return state.map(ane =>
        ane.id !== id ? ane : changedAne
      ).sort((a, b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload.sort((a, b) => b.votes - a.votes)
    }
  }
})

export const {createAnecdote, addVote, appendAnecdote, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdote2 = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(anecdote))
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const anecdote = await anecdoteService.vote(id)
    dispatch(addVote(anecdote.data.id))
  }
}

export default anecdoteSlice.reducer