const Transaction  = require('../models/transaction.model.js');

exports.transaction = function (req, res) {
    const transaction  = new Transaction (req.body);
    transaction .save()
        .then(() => res.status(201).json({ message: 'Transaction Request Created Successfully!' }))
        .catch((error) => res.status(400).json({ error }));
};
