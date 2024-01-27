require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const taskController = require('./controller')
const app = express()
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/addTask', taskController.addTask)

app.get('/getTask', taskController.getTask)

app.delete('/deleteTask/:taskId', taskController.deleteTask)

app.post('/reorderTask', taskController.reorderTask)

app.post('/checkTask', taskController.checkTask)

mongoose.connect(`mongodb+srv://voldemorthyper:${process.env.DB_PASSWORD}@cluster0.lhwbha4.mongodb.net/tasks?retryWrites=true&w=majority`)
  .then(() => {
    app.listen(8080, () => console.log("Server running at 8080"))
})

