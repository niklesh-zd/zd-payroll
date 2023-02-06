"use strict"

const { Schema, model } = require('mongoose');

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const leave = Schema({

    userid: {
        type: String,
        required: true,
        trim: true
    },
   
    leave_type
        : {
        type: Number,
        required: true,
        // trim: [true, "space not allow"],
        enum: [1, 0.5]
    },
    date
        : {
        type: Date,
        required: true,

    },
    reason_for_leave: {
        type: String,
        required: true
    },



},
    {
        timestamps: true
    },

)

// collection creation 
const SalaryModal = model('LEAVE', leave, "leave");





module.exports = SalaryModal;

