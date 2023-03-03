"use strict"

const { Schema, model } = require('mongoose');

const User_Schema = Schema({

    user_email :{
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },

    user_pass :{
        type: String,
        required: 'password is required'
    },

},
    {
        timestamps: true
    },

)

// collection creation 
const User = model("user", User_Schema);





module.exports = SalaryModal;

