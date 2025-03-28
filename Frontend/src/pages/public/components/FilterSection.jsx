import { useState, useEffect, useRef } from "react";
import { Check, ChevronDown } from "lucide-react";
import { getProjectTypes } from "../api/projectsApi";

function FilterSection({ selectedType, onFilterChange }) {
  const [open, setOpen] = useState(false);
  const [projectTypes, setProjectTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchProjectTypes = async () => {
      try {
        const types = await getProjectTypes();
        setProjectTypes(types);
      } catch (error) {
        console.error("Failed to fetch project types:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectTypes();

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedTypeName =
    projectTypes.find((type) => type._id === selectedType)?.title || "All Project Types";

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-gray-100 p-4 rounded-lg">
      <h2 className="text-lg font-medium">Filter Projects</h2>

      <div className="flex flex-wrap gap-3">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-between w-[200px] px-3 py-2 text-sm border border-gray-300 rounded-md bg-white"
            disabled={loading}
          >
            {loading ? "Loading..." : selectedTypeName}
            <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
          </button>

          {open && (
            <div className="absolute z-10 w-[200px] mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
              <div className="py-1">
                <input
                  type="text"
                  placeholder="Search project type..."
                  className="w-full px-3 py-2 text-sm border-b border-gray-200 focus:outline-none"
                />

                <div className="max-h-60 overflow-auto">
                  <div
                    className="flex items-center px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      onFilterChange("projectType", "");
                      setOpen(false);
                    }}
                  >
                    <div className="w-4 mr-2">{!selectedType && <Check className="h-4 w-4" />}</div>
                    All Project Types
                  </div>

                  {projectTypes.map((type) => (
                    <div
                      key={type._id}
                      className="flex items-center px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        onFilterChange("projectType", type._id === selectedType ? "" : type._id);
                        setOpen(false);
                      }}
                    >
                      <div className="w-4 mr-2">{type._id === selectedType && <Check className="h-4 w-4" />}</div>
                      {type.title}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilterSection;
