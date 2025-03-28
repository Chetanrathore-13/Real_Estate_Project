import React from "react";
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

const ProjectForm = () => {

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const token = useSelector((state) => state.auth.token);
  const [properties, setProperties] = useState([]);
  const [agents, setAgents] = useState([]);
  const [features, setFeatures] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [previewFeatureImage, setPreviewFeatureImage] = useState(null);
  const [previewGallery, setPreviewGallery] = useState([]);
  const [file,setFile] = useState(null)
  const[imageGallery, setImageGallery]= useState([])
  const { slug } = useParams();

  const edit = !!slug;

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/agent/get_agents",
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
    const fetchAgent = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/projectFeature/get_projectFeature",
          {
            headers: { Authorization: token },
          }
        );
        setFeatures(response.data);
      } catch (error) {
        console.error("Failed to fetch tags ", error);
      }
    };
    fetchAgent();
  }, [token]);

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/projectType/get_projectTypes",
          {
            headers: { Authorization: token },
          }
        );
        setTypes(response.data);
      } catch (error) {
        console.error("Failed to fetch tags ", error);
      }
    };
    fetchAgent();
  }, [token]);

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/property/properties",
          {
            headers: { Authorization: token },
          }
        );
        setProperties(response.data.formattedProperties);
      } catch (error) {
        console.error("Failed to fetch tags ", error);
      }
    };
    fetchAgent();
  }, [token]);

  const handleSelectAgent = (value) => {
    setValue("agent", value);
  };

  const handleSelectType = (value) => {
    const type = types.find((t) => t._id === value);
    if (type && !selectedTypes.some((t) => t._id === type._id)) {
      const updatedTypes = [...selectedTypes, type];
      setSelectedTypes(updatedTypes);
      setValue(
        "projectType",
        updatedTypes.map((t) => t._id)
      );
    }
  };

  const handleRemoveType = (id) => {
    const updatedTypes = selectedTypes.filter((item) => item._id !== id);
    setSelectedTypes(updatedTypes);
    setValue(
      "projectType",
      updatedTypes.map((t) => t.id)
    );
  };
  const handleSelectFeature = (value) => {
    const feature = features.find((t) => t._id === value);
    if (feature && !selectedFeatures.some((t) => t._id === feature._id)) {
      const updatedTypes = [...selectedFeatures, feature];
      setSelectedFeatures(updatedTypes);
      setValue(
        "projectFeatures",
        updatedTypes.map((t) => t._id)
      );
    }
  };

  const handleRemoveFeature = (id) => {
    const updatedTypes = selectedFeatures.filter((item) => item._id !== id);
    setSelectedFeatures(updatedTypes);
    setValue(
      "projectFeatures",
      updatedTypes.map((t) => t.id)
    );
  };
  const handleSelectProperty = (value) => {
    const property = properties.find((t) => t._id === value);
    if (property && !selectedProperties.some((t) => t._id === property._id)) {
      const updatedTypes = [...selectedProperties, property];
      setSelectedProperties(updatedTypes);
      setValue(
        "properties",
        updatedTypes.map((t) => t._id)
      );
    }
  };

  const handleRemoveProperty = (id) => {
    const updatedTypes = selectedProperties.filter((item) => item._id !== id);
    setSelectedProperties(updatedTypes);
    setValue(
      "properties",
      updatedTypes.map((t) => t.id)
    );
  };



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
      setPreviewGallery(files.map(file => URL.createObjectURL(file))); // Generate preview URLs
  };

  /// Form Submit 
  
  const onSubmit = async (data) => {
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
    const arrayFields = ['projectType', 'projectFeatures', 'properties'];
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
        "http://localhost:8000/api/v1/project/add_project",
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("✅ Response:", response.data);
    } catch (error) {
      console.error("❌ Error:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div>
          <Label>Name</Label>
          <Input
            {...register("name", { required: "Name is required" })}
            placeholder="Project Name"
            className="w-full"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

      <div>
          <Label>Description</Label>
          <Input
            {...register("description", { required: "description is required" })}
            placeholder="Project Name"
            className="w-full"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
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
                    {previewGallery.map((src, index) => (
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
          <Label>Project Types</Label>
          <Select onValueChange={handleSelectType}>
            <SelectTrigger>
              <SelectValue placeholder="Select Project type" />
            </SelectTrigger>
            <SelectContent>
              {types.map((type) => (
                <SelectItem key={type._id} value={type._id}>{type.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedTypes.map((type) => (
              <Badge key={type._id} onClick={() => handleRemoveType(type._id)} className="cursor-pointer">{type.title} ✕</Badge>
            ))}
          </div>
        </div>

        <div>
          <Label>Project Features</Label>
          <Select onValueChange={handleSelectFeature}>
            <SelectTrigger>
              <SelectValue placeholder="Select Features type" />
            </SelectTrigger>
            <SelectContent>
              {features.map((type) => (
                <SelectItem key={type._id} value={type._id}>{type.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedFeatures.map((type) => (
              <Badge key={type._id} onClick={() => handleRemoveFeature(type._id)} className="cursor-pointer">{type.title} ✕</Badge>
            ))}
          </div>
        </div>

        <div>
          <Label>Select Properties</Label>
          <Select onValueChange={handleSelectProperty}>
            <SelectTrigger>
              <SelectValue placeholder="Select Properties" />
            </SelectTrigger>
            <SelectContent>
              {properties.map((type) => (
                <SelectItem key={type._id} value={type._id}>{type.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedProperties.map((type) => (
              <Badge key={type._id} onClick={() => handleRemoveProperty(type._id)} className="cursor-pointer">{type.name} ✕</Badge>
            ))}
          </div>
        </div>
        
        <Button
          type="submit"
          className="w-100px bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </Button>

      </form>
    </div>
  );
};

export default ProjectForm;
