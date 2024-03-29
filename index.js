const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(bodyParser.json())
app.use(cors())

let notes = [
    {
        id: 1,
        content: "Katon kunnostus",
        date: "2019-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Tietokoneen kovalevyn osto",
        date: "2019-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: "Joulukuusi",
        date: "2019-05-30T19:20:14.298Z",
        important: true
    }
]

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1;
}


app.post('/notes', (req, res) => {

    const body = req.body

    if (!body.content) {
        return res.status(400).json({ error: 'content missing' })
    }
    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId(),
    }

    notes = notes.concat(note)//lisää olemassa olevaan "listaan" cutn paste
    console.log(note)
    res.json(note)
})
app.put('/notes/:id', (request, response) => {
    console.log("hello")
    const body = request.body
    const { id } = request.params
    console.log(id)
    console.log(body)
    const update = (body)

    const index = notes.findIndex(note => note.id == id)
    console.log(index)
    console.log(update)


    if (index >= 0) {
        notes[index] = { ...notes[index], ...update }
        response.status(200).send(notes[index])
    }


    else {
        update.id = generateId();
        notes = notes.concat(update)
        response.status(201).send(update)

    }





})


app.get('/', (req, res) => {
    res.send('<h1>Hello world!</h1>')
})

app.get('/notes', (req, res) => {
    res.json(notes)
})

app.get('/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    console.log(typeof id)
    const note = notes.find(note => note.id === id)
    if (note) {
        res.json(note)
    } else {
        res.status(404).end()
    }


})

app.delete('/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id !== id)
    res.status(204).end();
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})