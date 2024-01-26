const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs').promises

const app = express()
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
}); 
 

app.post('/addTask', async (req, res) => { 
  const newTask = {
    _id: req.body._id,  
    title: req.body.title,
    date: req.body.date,
    description: req.body.description,
    complete: req.body.complete
  };

  try {
    const data = await fs.readFile(path.join(__dirname, '/db/database.txt'), 'utf-8');
    let response;
    if(!data) {
      let data = []
      data.push(newTask)
      response = await fs.writeFile(path.join(__dirname, '/db/database.txt'), JSON.stringify(data))
    }else{
      const parsedData = await JSON.parse(data);
      parsedData.push(newTask);
      response = await fs.writeFile(path.join(__dirname, '/db/database.txt'), JSON.stringify(parsedData));
    }
    console.log('Task added successfully');
    return res.status(201).json(response)
  } catch (err) {  
    console.error(err);  
    res.status(500).send('Internal Server Error');
  }
});  

app.put('/sendTask', async(req, res) => {
  const tasks = req.body 
  try{
    await fs.writeFile(path.join(__dirname, '/db/database.txt'), JSON.stringify(tasks))
    return res.status(200).json({ message: 'Task sent successfully' })
  } catch (err) { 
    console.error(err); 
    res.status(500).send('Internal Server Error');
  }
})
 
app.get('/getTask', async(req, res) => { 
  try{
    const data = await fs.readFile(path.join(__dirname, '/db/database.txt'), 'utf-8');
    if(!data){
      return res.status(200).json([]);
    }else{
      const parsedData = await JSON.parse(data);
      console.log(parsedData)
      return res.status(200).json(parsedData); 
    }
  }catch(err){
    console.log("cannot get task")
    res.status(500).send('Internal Server Error');
  } 
})  

app.delete('/deleteTask/:taskId', async(req, res) => {
  try{
    const requiredId = req.params.taskId
    const data = await fs.readFile(path.join(__dirname, '/db/database.txt'), 'utf-8');
    const tasks = await JSON.parse(data);
    const requiredIndex = tasks.findIndex((task) => task._id.toString() === requiredId.toString())
    tasks.splice(requiredIndex, 1)
    console.log(requiredId, requiredIndex)
    console.log(tasks)
    await fs.writeFile(path.join(__dirname, '/db/database.txt'), JSON.stringify(tasks))
    return res.status(200).json({ message: 'Task deleted successfully' })
  }catch(err) {
    console.log("cannot delete task")
    res.status(500).send('Internal Server Error');
  } 
})


app.listen(8080, () => console.log("Server running at 8080"))

// on reading file we recieve data in the form of buffer not string right?
// Yes, when you read a file using Node.js fs module, the data is typically received in the form of 
// a Buffer if you don't specify an encoding. If you specify an encoding (e.g., 'utf-8'), then the data will be returned as a string.

// JSON.parse() is a JavaScript function that parses a JSON string and transforms it into a JavaScript object. JSON (JavaScript Object Notation)
// is a lightweight data interchange format. When you read a file containing JSON data, you often
// get a JSON-formatted string. Using JSON.parse() allows you to convert this string into a JavaScript object, so you can work with the data in your code.

// fs.readFile(__dirname, '/db/database.txt', 'utf-8') => data in the form of string
// res.json() does two things => ane wala json data ko body me as a js object dalta hai aur jane wale json object ko JSON format me convert krta ha
// You don't need to use JSON.stringify when sending the JSON response. The res.json method automatically converts the JavaScript object to JSON and 
// sets the appropriate Content-Type header.

