import { useState, useEffect } from "react";
import CountryDropdown from "../components/countryDropdown";

const UserDashboard = () => {
  const [dataList, setDataList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(""); // Add state for selected country

  // Fetch data from API
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data", {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const { data } = await response.json();

      // Filter data based on the selected country
      const filteredData = data.filter((item) => item.country === selectedCountry);
      setDataList(filteredData);
      console.log(filteredData);
    } catch (err) {
      console.error("Error fetching data:", err.message);
    }
  };

  useEffect(() => {
    if (selectedCountry) {
      fetchData(); // Fetch data whenever country changes
    }
  }, [selectedCountry]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <CountryDropdown selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />
      <ul className="space-y-4">
        {Array.isArray(dataList) && dataList.length > 0 ? (
          dataList.map((item) => (
            <li key={item._id} className="border p-4 rounded">
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p>{item.content}</p>
            </li>
          ))
        ) : (
          <li>No data available</li>
        )}
      </ul>
    </div>
  );
};

export default UserDashboard;
