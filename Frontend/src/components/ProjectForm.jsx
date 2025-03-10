import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

const { register,handleSubmit,watch,setValue , formState: { errors },} = useForm()

const token = useSelector((state)=> state.auth.token)
const[agents,setAgents] = useState([])
const[properties,setProperties] = useState([])

useEffect(() => {
    const fetchAgent = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/agent/agents",
          {
            headers: { Authorization: token },
          }
        );
        setAgents(response.data.data);
      } catch (error) {
        console.error("Failed to fetch tags ", error);
      }
    };
    fetchAgent();
  }, [token]);

useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/property/properties",
          {
            headers: { Authorization: token },
          }
        );
        setProperties(response.data.data);
      } catch (error) {
        console.error("Failed to fetch tags ", error);
      }
    };
    fetchProperties();
  }, [token]);

const ProjectForm = () => {
  return (
    <div>
      
    </div>
  )
}

export default ProjectForm
