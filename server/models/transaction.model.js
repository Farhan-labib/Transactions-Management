const { Schema, model } = require('mongoose');


const TransactionSchema = new Schema({
    sender: {
        type: String,
        required: true,
    },
    receiver: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending',
    },
    date: {
        type: Date,
        default: Date.now,
    },
});


const transaction = model('transaction', TransactionSchema);


module.exports = transaction;