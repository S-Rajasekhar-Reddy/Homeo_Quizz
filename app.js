const express=require('express');
const mysql = require('mysql2');
app=express();

app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'Project_Homeo'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

app.post('/login',(req, res)=>{
    const {username,password,type}=req.body;
    console.log(username,password,type);
    connection.query('SELECT * FROM credentials where Username=\''+username+'\'', (err, results) => {    
        if (err) {
          console.error('Error executing query:', err);``
          res.status(500).send('Error retrieving data from database');
          return;
        }
        if(password!=results[0].Password&&type!=results[0].Account_Type){
          console.error('Incorrect Password');
          res.status(400).send('invalid credentials');
        }
        res.status(200).json(results);
      });    
});

app.get('/studentDetails', (req,res)=>{
    connection.query('SELECT * FROM Student_Details', (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).send('Error retrieving data from database');
          return;
        }
        res.json(results);
      });    
});

app.post('/createQuiz',(req,res)=>{
  const data=req.body;
  console.log(data);
  connection.query('', (results)=>{
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error retrieving data from database');
      return;
    }
    res.json(results);
  });
});

app.post('/addQuizData',(req,res)=>{
  const data=req.body;
  connection.query('', (results)=>{
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error retrieving data from database');
      return;
    }
    res.json(results);
  });
});

app.get('/access', (req,res)=>{
    const data=req.body;
    connection.query('',(err,results)=>{
      if(err){
        console.error('Error executing query:',err);
        res.status(500).send('Error updating student access');
        return;
      }
      res.json(results);
    });
});

app.get('/studentQuizDetails',(req,res)=>{
  connection.query('',(err,results)=>{
    if(err){
      console.error('Error executing query:',err);
      res.status(500).send('Error updating student access');
      return;
    }
    res.json(results);
  });
});

app.post('/signup', (req,res)=>{
    const data=req.body;
    connection.query("INSERT INTO credentials(Username, Email , Pwd, Account_type) VALUES ('def', 'def@gmail.com', 'def', 't')",(err, results)=>{
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error retrieving data from database');
            return;
          }
          res.json(results);
    });
});

app.listen(4000, ()=>{
    console.log("port 4000");
});