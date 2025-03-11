import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PropertyForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const userId = useSelector((state) => state.auth.id);
  const token = useSelector((state) => state.auth.token);
  const {slug} = useParams() 
  const [agents, setAgents] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [propertyLabels, setPropertyLabels] = useState([]);
  const [propertyFeatures, setPropertyFeatures] = useState([]);
  const[selectedFeatures,setSelectedFeatures] = useState([])
  const [propertyStatus, setPropertyStatus] = useState([]);
  const[countryId,setCountryId] = useState("")
  const[stateId,setStateId] = useState("")
  const[cityId,setCityId] = useState("")
  const[countries,setCountries] = useState([])
  const[states,setStates] = useState([])
  const [cities,setCities] = useState([])
  const [previewFeatureImage, setPreviewFeatureImage] = useState(null);
  const [previewGallery, setPreviewGallery] = useState([]);
  const [file,setFile] = useState(null)
  const[imageGallery, setImageGallery]= useState([])
  const navigate = useNavigate()


  const isEditMode = !!slug

   // Watch file inputs
   const featureImage = watch("featureImage");
   const galleryImages = watch("imageGallery");

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/agent/agents",
          {
            headers: { Authorization: token },
          }
        );
        setAgents(response.data);
      } catch (error) {
        console.error("Failed to fetch tags ", error);
      }
    };
    fetchAgent();
  }, [token]);

  useEffect(() => {
    const fetchPropertyTypes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/property/property_labels",
          {
            headers: { Authorization: token },
          }
        );
        setPropertyTypes(response.data);
      } catch (error) {
        console.error("Failed to fetch tags ", error);
      }
    };
    fetchPropertyTypes();
  }, [token]);

  useEffect(() => {
    const fetchPropertyStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/property/property_status",
          {
            headers: { Authorization: token },
          }
        );
        setPropertyStatus(response.data);
      } catch (error) {
        console.error("Failed to fetch tags ", error);
      }
    };
    fetchPropertyStatus();
  }, [token]);

  useEffect(() => {
    const fetchPropertyLabels = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/property/property_types",
          {
            headers: { Authorization: token },
          }
        );
        setPropertyLabels(response.data);
      } catch (error) {
        console.error("Failed to fetch tags ", error);
      }
    };
    fetchPropertyLabels();
  }, [token]);

  useEffect(() => {
    const fetchFeature = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/property/property_features",
          {
            headers: { Authorization: token },
          }
        );
        setPropertyFeatures(response.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchFeature();
  }, [token]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/location/countries",
          { headers: { Authorization: token } }
        );
        setCountries(response.data);
      } catch (error) {
        console.log(error);
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
          console.log(error);
          setStates([]);
        }
      };
      fetchStates();
    }
  }, [countryId, token]);

  useEffect(() => {
    if (countryId && stateId) {
      const fetchCities = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/v1/location/cities/${stateId}`,
            { headers: { Authorization: token } }
          );
          setCities(response.data);
        } catch (error) {
          console.log(error);
          setCities([]);
        }
      };
      fetchCities();
    }
  }, [stateId, token]);

  const handleSelectAgent = (value) => {
    setValue("agentId", value);
  };
  
  const handleSelectStatus = (value)=>{
    setValue("status",value)
  }

  const handleSelectType = (value) => {
    const type = propertyTypes.find((t) => t._id === value);
    if (type && !selectedTypes.some((t) => t._id === type._id)) {
      const updatedTypes = [...selectedTypes, type];
      setSelectedTypes(updatedTypes);
      setValue("type", updatedTypes?.map((t) => t._id));
    }
  };

  const handleRemoveType = (id) => {
    const updatedTypes = selectedTypes.filter((item) => item._id !== id);
    setSelectedTypes(updatedTypes);
    setValue("type", updatedTypes?.map((t) => t._id));
  };

  const handleSelectLabel = (value) => {
    const label = propertyLabels.find((l) => l._id === value);
    if (label && !selectedLabels.some((l) => l._id === label._id)) {
      const updatedLabels = [...selectedLabels, label];
      setSelectedLabels(updatedLabels);
      setValue("label", updatedLabels?.map((l) => l._id));
    }
  };

  const handleRemoveLabel = (id) => {
    const updatedLabels = selectedLabels.filter((item) => item._id !== id);
    setSelectedLabels(updatedLabels);
    setValue("label", updatedLabels?.map((l) => l._id));
  };

  const handleSelectFeature = (value) =>{
    const feature = propertyFeatures.find((f) => f._id === value);
    if(feature && !selectedFeatures.some((f)=> f._id === feature._id)){
      const updatedFeature = [...selectedFeatures,feature];
      setSelectedFeatures(updatedFeature);
      setValue("features", updatedFeature?.map((f)=> f._id))
    }
  }
  const handleRemoveFeature = (id) =>{
    const updatedFeatures = selectedFeatures.filter((item) => item._id !== id)
    setSelectedFeatures(updatedFeatures);
    setValue("features", updatedFeatures?.map((f)=>f._id))
  }

  const handleSelectCountry = (id) => {
      setCountryId(id)
      setValue("country", id)
  }
  const handleSelectState = (id) => {
    setStateId(id)
    setValue("state",id)
  }
  const handleSelectCity = (id) => {
    setCityId(id)
    setValue("city", id)
  }

   // Handle feature image change
   const handleFeatureImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file)
    setFile(file)
    setValue("featureImage", file,{ shouldValidate: true }); // Update form data
    setPreviewFeatureImage(URL.createObjectURL(file)); // Generate preview URL
};

// Handle image gallery change
const handleGalleryChange = async (e) => {
    const files = Array.from(e.target.files);
    console.log(files)
   setImageGallery([...files])
    setValue("imageGallery", files , { shouldValidate: true });
    setPreviewGallery(files?.map(file => URL.createObjectURL(file))); // Generate preview URLs
};

const onSubmit = async (data) => {
  data.userId = userId;
  const formData = new FormData();
   console.log(data.featureImage)
   console.log(data.featureImage instanceof File)
  // Handle files
  if (file instanceof File) {
    console.log("ye sahi hai")
    console.log(file)
    formData.append("featureImage", file);
  }

  if (Array.isArray(imageGallery)) {
    console.log("image gallery bhi chl rhi hai")
    imageGallery.forEach((file) => {
      formData.append("imageGallery", file);
    });
  }

  // Fixed: Handle array fields correctly
  const arrayFields = ['propertyTypes', 'propertyLabels', 'propertyFeatures'];
  Object.keys(data).forEach((key) => {
    if (key === "featureImage" || key === "imageGallery") return;
    
    if (arrayFields.includes(key) && Array.isArray(data[key])) {
      data[key].forEach(value => formData.append(key, value));
    } else {
      formData.append(key, data[key]);
    }
  });

  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/property/add_property",
      formData,
      {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("✅ Response:", response);
    if(response.status == 200){
      navigate("/admin/property")
    }
  } catch (error) {
    console.error("❌ Error:", error.response?.data || error.message);
  }
};

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Property Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label>Name</Label>
          <Input
            {...register("name", { required: "Name is required" })}
            placeholder="Property Name"
            className="w-full"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        <div>
          <Label>Description</Label>
          <Input
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Property Description"
            className="w-full"
          />
          {errors.description && (
            <span className="text-red-500 text-sm">
              {errors.description.message}
            </span>
          )}
        </div>

        {/* Feature Image (Single File) */}
        <div>
                <Label>Feature Image</Label>
                <Input type="file" {...register("featureImage")}onChange={handleFeatureImageChange}  className="w-full" />
                {errors.featureImage && <span className="text-red-500 text-sm">{errors.featureImage.message}</span>}
                {/* Preview */}
                {previewFeatureImage && <img src={previewFeatureImage} alt="Feature Preview" className="mt-2 w-32 h-32 object-cover rounded-md" />}
            </div>

            {/* Image Gallery (Multiple Files) */}
            <div>
                <Label>Image Gallery</Label>
                <Input type="file" {...register("imageGallery")} multiple className="w-full" onChange={handleGalleryChange}  />
                {errors.imageGallery && <span className="text-red-500 text-sm">{errors.imageGallery.message}</span>}
                {/* Previews */}
                <div className="mt-2 flex flex-wrap gap-2">
                    {previewGallery?.map((src, index) => (
                        <img key={index} src={src} alt={`Gallery Preview ${index}`} className="w-20 h-20 object-cover rounded-md" />
                    ))}
                </div>
            </div>

        <div>
          <Label>Video Link</Label>
          <Input
            {...register("videoLink")}
            placeholder="Video Link (comma separated)"
            className="w-full"
          />
        </div>

        <div>
          <Label>RERA Number</Label>
          <Input
            {...register("reraNumber")}
            placeholder="RERA Number"
            className="w-full"
          />
        </div>

        <div>
          <Label>Regular Price</Label>
          <Input
            type="number"
            {...register("regularPrice")}
            placeholder="Enter regular price"
            className="w-full"
          />
        </div>

        <div>
          <Label>Selling Price</Label>
          <Input
            type="number"
            {...register("sellingPrice")}
            placeholder="Enter selling price"
            className="w-full"
          />
        </div>

        <div>
          <Label>Price Prefix</Label>
          <Input
            {...register("pricePrefix")}
            placeholder="Enter price prefix"
            className="w-full"
          />
        </div>

        <div>
          <Label>Price Postfix</Label>
          <Input
            {...register("pricePostfix")}
            placeholder="Enter price postfix"
            className="w-full"
          />
        </div>

        <div>
          <Label>Area Size</Label>
          <Input
            type="number"
            {...register("areaSize")}
            placeholder="Enter area size"
            className="w-full"
          />
        </div>

        <div>
          <Label>Area Size Postfix</Label>
          <Input
            {...register("areaSizePostfix")}
            placeholder="Enter area size postfix"
            className="w-full"
          />
        </div>

        <div>
          <Label>Total Rooms</Label>
          <Input
            type="number"
            {...register("totalRooms")}
            placeholder="Enter total rooms"
            className="w-full"
          />
        </div>

        <div>
          <Label>Total Bedrooms</Label>
          <Input
            type="number"
            {...register("totalBedRooms")}
            placeholder="Enter total bedrooms"
            className="w-full"
          />
        </div>

        <div>
          <Label>Garage Parking</Label>
          <Input
            {...register("garage_parking")}
            placeholder="Garage Parking"
            className="w-full"
          />
        </div>

        <div>
          <Label>Garage Parking Size</Label>
          <Input
            {...register("garage_parking_size")}
            placeholder="Garage Parking Size"
            className="w-full"
          />
        </div>

        <div>
          <Label>Address</Label>
          <Input
            {...register("address")}
            placeholder="Address"
            className="w-full"
          />
        </div>
        <div>
          <Label>Agent</Label>
          <Select onValueChange={handleSelectAgent}>
            <SelectTrigger>
              <SelectValue placeholder="Select an agent" />
            </SelectTrigger>
            <SelectContent>
              {agents?.map((agent) => (
                <SelectItem key={agent._id} value={agent._id}>{agent.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.agentId && <span className="text-red-500 text-sm">{errors.agentId.message}</span>}
        </div>
        <div>
          <Label>Status</Label>
          <Select onValueChange={handleSelectStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Select a status"/>
            </SelectTrigger>
            <SelectContent>
              {propertyStatus?.map((status)=>(
                <SelectItem key={status._id} value={status._id} >{status.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Property Types</Label>
          <Select onValueChange={handleSelectType}>
            <SelectTrigger>
              <SelectValue placeholder="Select property type" />
            </SelectTrigger>
            <SelectContent>
              {propertyTypes?.map((type) => (
                <SelectItem key={type._id} value={type._id}>{type.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedTypes?.map((type) => (
              <Badge key={type._id} onClick={() => handleRemoveType(type._id)} className="cursor-pointer">{type.title} ✕</Badge>
            ))}
          </div>
        </div>

        <div>
          <Label>Property Labels</Label>
          <Select onValueChange={handleSelectLabel}>
            <SelectTrigger>
              <SelectValue placeholder="Select property label" />
            </SelectTrigger>
            <SelectContent>
              {propertyLabels?.map((label) => (
                <SelectItem key={label._id} value={label._id}>{label.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedLabels?.map((label) => (
              <Badge key={label._id} onClick={() => handleRemoveLabel(label._id)} className="cursor-pointer">{label.title} ✕</Badge>
            ))}
          </div>
        </div>
        <div>
          <Label>Propety Features</Label>
          <Select onValueChange={handleSelectFeature}>
            <SelectTrigger>
              <SelectValue placeholder="Select property Feature"/>
            </SelectTrigger>
            <SelectContent>
              {propertyFeatures?.map((feature)=>(
                <SelectItem key={feature._id} value={feature._id}>{feature.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2 mt-2">
              {selectedFeatures?.map((feature)=>(
                <Badge key={feature._id} onClick={()=> handleRemoveFeature(feature._id) } className="cursor-pointer">{feature.title} ✕</Badge>
              ))}
          </div>
        </div>

        <div>
          <Label>Country</Label>
          <Select onValueChange={handleSelectCountry}>
            <SelectTrigger>
              <SelectValue placeholder="Select country"/>
            </SelectTrigger>
            <SelectContent>
              {countries?.map((country)=>(
                <SelectItem key={country._id} value={country._id}>{country.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        { countryId &&   <div>
          <Label>State</Label>
          <Select onValueChange={handleSelectState}>
            <SelectTrigger>
              <SelectValue placeholder="Select state"/>
            </SelectTrigger>
            <SelectContent>
              {states?.map((state)=>(
                <SelectItem key={state._id} value={state._id}>{state.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        }
        {
          stateId &&  <div>
          <Label>city</Label>
          <Select onValueChange={handleSelectCity}>
            <SelectTrigger>
              <SelectValue placeholder="Select city"/>
            </SelectTrigger>
            <SelectContent>
              {cities?.map((city)=>(
                <SelectItem key={city._id} value={city._id}>{city.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        }


        <Button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default PropertyForm;
