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
    description: req.body.description
  };

  try {
    const data = await fs.readFile(path.join(__dirname, '/db/database.txt'), 'utf-8');
    const parsedData = await JSON.parse(data);

    parsedData.push(newTask);

    const response = await fs.writeFile(path.join(__dirname, '/db/database.txt'), JSON.stringify(parsedData));

    console.log('Task added successfully');
    return res.json(response)
  } catch (err) {  
    console.error(err);  
    res.status(500).send('Internal Server Error');
  }
});  

app.put('/sendTask', async(req, res) => {
  const tasks = req.body 
  try{
    await fs.writeFile(path.join(__dirname, '/db/database.txt'), JSON.stringify(tasks))
  } catch (err) { 
    console.error(err); 
    res.status(500).send('Internal Server Error');
  }
})
 
app.get('/getTask', async(req, res) => { 
  try{
    const data = await fs.readFile(__dirname+'/db/database.txt', 'utf-8');
    const parsedData = await JSON.parse(data);
    console.log(parsedData)
    return res.json(parsedData); 
  }catch(err){
    console.log("cannot send data")
    throw err
  } 
})  

app.get('/deleteItem/:itemId', async(req, res) => {
    const _id = req.params._id
    const data = await fs.readFile(__dirname + '/db/database.txt', 'utf-8');
    const tasks = JSON.parse(data);
    const newTasks = tasks.filter((task) => task._id.toString() !== _id.toString())
    console.log(newTasks)
    // res.json(newTasks)
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

