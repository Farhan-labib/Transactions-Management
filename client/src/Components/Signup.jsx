import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/Signup.css';
import { Link } from 'react-router-dom';
import API_CONFIG from '../config/api.config';

const Signup = () => {
    const [gmail, setGmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setIsLoading(true);

        try {
            const response = await axios.post(
                `${API_CONFIG.baseURL}${API_CONFIG.endpoints.createProfile}`, 
                { gmail, password }
            );
            setMessage(response.data.message);
            setGmail('');
            setPassword('');
        } catch (err) {
            console.error('Signup error:', err);
            setError(err.response?.data?.error || 'Something went wrong!');
        } finally {
            setIsLoading(false);
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
                <button className="signup-button" type="submit" disabled={isLoading}>
                    {isLoading ? 'Signing Up...' : 'Sign Up'}
                </button>
            </form>
            {message && <p className="signup-success">{message}</p>}
            {error && <p className="signup-error">{error}</p>}
            <p className="login-signup-link"> <Link to="/">Login</Link></p>
        </div>
    );
};

export default Signup;
