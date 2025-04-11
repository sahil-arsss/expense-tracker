import React, { useState } from 'react';
import { signup } from '../services/api';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signup(formData);
            alert('Sign up successful! You can now log in.');
            navigate('/login'); // Redirect to login after successful signup
        } catch (error) {
            alert(error.response?.data?.message || 'Sign up failed');
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="firstName" placeholder="Name" value={formData.firstName} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignupPage;




// import React from 'react';
// import Signup from '../components/Auth/Signup';

// const SignupPage = () => {
//   return (
//     <div>
//       <h1>Signup</h1>
//       <Signup />
//     </div>
//   );
// };

// export default SignupPage;