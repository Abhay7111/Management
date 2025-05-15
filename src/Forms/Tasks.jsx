import React, {useState} from "react";
import axios from "axios";

function CollegeForm() {
  const [collegeName, setCollegeName] = useState('');
  const [collegeAddress, setCollegeAddress] = useState(['']);
  const [student, setStudent] = useState({
    name: { firstname: '', lastname: '' },
    gender: '',
    fathername: '',
    mothername: '',
    marks: [''],
    rank: 0,
    phone: 0,
    gmail: ''
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!collegeName || collegeAddress.length === 0 || 
        !student.name.firstname || !student.name.lastname ||
        !student.gender || !student.fathername || !student.mothername ||
        student.marks.length === 0 || !student.rank || !student.phone || !student.gmail) {
      setError('All fields are required.');
      setSuccessMessage(null);
      return;
    }
    
    setError(null);
    setSuccessMessage(null);
    setLoading(true);
    
    try {
      const response = await axios.post('https://server-01-v2cx.onrender.com/postunicity', {
        collagename: collegeName,
        collageaddress: collegeAddress,
        students: student
      });
      console.log(response.data);
      setSuccessMessage('Form submitted successfully!');
      // Reset form after successful submission
      setCollegeName('');
      setCollegeAddress(['']);
      setStudent({
        name: { firstname: '', lastname: '' },
        gender: '',
        fathername: '',
        mothername: '',
        marks: [''],
        rank: 0,
        phone: 0,
        gmail: ''
      });
    } catch (error) {
      console.error(error);
      setError('Failed to submit the form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {loading && <div className="col-span-full text-center">Loading...</div>}
      {error && <div className="col-span-full text-red-500 mb-4">{error}</div>}
      {successMessage && <div className="col-span-full text-green-500 mb-4">{successMessage}</div>}
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">College Name</label>
        <input
          type="text"
          value={collegeName}
          onChange={(e) => setCollegeName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="Enter college name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">College Address</label>
        <input
          type="text"
          value={collegeAddress}
          onChange={(e) => setCollegeAddress([e.target.value])}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="Enter college address"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Student First Name</label>
        <input
          type="text"
          value={student.name.firstname}
          onChange={(e) => setStudent({...student, name: {...student.name, firstname: e.target.value}})}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="Enter first name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Student Last Name</label>
        <input
          type="text"
          value={student.name.lastname}
          onChange={(e) => setStudent({...student, name: {...student.name, lastname: e.target.value}})}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="Enter last name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Gender</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="Male"
              checked={student.gender === "Male"}
              onChange={(e) => setStudent({...student, gender: e.target.value})}
              className="w-4 h-4"
            />
            Male
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="Female"
              checked={student.gender === "Female"}
              onChange={(e) => setStudent({...student, gender: e.target.value})}
              className="w-4 h-4"
            />
            Female
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="Other"
              checked={student.gender === "Other"}
              onChange={(e) => setStudent({...student, gender: e.target.value})}
              className="w-4 h-4"
            />
            Other
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Father's Name</label>
        <input
          type="text"
          value={student.fathername}
          onChange={(e) => setStudent({...student, fathername: e.target.value})}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="Enter father's name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Mother's Name</label>
        <input
          type="text"
          value={student.mothername}
          onChange={(e) => setStudent({...student, mothername: e.target.value})}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="Enter mother's name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Marks</label>
        <input
          type="text"
          value={student.marks}
          onChange={(e) => setStudent({...student, marks: [e.target.value]})}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="Enter marks"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Rank</label>
        <input
          type="number"
          value={student.rank}
          onChange={(e) => {
            const value = Math.max(1, Math.min(100, e.target.value));
            setStudent({...student, rank: value});
          }}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          min="1"
          max="100"
          placeholder="Enter rank (1-100)"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Phone</label>
        <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-blue-500">
          <span className="px-3 py-2 bg-gray-100 border-r text-gray-600">+91</span>
          <input
            type="tel"
            value={student.phone}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              if (value.length <= 10) {
                setStudent({...student, phone: value});
              }
            }}
            className="w-full px-3 py-2 rounded-r-md focus:outline-none"
            maxLength="10"
            placeholder="Enter 10-digit number"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={student.gmail}
          onChange={(e) => setStudent({...student, gmail: e.target.value})}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="Enter email address"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="col-span-full w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Submit
      </button>
    </div>
  );
}

export default CollegeForm;