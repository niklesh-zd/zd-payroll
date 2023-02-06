"use strict";
require('./app/utils/mongooseConnecter.util')
const express = require("express");
const app = express();
const expressValidator = require('express-validator')
const pdf_genearation = require("./pdf_generator/pdfGenerator")

const cors = require('cors');
app.use(cors())
require('dotenv').config();

app.get("/", (req, res) => {
  res.send("Welcome every one....")
});

const bodyparser = require('body-parser');
app.use(bodyparser.json());
// Routes Or API's
// app.use(expressValidator())
// app.use(expressValidator);       
app.use("/emp", require("./app/routes/Employ/Employ.route"));
app.use("/Emp_Leave",require("./app/routes/Employ/Leave.route"))
app.use("/Emp_Salary",require("./app/routes/Employ/Salary.route"))
// const port = process.env.PORT;


//FOR PDF GENERATION and SALARY SLIP
// app.route('/slip')
//   .get((req, res) => {
//     // res.sendFile(path.resolve(__dirnamne, '/pdf_generator/salarySlip.html'))
//     res.sendFile(__dirname + '/pdf_generator/salarySlip.html')
//   })
// // app.route('/slip/download')
//   .post((req, res) => {
//     pdf_genearation()
//     console.log("button clicked")
//     res.send("file downloaded successfully")
//   })

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


