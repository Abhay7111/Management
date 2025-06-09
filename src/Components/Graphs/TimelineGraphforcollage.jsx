import React, { useEffect, useState } from 'react';
import { Students } from '../../Data/Students';     
import { NavLink } from 'react-router-dom';
const TimelineGraphforcollage = () => {
    const { Student, Loading, Error } = Students();
    const [graphData, setGraphData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!Loading && !Error) {
            const processStudentData = () => {
                try {
                    // Process Student data: Group by collage and count students
                    const processedData = Student.reduce((acc, item) => {
                        const collageName = item.collagename;
                        const existing = acc.find((entry) => entry.collage === collageName);
                        if (existing) {
                            existing.count += 1;
                        } else {
                            acc.push({ collage: collageName, count: 1 });
                        }
                        return acc;
                    }, []);

                    setGraphData(processedData);
                } catch (err) {
                    setError(err.message);
                }
            };
            processStudentData();
        }
    }, [Student, Loading, Error]);

    if (Error) {
        return <div>Error loading data: {Error.message}</div>;
    }

    if (Loading) {
        return <div>Loading data...</div>;
    }

    if (error) {
        return <div>Error processing data: {error}</div>;
    }

    return (
        <div className="w-full h-fit rounded-lg ">
            {graphData.length > 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 items-center gap-2'>
                    <div className='w-full h-60 rounded-xl p-2 bg-white hover:bg-zinc-200 transition-all duration-300 cursor-pointer'>
                        <h2 className='text-sm font-medium'>Student Count by College</h2>
                    <div className='w-full rounded-xl p-2'>
                            
                        <div className='flex flex-col gap-2 rounded-md overflow-auto'>
                            <ul className='flex gap-1'>
                                {graphData.map((item, index) => (
                                    <li key={index} className='w-10 h-40 rounded-md flex items-end justify-center bg-white hover:bg-zinc-200 hover:border-zinc-400 transition-all duration-300 cursor-pointer p-2 pt-4'>
                                        <div className='w-full h-full flex flex-col items-center justify-end overflow-hidden'>
                                            <div className='w-full p-1 relative'>
                                                <p className='text-nowrap -rotate-90 text-start h-fit text-xs p-1'>{item.collage}</p>
                                            </div>
                                            <NavLink 
                                                to={`/dashboard/students`} 
                                                title={`(${item.count}) Students in ${item.collage}`} 
                                                className='text-xs font-medium'
                                            >
                                                ({item.count})
                                            </NavLink>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    </div>
                    <div className='w-full h-60 grid grid-rows-2 gap-1 p-2 bg-white hover:bg-zinc-200 transition-all duration-300 cursor-pointer rounded-xl'>
                        <div className={`w-full h-full flex items-center border-zinc-400 border-b justify-around rounded-md rounded-b-none p-2`}>
                            <h1 className='text-2xl font-medium text-zinc-700'>Statistic Overview</h1>
                            <NavLink to={``} className='size-14 bg-white rounded-full flex items-center justify-center hover:bg-zinc-300 transition-all duration-300 hover:text-zinc-800 text-zinc-600'>
                                <i className='ri-arrow-right-up-line text-3xl '></i>
                            </NavLink>
                        </div>
                        <div>
                            <div className='w-full h-full p-2 flex items-center justify-around gap-4 rounded-md'>
                                <span className='flex flex-col items-center justify-center'><p className='text-sm text-zinc-700'>Collages</p><p className='text-3xl font-medium text-zinc-800'>{graphData.length}</p></span>
                                <span className='flex flex-col items-center justify-center'><p className='text-sm text-zinc-700'>Students</p><p className='text-3xl font-medium text-zinc-800'>{Student.length}</p></span>
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-60 rounded-xl p-1 bg-white hover:bg-zinc-200 transition-all duration-300 cursor-pointer'>
                        <div className='w-full h-full overflow-auto rounded-md'>
                            <div className='w-fit h-full flex items-center'>
                                {Student.map((item , index)=>(
                                    <div className='w-32 h-[75%] rounded-xl ml-3 bg-white p-2 flex flex-col gap-2 items-center justify-start'>
                                        <div className='size-16 bg-white border border-zinc-400 rounded-full flex items-center justify-center'>
                                            <i className='ri-user-line text-3xl font-medium'></i>
                                        </div>
                                        <span className='w-full'>
                                            <h2 className='text-lg font-medium line-clamp-1 text-center'>{item.students.name.firstname}</h2>
                                            <p className='text-xs font-medium w-full'>Rank: <span>{item.students.rank}</span></p>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>No data available</div>
            )}
        </div>
    );
};

export default TimelineGraphforcollage;
