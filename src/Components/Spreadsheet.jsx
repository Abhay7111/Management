import React, { useState, useRef } from 'react';
import { Students } from '../Data/Students';
import Tasks from '../Forms/Tasks';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Link } from 'react-router-dom';

function Spreadsheet() {
  const { Student, Loading, Error } = Students();
  const [managerForm, setManagerForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const componentRef = useRef();
  const [printLoading, setPrintLoading] = useState(false);
  const [pdfError, setPdfError] = useState(null);
  const [openprofile, setopenprofile] = useState(false)

  const handlePrint = async () => {
    if (!componentRef.current) return;
    
    setPrintLoading(true);
    setPdfError(null);
    try {
      const element = componentRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${selectedStudent.students.name.firstname}_${selectedStudent.students.name.lastname}_details.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setPdfError('Failed to generate PDF. Please try again.');
    } finally {
      setPrintLoading(false);
    }
  };

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(Student.map(item => ({
      Name: `${item.students.name.firstname} ${item.students.name.lastname}`,
      College: item.collagename,
      Phone: `+91 ${item.students.phone}`,
      Email: item.students.gmail,
      Rank: item.students.rank,
      Marks: item.students.marks
    })));
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, "students_data.xlsx");
  };

  if (Loading) return <div>Loading...</div>;
  if (Error) return <div>Error: {Error.message}</div>;

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  return (
    <div className='w-full min-h-40 maxh-[80vh] flex flex-col items-start justify-start gap-2 relative'>
      <div className='flex items-center h-20 justify-start gap-1 text-sm w-full'>
        <div className='flex items-center gap-1 text-red-700 bg-red-200 px-2 py-1 border border-red-300 rounded-md'>
          <i className='ri-loader-4-line animate-spin'></i>
          <p>In progress</p>
        </div>
        <div title='Total collages' className='size-7 rounded-md border border-zinc-300 flex items-center justify-center bg-zinc-200'>
          {Student.length}
        </div>
        <button 
          onClick={handleDownloadExcel}
          className='size-7 cursor-pointer bg-green-600 text-white flex items-center justify-center rounded-md hover:bg-green-700 transition-all duration-300'
        >
          <i className='ri-file-excel-line'></i>
        </button>
        <div className='w-fit flex items-center justify-start gap-2'>
        <button 
          onClick={() => setManagerForm(prev => !prev)} 
          className='size-7 rounded-md border border-zinc-300 flex items-center justify-center cursor-pointer hover:bg-zinc-950 hover:text-white transition-colors duration-300'
          aria-label="Add new item"
        >
          <i className='ri-add-line text-xl font-medium'></i>
        </button>
        <div className=' size-7 hover:bg-zinc-900 hover:text-white transition-all duration-300 border border-zinc-300 flex items-center justify-center cursor-pointer p-1 rounded'>
          <i className='ri-more-line'></i>
        </div>
      </div>
      </div>

      <div className='w-full h-full overflow-auto relative flex items-start justify-center gap-2'>
        <div className='w-[80vw] grid grid-cols-6 gap-0 border border-zinc-400 relative'>
          <div className='bg-gray-200 p-2 font-medium sticky top-0 border-b border-zinc-400'>Name</div>
          <div className='bg-gray-200 p-2 font-medium sticky top-0 border-b border-zinc-400'>College</div>
          <div className='bg-gray-200 p-2 font-medium sticky top-0 border-b border-zinc-400'>Phone</div>
          <div className='bg-gray-200 p-2 font-medium sticky top-0 border-b border-zinc-400'>Email</div>
          <div className='bg-gray-200 p-2 font-medium sticky top-0 border-b border-zinc-400'>Rank</div>
          <div className='bg-gray-200 p-2 font-medium sticky top-0 border-b border-zinc-400'>Marks</div>
          {Student.map((item, index) => (
            <React.Fragment key={index}>
              <div 
                className='p-2 border-b border-zinc-400 cursor-pointer hover:bg-gray-100 line-clamp-1'
                onClick={() => handleStudentClick(item)}
              >
                {item.students.name.firstname}
              </div>
              <div className='p-2 border-b border-zinc-400'>{item.collagename}</div>
              <div className='p-2 border-b border-zinc-400 line-clamp-1'>0{item.students.phone}</div>
              <Link to={`mailto:${item.students.gmail}`} className='p-2 border-b border-zinc-400 line-clamp-1'>{item.students.gmail}</Link>
              <div className='p-2 border-b border-zinc-400'>{item.students.rank}</div>
              <div className='p-2 border-b border-zinc-400'>{item.students.marks}</div>
            </React.Fragment>
          ))}
        </div>
        
        <div className='w-96 min-h-20 transition-all relative rounded-xl border border-zinc-400 p-4 bg-white shadow-sm'>
          {selectedStudent ? (<div ref={componentRef} className={`absolute top-0 right-0 ${openprofile ? 'w-full min-h-full border ' : 'w-0 h-full'} border-zinc-300 rounded-xl overflow-auto transition-all duration-200 bg-zinc-200`}>
            <div className='w-full h-full relative p-2'>
              <span className='w-full flex items-start justify-end'><span onClick={()=>setopenprofile(false)} className='size-7 cursor-pointer flex items-center justify-center rounded border border-zinc-300'><i className='ri-close-line'></i></span></span>
              <h3 className='font-semibold mb-3 text-lg border-b border-zinc-300 pb-2 text-gray-700'>Student Details</h3>
              <div className='space-y-2.5'>
                <div className='flex flex-col gap-0.5'>
                  <span className='text-xs font-medium text-gray-500'>Name</span>
                  <p className='text-sm flex items-center justify-between text-gray-800'>
                    <span>{selectedStudent.students.name.firstname} {selectedStudent.students.name.lastname}</span>
                  </p>
                </div>
                <div className='flex flex-col gap-0.5'>
                  <span className='text-xs font-medium text-gray-500'>Father's name</span>
                  <p className='text-sm text-gray-800'>{selectedStudent.students.fathername}</p>
                </div>
                <div className='flex flex-col gap-0.5'>
                  <span className='text-xs font-medium text-gray-500'>Mother's name</span>
                  <p className='text-sm text-gray-800'>{selectedStudent.students.mothername}</p>
                </div>
                <div className='flex flex-col gap-0.5'>
                  <span className='text-xs font-medium text-gray-500'>College</span>
                  <p className='text-sm text-gray-800'>{selectedStudent.collagename}, {selectedStudent.collageaddress}</p>
                </div>
                <div className='flex flex-col gap-0.5'>
                  <span className='text-xs font-medium text-gray-500'>Phone</span>
                  <p className='text-sm text-gray-800'>+91 {selectedStudent.students.phone}</p>
                </div>
                <div className='flex flex-col gap-0.5'>
                  <span className='text-xs font-medium text-gray-500'>Email</span>
                  <p className='text-sm text-gray-800 break-all'>{selectedStudent.students.gmail}</p>
                </div>
                <div className='flex gap-2 justify-start items-center'>
                  <div className='flex items-end gap-0.5'>
                    <span className='text-xs font-medium text-gray-500'>Rank:</span>
                    <p className='text-sm text-gray-800'>{selectedStudent.students.rank}</p>
                  </div>
                  <div className='flex items-end gap-0.5'>
                    <span className='text-xs font-medium text-gray-500'>Marks:</span>
                    <p className='text-sm text-gray-800'>{selectedStudent.students.marks}</p>
                  </div>
                  <div className='flex items-end gap-0.5'>
                    <span className='text-xs font-medium text-gray-500'>Marks:</span>
                    <p className='text-sm text-gray-800'>
                      {selectedStudent?.students?.marks ? (
                        selectedStudent.students.marks < 59 ? 'Pass | 1st Division' :
                        selectedStudent.students.marks < 50 ? 'Pass | 2nd Division' :
                        selectedStudent.students.marks < 45 ? 'Pass | 2nd Division' :
                        selectedStudent.students.marks < 30 ? 'Pass | 2nd Division' :
                        'Fail'
                      ) : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>) : (<div></div>)}
          {selectedStudent ? (
            <div ref={componentRef} className='w-full h-full space-y-3'>
              <h3 className='font-semibold mb-3 text-lg border-b border-zinc-300 pb-2 text-gray-700'>Student Details</h3>
              <div className='space-y-2.5'>
                <div className='flex flex-col gap-0.5'>
                  <span className='text-xs font-medium text-gray-500'>Name</span>
                  <p className='text-sm flex items-center justify-between text-gray-800'>
                    <span>{selectedStudent.students.name.firstname} {selectedStudent.students.name.lastname}</span>
                    <span onClick={()=>setopenprofile(true)} className='size-5.5 rounded border border-zinc-300 hover:bg-zinc-300 flex items-center justify-center cursor-pointer'><i className="ri-user-3-fill"></i></span>
                  </p>
                </div>
                <div className='flex flex-col gap-0.5'>
                  <span className='text-xs font-medium text-gray-500'>College</span>
                  <p className='text-sm text-gray-800'>{selectedStudent.collagename}, {selectedStudent.collageaddress}</p>
                </div>
                <div className='flex flex-col gap-0.5'>
                  <span className='text-xs font-medium text-gray-500'>Phone</span>
                  <p className='text-sm text-gray-800'>+91 {selectedStudent.students.phone}</p>
                </div>
                <div className='flex flex-col gap-0.5'>
                  <span className='text-xs font-medium text-gray-500'>Email</span>
                  <p className='text-sm text-gray-800 break-all'>{selectedStudent.students.gmail}</p>
                </div>
                <div className='flex flex-col gap-0.5'>
                  <span className='text-xs font-medium text-gray-500'>Rank</span>
                  <p className='text-sm text-gray-800'>{selectedStudent.students.rank}</p>
                </div>
                <div className='flex flex宪 gap-0.5'>
                  <span className='text-xs font-medium text-gray-500'>Marks</span>
                  <p className='text-sm text-gray-800'>{selectedStudent.students.marks}</p>
                </div>
              </div>
              {pdfError && <div className="text-red-500 text-sm mt-2">{pdfError}</div>}
              <button 
                onClick={handlePrint}
                disabled={printLoading}
                className='w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {printLoading ? 'Generating PDF...' : 'Download as PDF'}
              </button>
            </div>
          ) : (
            <div className='w-full h-full flex items-center justify-center text-gray-400 italic text-sm'> 
              Select a student to view details
            </div>
          )}
        </div>
      </div>

      

      {managerForm && (
        <div className='w-full h-fit rounded-2xl bg-white border border-zinc-400 top-0 left-0 absolute'>
          <div className='w-full h-full rounded-2xl relative p-2'>
            <button 
              onClick={() => setManagerForm(false)}
              className='size-8 rounded-md border border-zinc-400 bg-zinc-300 cursor-pointer absolute top-2 right-2 flex items-center justify-center opacity-55 hover:opacity-90'
              aria-label="Close form"
            >
              <i className='ri-close-line text-2xl font-medium'></i>
            </button>
            <Tasks />
          </div>
        </div>
      )}
    </div>
  );
}

export default Spreadsheet;