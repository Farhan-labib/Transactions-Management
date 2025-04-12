import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import '../Styles/Dashboard.css';

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [balance, setBalance] = useState(0);
    const [newTransaction, setNewTransaction] = useState({
        receiver: '',
        amount: 0,
    });

    const gmail = localStorage.getItem('l_gmail');
    const token = localStorage.getItem('token');
    
    // Create axios instance with default auth header
    const authAxios = axios.create({
        baseURL: 'http://localhost:5000',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const fetchTransactions = useCallback(async () => {
        try {
            const response = await authAxios.get(`/api/transactions/${gmail}`);
            setTransactions(response.data.transactions);
            setBalance(response.data.balance);
        } catch (err) {
            setError('Failed to load transactions');
            console.error(err);
            if (err.response && err.response.status === 401) {
                // Unauthorized - token might be expired
                clearLocalStorage();
            }
        } finally {
            setLoading(false);
        }
    }, [gmail]);

    useEffect(() => {
        fetchTransactions();
        const interval = setInterval(fetchTransactions, 5000);
        return () => clearInterval(interval);
    }, [fetchTransactions]);
    

    const handleTransactionInput = (e) => {
        const { name, value } = e.target;
        setNewTransaction({
            ...newTransaction,
            [name]: value,
        });
    };

    const handleSendTransaction = async () => {
        setError('');
        setSuccessMsg('');
    
        const { receiver, amount } = newTransaction;
    
        if (!receiver || amount <= 0) {
            setError('Please fill in all fields correctly');
            return;
        }
    
        if (amount > balance) {
            setError('Insufficient balance');
            return;
        }
    
        try {
            const res = await authAxios.get(`/api/check-user/${receiver}`);
            if (!res.data.exists) {
                setError('Receiver email not found');
                return;
            }
    
          
            await authAxios.post('/api/transaction', {
                sender: gmail,
                receiver,
                amount,
            });
    
            setSuccessMsg('Transaction request sent successfully!');
            setNewTransaction({ receiver: '', amount: 0 });
            fetchTransactions(); 
        } catch (err) {
            setError('Failed to send transaction');
            console.error(err);
            if (err.response && err.response.status === 401) {
                // Unauthorized - token might be expired
                clearLocalStorage();
            }
        }
    };
    
    const clearLocalStorage = () => {
        localStorage.removeItem('l_gmail');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('balance');
        window.location.href = '/'; 
    }

    return (
        <div className="dashboard-container">
            <h1>Welcome to the Dashboard 🎉</h1>
            <p>You have successfully logged in as <strong>{gmail}</strong></p>
            <button
                onClick={() => {
                    clearLocalStorage();
                }}
            >
                Logout
            </button>

            <h2>Your Balance: ${balance}</h2>

            <h2>Send Money</h2>
            <div className="transaction-form">
                <input
                    type="text"
                    name="receiver"
                    placeholder="Receiver's Email"
                    value={newTransaction.receiver}
                    onChange={handleTransactionInput}
                />
                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={newTransaction.amount}
                    onChange={handleTransactionInput}
                />
                <button onClick={handleSendTransaction}>Send Transaction</button>
            </div>

            {successMsg && <p className="success">{successMsg}</p>}
            {error && <p className="error">{error}</p>}

            <h2>Your Transactions</h2>
            {loading ? (
                <p>Loading transactions...</p>
            ) : transactions.length === 0 ? (
                <p>No transactions found.</p>
            ) : (
                <table className="transaction-table">
                    <thead>
                        <tr>
                            <th>Sender</th>
                            <th>Receiver</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((txn) => (
                            <tr key={txn._id}>
                                <td>{txn.sender}</td>
                                <td>{txn.receiver}</td>
                                <td>{txn.amount}</td>
                                <td>{txn.status}</td>
                                <td>{new Date(txn.date).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Dashboard;
