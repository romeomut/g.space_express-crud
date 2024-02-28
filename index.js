const express = require("express")
const bodyParse = require("body-parser")
const app = express()

const port = 3000

let tasks = [
    {
        id: 1,
        text: 'go to shop'
    },    
    {
        id: 2,
        text: 'buy car'
    },    
    {
        id: 3,
        text: 'go for a run'
    },    
    {
        id: 4,
        text: 'read book'
    },    
    {
        id: 5,
        text: 'call mom'
    },
]

app.use(bodyParse.json())

//////////////////////////////////////

const checkExist = (task, id, res) =>{
    if (!task) {
        return res.status(404).json({message: `not found task with id ${id}`})
    }
}

//////////////////////////////////////

app.get('/', (req, res) =>{
    res.send('Express')
})

//

app.get('/tasks', (req, res) =>{
    res.status(200).json(tasks)
})

//

app.post('/tasks', (req, res) =>{
    const newTask = req.body
    tasks.push(newTask)
    res.status(201).json(newTask)
})

//

app.get('/tasks/:id', (req, res) =>{
    const taskId = parseInt(req.params.id)

    const foundTask = tasks.find((e) => e.id === taskId)

    checkExist(foundTask, taskId, res)

    return res.status(200).json(foundTask)
})

//

app.put('/tasks/:id', (req, res) =>{
    const updateTask = req.body
    const taskId = parseInt(req.params.id)

    const foundTask = tasks.find((e) => e.id === taskId)

    checkExist(foundTask, taskId, res)

    foundTask.text = updateTask.text

    return res.status(200).json(foundTask)
})

//

app.delete('/tasks/:id', (req, res) =>{
    const taskId = parseInt(req.params.id)

    tasks = tasks.filter((e) => e.id !== taskId)

    return res.status(204).json(tasks)
})

//////////////////////////////////////

app.listen(port, ()=>{
    console.log(`Server starting on http://localhost:${port}`);
})