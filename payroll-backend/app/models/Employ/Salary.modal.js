"use strict"

const { Schema, model } = require('mongoose');

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const Salary = Schema({

    Employee_name
        : {
        type: String,
        required: [true, "Please enter  name!"],
        trim: [true, "space not allow"],
    },
    Employee_code: {

        type: String,
        required: [true, "Please enter  name!"],
    },
    designation: {
        type: String,
        required: [true, "Please enter  name!"],
    },
    Salary_Slip_Month_Year: {
        type: String,
        required: true,
    },
    Date_of_Joining: {
        type: Date,
        required: true,
    },
    Employee_PAN: {
        type: String,
        required: true,
        unique: true,
        minimum: [10, '10 digit are required'],
        maximum: [10, '10 digit are required'],
    },
    Employee_Adhar: {
        type: Number,
        required: true,
        minimum: [12, '12 digit are required'],
        maximum: [12, '12 digit are required'],
        unique: true
    },
    Bank_Account_Number: {
        type: String,
        required: true
    },
    Bank_IFSC_Code: {
        type: String,
        required: true
    },
    EPF_Account_Number: {
        type: String,
        required: true
    },
    Universal_Account_Number: {
        type: String,
        required: true
    },
    Total_Work_Days: {
        type: Number,
        required: true
    },
    number_of_Leaves: {
        type: Number,
        required: true
    }
},
    {
        timestamps: true
    },

)

// collection creation 
const SalaryModal = model('SALARY', Salary, "salary");





module.exports = SalaryModal;

