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
        <div className="w-full h-full rounded-lg ">
            {graphData.length > 0 ? (
                <div className='flex flex-col items-center justify-center'>
                    <h2>Student Count by College</h2>
                    <div className=' p-2 flex flex-col gap-2 border rounded-lg border-zinc-300'>
                        <p className='text-base font-medium'>Total collages: {graphData.length}</p>
                        <ul className='flex gap-1'>
                            {graphData.map((item, index) => (
                                <li key={index} className='w-10 h-40 rounded-md flex items-end justify-center bg-zinc-200 hover:bg-zinc-300 border border-zinc-300 hover:border-zinc-400 transition-all duration-300 cursor-pointer p-2 pt-4'>
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
            ) : (
                <div>No data available</div>
            )}
        </div>
    );
};

export default TimelineGraphforcollage;
