import axios from 'axios';
import React, { useState } from 'react';

const usePostManager = () => {
    const API_URL = 'http://localhost:1000/managerpost';
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const createPost = async (postData) => {
        setIsLoading(true);
        setError(null);
        
        try {
            // Validate postData before sending
            if (!postData || typeof postData !== 'object') {
                throw new Error('Invalid post data');
            }

            // Check for required fields
            const requiredFields = ['name', 'email', 'description'];
            const missingFields = requiredFields.filter(field => !postData[field]);
            if (missingFields.length > 0) {
                throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
            }

            const response = await axios.post(API_URL, postData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                withCredentials: true,
                timeout: 10000 // Add timeout to prevent hanging
            });
            
            if (!response.data) {
                throw new Error('No data received from server');
            }

            // Validate response structure
            if (!response.data.success) {
                throw new Error(response.data.message || 'Request failed');
            }
            
            return response.data;
        } catch (err) {
            console.error('API Error:', err);
            const errorMessage = err.response?.data?.message || 
                              err.message || 
                              'An error occurred while processing your request';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return { 
        createPost, 
        isLoading, 
        error,
        setError
    };
}

export { usePostManager };