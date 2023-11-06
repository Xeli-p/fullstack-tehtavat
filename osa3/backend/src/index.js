const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

let notes = [
    {
        id: 1,
        name: "Molecule Man",
        phone: 298538389
    },
    {
        id: 2,
        name: "Herkko",
        phone: 8569465348
    },
    {
        id: 3,
        name: "Pirkko",
        phone: 864365235
    },
    {
        id: 4,
        name: "Johannes",
        phone: 3578835857
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)

    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

app.post('/api/notes', (request, response) => {
    const note = request.body

    if (!note.name || !note.phone) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    if ((notes.filter(singlenote => singlenote.name === note.name).length) > 0 ){
        return response.status(400).json({
            error: 'name already in phonebook'
        })
    }


    note.id = Math.round(Math.random() * 5000000)

    notes = notes.concat(note)

    console.log(note)
    response.json(note)
})

app.get('/info', (req, res) => {
    const time = new Date()
    time.getTime()
    const resp = `<p>Phonebook has info for ${notes.length} people</p> <p>${time}</p> `
    res.send(resp)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
