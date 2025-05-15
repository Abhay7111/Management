import axios from 'axios';
import React, { useState, useCallback } from 'react';

const usePostManager = () => {
    const API_URL = 'https://server-01-v2cx.onrender.com/managerpost';
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const validatePostData = useCallback((postData) => {
        if (!postData || typeof postData !== 'object') {
            throw new Error('Invalid post data');
        }

        const requiredFields = ['name', 'email', 'description'];
        const missingFields = requiredFields.filter(field => !postData[field]);
        if (missingFields.length > 0) {
            throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }
    }, []);

    const validateResponse = useCallback((response) => {
        if (!response.data) {
            throw new Error('No data received from server');
        }

        if (!response.data.success) {
            throw new Error(response.data.message || 'Request failed');
        }
    }, []);

    const createPost = useCallback(async (postData) => {
        setIsLoading(true);
        setError(null);
        
        try {
            validatePostData(postData);

            const response = await axios.post(API_URL, postData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                withCredentials: true,
                timeout: 10000
            });
            
            validateResponse(response);
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
    }, [validatePostData, validateResponse]);

    return { 
        createPost, 
        isLoading, 
        error,
        setError
    };
}

export { usePostManager };