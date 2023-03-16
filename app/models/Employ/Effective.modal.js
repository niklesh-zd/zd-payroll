

const { Schema, model } = require('mongoose');
const Effective = Schema({


    base_salary
        : {
        type: Number,
        // required: true,

    },
    effective_date: {
        type: Date,
        // required: true,
    },
    id: {
        type: Schema.ObjectId,
        // required: true,
        trim: true
    },

},

    {
        timestamps: true
    },
)
const effective_modal = model('EFFECTIVE', Effective, 'effective')
module.exports = effective_modal