import { useEffect, useState } from "react";
import { AddStateForm } from "../../components/Add-State-Form";
import { StateList } from "../../components/State-list";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function StateManager() {
  const [countries, setCountries] = useState([]);
  const [countryId, setCountryId] = useState("");
  const [states, setStates] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchCountries = async () => {
      if (!token) return;
      try {
        const response = await axios.get("http://localhost:8000/api/v1/location/countries", {
          headers: {
            Authorization: token,
          },
        });
        setCountries(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCountries();
  }, [token]);

  useEffect(() => {
    if (!countryId || !token) return;

    const fetchStates = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/location/states/${countryId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setStates(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStates();
  }, [countryId, token]);

  const addState = async (name, code, icon, description) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("code", code);
      formData.append("icon", icon); // Ensure this is a file object
      formData.append("description", description);
      formData.append("countryId", countryId);

      const response = await axios.post(
        "http://localhost:8000/api/v1/location/add_states",
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("State has been added successfully!");
      setStates([...states, response.data.state]);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const updateState = async (id, name, code) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/location/patch_states/${id}`,
        { name, code },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response) {
        setStates(states.map((state) => 
          state._id === id ? { ...state, name, code } : state
        ));
      }

      toast.success("State has been updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const deleteState = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/location/delete_states/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      setStates(states.filter((state) => state._id !== id));
      toast.success("State has been deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="container mx-auto p-4 space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          State Manager
        </h1>
        <div className="mb-4">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Select Country
          </label>
          <select
            id="country"
            value={countryId}
            onChange={(e) => setCountryId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Select a country</option>
            {countries?.map((country) => (
              <option key={country._id} value={country._id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        {countryId && <AddStateForm onAddState={addState} />}
        {countryId && <StateList states={states} onUpdateState={updateState} onDeleteState={deleteState} />}
      </div>
    </>
  );
}
