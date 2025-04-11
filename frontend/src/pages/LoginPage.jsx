import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post('/auth/sign-in', { email, password });
            localStorage.setItem('token', response.data.token);
            alert('Login successful!');
            navigate('/dashboard'); // Redirect to dashboard after login
        } catch (error) {
            alert(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;




// import React from 'react';
// import Login from '../components/Auth/Login';

// const LoginPage = () => {
//   return (
//     <div>
//       <h1>Login</h1>
//       <Login />
//     </div>
//   );
// };

// export default LoginPage;