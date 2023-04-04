import { useState, useEffect } from 'react'
import axios from "axios";

const AddName = ({newName, phone, handleNewPersonChange, handlePhoneChange, addName}) => {
    return(
      <form onSubmit={addName}>
        <div>
          name: <input
            value={newName}
            onChange={handleNewPersonChange} />
        </div>
        <div>
          number: <input
            value={phone}
            onChange={handlePhoneChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Filter = ({filter, handler}) => {
  return(
      <form>
        <div>
          Filter shown with: <input
            onChange={handler}
            value={filter} />
        </div>
      </form>
  )
}

const Numbers = ({persons, filter}) => {
  console.log({persons})
  const filtered =
      persons.filter(person =>
          (person.name.toLowerCase().indexOf(filter.toLowerCase()) > -1) || (person.number.indexOf(filter) > -1)
      )

  return(
      filtered.map(person =>
          <p key={person.name}> {person.name} {person.number} </p>
      )
  )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [phone, setNewPhone] = useState('')
    const [filter, setFilter] = useState('')

    useEffect(() => {
        console.log('effect')
        axios
            .get('http://localhost:3001/db')
            .then(response => {
                console.log('promise fulfilled', response)
                setPersons(response.data.persons)
            })
    },[])

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    const nameObject = {
      name: newName,
      number: phone
    }

    const found = (person) =>  person.name === newName

    console.log(persons.findIndex(found))

    console.log('nameObject :', nameObject)
    if(persons.findIndex(found) > -1){
      console.log(persons.findIndex(found))
      alert( `${newName} already in phonebook` )
    }
    if(persons.findIndex(found) < 0) {
        axios
            .post('http://localhost:3001/persons', nameObject)
            .then(response => {
                console.log(response.data)
                setPersons(persons.concat(response.data))
            })
      /* setPersons(persons.concat(nameObject)) */
    }
  }

    const handleNewPersonChange = (event) => {
      event.preventDefault()
      console.log(event.target.value)
      setNewName(event.target.value)
    }

    const handlePhoneChange = (event) => {
      event.preventDefault()
    console.log(event.target.value)
      setNewPhone(event.target.value)
    }

    const handleFilterChange = (event) => {
      event.preventDefault()
    setFilter(event.target.value)
    }

  return (
      <div>
        <h1>Phonebook</h1>
        <Filter filter={filter} handler={handleFilterChange} />
        <h2>add a new person</h2>
        <AddName newName={newName} phone={phone} handleNewPersonChange={handleNewPersonChange} handlePhoneChange={handlePhoneChange} addName={addName}/>
        <h2>Numbers</h2>
        <Numbers persons={persons} filter={filter}/>
      </div>
  )

}

export default App