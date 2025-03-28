import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import Pagination from "./Pagination";
import FilterSection from "./FilterSection";
import { getProjects, getProjectTypes } from "../api/projectsApi";

function ProjectList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get("page");
  const parsedPage = parseInt(pageParam, 10);
  const page = parsedPage >= 1 ? parsedPage : 1;
  const projectType = searchParams.get("projectType") || "";

  const [projects, setProjects] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [projectTypes, setProjectTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getProjects(
          { page, limit: 9, projectType },
          { signal: abortController.signal }
        );
     console.log(response)
        if (response) {
          setProjects(response.formattedProjects || []);
          const newTotalPages = response.totalPages || 1;
          setTotalPages(newTotalPages);

          if (page > newTotalPages) {
            const params = new URLSearchParams(searchParams);
            params.set("page", "1");
            setSearchParams(params);
          }
        } else {
          setProjects([]);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err?.message || "Failed to load projects.");
          console.error("Error fetching projects:", err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();

    return () => abortController.abort();
  }, [page, projectType, searchParams, setSearchParams]);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchProjectTypes = async () => {
      try {
        const types = await getProjectTypes({ signal: abortController.signal });
        console.log(types)
        setProjectTypes(types || []);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching project types:", error);
        }
      }
    };

    fetchProjectTypes();

    return () => abortController.abort();
  }, []);

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    setSearchParams(params);
  };

  const handleFilterChange = (type, value) => {
    const params = new URLSearchParams(searchParams);
  
    if (value) {
      params.set(type, value);
    } else {
      params.delete(type);
    }
  
    // Always reset to page 1 when filters change
    if (params.get("page") !== "1") {
      params.set("page", "1");
    }
  
    // Only update if params have changed
    if (params.toString() !== searchParams.toString()) {
      setSearchParams(params);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-medium text-red-600">Error loading projects</h3>
        <p className="text-gray-600 mt-2">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <FilterSection
        selectedType={projectType}
        onFilterChange={handleFilterChange}
      />

      {projects.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-xl font-medium">No projects found</h3>
          <p className="text-gray-600 mt-2">Try changing your filters or check back later.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>

          <div className="mt-10">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default ProjectList;