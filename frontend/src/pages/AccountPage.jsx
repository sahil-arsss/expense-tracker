import React, { useState, useEffect } from 'react';
import API from '../services/api';

const AccountPage = () => {
    const [accounts, setAccounts] = useState([]);
    const [name, setName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [selectedAccount, setSelectedAccount] = useState('');

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        try {
            const response = await API.get('/account');
            setAccounts(response.data.data);
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to fetch accounts');
        }
    };

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        try {
            await API.post('/account/create', { name, amount, account_number: accountNumber });
            alert('Account created successfully!');
            fetchAccounts();
        } catch (error) {
            alert(error.response?.data?.message || 'Account creation failed');
        }
    };

    const handleAddMoney = async (e) => {
        e.preventDefault();
        try {
            await API.put(`/account/add-money/${selectedAccount}`, { amount });
            alert('Money added successfully!');
            fetchAccounts();
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to add money');
        }
    };

    return (
        <div>
            <h2>Manage Your Accounts</h2>
            
            {/* Create Account Form */}
            <h3>Create Account</h3>
            <form onSubmit={handleCreateAccount}>
                <input type="text" placeholder="Account Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="text" placeholder="Account Number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} required />
                <input type="number" placeholder="Initial Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                <button type="submit">Create</button>
            </form>
            
            {/* Add Money Form */}
            <h3>Add Money</h3>
            <form onSubmit={handleAddMoney}>
                <select value={selectedAccount} onChange={(e) => setSelectedAccount(e.target.value)} required>
                    <option value="">Select Account</option>
                    {accounts.map((acc) => (
                        <option key={acc.id} value={acc.id}>{acc.account_name}</option>
                    ))}
                </select>
                <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                <button type="submit">Add Money</button>
            </form>
            
            {/* Display Accounts */}
            <h3>Your Accounts</h3>
            <ul>
                {accounts.map((acc) => (
                    <li key={acc.id}>{acc.account_name} - Balance: ${acc.account_balance}</li>
                ))}
            </ul>
        </div>
    );
};

export default AccountPage;
