interface CourseName {
  name: string
}

interface Total {
  total: number;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartWDesc {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartWDesc {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartWDesc extends CoursePartBase {
  description: string;
}

interface CoursePartSpec extends CoursePartWDesc {
  requirements: string[];
  kind: "special"
}

interface Course {
  course: CoursePart;
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpec;

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Header = (props: CourseName): JSX.Element => {
  return (
    <h1>{props.name}</h1>
  )
}

const Content = ({courseParts}: {courseParts: CoursePart[]}): JSX.Element => {
  return (
    <div>
      {courseParts.map((course) => (
        <Part key={course.name} course={course} />
      ))}
    </div>
    )
}

const Total = (props: Total): JSX.Element => {
  return (
    <p>Total amount of exercises: {props.total}</p>
  )
}

const Part = ({course}: Course): JSX.Element => {

  switch (course.kind) {
    case "basic":
      return (
        <div>
        <h3>{course.name} {course.exerciseCount}</h3>
        <p>description: {course.description}</p>
        </div>
      )
      case "group":
        return (
          <div>
          <h3>{course.name} {course.exerciseCount}</h3>
          <p>group project count: {course.groupProjectCount}</p>
          </div>
        )
      case "background":
        return (
          <div>
          <h3>{course.name} {course.exerciseCount}</h3>
          <p>background material: {course.backgroundMaterial}</p>
          <p>description: {course.description}</p>
          </div>
        )
        case "special":
          return (
            <div>
            <h3>{course.name} {course.exerciseCount}</h3>
            <p>description: {course.description}</p>
            <p>requirements: {course.requirements.map((req, index) => <span key={index}> {req}</span>)}</p>
            </div>
          )
      default:
        return assertNever(course);
        break;
  }
  
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    },
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;