import { useEffect, useState } from "react";
import { AddCountryForm } from "../components/Add-Country-Form";
import { CountryList } from "../components/Country-list";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CountryManager() {
  const [countries, setCountries] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/location/countries",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setCountries(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountries();
  }, []);

  const addCountry = async ({name, icon, description, code}) => {
    console.log("I am running in location manager");
  
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("code", code);
      formData.append("icon", icon); // Ensure this is a file object
      formData.append("description", description);
      
      const response = await axios.post(
        "http://localhost:8000/api/v1/location/add_country",
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data", // Important for file upload
          },
        }
      );
  
      console.log(response);
      toast.success("Country has been added successfully!");
      setCountries([...countries, response.data.country]);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const updateCountry = async (id, name, code) => {
    // i have to send id in params and data in body
    try {
      const respone = await axios.patch(
        `http://localhost:8000/api/v1/location/patch_country/${id}`,
        {
          name,
          code,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (respone)
        setCountries(
          countries.map((country) =>
            country._id === id ? { ...country, name, code } : country
          )
        );
      toast.success("Country has been updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const deleteCountry = (id) => {
    try {
      axios.delete(
        `http://localhost:8000/api/v1/location/delete_country/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setCountries(countries.filter((country) => country._id !== id));
      toast.success("Country has been deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
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
      <div className="container mx-auto p-4 space-y-5">
        <div className="message__container space-y-2">
          <h1 className="text-2xl font-bold text-left text-gray-800 dark:text-white">
            Country Manager
          </h1>
          <p className="text-sm text-gray-600">
            {" "}
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus ad
            dolores excepturi autem non numquam, omnis ducimus nemo incidunt
            enim.
          </p>
        </div>

        <AddCountryForm onAddCountry={addCountry} />
        <CountryList
          countries={countries}
          onUpdateCountry={updateCountry}
          onDeleteCountry={deleteCountry}
        />
      </div>
    </>
  );
}
