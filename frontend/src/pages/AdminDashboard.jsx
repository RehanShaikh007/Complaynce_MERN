import React, { useEffect, useState } from "react";
import CountryDropdown from "../components/countryDropdown";

const AdminDashboard = () => {
  const [dataList, setDataList] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/data?country=${selectedCountry}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();
      console.log("Fetched Data:", data);
      setDataList(data.data || []);
    } catch (err) {
      console.error("Error fetching data:", err.message);
    }
  };

  useEffect(() => {
    if (selectedCountry) {
      fetchData();
    }
  }, [selectedCountry]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = { title, content, country: selectedCountry };

    try {
      let url = "http://localhost:5000/api/data";
      let method = "POST";

      if (editId) {
        url = `http://localhost:5000/api/data/${editId}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      setTitle("");
      setContent("");
      setEditId(null);
      fetchData();
    } catch (err) {
      console.error("Error saving data:", err.message);
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setTitle(item.title);
    setContent(item.content);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/data/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchData();
    } catch (err) {
      console.error("Error deleting data:", err.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <CountryDropdown
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        ></textarea>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          {editId ? "Update Data" : "Add Data"}
        </button>
      </form>
      <ul className="space-y-4">
        {Array.isArray(dataList) && dataList.length > 0 ? (
          dataList.map((item) => (
            <li key={item._id} className="border p-4 rounded">
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p>{item.content}</p>
              <div className="mt-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-yellow-500 text-white px-4 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <li>No data available</li>
        )}
      </ul>
    </div>
  );
};

export default AdminDashboard;
