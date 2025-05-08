import React from 'react';
import axios from 'axios';
import { Blog } from '../Data/Blog';

function Dashboard() {
    const { BlogData, Loading, Error } = Blog();
    
    if (Loading) {
        return <div className='w-full h-full p-2'>Loading...</div>;
    }

    if (Error) {
        return <div className='w-full h-full p-2'>Error: {Error.message}</div>;
    }

    return (
        <div className='w-full h-full p-2'>
            {BlogData.length > 0 ? (
                <div>
                    Total Blogs: {BlogData.length}
                </div>
            ) : (
                <div>No blogs found</div>
            )}
        </div>
    );
}

export default Dashboard;