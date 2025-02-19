import { useEffect, useState } from "react"
import { AddCountryForm } from "../components/Add-Country-Form"
import { CountryList } from "../components/Country-list"
import axios from "axios"
import { useSelector } from "react-redux"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function CountryManager() {
  const [countries, setCountries] = useState([])
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    console.log("I am running")
    const fetchCountries = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/location/countries', {
          headers: {
            Authorization: token
          }
        })
        setCountries(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchCountries()
  }, [])
      

  const addCountry = async (name, code) => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/location/add_country', {
        name,
        code
      }, {
        headers: {
          Authorization: token
        }
      })
      console.log(response)
      toast.success("Country has been added successfully!")
      setCountries([...countries, response.data.country])
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
    
  }


  const updateCountry = async (id, name, code) => {
    // i have to send id in params and data in body
    try {
      const respone = await axios.patch(`http://localhost:8000/api/v1/location/patch_country/${id}`, {
        name,
        code
      }, {
        headers: {
          Authorization: token
        }
      })
      if(respone) setCountries(countries.map((country) => (country._id === id ? { ...country, name, code } : country)))
      toast.success("Country has been updated successfully!")
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }



  const deleteCountry = (id) => {
    try {
      axios.delete(`http://localhost:8000/api/v1/location/delete_country/${id}`, {
        headers: {
          Authorization: token
        }
      })
      setCountries(countries.filter((country) => country._id !== id))
      toast.success("Country has been deleted successfully!")
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return (
   <>
   <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">Country Manager</h1>
      <AddCountryForm onAddCountry={addCountry} />
      <CountryList countries={countries} onUpdateCountry={updateCountry} onDeleteCountry={deleteCountry} />
    </div>
    </>
  )
}

