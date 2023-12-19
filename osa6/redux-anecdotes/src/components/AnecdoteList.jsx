import {voteAnecdote} from '../reducers/anecdoteReducer'
import {changeNotification} from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {

    const dispatch = useDispatch()
    const anecdotes = useSelector(state => 
      state.anecdotes.filter(ane => ane.content.includes(state.filter))
    )

    const vote = (id) => {
      dispatch(voteAnecdote(id)) 
      dispatch(changeNotification(`Voted for id:${id}`, 2))
    }

    return(
        <div>
        <h2>Anecdotes</h2>
          {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes} votes
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
          )}
        </div>
    )
}

export default AnecdoteList