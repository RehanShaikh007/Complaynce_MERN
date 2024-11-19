import React, { useEffect, useState } from "react";

const CountryDropdown = ({ selectedCountry, setSelectedCountry }) => {
  const [countries] = useState(["USA", "India", "UK", "Canada"]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCountry = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const userCountry = JSON.parse(atob(token.split(".")[1])).country;
        setSelectedCountry(userCountry);
      } catch (err) {
        console.error("Error decoding token:", err.message);
      }
    };
    fetchCountry();
  }, [setSelectedCountry]);

  const handleCountryChange = async (e) => {
    const newCountry = e.target.value;
    setSelectedCountry(newCountry);

    try {
      const response = await fetch("http://localhost:5000/api/auth/country", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ country: newCountry }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to update country.");
      }

      console.log("Country updated successfully.");
    } catch (err) {
      setError("Failed to update country. Please try again.");
      console.error("Error updating country:", err.message);
    }
  };

  return (
    <div>
      <select
        value={selectedCountry}
        onChange={handleCountryChange}
        className="border p-2 rounded"
      >
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default CountryDropdown;
