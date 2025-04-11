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

    try {
        const user = await User.findOne({ gmail });
        const transactions = await Transaction.find({
            $or: [{ sender: gmail }, { receiver: gmail }]
        }).sort({ date: -1 });

        if (!user) {
            return res.status(404).json({ message: 'User not found', transactions });
        }

        res.status(200).json({ balance: user.balance, transactions });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ message: 'Failed to fetch transactions' });
    }
};


exports.updateTransactionStatus = async (req, res) => {
    const { transactionId, status } = req.body;

    if (!['Approved', 'Rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
    }

    try {
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        if (transaction.status !== 'Pending') {
            return res.status(400).json({ message: 'Transaction already processed' });
        }

        const sender = await User.findOne({ gmail: transaction.sender });
        const receiver = await User.findOne({ gmail: transaction.receiver });

        if (!sender || !receiver) {
            return res.status(404).json({ message: 'Sender or receiver not found' });
        }

        if (status === 'Approved') {
            if (sender.balance < transaction.amount) {
                return res.status(400).json({ message: 'Insufficient balance in sender account' });
            }

            sender.balance -= transaction.amount;
            receiver.balance += transaction.amount;

            await sender.save();
            await receiver.save();
        }

        transaction.status = status;
        await transaction.save();

        res.status(200).json({
            message: `Transaction ${status} successfully`,
            transaction,
            senderBalance: sender.balance,
            receiverBalance: receiver.balance
        });
    } catch (error) {
        console.error('Error updating transaction status:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ date: -1 });

        const enrichedTransactions = await Promise.all(
            transactions.map(async (txn) => {
                const sender = await User.findOne({ gmail: txn.sender });
                const receiver = await User.findOne({ gmail: txn.receiver });

                return {
                    ...txn._doc,
                    senderBalance: sender ? sender.balance : null,
                    receiverBalance: receiver ? receiver.balance : null,
                };
            })
        );

        res.status(200).json(enrichedTransactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ message: 'Failed to fetch all transactions' });
    }
};
