import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Blog = () => {
     const Api = 'https://server-01-v2cx.onrender.com/getmainblog'
     const [BlogData, setBlogData] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [Error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogdata = async () => {
            try {
                const response = await axios.get(Api);
                if (response.data?.length > 0) {
                    setBlogData(response.data);
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogdata();
    }, []);

    return { BlogData, Loading, Error };
}

export { Blog }