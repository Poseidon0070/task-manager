const mongoose = require('mongoose')

const Schema = mongoose.Schema

const taskSchema = Schema({
    title : String,
    date : String,
    description : String,
    complete : String,
    order : Number
})

module.exports = new mongoose.model('Task',taskSchema)