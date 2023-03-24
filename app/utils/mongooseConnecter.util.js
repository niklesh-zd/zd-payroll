"use strict";

const { connect, connection, mongoose} = require("mongoose");
require('dotenv').config();
// const url =`mongodb+srv://${process.env.mongo_pass}:${process.env.mongo_pass}@cluster0.9bxysok.mongodb.net/?retryWrites=true&w=majority`
const url = `mongodb+srv://payroll:payroll123@cluster0.8pzycmy.mongodb.net/?retryWrites=true&w=majority`
connect(url, (error) => {
  if (error) {
    console.log(error);
    return;
  }
  connection.useDb('employees');
  console.log("Connected to MongoDB");
});
