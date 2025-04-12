import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link  } from 'react-router-dom';
import '../Styles/Login.css';

const Login = () => {
    const [gmail, setGmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setIsLoading(true);
    
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
                gmail,
                password,
            });
    
            const { message, role, l_gmail, token } = response.data;
    
            // Store user data in localStorage including JWT token
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('l_gmail', l_gmail);
    
            setMessage(message);

            const check = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/check-user/${gmail}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (check.status === 200) {
    
            if (role === 'admin') {
                navigate('/admin');
            } else if (role === 'user') {
                navigate('/dashboard');
            }}
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed! Please check your credentials.');
            console.error('Login error:', err);
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
        <div className="login-form-container">
            <h2 className="login-title">Welcome Back</h2>
            <p className="login-subtitle">Login to access your account</p>
            <form onSubmit={handleSubmit}>
                <div className="login-input-group">
                    <input
                        className="login-input"
                        type="email"
                        placeholder="Email"
                        value={gmail}
                        onChange={(e) => setGmail(e.target.value)}
                        required
                    />
                    <span className="login-input-icon">📧</span>
                </div>
                <div className="login-input-group">
                    <input
                        className="login-input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <span className="login-input-icon">🔒</span>
                </div>
                <button 
                    className="login-button" 
                    type="submit" 
                    disabled={isLoading}
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
                <div className="login-options">
                    <Link to="/forgot-password" className="login-option-link">Forgot Password?</Link>
                </div>
                <div className="login-divider">
                    <span className="login-divider-text">OR</span>
                </div>
                <p className="login-signup-link">
                    Don't have an account? <Link to="/signup" className="login-option-link">Sign up</Link>
                </p>
            </form>
            {message && <p>{message}</p>}
            {error && <p className="login-error">{error}</p>}
        </div>
    );
};

export default Login;
