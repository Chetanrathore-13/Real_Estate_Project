import { useState } from "react"
import { Search, Plus, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect } from "react"

export default function PropertySearch() {
  const [searchType, setSearchType] = useState("rent")
  const [propertyType, setPropertyType] = useState("All Types")
  const [keyword, setKeyword] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const propertyTypes = ["All Types", "House", "Apartment", "Condo", "Townhouse", "Land", "Commercial"]

  const handleSearch = () => {
    console.log({
      searchType,
      propertyType,
      keyword,
    })
    // Implement your search logic here
  }
  useEffect(() => {
    const fetchPropertyTypes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/property/property_types",);
        setPropertyType(response.data);
      } catch (error) {
        console.error("Failed to fetch tags ", error);
      }
    };
    fetchPropertyTypes();
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full overflow-hidden bg-blue-950 p-2 mt-20 ">

     <div className="flex w-full justify-around items-center ml-20 mr-16">
         {/* Search Type Tabs */}
         <div className="flex bg-[#0a0a4a] text-white ">
        <button
          className={cn("px-6 py-3 text-white font-medium rounded-md", searchType === "rent" ? "bg-[#6b5de3]" : "bg-transparent")}
          onClick={() => setSearchType("rent")}
        >
          For Rent
        </button>
        <button
          className={cn("px-6 py-3 text-white font-medium", searchType === "sale" ? "bg-[#6b5de3]" : "bg-transparent")}
          onClick={() => setSearchType("sale")}
        >
          For Sale
        </button>
      </div>

      {/* Search Fields */}
      <div className="flex flex-1 flex-col md:flex-row gap-2 ">
        {/* Property Type Dropdown */}
        <div className="relative ">
          <button
            className="flex justify-between items-center w-full md:w-48 px-4 py-3 bg-white border-r rounded-md"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>{propertyType}</span>
            <ChevronDown className="h-4 w-4 ml-2" />
          </button>

          {isDropdownOpen && (
            <div className="absolute z-10 w-full  border shadow-lg">
              {propertyTypes.map((type) => (
                <button
                  key={type}
                  className="w-full px-4 py-2 text-left  hover:bg-gray-100"
                  onClick={() => {
                    setPropertyType(type)
                    setIsDropdownOpen(false)
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Input */}
        <div className="flex flex-1 items-center bg-white ">
          <input
            type="text"
            placeholder="Enter Keyword..."
            className="w-full px-4 py-3 outline-none rounded-md"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button className="h-full aspect-square flex items-center justify-center bg-white" onClick={handleSearch}>
            <Search className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Advanced Button */}
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#e85d24] hover:bg-[#d14e1a] text-white">
          <Plus className="h-5 w-5" />
          Advanced
        </button>
      </div>
     </div>
      
   
    </div>
  )
}

