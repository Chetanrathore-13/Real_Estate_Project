import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';


const LocationManager = () => {
    
    const [Country,setCountry] = useState([]);
    const[message,setMessage] = useState("")
    const [formData, setFormData] = useState({
      name:"",
      code:""
    });
    const token = useSelector((state) => state.auth.token);
    console.log(token)

   
    const Addcountry = async (e) => {
      e.preventDefault();
          try {
            const response = await axios.post('http://localhost:8000/api/v1/add_country',formData, {
              headers: {
                Authorization: `${token}` // Replace `token` with your actual token variable
              }
            });
            console.log(response)
            setMessage(response.data.message)
             
          } catch (error) {
            console.error("Error fetching countries:", error); // Proper error handling
          }
        };
    
     
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
  return (
    <div>
      <h1 className='text-2xl font-bold text-center'> Add Country</h1>
      <div className='flex gap-4'>
      <form onSubmit={Addcountry}>
       <div className='flex gap-4'>
       <label htmlFor="name"> Name oF the Country</label>
       <input className='border' type="text" name="name" id="name"value={formData.name} onChange={handleChange} />
       </div>
      <div className='flex gap-4'>
      <label htmlFor="code">Code Of the country</label>
      <input className='border' type="text" name="code" id="code"value={formData.code} onChange={handleChange} />
      </div>
      <button className='bg-blue-600 rounded-xl h-10 w-20 cursor-pointer' type='submit'>Submit </button>
      </form>
      <p>{message && message}</p>
      </div>
    </div>
  )
}

export default LocationManager
