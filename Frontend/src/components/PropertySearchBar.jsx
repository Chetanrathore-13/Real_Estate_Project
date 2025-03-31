import { useState, useEffect } from "react";
import { Search, Plus, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";

export default function PropertySearchBar({ filters, setFilters }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [propertyTypes, setPropertyTypes] = useState(["All Types"]);

  useEffect(() => {
    const fetchPropertyTypes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/property/property_types`);
        
        if (Array.isArray(response.data)) {
          const propertyTypeTitles = response.data.map((type) => type.title);
          setPropertyTypes(["All Types", ...propertyTypeTitles]);
          console.log("Property Types:", propertyTypeTitles);
          console.log(response)
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch property types", error);
      }
    };
    
    fetchPropertyTypes();
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full overflow-hidden bg-blue-950 p-2 mt-20">
      <div className="flex w-full justify-around items-center ml-20 mr-16">
        {/* Search Type Tabs */}
        <div className="flex bg-[#0a0a4a] text-white ">
          <button
            className={cn("px-6 py-3 rounded-md", filters.searchType === "rent" ? "bg-[#6b5de3]" : "bg-transparent")}
            onClick={() => setFilters(prev => ({ ...prev, searchType: "rent" }))}
          >
            For Rent
          </button>
          <button
            className={cn("px-6 py-3", filters.searchType === "sale" ? "bg-[#6b5de3]" : "bg-transparent")}
            onClick={() => setFilters(prev => ({ ...prev, searchType: "sale" }))}
          >
            For Sale
          </button>
        </div>

        {/* Search Fields */}
        <div className="flex flex-1 flex-col md:flex-row gap-2">
          {/* Property Type Dropdown */}
          <div className="relative">
            <button
              className="flex justify-between items-center w-full md:w-48 px-4 py-3 bg-white border-r rounded-md"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>{filters.propertyType}</span>
              <ChevronDown className="h-4 w-4 ml-2" />
            </button>
            {isDropdownOpen && propertyTypes.length > 0 && (
              <div className="absolute z-10 w-full border shadow-lg bg-white">
                {propertyTypes.map((type, index) => (
                  <button
                    key={index}
                    className="w-full px-4 py-2 text-left  hover:bg-gray-100"
                    onClick={() => {
                      setFilters(prev => ({ ...prev, propertyType: type }));
                      setIsDropdownOpen(false);
                    }}
                  >
                    {type}
                    
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Input */}
          <div className="flex flex-1 items-center bg-white rounded-md">
            <input
              type="text"
              placeholder="Enter Keyword..."
              className="w-full px-4 py-3 outline-none"
              value={filters.keyword}
              onChange={(e) => setFilters(prev => ({ ...prev, keyword: e.target.value }))}
              onKeyDown={(e) => e.key === "Enter" && setFilters(prev => ({ ...prev, page: 1 }))}
            />
            <button className="h-full aspect-square flex items-center justify-center" onClick={() => setFilters(prev => ({ ...prev, page: 1 }))}>
              <Search className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Advanced Button */}
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#e85d24] hover:bg-[#d14e1a] text-white rounded-md">
            <Plus className="h-5 w-5" />
            Advanced
          </button>
        </div>
      </div>
    </div>
  );
}
