import { useState } from 'react'

const Statistics = (props) => {
    console.log(props)

    let g = props.g
    let b = props.b
    let n = props.n

    let all = g + n + b
    let avg = (g - b)/(g + b + n)
    let pos = ((g)*100)/(g + b + n)

    console.log(g)
    console.log(b)
    console.log(n)

    if(g + n + n === 0) {
        return (
            <div>
                press the buttons to begin
            </div>
        )

    }
    return (
        <table>
            <tbody>
            <StatisticLine text="good: " value ={g} />
            <StatisticLine text="bad: " value ={b} />
            <StatisticLine text="neutral: " value ={n} />
            <StatisticLine text="all: " value ={all} />
            <StatisticLine text="average: " value ={avg} />
            <StatisticLine text="pos: " value ={pos} />
            </tbody>
        </table>

    )
}

const StatisticLine = ({text, value}) => {
    console.log(text)
    console.log(value)

    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

    return (
      <div>
          <h1>Give feedback</h1>
          <Button handleClick={() => setGood(good +1)} text="Good" />
          <Button handleClick={() => setNeutral(neutral +1)} text="Neutral" />
          <Button handleClick={() => setBad(bad +1)} text="Bad" />
          <h1>Statistics</h1>
          <Statistics g={good} b={bad} n={neutral} />
      </div>
  )
}

export default App