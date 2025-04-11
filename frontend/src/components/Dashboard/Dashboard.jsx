import React from 'react';
import TransactionList from './TransactionList';
import AccountList from './AccountList';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <TransactionList />
      <AccountList />
    </div>
  );
};

export default Dashboard;