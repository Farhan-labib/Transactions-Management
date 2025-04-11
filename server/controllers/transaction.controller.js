const Transaction  = require('../models/transaction.model.js');
const User = require('../models/profile.model.js');

exports.transaction = function (req, res) {
    const transaction  = new Transaction (req.body);
    transaction .save()
        .then(() => res.status(201).json({ message: 'Transaction Request Created Successfully!' }))
        .catch((error) => res.status(400).json({ error }));
};

exports.getTransactionsByGmail = async (req, res) => {
    const { gmail } = req.params;
    const user = await User.findOne({ gmail });

    try {
        const transactions = await Transaction.find({
            $or: [{ sender: gmail }, { receiver: gmail }]
        }).sort({ date: -1 });

        res.status(200).json({balance: user.balance,transactions});
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ message: 'Failed to fetch transactions' });
    }
};
