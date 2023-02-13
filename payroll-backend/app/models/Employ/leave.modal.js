"use strict"

const { Schema, model } = require('mongoose');

const leave = Schema({

    userid: {
        type: Schema.ObjectId,
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
    from_date
        : {
        type: Date,
        required: true,

    },
    to_date:{
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

