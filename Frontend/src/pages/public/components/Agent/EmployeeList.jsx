import { useState } from "react";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

const employees = [
  {
    id: 1,
    name: "John Doe",
    role: "Software Engineer",
    contact: "123-456-7890",
    email: "john@example.com",
    image: "/Agent/emp3.avif",
    social: { facebook: "#", linkedin: "#", twitter: "#" },
    date: new Date("2022-01-01"),
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Product Manager",
    contact: "987-654-3210",
    email: "jane@example.com",
    image: "/Agent/emp2.avif",
    social: { facebook: "#", linkedin: "#", twitter: "#" },
    date: new Date("2023-06-15"),
  },
  {
    id: 3,
    name: "Jane Smith",
    role: "Product Manager",
    contact: "987-654-3210",
    email: "jane@example.com",
    image: "/Agent/emp4.avif",
    social: { facebook: "#", linkedin: "#", twitter: "#" },
    date: new Date("2023-06-15"),
  },
  {
    id: 4,
    name: "Jane Smith",
    role: "Product Manager",
    contact: "987-654-3210",
    email: "jane@example.com",
    image: "/Agent/emp3.avif",
    social: { facebook: "#", linkedin: "#", twitter: "#" },
    date: new Date("2023-06-15"),
  },
  {
    id: 5,
    name: "Jane Smith",
    role: "Product Manager",
    contact: "987-654-3210",
    email: "jane@example.com",
    image: "/Agent/emp3.avif",
    social: { facebook: "#", linkedin: "#", twitter: "#" },
    date: new Date("2023-06-15"),
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Product Manager",
    contact: "987-654-3210",
    email: "jane@example.com",
    image: "/Agent/emp2.avif",
    social: { facebook: "#", linkedin: "#", twitter: "#" },
    date: new Date("2023-06-15"),
  }
  // Add more employee data here
];

const EmployeeList = () => {
  const [sortType, setSortType] = useState("default");
  const [sortedEmployees, setSortedEmployees] = useState([...employees]);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 2;

  const sortEmployees = (type) => {
    let sorted = [...employees];
    switch (type) {
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "oldest":
        sorted.sort((a, b) => a.date - b.date);
        break;
      case "newest":
        sorted.sort((a, b) => b.date - a.date);
        break;
      case "random":
        sorted.sort(() => Math.random() - 0.5);
        break;
      default:
        sorted = [...employees];
    }
    setSortedEmployees(sorted);
    setCurrentPage(1);
  };

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = sortedEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPages = Math.ceil(sortedEmployees.length / employeesPerPage);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-8 w-full">
      <div className="w-full max-w-6xl bg-white p-6">
        <div className="flex justify-between items-center mb-6">
          <p className="text-xl font-semibold">
            Showing {currentEmployees.length} of {sortedEmployees.length} results
          </p>
          <select
            onChange={(e) => {
              setSortType(e.target.value);
              sortEmployees(e.target.value);
            }}
            value={sortType}
            className="border p-2 rounded-md text-lg"
          >
            <option value="default">Default Sorting</option>
            <option value="name-asc">Name (A to Z)</option>
            <option value="name-desc">Name (Z to A)</option>
            <option value="oldest">Old to New</option>
            <option value="newest">New to Old</option>
            <option value="random">Random</option>
          </select>
        </div>

        {currentEmployees.map((employee) => (
          <div key={employee.id} className="flex w-full bg-white  overflow-hidden mb-6 hover:bg-gray-100">
            <div className="w-1/3 relative">
              <img src={employee.image} alt={employee.name} className="w-full h-full object-cover rounded-md hover:opacity-80" />
            </div>
            <div className="w-2/3 ml-10 p-6">
              <h2 className="text-3xl font-bold text-gray-800">{employee.name}</h2>
              <p className="text-lg mt-3 text-gray-600">{employee.role}</p>
              <p className="text-md mt-3 text-gray-600">📞 {employee.contact}</p>
              <p className="text-md mt-2 text-gray-600 ">✉️ {employee.email}</p>
              <div className="flex space-x-6 mt-4 text-2xl">
                <a href={employee.social.facebook} className="text-black hover:text-orange-500 hover:scale-110">
                  <FaFacebook />
                </a>
                <a href={employee.social.linkedin} className="text-black hover:text-orange-500 hover:scale-110">
                  <FaLinkedin />
                </a>
                <a href={employee.social.twitter} className="text-black hover:text-orange-500 hover:scale-110">
                  <FaTwitter />
                </a>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-lg font-semibold">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
