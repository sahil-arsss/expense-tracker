import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import AccountPage from './pages/AccountPage';
import Transactions from './pages/Transactions'
import AddTransaction from './pages/AddTransaction'
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/account" element={<AccountPage />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/addtransaction" element={<AddTransaction />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
