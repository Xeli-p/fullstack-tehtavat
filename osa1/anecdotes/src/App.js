import { useState } from 'react'

const Button = ({handleClick, text}) => {
    console.log({handleClick}, {text})
    return(
        <button onClick = {handleClick}>
            {text}
        </button>
    )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(new Array(8).fill(0))

    const vote = () => {
        const newVotes = [...votes]
        newVotes[selected] += 1
        setVote(newVotes)
        console.log(newVotes[selected])
    }

    const most = votes.indexOf(Math.max(...votes))

  return (
      <div>
          <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}</p>
        <p>{votes[selected]}</p>
        <button onClick={vote}>Vote </button>
        <Button handleClick={() => setSelected((0 + Math.floor(Math.random()* 8)))} text="random" />
          <h1>Anecdote with the most votes</h1>
          <p>votes : {votes[most]}</p>
          <p>{anecdotes[most]}</p>
      </div>
  )
}

export default App