
const Header = (props) => {
    console.log(props)
    return (
        <h1>
            {props.otsikko.name}
        </h1>
    )
}

const Part = (props) => {
    console.log(props)
    return (
        <p>
            Osio: {props.osio.name} - tehtavia: {props.osio.exercises}
        </p>
    )
}

const Content = (props) => {
    console.log(props)
    return (
        <div>
            <Part osio={props.osiot.parts[0]} />
            <Part osio={props.osiot.parts[1]} />
            <Part osio={props.osiot.parts[2]} />
        </div>
    )
}

const Total = (props) => {
    console.log(props)
    return (
        <p>
            Totaali tehtävämäärä = {props.totaali.parts[0].exercises + props.totaali.parts[1].exercises + props.totaali.parts[2].exercises}
        </p>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header otsikko={course} />
            <Content osiot={course} />
            <Total totaali={course} />
        </div>
    )
}

export default App