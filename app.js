const express=require('express');
const cors = require('cors');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const CryptoJS = require('crypto-js');

app=express();

dotenv.config();

// Enable CORS for all routes and origins
app.use(cors());

app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'project_homeo'
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
    const username=req.body.username;
    const password=decryptPassword(req.body.password);
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
        else if(results[0].Account_type=='s'){
          const token = generateAccessToken({ username: username });   
          connection.query('SELECT * FROM student_details where id=\''+results[0].Id+'\'', (err, newResults) => {
            if (err) {
              console.error('Error executing query:', err);
              res.status(500).send('Error retrieving data from database');
              return;
            }
            res.status(200).send({"studentName":newResults[0].Student_Name,"studentId":newResults[0].Id,"Account_type":results[0].Account_type,"token":token});
              
        });
        }
        else{
          const token = generateAccessToken({ username: username });   
          res.status(200).send({'login':'true',"token":token});
        }        
      });    
});

app.get('/signout',(res,req)=>{
    connection.end();
    res.status(200).send('successfully logged out')
});

app.get('/getStudentDetails', (req,res)=>{
  const token =req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(401)
                .json(
                    {
                        success: false,
                        message: "Error!Token was not provided."
                    }
                );
              }
    connection.query('SELECT * FROM Student_Details', (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).send('Error retrieving data from database');
          return;
        }
        res.json(results);
      });    
});

app.get('/getStudentDetails/:studentId', (req,res)=>{
  const token =req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(401)
                .json(
                    {
                        success: false,
                        message: "Error!Token was not provided."
                    }
                );
              }
  const studentId=req.params.studentId;
  connection.query('SELECT * FROM Student_Details where Id='+studentId, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error retrieving data from database');
        return;
      }
      res.json(results);
    });
});

app.post('/updateStudentDetails/:studentId', (req,res)=>{
  const token =req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(401)
                .json(
                    {
                        success: false,
                        message: "Error!Token was not provided."
                    }
                );
              }
  const studentId=req.params.studentId;
  const data=req.body;
  connection.query('UPDATE Student_Details set Email='+data.email+',PhoneNum='+data.phoneNum+'where Id='+studentId, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error retrieving data from database');
        return;
      }
      res.status(200).send({"status":'Student Details Updated'});
    });
});

app.post('/createQuiz',(req,res)=>{
  const token =req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(401)
                .json(
                    {
                        success: false,
                        message: "Error!Token was not provided."
                    }
                );
              }
  const data=req.body;
  const query ='CREATE TABLE '+ data.quizName +'('
    +'Question_Number int NOT NULL AUTO_INCREMENT,\n'
    +'Question varchar(255),\n'
    +'Option1 varchar(255),\n'
    +'Option2 varchar(255),\n'
    +'Option3 varchar(255),\n'
    +'Option4 varchar(255),\n'
    +'Correct_Answer varchar(255),\n'
    +'PRIMARY KEY (Question_Number))';
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
  results=[];
  for ( const item of data.questionList){
    results.push(runQuery(data.quizName, item));
  }
  connection.query('SELECT * FROM '+data.quizName, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error retrieving data from database');
      return;
    }
    res.status(200).json(results);
  });
});

app.post('/updateQuiz',(req,res)=>{
  const token =req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(401)
                .json(
                    {
                        success: false,
                        message: "Error!Token was not provided."
                    }
                );
              }
  const data=req.body;
  connection.query('UPDATE '+data.quizName+' SET Question=?,Option1=?,Option2=?,Option3=?,Option4=?,Correct_Answer=? WHERE Question_Number=?',[data.question,data.option1,data.option2,data.option3,data.option4,data.correctAnswer,data.questionNumber],(err)=>{
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error updating quiz data in database');
      return;
    }
  });
  connection.query('SELECT * FROM '+data.quizName, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error retrieving data from database');
      return;
    }
    res.status(200).json(results);
  });
});

app.get('/getQuizes',(req,res)=>{
  const token =req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(401)
                .json(
                    {
                        success: false,
                        message: "Error!Token was not provided."
                    }
                );
              }
  connection.query('SELECT * FROM quiz_index', (err,results) => {
    if(err) {
      console.error('Error retrieving data');
      res.status(500).send('Error retrieving data from database');
      return;
    }
    res.status(200).json(results);
  });
});

app.get('/getQuizes/:quizName',(req,res)=>{
  const token =req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(401)
                .json(
                    {
                        success: false,
                        message: "Error!Token was not provided."
                    }
                );
              }
  const quizName=req.params.quizName;
  connection.query('SELECT * FROM '+quizName, (err,results) => {
    if(err) {
      console.error('Error retrieving data');
      res.status(500).send('Error retrieving data from database');
      return;
    }
    res.status(200).json(results);
  });
});

