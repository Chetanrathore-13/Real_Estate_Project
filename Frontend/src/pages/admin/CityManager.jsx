import { useEffect, useState } from "react";
import { AddStateForm } from "../../components/Add-State-Form";
import { StateList } from "../../components/State-list";
import { CityList } from "../../components/City-list";
import { AddCityForm } from "../../components/Add-City-Form";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function StateManager() {
  const [countries, setCountries] = useState([]);
  const [countryId, setCountryId] = useState("");
  const [states, setStates] = useState([]);
  const [stateId, setStateId] = useState("");
  const [cities, setCities] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/location/countries", {
          headers: { Authorization: token },
        });
        setCountries(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCountries();
  }, [token]);

  useEffect(() => {
    if (countryId) {
      const fetchStates = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/v1/location/states/${countryId}`,
            { headers: { Authorization: token } }
          );
          setStates(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchStates();
    }
  }, [countryId, token]);

  useEffect(() => {
    if (stateId) {
      const fetchCities = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/v1/location/cities/${stateId}`,
            { headers: { Authorization: token } }
          );
          setCities(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchCities();
    }
  }, [stateId, token]);

  const addCity = async (name, code,icon,description) => {
    console.log(name,code,stateId,countryId);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("code", code);
      formData.append("icon", icon); // Ensure this is a file object
      formData.append("description", description);
      formData.append("countryId", countryId);
      formData.append("stateId", stateId);
      
      const response = await axios.post(
        "http://localhost:8000/api/v1/location/add_city",
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data", // Important for file upload
          },
        }
      );
  
      console.log(response);
      toast.success("City has been added successfully!");
      setCities([...cities, response.data.citywithicon]);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const deleteCity = async (id) => {
    console.log(id)
    console.log(cities)
    try {
      await axios.delete(`http://localhost:8000/api/v1/location/delete_city/${id}`, {
        headers: { Authorization: token },
      });
      setCities(cities.filter((city) => city._id !== id));
      toast.success("City has been deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  const updateCity = async (id, name, code) => {
    // i have to send id in params and data in body
    try {
      const respone = await axios.patch(`http://localhost:8000/api/v1/location/patch_city/${id}`, {
        name,
        code
      }, {
        headers: {
          Authorization: token
        }
      })
      if(respone) setCities(cities.map((city) => (city._id === id ? { ...cities, name, code } : city)))
      toast.success("City has been updated successfully!")
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container mx-auto p-4 space-y-8">
        <h1 className="text-3xl font-bold text-center">State & City Manager</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Select Country</label>
          <select 
            value={countryId} 
            onChange={(e) => setCountryId(e.target.value)}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country._id} value={country._id}>{country.name}</option>
            ))}
          </select>
        </div>
        {countryId && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Select State</label>
            <select 
              value={stateId} 
              onChange={(e) => setStateId(e.target.value)}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a state</option>
              {states.map((state) => (
                <option key={state._id} value={state._id}>{state.name}</option>
              ))}
            </select>
          </div>
        )}
        {stateId && <AddCityForm onAddCity={addCity} />}
        {stateId && <CityList cities={cities} onUpdateCity={updateCity} onDeleteCity={deleteCity} />}
      </div>
    </>
  );
}
