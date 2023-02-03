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
        type: String,
        required: true,
<<<<<<< HEAD
        // trim: [true, "space not allow"],
=======
        trim: [true, "space not allow"],
>>>>>>> f5fb88482fd5ae3b5c61acd995c7cf0150c10af3
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

