import axios from "axios";
import { useState } from "react";

const StudentEditAPI = () => {
  const baseApi = 'https://server-01-v2cx.onrender.com/updateunicity';
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState(null);
  const [Success, setSuccess] = useState(false);

  const updateStudent = async (_id, updatedData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await axios.put(`${baseApi}/${_id}`, {
        collagename: updatedData.collagename,
        collageaddress: updatedData.collageaddress,
        students: {
          name: {
            firstname: updatedData.students.name.firstname,
            lastname: updatedData.students.name.lastname
          },
          marks: updatedData.students.marks,
          rank: updatedData.students.rank,
          phone: updatedData.students.phone,
          gmail: updatedData.students.gmail,
          fathername: updatedData.students.fathername,
          mothername: updatedData.students.mothername,
          gender: updatedData.students.gender
        }
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      if (response.status === 200 && response.data) {
        setSuccess(true);
        return response.data;
      } else {
        throw new Error(`Update failed: Server returned status ${response.status}`);
      }
    } catch (err) {
      let errorMessage = 'An unexpected error occurred';
      if (err.response) {
        errorMessage = err.response.data?.message || 
                      err.response.data?.error ||
                      err.response.data ||
                      err.response.statusText;
      } else if (err.request) {
        errorMessage = 'No response received from server';
      } else {
        errorMessage = err.message;
      }
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { updateStudent, Loading, Error, Success };
}

export default StudentEditAPI;