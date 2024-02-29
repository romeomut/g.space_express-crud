const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const taskSchema = new Schema({
    text:{
        type: 'string',
        require: [true, 'Task description is require']
    },
    isCompleted:{
        type: 'boolean',
        default: false
    }
})

const Task = mongoose.model('Task', taskSchema)

module.exports = {
    Task
}