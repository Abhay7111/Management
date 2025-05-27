import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Students } from '../Data/Students';
import axios from 'axios';

function EditStudents() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { Student, Loading, Error } = Students();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    gender: '',
    fathername: '',
    mothername: '',
    phone: '',
    gmail: '',
    collagename: '',
    collageaddress: [],
    marks: [],
    rank: 0
  });
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (Student.length > 0) {
      const selectedStudent = Student.find(student => student._id === id);
      if (!selectedStudent) {
        navigate('/dashboard/students');
        return;
      }
      setFormData({
        firstname: selectedStudent.students.name.firstname,
        lastname: selectedStudent.students.name.lastname,
        gender: selectedStudent.students.gender,
        fathername: selectedStudent.students.fathername,
        mothername: selectedStudent.students.mothername,
        phone: selectedStudent.students.phone,
        gmail: selectedStudent.students.gmail,
        collagename: selectedStudent.collagename,
        collageaddress: selectedStudent.collageaddress,
        marks: selectedStudent.students.marks,
        rank: selectedStudent.students.rank
      });
    }
  }, [Student, id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'marks' || name === 'collageaddress' ? value.split(',') : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      students: {
        name: {
          firstname: formData.firstname,
          lastname: formData.lastname
        },
        gender: formData.gender,
        fathername: formData.fathername,
        mothername: formData.mothername,
        phone: formData.phone,
        gmail: formData.gmail,
        marks: formData.marks,
        rank: formData.rank
      },
      collagename: formData.collagename,
      collageaddress: formData.collageaddress
    };
    
    setUpdateLoading(true);
    setUpdateError(null);
    setSuccess(false);

    try {
      const response = await axios.put(`https://server-01-v2cx.onrender.com/updateunicity/${id}`, updatedData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      if (response.status === 200 && response.data) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/dashboard/students');
        }, 1500);
      } else {
        throw new Error(`Update failed: Server returned status ${response.status}`);
      }
    } catch (error) {
      let errorMessage = 'An unexpected error occurred';
      if (error.response) {
        errorMessage = error.response.data?.message || 
                      error.response.data?.error ||
                      error.response.data ||
                      error.response.statusText;
      } else if (error.request) {
        errorMessage = 'No response received from server';
      } else {
        errorMessage = error.message;
      }
      setUpdateError(errorMessage);
    } finally {
      setUpdateLoading(false);
    }
  };

  if (Loading) return <div>Loading...</div>;
  if (Error) return <div>Error: {Error.message}</div>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Student</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Gender</label>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Father's Name</label>
          <input
            type="text"
            name="fathername"
            value={formData.fathername}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Mother's Name</label>
          <input
            type="text"
            name="mothername"
            value={formData.mothername}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="gmail"
            value={formData.gmail}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">College Name</label>
          <input
            type="text"
            name="collagename"
            value={formData.collagename}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">College Address (comma separated)</label>
          <input
            type="text"
            name="collageaddress"
            value={formData.collageaddress.join(',')}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Marks (comma separated)</label>
            <input
              type="text"
              name="marks"
              value={formData.marks.join(',')}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Rank</label>
            <input
              type="number"
              name="rank"
              value={formData.rank}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={updateLoading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {updateLoading ? 'Updating...' : 'Update Student'}
        </button>

        {updateError && <div className="text-red-500 text-sm">Error: {updateError}</div>}
        {success && <div className="text-green-500 text-sm">Student updated successfully! Redirecting...</div>}
      </form>
    </div>
  );
}

export default EditStudents;