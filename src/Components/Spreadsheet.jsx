import React, { useState, useRef } from 'react';
import { Students } from '../Data/Students';
import Tasks from '../Forms/Tasks';
import Loader from './Loading';
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
  const [openProfile, setOpenProfile] = useState(false);

  const handlePrint = async () => {
    if (!componentRef.current || !selectedStudent) {
      setPdfError('No student selected for printing');
      return;
    }
    
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
    if (!Student || Student.length === 0) {
      console.error('No student data available for export');
      return;
    }

    try {
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
    } catch (error) {
      console.error('Error generating Excel file:', error);
    }
  };

  if (Loading) return <div className="loading-spinner w-full h-full flex items-center justify-center"><Loader/></div>;
  if (Error) return <div className="error-message">Error: {Error.message}</div>;

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setOpenProfile(true);
  };

  const DetailItem = ({ label, value, breakAll }) => (
    <div className="flex flex-col gap-1">
      <span className="text-sm text-gray-500">{label}</span>
      <span className={`text-sm font-medium ${breakAll ? 'break-all' : ''}`}>{value}</span>
    </div>
  );

  return (
    <div className='w-full min-h-40 max-h-[80vh] flex flex-col items-start justify-start gap-2 relative'>
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
          <div className='size-7 hover:bg-zinc-900 hover:text-white transition-all duration-300 border border-zinc-300 flex items-center justify-center cursor-pointer p-1 rounded'>
            <i className='ri-more-line'></i>
          </div>
        </div>
      </div>

      <div className='w-full h-full overflow-auto relative flex items-start justify-center gap-2'>
        <div className='w-[80vw] grid grid-cols-6 gap-0 border border-zinc-400 relative'>
          {['Name', 'College', 'Phone', 'Email', 'Rank', 'Marks'].map((header, index) => (
            <div key={index} className='bg-gray-200 p-2 font-medium sticky top-0 border-b border-zinc-400'>{header}</div>
          ))}
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
        
        <div className='w-96 h-full relative'>
          <div className='sticky transition-all rounded-xl border border-zinc-400 p-4 bg-white shadow-sm'>
            {selectedStudent ? (
              <div ref={componentRef} className='w-full h-full space-y-3'>
                <h3 className='font-semibold mb-3 text-lg border-b border-zinc-300 pb-2 text-gray-700 flex items-center justify-between'>
                  <span>Student Details</span>
                  <button 
                    onClick={() => setOpenProfile(prev => !prev)}
                    className='size-5.5 rounded border border-zinc-300 hover:bg-zinc-300 flex items-center justify-center cursor-pointer'
                    aria-label="Toggle profile details"
                  >
                    <i className={`${openProfile ? '' : 'rotate-180'} transition-all duration-500 ri-arrow-down-s-fill`}></i>
                  </button>
                </h3>
                
                <div className='space-y-2.5'>
                  <DetailItem label="Name" value={`${selectedStudent.students.name.firstname} ${selectedStudent.students.name.lastname}`} />
                  
                  {!openProfile && (
                    <>
                      <DetailItem label="Father's name" value={selectedStudent.students.fathername} />
                      <DetailItem label="Mother's name" value={selectedStudent.students.mothername} />
                    </>
                  )}
                  
                  <DetailItem label="College" value={`${selectedStudent.collagename}, ${selectedStudent.collageaddress}`} />
                  <DetailItem label="Phone" value={`+91 ${selectedStudent.students.phone}`} />
                  <DetailItem label="Email" value={selectedStudent.students.gmail} breakAll />
                  
                  <div className='w-full h-fit flex items-center justify-start gap-2.5'>
                    <DetailItem label="Rank" value={selectedStudent.students.rank} />
                    <DetailItem label="Marks" value={selectedStudent.students.marks} />
                  </div>
                </div>
              </div>
            ) : (
              <div className='w-full h-full flex items-center justify-center text-gray-400 italic text-sm'>
                Select a student to view details
              </div>
            )}
          </div>
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