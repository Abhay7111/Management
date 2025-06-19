import React, { useState, useRef } from 'react';
import { Students } from '../Data/Students';
import Tasks from '../Forms/Tasks';
import Loader from './Loading';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Link, NavLink, Outlet } from 'react-router-dom';
import Filter from './Filter';

function Spreadsheet() {
  const { Student, Loading, Error } = Students();
  const [managerForm, setManagerForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const componentRef = useRef();
  const [printLoading, setPrintLoading] = useState(false);
  const [pdfError, setPdfError] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);
  const [openOutlet, setOpenOutlet] = useState(false);
  const [openpopup, setOpenpopup] = useState();

  const [filters, setFilters] = useState({
    search: '',
    college: '',
    rank: '',
    marks: ''
  });

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
      const worksheet = XLSX.utils.json_to_sheet(Student.map(item => {
        const student = item.students || {};
        const name = student.name || {};
        return {
          Name: `${name.firstname || ''} ${name.lastname || ''}`.trim(),
          College: item.collagename || '',
          Phone: student.phone ? `+91${student.phone}` : '',
          Email: student.gmail || '',
          Rank: student.rank || '',
          Marks: student.marks || ''
        };
      }));
      
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
      XLSX.writeFile(workbook, "students_data.xlsx");
    } catch (error) {
      console.error('Error generating Excel file:', error);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
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
    <div className='w-full min-h-40 max-h-[100vh] flex flex-col items-start justify-start gap-2 relative'>
      {openOutlet && (
        <div className='fixed top-0 left-0 w-full h-dvh z-50 border border-zinc-400 backdrop-blur-sm bg-zinc-50'>
          <div className='w-full h-full relative flex flex-col items-center gap-2 p-2'>
            <div className='w-full flex items-center justify-end'>
              <NavLink to={`./`} onClick={()=>setOpenOutlet(false)} className='size-8 rounded-md flex items-center justify-center text-sm cursor-pointer border border-zinc-400 bg-zinc-100 hover:bg-zinc-300 transition-all ri-close-line font-medium' />
            </div>
            <div className='w-full h-full flex items-center justify-center'>
              <Outlet/>
            </div>
          </div>
        </div>
      )}
      <div className='flex flex-wrap items-center h-fit justify-start gap-2 text-sm w-full px-2'>
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
          <NavLink
          to={'../new unicity'} 
            className='size-7 rounded-md border border-zinc-300 flex items-center justify-center cursor-pointer hover:bg-zinc-950 hover:text-white transition-colors duration-300'
            aria-label="Add new item"
          >
            <i className='ri-add-line text-xl font-medium'></i>
          </NavLink>
          <div className='size-7 hover:bg-zinc-900 hover:text-white transition-all duration-300 border border-zinc-300 flex items-center justify-center cursor-pointer p-1 rounded'>
            <i className='ri-more-line'></i>
          </div>
        </div>
      </div>

      <div className='w-full h-fit relative flex lg:flex-row items-start justify-center gap-2 px-2 '>
        <div className='w-full '>
          <div className='min-w-[600px] grid grid-cols-6 gap-0 border border-t-0 border-b-0 border-zinc-400'>
            {['Name', 'College', 'Collage address', 'Phone', 'Email', 'Rank / Marks'].map((header, index) => (
              <div key={index} className='bg-gray-200 p-2 font-medium sticky top-0 border-b border-t border-zinc-400'>{header}</div>
            ))}
            {Student.map((item, index) => (
              <React.Fragment key={index}>
                <div 
                  className=' border-b border-zinc-400 cursor-pointer hover:bg-gray-100 line-clamp-1 flex items-center'
                  onClick={() => handleStudentClick(item)}
                >
                  <span className='w-8 text-nowrap text-lglg px-2'>{index + 1}. </span>
                  <span className='w-full h-full flex px-2 items-center'>
                    <span className=' text-nowrap w-full h-fit hidden lg:block'><span>{item.students.name.firstname}</span></span>
                    <div className=' text-nowrap w-full h-fit block lg:hidden'><span onClick={()=> setOpenpopup(true)}>{item.students.name.firstname}</span></div>
                  </span>
                </div>
              <div className='p-2 border-b border-r border-l border-zinc-400 line-clamp-1 w-full'>
                  <span className='w-fit text-nowrap'>{item.collagename}</span>
                </div>
                <div className='w-full overflow-auto p-2 border-r border-zinc-400 border-b'>
                  <span className='text-nowrap'>{item.collageaddress}</span>
                </div>
                <Link to={`tel:${item.students.phone}`} className='p-2 border-b border-r border-zinc-400 line-clamp-1 text-nowrap'><span>+91 {item.students.phone}</span></Link>
                <Link to={`mailto:${item.students.gmail}`} className='p-2 border-b border-r border-zinc-400 line-clamp-1 overflow-auto'>
                  <span className='w-fit text-nowrap'>{item.students.gmail}</span>
                </Link>
                <div className='border-b border-zinc-400 flex'>
                  <div className='w-24 p-2 border-r border-zinc-400'>{item.students.rank}</div>
                  <div className='w-full p-2'>{item.students.marks}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        
        <div className='w-full hidden lg:block lg:w-80 h-full sticky top-0'>
          <div className='sticky transition-all border border-zinc-400 p-2.5 bg-white shadow-sm'>
            {selectedStudent ? (
              <div ref={componentRef} className='w-full h-full space-y-3'>
                <h3 className='font-semibold mb-3 text-lg border-b border-zinc-300 pb-2 text-gray-700 flex items-center justify-between'>
                  <span>Student Details</span>
                  <span className='flex items-center gap-2'>
                    <div className='flex items-center'>
                      <NavLink to={`edit/${selectedStudent._id}`} onClick={()=>setOpenOutlet(prev => !prev)} className={`text-sm font-medium hover:text-blue-600 transition-all`}>Edit</NavLink>
                    </div>
                    <button 
                      onClick={() => setOpenProfile(prev => !prev)}
                      className='size-5.5 rounded border border-zinc-300 hover:bg-zinc-300 flex items-center justify-center cursor-pointer'
                      aria-label="Toggle profile details"
                    >
                      <i className={`${openProfile ? '' : 'rotate-180'} transition-all duration-500 ri-arrow-down-s-fill`}></i>
                    </button>
                  </span>
                </h3>
                
                <div className='space-y-2.5'>
                  <DetailItem label="Name" value={<NavLink to={`./${selectedStudent.students.name.firstname}-${selectedStudent.students.name.lastname}`}>{selectedStudent.students.name.firstname} {selectedStudent.students.name.lastname}</NavLink>} />
                  
                  {!openProfile && (
                    <>
                      <DetailItem label="Father's name" value={selectedStudent.students.fathername} />
                      <DetailItem label="Mother's name" value={selectedStudent.students.mothername} />
                    </>
                  )}
                  
                  <DetailItem label="College" value={`${selectedStudent.collagename}, ${selectedStudent.collageaddress}`} />
                  <DetailItem label="Phone" value={<NavLink to={`tel:${selectedStudent.students.phone}`} className={`text-nowrap`}><span>+91 {selectedStudent.students.phone}</span></NavLink>} />
                  <DetailItem label="Email" value={<NavLink to={`mailto:${selectedStudent.students.gmail}`} className={`text-nowrap`}><span>{selectedStudent.students.gmail}</span></NavLink>} />
                </div>
              </div>
            ) : (
              <label className='text-xs opacity-55'>Select student name to view details</label>
            )}
          </div>
        </div>
        {openpopup && <div className='w-full lg:hidden block lg:w-80 h-full fixed bg-zinc-100 p-2 top-0 left-0 overflow-auto'>
          <span className='w-full flex items-center justify-end mb-2'>
            <i onClick={()=>setOpenpopup(false)} className='ri-close-line px-1 py-0.5 rounded border border-zinc-300 hover:bg-zinc-300 hover:border-zinc-400 bg-zinc-200 transition-all duration-300 cursor-pointer'></i>
          </span>
          <div className='sticky transition-all border rounded-xl border-zinc-400 p-2.5 bg-white shadow-sm'>
            {selectedStudent ? (
              <div ref={componentRef} className='w-full h-full space-y-3'>
                <h3 className='font-semibold mb-3 text-lg border-b border-zinc-300 pb-2 text-gray-700 flex items-center justify-between'>
                  <span>Student Details</span>
                  <span className='flex items-center gap-2'>
                    <div className='flex items-center'>
                      <NavLink to={`edit/${selectedStudent._id}`} onClick={()=>setOpenOutlet(prev => !prev)} className={`text-sm font-medium hover:text-blue-600 transition-all`}>Edit</NavLink>
                    </div>
                    <button 
                      onClick={() => setOpenProfile(prev => !prev)}
                      className='size-5.5 rounded border border-zinc-300 hover:bg-zinc-300 flex items-center justify-center cursor-pointer'
                      aria-label="Toggle profile details"
                    >
                      <i className={`${openProfile ? '' : 'rotate-180'} transition-all duration-500 ri-arrow-down-s-fill`}></i>
                    </button>
                  </span>
                </h3>
                
                <div className='space-y-2.5'>
                  <DetailItem label="Name" value={<NavLink to={`./${selectedStudent.students.name.firstname}-${selectedStudent.students.name.lastname}`}>{selectedStudent.students.name.firstname} {selectedStudent.students.name.lastname}</NavLink>} />
                  
                  {!openProfile && (
                    <>
                    </>
                  )}
                  
                  <DetailItem label="Father's name" value={selectedStudent.students.fathername} />
                  <DetailItem label="Mother's name" value={selectedStudent.students.mothername} />
                  <DetailItem label="College" value={`${selectedStudent.collagename}, ${selectedStudent.collageaddress}`} />
                  <DetailItem label="Phone" value={<NavLink to={`tel:${selectedStudent.students.phone}`} className={`text-nowrap`}><span>+91 {selectedStudent.students.phone}</span></NavLink>} />
                  <DetailItem label="Email" value={<NavLink to={`mailto:${selectedStudent.students.gmail}`} className={`text-nowrap`}><span>{selectedStudent.students.gmail}</span></NavLink>} />
                </div>
              </div>
            ) : (
              <label className='text-xs opacity-55'>Select student name to view details</label>
            )}
          </div>
        </div>}
      </div>
    </div>
  );
}

export default Spreadsheet;