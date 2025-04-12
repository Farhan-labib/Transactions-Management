import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/Signup.css';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [gmail, setGmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/createprofile`, { gmail, password });
            setMessage(response.data.message);
            setGmail('');
            setPassword('');
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong!');
        }
    };

    return (
        <div className="signup-container">
            <h2>Create Profile</h2>
            <form onSubmit={handleSubmit}>
                <input
                    className="signup-input"
                    type="email"
                    placeholder="Email"
                    value={gmail}
                    onChange={(e) => setGmail(e.target.value)}
                    required
                />
                <input
                    className="signup-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button className="signup-button" type="submit">Sign Up</button>
            </form>
            {message && <p className="signup-success">{message}</p>}
            {error && <p className="signup-error">{error}</p>}
            <p className="login-signup-link"> <Link to="/">Login</Link></p>
        </div>
    );
};

export default Signup;
