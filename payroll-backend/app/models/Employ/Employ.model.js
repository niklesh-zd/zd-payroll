"use strict"

const { Schema, model } = require('mongoose');

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const EmpInfo = Schema({

    First_Name
        : {
        type: String,
        required: [true, "Please enter your name!"],
        trim: [true, "space not allow"],
    },
    Last_Name
        : {
        type: String,
        required: true,
        trim: true
    },
    date_of_birth
        : {
        type: Date,
        required: true,

    },
    date_of_joining: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    Contact_Number: {
        type: Number,
        minimum: [10, '10 digit are required'],
        maximum: [10, '10 digit are required'],
    },
    Contact_Number_Home: {
        type: Number,
        minimum: [10, '10 digit are required'],
        maximum: [10, '10 digit are required'],
    },
    Alternate_Contact_number: {
        type: Number,
        minimum: [10, '10 digit are required'],
        maximum: [10, '10 digit are required'],

    },
    Nationality: {
        type: String,
        required: true
    },
    Employee_Code: {
        type: String,
        required: true
    },
    Blood_Group: {
        type: String,
        required: true
    },
    Permanent_Address: {
        type: String,
        required: true
    },
    Current_Address: {
        type: String,
        // required: true
    },
    Position: {
        type: String,
        required: true
    },
    Marital_Status: {
        type: String,
        required: true
    },
    PAN_No: {
        type: String,
        required: true,
        unique: true,
        minimum: [10, '12 digit are required'],
        maximum: [10, '12 digit are required'],
    },
    ADHAR: {
        type: Number,
        required: true,
        minimum: [12, '12 digit are required'],
        maximum: [12, '12 digit are required'],
        unique: true
    },
    Bank_No: {
        type: String,
        required: true
    },
    Bank_IFSC: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    emp_id: {
        type: String,
        required: true
    },
    DEGREE: {
        type: String,
        required: true
    },
    STREAM: {
        type: String,
    },
    YEAR_OF_PASSING: {
        type: String,
    },
    PASSED: {
        type: String,
    },

    PERCENTAGE_OF_MARKS: {
        type: String,
    },
    state :{
        type : String
    },
    city : {
        type : String
    }

},
    {
        timestamps: true
    },

)

// collection creation 
const EmpInfoModal = model('EMPLOY', EmpInfo, "EmpInfo");





module.exports = EmpInfoModal;

