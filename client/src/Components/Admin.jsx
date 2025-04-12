import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/Admin.css';

function Admin() {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState('');
    
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // Create axios instance with authorization header
    const authAxios = axios.create({
        baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const fetchTransactions = async () => {
        try {
            const res = await authAxios.get('/api/transactions_all');
            setTransactions(res.data);
            setError('');
        } catch (err) {
            console.error('Error fetching transactions:', err);
            setError('Failed to load transactions. Please check your connection.');
            
            if (err.response && err.response.status === 401) {
                // Unauthorized - token might be expired
                clearLocalStorage();
            }
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await authAxios.put('/api/transaction-status', {
                transactionId: id,
                status,
            });
            fetchTransactions();
            setError('');
        } catch (err) {
            console.error('Failed to update status:', err);
            setError('Failed to update transaction status.');
            
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
    };

    useEffect(() => {
        fetchTransactions();
        const interval = setInterval(fetchTransactions, 5000);
        return () => clearInterval(interval);
    }, []);

    const pending = transactions.filter(t => t.status === 'Pending');
    const history = transactions.filter(t => t.status !== 'Pending');
    

    return (
        
        <div className="dashboard-container">
        <button
                onClick={() => {
                    clearLocalStorage();
                }}
            >
                Logout
            </button>
            <div className="dashboard-card">
                <h2 className="dashboard-heading">Pending Transactions</h2>
                <table className="transaction-table">
                    <thead>
                        <tr>
                            <th>Sender</th>
                            <th>Receiver</th>
                            <th>Amount</th>
                            <th>Sender Balance</th>
                            <th>Receiver Balance</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pending.map(txn => (
                            <tr key={txn._id}>
                                <td>{txn.sender}</td>
                                <td>{txn.receiver}</td>
                                <td>${txn.amount}</td>
                                <td>${txn.senderBalance ?? 'N/A'}</td>
                                <td>${txn.receiverBalance ?? 'N/A'}</td>
                                <td className="action-btns">
                                    <button onClick={() => updateStatus(txn._id, 'Approved')} className="mr-2">Approve</button>
                                    <button onClick={() => updateStatus(txn._id, 'Rejected')}>Reject</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="dashboard-card">
                <h2 className="dashboard-heading">Transaction History</h2>
                <table className="transaction-table">
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Sender</th>
                            <th>Receiver</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Sender Balance</th>
                            <th>Receiver Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map(txn => (
                            <tr key={txn._id}>
                                <td>{txn.status}</td>
                                <td>{txn.sender}</td>
                                <td>{txn.receiver}</td>
                                <td>${txn.amount}</td>
                                <td>{new Date(txn.date).toLocaleString()}</td>
                                <td>${txn.senderBalance ?? 'N/A'}</td>
                                <td>${txn.receiverBalance ?? 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Admin;
