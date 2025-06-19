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
        <div className="w-full h-fit rounded-lg p-10 relative">
            <div className='absolute top-0 left-0 w-full h-full rounded-2xl z-0 overflow-hidden'><img src="https://cdn.dribbble.com/userupload/41893487/file/original-fb8fb6d539afda5bd681709a3b3f69b1.png?resize=800x600&vertical=center" className='w-[110%] h-full object-top object-cover opacity-100' /></div>
            <div className='z-10 relative'>
                {graphData.length > 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8 items-center gap-2'>
                    <div className='w-full h-32 rounded-xl p-2 bg-white hover:bg-zinc-300 transition-all duration-300 cursor-pointer'>
                        <div className='w-full h-full flex flex-col gap-2 justify-between'>
                        <span className='w-full flex items-center justify-between gap-1'>
                            <p>Total collages</p>
                            <NavLink to={'../collages'} className='size-9 flex items-center justify-center rounded-full bg-zinc-200 border border-zinc-300 hover:border-zinc-400'><i className='ri-arrow-right-up-line'></i></NavLink>
                        </span>
                        <span className='flex flex-col items-start justify-between gap-0.5'>
                            <p className='text-3xl font-medium'>{graphData.length}</p>
                            <p className='text-green-600 text-[0.65rem]'><span className='pr-1 border  rounded border-green-400 '><i className='ri-arrow-up-s-fill text-sm'></i>{graphData.length-16}</span><span className=' ml-1'>Increased from last year</span></p>
                        </span>
                        </div>
                    </div>
                    <div className='w-full h-32 rounded-xl p-2 bg-white hover:bg-zinc-300 transition-all duration-300 cursor-pointer'>
                        <div className='w-full h-full flex flex-col gap-2 justify-between'>
                        <span className='w-full flex items-center justify-between gap-1'>
                            <p>Total students</p>
                            <NavLink to={'../students'} className='size-9 flex items-center justify-center rounded-full bg-zinc-200 border border-zinc-300 hover:border-zinc-400'><i className='ri-arrow-right-up-line'></i></NavLink>
                        </span>
                        <span className='flex flex-col items-start justify-between gap-0.5'>
                            <p className='text-3xl font-medium'>{Student.length}</p>
                            <p className='text-green-600 text-[0.65rem]'><span className='pr-1 border  rounded border-green-400 '><i className='ri-arrow-up-s-fill text-sm'></i>{Student.length-11}</span><span className=' ml-1'>Increased from last month</span></p>
                        </span>
                        </div>
                    </div>
                </div>
            ) : (
                <div>No data available</div>
            )}
            </div>
        </div>
    );
};

export default TimelineGraphforcollage;
