const express = require('express');
const app = express();
const mysql = require('mysql2')
const cors = require('cors')

app.use(cors())
app.use(express.json());

//setup connection to database
const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'Chewey607',
  database: 'examplesystem',
});

//When /create is used this data is created
app.post('/create', (req,res) => {
  //sizer table
  console.log(req.body)
  const site = req.body.site
  const location = req.body.location
  const numofusers = req.body.numofusers
  const totalamountofdata = req.body.totalamountofdata
  const estimatedgrowth = req.body.estimatedgrowth
  const averagefilesize = req.body.averagefilesize
  const numfiles = req.body.numfiles

//Adds the information using SQL into the MYSQL table
  db.query('INSERT INTO sizer (site, location, numofusers, totalamountofdata, estimatedgrowth, averagefilesize, numfiles) VALUES (?, ?, ?, ?, ?, ?, ?)',
  [site, location, numofusers, totalamountofdata, estimatedgrowth, averagefilesize, numfiles]), (err, result) => {
    if (err){
      console.log(err)
    } else {
      res.send("Values Inserted")
    }
  }
});

//When /delete is used
app.post('/delete', (req, res) => {
  const bodySite = req.body.deleteSite

  db.query("DELETE FROM sizer WHERE (site = ?)", [bodySite]), (err,result) => {
    if (err){
      console.log(err)
    } else {
      res.send("Values Deleted")
    }
  }
});

//Takes every table from the MYSql table
app.get('/getinfo', (req, res) => {
  db.query("SELECT * FROM sizer", (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    };
  });
});

//Lets me know the
app.listen(3001, ()=> {
  console.log("The server is running!")
});
