import axios from 'axios';
import React, { useState } from 'react';

const usePostManager = () => {
    const API_URL = 'http://localhost:1000/manager/post';
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const createPost = async (postData) => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await axios.post(API_URL, postData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.data) {
                throw new Error('No data received from server');
            }
            
            return response.data;
        } catch (err) {
            setError(err.message || 'An error occurred');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { 
        createPost, 
        isLoading, 
        error 
    };
}

export { usePostManager };