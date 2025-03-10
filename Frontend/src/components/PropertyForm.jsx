import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const PropertyForm = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!slug;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [propertyFeatures, setPropertyFeatures] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [propertyLabels, setPropertyLabels] = useState([]);
  const [propertyStatus, setPropertyStatus] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [countryId, setCountryId] = useState("");
  const [multipleImage, setMultipleImage] = useState([]);
  const [stateId, setStateId] = useState("");
  const [cityId, setCityId] = useState("");
  const [types, setTypes] = useState([]);
  const [labels, setLabels] = useState([]);
  const[features, setFeatures] = useState([]);
  const [agent, setAgent] = useState([]);
  const [agentId, setAgentId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    featureImage: null,
    imageGallery: [],
    videoLink: "",
    reraNumber: "",
    regularPrice: "",
    sellingPrice: "",
    pricePrefix: "",
    pricePostfix: "",
    areaSize: "",
    areaSizePostfix: "",
    totalRooms: "",
    totalBedRooms: "",
    garage_parking: "",
    garage_parking_size: "",
    user: "",
    agent: "",
    country: "",
    state: "",
    city: "",
    address: "",
    features: [],
    label: [],
    status: "",
    type: [],
  });
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.id);

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
    const fetchAgent = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/agent/agents",
          {
            headers: { Authorization: token },
          }
        );
        setAgent(response.data.data);

      } catch (error) {
        console.error("Failed to fetch tags ", error);
      }
    };
    fetchAgent();
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
    setStateId(""); // Reset selected state
    setCities([]); // Reset cities
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

  const handlemultipleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setMultipleImage(files);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
      setFormData((prev) => ({ ...prev, featureImage: file }));
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      formData.user = userId;
      formData.agent = agentId;
      formData.country = countryId;
      formData.state = stateId;
      formData.city = cityId;
      const blogData = new FormData();
      Object.keys(formData).forEach((key) => {
        if(key === 'features'){
          formData[key].forEach((feature) => blogData.append('features[]', feature));
        }else if(key === 'label'){
          formData[key].forEach((label) => blogData.append('label[]', label));
        }else if(key === 'type'){
          formData[key].forEach((type) => blogData.append('type[]', type));
        }else if(key === 'imageGallery'){
          formData[key].forEach((image) => blogData.append('imageGallery[]', imageGallery));
        }
        else {
          blogData.append(key, formData[key]);
        }
      });
      // print the bloddata it is formdata
      let i = 0;
      for (const [key, value] of blogData.entries()) {
        console.log(`${key}: ${value}`);
        i++;
      }

      const url = isEditMode
        ? `http://localhost:8000/api/v1/property/update_property/${slug}`
        : "http://localhost:8000/api/v1/property/add_property";
      const method = isEditMode ? "patch" : "post";
      await axios[method](url, blogData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });
      // navigate(`/admin/blogs`);
    } catch (error) {
      console.error("Failed to save blog:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTypeChange = (typeId) => {
    setTypes((prev) => {
      if (prev.includes(typeId)) {
        return prev.filter((id) => id !== typeId);
      }
      return [...prev, typeId];
    });
  };

  const removeType = (typeIdToRemove) => {
    setTypes((prev) => prev.filter((typeId) => typeId !== typeIdToRemove));
  };

  const handlefeatureChange = (typeId) => {
    setFeatures((prev) => {
      if (prev.includes(typeId)) {
        return prev.filter((id) => id !== typeId);
      }
      return [...prev, typeId];
    });
  };

  const removefeature = (typeIdToRemove) => {
    setFeatures((prev) => prev.filter((typeId) => typeId !== typeIdToRemove));
  };

  const handleLabelChange = (typeId) => {
    setLabels((prev) => {
      if (prev.includes(typeId)) {
        return prev.filter((id) => id !== typeId);
      }
      return [...prev, typeId];
    });
  };

  const removeLabel = (typeIdToRemove) => {
    setLabels((prev) => prev.filter((typeId) => typeId !== typeIdToRemove));
  };
  

  return (
    <>
      <div>Propety Form</div>
      <form onSubmit={handleSubmit}>
      <Label>Name</Label>
      <Input
        name="name"
        type="text"
        placeholder="Property Name"
        value={formData.name}
        onChange={(e) => {
          setFormData({ ...formData, name: e.target.value });
        }}
      />
      <Label>Description</Label>
      <Input
        name="description"
        placeholder="Property Description"
        value={formData.description}
        onChange={(e) => {
          setFormData({ ...formData, description: e.target.value });
        }}
      />

      <Input
       name="videoLink"
       placeholder="Video Link comma separated"
        value={formData.videoLink}
        onChange={(e) => {
          setFormData({ ...formData, videoLink: e.target.value });
        }}
      />
      <Input
      name="reraNumber"
        value={formData.reraNumber}
        placeholder="Rera Number"
        onChange={(e) => {
          setFormData({ ...formData, reraNumber: e.target.value });
        }}
      />

      <Input
        name="regularPrice"
        value={formData.regularPrice}
        placeholder="enter regular price"
        type="number"
        onChange={(e) => {
          setFormData({ ...formData, regularPrice: e.target.value });
        }}
      />
      <Input
      name="sellingPrice"
        value={formData.sellingPrice}
        placeholder="enter selling price"
        type="number"
        onChange={(e) => {
          setFormData({ ...formData, sellingPrice: e.target.value });
        }}
      />

      <Input
      name="pricePrefix"
        value={formData.pricePrefix}
        placeholder="enter price prefix"
        onChange={(e) => {
          setFormData({ ...formData, pricePrefix: e.target.value });
        }}
      />
      <Input
      name="pricePostfix"
        value={formData.pricePostfix}
        placeholder="enter price postfix"
        onChange={(e) => {
          setFormData({ ...formData, pricePostfix: e.target.value });
        }}
      />
      <Input
      name="areaSize"
        value={formData.areaSize}
        placeholder="enter area size"
        type="number"
        onChange={(e) => {
          setFormData({ ...formData, areaSize: e.target.value });
        }}
      />
      <Input
      name="areaSizePostfix"
        value={formData.areaSizePostfix}
        placeholder="enter area size postfix"
        onChange={(e) => {
          setFormData({ ...formData, areaSizePostfix: e.target.value });
        }}
      />
      <Input
      name="totalRooms"
        value={formData.totalRooms}
        placeholder="enter total rooms"
        type="number"
        onChange={(e) => {
          setFormData({ ...formData, totalRooms: e.target.value });
        }}
      />

      <Input
      name="totalBedRooms"
        value={formData.totalBedRooms}
        placeholder="enter total bed rooms"
        type="number"
        onChange={(e) => {
          setFormData({ ...formData, totalBedRooms: e.target.value });
        }}
      />

      <Input
      name="garage_parking"
        value={formData.garage_parking}
        placeholder="Garage Parking"
        onChange={(e) => {
          setFormData({ ...formData, garage_parking: e.target.value });
        }}/>
        <Input
        name="garage_parking_size"
        placeholder="Garage Parking Size"
        value={formData.garage_parking_size}
        onChange={(e) => {
          setFormData({ ...formData, garage_parking_size: e.target.value });
        }}
        />
        <Input
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={(e) => {
          setFormData({ ...formData, address: e.target.value });
        }}
        />

      {/* Feature Image */}
      <Label>Feature Image</Label>
      <Input type="file" onChange={handleImageChange} />
      {imagePreview && <img src={imagePreview} alt="Preview" />}

      {/* We have to Image gallery mean multiple images  */}
      <Input
        type="file"
        onChange={handlemultipleImageChange}
        accept="image/*"
        multiple
      />
      {multipleImage?.map((image, index) => (
        <div key={index}>
          <img src={URL.createObjectURL(image)} alt={`Image ${index}`} />
        </div>
      ))}

      <div className="space-y-2">
        <Label>Property Types</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              Select Your Property Types...
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" align="start">
            <Command>
              <CommandInput placeholder="Search tags..." />
              <CommandList>
                <CommandEmpty>No type found.</CommandEmpty>
                <CommandGroup>
                  {propertyTypes.map((type) => (
                    <CommandItem
                      key={type._id}
                      onSelect={() => handleTypeChange(type._id)}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={types.includes(type._id)}
                          readOnly
                          className="h-4 w-4 rounded border-primary text-primary focus:ring-primary"
                        />
                        {type.title}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <div className="flex flex-wrap gap-2 mt-2">
          {types.map((typeId) => {
            const type = propertyTypes.find((t) => t._id === typeId);
            return (
              <Badge
                key={typeId}
                variant="secondary"
                className="px-3 py-1 text-sm"
              >
                {type?.title || "Unknown Tag"}
                <button
                  type="button"
                  onClick={() => removeType(typeId)}
                  className="ml-2 rounded-full outline-none focus:ring-2 focus:ring-ring"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
        </div>
      </div>

      <Label>Property Status</Label>
       <Select value="" onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))} className="w-full">
        <SelectTrigger>
          <SelectValue placeholder="Select your Property Status" />
        </SelectTrigger>
        <SelectContent>
          {propertyStatus.map((status) => (
            <SelectItem key={status._id} value={status._id}>
              {status.title}
            </SelectItem>
          ))}
        </SelectContent>
       </Select>
      <Label>select Agent</Label>
       <Select value="" onValueChange={(value) =>  setAgentId(value)} className="w-full">
        <SelectTrigger>
          <SelectValue placeholder="Select your Property Status" />
        </SelectTrigger>
        <SelectContent>
          {agent.map((status) => (
            <SelectItem key={status._id} value={status._id}>
              {status.name}
            </SelectItem>
          ))}
        </SelectContent>
       </Select>

      <div className="space-y-2">
        <Label>Property Features</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              Select Your Property Features...
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" align="start">
            <Command>
              <CommandInput placeholder="Search tags..." />
              <CommandList>
                <CommandEmpty>No Feature found.</CommandEmpty>
                <CommandGroup>
                  {propertyFeatures.map((type) => (
                    <CommandItem
                      key={type._id}
                      onSelect={() => handlefeatureChange(type._id)}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={types.includes(type._id)}
                          readOnly
                          className="h-4 w-4 rounded border-primary text-primary focus:ring-primary"
                        />
                        {type.title}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <div className="flex flex-wrap gap-2 mt-2">
          {features.map((typeId) => {
            const type = propertyFeatures.find((t) => t._id === typeId);
            return (
              <Badge
                key={typeId}
                variant="secondary"
                className="px-3 py-1 text-sm"
              >
                {type?.title || "Unknown Feature"}
                <button
                  type="button"
                  onClick={() => removefeature(typeId)}
                  className="ml-2 rounded-full outline-none focus:ring-2 focus:ring-ring"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
        </div>
      </div>


      <div className="space-y-2">
        <Label>Property Types</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              Select Your Property Label...
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" align="start">
            <Command>
              <CommandInput placeholder="Search tags..." />
              <CommandList>
                <CommandEmpty>No Label found.</CommandEmpty>
                <CommandGroup>
                  {propertyLabels.map((type) => (
                    <CommandItem
                      key={type._id}
                      onSelect={() => handleLabelChange(type._id)}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={types.includes(type._id)}
                          readOnly
                          className="h-4 w-4 rounded border-primary text-primary focus:ring-primary"
                        />
                        {type.title}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <div className="flex flex-wrap gap-2 mt-2">
          {labels.map((typeId) => {
            const type = propertyLabels.find((t) => t._id === typeId);
            return (
              <Badge
                key={typeId}
                variant="secondary"
                className="px-3 py-1 text-sm"
              >
                {type?.title || "Unknown Tag"}
                <button
                  type="button"
                  onClick={() => removeLabel(typeId)}
                  className="ml-2 rounded-full outline-none focus:ring-2 focus:ring-ring"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
        </div>
      </div>

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

       {stateId && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Select City</label>
          <select 
            value={cityId} 
            onChange={(e) => setCityId(e.target.value)}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a city</option>
            {cities.map((city) => (
              <option key={city._id} value={city._id}>{city.name}</option>
            ))}
          </select>
        </div>
       )}

       <Button type="submit">Submit</Button>
       </form>
    </>
  );
};

export default PropertyForm;

