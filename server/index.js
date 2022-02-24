const express = require('express');
const path = require('path');

var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'b05939a25b5948ae8b35c5f1652e4c8e',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!');

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
})

let students = []

app.post('/api/student', (req, res)=>{
  let {name} = req.body
  name = name.trim()

  const index = students.findIndex(studentName=> studentName === name)

  if(index === -1 && name !== ''){
      students.push(name)
      rollbar.log('Student added successfully', {author: 'Scott', type: 'manual entry'})
      res.status(200).send(students)
  } else if (name === ''){
      rollbar.error('No name given')
      res.status(400).send('must provide a name.')
  } else {
      rollbar.error('student already exists')
      res.status(400).send('that student already exists')
  }

})

app.use(rollbar.errorHandler())


const port = process.env.PORT || 4545
app.listen(port, () => console.log(`Battleship docking at port ${port}!`));