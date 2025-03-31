import React from "react";
import {
  Printer,
  Share2,
  Plus,
  Star,
  Home,
  FileText,
  Bed,
  LayoutGrid,
  Bath,
  Car,
  Grid2x2Plus,
  Building2,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Phone,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const Test = () => {

  const token = useSelector((state) => state.auth.token);
  const { slug } = useParams(); // Get slug from URL
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPropertyDetails = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/property/properties/${slug}`,
        { headers: { Authorization: token } }
      );
      setProperty(data.property);
      console.log(data.property);
    } catch (error) {
      console.error("Error fetching property details:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPropertyDetails();
  }, [slug]);

  return (
    <>
      <div className="flex flex-col justify-center items-center ">
        <div className="flex flex-col container m-8 p-8 gap-4 w-[80vw]">
          <div className="flex justify-between">
            <div className="flex gap-2">
              {property?.featureName?.map((feature) => (
                <p key={feature} className="bg-orange-500 text-white px-4   rounded-sm">
                   feature
                </p>
              ))}
              <span className="bg-purple-700 text-white px-4  rounded-sm">
                {property?.updatedAt.slice(0, 10)} 
              </span>
            </div>
            <div className="flex gap-4">
              <span>
                <Star />
              </span>
              <span>
                <Plus />
              </span>
              <span>
                <Share2 />
              </span>
              <span>
                <Printer />
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-semibold text-blue-950">
              {property?.name}
            </h2>
            <p className="text-2xl font-semibold">${property?.sellingPrice.toLocaleString()}</p>
          </div>
          <div>
            <p> {property?.address}</p>
          </div>
          <div className="flex gap-4 w-full justify-between">
            <div className="h-[80vh]">
              <img
                src={property?.featureImage}
                alt=""
                className="h-[650px] w-[700px] rounded-lg"
              />
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-6 h-[80vh]">
              {property?.imageGallery?.map((image) => (
                <img
                  key={image}
                  src={image}
                  alt=""
                  className="h-[300px] w-[300px] rounded-lg"
                />
              ))}
           
            </div>
          </div>
        </div>
      </div>

       <div className="flex flex-col justify-center  items-center bg-[#f2f2f2] ">
        <div className=" flex container  p-6 rounded-md w-[80vw] ">
          <div className="w-[70%]">
            <div className="flex flex-col gap-4">
              <div className=" bg-white m-4 space-y-4 p-6">
                <h3 className="text-2xl text-blue-950 font-semibold">
                  Description
                </h3>
                <p className="text-lg text-gray-600">
                  {property?.description}
                </p>
              </div>

              {/* <div className="flex ">
                <h4>Overview</h4>
                <div className="gird grid-rows-2 grid-cols-4">
                  <div>
                    <span><HousePlus /></span>{" "}
                    <div>
                      <p>id</p>
                      <p>detail</p>
                    </div>
                  </div>
                  <div>
                    <span><FileType /></span>{" "}
                    <div>
                      <p>id</p>
                      <p>detail</p>
                    </div>
                  </div>
                  <div>
                    <span><BedDouble /></span>{" "}
                    <div>
                      <p>id</p>
                      <p>detail</p>
                    </div>
                  </div>
                  <div>
                    <span><Bath /></span>{" "}
                    <div>
                      <p>id</p>
                      <p>detail</p>
                    </div>
                  </div>
                  <div>
                    <span><Car /></span>{" "}
                    <div>
                      <p>id</p>
                      <p>detail</p>
                    </div>
                  </div>
                  <div>
                    <span><Grid2x2Plus /></span>{" "}
                    <div>
                      <p>id</p>
                      <p>detail</p>
                    </div>
                  </div>
                  <div>
                    <span><Proportions /></span>{" "}
                    <div>
                      <p>id</p>
                      <p>detail</p>
                    </div>
                  </div>
                  <div>
                    <span><Building2 /></span>{" "}
                    <div>
                      <p>id</p>
                      <p>detail</p>
                    </div>
                  </div>
                </div>
              </div> */}

              <div className="max-w-4xl mx-3 p-6 bg-white">
                <h1 className="text-3xl font-bold text-[#0a1158] mb-8">
                  Overview
                </h1>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* ID */}
                  <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-start gap-3">
                    <div className="p-2 rounded-md bg-orange-50">
                      <Home className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">ID</p>
                      <p className="text-lg font-bold text-[#0a1158]">{property?.reraNumber}</p>
                    </div>
                  </div>

                  {/* TYPE */}
                  <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-start gap-3">
                    <div className="p-2 rounded-md bg-orange-50">
                      <FileText className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">TYPE</p>
                      <p className="text-lg font-bold text-[#0a1158]">{property?.typeName}</p>
                    </div>
                  </div>

                  {/* BEDROOMS */}
                  <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-start gap-3">
                    <div className="p-2 rounded-md bg-orange-50">
                      <Bed className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        BEDROOMS
                      </p>
                      <p className="text-lg font-bold text-[#0a1158]">{property?.totalRooms}</p>
                    </div>
                  </div>

                  {/* BATHROOMS */}
                  <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-start gap-3">
                    <div className="p-2 rounded-md bg-orange-50">
                      <Bath className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        BATHROOMS
                      </p>
                      <p className="text-lg font-bold text-[#0a1158]">{property?.totalBedRooms}</p>
                    </div>
                  </div>

                  {/* GARAGES */}
                  <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-start gap-3">
                    <div className="p-2 rounded-md bg-orange-50">
                      <Car className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        GARAGES
                      </p>
                      <p className="text-lg font-bold text-[#0a1158]">{property?.garage_parking_size}</p>
                    </div>
                  </div>

                  {/* SIZE */}
                  <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-start gap-3">
                    <div className="p-2 rounded-md bg-orange-50">
                      <LayoutGrid className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">SIZE</p>
                      <p className="text-lg font-bold text-[#0a1158]">
                       {property?.areaSize} {property?.areaSizePostfix}
                      </p>
                    </div>
                  </div>

                  {/* LAND SIZE */}
                  <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-start gap-3">
                    <div className="p-2 rounded-md bg-orange-50">
                      <Grid2x2Plus className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        LAND SIZE
                      </p>
                      <p className="text-lg font-bold text-[#0a1158]">
                      {property?.areaSize + 200} {property?.areaSizePostfix}
                      </p>
                    </div>
                  </div>

                  {/* YEAR BUILT */}
                  <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-start gap-3">
                    <div className="p-2 rounded-md bg-orange-50">
                      <Building2 className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        YEAR BUILT
                      </p>
                      <p className="text-lg font-bold text-[#0a1158]">2020</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 max-w-4xl mx-3">
                <h2 className="text-2xl font-bold text-indigo-950 mb-6">
                Address
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  <div className="flex justify-between">
                    <span className="font-medium text-indigo-950">
                    Address
                    </span>
                    <span className="text-gray-700">{property?.address}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium text-indigo-950">Country</span>
                    <span className="text-gray-700">{property?.countryName}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium text-indigo-950">
                    City/Town
                    </span>
                    <span className="text-gray-700">{property?.cityName}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium text-indigo-950">
                    Province/State
                    </span>
                    <span className="text-gray-700">{property?.stateName}</span>
                  </div>
                  
                </div>
              </div>

              
              <div className="bg-white rounded-lg shadow-sm p-6 max-w-4xl mx-3">
                <h2 className="text-2xl font-bold text-indigo-950 mb-6">
                  Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  <div className="flex justify-between">
                    <span className="font-medium text-indigo-950">
                      Property ID
                    </span>
                    <span className="text-gray-700">{property?.reraNumber}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium text-indigo-950">Price</span>
                    <span className="text-gray-700">${property?.sellingPrice.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium text-indigo-950">
                      Property Type
                    </span>
                    <span className="text-gray-700">{property?.typeName}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium text-indigo-950">
                      Property Status
                    </span>
                    <span className="text-gray-700">{property?.statusName}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium text-indigo-950">Rooms</span>
                    <span className="text-gray-700">{property?.totalRooms}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium text-indigo-950">
                      Bedrooms
                    </span>
                    <span className="text-gray-700">{property?.totalBedRooms}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium text-indigo-950">
                      Bathrooms
                    </span>
                    <span className="text-gray-700">{property?.totalBedRooms}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium text-indigo-950">
                      Year Built
                    </span>
                    <span className="text-gray-700">{property?.yearBuilt}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium text-indigo-950">Size</span>
                    <span className="text-gray-700">900 SqFt</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium text-indigo-950">
                      Land area
                    </span>
                    <span className="text-gray-700">{property?.areaSize + 200} {property?.areaSizePostfix}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium text-indigo-950">Garages</span>
                    <span className="text-gray-700">{property?.garage_parking_size}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium text-indigo-950">
                      Garage area
                    </span>
                    <span className="text-gray-700">50 SqFt</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" w-[30%] bg-white">
            <div className="flex flex-col gap-4 justify-center items-center mt-16">
              <img
                src="https://images.pexels.com/photos/7821936/pexels-photo-7821936.jpeg"
                alt=""
                className="rounded-full w-44 h-44"
              />
              <div className="flex flex-col justify-center items-center gap-1">
                <p className="text-xl font-semibold text-blue-950">
                  {" "}
                  Abody Swedey
                </p>
                <p className="text-lg">Sales Excutive</p>
              </div>
              <span className="flex gap-2">
                <Star /> <Star /> <Star /> <Star /> <Star />
              </span>
              <span>b.gordon@homeid.com</span>
              <span>+98 0390 909 039</span>
            </div>

            <div className="flex items-center justify-center gap-4 m-10">
              <span>
                <Facebook className="shadow-xl  w-10 rounded-full border-sm border-slate-50" />
              </span>
              <span>
                <Twitter className="shadow-xl w-10 rounded-full border-sm border-slate-50" />
              </span>
              <span>
                <Linkedin className="shadow-xl w-10  border-sm border-slate-50" />
              </span>
              <span>
                <Instagram className="shadow-xl w-10 rounded-full border-sm border-slate-50" />
              </span>
            </div>

            <div>
              <form action="" className="flex space-y-2 flex-col gap-2 m-2 p-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className=" py-4 px-2 rounded-lg bg-[#f8f8f8]"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className=" py-4 px-2 rounded-lg bg-[#f8f8f8]"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className=" py-4 px-2 rounded-lg bg-[#f8f8f8]"
                />
                <input
                  type="text"
                  placeholder="Hello, I am interested in [Affordable Urban House]"
                  className=" bg-[#f8f8f8] py-10 px-2 rounded-lg"
                />
                <Button className="p-8 text-xl bg-orange-600">
                  Send Message
                </Button>
                <Button className="p-8 text-xl bg-white text-black hover:text-white">
                  {" "}
                  <Phone /> Call
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;
