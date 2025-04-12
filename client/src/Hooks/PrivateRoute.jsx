import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import API_CONFIG from '../config/api.config';

const PrivateRoute = ({ children, allowedRoles }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    
    useEffect(() => {
        const verifyToken = async () => {
            // If no token exists, user is not authenticated
            if (!token) {
                setIsAuthenticated(false);
                return;
            }
            
            try {
                // Create a test request to verify token validity
                const authAxios = axios.create({
                    baseURL: API_CONFIG.baseURL,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                const userEmail = localStorage.getItem('l_gmail');
                // Try to access a protected route to verify token using the proper endpoint from config
                await authAxios.get(API_CONFIG.endpoints.checkUser(userEmail));
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Token verification failed:', error);
                // If token is invalid or expired
                setIsAuthenticated(false);
                // Clear localStorage
                localStorage.removeItem('l_gmail');
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                localStorage.removeItem('balance');
            }
        };
        
        verifyToken();
    }, [token]);
    
    // Show loading state while verifying token
    if (isAuthenticated === null) {
        return <div>Loading authentication status...</div>;
    }
    
    // Redirect if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }
    
    // Check if user has required role
    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/dashboard" />;
    }
    
    return children;
};

export default PrivateRoute;
