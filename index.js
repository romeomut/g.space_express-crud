const express = require("express")
const bodyParse = require("body-parser")
const app = express()

//

const sqlite3 = require('sqlite3').verbose()
const dbName = 'tasks.db'
const db = new sqlite3.Database(dbName)

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

const checkExist = (task, id, res) => {
    if (!task) {
        return res.status(404).json({message: `not found task with id ${id}`})
    }
}

const serverError = (err, res) => {
    if(err){
        return res.status(500).json({error: err.message})
    }
}

//////////////////////////////////////

app.get('/', (req, res) =>{
    res.send('Express')
})

//

app.get('/tasks', (req, res) =>{
    //array
    //res.status(200).json(tasks)

    //db
    db.all('SELECT * FROM tasks', (err, rows) =>{      
        serverError(err, res)
        return res.status(200).json(rows)
    })
})

//

app.post('/tasks', (req, res) =>{
    const newTask = req.body
    
    //array
    //tasks.push(newTask)
    //res.status(201).json(newTask)

    //db
    db.run('INSERT INTO tasks (text) VALUES (?)', [newTask.text], (err) => {
        serverError(err, res)
        return res.status(201).json({id: this.lastID})
    })

})

//

app.get('/tasks/:id', (req, res) =>{
    const taskId = parseInt(req.params.id)

    //array
    //const foundTask = tasks.find((e) => e.id === taskId)
    //checkExist(foundTask, taskId, res)
    //return res.status(200).json(foundTask)

    //bd
    db.get('SELECT * FROM tasks WHERE id = ?', taskId, (err, row) => {
        serverError(err, res)
        checkExist(row, taskId, res)
        return res.status(200).json(row)
    })  
})

//

app.put('/tasks/:id', (req, res) =>{
    const updateTask = req.body
    const taskId = parseInt(req.params.id)

    //array
    //const foundTask = tasks.find((e) => e.id === taskId)
    //checkExist(foundTask, taskId, res)
    //foundTask.text = updateTask.text

    //bd
    db.run('UPDATE tasks SET text = ? WHERE id = ?', [updateTask.text, taskId], (err) =>{
        serverError(err, res)
        return res.status(200).json({id: taskId, text: updateTask.text})
    })
})

//

app.delete('/tasks/:id', (req, res) =>{
    const taskId = parseInt(req.params.id)

    //array
    //tasks = tasks.filter((e) => e.id !== taskId)
    //return res.status(204).json(tasks)

    //db
    db.run('DELETE FROM tasks WHERE id = ?', taskId, (err) => {
        serverError(err, res)
        return res.status(204).send()
    })
})

//////////////////////////////////////

app.listen(port, ()=>{
    console.log(`Server starting on http://localhost:${port}`);
})