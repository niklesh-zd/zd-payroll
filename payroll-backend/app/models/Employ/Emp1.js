"use strict"

const { Schema, model } = require('mongoose');

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const EmpInfo1 = Schema({

  
    name: {
        type: String,
        required: true,
        description: "name must be a string and is required"

    },
    email: {
        type: String,
        // required: true
    },
    phone: {
        type: Number,
        required: true
    }
},
    {
        timestamps: true
    },

)

// collection creation 
const EmpInfoModal1 = model('EMPLOY1', EmpInfo1, "EmpInfo1");





module.exports = EmpInfoModal1;