app.get('/getStudentAccessList', (req,res)=>{
  const token =req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(401)
                .json(
                    {
                        success: false,
                        message: "Error!Token was not provided."
                    }
                );
              }
  connection.query('SELECT * FROM student_access',(err,results)=>{
    if(err){
      console.error('Error executing query:',err);
      res.status(500).send('Error getting student access details');
      return;
    }
    res.status(200).json(results);
  });
});

app.post('/updateAccess', (req,res)=>{
  const token =req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(401)
                .json(
                    {
                        success: false,
                        message: "Error!Token was not provided."
                    }
                );
              }
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
  const token =req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(401)
                .json(
                    {
                        success: false,
                        message: "Error!Token was not provided."
                    }
                );
              }
  connection.query('SELECT * FROM student_grade',(err,results)=>{
    if(err){
      console.error('Error executing query:',err);
      res.status(500).send('Error getting student grade details');
      return;
    }
    res.json(results);
  });
});

app.get('/studentGrades/:studentId',(req,res)=>{
  const token =req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(401)
                .json(
                    {
                        success: false,
                        message: "Error!Token was not provided."
                    }
                );
              }
  const studentId=req.params.studentId;
  connection.query('SELECT * FROM student_grade where Id='+studentId, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error retrieving data from database');
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
    id=null;
    connection.query("INSERT INTO credentials(Username, Email , Pwd, Account_type) VALUES (?,?,?,'s')",data.username,data.email,data.password,(err,results)=>{
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error retrieving data from database');
            return;
          }
          id=results[0].Id;
    });
    connection.query("INSERT INTO Student_details(Id, Username, Email , First_Name, Last_Name, Student_Name, PhoneNum) VALUES (?,?,?,?,?,?,?)",id,data.username,data.email,data.firstName,data.lastName,data.fullName,data.phoneNum,(err)=>{
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error retrieving data from database');
            return;
          }
    });
    connection.query('SELECT * FROM Student_details where credentials=\''+id+'\'', (err) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error retrieving data from database');
        return;
      }
      res.status(200).send({'status':'Account Created Successfully!'});
    });
    connection.end();
});

app.get('/getQuizDetails/:studentId',(req,res)=>{
  const token =req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(401)
                .json(
                    {
                        success: false,
                        message: "Error!Token was not provided."
                    }
                );
              }
  const studentId=req.params.studentId;
  quizList=[];
  studentQuizTable=[];
  connection.query('SELECT * FROM student_grade where Id='+studentId, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error retrieving data from database');
        return;
      }
      studentQuizTable=results;
    });
  connection.query('SELECT * FROM quiz_index', (err,results) => {
    if(err) {
      console.error('Error retrieving data');
      res.status(500).send('Error retrieving data from database');
      return;
    }
    quizList=results;
  });
  res.status(200).send({"quizList":quizList,"studentQuizTable":studentQuizTable});
});

app.post('/studentQuizSubmit',(req,res)=>{
  const token =req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(401)
                .json(
                    {
                        success: false,
                        message: "Error!Token was not provided."
                    }
                );
              }
  const data=req.body;
  userName='';
  studentName='';
  connection.query('SELECT * FROM student_details where id=\''+data.studentId+'\'', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error retrieving data from database');
      return;
    }
    userName=results[0].Username;
    studentName=results[0].Student_Name;
  });
  connection.query('INSERT INTO student_grade(Id,Username,Student_Name,Quiz_Number,Quiz_Name,Grade,Max_Grade,Date_Attempted) VALUES (?,?,?,?,?,?,?,?)',data.studentId,data.quizNumber,data.quizName,data.grade,data.maxGrade,data.date,(err)=>{
    if(err){
      console.error('Error executing query:',err);
      res.status(500).send('Error submitting quiz');
      return;
    }
    res.status(200).send({"message":"Quiz Submitted"});
  });
});

app.listen(4000, ()=>{
    console.log("port 4000");
});

function runQuery(tableName, item){
  connection.query('INSERT INTO '+tableName+'(Question,Option1,Option2,Option3,Option4,Correct_Answer) VALUES (?,?,?,?,?,?)',[item.question,item.option1,item.option2,item.option3,item.option4,item.correctAnswer] ,(err,results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error retrieving data from database');
      return;
    }
    return results;
});
  return;
}

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '5400s' });
}

function decryptPassword(password){
  const bytes  = CryptoJS.AES.decrypt(password, process.env.TOKEN_SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
}