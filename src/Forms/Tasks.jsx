import React, {useState, useEffect} from "react";
import axios from "axios";
import StartLoading from '../Components/StartLoading';
import Uploading from "../Components/Uploading";

function CollegeForm() {
  const [collegeName, setCollegeName] = useState('');
  const [collegeAddress, setCollegeAddress] = useState([]);
  const [student, setStudent] = useState({
    name: { firstname: '', lastname: '' },
    gender: '',
    fathername: '',
    mothername: '',
    marks: [],
    rank: 0,
    phone: 0,
    gmail: '',
    created: new Date()
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showRequiredMessage, setShowRequiredMessage] = useState(true);

  const checkRequiredFields = () => {
    const isComplete = collegeName && 
      collegeAddress.length > 0 && 
      student.name.firstname && 
      student.name.lastname &&
      student.gender && 
      student.fathername && 
      student.mothername &&
      student.marks.length > 0 && 
      student.rank && 
      student.phone && 
      student.gmail;
    
    setShowRequiredMessage(!isComplete);
  };

  useEffect(() => {
    checkRequiredFields();
  }, [collegeName, collegeAddress, student]);

  const handleSubmit = async () => {
    if (!collegeName || collegeAddress.length === 0 || 
        !student.name.firstname || !student.name.lastname ||
        !student.gender || !student.fathername || !student.mothername ||
        student.marks.length === 0 || !student.rank || !student.phone || !student.gmail) {
      setError('Please fill out all required fields before submitting.');
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
        created: new Date(),
        students: {
          ...student,
          created: new Date()
        }
      });
      console.log(response.data);
      setSuccessMessage('Form submitted successfully!');
      // Reset form after successful submission
      setCollegeName('');
      setCollegeAddress([]);
      setStudent({
        name: { firstname: '', lastname: '' },
        gender: '',
        fathername: '',
        mothername: '',
        marks: [],
        rank: 0,
        phone: 0,
        gmail: '',
        created: new Date()
      });
    } catch (error) {
      console.error(error);
      setError('Failed to submit the form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg ${loading ? 'opacity-60 pointer-events-none' : ''}`}>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Registration Form</h2>
      
      {/* Validation Messages */}
      {showRequiredMessage && (
        <p className="text-sm text-red-500 mb-4">* All fields are required</p>
      )}
      
      {/* Loading State */}
      {loading && (
        <div className="mb-4">
          <Uploading />
        </div>
      )}
      
      {/* Error Message */}
      {error && (
        <div className="col-span-full text-red-500 mb-4 p-3 bg-red-50 rounded-lg">
          {error}
        </div>
      )}
      
      {/* Success Message */}
      {successMessage && (
        <div className="col-span-full text-green-500 mb-4 p-3 bg-green-50 rounded-lg">
          {successMessage}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* College Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">College Information</h3>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">College Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter college name"
              required
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">College Address <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={collegeAddress}
              onChange={(e) => setCollegeAddress([e.target.value])}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter college address"
              required
            />
          </div>
        </div>

        {/* Student Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Student Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={student.name.firstname}
                onChange={(e) => setStudent({...student, name: {...student.name, firstname: e.target.value}})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Enter first name"
                required
              />
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={student.name.lastname}
                onChange={(e) => setStudent({...student, name: {...student.name, lastname: e.target.value}})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Enter last name"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender <span className="text-red-500">*</span></label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="Male"
                  checked={student.gender === "Male"}
                  onChange={(e) => setStudent({...student, gender: e.target.value})}
                  className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                  required
                />
                <span className="text-gray-700">Male</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="Female"
                  checked={student.gender === "Female"}
                  onChange={(e) => setStudent({...student, gender: e.target.value})}
                  className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                  required
                />
                <span className="text-gray-700">Female</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="Other"
                  checked={student.gender === "Other"}
                  onChange={(e) => setStudent({...student, gender: e.target.value})}
                  className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                  required
                />
                <span className="text-gray-700">Other</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={student.fathername}
                onChange={(e) => setStudent({...student, fathername: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Enter father's name"
                required
              />
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={student.mothername}
                onChange={(e) => setStudent({...student, mothername: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Enter mother's name"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Marks <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={student.marks}
                onChange={(e) => setStudent({...student, marks: [e.target.value]})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Enter marks"
                required
              />
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Rank <span className="text-red-500">*</span></label>
              <input
                type="number"
                value={student.rank}
                onChange={(e) => {
                  const value = Math.max(1, Math.min(100, e.target.value));
                  setStudent({...student, rank: value});
                }}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Enter rank"
                min="1"
                max="100"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
              <input
                type="tel"
                value={student.phone}
                onChange={(e) => setStudent({...student, phone: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Enter phone number"
                required
              />
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                value={student.gmail}
                onChange={(e) => setStudent({...student, gmail: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Enter email address"
                required
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
}

export default CollegeForm;