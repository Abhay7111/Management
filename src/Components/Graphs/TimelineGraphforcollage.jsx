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
                    <div className='w-full h-28 rounded-xl p-2 bg-white hover:bg-zinc-200 transition-all duration-300 cursor-pointer'>
                        {graphData.length}
                    </div>
                    <div className='w-full h-28 grid grid-rows-2 gap-1 p-2 bg-white hover:bg-zinc-200 transition-all duration-300 cursor-pointer rounded-xl'>
                        
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
