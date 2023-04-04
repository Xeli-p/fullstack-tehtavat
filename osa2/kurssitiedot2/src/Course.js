const Course = ({course}) => {

    const Header = () => {
        console.log("headerin näkymä: ", {course} )
        return(
            <h2> {course.name} </h2>
        )
    }

    const Content = () => {
        console.log("contentin näkymä: ", {course} )

        const Total = ({parts}) => {
            console.log("totaalin näkymä: ", {parts} )
            const total = parts.reduce(function (sum, current) {
                    console.log( "totalin reducen sisällä: ", {sum}, {current})
                    return (
                        sum + current.exercises)
                },0
            )
            return(
                <h3>
                    a total of {total} excersises
                </h3>
            )
        }

        const Part = ({part}) => {
            console.log("partsin näkymä: ", {part} )
            return(
                <p>
                    {part.name} {part.exercises}
                </p>
            )
        }

        return(
            <>
                {course.parts.map(part =>
                    <Part key={part.id} part={part} />
                )}
                <Total parts={course.parts}/>
            </>

        )
    }

    return(
        <>
            <Header  />
            <Content />
        </>
    )
}

export default Course