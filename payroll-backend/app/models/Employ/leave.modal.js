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
    LEAVE_TYPE
        : {
        type: Number,
        required: true,
        // trim: [true, "space not allow"],
        enum: [1,0.5]
    },
    DATE
        : {
        type: Date,
        required: true,

    },
    REASON_FOR_LEAVE: {
        type: String,
        required: true
    },



},
    {
        timestamps: true
    },

)

// collection creation 
const SalaryModal = model('SALARY', leave, "salary");





module.exports = SalaryModal;

