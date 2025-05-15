import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Students = () => {
    const Api = 'https://server-01-v2cx.onrender.com/getunicity'
    const [Student, setStudent] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [Error, setError] = useState(null);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await axios.get(Api);
                if (response.data?.length > 0) {
                    setStudent(response.data);
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStudent();
    }, []);

    return { Student, Loading, Error };
}

export { Students }