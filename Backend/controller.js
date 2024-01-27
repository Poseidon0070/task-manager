const mongoose = require('mongoose')
const Task = require('./model')

exports.addTask = async (req, res) => {
    const newTask = new Task({
        title: req.body.title,
        date: req.body.date,
        description: req.body.description,
        complete: req.body.complete,
        order: Date.now()
    })
    newTask.save()
        .then((result) => {
            return res.status(200).json('Task created successfully')
        })
        .catch(err => {
            console.log('Cannot create task')
            res.status(500).send('Internal Server Error')
        })
}

exports.getTask = async (req, res) => {
    Task.find().sort({ order: 1 })
        .then((tasks) => {
            return res.status(200).json(tasks)
        })
        .catch(err => {
            console.log('Cannot send tasks')
            res.status(500).send('Internal Server Error')
        })
}

exports.deleteTask = async(req, res) => {
    const taskId = req.params.taskId
    Task.findByIdAndDelete(taskId)
    .then(result => {
      res.status(200).json('Task deleted successfully')
    })
    .catch(err => {
      console.error('Cannot delete task');
      res.status(500).send('Internal Server Error');
    })
  }

exports.reorderTask = async (req, res) => {
    try{
      const task1 = await Task.findById(req.body.sourceId);
      const task2 = await Task.findById(req.body.destinationId);
    //   console.log(task1, task2)
      const tempOrder = task1.order;
      task1.order = task2.order;
      task2.order = tempOrder;
      
      await task1.save();
      await task2.save();
    //   console.log(task1, task2)
      res.status(200).json('Task reordered successfully')
    }catch(err){
      console.error('Cannot reorder task');
      res.status(500).send('Internal Server Error');
    }
  }

exports.checkTask = async(req, res) => {
    try{
      const taskId = req.body.taskId
      const isCheck = req.body.isCheck
      const task = await Task.findById(taskId)
      if (!task) {
          return res.status(404).json({ error: 'Task not found' });
      }
      task.complete = isCheck ? "1" : "0";
      await task.save();
      return res.status(200).json({ message: 'Task updated successfully' });
    }catch(err){
      console.error('Cannot update task');
      res.status(500).send('Internal Server Error');
    }
  
  }