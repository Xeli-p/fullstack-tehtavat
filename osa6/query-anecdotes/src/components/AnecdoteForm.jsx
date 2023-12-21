import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {

  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAne) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    String(content).length < 5 ? (
      notificationDispatch({type: 'NOTI', payload: `Anecdote too short, must me at least 5 characters`}),
      setTimeout(() => {
        notificationDispatch({type: 'ZERO'})
      }, 5000)
      ) : (
        newAnecdoteMutation.mutate({ content, votes: 0 }),
        notificationDispatch({type: 'NOTI', payload: `added: ${content}`}),
        setTimeout(() => {
          notificationDispatch({type: 'ZERO'})
        }, 2000)
      )
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
