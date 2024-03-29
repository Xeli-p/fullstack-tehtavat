import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotificationDispatch } from './NotificationContext'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, vote } from './requests'

const App = () => {

  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const updateAnecdoteMutation = useMutation({
    mutationFn: vote, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const handleVote = (anecdote) => {
    console.log(anecdote)
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
    notificationDispatch({type: 'NOTI', payload: `voted for: ${anecdote.content}`})
    setTimeout(() => {
      notificationDispatch({type: 'ZERO'})
    }, 2000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const anecdotes = result.data

  if(!anecdotes) return (
    <div>
      problems with the getting process
    </div>
  )

  return (
      <div>
        <h3>Anecdote app</h3>

        <Notification />
        <AnecdoteForm />

        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
  )
}

export default App
