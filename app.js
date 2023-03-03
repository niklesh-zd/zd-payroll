"use strict";
require('./app/utils/mongooseConnecter.util')
const express = require("express");
const app = express();
const pdf_genearation = require("./pdf_generator/pdfGenerator")

const cors = require('cors');
app.use(cors())
require('dotenv').config();

app.get("/", (req, res) => {
  res.send("Welcome every one....")
});

const bodyparser = require('body-parser');
app.use(bodyparser.json());
     
app.use("/emp", require("./app/routes/Employ/Employ.route"));
app.use("/Emp_Leave",require("./app/routes/Employ/Leave.route"))
app.use("/Emp_Salary",require("./app/routes/Employ/Salary.route"))
app.use("/Holiday",require("./app/routes/Employ/Holiday.route"))


app.get('/slip', (req, res) =>{
  res.sendFile(__dirname + '/pdf_generator/salarySlip.html')
})


app.post('/slip', (req, res) =>{
  pdf_genearation()
  console.log("button clicked")
  res.send("file downloaded successfully")
})

const port = 7071;

// Server start
app.listen(port, () =>
  console.log(`Server is running on http://0.0.0.0:${port}`)
);


