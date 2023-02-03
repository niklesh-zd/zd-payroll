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
    }
},
    {
        timestamps: true
    },

)

// collection creation 
const EmpInfoModal = model('EMPLOY', EmpInfo, "EmpInfo");





module.exports = EmpInfoModal;

