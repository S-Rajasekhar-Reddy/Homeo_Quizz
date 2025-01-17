const express=require('express');
const cors = require('cors');
const mysql = require('mysql2');
app=express();

// Enable CORS for all routes and origins
app.use(cors());

app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'Project_Homeo'
});

app.post('/login',(req, res)=>{
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      res.status(500).send('Error Connecting to database')
      return;
    }
    console.log('Connected to MySQL database!');
  });
    const {username,password}=req.body;
    connection.query('SELECT * FROM credentials where Username=\''+username+'\'', (err, results) => {    
        if (err) {
          console.error('Error executing query:', err);``
          res.status(500).send('Error retrieving data from database');
          return;
        }
        if(results.length==0){
          console.error('Incorrect Username');
          res.status(400).send('invalid credentials');
          return;
        }
        else if(password!=results[0].Password){
          console.error('Incorrect Password');
          res.status(400).send('invalid credentials');
          return;
        }
        else
        res.status(200).json(results);
      });    
});

app.get('/signout',(res,req)=>{
    connection.end();
    res.status(200).send('successfully logged out')
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
  const query ='CREATE TABLE '+ data.quizName +'('
    +'Question_Number int,\n'
    +'Question varchar(255),\n'
    +'Option1 varchar(255),\n'
    +'Option2 varchar(255),\n'
    +'Option3 varchar(255),\n'
    +'Option4 varchar(255),\n'
    +'Correct_Answer varchar(255)'+');';
  connection.query(query,(err)=>{
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error creating table data in database');
      return;
    }
  });
  connection.query('INSERT INTO quiz_index (Quiz_Name) VALUES (?)',data.quizName, (err)=>{
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error entering data in database');
      return;
    }
  });
  connection.query('SELECT * FROM quiz_index where Quiz_Name=\''+data.quizName+'\'', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error retrieving data from database');
      return;
    }
    res.status(200).json(results);
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
    res.status(200).json(results);
  });
});

app.get('/getStudentAccessList', (req,res)=>{
  connection.query('SELECT * FROM student_access',(err,results)=>{
    if(err){
      console.error('Error executing query:',err);
      res.status(500).send('Error updating student access');
      return;
    }
    res.status(200).json(results);
  });
});

app.post('/updateAccess', (req,res)=>{
    const data=req.body;
    connection.query('UPDATE student_access SET status = ? WHERE student_id = ?',data.status,data.student_id,(err,results)=>{
      if(err){
        console.error('Error executing query:',err);
        res.status(500).send('Error updating student access');
        return;
      }
      res.status(200).send({"message":"student access updated"});
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
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      res.status(500).send('Error Connecting to database')
      return;
    }
    console.log('Connected to MySQL database!');
  });
    const data=req.body;
    connection.query("INSERT INTO credentials(student_name, Email , status) VALUES (?,?,'s')",data.username,data.email,'PENDING',(err)=>{
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error retrieving data from database');
            return;
          }
    });
    connection.query("INSERT INTO credentials(Username, Email , Pwd, Account_type) VALUES (?,?,?,'s')",data.username,data.email,data.password,(err)=>{
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error retrieving data from database');
            return;
          }
    });
    connection.query('SELECT * FROM quiz_index where credentials=\''+data.username+'\'', (err) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error retrieving data from database');
        return;
      }
      res.status(200).send({'status':'Account Created Successfully!'});
    });
    connection.end();
});

app.listen(4000, ()=>{
    console.log("port 4000");
});